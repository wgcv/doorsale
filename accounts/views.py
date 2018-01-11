"""
Accounts views for Doorsale apps
"""
from django.shortcuts import redirect
from django.contrib import messages
from django.db import transaction
from django.conf import settings
from django.http import HttpResponseRedirect
from django.core.mail import EmailMessage, EmailMultiAlternatives
from django.core.exceptions import ValidationError
from django.core.urlresolvers import reverse
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth import get_user_model, authenticate, login, logout
from django.contrib.auth.tokens import default_token_generator
from django.contrib.auth.decorators import login_required
from django.views.generic.base import TemplateView
from django.template import Context
from django.template import loader
from django.template.loader import get_template
from django.http import HttpResponse, Http404, StreamingHttpResponse
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.translation import ugettext as _
from django.utils.html import format_html
from django.urls import reverse_lazy
from django.views.generic import View

from doorsale_site.views import BaseView
from decorators import anonymous_required
from catalog.views import CatalogBaseView
from accounts.forms import RegisterForm, PasswordResetForm, ChangePasswordForm
from utils.helpers import send_mail

from doorsale_site import settings


User = get_user_model()


class LoginView(CatalogBaseView):
    """
    Login view for Doorsale
    """
    template_name = 'accounts/login.html'
    decorators = [anonymous_required]

    def get_context_data(self, **kwargs):
        next_url = self.request.GET.get('next', '')
        breadcrumbs = ({'name': 'Login', 'url': reverse('accounts_login')},)
        return super(LoginView, self).get_context_data(breadcrumbs=breadcrumbs, next_url=next_url, **kwargs)

    def post(self, request):
        username = request.POST['username']
        password = request.POST['password']
        user = User.objects.filter(username=username)
        if user.exists():
            user = user.first()
            if user.is_active:
                user = authenticate(username=username, password=password)
                try:
                    login(request, user)
                    return redirect('/')
                except AttributeError:
                    error = ('Username and password didn\'t matched, if you forgot your password?'
                     ' <a href="%s">Request new one</a>') % reverse('accounts_forgot_password')
                # return HttpResponseRedirect(request.POST.get('next', reverse('catalog_index')))
            else:
                error = ('Your account has been disabled. We apologize for any inconvenience! If this is a mistake'
                         ' please contact our <a href="mailto:%s">support</a>.') % 'settings.SUPPORT_EMAIL'
        else:
            error = ('Username and password didn\'t matched, if you forgot your password?'
                     ' <a href="%s">Request new one</a>') % reverse('accounts_forgot_password')

        return super(LoginView, self).get(request, error=error)


class LogoutView(BaseView):
    """
    Logout view from Doorsale
    """

    def get(self, request):
        logout(request)
        return HttpResponseRedirect(settings.LOGIN_REDIRECT_URL)


class RegisterView(CatalogBaseView):
    """
    User registration view
    """
    page_title = 'Register'
    template_name = "accounts/register.html"
    decorators = [transaction.atomic, anonymous_required]

    def send_email(self, request, user):
        context = {
            'email': user.email,
            # 'domain': "%s%s"%(prefix, request.META['HTTP_HOST']),
            'domain': "http://localhost:8000",
            'site_name': 'Doorsale',
            'url': reverse_lazy('activate-account', kwargs={
                'uidb64':urlsafe_base64_encode(force_bytes(user.pk)), 
                'token':default_token_generator.make_token( user )
                }),
            'user': user,
            'protocol': 'http',
        }
        subject_template_name = 'accounts/email/activate_account.txt'
        email_template_name = 'accounts/email/activate_account_email.html'
        subject = loader.render_to_string(subject_template_name, context)
        subject = ''.join(subject.splitlines())
        body = loader.get_template(email_template_name).render(context)
        email_message = EmailMultiAlternatives(
            subject=subject,
            body=body,
            to=[user.email],
            from_email=settings.DEFAULT_FROM_EMAIL,
            headers = {'Reply-To': user.email},
        )
        # email_message.content_subtype = 'html'
        email_message.attach_alternative(body, "text/html")
        try:
            email_message.send(fail_silently=False)
        except Exception as e:
            import traceback; traceback.print_exc();
            print(e)

    def get_context_data(self, **kwargs):
        next_url = self.request.GET.get('next', '')
        breadcrumbs = ({'name': 'Register', 'url': reverse('accounts_register')},)
        return super(RegisterView, self).get_context_data(breadcrumbs=breadcrumbs, next_url=next_url, **kwargs)

    def get(self, request, *arg, **kwargs):
        if 'uidb64' in self.kwargs:
            # _user_ = User.objects.filter(pk=self.kwargs['id']).first()
            try:
                uid = urlsafe_base64_decode(self.kwargs['uidb64'])
                _user_ = User._default_manager.get(pk=uid)
            except (TypeError, ValueError, OverflowError, User.DoesNotExist) as e:
                print e
                raise Http404
            success = ('You have register successfully, please confirm your account or '
                           ' <a href="%s">resend email</a>.') % reverse_lazy('accounts_register', kwargs={'uidb64':urlsafe_base64_encode(force_bytes(_user_.pk))})
            self.send_email(request, _user_)
            return super(RegisterView,self).get(request, success=success)
        else:
            form = RegisterForm()
            as_superuser = User.objects.count() == 0
            return super(RegisterView, self).get(request, form=form, as_superuser=as_superuser)

    def post(self, request):
        error = None
        success = None
        form = RegisterForm(request.POST)
        if form.is_valid():
            try:
                data = form.cleaned_data
                user = User.objects.register(
                    data['first_name'], 
                    data['last_name'], 
                    data['email'], 
                    # data['username'], 
                    data['password'],
                )
                next_url = request.POST.get('next', None)
                if next_url:
                    return HttpResponseRedirect(next_url)
                success = ('You have register successfully, please confirm your account or '
                           ' <a href="%s">resend email</a>.') % reverse_lazy('accounts_register', kwargs={'uidb64':urlsafe_base64_encode(force_bytes(user.pk))})
                self.send_email(request, user)
            except ValidationError as e:
                error = e.message
        return super(RegisterView, self).get(request, form=form, error=error, success=success)


class ForgotPasswordView(CatalogBaseView):
    """
    Password recovery view
    """
    template_name = 'accounts/forgot_password.html'
    decorators = [anonymous_required]
    page_title = 'Forgot password'

    def send_email(self, request, user):
        context = {
            'email': user.email,
            'user': user, 
            # 'domain': "%s%s"%(prefix, request.META['HTTP_HOST']),
            'DOMAIN': "localhost:8000",
            'SITE_NAME': 'Doorsale',
            'protocol': 'http',
        }
        subject_template_name = 'accounts/email/password_reset_subject.txt'
        email_template_name = 'accounts/email/password_reset.html'
        subject = loader.render_to_string(subject_template_name, context)
        subject = ''.join(subject.splitlines())
        body = loader.get_template(email_template_name).render(context)
        email_message = EmailMultiAlternatives(
            subject=subject,
            body=body,
            to=[user.email],
            from_email=settings.DEFAULT_FROM_EMAIL,
            headers = {'Reply-To': user.email},
        )
        email_message.attach_alternative(body, "text/html")
        try:
            email_message.send(fail_silently=False)
        except Exception as e:
            import traceback; traceback.print_exc();
            print(e)

    def get_context_data(self, **kwargs):
        context = super(ForgotPasswordView, self).get_context_data(**kwargs)
        context['breadcrumbs'] += ({'name': 'Forgot password', 'url': reverse('accounts_forgot_password')},)

        return context

    def post(self, request):
        error = None
        success = None
        email = request.POST.get('email', None)
        if email:
            email = email.strip()
            try:
                user = User.objects.get_reset_code(email)
                self.send_email(request, user)
                success = 'Password reset intructions has been sent to your email address.'
            except Exception as e:
                error = e.message

        return self.get(request, error=error, success=success)


class PasswordResetView(CatalogBaseView):
    """
    Password recovery view
    """
    page_title = 'Password reset'
    template_name = 'accounts/password_reset.html'
    decorators = [anonymous_required]

    def get_context_data(self, **kwargs):
        context = super(PasswordResetView, self).get_context_data(**kwargs)
        context['breadcrumbs'] += ({
            'name': 'Password reset',
            'url': reverse('accounts_password_reset', args=[context['user_id'], context['reset_code']])},)

        return context

    def get(self, request, user_id, reset_code):
        form = PasswordResetForm()
        return super(PasswordResetView, self).get(request, form=form, user_id=user_id, reset_code=reset_code)

    def post(self, request, user_id, reset_code):
        error = None
        success = None
        form = PasswordResetForm(request.POST)

        if form.is_valid():
            data = form.cleaned_data
            try:
                User.objects.reset_password(user_id, reset_code, data['password'])
                success = 'Your password has been reset successfully.'
            except Exception as e:
                error = e.message

        return super(PasswordResetView, self).get(request, form=form, user_id=user_id, reset_code=reset_code,
                                                  error=error, success=success)


class ChangePasswordView(CatalogBaseView):
    """
    Password recovery view
    """
    page_title = 'Change password'
    template_name = 'accounts/change_password.html'
    decorators = [login_required]

    def get_context_data(self, **kwargs):
        context = super(ChangePasswordView, self).get_context_data(**kwargs)
        context['breadcrumbs'] += ({'name': 'Change password', 'url': reverse('accounts_change_password')},)
        return context

    def get(self, request):
        form = ChangePasswordForm()
        return super(ChangePasswordView, self).get(request, form=form)

    def post(self, request):
        error = None
        success = None
        form = ChangePasswordForm(request.POST)

        if form.is_valid():
            data = form.cleaned_data
            try:
                _user_ = request.user
                User.objects.change_password(request.user, data['current_password'], data['password'])
                success = 'Your password has been changed successfully, please login again.'
            except Exception as e:
                error = e.message

        return super(ChangePasswordView, self).get(request, form=form, error=error, success=success)


class ActivateAccountView(TemplateView):
    """docstring for ActivateAccountView"""
    template_name = 'accounts/activate_account_view.html'
    motto = _(u'Congratulations! Your account has been successfully activated.')
    info = _(u'In seconds you will be redirected to the home page.')

    def get(self, request, uidb64=None, token=None, *arg, **kwargs):
        assert uidb64 is not None and token is not None  # checked by URLconf
        try:
            uid = urlsafe_base64_decode(uidb64)
            user = User._default_manager.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist) as e:
            print e
            user = None
        if user.is_active:
            return redirect('/')
        if user:
            _val_ = default_token_generator.check_token(user, token)
            if user is not None and _val_:
                try:
                    user.is_active = True
                    user.save()
                    login(request, user)
                    messages.success(request, _(u'Account activated.'))
                except Exception as e:
                    print e
                    messages.error(request, _(u'Activation has failed.'))
                    self.motto = _(u'User account can\'t be activated.')
                    self.info = _(
                        format_html('Please try again clicking <a href="%s" style="color: #ffd200;">here</a>'\
                        %reverse_lazy('sourceadmin:activate-account-manually'))
                    )
            else:
                messages.error(request, _(u'The activation link is no longer valid.'))
                self.motto = _(u'Activation link no valid')
                self.info = _(
                    format_html('Please try again clicking <a href="%s" style="color: #ffd200;">here</a>'\
                    %reverse_lazy('sourceadmin:activate-account-manually'))
                )
        else:
            messages.error(request, _(u'Inconsistency error.'))
            self.motto = ""
            self.info = _(format_html('Invalid session.'))
        return super(ActivateAccountView, self).get(request, uidb64, token, *arg, **kwargs)

    def get_context_data(self, **kwargs):
        context = super(ActivateAccountView, self).get_context_data(**kwargs)
        context['title'] = _("Activate Account")
        context['motto'] = self.motto
        context['info'] = self.info
        return context


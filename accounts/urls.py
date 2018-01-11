from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^login/$', views.LoginView.as_view(), name='accounts_login'),
    url(r'^logout/$', views.LogoutView.as_view(), name='accounts_logout'),
    url(r'^register/$', views.RegisterView.as_view(), name='accounts_register'),
    url(r'^register/(?P<uidb64>[0-9A-Za-z]+)/$', views.RegisterView.as_view(), name='accounts_register'),
    url(r'^forgot_password/$', views.ForgotPasswordView.as_view(), name='accounts_forgot_password'),
    url(r'^change_password/$', views.ChangePasswordView.as_view(), name='accounts_change_password'),
    url(r'^password_reset/(?P<user_id>\d+)-(?P<reset_code>\w+)/$',
        views.PasswordResetView.as_view(), name='accounts_password_reset'),

    url(
        r'^activate-account/(?P<uidb64>[0-9A-Za-z]+)-(?P<token>.+)/$',
        views.ActivateAccountView.as_view(),
        name='activate-account'
    ),
]

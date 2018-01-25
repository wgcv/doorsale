from django.db import transaction
from django.http import Http404, HttpResponseRedirect
from django.shortcuts import render, get_object_or_404
from django.core.exceptions import ImproperlyConfigured
from django.core.urlresolvers import reverse

from sales.models import Order
from catalog.views import CatalogBaseView, get_default_currency
from django.views.generic import View
from django.views.generic.base import TemplateView
from payments.forms import CreditCardForm
from payments.models import Gateway, Transaction, TransactionParam
from payments.processors import PayPal, Stripe

class ProcessOnlineView(TemplateView):
    """
    Shows payment processing message or error
    """
    catalog_template_name = 'catalog/catalog_base.html'
    template_name = 'payments/process_online.html'

    def post(self, request, *args, **kwargs):
        return HttpResponseRedirect(reverse('sales_checkout_receipt', args=[kwargs['order_id'], kwargs['receipt_code']]))

    def get(self, request, order_id=None, receipt_code=None, *arg, **kwargs):
        if kwargs.get('order_id', None):
            self.order_id = self.kwargs['order_id']
        if kwargs.get('receipt_code', None):
            self.receipt_code = self.kwargs['receipt_code']
        if request.method == 'GET':
            self.form = None
            self.gateways = Gateway.get_gateways()
            self.order = get_object_or_404(Order, id=order_id, receipt_code=receipt_code)
            self.default_currency = get_default_currency(request)

            for self.gateway in self.gateways:
                if self.gateway.accept_credit_card:
                    self.form = CreditCardForm(initial={'gateway': self.gateway})
        return super(ProcessOnlineView, self).get(request, order_id, receipt_code, *arg, **kwargs)

    def get_context_data(self, **kwargs):
        context = super(ProcessOnlineView, self).get_context_data(**kwargs)
        context['form'] = self.form
        context['order'] = self.order
        context['gateways'] = self.gateways
        context['default_currency'] = self.default_currency
        context['catalog_template_name'] = self.catalog_template_name

        context['SITE_NAME'] = 'Doorsale'
        context['SITE_TITLE'] = 'Doorsale'
        context['SITE_DESCRIPTION'] = 'Doorsale'
        context['COPYRIGHT'] = 'Doorsale'
        context['SUPPORT_EMAIL'] = 'Doorsale'

        if hasattr(self, 'page_title'):
            context['page_title'] = self.page_title
        return context

def process_online(request, order_id, receipt_code):
    """
    Shows online or process online payment
    """
    checkout_template_name = 'sales/checkout_base.html'
    if request.method == 'GET':
        form = None
        gateways = Gateway.get_gateways()
        order = get_object_or_404(Order, id=order_id, receipt_code=receipt_code)
        default_currency = get_default_currency(request)

        for gateway in gateways:
            if gateway.accept_credit_card:
                form = CreditCardForm(initial={'gateway': gateway})

        return render(request, 'payments/process_online.html',
                      {'form': form, 'order': order, 'gateways': gateways, 'default_currency': default_currency, 'checkout_template_name':checkout_template_name,})

    raise Http404


@transaction.non_atomic_requests
def process_credit_card(request, order_id, receipt_code):
    """
    Process credit card payment
    """
    if request.method == 'POST':
        error = None
        form = CreditCardForm(request.POST)
        order = get_object_or_404(Order, id=order_id, receipt_code=receipt_code)

        if form.is_valid():
            data = form.cleaned_data
            gateway = data['gateway']

            if gateway.name == Gateway.PAYPAL:
                processor = PayPal(gateway)
            elif gateway.name == Gateway.STRIPE:
                processor = Stripe(gateway)
            else:
                raise ImproperlyConfigured('%s is not supported gateway for processing credit cards.' % gateway)

            try:
                processor.credit_card_payment(data['card'], order, request.user)
                return render(request, 'payments/credit_card_processed.html', {'order': order})
            except Exception as e:
                error = e.message

        gateways = Gateway.get_gateways()
        default_currency = get_default_currency(request)
        return render(request, 'payments/process_online.html',
                      {'form': form, 'order': order, 'gateways': gateways,
                       'default_currency': default_currency, 'error': error})

    raise Http404


@transaction.non_atomic_requests
def process_account_request(request, order_id, receipt_code):
    """
    Process payment via online account like PayPal, Amazon ...etc
    """
    order = get_object_or_404(Order, id=order_id, receipt_code=receipt_code)
    if request.method == "POST":
        gateway_name = request.POST["gateway_name"]
        gateway = get_object_or_404(Gateway, name=gateway_name)

        try:
            if gateway.name == Gateway.PAYPAL:
                processor = PayPal(gateway)
                return HttpResponseRedirect(processor.create_account_payment(order, request.user))
            else:
                raise ImproperlyConfigured('Doorsale doesn\'t yet support payment with %s account.'
                                           % gateway.get_name_display())
        except Exception as e:
            request.session['processing_error'] = e.message
            return HttpResponseRedirect(reverse('payments_processing_message'))

    raise Http404


@transaction.non_atomic_requests
def process_account_response(request, transaction_id, access_token, success):
    """
    Process payment via online account like PayPal, Amazon ...etc
    """
    payment_txn = get_object_or_404(Transaction, id=int(transaction_id))
    try:
        if payment_txn.get_param('access_token') != access_token:
            raise Http404
    except TransactionParam.DoesNotExist:
        raise Http404

    if request.method == "GET":
        order = payment_txn.order
        gateway = payment_txn.gateway

        try:
            if gateway.name == Gateway.PAYPAL:
                processor = PayPal(gateway)
                if success:
                    payer_id = request.GET['PayerID']
                    processor.execute_account_payment(payer_id, payment_txn, request.user)
                    return HttpResponseRedirect(reverse('sales_checkout_receipt', args=[order.id, order.receipt_code]))
                else:
                    processor.cancel_account_payment(payment_txn, request.user)
                    request.session['processing_message'] = 'Your order has been canceled.'
                    return HttpResponseRedirect(reverse('payments_processing_message'))
            else:
                raise ImproperlyConfigured('Doorsale doesn\'t yet support payment with %s account.'
                                           % gateway.get_name_display())

        except Exception as e:
            request.session['processing_error'] = e.message
            return HttpResponseRedirect(reverse('payments_processing_message'))

    raise Http404


class ProcessingMessageView(CatalogBaseView):
    """
    Shows payment processing message or error
    """
    template_name = 'payments/processing_message.html'

    def get(self, request):
        breadcrumbs = ({'name': 'Processing Status', 'url': reverse('payments_processing_message')},)

        if 'processing_error' in request.session:
            return super(ProcessingMessageView, self).get(
                request, error=request.session.pop('processing_error'), breadcrumbs=breadcrumbs)
        elif 'processing_message' in request.session:
            return super(ProcessingMessageView, self).get(
                request, message=request.session.pop('processing_message'), breadcrumbs=breadcrumbs)

        return HttpResponseRedirect(reverse('sales_checkout_cart'))

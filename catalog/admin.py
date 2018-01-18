from django.contrib import admin

from doorsale_site.admin import ModelAdmin
from catalog import models

class FilterProductAdmin(ModelAdmin): 
    
    def save_model(self, request, obj, form, change):
        obj.user = request.user
        obj.save()

    def get_queryset(self, request): 
        # For Django < 1.6, override queryset instead of get_queryset
        qs = super(FilterProductAdmin, self).get_queryset(request) 
        if request.user.is_superuser:
            return qs.all()
        else:
            return qs.filter(created_by=request.user)

    def has_change_permission(self, request, obj=None):
        if not obj:
            return True
        try:
            return obj.user == request.user
        except Exception as e:
            return True

class ManufacturerAdmin(ModelAdmin):
    list_display = ( 'user', 'ruc', 'id_ministerio', 'razon_social')
    prepopulated_fields = {'slug': ('razon_social',)}
    list_filter = ('is_active', 'created_on', 'marca_ecuador', 'ruc', 'id_ministerio')
    search_fields = ('id', )
    date_hierarchy = 'created_on'


class CategoryAdmin(ModelAdmin):
    list_display = ('name', 'parent', 'tags', 'display_order', 'is_active',)
    prepopulated_fields = {'slug': ('name',)}
    list_filter = ('parent', 'created_on',)
    search_fields = ('name', 'description', 'tags',)
    date_hierarchy = 'created_on'


class ProductAdmin(FilterProductAdmin):
    list_display = ('name', 'brand', 'price', 'quantity', 'is_active', 'is_bestseller', 'is_featured',)
    list_filter = ('brand', 'is_active', 'is_bestseller', 'is_featured', 'is_free_shipping', 'created_on',)
    search_fields = ('name', 'gist', 'brand__name', 'sku', 'gtin', 'part_number',)
    prepopulated_fields = {'slug': ('name',)}
    date_hierarchy = 'created_on'

    def render_change_form(self, request, context, *args, **kwargs):
        if not request.user.is_superuser:
            context['adminform'].form.fields['brand'].queryset = models.Manufacturer.objects.filter(user=request.user)
        return super(ProductAdmin, self).render_change_form(request, context, args, kwargs)

class ProductSpecAdmin(FilterProductAdmin):
    list_display = ('product', 'name', 'value', 'display_order',)
    list_filter = ('name', 'created_on',)
    search_fields = ('name', 'value', 'product__name',)
    date_hierarchy = 'created_on'

    def render_change_form(self, request, context, *args, **kwargs):
        if not request.user.is_superuser:
            context['adminform'].form.fields['product'].queryset = models.Product.objects.filter(brand__user=request.user)
        return super(ProductSpecAdmin, self).render_change_form(request, context, args, kwargs)

class ProductPicAdmin(FilterProductAdmin):
    # product
    list_display = ('id', 'product', 'url', 'display_order',)
    list_filter = ('created_on',)
    search_fields = ('id', 'product__name', 'url',)
    date_hierarchy = 'created_on'

    def render_change_form(self, request, context, *args, **kwargs):
        if not request.user.is_superuser:
            context['adminform'].form.fields['product'].queryset = models.Product.objects.filter(brand__user=request.user)
        return super(ProductPicAdmin, self).render_change_form(request, context, args, kwargs)

admin.site.register(models.Manufacturer, ManufacturerAdmin)
admin.site.register(models.Category, CategoryAdmin)
admin.site.register(models.Product, ProductAdmin)
admin.site.register(models.ProductSpec, ProductSpecAdmin)
admin.site.register(models.ProductPic, ProductPicAdmin)

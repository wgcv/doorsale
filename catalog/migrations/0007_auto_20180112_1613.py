# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2018-01-12 16:13
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('catalog', '0006_manufacturer_country'),
    ]

    operations = [
        migrations.AlterField(
            model_name='manufacturer',
            name='id_ministerio',
            field=models.CharField(blank=True, max_length=256, verbose_name='Identificador Ministerior'),
        ),
    ]

# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2018-01-16 16:44
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sales', '0003_auto_20180116_1536'),
    ]

    operations = [
        migrations.AlterField(
            model_name='paymentmethod',
            name='code',
            field=models.CharField(choices=[('CC', 'Credit Card'), ('PP', 'PayPal'), ('BK', 'Bank Deposit')], max_length=2, primary_key=True, serialize=False),
        ),
    ]

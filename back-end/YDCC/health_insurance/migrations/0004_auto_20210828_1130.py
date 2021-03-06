# Generated by Django 3.2 on 2021-08-28 04:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('health_insurance', '0003_auto_20210828_1028'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='hospital',
            name='KCD_id',
        ),
        migrations.AlterField(
            model_name='healthinsurance',
            name='picture',
            field=models.ImageField(upload_to='static/avatar'),
        ),
        migrations.AlterField(
            model_name='healthinsurance',
            name='qr_code',
            field=models.ImageField(blank=True, null=True, upload_to='static/qrcode'),
        ),
        migrations.AlterField(
            model_name='hospital',
            name='license_date',
            field=models.DateField(),
        ),
        migrations.AlterField(
            model_name='hospital',
            name='license_id',
            field=models.CharField(max_length=12),
        ),
    ]

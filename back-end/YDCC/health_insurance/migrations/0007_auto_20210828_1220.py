# Generated by Django 3.2 on 2021-08-28 05:20

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('health_insurance', '0006_auto_20210828_1159'),
    ]

    operations = [
        migrations.AlterField(
            model_name='healthrecord',
            name='organ_donor',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='healthrecord',
            name='re_examination',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='healthrecord',
            name='referral',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='health_insurance_referral', to='health_insurance.hospital'),
        ),
    ]

# Generated by Django 3.2 on 2021-08-21 03:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('citizen', '0002_alter_citizen_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='citizen',
            name='id',
            field=models.CharField(editable=False, max_length=12, primary_key=True, serialize=False),
        ),
    ]

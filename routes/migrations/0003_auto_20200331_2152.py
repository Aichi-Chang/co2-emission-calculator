# Generated by Django 3.0.4 on 2020-03-31 21:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('routes', '0002_auto_20200331_2137'),
    ]

    operations = [
        migrations.AlterField(
            model_name='busroute',
            name='travelBy',
            field=models.CharField(max_length=20),
        ),
        migrations.AlterField(
            model_name='cycleroute',
            name='travelBy',
            field=models.CharField(max_length=20),
        ),
        migrations.AlterField(
            model_name='driveroute',
            name='travelBy',
            field=models.CharField(max_length=20),
        ),
        migrations.AlterField(
            model_name='tuberoute',
            name='travelBy',
            field=models.CharField(max_length=20),
        ),
    ]

# Generated by Django 4.2.7 on 2023-11-17 11:40

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("server", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="comment",
            name="score",
            field=models.FloatField(default=0),
        ),
        migrations.AlterField(
            model_name="userprofile",
            name="score",
            field=models.FloatField(default=10),
        ),
    ]
# Generated by Django 5.2 on 2025-04-24 07:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('leave_management', '0003_rename_from_date_leaverequest_end_date_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='leaverequest',
            old_name='end_date',
            new_name='from_date',
        ),
        migrations.RenameField(
            model_name='leaverequest',
            old_name='start_date',
            new_name='to_date',
        ),
        migrations.AddField(
            model_name='leaverequest',
            name='leave_type',
            field=models.CharField(default='Sick', max_length=100),
            preserve_default=False,
        ),
    ]

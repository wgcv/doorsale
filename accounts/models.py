from __future__ import unicode_literals

from datetime import timedelta

from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone
from django.core.exceptions import ValidationError
from django.contrib.auth.models import AbstractUser as _AbstractUser, UserManager as _UserManager
from django.contrib.auth.models import User

class UserManager(_UserManager):

    def register(self, first_name, last_name, email, password, is_verified=False, **extra_fields):
        verify_code = None
        if not is_verified:
            verify_code = self.make_random_password(length=20)
        if self.filter(email__iexact=email).count() > 0:
            raise ValidationError("User with this Email address already exists.")
        if self.count() == 0:
            user = self.create_superuser(username=email,
                                         first_name=first_name,
                                         last_name=last_name,
                                         email=email,
                                         password=password,
                                         is_verified=is_verified,
                                         verify_code=verify_code,
                                         updated_by=email,
                                         created_by=email,
                                         # is_active=True,
                                         **extra_fields)
        else:
            user = self.create_user(username=email,
                                    first_name=first_name,
                                    last_name=last_name,
                                    email=email,
                                    password=password,
                                    is_verified=is_verified,
                                    verify_code=verify_code,
                                    updated_by=email,
                                    created_by=email,
                                    # is_active=True,
                                    **extra_fields)
        return user

    def get_reset_code(self, email):
        try:
            user = self.get(email__iexact=email)
            user.reset_code = self.make_random_password(length=20)
            user.reset_code_expire = timezone.now() + timedelta(days=1)
            user.save()
            return user
        except get_user_model().DoesNotExist:
            raise ValidationError('We can\'t find that email address, sorry!')

    def reset_password(self, user_id, reset_code, password):
        if not password:
            raise ValidationError('New password can\'t be blank.')
        try:
            user = self.get(id=user_id)
            if not user.reset_code or user.reset_code != reset_code or user.reset_code_expire < timezone.now():
                raise ValidationError('Password reset code is invalid or expired.')
            user.reset_code = None
            user.set_password(password)
            user.save()
        except get_user_model().DoesNotExist:
            raise ValidationError('Password reset code is invalid or expired.')

    def change_password(self, user, current_password, password):
        if not password:
            raise ValidationError('New password can\'t be blank.')
        user = self.get(id=user.id)
        if not user.check_password(current_password):
            raise ValidationError('Your current password is wrong.')
        user.set_password(password)
        user.save()


class AbstractUser(_AbstractUser):
    """
    An abstract class extending Django authentication user model for Doorsale.
    """

    # birth_date = models.DateField(null=True, blank=True)
    is_verified = models.BooleanField(default=True)
    verify_code = models.CharField(max_length=512, blank=True, null=True,
                                   help_text='User account verification code.', editable=False)
    reset_code = models.CharField(max_length=512, blank=True, null=True,
                                  help_text='Password reset code.', editable=False)
    reset_code_expire = models.DateTimeField(max_length=512, blank=True, null=True,
                                             help_text='Password reset code expire date.', editable=False)
    updated_on = models.DateTimeField(auto_now=True)
    updated_by = models.CharField(max_length=100)
    created_on = models.DateTimeField(auto_now_add=True)
    created_by = models.CharField(max_length=100)
    terms_condition = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)
    objects = UserManager()

    REQUIRED_FIELDS = ['email', 'updated_by', 'created_by']

    class Meta:
        abstract = True

    @classmethod
    def get_by_username(cls, username):
        """
        Returns user for specified username or raised DoesNotExist exception
        """
        return cls.objects.get(username__iexact=username)


class User(AbstractUser):
    """
    Extends Django authentication user model for Doorsale.
    """


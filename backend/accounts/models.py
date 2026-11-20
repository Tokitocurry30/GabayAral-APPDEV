from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    """
    Temporary global user model for GabayAral.

    One user account can eventually belong to
    multiple schools through school memberships.
    """

    pass
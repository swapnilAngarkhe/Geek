import pytest

# from django.contrib.auth.models import User
from django.contrib.auth import get_user_model

from .models import Post

User=get_user_model()

@pytest.mark.django_db
def test_post_creation():
    user = User.objects.create_user(
        username="testuser",
        password="testpassword",
    )

    post = Post.objects.create(
        content="Hello from pytest!",
        user=user,
    )

    assert post.content == "Hello from pytest!"
    assert post.user == user



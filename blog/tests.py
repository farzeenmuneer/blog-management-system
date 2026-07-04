
# blog/tests.py
from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.test import APIClient
from rest_framework import status
from .models import Post

class PostAPITests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user('testuser', 'test@test.com', 'test123')
        self.post = Post.objects.create(
            title='Test Post',
            content='Test content',
            author=self.user
        )
    
    def test_list_posts(self):
        response = self.client.get('/api/posts/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
    
    def test_create_post_authenticated(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.post('/api/posts/', {
            'title': 'New Post',
            'content': 'New content'
        })
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
    
    def test_create_post_unauthenticated(self):
        response = self.client.post('/api/posts/', {
            'title': 'New Post',
            'content': 'New content'
        })
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
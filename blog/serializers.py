# blog/serializers.py
from rest_framework import serializers
from .models import Post, Comment
from django.contrib.auth.models import User

class CommentSerializer(serializers.ModelSerializer):
    """Serializer for comments"""
    author = serializers.StringRelatedField(read_only=True)  # ✅ Use StringRelatedField
    author_id = serializers.ReadOnlyField(source='author.id')
    
    class Meta:
        model = Comment
        fields = ['id', 'post', 'author', 'author_id', 'content', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at']

class PostSerializer(serializers.ModelSerializer):
    """Serializer for posts (list view)"""
    author = serializers.StringRelatedField(read_only=True)  # ✅ Use StringRelatedField
    author_id = serializers.ReadOnlyField(source='author.id')
    comment_count = serializers.IntegerField(source='comments.count', read_only=True)
    
    class Meta:
        model = Post
        fields = ['id', 'title', 'author', 'author_id', 'content', 'created_at', 'updated_at', 'comment_count']
        read_only_fields = ['created_at', 'updated_at']

class PostDetailSerializer(PostSerializer):
    """Serializer for post detail (includes comments)"""
    comments = CommentSerializer(many=True, read_only=True)
    
    class Meta(PostSerializer.Meta):
        fields = PostSerializer.Meta.fields + ['comments']
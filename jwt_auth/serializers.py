from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from django.core.exceptions import ValidationError

import django.contrib.auth.password_validation as validations

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):

    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    password_confirmation = serializers.CharField(write_only=True)

    # def clean_email(self):
    #     if User.objects.filter(email=self.cleaned_data['email']).exists():
    #         raise serializers.ValidationError({'email': "the given email is already registered"})
    #     return self.cleaned_data['email']

    def validate(self, data):

        password = data.pop('password')
        password_confirmation = data.pop('password_confirmation')

        if password != password_confirmation:
            raise serializers.ValidationError({'password_confirmation': 'Passwords do not match'})

        try:
            validations.validate_password(password=password)
        except ValidationError as err:
            raise serializers.ValidationError({'password': err.messages})
        # Note: We could skip this step, which might be desirable to make manual testing easier. However it's a neat feature that requires little effort on our part.

        # hash password using make_password
        data['password'] = make_password(password)
        return data


    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'password_confirmation')
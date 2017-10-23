from django.views.decorators.csrf import csrf_exempt
from django.conf.urls import include, url
from django.contrib import admin
from .views import Login, Logout, CreateUser, ShowGenius, ShowWonders


urlpatterns = [
	url(r'^$', Login.as_view(), name="Login"),
	url(r'^login/$', Login.as_view(), name="Login"),
	url(r'^logout/$', Logout.as_view(), name="Logout"),
	url(r'^createuser/$', CreateUser.as_view(), name="CreateUser"),
	url(r'^genius/', ShowGenius.as_view(), name="GeniusCharSheet"),
	url(r'^wonder/', ShowWonders.as_view(), name="WonderList"),
	url(r'^wondercreate/', ShowWonders.as_view(), name="WonderList"),
]

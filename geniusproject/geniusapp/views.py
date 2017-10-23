from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.views.generic import View
from .models import genius_char, wonder_info

# Create your views here.
class Login(View):
	def get(self, request):
		print("Login Get")
		if "id" in request.session:
			if request.session["id"] != None:
				user = User.objects.get(id=request.session["id"])
				print(request.session["id"])
				return render(request, "geniusapp/home.html")
		return render(request, "geniusapp/login.html",{'forms':AuthenticationForm()})

	def post(self, request):
		username = request.POST['username']
		password = request.POST['password']
		user = authenticate(username=username, password=password)
		if user:
			if user.is_active:
				request.session["id"]= user.id
				return render(request, "geniusapp/home.html", {"user":user.id})
		print("Test")
		return render(request, "geniusapp/login.html",{'forms':AuthenticationForm(request.POST)})

class CreateUser(View):

	def get(self, request):
		print("CreateUser Get")
		return render(request, "geniusapp/createuser.html", {"forms": UserCreationForm() })

	def post(self, request):	
		tempform = UserCreationForm(request.POST)
		print(tempform)
		if tempform.is_valid():
			print("PING")
			user = tempform.save()
			return render(request, "geniusapp/home.html", {'user':user.id})
		else:
			return render(request, "geniusapp/createuser.html", {"forms": UserCreationForm(request.POST) })
			
class Logout(View):

	def get(self, request):
		print("Logout Get")
		if "id" in request.session:
			if request.session["id"] != None:
				request.session["id"] = None
		return redirect("Login")

class ShowGenius(View):
	def get(self, request):
		print("GENIUS GET")
		if "id" in request.session:
			if request.session["id"] != None:
				print("Getting Genius Info from User ID")
				try:
					result =genius_char.objects.get(owner_id=request.session["id"])
				except genius_char.DoesNotExist:
					result = None
				if result ==  None:
					print("New Genius")
					genius_info = {"new":True}
					return render(request, "geniusapp/genius.html",{"genius":genius_info})
				else:
					print("Existing Genius")

				print(genius_info)
				print(result)
				
		return redirect("Login")

	def post(self, request):
		print(request.POST)
		print(request.POST.get("genius","fail"))
		temp_genius = request.POST.get("genius",False)
		if temp_genius == False:
			return HttpResponse(str("TEST"))
		else:
			try:
				result =genius_char.objects.get(owner_id=request.session["id"])
			except genius_char.DoesNotExist:
				result = None
			if result == None:
				print("test1")
				# genius_char.objects.create()
			else:
				print("test2")

class ShowWonders(View):
	def get(self,request):
		print("Wonders Get")
		if "id" in request.session:
			if request.session["id"] != None:
				print("Getting Genius Info from User ID")
				try:
					result =genius_char.objects.get(owner_id=request.session["id"])
				except genius_char.DoesNotExist:
					result = None
				if result ==None:
					print("No such genius")
					return redirect("Login")
				else:
					wonder_info.objects.filter(genius_char=result)
					print(wonder_info)
					return render(request, "geniusapp/wonderview.html",{"wonders":wonder_info})
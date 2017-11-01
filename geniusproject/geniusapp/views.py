from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.views.generic import View
from .models import genius_char, wonder_info
import json

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
					result = genius_char.objects.get(owner_id=request.session["id"])
				except genius_char.DoesNotExist:
					result = None
				if result ==  None:
					print("New Genius")
					genius_info = {"new":True}
					return render(request, "geniusapp/genius.html",{"genius":genius_info})
				else:
					print("Existing Genius")
					genius_info = {"genius":result}
					return render(request, "geniusapp/genius.html",{"genius":genius_info})

				print(genius_info)
				print(result)
				
		return redirect("Login")
	#Save genius
	def post(self, request):
		print(request.POST)
		print(request.POST.get("genius","fail"))
		temp_genius = request.POST.get("genius",False)

		#Convert Json string to dictionary
		if temp_genius != False:
			temp_genius = json.loads(temp_genius)

		
		#Get all items in new_genius
		new_genius = {}
		player_attr = {}
		for sub_list in temp_genius.keys():
			if sub_list != "merit" and sub_list != "playerInfo":
				for item in temp_genius[sub_list].keys():
					if item != "":
						new_genius[item] = temp_genius[sub_list][item]
			else:
				#Two objects should not be dirrectly added to the new genius: merits and playerInfo
				if sub_list == "merit":
					new_genius[sub_list] = temp_genius[sub_list]
				elif sub_list == "playerInfo":
					player_attr = temp_genius[sub_list]

		print(new_genius)
		print(player_attr)
		if temp_genius == False:
			return HttpResponse(str("TEST"))
		else:
			try:
				result =genius_char.objects.get(owner_id=request.session["id"])
			except genius_char.DoesNotExist:
				result = None
			if result == None:
				temp_genius_object = genius_char.create_genius(player_attr, new_genius, User.objects.get(id=request.session["id"]))
				print(temp_genius_object)
				print("test1")
				temp_genius_object.save()
				
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
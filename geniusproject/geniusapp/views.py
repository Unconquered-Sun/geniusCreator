from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.core import serializers
from django.views.generic import View
from .models import genius_char, wonder_info
import json


#Update an existing genius object
def update_genius(self, attributes, userID):
		self.owner = userID;
		self.name = attributes.get('name');
		self.player = attributes.get('player')
		self.chronicle = attributes.get('chronicle')
		self.concept = attributes.get('concept')
		self.catalyst = attributes.get('catalyst')
		self.foundation = attributes.get('foundation')
		self.virtue = attributes.get('virtue')
		self.vice = attributes.get('vice')
		self.aesthetic = attributes.get('aesthetic')
		self.strength_attr = attributes.get('strength')
		self.dexterity_attr = attributes.get('dexterity')
		self.stamina_attr = attributes.get('stamina')
		self.intelligence_attr = attributes.get('intelligence')
		self.wits_attr = attributes.get('wits')
		self.resolve_attr = attributes.get('resolve')
		self.presence_attr = attributes.get('presence')
		self.manipulation_attr = attributes.get('manipulation')
		self.composure_attr = attributes.get('composure')
		self.academics_skill = attributes.get('academics')
		self.computer_skill = attributes.get('computer')
		self.crafts_skill = attributes.get('crafts')
		self.investigation_skill = attributes.get('investigation')
		self.medicine_skill = attributes.get('medicine')
		self.occult_skill = attributes.get('occult')
		self.politics_skill = attributes.get('politics')
		self.science_skill = attributes.get('science')
		self.athletics_skill = attributes.get('athletics')
		self.brawl_skill = attributes.get('brawl')
		self.drive_skill = attributes.get('drive')
		self.firearms_skill = attributes.get('firearms')
		self.larceny_skill = attributes.get('larceny')
		self.stealth_skill = attributes.get('stealth')
		self.survival_skill = attributes.get('survival')
		self.weaponry_skill = attributes.get('weaponry')
		self.animal_ken_skill = attributes.get('animalken')
		self.empathy_skill = attributes.get('empathy')
		self.expression_skill = attributes.get('expression')
		self.intimidation_skill = attributes.get('intimidation')
		self.persuasion_skill = attributes.get('persuasion')
		self.socialize_skill = attributes.get('socialize')
		self.streetwise_skill = attributes.get('streetwise')
		self.subterfuge_skill = attributes.get('subterfuge')
		self.apokalypsi_axiom = attributes.get('apokalypsi')
		self.automata_axiom = attributes.get('automata')
		self.epikrato_axiom = attributes.get('epikrato')
		self.exelixi_axiom = attributes.get('exelixi')
		self.katastrofi_axiom = attributes.get('katastrofi')
		self.metaptropi_axiom = attributes.get('metaptropi')
		self.prostasia_axiom = attributes.get('prostasia')
		self.skafoi_axiom = attributes.get('skafoi')
		self.inspiration = attributes.get('inspiration')
		self.obligation = attributes.get('obligation')
		self.size = attributes.get('size')
		self.armor = attributes.get('armor')
		self.specialties = {}
		self.merits = attributes.get("merit")



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
					genius_info = serializers.serialize('json', [result,])
					print(genius_info)
					return render(request, "geniusapp/genius.html",{"genius":genius_info})

				
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
			if sub_list != "merit" and sub_list != "specialties":
				for item in temp_genius[sub_list].keys():
					if item != "":
						new_genius[item] = temp_genius[sub_list][item]
			else:
				#Two objects should not be dirrectly added to the new genius: merits and playerInfo
				if sub_list == "merit":
					new_genius[sub_list] = temp_genius[sub_list]
				elif sub_list == "specialties":
					player_attr = temp_genius[sub_list]

		#If the test_genius is not in the request.POST do nothing
		if temp_genius == False:
			return HttpResponse(str("TEST"))
		#If the test_genius does contain information then 
		else:
			#Attempt to load the genius by the user id
			try:
				result = genius_char.objects.get(owner_id=request.session["id"])
			except genius_char.DoesNotExist:
				result = None
			#If the genius is not found then we will create the genius
			if result == None:
				temp_genius_object = genius_char.create_genius( new_genius, User.objects.get(id=request.session["id"]))
				#And save the genius
				temp_genius_object.save()
				#Before returning created
				return JsonResponse({"result":"created"})
			#If the genius is found in the datbase then we will update the genius
			else:
				update_genius(result, new_genius, User.objects.get(id=request.session["id"]) )
				#And save the result
				result.save()
				
				return JsonResponse({"result":"updated"})

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
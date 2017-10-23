from django.db import models
from django.contrib.auth.models import User
from django.contrib.postgres.fields import JSONField
# Create your models here.

class genius_char(models.Model):
	owner = models.ForeignKey(User, on_delete=models.CASCADE)
	name = models.CharField(max_length=256)
	catalyst = models.CharField(max_length=256)
	foundation = models.CharField(max_length=256)
	virtue = models.CharField(max_length=256)
	vice = models.CharField(max_length=256)
	aesthetics = models.TextField()
	strength_attr = models.IntegerField()
	dexterity_attr = models.IntegerField()
	stamina_attr = models.IntegerField()
	intelligence_attr = models.IntegerField()
	wits_attr = models.IntegerField()
	resolve_attr = models.IntegerField()
	presence_attr = models.IntegerField()
	manipulation_attr = models.IntegerField()
	composure_attr = models.IntegerField()
	academics_skill = models.IntegerField()
	computer_skill = models.IntegerField()
	crafts_skill = models.IntegerField()
	investigation_skill = models.IntegerField()
	medicine_skill = models.IntegerField()
	occult_skill = models.IntegerField()
	politics_skill = models.IntegerField()
	science_skill = models.IntegerField()
	athletics_skill = models.IntegerField()
	brawl_skill = models.IntegerField()
	drive_skill = models.IntegerField()
	firearms_skill = models.IntegerField()
	larceny_skill = models.IntegerField()
	stealth_skill = models.IntegerField()
	survival_skill = models.IntegerField()
	weaponry_skill = models.IntegerField()
	animal_ken_skill = models.IntegerField()
	empathy_skill = models.IntegerField()
	expression_skill = models.IntegerField()
	intimidation_skill = models.IntegerField()
	persuasion_skill = models.IntegerField()
	socialize_skill = models.IntegerField()
	streetwise_skill = models.IntegerField()
	subterfuge_skill = models.IntegerField()
	apokalypsi_axiom = models.IntegerField()
	automata_axiom = models.IntegerField()
	epikrato_axiom = models.IntegerField()
	exelixi_axiom = models.IntegerField()
	katastrofi_axiom = models.IntegerField()
	metaptropi_axiom = models.IntegerField()
	prostasia_axiom = models.IntegerField()
	skafoi_axiom = models.IntegerField()
	inspiration = models.IntegerField()
	obligation = models.IntegerField()
	size = models.IntegerField()
	specialties = JSONField()
	merits = JSONField()

	@classmethod
	def create_genius(self, player_info, attributes, userID):
		genius_instance = self(
			owner = userID,
			name = player_info.get('name'),
			catalyst = player_info.get('catalyst'),
			foundation = player_info.get('foundation'),
			virtue = player_info.get('virtue'),
			vice = player_info.get('vice'),
			aesthetics = player_info.get('aesthetics'),
			strength_attr = attributes.get('strength'),
			dexterity_attr = attributes.get('dexterity'),
			stamina_attr = attributes.get('stamina'),
			intelligence_attr = attributes.get('intelligence'),
			wits_attr = attributes.get('wits'),
			resolve_attr = attributes.get('resolve'),
			presence_attr = attributes.get('presence'),
			manipulation_attr = attributes.get('manipulation'),
			composure_attr = attributes.get('composure'),
			academics_skill = attributes.get('academics'),
			computer_skill = attributes.get('computer'),
			crafts_skill = attributes.get('crafts'),
			investigation_skill = attributes.get('investigation'),
			medicine_skill = attributes.get('medicine'),
			occult_skill = attributes.get('occult'),
			politics_skill = attributes.get('politics'),
			science_skill = attributes.get('science'),
			athletics_skill = attributes.get('athletics'),
			brawl_skill = attributes.get('brawl'),
			drive_skill = attributes.get('drive'),
			firearms_skill = attributes.get('firearms'),
			larceny_skill = attributes.get('larceny'),
			stealth_skill = attributes.get('stealth'),
			survival_skill = attributes.get('survival'),
			weaponry_skill = attributes.get('weaponry'),
			animal_ken_skill = attributes.get('animalken'),
			empathy_skill = attributes.get('empathy'),
			expression_skill = attributes.get('expression'),
			intimidation_skill = attributes.get('intimidation'),
			persuasion_skill = attributes.get('persuasion'),
			socialize_skill = attributes.get('socialize'),
			streetwise_skill = attributes.get('streetwise'),
			subterfuge_skill = attributes.get('subterfuge'),
			apokalypsi_axiom = attributes.get('apokalypsi'),
			automata_axiom = attributes.get('automata'),
			epikrato_axiom = attributes.get('epikrato'),
			exelixi_axiom = attributes.get('exelixi'),
			katastrofi_axiom = attributes.get('katastrofi'),
			metaptropi_axiom = attributes.get('metaptropi'),
			prostasia_axiom = attributes.get('prostasia'),
			skafoi_axiom = attributes.get('skafoi'),
			inspiration = attributes.get('inspiration'),
			obligation = attributes.get('obligation'),
			size = attributes.get('size'),
			specialties = {},
			merits = {})

		return(genius_instance)



class wonder_info(models.Model):
	genius_char = models.ForeignKey(genius_char, on_delete=models.CASCADE)
	axiom_id = models.IntegerField()
	rank = models.IntegerField()
	wonder_type_id = models.IntegerField()
	core_modifier = models.IntegerField()
	notes = models.TextField()
	fault = models.TextField()
	variables = JSONField()
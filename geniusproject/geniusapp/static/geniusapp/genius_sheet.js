Array.prototype.find = function(regex) {
  var arr = this;
  var matches = arr.filter( function(e) { return regex.test(e); } );
  return matches.map(function(e) { return arr.indexOf(e); } );
};


$(document).ready(function(){
	//Old checkbox pattern
	// checkboxPattern ={"mental_attr":["intelligence","wits","resolve"],
	// 		"social_attr":["presence","manipulation","composure"],
	// 		"physical_attr":["strength","dexterity","stamina"], 
	// 		"mental_skills":["academics","computer","crafts","investigation","medicine","occult","politics","science"],
	// 		"physical_skills":["athletics","brawl","drive","firearms","larceny","stealth","survival","weaponry"],
	// 		"social_skills":["animalken","empathy","expression","intimidation","persuasion","socialize","streetwise","subterfuge"],
	// 		"axioms":["apokalypsi","automata","epikrato","exelixi","katastrofi","metaptropi","prostasia","skafoi"]}
	

	// textboxPattern={"name_player_game":["name","player","chronicle"],
	// 				"virtue_vice_concept":["virtue","vice","concept"],
	// 				"catalyst_foundation_aesthetic":["catalyst","foundation","aesthetic"]}
	// for (key in textboxPattern){
	// 	load_text_box(key, textboxPattern[key])
	// }
	// function load_text_box(target, keys){
	// 	var text_output = "";
	// 	text_output = '<table id="'+target+'_table">'
	// 	for( key in keys){
	// 		text_output += '<tr>'
	// 		text_output+='<td id="'+keys[key]+'_key">'+toUpperCase(keys[key])+':</td>';
	// 		text_output += '<td><input type="text" id="'+keys[key]+'_value" class="'+keys[key]+'_value textbox '+target+'"></td>';
	// 		text_output += '</tr>'
	// 	}
	// 	text_output += '</table>';
	// 	$("#"+target).html(text_output);
	// }
	
	var range=[1,2,3,4,5]
	skillsPattern ={"mental_skills":["academics","computer","crafts","investigation","medicine","occult","politics","science"],
			"physical_skills":["athletics","brawl","drive","firearms","larceny","stealth","survival","weaponry"],
			"social_skills":["animalken","empathy","expression","intimidation","persuasion","socialize","streetwise","subterfuge"]}
	
	specialCases={
		"mental_attr":{"keys":["intelligence","wits","resolve"] ,"value_type":"dots", "key_type":"standard"},
		"social_attr":{"keys":["presence","manipulation","composure"] ,"value_type":"dots", "key_type":"standard"},
		"physical_attr":{"keys":["strength","dexterity","stamina"] ,"value_type":"dots", "key_type":"standard"},
		"axioms":{"keys":["apokalypsi","automata","epikrato","exelixi","katastrofi","metaptropi","prostasia","skafoi"] ,"value_type":"dots", "key_type":"standard"},
		
		"char_info_1":{"keys":["name","player","chronicle"],"value_type":"text","key_type":"standard"},
		"char_info_2":{"keys":["virtue","vice","concept"],"value_type":"text","key_type":"standard"},
		"char_info_3":{"keys":["catalyst","foundation","aesthetic"],"value_type":"text","key_type":"standard"},
		"merits":{"keys":['<input type="text" class="specialcase">','<input type="text" class="specialcase">','<input type="text" class="specialcase">','<input type="text" class="specialcase">','<input type="text" class="specialcase">','<input type="text" class="specialcase">','<input type="text" class="specialcase">','<input type="text" class="specialcase">','<input type="text" class="specialcase">'], "value_type":"dots", "key_type":"html"},
		"misc":{"keys":['health','willpower','inspiration','mania','jabir','obligation','socialPenalty','size','speed','defense','armor','initative'],"value_type":"text","key_type":"standard"} }
	
	// Load skills
	for (key in skillsPattern){
		load_skills(key, skillsPattern[key])
	}
	
	var case_id = 1
	for(specialCase in specialCases){
		new_case_id = load_special_cases(specialCase, specialCases[specialCase]["keys"], specialCases[specialCase]["value_type"], specialCases[specialCase]["key_type"], case_id)
		case_id+= new_case_id
	}

	function load_skills(target, keys){
		var skill_output = "";
		skill_output = '<table id="'+target+'_table">'
		for( key in keys){
			skill_output += '<tr>'
			skill_output+='<td id="'+keys[key]+'_key">'+toUpperCase(keys[key])+':</td>';
			skill_output += '<td class="value"><div>';
			for(x in range){
				skill_output+='<input type="checkbox" class="'+range[x]+' checkbox '+keys[key]+' '+target+'">'
			}
			skill_output += '</td>';
			skill_output += '</tr>'

			//Add specialty textbox under the skill
			skill_output += '<tr>'
			skill_output += '<td>Specialties:</td>'
			skill_output += '<td><input type="textbox" class="specialties '+keys[key]+'"></td>'
			skill_output += '</tr>'
		}
		skill_output += '</table>';
		$("#"+target).html(skill_output);
	};


	function load_special_cases(target, keys, value_type, key_type, special_case_id){
		var special_output = "";
		key_name = ""
		starting_id = special_case_id;
		//New Method
		var x=1
		special_output += '<table id="'+target+'">'
		for (key in keys){
			special_output += '<tr>'

			//Create Key td
			if (key_type == "standard"){
				key_name = "key"
				special_output += '<td id="'+key_name+'_key" class="specialcase_key specialcase specialcase_id_'+starting_id+'">'+toUpperCase(keys[key])+':</td>';
			}
			else if (key_type == "html"){
				key_name = "target"
				special_output+='<td id="'+target+"_"+x+'_key" class="specialcase_key specialcase specialcase_id_'+starting_id+'">'+keys[key]+':</td>';
				
			}

			new_key = ""
			if (key_name=="target"){
				new_key= target+"_"+x
			}
			else if (key_name == "key"){
				new_key=keys[key]
			}
			x+=1

			//create value td
			if(value_type == "dots"){
				special_output+='<td id="'+new_key+'_dots" class="dots value"><div>'
				for(y in range){
					special_output+='<input type="checkbox" class="'+range[y]+' checkbox '+new_key+' '+target+' specialcase_value specialcase specialcase_id_'+starting_id+'">'
				}
				special_output+='</div></td>'
			}
			else if(value_type == "text"){
				special_output += "<td>"
				special_output += '<input type="text" class="'+target+'_textbox textbox '+new_key+' specialcase_value specialcase specialcase_id_'+starting_id+'">';
				special_output += "</td>"
			}
			special_output += "</tr>"
			starting_id += 1
		}
		special_output += "</table>"

		$("#"+target).html(special_output);

		return starting_id

		
	}


	function toUpperCase(word){
		return word.charAt(0).toUpperCase() + word.slice(1);
	}

	derivedValuesDictionary = {
		"health":{"operation":"add","values":[{"type":"dots","value":"stamina"},{"type":"text","value":"size"}]},
		"willpower":{"operation":"add","values":[{"type":"dots","value":"resolve"},{"type":"dots","value":"composure"}]},
		"speed":{"operation":"add","values":[{"type":"dots","value":"strength"},{"type":"dots","value":"dexterity"},{"type":"static","value":5}]},
		"defense":{"operation":"lower","values":[{"type":"dots","value":"dexterity"},{"type":"dots","value":"wits"}]},
		"initative":{"operation":"add","values":[{"type":"dots","value":"dexterity"},{"type":"dots","value":"composure"}]},
		"mania":{"operation":"chart", "reference":"inspiration", "chart":{0:0, 1:10, 2:12, 3:16, 4:20, 5:25, 6:30, 7:40, 8:60, 9:80, 10:100}},
		"jabir":{"operation":"chart", "reference":"inspiration", "chart":{0:0, 1:-1, 2:-1, 3:-1, 4:-1, 5:-2, 6:-2, 7:-2, 8:-3, 9:-3, 10:-3}},
		"socialPenalty":{"operation":"chart", "reference":"obligation", "chart":{1:-2, 2:-2, 3:-1, 4:-1, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0}},
	}
	derivedValuesHelper();

	function derivedValuesHelper(){
		for (target in derivedValuesDictionary){
			derivedValues(target, derivedValuesDictionary[target]);
		}
	}

	//target will be a string that contains the id of the text box
	//Values will be a list of dictionaries each dict contains a type and a value
	function derivedValues(target, values){
		//If the values must be added
		if(values["operation"]=="add"){
			total = 0;
			for (value in values["values"]){
				current_array = values["values"][value];
				if(current_array["type"] == "dots" ){
					total = total + getDots( current_array["value"] );
				}
				else if (current_array["type"] == "text" ){
					text_val = $("."+current_array["value"]).filter("input").val()
					if(text_val == ""){
						text_val = "0"
					}
					total = total + parseInt(text_val)
				}
				else if (current_array["type"] == "static" ){
					total = total + current_array["value"]
				}
			}
			$("."+target).filter("input").val(total).prop('disabled', true);
		}
		//if the values must be compared and the lowest returned
		else if(values["operation"]=="lower"){
			lowest = null
			// console.log(lowest)
			for (value in values["values"]){
				current_array = values["values"][value];
				if(current_array["type"] == "dots" ){
					value = getDots( current_array["value"] );
					if(lowest == null){
						lowest = value
						// console.log("dots")
					}
					else{
						if(value < lowest){
							lowest = value
						}
					}
				}
				else if (current_array["type"] == "text" ){
					text_val = $("."+current_array["value"]).filter("input").val()
					if(text_val == ""){
						text_val = "0"
					}
					value = parseInt(text_val)
					if(lowest == null){
						lowest = value
						console.log("text")
					}
					else{
						if(value < lowest){
							lowest = value
						}
					}
				}
				else if (current_array["type"] == "static" ){
					if(lowest == null){
						lowest = value
						console.log("static")
					}
					else{
						if(current_array["value"]< lowest){
							lowest = current_array["value"]
						}
					}
				}
			}
			$("."+target).filter("input").val(lowest).prop('disabled', true);
		}
		else if(values["operation"]=="chart"){
			// console.log("CHART")
			chart_val = $("."+values["reference"]).filter("input").val()
			// console.log(chart_val)
			if (chart_val == ""){
				$("."+target).filter("input").val(0).prop('disabled', true);
			}
			else{
				if(chart_val in values["chart"]){
					// console.log("EXISTS")
					$("."+target).filter("input").val( values["chart"][chart_val] ).prop('disabled', true);
				}
				else{
					// console.log("DOESNT EXIST")
					$("."+target).filter("input").val(0).prop('disabled', true);
				}
			}
		}
	}

	function getDots(className){
		dots = $(".checkbox").filter("."+className).filter(":checked").toArray();
		highestDot = 0;

		for (dot in dots){
			dotLevel = parseInt(dots[dot].className.charAt(0));
			// console.log(dotLevel)
			if(dotLevel>highestDot){
				highestDot=dotLevel;
			}
		}
		// console.log(dots);
		// console.log(highestDot);
		return highestDot;

	}


	//check box dot system
	$(".value div").on("click",".checkbox",function(e){
		console.log("PING")
		var classes = ($(this).attr("class")).split(" ");
		classes.splice(classes.indexOf("checkbox"),1);
		// console.log(classes)
		var adding = $(this).is(":checked");
		var targetNumber = parseInt(classes[0]);2
		var dots = $("."+classes[1]).toArray();
		// console.log(adding)
		for(dot in dots){
			singleDot = $(dots[dot])
			dotNumber = parseInt(singleDot.attr("class").split(" ")[0])
			if(dotNumber<targetNumber){
				singleDot.prop('checked', true);
			}
			else if(dotNumber>targetNumber){
				singleDot.prop('checked', false);
			}
			else{
				if(adding==true){
					singleDot.prop('checked', true);
				}
				else{
					singleDot.prop('checked', false);
				}
			}
		}
		derivedValuesHelper();
	});
	//Update derived values on textbox change
	$(".textbox").on("input propertychange paste",function(e){
		// console.log("PING INPUT")
		derivedValuesHelper();
	})

	$("#save").click(saveGenius);

	function saveGenius(){
		//Gets genius info. Including(name, catalyst, foundation, aesthetic, and more)
		var textBoxes = $(":text").not(".specialcase").toArray();
		var output = {};
		var playerInfo = {};
		console.log(textBoxes)
		for (text in textBoxes){
			key = textBoxes[text].id.replace("_value","")
			// console.log(key)
			playerInfo[key] = textBoxes[text].value;
		}
		output["playerInfo"]=playerInfo;

		//Get all skills and attributes that are not special cases
		var checkBoxes = $(":checkbox").not(".specialcase").toArray();
		var skillList = {}
		classList = [];
		for (x in skillsPattern){
			classList = classList.concat(skillsPattern[x])
		}
		for(x in classList){
			skillList[classList[x]]=getDots(classList[x])
		}
		output["skills"] = skillList;

		//Specialcases
		var specialCaseKey = $(".specialcase_key").toArray();
		// console.log(specialCaseKey)
		var specialCaseDict = {}
		// Create a new dictionary of each special case
		for(x in specialCaseKey){
			currentCase = specialCaseKey[x];
			classKey = $(currentCase).attr("class").split(' ').find( new RegExp("specialcase_id_.*") )[0];
			currentKey = $(currentCase).attr("class").split(' ')[classKey];
			// console.log(currentKey);
			value = $("."+currentKey).filter(".specialcase_value").toArray();
			key =  $("."+currentKey).filter(".specialcase_key").toArray()[0];
			specialCaseDict[currentKey] = {"key":key,"value":value}
		}
		specialCaseOutput = {}
		// console.log(specialCaseDict)
		//Get the keys of each value
		meritOutput = {}
		for (x in specialCaseDict){
			key = ""
			isMerit = false
			
			currentCase = $(specialCaseDict[x]["key"])

			classKey = $(currentCase).attr("class").split(' ').find( new RegExp("specialcase_id_.*") )[0];
			
			id = $(currentCase).attr("class").split(' ')[classKey];
			
			var key = ""
			// Get the key
			if (currentCase.children().length > 0){
				children = currentCase.children()
				if ($(children[0]).prop("nodeName") == "INPUT"){
					//Check if the input is not empty
					if($(children[0]).val() != ""){
						//If the id is a merit then put the end result in the meritOutput instead of specialCaseOutput
						if (currentCase.attr("id").includes("merit") ){
							console.log("Merit is true")
							key = $(children[0]).val()
							isMerit = true
						}
						else{
							key = $(children[0]).val()
						}
					}
				}
			}
			else{
				key = currentCase.text().slice(0,-1).toLowerCase()
			}

			if (key != ""){
				// console.log(key)
				value = 0
				if (specialCaseDict[x]["value"].length >1){
					value = getDots(id)
				}
				else{
					value = $(specialCaseDict[x]["value"][0]).val() 
					if (value == ""){
						value = "0"
					}
				}
				if (isMerit == true){
					meritOutput[key] = value
				}
				else{
					specialCaseOutput[key]=value
				}
			}
		}
		// console.log(meritOutput);
		output["merit"] = meritOutput;
		output["specialCase"] = specialCaseOutput;
		// console.log(specialCaseOutput);
		// console.log(specialCaseValue);

		console.log(output);
		$.ajax({
			url:"/genius/",
			type:"POST",
			data:{genius:JSON.stringify(output), csrfmiddlewaretoken:getCookie("csrftoken")},
			success: function(data){
				console.log(data)
			},
			error: function(request, textStatus, errorThrown){
				console.log('textStatus ' + textStatus);
				console.log('errorThrown ' + errorThrown);
			}
		})
		// $.post("/genius/",{"genius":output, "csrfmiddlewaretoken":getCookie("csrftoken")},function(data){
		// 	console.log(data)
		// });
	}



	function getCookie(name) {
		var cookieValue = null;
		if (document.cookie && document.cookie !== '') {
			var cookies = document.cookie.split(';');
			for (var i = 0; i < cookies.length; i++) {
				var cookie = jQuery.trim(cookies[i]);
				// Does this cookie string begin with the name we want?
				if (cookie.substring(0, name.length + 1) === (name + '=')) {
					cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
					break;
				}
			}
		}
		return cookieValue;
	}

	function loadGenius(){
		genius_data = $.parseJSON( $("#geniusJSON").text() )[0]["fields"]
		for (key in genius_data){
			// console.log(key.replace("_axiom","").replace("_skill",""))
			target = key.replace("_axiom","").replace("_skill","").replace("_attr","")
			//Load everthing with a numeric value
			if (Number.isInteger(genius_data[key]) ){
				// load skills, axioms, and attributes
				if (key.slice(-5) == "axiom" || key.slice(-5) == "skill" || key.slice(-4) == "attr" ){
					for (x=genius_data[key]; x>0; x--){
						temp_checkbox = $('.'+target).filter(".checkbox").filter("."+String( x ) )
						temp_checkbox.prop("checked", true)
					}
				}
				else{
					$(".textbox").filter("."+target+"_value").val(genius_data[key])
					$(".textbox").filter(".specialcase_value").filter("."+target).val(genius_data[key])
				}
			}
			else if(typeof genius_data[key] == "string"){
				$(".textbox").filter("."+target+"_value").val(genius_data[key])
				$(".textbox").filter(".specialcase_value").filter("."+target).val(genius_data[key])
			}
			else if (typeof genius_data[key] == "object"){
				if (key == "merits"){
					merit_list = genius_data[key]
					merit_keys = Object.keys( merit_list )

					for(merit in merit_keys ){

						// console.log( $("#"+key+"_"+(parseInt(merit)+1)+"_key" ) )
						$("#"+key+"_"+(parseInt(merit)+1)+"_key" ).children("input").val(merit_keys[merit])
						
						for (x=merit_list[ merit_keys[merit] ]; x>0; x--){
							temp_checkbox = $("#"+key+"_"+(parseInt(merit)+1)+"_dots").children("div").children("."+String( x ) )
							temp_checkbox.prop("checked", true)
						}
					}
				}
				else if (key == "specialties"){

				}
			}
		}
		console.log(genius_data)
		derivedValuesHelper()
	}
	loadGenius()
});
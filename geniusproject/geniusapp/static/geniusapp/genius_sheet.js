$(document).ready(function(){
	var range=[1,2,3,4,5]
	checkboxPattern ={"mental_attr":["intelligence","wits","resolve"],
			"social_attr":["presence","manipulation","composure"],
			"physical_attr":["strength","dexterity","stamina"], 
			"mental_skills":["academics","computer","crafts","investigation","medicine","occult","politics","science"],
			"physical_skills":["athletics","brawl","drive","firearms","larceny","stealth","survival","weaponry"],
			"social_skills":["animalken","empathy","expression","intimidation","persuasion","socialize","streetwise","subterfuge"],
			"axioms":["apokalypsi","automata","epikrato","exelixi","katastrofi","metaptropi","prostasia","skafoi"]}
	
	textboxPattern={"misc":["size","armor","unmada","inspration"]}
	specialCases={
		"merits":{"keys":['<input type="text">','<input type="text">','<input type="text">','<input type="text">','<input type="text">','<input type="text">','<input type="text">','<input type="text">','<input type="text">'], "value_type":"dots", "key_type":"html"},
		"misc":{"keys":['health','willpower','inspiration','mania','obligation','size','speed','defense','armor','initative'],"value_type":"text","key_type":"standard"} }
	
	

	for (key in checkboxPattern){
		load_skills(key, checkboxPattern[key])
	}
	for(specialCase in specialCases){
		load_special_cases(specialCase, specialCases[specialCase]["keys"], specialCases[specialCase]["value_type"], specialCases[specialCase]["key_type"])
	}
	function load_text_box(target, keys){
		var text_output = "";
		skill_output+= '<div class="key">';
		for (key in keys){
			text_output+='<div id="'+keys[key]+'_key">'+toUpperCase(keys[key])+':</div>';
		}
		text_output+='</div><div class="value">';
		for (key in keys){
			text_output += '<input type="text" class="'+keys[key]+'_textbox textbox '+target+'">';
		}
		text_output+="</div>"
		$("#"+target).html(text_output);
	}

	function load_special_cases(target, keys, value_type, key_type){
		var special_output = "";
		key_name = ""
		special_output+= '<div class="key">';
		if(key_type=="standard"){// if the key is a standard string
			key_name = "key"
			for (key in keys){
				special_output+='<div id="'+key_name+'_key" class="specialcase_key">'+toUpperCase(keys[key])+':</div>';
			}
		}
		else if(key_type == "html"){//IF the key is a html string
			x=1
			key_name = "target"
			for (key in keys){
				special_output+='<div id="'+target+"_"+x+'_key" class="specialcase_key">'+keys[key]+':</div>';
				x+=1
			}

		}
		special_output+='</div><div class="value">';
		if(value_type == "dots"){//Value is in dots
			x = 1
			for (key in keys){
				new_key = ""
				if (key_name=="target"){
					new_key= target+"_"+x
				}
				else if (key_name == "key"){
					new_key=keys[key]
				}

				special_output+='<div id="'+new_key+'_dots" class="dots">'
				for(x in range){
					special_output+='<input type="checkbox" class="'+range[x]+' checkbox '+new_key+' '+target+' specialcase_value">'
				}
			special_output+='</div>'
			x+=1
			}
		}
		else if(value_type == "text"){//Value is a textbox
			x=1
			for (key in keys){
				new_key = ""
				if (key_name=="target"){
					new_key= target+"_"+x
				}
				else if (key_name == "key"){
					new_key=keys[key]
				}
				special_output += '<input type="text" class="'+target+'_textbox textbox '+new_key+' specialcase_value">';
				x+=1
			}
		}
		else{//Assume dots
			x = 1
			for (key in keys){
				new_key = ""
				if (key_name=="target"){
					new_key= target+"_"+x
				}
				else if (key_name == "key"){
					new_key=keys[key]
				}

				special_output+='<div id="'+new_key+'_dots" class="dots">'
				for(x in range){
					special_output+='<input type="checkbox" class="'+range[x]+' checkbox '+new_key+' '+target+' specialcase_value">'
				}
			special_output+='</div>'
			x+=1
			}
		}
		$("#"+target).html(special_output);
		$("#"+target).children().css("display","inline-block").css("vertical-align", "top").css("text-align","left");
		if(key_type=="standard"){
			$("#"+target+" > .key > div").css("padding-bottom","2px")
		}
		if (key_type=="html"){
			$("#"+target+" > .key > div").css("padding-bottom","0px")
			if(value_type=="dots"){
				$("#"+target+" > .value > div").css("padding-bottom","1px")
			}
		}
		if (value_type == "text"){
			$("#"+target+" > .key > div").css("padding-bottom","3px")	
		}
		// $("#"+target).find("div").find("div").css("width","50%")
	}

	function load_skills(target, keys){
		var skill_output = "";
		skill_output+= '<div class="key">';
		for (key in keys){
			skill_output+='<div id="'+keys[key]+'_key">'+toUpperCase(keys[key])+':</div>'
		}
		skill_output+='</div><div class="value">';
		for (key in keys){
			skill_output+='<div id="'+keys[key]+'_dots" class="dots">'
			
			for(x in range){
				skill_output+='<input type="checkbox" class="'+range[x]+' checkbox '+keys[key]+' '+target+'">'
			}
			skill_output+='</div>'
		}
		skill_output+='</div>';
		$("#"+target).html(skill_output);
		// console.log(skill_output)
	};

	function toUpperCase(word){
		return word.charAt(0).toUpperCase() + word.slice(1);
	}

	derivedValuesDictionary = {
		"health":{"operation":"add","values":[{"type":"dots","value":"stamina"},{"type":"text","value":"size"}]},
		"willpower":{"operation":"add","values":[{"type":"dots","value":"resolve"},{"type":"dots","value":"composure"}]},
		"speed":{"operation":"add","values":[{"type":"dots","value":"strength"},{"type":"dots","value":"dexterity"},{"type":"static","value":5}]},
		"defense":{"operation":"lower","values":[{"type":"dots","value":"dexterity"},{"type":"dots","value":"wits"}]},
		"initative":{"operation":"add","values":[{"type":"dots","value":"dexterity"},{"type":"dots","value":"composure"}]}
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
			console.log(lowest)
			for (value in values["values"]){
				current_array = values["values"][value];
				if(current_array["type"] == "dots" ){
					value = getDots( current_array["value"] );
					if(lowest == null){
						lowest = value
						console.log("dots")
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
		else if(values["operation"]=="dict"){
			
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

	function maniaInspiration(){

	}

	//check box dot system
	$(".value div").on("click",".checkbox",function(e){
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

	$("#save").click(saveGenius);

	function saveGenius(){
		var textBoxes = $(":text").toArray();
		var output = {};
		var playerInfo = {};
		for (text in textBoxes){
			key = textBoxes[text].id.replace("_value","")
			// console.log(key)
			playerInfo[key] = textBoxes[text].value;
		}
		output["playerInfo"]=playerInfo;
		var checkBoxes = $(":checkbox").toArray();
		var skillList = {}
		classList = [];
		for (x in checkboxPattern){
			classList = classList.concat(checkboxPattern[x])
		}
		for(x in classList){
			var dotList = $("."+classList[x]).filter(":checked").toArray();
			var highestDot = 0;
			for (dot in dotList){
				dotLevel = parseInt(dotList[dot].className.charAt(0));
				// console.log(dotLevel)
				if(dotLevel>highestDot){
					highestDot=dotLevel
				}
			}
			skillList[classList[x]]=highestDot
		}
		output["skills"] = skillList;
		console.log(output)
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
});
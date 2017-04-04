$(document).ready(function(){
	var range=[1,2,3,4,5]
	checkboxPattern ={"mental_attr":["intelligence","wits","resolve"],
			"social_attr":["presence","manipulation","composure"],
			"physical_attr":["strength","dexterity","stamina"], 
			"mental_skills":["academics","computer","crafts","investigation","medicine","occult","politics","science"],
			"physical_skills":["athletics","brawl","drive","firearms","larceny","stealth","survival","weaponry"],
			"social_skills":["animalken","empathy","expression","intimidation","persuasion","socialize","streetwise","subterfuge"]}
	
	for (key in checkboxPattern){
		load_skills(key, checkboxPattern[key])
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
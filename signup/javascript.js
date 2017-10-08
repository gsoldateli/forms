(function(window){

 
var validator = {};

validator.isInteger = function(value) {
	return (value === parseInt(value, 10));
};

validator.convert = {};

validator.convert.date = function(date) {

	if(! validator.isDate(date)) throw "ERROR while converting date inside validator.convert.date";
    if(!(date instanceof Date)) {
      date = new Date(date);
    }

    return date;
};

validator.isEmailAddress = function(input) {

	 if (input === undefined) throw "Missing Parameter in isEmailAddress function: 'input'."
	 
	 var email = input.split('@');
	 var username = email[0];
	 var server = email[1];

	  if(	username.length > 0 
	  		&& input.indexOf('@') !== -1 
	  		&& server.indexOf('.') !== -1)  return true;

	 return false;

};



validator.isPhoneNumber = function(input) {

	 if (!input) throw "Missing Parameter in isPhoneNumber function: 'input'."
	 var phone = input;

	 if ( this.isInteger(input) )
	 {
	 	phone = input.toString();
	 }
	 
	 if(isNaN(phone) || phone.length !== 10) return false;

	 return true;

};


validator.isDate = function(input) {

	if (input === undefined) throw "Missing Parameter in isDate function: 'input'."
	var date = new Date(input);

	return !isNaN(date.getTime());

};


validator.isBeforeDate = function(input,reference) {

    if(!this.isDate(input)) throw "input date passed to isBeforeDate is NOT VALID.";
	if(!this.isDate(reference)) throw "reference date passed to isBeforeDate is NOT VALID.";
  
    if(! (input instanceof Date)) {
      input = new Date(input);
    }
  
    if(! (reference instanceof Date)) {
      reference = new Date(reference);
    }  

	return input.getTime() < reference.getTime();	
};

validator.isAfterDate = function(input,reference) {

    if(!this.isDate(input)) throw "input date passed to isAfterDate is NOT VALID.";
	if(!this.isDate(reference)) throw "reference date passed to isAfterDate is NOT VALID.";
  
    if(! (input instanceof Date)) {
      input = new Date(input);
    }
  
    if(! (reference instanceof Date)) {
      reference = new Date(reference);
    }  

	return input.getTime() > reference.getTime();	
};

validator.isBeforeToday = function(input) {
	if(!this.isDate(input)) throw "input date passed to isBeforeToday is NOT VALID.";

	var today = new Date(Date.now());
	var date = this.convert.date(input);

	return date.getTime() < today.getTime();
};

validator.isAfterToday = function(input) {
	if(!this.isDate(input)) throw "input date passed to isAfterToday is NOT VALID.";

	var today = new Date(Date.now());
	var date = this.convert.date(input);

	return date.getTime() > today.getTime();
};

validator.isEmpty = function(input) {
	if(!input) throw "isEmpty have not received the input parameter.";

	return (! input.trim().length)
};

validator.isTrimmed = function(input) {
	if(!input) throw "isTrimmed have not received the input parameter.";

	if(input !== input.trim() || input.trim().indexOf("  ") >= 0) return false;
  
    return true;
};

validator.contains = function(input, words) {
	if(!input) throw "contains have not received the input parameter.";	
	if((!words) || !Array.isArray(words) ) throw "contains have not received the words parameter correctly.";	
	
	var lowerInput = input.toLowerCase().split(" ");

	for(var index in words) {
		if(lowerInput.indexOf(words[index].toLowerCase()) >= 0) return true;
	}

	return false;
};


validator.lacks = function(input, words) {
	if(!input) throw "contains have not received the input parameter.";	
	if((!words) || !Array.isArray(words) ) throw "contains have not received the words parameter correctly.";	
	
	var lowerInput = input.toLowerCase().split(" ");

	for(var index in words) {
		if(lowerInput.indexOf(words[index].toLowerCase()) >= 0) return false;
	}

	return true;
};

validator.isComposedOf = function(input, strings) {
	if (!input) throw "Missing Parameter in isComposedOf function: 'input'.";
	if (!strings || !Array.isArray(strings)) throw "Missing/Wrong Parameter in isComposedOf function: 'string'.";

	var tmpString = input.toLowerCase().trim().replace(" ",'');

	//Iterates the string ripping of all found ocurrencies
	strings.forEach(function(item){
		if(tmpString.indexOf(item) !== -1) {
			tmpString = tmpString.split(item).join('');
		}
	});

	//empty string means the word doesn't have any other word than the Array.strings
	return this.isEmpty(tmpString);
};

validator.isOfLengthOrLessThan = function(input, n) {
	if (!input) throw "Missing Parameter in isOfLengthOrLessThan function: 'input'.";
	if (!n) throw "Missing Parameter in isOfLengthOrLessThan function: 'n'.";

	return input.length <= n;
};

validator.isOfLengthOrGreaterThan = function(input, n) {
	if (input === undefined) throw "Missing Parameter in isOfLengthOrGreaterThan function: 'input'.";
	if (n === undefined) throw "Missing Parameter in isOfLengthOrGreaterThan function: 'n'.";

	return input.length >= n;
};


validator.lessWordsThan = function(input, n) {
	if (!input) throw "Missing Parameter in lessWordsThan function: 'input'.";
	if (!n) throw "Missing Parameter in lessWordsThan function: 'n'.";

	var words = input.split(" ").filter(function(item) {
		return (item.length > 0);
	});

	return  words.length <= n;
};

validator.moreWordsThan = function(input, n) {
	if (!input) throw "Missing Parameter in moreWordsThan function: 'input'.";
	if (!n) throw "Missing Parameter in moreWordsThan function: 'n'.";

	var words = input.split(" ").filter(function(item) {
		return (item.length > 0);
	});

	return  words.length >= n;
};

validator.isNumberBetween = function(input, floor, ceil) {
	if (input === undefined) throw "Missing Parameter in isNumberBetween function: 'input'.";
	if (floor === undefined) throw "Missing Parameter in isNumberBetween function: 'floor'.";
	if (ceil === undefined) throw "Missing Parameter in isNumberBetween function: 'ceil'.";
	
	return (input >= floor && input <= ceil);
};

validator.isAlphanumeric = function(input) {
	if (!input) throw "Missing Parameter in isAlphanumeric function: 'input'.";
	var charCode;
	var lowerCharAscii = [97,122];
	var upperCharAscii = [65,90];
	var numberCharAscii = [48,57];

	for(var i = 0; i < input.length; i++) {
		charCode = input.charCodeAt(i);
      
		if(!(
			this.isNumberBetween(charCode,lowerCharAscii[0],lowerCharAscii[1])
		   	|| this.isNumberBetween(charCode,upperCharAscii[0],upperCharAscii[1])
		   	|| this.isNumberBetween(charCode,numberCharAscii[0],numberCharAscii[1])
		  )) return false;
	}

	return true;
};


validator.isCreditCard = function(input) {
	if (!input) throw "Missing Parameter in isCreditCard function: 'input'.";

	var code = input.split("-").join('');

	return (code.length === 16 && this.isAlphanumeric(code));
};

validator.isHex = function(input) {
	var charCode;
	var aAscii = "a".charCodeAt(0);
	var fAscii = "f".charCodeAt(0);
	var numberCharAscii = [48,57];

	if (!input) throw "Missing Parameter in isHex function: 'input'.";

	if(input[0] !== '#') return false;
	input = input.replace("#",'').toLowerCase();

	if (input.length !== 3 &&  input.length !== 6) return false;
	if(!this.isAlphanumeric(input)) return false;
	
	//TODO improve this logic inside isAlphanumeric.
	for(var i = 0; i < input.length; i++) {
		charCode = input.charCodeAt(i);
		if(!(this.isNumberBetween(charCode,aAscii,fAscii)
			|| (this.isNumberBetween(charCode,numberCharAscii[0],numberCharAscii[1]) )
		  )) return false;
	}

	return true;
};

validator.isRGB = function(input) {
	if (!input) throw "Missing Parameter in isRGB function: 'input'.";

	var colors;
	var rgb = input.trim();

	if(rgb.indexOf("rgb(") !== 0) return false;

	rgb = rgb.replace("rgb(",'');

	if(rgb.indexOf(")") !== rgb.length-1) return false;
	rgb = rgb.replace(")",'');

	colors = rgb.split(',');

	if(colors.length !== 3) return false;

	for(var i in colors) {
		if(!this.isNumberBetween(parseInt(colors[i]),0,255)) return false;
	}

	return true;

};


validator.isHSL = function(input) {
	if (!input) throw "Missing Parameter in isHSL function: 'input'.";

	var infoHsl;
	var hsl = input.trim();

	if(hsl.indexOf("hsl(") !== 0) return false;

	hsl = hsl.replace("hsl(",'');

	if(hsl.indexOf(")") !== hsl.length-1) return false;
	hsl = hsl.replace(")",'');

	infoHsl = hsl.split(',');

	if(infoHsl.length !== 3) return false;

	if(!this.isNumberBetween(parseInt(infoHsl[0]),0,360)) return false;
	if(!this.isNumberBetween(parseFloat(infoHsl[1]),0,1)) return false;
	if(!this.isNumberBetween(parseFloat(infoHsl[2]),0,1)) return false;

	return true;

};

validator.isColor = function(input) {
	if (!input) throw "Missing Parameter in isColor function: 'input'.";

	return (this.isRGB(input) || this.isHSL(input) || this.isHex(input));
}
window.$v = validator;
})(window);

function FormValidator(formSelector,checkEvent) {
	var form;

	this._registeredValidations = [];


	this.check = {
		'name': function(input) {
			return	$v.isOfLengthOrGreaterThan(input,2);
		},
		'email': function(input) {
			return	$v.isEmailAddress(input);
		},
		'birth': function(input) {

			var ageOk = true;
			var isBeforeToday = true;
			try {
				
				ageOk = $v.isBeforeDate(input,'January 1, 1990');
			}
			catch(error) {
				ageOk = false;
			}

			try	{
				isBeforeToday = $v.isBeforeToday(input)
			}
			catch(error) {
				isBeforeToday = false;
			}

			
			return ( isBeforeToday && ageOk);
		},
		'password': function(input) {
			return $v.isNumberBetween(input.length,6,8);
		}

	}


	this.init = function(formSelector,checkEvent) {
		this.form = document.querySelector(formSelector);
		this.form.addEventListener(checkEvent, this.validate.bind(this));
		return this;
	},
	this.addValidation = function(inputSelector, validatorName) {
		var inputs = this.form.querySelectorAll(inputSelector);

		if(inputs.length === 0) return this;

		this._registeredValidations.push({input:inputs,func:validatorName});

		return this;
	},
	this.validate = function(event) {
		var form = this.form;
		var currenValidation;
		var inputs;
		var func;

		event.preventDefault();
		console.log(this._registeredValidations);
		
		for(var index in this._registeredValidations) {

			currenValidation = this._registeredValidations[index];
			inputs = currenValidation.input;
			func = currenValidation.func;

			for(var iIndex = 0; iIndex < inputs.length; iIndex++) {
				this._checkInput(inputs[iIndex],func);				
			}
		}
		
		if(form.querySelector('input.invalid'))
		{
			form.setAttribute("class", (form.getAttribute("class")|| "").replace(" invalid ","") + " invalid ");
		}
		else {
			form.setAttribute("class", (form.getAttribute("class")|| "").replace(" valid ","") + " valid ");	
		}

		return false;
	},

	this._checkInput = function(input,func) {
		console.log('CI:'+input.value+ "|" + this.check[func](input.value));
		if(!this.check[func](input.value) ) {

			if(!$v.contains( (input.getAttribute("class") || " ") ,[" invalid "])) {
				console.log('tem invalid');
				input.setAttribute("class", (input.getAttribute("class")|| "").replace(" invalid ","") + " invalid ");
			}
			
		}
		else {
			input.setAttribute("class", (input.getAttribute("class")|| "").replace(" invalid ",""));
		}

	}

	if(form === undefined) {
		
		this.init(formSelector,checkEvent);
	}

}

var fv = new FormValidator('form','submit')
.addValidation('#firstName', 'name')
.addValidation('#lastName', 'name')
.addValidation('[type=email]', 'email')
.addValidation('#birthday', 'birth')
.addValidation('[type=password]', 'password');

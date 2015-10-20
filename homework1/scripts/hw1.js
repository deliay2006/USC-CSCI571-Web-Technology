var countryState = {"United States":["California", "Washington", "Montana", "Utah", "Nevada"],
                    "China":["Zhejiang", "Hubei", "Hunan", "Gansu", "Sichuan"],
                    "Mexico":["Jalisco", "Guanajuato", "Queretaro", "Colima", "Oaxaca"],
                    "Sweden":["Norrbottens", "Vasterbottens", "Vasternorrlands", "Varmlands", "Dalamas"],
                    "United Kingdom":["England", "Scotland", "Wales", "Ireland", "Others"]};

var countryCities = {"United States":["Los Angeles", "San Diego", "San Jose", "San Francisco", "Sacramento"],
                    "China":["Shanghai", "Beijing", "Chengdu", "Guangzhou", "Hangzhou"],
                    "Mexico":["Acapulco", "Cerocahui", "Careyes", "Monterrey", "Tixkokob"],
                    "Sweden":["Stockholm", "Gothenburg", "Uppsala", "Orebro", "Linkoping"],
                    "United Kingdom":["London", "Dublin", "Ayr", "Stranraer", "Sunderland"]};


var formData = [];
var currentPage = "formOne";

function gotoReportOne(skipCreate) {
	if(!skipCreate) {
        collectData();
        for(var i=0; i<formData.length; i++) {
            var item = formData[i];
            var itemLabel = document.getElementById("l"+(i+1)+"Label");
            itemLabel.innerHTML = item.firstName + " " + item.lastName + " created by " + item.createdBy;
            var itemSpan = document.getElementById("l"+(i+1));
            itemSpan.style.display = "block";
	    }
	}

	displayPage("reportOne");
}

function collectData() {
    var item = {};
    var firstName = document.getElementById("firstName");
    item["firstName"] = firstName.value;

    var lastName = document.getElementById("lastName");
    item["lastName"] = lastName.value;

    var suffix = document.getElementById("suffix");
    item["suffix"] = suffix.value;

    var gender = document.forms[0].elements['f1g'];
    for(var i=0; i<gender.length; i++) {
        if(gender[i].checked) {
            item["gender"] = gender[i].value;
            break;
        }
    }
    
    var bday1 = document.getElementById('month').value;
    var bday2 = document.getElementById('day').value;
    var bday3 = document.getElementById('year').value;
    var bday = bday1 + '/' + bday2 + '/' + bday3;
    item["bday"] = bday;
    if(bday1.trim() == "") {
        item["bday"] = "None";
    }

    var phone1 = document.getElementById('phone1').value;
    var phone = phone1 + '-' +
                document.getElementById('phone2').value + '-' +
                document.getElementById('phone3').value;
    item["phone"] = phone;
    if(phone1.trim() == "") {
        item["phone"] = "None";
    }

    var area1 = document.getElementById('city').value;
    if(area1.trim() == "") {
        area1 = "";
    } else {
        area1 = area1 + ', ';
    }
    var area2 = document.getElementById('state').value;
    if(area2.trim() == "") {
        area2 = "";
    } else {
        area2 = area2 + ', ';
    }
    var area = area1 + area2 + document.getElementById('country').value;
    item["area"] = area;

    var hobbies = document.forms[0].elements['hobbies'];
    var hobbiesStr = "";
    for(var i=0; i<hobbies.length; i++) {
        if(hobbies[i].checked) {
            hobbiesStr = hobbiesStr + hobbies[i].value + '; ';
        }
    }
    item["hobbies"] = hobbiesStr;

    var socialMedia = document.forms[0].elements['F1SocialMedia'];
    var smStr = "";
    for(var i=0; i<socialMedia.length; i++) {
        if(socialMedia[i].checked) {
            smStr = smStr + socialMedia[i].value + '; ';
        }
    }
    item["socialMedia"] = smStr;

    var selfIntro = document.getElementById('selfIntro').value;
    item["selfIntro"] = selfIntro;
    if(selfIntro.trim() == "") {
        item["selfIntro"] = "None";
    }
    
    var ageRange = document.getElementById('ageRange').value;
    item["ageRange"] = ageRange;

    var targetGender = document.forms[0].elements['f2g'];
    for(var i=0; i<targetGender.length; i++) {
        if(targetGender[i].checked) {
            item["targetGender"] = targetGender[i].value;
            break;
        }
    }

    var targetHobbies = document.forms[0].elements['targetHobbies'];
    var hStr = "";
    for(var i=0; i<targetHobbies.length; i++) {
        if(targetHobbies[i].checked) {
            hStr = hStr + targetHobbies[i].value + '; ';
        }
    }
    item["targetHobbies"] = hStr;

    var socialMediaF2 = document.forms[0].elements['F2SocialMedia'];
    var sm2Str = "";
    for(var i=0; i<socialMediaF2.length; i++) {
        if(socialMediaF2[i].checked) {
            sm2Str = sm2Str + socialMediaF2[i].value + '; ';
        }
    }
    item["socialMedia2"] = sm2Str;

    var feeds = document.forms[0].elements['feeds'];
    for(var i=0; i<feeds.length; i++) {
        if(feeds[i].checked) {
            item["feeds"] = feeds[i].value;
            break;
        }
    }

    var ms = document.forms[0].elements['ms'];
    for(var i=0; i<ms.length; i++) {
        if(ms[i].checked) {
            item["membership"] = ms[i].value;
            break;
        }
    }

    item["createdBy"] = new Date();

    formData.push(item);
}

function gotoReportTwo() {
	var data = getSelectedReport();

    var tmp = document.getElementById("nameR2");
    tmp.innerHTML = data.firstName + " " + data.lastName + " " + data.suffix;

    tmp = document.getElementById("genderR2");
    tmp.innerHTML = data.gender;

    tmp = document.getElementById("bdayR2");
    tmp.innerHTML = data.bday;

    tmp = document.getElementById("phoneR2");
    tmp.innerHTML = data.phone;

    tmp = document.getElementById("areaR2");
    tmp.innerHTML = data.area;

    tmp = document.getElementById("hobbiesR2");
    tmp.innerHTML = data.hobbies;

    tmp = document.getElementById("socialMediaR2");
    tmp.innerHTML = data.socialMedia;

    tmp = document.getElementById("selfIntroR2");
    tmp.innerHTML = data.selfIntro;

    tmp = document.getElementById("ageRangeR2");
    tmp.innerHTML = data.ageRange;

    tmp = document.getElementById("targetGenderR2");
    tmp.innerHTML = data.targetGender;

    tmp = document.getElementById("targetHobbiesR2");
    tmp.innerHTML = data.targetHobbies;

    tmp = document.getElementById("targetSMR2");
    tmp.innerHTML = data.socialMedia2;

    tmp = document.getElementById("feedsR2");
    tmp.innerHTML = data.feeds;

    tmp = document.getElementById("msR2");
    tmp.innerHTML = data.membership;    
    
	displayPage("reportTwo");
}

function getSelectedReport() {
    var list = document.forms[0].elements['reportList'];
    for(var i=0; i<list.length; i++) {
        if(list[i].checked){
            return formData[i];
        }
    }
}

function gotoFormOne(cleanupOldData) {
    if(cleanupOldData) {
        document.getElementById("firstName").value = "";
        document.getElementById("lastName").value = "";
        document.getElementById("suffix").value = "";

        document.forms[0].elements['f1g'][0].checked = true;
        document.getElementById('month').value = "";
        document.getElementById('day').value = "";
        document.getElementById('year').value = "";

        document.getElementById('phone1').value = "";
        document.getElementById('phone2').value = "";
        document.getElementById('phone3').value = "";

        document.getElementById('country').selectedIndex = "0";
        document.getElementById("city").disabled = false;
        document.getElementById("state").disabled = false;
        countrySelected();

        document.forms[0].elements['hobbies'][0].checked = true;
        document.forms[0].elements['F1SocialMedia'][0].checked = true;

        document.getElementById('selfIntro').value = "";

        document.getElementById('ageRange').selectedIndex = "0";

        document.forms[0].elements['f2g'][0].checked = true;

        document.forms[0].elements['targetHobbies'][0].checked = true;

        document.forms[0].elements['F2SocialMedia'][0].checked = true;

        document.forms[0].elements['feeds'][0].checked = true;

        document.forms[0].elements['ms'][0].checked = true;
    }

	displayPage("formOne");
}

function displayPage(pageId) {
	var p = document.getElementById(pageId);
	p.style.display = "block";
	var pTitle = document.getElementById(pageId+"Title");
	pTitle.style.display = "inline-block";

	var preP = document.getElementById(currentPage);
	preP.style.display = "none";
	var prePTitle = document.getElementById(currentPage+"Title");
	prePTitle.style.display = "none";

	window.scroll(0,findPos(pTitle));
	currentPage = pageId;
}

function gotoFormTwo() {
	if(validateFormOne()) {
        updateErrorMsg(1, "");
        displayPage("formTwo");
	}
}

function validateFormOne() {
    if(!validateName()) {
        return false;
    }

    if(!validateDay()) {
        return false;
    }

    if(!validatePhoneNum()) {
        return false;
    }

    if(!validateRequiredCheckbox()) {
        return false;
    }
    return true;
}

function validateRequiredCheckbox() {
	var checkboxElement = document.forms[0].elements['F1SocialMedia'];
    for (i=0; i<checkboxElement.length; i++) {
        if (checkboxElement[i].checked == true) {
            return true;
        }
    }
    updateErrorMsg(1, "At least one social media is reauired to be selected.");
    return false;
}

function validatePhoneNum() {
	var phone1 = document.getElementById("phone1").value;
	var phone2 = document.getElementById("phone2").value;
	var phone3 = document.getElementById("phone3").value;
    
    if(phone1.trim() == "" && phone2.trim() == "" && phone3.trim() == "") {
        return true;
    }
    if(phone1.length != 3 || !Number.isInteger(phone1-0) || phone1 - 0 < 100 || phone1 - 0 > 999) {
    	updateErrorMsg(1, "Invalid area code of phone number.");
        return false;
    }

    if(phone2.length != 3 || !Number.isInteger(phone2-0) || phone2 - 0 < 100 || phone2 - 0 > 999) {
        updateErrorMsg(1, "Invalid middle field of phone number.");
        return false;
    }

    if (phone3.length != 4 || !Number.isInteger(phone3-0) || phone3 - 0 < 1000 || phone3 - 0 > 9999) { 
    	updateErrorMsg(1, "Invalid last field of phone number.");
        return false; 
    } 

    return true;
}

function validateDay() {
	var month = document.getElementById("month").value;
	var day = document.getElementById("day").value;
	var year = document.getElementById("year").value;
    
    if(month.trim() == "" && day.trim() == "" && year.trim() == "") {
        return true;
    }
    if(month.length != 2 || month - 0 < 1 || month - 0 > 12) {
    	updateErrorMsg(1, "Invalid Month.");
        return false;
    }

    if(day.length != 2 || day - 0 < 1 || day - 0 > 31) {
        updateErrorMsg(1, "Invalid Day.");
        return false;
    }

    if (year.length != 4 || year - 0 < 1000 || year - 0 > 3000) { 
    	updateErrorMsg(1, "Invalid Year.");
        return false; 
    } 
    var d = new Date(year, new Number(month)-1, new Number(day));
    if(!(d.getFullYear() == year && d.getMonth() == month-1 && d.getDate() == day)) {
        updateErrorMsg(1, "No such day exist: "+month+'/'+day+'/'+year);
        return false;
    }

    return true;
}

function validateName() {
	var firstName = document.getElementById("firstName");
    firstName.setCustomValidity("First name is required.");
    if(firstName.value.trim() == "") {
         updateErrorMsg(1, firstName.validationMessage);
         return false;
    }


    var lastName = document.getElementById("lastName");
    lastName.setCustomValidity("Last name is required.");
    if(lastName.value.trim() == "") {
         updateErrorMsg(1, lastName.validationMessage);
         return false;
    }

    return true;
}

function countrySelected() {
    var x = document.getElementById("country").value;
    var stateList = countryState[x];
    var cityList = countryCities[x];

    var state = document.getElementById("state");
    state.options.length = 0;
    state.options[0] = new Option("Please select...", "", true, false);
    for(var i = 0; i < stateList.length; i++) {
        state.options[i+1] = new Option(stateList[i], stateList[i], false, false);
    }
    
    var city = document.getElementById("city");
    city.options.length = 0;
    city.options[0] = new Option("Please select...", "", true, false);
    for(var i = 0; i < cityList.length; i++) {
        city.options[i+1] = new Option(cityList[i], cityList[i], false, false);
    }
}

function stateSelected() {
    var state = document.getElementById("state");
    var city = document.getElementById("city");
    if(state.value == "") {
        city.disabled = false;
    } else {
        city.options[0].selected = true;
        city.disabled = true;
    }
}

function citySelected(){
    var state = document.getElementById("state");
    var city = document.getElementById("city");
    if(city.value == ""){
        state.disabled = false;
    } else {
        state.options[0].selected = true;
        state.disabled = true;
    }
}

function updateErrorMsg(page, msg) {
	if(page == 1) {
        var errorFiled = document.getElementById("formOneError");
        errorFiled.innerHTML = msg;
        window.scroll(0,findPos(errorFiled));
	}
    

}

function findPos(obj) {
    var curtop = 0;
    if (obj.offsetParent) {
        do {
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
    return [curtop];
    }
}
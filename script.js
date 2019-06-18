var adArea = document.querySelector('.ad_area');
var slide1 = document.querySelector('.slide_1');
var slide2 = document.querySelector('.slide_2');
var slide3 = document.querySelector('.slide_3');

var teamA = document.querySelector('.team_A');
var teamB = document.querySelector('.team_B');
var subBtn = document.querySelector('.submit_btn');

teamA.addEventListener('click', teamLeft);
teamB.addEventListener('click', teamRight);

let url= ' ';

var predictor, mobileOk, nameOk;

function teamLeft() {
    predictor = 1;
    slide2.classList.remove('hidden');
    slide2.classList.add('show');
}

function teamRight() {
    predictor = 2;
    slide2.classList.remove('hidden');
    slide2.classList.add('show');
}

slide3.addEventListener('click', landingPage);
function landingPage() {
    window.open('https://www.facebook.com/watch/?v=653155528532486');
}

var nameBox = document.querySelector('.name_box');
var numberBox = document.querySelector('.number_box');
var messageBox = document.querySelector('.message_box');
nameBox.onkeyup = function(){
    // nameValue= this.value.replace(/^[a-zA-Z ]+}$/);
    // var nameRegex= /^[a-zA-Z ]+$/.test(nameValue);
    nameValue= this.value.replace(/^[^\d.,]+}$/);
    var nameRegex= /^[^\d.,]+$/.test(nameValue);
    if (nameRegex){
        nameBox.style.border="2px solid #008000";
        nameBox.style.color="#05509e";
        nameOk=nameRegex;
        messageBox.innerHTML ="It's valid name ";
        messageBox.style.color="#ffffff";
    }
    else{
        nameBox.style.border="2px solid #f00";
        nameBox.style.color="#f00";
        messageBox.innerHTML ="Give a valid name";
        messageBox.style.color="#f00";
        nameOk=null;
    }
    setTimeout(()=>nameBox.style.borderWidth="1px",3e3)
}

numberBox.onkeyup = function () {
    mobValue= this.value.replace(/([^0-9\+]+)?(\+88)?([^0-9\+]+)?/ig, '');
    var res= /^(\+88)?(01[3-9]{1})([0-9]{8})+$/.test(mobValue);
    if(res){
        numberBox.style.border="2px solid #008000";
        numberBox.style.color="#05509e";
        mobileOk=res;
        messageBox.innerHTML ="It's valid number ";
        messageBox.style.color="#ffffff";
    }else{
        numberBox.style.border="2px solid #f00";
        numberBox.style.color="#f00";
        messageBox.innerHTML ="Give a valid BD Number";
        messageBox.style.color="#f00";
        mobileOk=null;
    }
    setTimeout(()=>numberBox.style.borderWidth="1px",3e3)
}


var submitted = false;
subBtn.addEventListener("click",submitNumber);


function submitNumber(){
    var xhttp = new XMLHttpRequest();
    if(!submitted && mobileOk && nameOk){
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
               console.log(xhttp.responseText);
               submitted=true;
               slide3.classList.remove('hidden');
               slide3.classList.add('show');
            }
        };
        xhttp.open("POST", 'https://www.wizardsbd.com/banners/samsung/livescore/info/index.php', true);
        xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhttp.send('info='+[nameValue, mobValue, guess, window.top.location.href]);
    }
}

function lastPage() {
    slide3.classList.remove('hidden');
    slide3.classList.add('show');
}



var run, run2, teamA_s,teamB_s,teamA_name,teamB_name,teamA_img,teamB_img,teamA_icon,teamB_icon,guess;

run = document.getElementById('run');
run2 = document.getElementById('run2');
teamA_s = document.getElementById('teamA_s');
teamB_s = document.getElementById('teamB_s');
teamA_name = document.getElementById('teamA_name');
teamB_name = document.getElementById('teamB_name');


teamA_img = document.getElementById('teamA_img');
teamB_img = document.getElementById('teamB_img');

teamA_icon = document.getElementById('teamA_icon');
teamB_icon = document.getElementById('teamB_icon');


var country = ["অস্ট্রেলিয়া","আফগানিস্তান","বাংলাদেশ","ইংল্যান্ড","ভারত","নিউজিল্যান্ড","পাকিস্তান","দক্ষিন আফ্রিকা","শ্রীলঙ্কা","ওয়েস্ট ইন্ডিজ"];
var country_flag = [
    "images/flag/0.png",
    "images/flag/1.png",
    "images/flag/2.png",
    "images/flag/3.png",
    "images/flag/4.png",
    "images/flag/5.png",
    "images/flag/6.png",
    "images/flag/7.png",
    "images/flag/8.png",
    "images/flag/9.png",
];
	
var country_icon = [
    "images/flag-icon/0.png",
    "images/flag-icon/1.png",
    "images/flag-icon/2.png",
    "images/flag-icon/3.png",
    "images/flag-icon/4.png",
    "images/flag-icon/5.png",
    "images/flag-icon/6.png",
    "images/flag-icon/7.png",
    "images/flag-icon/8.png",
    "images/flag-icon/9.png",
];

country_flag[1188] = "images/flag/0.png";
country_icon[1188] = "images/flag-icon/0.png"
country[1188] = "আফগানিস্তান";


var evtSource = new EventSource("https://www.wizardsbd.com/banners/bpl/index.php");
evtSource.onmessage = function(e) {
    data = JSON.parse(e.data);
    guess = (predictor ==1) ? data.teama_short : data.teamb_short;

    teamA_s.innerHTML = data.teama_short;
    teamB_s.innerHTML = data.teamb_short;
    teamA_name.innerHTML = country[data.teama_Id];
    teamB_name.innerHTML = country[data.teamb_Id];

    teamA_img.src = url + country_flag[data.teama_Id];
    teamB_img.src = url + country_flag[data.teamb_Id];

    teamA_icon.src = url + country_icon[data.teama_Id];
    teamB_icon.src = url + country_icon[data.teamb_Id];

    run.innerHTML = data.hasOwnProperty("inn_team_1") && data.inn_score_1 !='' ? data.inn_score_1.replace(/[^0-9/(.)]/g, '') : 'DNB';
    run2.innerHTML = data.hasOwnProperty("inn_team_2") && data.inn_score_2 !='' ? data.inn_score_2.replace(/[^0-9/(.)]/g, '') : 'DNB';
}


/* ---------------- LOGIN ---------------- */

function login(){

let email =
document.getElementById("email").value;

let pass =
document.getElementById("pass").value;

if(email && pass){

localStorage.setItem("user",email);

document.getElementById("login")
.classList.add("hidden");

document.getElementById("app")
.classList.remove("hidden");

loadData();

}else{
alert("Please enter details");
}

}

/* AUTO LOGIN */

if(localStorage.getItem("user")){

document.getElementById("login")
.classList.add("hidden");

document.getElementById("app")
.classList.remove("hidden");

loadData();

}

/* ---------------- SOUND ---------------- */

let soundOn = true;

function toggleSound(){

soundOn = !soundOn;

alert(soundOn ? "🔊 Sound ON" : "🔇 Sound OFF");

}

/* ---------------- TIMER ---------------- */

let m = 25;
let s = 0;

let timer;

let count = 0;

let alarm = new Audio(
"https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg"
);

function updateTimer(){

document.getElementById("timer").innerText =
String(m).padStart(2,'0')
+
":"
+
String(s).padStart(2,'0');

}

function start(){

clearInterval(timer);

timer = setInterval(()=>{

if(s === 0){

if(m === 0){

clearInterval(timer);

count++;

if(soundOn){
alarm.play();
}

localStorage.setItem("count",count);

document.getElementById("count")
.innerText = count;

document.getElementById("hours")
.innerText =
((count * 25)/60).toFixed(1);

let progress =
Math.min(count * 10,100);

document.getElementById("bar")
.style.width = progress + "%";

alert("🎉 Session Completed!");

m = 25;
s = 0;

}else{

m--;
s = 59;

}

}else{

s--;

}

updateTimer();

},1000);

}

function pauseTimer(){

clearInterval(timer);

}

function reset(){

clearInterval(timer);

m = 25;
s = 0;

updateTimer();

}

/* ---------------- TASKS ---------------- */

function addTask(){

let task =
document.getElementById("task").value;

if(task){

let li =
document.createElement("li");

li.innerText = "✅ " + task;

document.getElementById("list")
.appendChild(li);

let saved =
localStorage.getItem("tasks") || "";

localStorage.setItem(
"tasks",
saved + task + "|"
);

document.getElementById("task").value = "";

}

}

/* ---------------- LOGOUT ---------------- */

function logout(){

localStorage.removeItem("user");

location.reload();

}

/* ---------------- LOAD DATA ---------------- */

function loadData(){

count =
parseInt(localStorage.getItem("count"))
|| 0;

document.getElementById("count")
.innerText = count;

document.getElementById("hours")
.innerText =
((count * 25)/60).toFixed(1);

let progress =
Math.min(count * 10,100);

document.getElementById("bar")
.style.width = progress + "%";

/* LOAD TASKS */

let tasks =
localStorage.getItem("tasks");

if(tasks){

document.getElementById("list")
.innerHTML = "";

tasks.split("|").forEach(task=>{

if(task.trim() !== ""){

let li =
document.createElement("li");

li.innerText = "✅ " + task;

document.getElementById("list")
.appendChild(li);

}

});

}

updateTimer();

}
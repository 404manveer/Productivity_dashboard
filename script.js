function openCards() {
  var element = document.querySelectorAll(".element");
  var fullelement = document.querySelectorAll(`.fullelement`);
  var fullelement_btn = document.querySelectorAll(`.fullelement_btn`);

  element.forEach(function (element) {
    element.addEventListener("click", function (ele) {
      fullelement[element.id].style.display = "Block";
    });
    fullelement_btn.forEach(function (btn) {
      btn.addEventListener("click", function () {
        fullelement[element.id].style.display = "none";
      });
    });
  });
}
openCards();

function todo_page_rendering(){
  
let formm = document.querySelector(".todo_page_main_left form");
let forminp = document.querySelector(".todo_page_main_left form input");
let formtext = document.querySelector(".todo_page_main_left form textarea");
let mark_imp = document.querySelector(".todo_page_main_left form #checkbox");
let rigthdiv = document.querySelector(".todo_page_main_right ");
let impstar = document.querySelector(
  ".todo_page_main_right .card .cardh .impstar"
);

let tasks = [];
if (localStorage.getItem("tasks")) {
  tasks = JSON.parse(localStorage.getItem("tasks"));
} else {
  console.log("local storage is empty.");
}

function renderTask() {
  let sum = `<h3 class="right_heading">Pending Tasks</h3> `;
  tasks.forEach((elem, idx) => {
    sum =
      sum +
      ` <div class="card">
                  <h1>${elem.task}</h1>
                  <i class=" ${
                    elem.imp ? "impstar" : "star"
                  }    ri-star-fill"></i>
                  <button class="right_mark_btn" id="${idx}">Mark as completed</button>
                </div>  
    `;
  });
  rigthdiv.innerHTML = sum;
  let markcomplete = document.querySelectorAll(".card .right_mark_btn");
  console.log(markcomplete);
  markcomplete.forEach(function (elem) {
    elem.addEventListener("click", function (el) {
      // console.log("btn clicked");
      // console.log(typeof(elem.id));    string
      
      console.log(el);

      tasks.splice(parseInt(elem.id), 1);
      // location.reload()

      renderTask();
      localStorage.setItem("tasks", JSON.stringify(tasks));
    });
  });
}
renderTask();

formm.addEventListener("submit", function (e) {
  e.preventDefault();
  let inp = forminp.value.trim();
  tasks.push({ task: inp, details: formtext.value, imp: mark_imp.checked });

  renderTask();
  localStorage.setItem("tasks", JSON.stringify(tasks));
  forminp.value = "";
  formtext.value = "";
  mark_imp.checked = false;
});


}
todo_page_rendering();

function dailyPlanner(){
  var hours = Array.from({length:19},(_,idx)=>`${5+idx}:00 - ${6+idx}:00`)
let DayPlaner = document.querySelector('.day_planer');
let Data = JSON.parse(localStorage.getItem('Data')) || {}


let sum = ''
hours.forEach(function(hr,id){
  
  sum = sum + `<div class="planer_timer">
  <p >${hr}</p>
  <input type="text" value="${Data[id]||''}" id="${id}" placeholder="Plane your hour">
  </div>`
  
  DayPlaner.innerHTML =sum
})

let PlanerTimerInput = document.querySelectorAll('.planer_timer input');

  PlanerTimerInput.forEach(function(inp){
    
    
    inp.addEventListener('input',function(ele){
      
      Data[inp.id]=(inp.value);
      localStorage.setItem('Data',JSON.stringify(Data))
  
    })
  
  })
}
dailyPlanner()

function quote(){
  let quoterender = document.querySelector(".qoute_container h2")
let author = document.querySelector(".author h6")

 async function  qouterender(){
   let res = await fetch("https://api.quotable.io/random")
   let data = await res.json()
   quoterender.innerHTML= (data.content)
   author.innerHTML=`- ${data.author}`

}
qouterender()
}
quote()

function pomo( ){
  let sessioName = document.querySelector(".pomo_container .session_name h1")
let timer = document.querySelector(".pomo_container .time")
let play = document.querySelector(".button_container .play_btn")
let pause = document.querySelector(".button_container .pause_btn")
let restart = document.querySelector(".button_container .restart_btn")
let interval ;
let playstarter = true;
let breakinterval;
let reset;
let time = 1500;
let breek = 300;

function breakk(){
  if(breek ===0){clearInterval(breakinterval)
    time=1500
    clearInterval(interval)
    playstarter = true;
    timer.innerHTML=`25:00` 
    sessioName.innerHTML=`Work Time!`

  }
  else{

    let min = Math.floor(breek/60)
    let sec = breek%60
    sec = sec<10? "0"+sec:sec
    timer.innerHTML =`${min}:${sec}`
    breek--
  }
  
}

function updateTime(){
  
  if(time ===0){
    clearInterval(interval)
    sessioName.innerHTML = `Break time`
      breakinterval = setInterval(breakk,1000)
    
  }else{

  let minutes = Math.floor(time/60)
  let seconds= time%60
   seconds = seconds<10 ?"0"+ seconds:seconds

   timer.innerHTML = `${minutes}:${seconds}`
  time--;
  }
  

}

play.addEventListener('click',()=>{
  if(playstarter){
    playstarter=false
    interval= setInterval(updateTime,1000)
    reset=true
  }
}
)
pause.addEventListener('click',()=>{
  console.log('pause pressed');
  
  clearInterval(interval);
  playstarter=true
}
)
restart.addEventListener('click',()=>{
  clearInterval(interval)
  time=1500
 if(reset)interval= setInterval(updateTime,1000)
})
}
pomo()



async function weather( ){

let apikey = "71d89d2f91874b7db8f74522250506";
let locations = "ludhiana";
const now = new Date();
let hr = String(now.getHours()).padStart(2,'0')
let ampm = hr >=12? "PM":"AM";
hr =hr % 12 || 12;
let min =String(now.getMinutes()).padStart(2,'0')
let sec = String(now.getSeconds()).padStart(2,'0')
console.log(sec);

let date =String(now.getDate()).padStart(2,'0')
let month = now.toLocaleDateString('en-IN',{month:'short'})
let year =String(now.getFullYear()).padStart(2,'0')


  let res= await  fetch(`https://api.weatherapi.com/v1/current.json?key=${apikey}&q=${locations}`)
  let data = await res.json()
  document.querySelector(".weatherLeft .degree .spandegree").innerHTML= `${data.current.dewpoint_f} `
  document.querySelector(".weatherLeft .day_weather").innerHTML= `${data.current.condition.text} `
  document.querySelector(".weatherLeft .humidity").innerHTML= `Humidity: ${data.current.humidity} `
  document.querySelector(".weatherRight .time .spantime").innerHTML= `${hr}:${min}:${sec}`
  document.querySelector(".weatherRight .time .spanap").innerHTML= `${ampm}`
  document.querySelector(".weatherRight .date").innerHTML= `${date} ${month} ${year}`
  document.querySelector(".weatherRight .location").innerHTML= `${data.location.name},${data.location.region}`
  console.log(data)
   
} 
setInterval(()=>(weather()),1000)










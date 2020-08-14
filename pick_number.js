
function store_number(){

  let lst = JSON.parse(sessionStorage.getItem("lst"));

  // let len = (Math.floor(Math.random()*10000))%lst.length;

  sessionStorage.setItem("pc_lst",  JSON.stringify(lst));


  sessionStorage.setItem("prob_nums", JSON.stringify(lst));


  let pin1 = document.getElementById("n0");
  let pin2 = document.getElementById("n1");
  let pin3 = document.getElementById("n2");
  let pin4 = document.getElementById("n3");



  let n0 = Number(pin1.value);
  let n1 = Number(pin2.value);
  let n2 = Number(pin3.value);
  let n3 = Number(pin4.value);

  pin1.value = '';
  pin2.value = '';
  pin3.value = '';
  pin4.value = '';

  pin1.focus();
  pin1.select();

  let usr_num = n0*1000 + n1*100 + n2*10 + n3;

  for (let i of lst) {
    if (usr_num == i) {
      sessionStorage.setItem("usr_num", usr_num);
      sessionStorage.setItem("turn_count", 0);

      window.location.href = "play_console.html";
      return;
    }
  }

  alert("choose valid number");
  window.location.href = "pick_number.html";

}

// ----------------------- event handlers -------------------------------------------

let pin1 = document.getElementById("n0");
let pin2 = document.getElementById("n1");
let pin3 = document.getElementById("n2");
let pin4 = document.getElementById("n3");

pin1.focus();
pin1.select();

pin1.addEventListener('keyup', (event) => {
    if (Number(event.key)<10 && Number(event.key)>0){
      pin2.focus();
      pin2.select();
    }
    if (event.keyCode == '39') { //right arrow
      pin2.focus();
      pin2.select();
    }
});

pin2.addEventListener('keyup', (event) => {
  if (Number(event.key)<10 && Number(event.key)>0){
    pin3.focus();
    pin3.select();
  }
  if (event.key == 'Backspace') {
    pin1.focus();
    pin1.select();
  }
  if (event.keyCode == '37') { //left arrow
    pin1.focus();
    pin1.select();
  }
  if (event.keyCode == '39') { //right arrow
    pin3.focus();
    pin3.select();
  }
});

pin3.addEventListener('keyup', (event) => {
  if (Number(event.key)<10 && Number(event.key)>0){
    pin4.focus();
    pin4.select();
  }
  if (event.key == 'Backspace') {
    pin2.focus();
    pin2.select();
  }
  if (event.keyCode == '37') { //left arrow
    pin2.focus();
    pin2.select();
  }
  if (event.keyCode == '39') { //right arrow
    pin4.focus();
    pin4.select();
  }
});

pin4.addEventListener('keyup', (event) => {
    if (Number(event.key)<10 && Number(event.key)>0){
      store_number();
    }
    if (event.key == 'Backspace') {
      pin3.focus();
      pin3.select();
    }
    if (event.key == 'Enter') {
      store_number();
    }
    if (event.keyCode == '37') { //left arrow
      pin3.focus();
      pin3.select();
    }
});

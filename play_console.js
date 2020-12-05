
function add_line(cows, bulls, guess, div1) {


  let div2 = document.createElement("div");
  div2.innerHTML = `<input type='text' class='dynamic' value=${guess} readonly> ${cows}C ${bulls}B <br><br>`;

  div2.style.cssText = `position: relative;
                        top: 75px;
                        color: rgb(0, 0, 0);
                        left: 22%;
                        font: 25px;`;

  div1.append(div2);

}

function getCowsAndBulls(orig, guess) {
  let cows = 0;
  let bulls = 0;
  let guess_copy = guess;
  let orig_array = [];
  let guess_array = [];
  let i;

  while (guess != 0) {
    guess_array.push(Number(guess%10));
    guess = Math.floor(guess/10);
  }

  while (orig != 0) {
    orig_array.push(Number(orig%10));
    orig = Math.floor(orig/10);
  }

  for (i = 0; i < guess_array.length; i++) {
    if (orig_array.indexOf(guess_array[i]) !== -1) {
      cows+=1;
    }
  }

  for (i = 0; i < guess_array.length; i++) {
    if (orig_array[i] == guess_array[i]) {
      bulls+=1;
      cows-=1;
    }
  }

  return [cows, bulls];

}

function update_pc_list(num, pc_num, pc_lst){
  let cb = getCowsAndBulls(pc_num, num);

  let new_pc_lst = []

  for (let i of pc_lst){
      let tmp = getCowsAndBulls(i, num);

      if ((tmp[0] == cb[0]) && (tmp[1] == cb[1])){
        new_pc_lst.push(i);
      }
  }

  sessionStorage.setItem("pc_lst", JSON.stringify(new_pc_lst));
}

function play_game_left_pane() {

  let pc_lst = JSON.parse(sessionStorage.getItem("pc_lst"));
  let len = (Math.floor(Math.random()*10000))%pc_lst.length;
  let pc_num = pc_lst[len];


  let n0 = Number(document.getElementById("n0").value);
  let n1 = Number(document.getElementById("n1").value);
  let n2 = Number(document.getElementById("n2").value);
  let n3 = Number(document.getElementById("n3").value);

  let num = n0*1000 + n1*100 + n2*10 + n3;

  let lst = JSON.parse(sessionStorage.getItem("lst"));

  for (let i of lst) {
    if (num == i) {

      let turn_count = Number(sessionStorage.getItem("turn_count"));
      sessionStorage.setItem("turn_count", turn_count+1);

      let div1 = document.getElementById("user");

      let tmp = getCowsAndBulls(pc_num, num);

      let cows = tmp[0];
      let bulls = tmp[1];

      add_line(cows, bulls, num, div1);

      document.getElementById("n0").value = '';
      document.getElementById("n1").value = '';
      document.getElementById("n2").value = '';
      document.getElementById("n3").value = '';

      document.getElementById("n0").focus();
      document.getElementById("n0").select();

      if (bulls == 4) {
        let turn_count = sessionStorage.getItem("turn_count");

        let num_matches = Number(localStorage.getItem("num_matches"));
        let num_won = Number(localStorage.getItem("num_won"));
        let avg_chances = Number(localStorage.getItem("avg_chances"));

        if(isNaN(num_matches)){
          num_matches = 0;
        }
        if(isNaN(num_won)){
          num_won = 0;
        }
        if(isNaN(avg_chances)){
          avg_chances = 0;
        }
        let new_avg = ((avg_chances*num_won+Number(turn_count))/(num_won+1)).toFixed(2);

        localStorage.setItem("num_matches", num_matches+1);
        localStorage.setItem("num_won", num_won+1);
        localStorage.setItem("avg_chances", new_avg);

        alert(`Correct! YOU WON!!
            you guessed the Number in ${turn_count} chances`);

        sessionStorage.clear();
        window.location.href = "index.html";
      }

      play_game_right_pane()
      update_pc_list(num, pc_num, pc_lst);

      return;
    }
  }

  alert("choose valid number");

  document.getElementById("n0").value = '';
  document.getElementById("n1").value = '';
  document.getElementById("n2").value = '';
  document.getElementById("n3").value = '';

  pin1.focus();
  pin1.select();

}

// ------------------- right pane -------------------------------------------------


function getPcGuess(cAndB, guess, prob_nums) {

  let tmp =[0,0];
  let new_prob_nums = [];
  for (let num of prob_nums) {
    tmp = getCowsAndBulls(guess, num);
    if ((tmp[0] == cAndB[0]) && (tmp[1] == cAndB[1])) {
      new_prob_nums.push(num);
    }
  }

  sessionStorage.setItem("prob_nums", JSON.stringify(new_prob_nums));

}

function play_game_right_pane() {

  let usr_num = sessionStorage.getItem("usr_num");
  prob_nums = JSON.parse(sessionStorage.getItem("prob_nums"));
  let len = (Math.floor(Math.random()*10000))%prob_nums.length;

  let num = prob_nums[len];


  document.getElementById("p0").value = num[0];
  document.getElementById("p1").value = num[1];
  document.getElementById("p2").value = num[2];
  document.getElementById("p3").value = num[3];

  let div1 = document.getElementById("pc");

  let tmp = getCowsAndBulls(usr_num, num);

  getPcGuess(tmp, num, prob_nums);

  let cows = tmp[0];
  let bulls = tmp[1];

  add_line(cows, bulls, num, div1);

  document.getElementById("p0").value = '';
  document.getElementById("p1").value = '';
  document.getElementById("p2").value = '';
  document.getElementById("p3").value = '';

  if (bulls == 4) {
    let turn_count = sessionStorage.getItem("turn_count");

    let num_matches = Number(localStorage.getItem("num_matches"));
    // let avg_chances = Number(localStorage.getItem("avg_chances"));

    if(isNaN(num_matches)){
      num_matches = 0;
    }
    // if(isNaN(avg_chances)){
    //   avg_chances = 0;
    // }
    // let new_avg = 0;
    // if (num_matches != 0) {
    //   new_avg = ((avg_chances*num_matches+turn_count)/(num_won)).toFixed(2);
    // }

    localStorage.setItem("num_matches", num_matches+1);
    // localStorage.setItem("avg_chances", new_avg);

    alert(`Sorry! PC WON!!
        It guessed the Number in ${turn_count} chances`);

    sessionStorage.clear();
    window.location.href = "index.html";
  }

}

// ------------------- event listeners -------------------------------------------------

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
      play_game_left_pane();
    }
    if (event.key == 'Backspace') {
      pin3.focus();
      pin3.select();
    }
    if (event.key == 'Enter') {
      play_game_left_pane();
    }
    if (event.keyCode == '37') { //left arrow
      pin3.focus();
      pin3.select();
    }
});

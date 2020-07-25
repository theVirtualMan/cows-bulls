
function add_line(cows, bulls, guess, div1) {


  let div2 = document.createElement("div");
  div2.innerHTML = `<input type='text' class='dynamic' value=${guess} readonly> ${cows}C ${bulls}B <br><br>`;

  div2.style.cssText = `position: relative;
                        top: 75px;
                        color: rgb(250, 250, 250);
                        left: 22%`;

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

function play_game_left_pane() {

  let pc_num = sessionStorage.getItem("pc_num");

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

      if (bulls == 4) {
        let turn_count = sessionStorage.getItem("turn_count");
        alert(`Correct! YOU WON!!
            you guessed the Number in ${turn_count} chances`);

        sessionStorage.clear();
        window.location.href = "home.html";
      }

      play_game_right_pane()
      return;
    }
  }

  alert("choose valid number");

  document.getElementById("n0").value = '';
  document.getElementById("n1").value = '';
  document.getElementById("n2").value = '';
  document.getElementById("n3").value = '';
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
  let num = prob_nums[0];


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
    alert(`Sorry! PC WON!!
        It guessed the Number in ${turn_count} chances`);

    sessionStorage.clear();
    window.location.href = "home.html";
  }

}

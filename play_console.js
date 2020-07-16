
function add_line(cows, bulls, guess) {

  let div1 = document.getElementById("user");

  let div2 = document.createElement("div");
  div2.innerHTML = `<input type='text' class='dynamic' value=${guess} readonly> ${cows}C ${bulls}B <br><br>`;

  div2.style.cssText = `position: relative;
                        top: 75px;
                        color: rgb(250, 250, 250);
                        left: 22%`;


  div1.append(div2);

  if (bulls == 4) {
    let turn_count = sessionStorage.getItem("turn_count");
    alert(`Correct!
        you guessed the Number in ${turn_count} chances`)
  }

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

  add_line(cows, bulls, guess_copy);

}

function play_game_left_pane() {

  let pc_num = sessionStorage.getItem("pc_num");

  let n0 = Number(document.getElementById("n0").value);
  let n1 = Number(document.getElementById("n1").value);
  let n2 = Number(document.getElementById("n2").value);
  let n3 = Number(document.getElementById("n3").value);

  let num = n0*1000 + n1*100 + n2*10 + n3;

  let turn_count = Number(sessionStorage.getItem("turn_count"));
  sessionStorage.setItem("turn_count", turn_count+1);

  getCowsAndBulls(pc_num, num);

}

function play_game_right_pane() {

  let usr_num = sessionStorage.getItem("usr_num");

}

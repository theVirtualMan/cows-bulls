

let num_matches = Number(localStorage.getItem("num_matches"));
let num_won = Number(localStorage.getItem("num_won"));
let avg_chances = Number(localStorage.getItem("avg_chances"));

let div1 = document.getElementById("middle");

let div2 = document.createElement("ul");
div2.innerHTML = `<li>Total number of matches played: ${num_matches}</li>
                  <li>Total number of matches won: ${num_won}</li>
                  <li>Average number of chances took: ${avg_chances}</li>`;

div2.style.cssText = `margin-top: 10px;`;

div1.append(div2);

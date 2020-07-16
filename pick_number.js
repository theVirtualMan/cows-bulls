
function store_number(){

  let lst = JSON.parse(sessionStorage.getItem("lst"));

  let len = (Math.floor(Math.random()*10000))%lst.length;

  sessionStorage.setItem("pc_num", lst[len]);

  let n0 = Number(document.getElementById("n0").value);
  let n1 = Number(document.getElementById("n1").value);
  let n2 = Number(document.getElementById("n2").value);
  let n3 = Number(document.getElementById("n3").value);

  let usr_num = n0*1000 + n1*100 + n2*10 + n3;

  sessionStorage.setItem("usr_num", usr_num);
  sessionStorage.setItem("turn_count", 0);

  window.location.href = "play_console.html";

}

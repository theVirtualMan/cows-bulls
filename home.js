function create_number() {
    let map = {};
    let lst = [];
    let i, j, k, l, num;

    for (i = 1; i < 10; i++) {
      map[i] = 0;
    }

    for (i = 1; i < 10; i++) {
      map[i] = 1;

      for (j = 1; j < 10; j++) {
        if (map[j] == 1) {
          continue;
        }
        map[j] = 1;

        for (k = 1; k < 10; k++) {
          if (map[k] == 1) {
            continue;
          }
          map[k] = 1;

          for (l = 1; l < 10; l++) {
            if (map[l] == 1) {
              continue;
            }
            map[l] = 1;

            num = i*1000 + j*100 + k*10 + l;
            lst.push(num.toString())

            map[l] = 0;
          }
          map[k] = 0;
        }
        map[j] = 0;
      }
      map[i] = 0;
    }

    sessionStorage.setItem("lst", JSON.stringify(lst));

    window.location.href = "pick_number.html";


}

$(function () {
  let arr = [];

  $("#btnFill").click(function () {
    arr = fill();
    draw(arr);
  });

  $("#btnSort").click(function () {
    let sorted = mergeSort();
    let i = 0;
    let inter = setInterval(function () {
      if (i == sorted.length - 1) clearInterval(inter);
      draw(sorted[i]);
      i++;
    }, 10);
    console.log("Done!");
  });

  function mergeSort() {
    let snapShots = [];
    for (let i = 1; i < arr.length; i++) {
      let current = i;
      while (arr[current] < arr[current - 1]) {
        // console.log(arr[current] + "<" + arr[current - 1]);
        let tmp = arr[current - 1];
        arr[current - 1] = arr[current];
        arr[current] = tmp;
        snapShots.push([...arr]);
        current--;
      }
    }
    console.log(snapShots);
    return snapShots;
  }

  function fill() {
    const range = 100;
    const length = 40;
    const tmp = [];
    for (let i = 0; i < length; i++)
      tmp[i] = Math.floor(Math.random() * range + 1);
    return tmp;
  }

  function draw(arr) {
    $(".container").empty();
    for (let i = 0; i < arr.length; i++) {
      const tmp = $('<div class="bar"></div>');
      tmp.css("height", arr[i] + "%");
      $(".container").append(tmp);
    }
  }
});

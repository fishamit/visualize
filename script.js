const btnFill = document.querySelector("#btnFill");
const btnSort = document.querySelector("#btnSort");
const btnClear = document.querySelector("#btnClear");
const container = document.querySelector(".arrayContainer");
const select = document.querySelector("#select");
const speed = document.querySelector("#speed");
const menu = document.querySelector(".menu");

let timer;
let arr = [];
let animating = false;
let sorted = false;

btnFill.addEventListener("click", function () {
  arr = fillArray();
  sorted = false;

  draw(arr);
  manageButtons();
});

btnClear.addEventListener("click", function () {
  animating = false;
  sorted = false;

  clearInterval(timer);
  container.innerHTML = "";
  arr = [];
  manageButtons();
});

btnSort.addEventListener("click", function () {
  animating = true;
  manageButtons();
  let sorted;
  const algo = select.value;
  console.log(select.value);
  if (algo == "bubble") {
    sorted = bubbleSort();
  } else if (algo == "insertion") {
    sorted = insertionSort();
  } else if (algo == "selection") {
    sorted = selectionSort();
  }

  let index = 0;
  timer = setInterval(function () {
    draw(sorted[index]);
    index++;
    if (index == sorted.length) {
      animating = false;
      sorted = true;
      manageButtons();
      clearInterval(timer);
    }
  }, speed.value);
});

function selectionSort() {
  let snapShopts = [];

  for (let i = 0; i < arr.length - 1; i++) {
    paintInsertion(i);
    arr[i].col = "green";
    snap(snapShopts);
    let minimum = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j].val < arr[minimum].val) {
        minimum = j;
      }
    }
    if (minimum != i) {
      arr[minimum].col = "blue";
      snap(snapShopts);
      let tmp = arr[i].val;
      arr[i].val = arr[minimum].val;
      arr[minimum].val = tmp;
    }
  }
  for (let i = 0; i < arr.length; i++) {
    arr[i].col = "teal";
  }
  snap(snapShopts);
  return snapShopts;
}

function insertionSort() {
  let snapShots = [];
  for (let i = 1; i < arr.length; i++) {
    let j = i;

    while (j > 0 && arr[j - 1].val > arr[j].val) {
      paintInsertion(i);
      arr[j].col = "green";
      snap(snapShots);
      arr[j - 1].col = "blue";
      snap(snapShots);
      let tmp = arr[j - 1].val;
      arr[j - 1].val = arr[j].val;
      arr[j].val = tmp;
      arr[j].col = "blue";
      arr[j - 1].col = "green";
      j--;
      snap(snapShots);
    }
  }

  for (let i = 0; i < arr.length; i++) {
    arr[i].col = "teal";
  }
  snap(snapShots);
  return snapShots;
}

function paintInsertion(s) {
  for (let i = 0; i < arr.length; i++) {
    arr[i].col = "red";
  }
  for (let i = 0; i < s; i++) {
    arr[i].col = "teal";
  }
}

function bubbleSort() {
  let snapShots = [];
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      paintBubble(arr.length - i);
      arr[j + 1].col = "blue";
      snap(snapShots);
      arr[j].col = "green";
      snap(snapShots);

      if (arr[j].val > arr[j + 1].val) {
        let tmp = arr[j].val;
        arr[j].val = arr[j + 1].val;
        arr[j + 1].val = tmp;
        arr[j + 1].col = "green";
        arr[j].col = "blue";
        snap(snapShots);
      }
    }
  }
  for (let i = 0; i < arr.length; i++) {
    arr[i].col = "teal";
  }
  snap(snapShots);
  return snapShots;
}

function paintBubble(s) {
  for (let i = 0; i < arr.length; i++) {
    arr[i].col = "teal";
  }
  for (let i = 0; i < s; i++) {
    arr[i].col = "red";
  }
}

/*
When writing an algorithm function, keep in mind:
-snap(param) will write a snapshot of arr to param.
use it to add a frame to the "film" (snapShots)
-use snap() every time there is a color change!
*/
function snap(target) {
  target.push(JSON.parse(JSON.stringify([...arr])));
}

function fillArray() {
  const tmp = [];
  const len = 50;
  for (let i = 0; i < len; i++) {
    tmp[i] = { val: Math.floor(Math.random() * 100 + 1), col: "red" };
  }
  return tmp;
}

function draw(array) {
  container.innerHTML = "";
  for (let i = 0; i < array.length; i++) {
    const tmp = document.createElement("div");
    const num = document.createElement("span");
    tmp.style.height = array[i].val + "%";
    tmp.classList.add("bar", array[i].col);
    num.classList.add("num");
    num.textContent = array[i].val;
    tmp.appendChild(num);
    container.appendChild(tmp);
  }
}

function manageButtons() {
  if (animating) {
    btnFill.disabled = true;
    btnSort.disabled = true;
    btnClear.disabled = false;
  } else {
    if (arr.length > 0) {
      if (sorted) {
        btnClear.disabled = false;
        btnFill.disabled = false;
        btnSort.disabled = true;
      } else {
        btnFill.disabled = false;
        btnSort.disabled = false;
        btnClear.disabled = false;
      }
    } else {
      btnFill.disabled = false;
      btnSort.disabled = true;
      btnClear.disabled = true;
    }
  }
}

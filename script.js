const btnFill = document.querySelector("#btnFill");
const btnSort = document.querySelector("#btnSort");
const btnClear = document.querySelector("#btnClear");
const container = document.querySelector(".container");

let animating = false;
let timer;
let arr = [];

btnFill.addEventListener("click", function () {
  arr = fillArray();
  draw(arr);
});

btnClear.addEventListener("click", function () {
  clearInterval(timer);
  container.innerHTML = "";
  animating = false;
  arr = [];
});

btnSort.addEventListener("click", function () {
  if (animating || !arr.length) {
    return;
  }
  animating = true;
  let sorted = bubbleSort();
  let index = 0;
  timer = setInterval(function () {
    draw(sorted[index]);
    index++;
    if (index == sorted.length) {
      animating = false;
      clearInterval(timer);
    }
  }, 20);
});

function bubbleSort() {
  let snapShots = [];
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      arr[j].col = "blue";
      if (arr[j].val > arr[j + 1].val) {
        let tmp = arr[j].val;
        arr[j].val = arr[j + 1].val;
        arr[j + 1].val = tmp;
        snapShots.push(JSON.parse(JSON.stringify([...arr])));
      }
    }
  }
  return snapShots;
}

function fillArray() {
  const tmp = [];
  const len = 100;
  for (let i = 0; i < len; i++) {
    tmp[i] = { val: Math.floor(Math.random() * 100 + 1), col: "red" };
  }
  return tmp;
}

function draw(array) {
  container.innerHTML = "";
  for (let i = 0; i < array.length; i++) {
    const tmp = document.createElement("div");
    tmp.style.height = array[i].val + "%";
    tmp.classList.add("bar", array[i].col);
    container.appendChild(tmp);
  }
}

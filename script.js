const btnFill = document.querySelector("#btnFill");
const btnSort = document.querySelector("#btnSort");
const btnClear = document.querySelector("#btnClear");
const container = document.querySelector(".container");
const select = document.querySelector("#select");
const speed = document.querySelector("#speed");

let timer;
let arr = [];
btnClear.disabled = true;
btnSort.disabled = true;

btnFill.addEventListener("click", function () {
  btnClear.disabled = false;
  btnSort.disabled = false;
  arr = fillArray();
  draw(arr);
});

btnClear.addEventListener("click", function () {
  btnFill.disabled = false;
  btnSort.disabled = true;
  btnClear.disabled = true;
  clearInterval(timer);
  container.innerHTML = "";
  arr = [];
});

btnSort.addEventListener("click", function () {
  btnFill.disabled = true;
  btnSort.disabled = true;
  let sorted;
  const algo = select.value;
  console.log(select.value);
  if (algo == "bubble") {
    sorted = bubbleSort();
  } else if (algo == "insertion") {
    sorted = insertionSort();
  }

  let index = 0;
  timer = setInterval(function () {
    draw(sorted[index]);
    index++;
    if (index == sorted.length) {
      animating = false;
      clearInterval(timer);
    }
  }, speed.value);
});

function insertionSort() {
  let snapShots = [];
  console.log("Insertion");
  for (let i = 1; i < arr.length; i++) {
    let j = i;
    while (j > 0 && arr[j - 1].val > arr[j].val) {
      let tmp = arr[j - 1].val;
      arr[j - 1].val = arr[j].val;
      arr[j].val = tmp;
      j--;
      snapShots.push(JSON.parse(JSON.stringify([...arr])));
    }
  }
  return snapShots;
}

function bubbleSort() {
  console.log("Bubble");
  let snapShots = [];
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      paintBubble(arr.length - i);
      arr[j + 1].col = "blue";
      arr[j].col = "green";
      snapShots.push(JSON.parse(JSON.stringify([...arr])));
      if (arr[j].val > arr[j + 1].val) {
        let tmp = arr[j].val;
        arr[j].val = arr[j + 1].val;
        arr[j + 1].val = tmp;
        arr[j + 1].col = "green";
        arr[j].col = "blue";
        snapShots.push(JSON.parse(JSON.stringify([...arr])));
      }
    }
  }
  for (let i = 0; i < arr.length; i++) {
    arr[i].col = "teal";
  }
  snapShots.push(JSON.parse(JSON.stringify([...arr])));
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

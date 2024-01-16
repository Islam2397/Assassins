let omar = document.getElementById("omar");

let colors = ["red", "blue", "black", "pink", "green", "yellow"];

let number = 0;

omar.onclick = function () {
  number++;
  omar.style.backgroundColor = colors[number];
  if (number > 5) {
    omar.style.backgroundColor = "skyblue";
    omar.innerHTML = "وعليكم السلام";
  }
};

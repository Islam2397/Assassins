//===============================================>(background audio)
let audioPlay = document.querySelector(".bg-audio");
audioPlay.volume = 0.5;
audioPlay.loop = "ture";

// control sound
let soundBtn = document.querySelector(".sound-btn");
soundBtn.onclick = function () {
  this.classList.toggle("active");
  if (!soundBtn.classList.contains("active")) {
    this.innerHTML = "Sound Off";
    audioPlay.pause();
  } else {
    this.innerHTML = "Sound On";
    audioPlay.play();
  }
};

// ============================================================(Global Variable)

// let tabs = document.querySelectorAll(".container ul li");
//Testing imgs array
let theTabsUl = document.querySelector(".tabs");
let tabsOnPage = document.querySelectorAll(".tabs li");
let theChosenChar;
let theImgsChosenArr;
let theVidsChosenArr;
let imgContainer = document.querySelector(".img-container");
let vidContainer = document.querySelector(".vid-container");
let optList = document.querySelectorAll(".options li");
let imgsBtn = document.querySelector(".options .imgs");
let vidsBtn = document.querySelector(".options .vids");

// Dealing with the options list
optList.forEach((el) => {
  el.addEventListener("click", () => {
    optList.forEach((ele) => {
      ele.classList.remove("active");
    });
    el.classList.add("active");
    if (el == imgsBtn) {
      imgContainer.classList.add("active");
      vidContainer.classList.remove("active");
    } else {
      imgContainer.classList.remove("active");
      vidContainer.classList.add("active");
    }
  });
});

fetch("/javaScript/json/main.json")
  .then((data) => {
    return data.json();
  })
  .then((data) => {
    document.documentElement.style.setProperty(
      "--bg-img",
      `url(${localStorage.bg || "/imgs/background.jpg"})`
    );
    // creating the tabs using only js
    let tabs = Object.keys(data);
    let tabsArray = Array.from(tabs);
    for (let i = 0; i < tabsArray.length; i++) {
      let li = document.createElement("li");
      li.setAttribute("data-char", tabsArray[i]);
      li.classList.add("btn", "btn-primary", "col-md-4");
      li.innerHTML = data[tabsArray[i]]["name"];
      theTabsUl.appendChild(li);
    }
    // getting the (li) Elements after creating them
    tabsOnPage = document.querySelectorAll(".tabs li");
    //========================>(Start LocalStorage)

    //=======================>(End LocalStorage)
    tabsOnPage.forEach((tab) => {
      // On click event
      tab.addEventListener("click", (e) => {
        // Showing the Options List
        document.querySelector(".options").classList.add("active-flex");
        //removing class list from all tabs
        tabsOnPage.forEach((Tab) => Tab.classList.remove("active"));
        // adding class to the current tab
        e.target.classList.add("active");
        // Getting the chosen character
        theChosenChar = e.target.dataset.char;
        // Getting the array for generating Imgs
        const { charImgs, vid } = data[theChosenChar];
        theImgsChosenArr = charImgs;
        // Getting the array for generating Videos
        theVidsChosenArr = vid;
        // Shuffling BG on click
        let imgNo = 0;
        setInterval(() => {
          document.documentElement.style.setProperty(
            "--bg-img",
            `url(${theImgsChosenArr[imgNo]})`
          );
          imgNo++;
          if (imgNo >= theImgsChosenArr.length) {
            imgNo = 0;
          }
          localStorage.setItem("bg", `${theImgsChosenArr[imgNo]}`);
        }, 7000);
        //======================================================================================================(test area)

        //======================================================================================================(test area)

        // Calling the func that generats the imgs to the page
        generateImgs(theImgsChosenArr);
        // Calling the videos function
        generateVids(theVidsChosenArr);
      });
    });
  });

// Creating element function
function generateImgs(theImgsArray) {
  // Removing the existing pix before showing another ones
  imgContainer.innerHTML = "";
  theImgsArray.forEach((img) => {
    let imgBox = document.createElement("div");
    let image = document.createElement("img");
    image.src = img;
    image.classList.add("img-fluid");
    imgBox.classList.add("img-box", "mt-5", "px-2");
    imgBox.setAttribute("data-char", theChosenChar);
    imgBox.appendChild(image);
    document.querySelector(".img-container").appendChild(imgBox);
  });
}
// Creating Videos element function
function generateVids(theVidsArray) {
  // Removing the existing vids before showing another ones
  vidContainer.innerHTML = "";
  theVidsArray.forEach((vid) => {
    let vidBox = document.createElement("div");
    let video = document.createElement("iframe");
    video.src = vid;
    vidBox.classList.add("vid-box", "mt-3", "px-2");
    vidBox.setAttribute("data-char", theChosenChar);
    vidBox.appendChild(video);
    document.querySelector(".vid-container").appendChild(vidBox);
  });
}
//=================================================>((testing area))
// localStorage.clear();

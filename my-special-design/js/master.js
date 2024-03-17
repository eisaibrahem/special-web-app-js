let mainColor = "#E91E63",
  blueColor = "#0075ff",
  blueAltColor = "#0d69d5",
  orangeColor = "#f59e0b",
  greenYelloColor = "#4CAF50",
  greenColor = "#009688",
  redColor = "#E91E63",
  greyColor = "#888";

// get Elements
let iconSetting = document.querySelector(".togill-setting");
let boxSetting = document.querySelector(".setting-box");
let yesButtonRbg = document.querySelector(".random-bg .yes");
let noButtonRbg = document.querySelector(".random-bg .no");
let yesButtonShowBull = document.querySelector(".show-bulltes .yes");
let noButtonShowBull = document.querySelector(".show-bulltes .no");
let resetButton = document.querySelector(".setting-box .reset-button");
let selectedColor = document.querySelector(".color-box span");

let backgroudImagesList = [
  "02.jpg",
  "03.jpg",
  "04.jpg",
  "05.jpg",
  "06.png",
  "07.jpg",
  "08.jpg",
  "09.jpg",
  "10.jpg",
  "01.jpg",
];
let landingScreen = document.querySelector(".landing");
let indexImageBackground = 0;
let isRandom;
let isBulletsVisable;

let intervalRandomTrue;
let intervalRandomFalse;

// Onload Functions
window.onload = () => {
  checkLocalSorage();
  checkRandomBackground();
};

// Toggle Setting Box
iconSetting.onclick = function () {
  boxSetting.classList.toggle("open");
  //--------Another way--------
  // if (boxSetting.classList.contains("open")) {
  //   boxSetting.classList.remove("open");
  // } else {
  //   boxSetting.classList.add("open");
  // }
};
// YES / NO Active Buttons Randonm Background
yesButtonRbg.onclick = function () {
  if (yesButtonRbg.classList.contains("active-yn")) {
  } else {
    window.localStorage.setItem("isRandom", true);
    yesButtonRbg.classList.add("active-yn");
    noButtonRbg.classList.remove("active-yn");
    isRandom = true;
    clearInterval(intervalRandomFalse);
    checkRandomBackground();
  }
};
noButtonRbg.onclick = function () {
  if (noButtonRbg.classList.contains("avtive")) {
  } else {
    window.localStorage.setItem("isRandom", false);
    noButtonRbg.classList.add("active-yn");
    yesButtonRbg.classList.remove("active-yn");
    isRandom = false;
    clearInterval(intervalRandomTrue);
    checkRandomBackground();
  }
};

// YES / NO  Active Button Show Bullets

let navBulletsContainer = document.querySelector(".nav-bullets");
yesButtonShowBull.onclick = function () {
  if (yesButtonShowBull.classList.contains("active-yn")) {
  } else {
    yesButtonShowBull.classList.add("active-yn");
    noButtonShowBull.classList.remove("active-yn");
    navBulletsContainer.style.display = "block";
    window.localStorage.setItem("isBulletsVisable", "true");
  }
};
noButtonShowBull.onclick = function () {
  if (noButtonShowBull.classList.contains("active-yn")) {
  } else {
    noButtonShowBull.classList.add("active-yn");
    yesButtonShowBull.classList.remove("active-yn");
    navBulletsContainer.style.display = "none";
    window.localStorage.setItem("isBulletsVisable", "false");
  }
};

//Active Colore Change
let listOfElementColors = Array.from(
  document.querySelectorAll(".change-colors span")
);

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("span-color")) {
    listOfElementColors.forEach((span) => {
      span.classList.remove("selected-color");
    });
    e.target.classList.add("selected-color");
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    window.localStorage.setItem("colorOption", e.target.dataset.color);
  }
});

// Reset Button
resetButton.onclick = function () {
  yesButtonRbg.classList.remove("active-yn");
  noButtonRbg.classList.add("active-yn");
  yesButtonShowBull.classList.add("active-yn");
  noButtonShowBull.classList.remove("active-yn");
  listOfElementColors.forEach((span) => {
    span.classList.remove("selected-color");
  });
  listOfElementColors[0].classList.add("selected-color");
  iconSetting.click();
  //Remove Main Color from LocalStorage
  window.localStorage.setItem(
    "colorOption",
    listOfElementColors[0].dataset.color
  );
  document.documentElement.style.setProperty(
    "--main-color",
    listOfElementColors[0].dataset.color
  );
};

// Check LocalSorage Values of Settings
function checkLocalSorage() {
  if (window.localStorage.getItem("colorOption")) {
    document.documentElement.style.setProperty(
      "--main-color",
      window.localStorage.getItem("colorOption")
    );
    listOfElementColors.forEach((e) => {
      if (e.dataset.color === window.localStorage.getItem("colorOption")) {
        e.classList.add("selected-color");
      }
    });
  } else {
    document.documentElement.style.setProperty("--main-color", "#E91E63");
    listOfElementColors[0].classList.add("selected-color");
  }
}
//---------------------------------------------------------------
//Change Landing Background Images  Rondomly
if (window.localStorage.getItem("isRandom")) {
  if (window.localStorage.getItem("isRandom") === "true") {
    isRandom = true;
    yesButtonRbg.classList.add("active-yn");
  } else {
    isRandom = false;
    noButtonRbg.classList.add("active-yn");
  }
} else {
  isRandom = false;
  window.localStorage.setItem("isRandom", false);
  noButtonRbg.classList.add("active-yn");
}
// -------------------------------------------------------------
// Check isBulletsVisable true/false From Loclstorage
if (window.localStorage.getItem("isBulletsVisable")) {
  if (window.localStorage.getItem("isBulletsVisable") === "true") {
    isBulletsVisable = true;
    yesButtonShowBull.classList.add("active-yn");
    navBulletsContainer.style.display = "block";
  } else {
    isBulletsVisable = false;
    noButtonShowBull.classList.add("active-yn");
    navBulletsContainer.style.display = "none";
  }
} else {
  window.localStorage.setItem("isBulletsVisable", "true");
  isBulletsVisable = true;
  yesButtonShowBull.classList.add("active-yn");
}

// intervalBackground = setInterval(() => {
//   if (isRandom) {
//   } else {
//   }
// }, 1000);

function checkRandomBackground() {
  if (isRandom) {
    intervalRandomTrue = setInterval(() => {
      let randomIndex = Math.floor(Math.random() * backgroudImagesList.length);
      landingScreen.style.backgroundImage = `url(/imgs/${backgroudImagesList[randomIndex]})`;
    }, 10000);
  } else {
    intervalRandomFalse = setInterval(() => {
      landingScreen.style.backgroundImage = `url(/imgs/${backgroudImagesList[indexImageBackground]})`;
      if (indexImageBackground < backgroudImagesList.length - 1) {
        indexImageBackground++;
      } else {
        indexImageBackground = 0;
      }
    }, 10000);
  }
}

// skills Selectors
let skillsSection = document.querySelector(".skills");
let skills = Array.from(
  document.querySelectorAll(".skills .list-skill .skill .progress>span")
);

window.onscroll = function () {
  // console.log(this.scrollY);
  if (
    this.scrollY >
    skillsSection.offsetTop + skillsSection.offsetHeight - this.scrollY
  ) {
    skills.forEach((e) => {
      e.style.width = `${e.dataset.progress}`;
    });
  } else {
    skills.forEach((e) => {
      e.style.width = `0`;
    });
  }
};

//Stert Gallary
let listOfImages = document.querySelectorAll(
  ".gallary .images-container .image img"
);

listOfImages.forEach((img) => {
  img.addEventListener("click", () => {
    // creat overlay popup
    let popupOverlay = document.createElement("div");
    popupOverlay.className = "popup-overlay";
    document.body.appendChild(popupOverlay);

    //creat popup-box
    let popupBox = document.createElement("div");
    popupBox.className = "popup-box";

    // create colse popup
    let closepopup = document.createElement("span");
    closepopup.innerHTML = "x";
    closepopup.className = "close-popup";
    popupBox.appendChild(closepopup);

    //creat image
    let popImage = document.createElement("img");
    popImage.src = img.src;
    popupBox.appendChild(popImage);

    popupOverlay.appendChild(popupBox);
  });
});

//End Gallary

//close overlay popup
document.addEventListener("click", (e) => {
  if (
    e.target.className === "close-popup" ||
    e.target.className === "popup-overlay"
  ) {
    document.querySelector(".popup-overlay").remove();
  }
});

// Navigations Bullets  and links
let navBullets = document.querySelectorAll(".nav-bullets .bullet");
let listOflinks = document.querySelectorAll(".header .links li a");
let listOfOpenLinks = document.querySelectorAll(
  ".landing .header .open-links li"
);

function navToAnySection(listOfElement) {
  listOfElement.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();

      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

navToAnySection(navBullets);
navToAnySection(listOflinks);
navToAnySection(listOfOpenLinks);

// show And hide menu

let menu = document.querySelector(".menu");
let openMenu = document.querySelector(".menu .open-links");
menu.onclick = function (e) {
  e.stopPropagation();
  openMenu.classList.toggle("visable");
};

// openMenu.onclick = function (e) {
//   e.stopPropagation();
// };

document.addEventListener("click", function (e) {
  if (e.target !== menu && e.target !== openMenu) {
    if (openMenu.classList.contains("visable")) {
      openMenu.classList.remove("visable");
    }
  }
  // else if (e.target !== openMenu) {
  //   openMenu.classList.add("hide");
  // }
});

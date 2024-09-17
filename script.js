// Array of Words
let words = [
  " camino",
  "fuerza",
  "ventana",
  "sonrisa",
  "montana",
  "ciudad",
  "bosque",
  "espacio",
  "misterio",
  "corazon",
];

// Setting Levels
const lvls = {
  Easy: 8,
  Normal: 5,
  Hard: 3,
};

// Default Level
let defaultLevelName = "Normal";
let defaultLevelSeconds = lvls[defaultLevelName];
// Select the dropdown element

// Catch Selectors
let startButton = document.querySelector(".start");
let name1 = document.querySelector(".name");
let levelsGame = document.querySelector(".levels section");
let editMessage = document.querySelector(".edit-mode");
let game = document.querySelector(".game");
let background = document.querySelector(".start");
let messageTop = document.querySelector(".message");
let controls = document.querySelector(".controls");
let lvlNameSpan = document.querySelector(".message .lvl");
let SecondsSpan = document.querySelector(".message .seconds");
let theWord = document.querySelector(".the-word");
let upcomingWords = document.querySelector(".upcoming-words");
let upcomingWordsArabic = document.querySelector(".upcoming-words-arabic");
let input = document.querySelector(".input");
let input1 = document.querySelector(".input1");
let timeLeftSpan = document.querySelector(".time span");
let scoreGotSpan = document.querySelector(".score  .got");
let scoreFinal = document.querySelector(".score1");
let scoreTotalSpan = document.querySelector(".score  .total");
let final = document.querySelector(".finish");
let finalMessage = document.querySelector(".finish p");
let finalExitButton = document.querySelector(".finish span");
// insert data

let totalScore = words.length; // total score static
scoreTotalSpan.innerHTML = totalScore; // total score

//// finish////////////////////////////////////////////
let statueFinish = "";
finalExitButton.onclick = () => {
  (statueFinish = ""),
    final.classList.remove("good", "bad"),
    (statueFinish = ""),
    changeStatueFinsh();
  window.location.reload();
};
function changeStatueFinsh() {
  if (statueFinish === true) {
    final.classList.add("good");
    finalMessage.textContent = "¡Felicidades! 🥳🥳🥳";
    totalScore = scoreTotalSpan.textContent;
    scoreFinal.textContent = `${scoreGotSpan.textContent}/${totalScore}`;
  } else if (statueFinish === false) {
    final.classList.add("bad"),
      (finalMessage.textContent = "Desafortunadamente 😔");
    totalScore = scoreTotalSpan.textContent;
    scoreFinal.textContent = `${scoreGotSpan.textContent}/${totalScore}`;
  }
}
//////////////////////////Start Game//////////////////////////////////////////

// Enter to Start
// document.onkeyup = function (e) {
//   if (e.key === "Enter") {
//     startButton.click();
//   }
// };
let levelControl = document.querySelector("#level-control");
levelControl.value = defaultLevelName;
// update values
lvlNameSpan.innerHTML = defaultLevelName; // level
SecondsSpan.innerHTML = defaultLevelSeconds; // level time
timeLeftSpan.innerHTML = defaultLevelSeconds; // time left

// When start
levelControl.addEventListener(
  "change",
  function as() {
    defaultLevelName = levelControl.value; // Update the selected level
    defaultLevelSeconds = lvls[defaultLevelName]; // Update the time based on the selected level
    lvlNameSpan.innerHTML = defaultLevelName; // level
    SecondsSpan.innerHTML = defaultLevelSeconds; // level time
    timeLeftSpan.innerHTML = defaultLevelSeconds;
  }, // time left
  //////////////////////////////

  //////////////////////////////////////start ////////////////

  (startButton.onclick = function () {
    if (words.length != 0) {
      input1.value = "";
      controls.style.display = "flex";
      input.style.cssText = "display:block";
      end.remove();
      add.remove();
      editMode.remove();
      remove.remove();
      removeAll.remove();
      editMode.textContent = "Edit Mode";
      this.remove(); // remove button
      input.focus(); // focus
      levelControl.remove();
      generateWords();
    } else {
      upcomingWords.textContent = "";
      upcomingWords.append("NO DATA , GO TO EDIT MODE");
      upcomingWords.style.cssText =
        "display:flex; font-size:30px; color:red;font-weight:bold;";
    }
  })
);

// external functions////////////////////////////////////////////

// generate word Function
function generateWords() {
  let random = words[Math.floor(Math.random() * words.length)]; // random word from array
  let wordIndex = words.indexOf(random); // index of this word
  theWord.textContent = random; // add word
  words.splice(wordIndex, 1); // remove word from array
  // Upcoming words
  upcomingWordsArabic.textContent = "";

  for (let i = 0; i < words.length; i++) {
    let upcomingWordsDivs = document.createElement("div");
    let upcomingWordsDivsContent = document.createTextNode(words[i]);
    upcomingWordsDivs.appendChild(upcomingWordsDivsContent);
    upcomingWordsArabic.appendChild(upcomingWordsDivs);
  }
  timer();
}
// Timer
function timer() {
  timeLeftSpan.textContent = defaultLevelSeconds;
  let counter = setInterval(() => {
    timeLeftSpan.textContent--; // time countDown
    //////////////////////////////////
    if (timeLeftSpan.innerHTML === "0") {
      clearInterval(counter);

      // compare words
      if (
        theWord.innerHTML.toLowerCase().trim() ===
        input.value.toLowerCase().trim()
      ) {
        input.value = ""; // empty value
        scoreGotSpan.innerHTML++; // increse score
        // no undefined
        if (words.length > 0) {
          generateWords();
          // lose if Time end score less than total
        } else {
          theWord.textContent = "";
          upcomingWords.innerHTML = "";
          // get full mark
          statueFinish = true;
          changeStatueFinsh();
          clearInterval(counter);
        }
      } else {
        clearInterval(counter);
        upcomingWords.innerHTML = "";
        theWord.textContent = "";
        statueFinish = false;
        changeStatueFinsh();
      }
    }
  }, 1000);
}

//EDITING//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let editMode = document.querySelector(".edit");
let add = document.querySelector(".add");
let removeAll = document.querySelector(".removeAll");
let remove = document.querySelector(".remove");
let end = document.querySelector(".x");
//////////////////////////////// remove all/////////////////////////////
removeAll.onclick = function () {
  input1.value = "";
  words = [];
  refresh();
  clearLocalStorage();
};

// remove one
// remove.onclick = function () {
//   deleteFromLocalStorage();
// };
//////////////////////////// add/////////////////////////////////
add.onclick = function () {
  if (input.value !== "") {
    addDataToArray(input.value);
    addTaskToPageFrom(words);
    refresh();
    input.focus();
    input.value = "";
  }
  ///////////////////////////////////////////////////
  if (input1.value !== "") {
    addDataToObject(input1.value);
    input1.focus();
  }
  upcomingWordsArabic.style.textAlign = "center";
};
////////////////// edit //////////////////////////////////
editMode.onclick = function clicky() {
  upcomingWords.textContent = "";
  editMode.textContent = "Check Now";
  this.style.cssText = "display:none";
  add.style.display = "block";
  end.style.display = "block";
  end.style.opacity = "1";
  upcomingWordsArabic.style.display = "flex";
  input1.style.display = "block";
  game.style.cssText = "background-color:black;";
  remove.style.display = "block";
  removeAll.style.display = "block";
  upcomingWords.style.display = "flex";
  input.style.display = "block";
  startButton.style.display = "none";
  messageTop.style.display = "none";
  controls.style.display = "none";
  editMessage.style.cssText = "transform: translateY(10%);";
  levelsGame.style.display = "none";
  name1.style.cssText = "background-color:white; color:black;";

  //////////////////////////////end button////////////////
  end.onclick = function () {
    this.style.display = "none";
    input1.style.display = "none";
    upcomingWordsArabic.style.display = "none";
    add.style.display = "none";
    remove.style.display = "none";
    removeAll.style.display = "none";
    controls.style.display = "none";
    upcomingWords.style.display = "none";
    input.style.display = "none";
    editMode.style.cssText = "opacity:1; cursor:pointer;";
    editMode.textContent = "Edit Mode";
    game.style.cssText = "background-color:#eee;";
    levelsGame.style.display = "flex";
    startButton.style.display = "block";
    messageTop.style.display = "block";
    name1.style.cssText = "background-color:#2196f3; color:white;";
    editMessage.style.cssText = "transform: translateY(1000%);";
    editMessage.textContent = "YOU ARE IN EDITING MODE";
    this.style.cssText = "display:block";
  };
};

/////////////////////////refresh/////////////////
function refresh() {
  input1.value = "";
  upcomingWordsArabic.textContent = "";
  scoreTotalSpan.textContent = words.length;
  for (let i = 0; i < words.length; i++) {
    let upcomingWordsDivs = document.createElement("div");
    let upcomingWordsDivsContent = document.createTextNode(words[i]);
    upcomingWordsDivs.appendChild(upcomingWordsDivsContent);
    upcomingWordsArabic.appendChild(upcomingWordsDivs);
  }
}
///////////////////////////////////////////////
//add to array
function addDataToArray(word) {
  words.push(word);
  addDataToLocalStorageFrom(words);
}

///////////////////////local storage///////////////////////
//check if there is data word
if (localStorage.getItem("words")) {
  words = JSON.parse(localStorage.getItem("words"));
}

// add data to local storage from array
function addDataToLocalStorageFrom(words) {
  window.localStorage.setItem("words", JSON.stringify(words));
}

// get data from local storage
function getDataFromLocalStorage() {
  let data = window.localStorage.getItem("words");
  if (data) {
    let words = JSON.parse(data);
    refresh();
    addTaskToPageFrom(words);
  }
}

// add to page
function addTaskToPageFrom(words) {
  // empty array
  words.innerHTML = "";
  // looping on array
  words.forEach((word) => {
    return word;
  });
}

// clear
function clearLocalStorage() {
  upcomingWords.textContent = "";
  upcomingWordsArabic.textContent = "";
  window.localStorage.clear();
}
// delete one item
// function deleteFromLocalStorage() {

//   }

// trigger

addDataToLocalStorageFrom(words);
getDataFromLocalStorage();
addTaskToPageFrom(words);



class Pitch {

    currentAnswerText = "";
    answerLength;
    alreadyAnswered = [];

    constructor(pitch, audioFile, noteOrInterval) {
        this.pitch = pitch;
        this.audioFile = audioFile;
        this.answerLength = 1;
        this.noteOrInterval = noteOrInterval;
    }

    displayQuestion() {
        document.getElementById("question").innerText = `What is this ${this.noteOrInterval}?`;
    }

    checkAnswer(index, input) {
        let currentElement = document.getElementById("a" + index.toString())
        if (input == "#" || input == "b") {
            currentElement.innerText = currentElement.innerText + input;
            
        } else {
            document.getElementById("a" + index.toString()).innerText = input;
        }

        this.currentAnswerText = currentElement.innerText;

        let colour = "red";
        if (!this.checkAlreadyAdded(this.currentAnswerText) && this.isCorrect(this.currentAnswerText)) {
            colour = "green";
            this.alreadyAnswered.push(this.currentAnswerText);
        }
        document.getElementById("a" + index.toString()).style.backgroundColor = colour;

        if (colour == "red") {
            return false;
        } else {
            return true;
        }
    }

    isCorrect(input) {
        let isCorrect = false;
        if (input === this.pitch) {
            isCorrect = true;
        }
        return isCorrect;
    }

    checkAlreadyAdded(input) {
        let answeredAlready = false;

        this.alreadyAnswered.forEach((el) => {
            if (input == el) {
                answeredAlready = true;
            }
            
        });
    
        return answeredAlready;
    }

    refreshAlreadyAnswered() {
        this.alreadyAnswered = [];
    }

}


// Hides all elements above the provided len
function hideUnusedElements(len) {
    for (let i = len + 1; i < 8; i++) {
        document.getElementById("a" + i.toString()).hidden = true;
    }
}

function refreshElements() {
    for (let i = 1; i < 8; i++) {
        let currentElement = document.getElementById("a" + i.toString());
        currentElement.hidden = false;
        currentElement.innerText = "";
        currentElement.style.backgroundColor = "white";
        answerIndex = 1;
    }
}


function addAnswer(note) {
    if (currentQuestion == "" || answerIndex == numberOfPitches) {
        return;
    }
    let result = currentQuestion.checkAnswer(answerIndex, note);
    if (result) {
        if (answerIndex == currentQuestion.answerLength) {

            lessonCount += 1;
            let plural = "";
            if (lessonCount > 1) {
                plural = "s"
            }
            document.getElementById("question").innerText = `Correct! ${lessonCount} lesson${plural} done`;

        }
        answerIndex += 1;
    }
    
    
}

function backSpace(i) {
    if (i == answerIndex) {
        const pressed = document.getElementById("a" + i.toString());
        pressed.innerText = "";
        pressed.style.backgroundColor = "white";
    }
    
}

// Main VARIABLES Here
const gNote = new Pitch("G", "./assets/lowG.mp3", "note");
const fNote = new Pitch("F", "./assets/lowF.mp3", "note");
const eNote = new Pitch("E", "./assets/lowE.mp3", "note");
const dNote = new Pitch("D", "./assets/lowD.mp3", "note");
const cNote = new Pitch("C", "./assets/lowC.mp3", "note");
const bNote = new Pitch("B", "./assets/bStr.mp3", "note");
const aNote = new Pitch("A", "./assets/aStr.mp3", "note");

const a2Note = new Pitch("A", "./assets/a2.mp3", "note");
const b2Note = new Pitch("B", "./assets/lowB.mp3", "note");
const c2Note = new Pitch("C", "./assets/c2.mp3", "note");
const d2Note = new Pitch("D", "./assets/dStr.mp3", "note");
const e2Note = new Pitch("E", "./assets/eStr.mp3", "note");
const f2Note = new Pitch("F", "./assets/f2.mp3", "note");
const g2Note = new Pitch("G", "./assets/gStr.mp3", "note");

const secUp = new Pitch("2nd", "./assets/2ndUp.mp3", "interval");
const secDown = new Pitch("2nd", "./assets/2ndDown.mp3", "interval");
const thirdUp = new Pitch("3rd", "./assets/3rdUp.mp3", "interval");
const thirdDown = new Pitch("3rd", "./assets/3rdDown.mp3", "interval");
const fourthUp = new Pitch("4th", "./assets/4thUp.mp3", "interval");
const fourthDown = new Pitch("4th", "./assets/4thDown.mp3", "interval");
const fifthUp = new Pitch("5th", "./assets/5thUp.mp3", "interval");
const fifthDown = new Pitch("5th", "./assets/5thDown.mp3", "interval");









// Current Question is being used to asign a class instance to.
let currentQuestion = "";

// Answer index isn't necessary for flashcards page as it will always be one.
let answerIndex = 1;

let lessonCount = 0;




const pitches = [
    aNote, bNote, cNote, dNote, eNote, fNote, gNote, a2Note, b2Note, c2Note,
    d2Note, e2Note, f2Note, g2Note, secUp, secDown, thirdDown, thirdUp, fourthDown, fourthUp,
    fifthDown, fifthUp
                    ];
const numberOfPitches = pitches.length;

let currentAudio = new Audio();
// Main Runtime Logic Here
function getQuestion() {
    const nextButton = document.getElementById("nextButton");
    if (currentQuestion != "") {
        currentQuestion.refreshAlreadyAnswered();
    }
    
    currentQuestion = pitches[getRandomInt(numberOfPitches)];

    if (!currentAudio.paused) {
        currentAudio.pause();
    }
    currentAudio.src = currentQuestion.audioFile;
    currentAudio.play();

    refreshElements();

    currentQuestion.displayQuestion();
    hideUnusedElements(currentQuestion.answerLength);


    
    if (nextButton.innerText == "Get Question") {
        nextButton.innerText = "Next Question";
    }

}

function replayAudio() {
    if (currentAudio.src === "") {
        return;
    }
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio.play();
}

// None inclusive of max : for 3 can be 0, 1 and 2
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


 


function showInfo() {
    const el = document.getElementById("question");
    const infoText = "Listen to the note or interval and try to get the right answer!\n\nInterval Info: A 2nd interval is going up or down by 1 note or step in a scale, a 3rd interval is going up or down by 2 steps, a 4th by 3 and a 5th by 4.\nEx: Going from C to G is a fifth, and going from C to E is a third.\nThe intervals you'll be listening to are called melodic intervals because they are played one after the other instead of held at the same time (harmonic intervals).";
    if (el.innerText == infoText && currentQuestion != "") {
        currentQuestion.displayQuestion();
    } else if (el.innerText == infoText) {
        el.innerText = "";
    } else {
        el.innerText = infoText;
    }
}

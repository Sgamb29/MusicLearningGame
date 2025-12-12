
class GuitarString {
    currentAnswerText = "";
    randomNote = "";
    fretNumberForNote = 0;

    constructor(stringName, notes) {
        this.stringName = stringName;
        this.notes = notes;
    }

    displayQuestion() {
        if (this.randomNote == "") {
            return;
        }

        document.getElementById("question").innerText = `Name the note on fret ${this.fretNumberForNote} of the ${this.stringName} string`;
    }

    checkAnswer(index, input) {
        let currentElement = document.getElementById("a" + index.toString())
        if (input == "#") {
            currentElement.innerText = currentElement.innerText + input;
        } else {
            document.getElementById("a" + index.toString()).innerText = input;
        }

        this.currentAnswerText = currentElement.innerText;
        let colour = "red";
        if (this.currentAnswerText == this.randomNote) {
            colour = "green";
        }
        document.getElementById("a" + index.toString()).style.backgroundColor = colour;
        if (colour == "red") {
            return false;
        } else {
            return true;
        }
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
    if (currentQuestion == "") {
        return;
    }
    let result = currentQuestion.checkAnswer(answerIndex, note);
    if (result) {
        lessonCount += 1;
        let plural = "";
        if (lessonCount > 1) {
            plural = "s"
        }
        document.getElementById("question").innerText = `Correct! ${lessonCount} card${plural} done`;
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
const lowEString = new GuitarString("Low E", ["F", "F#", "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#", "E"]);
const aString = new GuitarString("A", ["A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A"]);
const dString = new GuitarString("D", ["D#", "E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#", "D"]);
const gString = new GuitarString("G", ["G#", "A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G"]);
const bString = new GuitarString("B", ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]);
const eString = new GuitarString("high e", ["F", "F#", "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#", "E"]);

// Current Question is being used to asign a class instance to.
let currentQuestion = "";

// Answer index isn't necessary for flashcards page as it will always be one.
let answerIndex = 1;
let lessonCount = 0;

const strings = [lowEString, aString, dString, gString, bString, eString];
const numberOfStrings = strings.length;
let pastQuestions = [];

function isInPastQuestions(current) {
    let isIn = false;
    pastQuestions.forEach((q) => {
        if (current === q) {
            isIn = true;
        }
    });
    return isIn;
}

/* 
    Main Runtime Logic Here
    Set current question & try to add variety with past questions list.
*/
function setRandomQuestion() {
    currentQuestion = strings[getRandomInt(numberOfStrings)];
    const randomNoteIndex = getRandomInt(currentQuestion.notes.length);
    currentQuestion.randomNote = currentQuestion.notes[randomNoteIndex];
    currentQuestion.fretNumberForNote = randomNoteIndex + 1;
}

function getQuestion() {
    const nextButton = document.getElementById("nextButton");
    setRandomQuestion();
    let count = 0;
    while(isInPastQuestions(currentQuestion.randomNote)) {
        setRandomQuestion();
        count += 1;
        if (count >= 20) {
            pastQuestions = [];
        }
    }
    refreshElements();
    currentQuestion.displayQuestion();
    pastQuestions.push(currentQuestion.randomNote);
    hideUnusedElements(1);
    if (nextButton.innerText == "Get Question") {
        nextButton.innerText = "Next Question";
    }
}

// Not inclusive of max : for 3 can be 0, 1 and 2
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function showInfo() {
    const el = document.getElementById("question");
    const infoText = "The open string notes from low E (thickest string) to high e (thinest string) are E A D G B e.\nFor every consecutive fret on a string the note you are playing goes up by a 'half step'. A half step up of every note, except B and E goes to a sharp: '#'. So G goes up a half step to G# and A goes up a half step to A#, but B goes up a half step right to C and E goes up a half step right to F.\nAfter G# the notes start again from A, and that's how you count frets to find out what note you are on!\n"
    if (el.innerText == infoText && currentQuestion != "") {
        currentQuestion.displayQuestion();
    } else if (el.innerText == infoText) {
        el.innerText = "Flashcards will appear here.";
    } else {
        el.innerText = infoText;
    }
}

class MajorScale {
    currentAnswerText = "";
    answerLength;
    alreadyAnswered = [];

    constructor(scaleName, notes, sharpsOrFlats) {
        this.scaleName = scaleName;
        this.notes = notes;
        this.answerLength = notes.length;
        this.sharpsOrFlats = sharpsOrFlats;
    }

    displayQuestion() {
        document.getElementById("question").innerText = `Name the ${this.sharpsOrFlats} in the ${this.scaleName} Major scale.`;
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
        this.notes.forEach((i) => {
            if (input == i) {
                isCorrect = true;
            } 
         });
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
    if (currentQuestion == "" || answerIndex == currentQuestion.answerLength + 1) {
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

const gMajScale = new MajorScale("G", ["F#"], "sharps");
const dMajScale = new MajorScale("D", ["F#", "C#"], "sharps");
const aMajScale = new MajorScale("A", ["F#", "C#", "G#"], "sharps");
const eMajScale = new MajorScale("E", ["F#", "C#", "G#", "D#"], "sharps");
const bMajScale = new MajorScale("B", ["F#", "C#", "G#", "D#", "A#"], "sharps");
const fSharpMajScale = new MajorScale("F#", ["F#", "C#", "G#", "D#", "A#", "E#"], "sharps");
const cSharpMajScale = new MajorScale("C#", ["F#", "C#", "G#", "D#", "A#", "E#", "B#"], "sharps");

const cMajorScale = new MajorScale("C", ["C", "D", "E", "F", "G", "A", "B"], "notes");

const fMajorScale = new MajorScale("F", ["Bb"], "flats");
const bFlatMajorScale = new MajorScale("Bb", ["Bb", "Eb"], "flats");
const eFlatMajorScale = new MajorScale("Eb", ["Bb", "Eb", "Ab"], "flats");
const aFlatMajorScale = new MajorScale("Ab", ["Bb", "Eb", "Ab", "Db"], "flats");
const dFlatMajorScale = new MajorScale("Db", ["Bb", "Eb", "Ab", "Db", "Gb"], "flats");
const gFlatMajorScale = new MajorScale("Gb", ["Bb", "Eb", "Ab", "Db", "Gb", "Cb"], "flats");
const cFlatMajorScale = new MajorScale("Cb", ["Bb", "Eb" ,"Ab", "Db" ,"Gb", "Cb", "Fb"], "flats");


// Current Question is being used to asign a class instance to.
let currentQuestion = "";

// Answer index isn't necessary for flashcards page as it will always be one.
let answerIndex = 1;

let lessonCount = 0;

const majorScales = [gMajScale, dMajScale, aMajScale, eMajScale, bMajScale, fSharpMajScale, cSharpMajScale,
                    cMajorScale, fMajorScale, bFlatMajorScale, eFlatMajorScale, aFlatMajorScale, dFlatMajorScale,
                    gFlatMajorScale, cFlatMajorScale ];
const numberOfMajorScales = majorScales.length;

const naturalMajors = [cMajorScale, gMajScale, fMajorScale,  aMajScale, eMajScale, dMajScale, bMajScale];
const numNatMajors = naturalMajors.length;

let SCALES = naturalMajors;
let LENSCALES = numNatMajors;

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

// Main Runtime Logic Here
function getQuestion() {
    const nextButton = document.getElementById("nextButton");
    if (currentQuestion != "") {
        currentQuestion.refreshAlreadyAnswered();
    }
    currentQuestion = SCALES[getRandomInt(LENSCALES)];
    let count = 0;
    while (isInPastQuestions(currentQuestion)) {
        currentQuestion = SCALES[getRandomInt(LENSCALES)];
        count += 1;
        if (count >= 20) {
            pastQuestions = [];
        }
    }
    refreshElements();
    currentQuestion.displayQuestion();
    pastQuestions.push(currentQuestion);
    hideUnusedElements(currentQuestion.answerLength);
    
    if (nextButton.innerText == "Get Question") {
        nextButton.innerText = "Next Question";
    }
}

function toggleScales() {
    const btn = document.getElementById("toggleScalesButton");
    if (LENSCALES === numNatMajors) {
        SCALES = majorScales;
        LENSCALES = numberOfMajorScales;
        btn.style.backgroundColor = "green";
    } else {
        SCALES = naturalMajors;
        LENSCALES = numNatMajors;
        btn.style.backgroundColor = "white";
    }

}

// None inclusive of max : for 3 can be 0, 1 and 2
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function showInfo() {
    const el = document.getElementById("question");
    document.getElementById("hideInfoBtn").hidden = !document.getElementById("hideInfoBtn").hidden;
    const infoText = "NOTE: The C Major Scale Has No Sharps or Flats!\n\nUsing The Circle of Fifths To Know What Sharps or Flats are In a Major Scale:\nA couple phrases for memorizing the sharps, the first one is:\n\nGoes Down And Ends Battles Father Charles\n\nThe above phrase is for remembering the NUMBER of sharps in a scale (the scale is the first letter in each word). For example 'Goes' is the first word so there is 1 sharp in the G major scale. 'And' is the third word so A major has 3 sharps! IMPORTANT: The last two words: 'Father' and 'Charles' stand for the scales F# Major and C# Major not F and C natural.\nWhat you do next is use the second phrase to figure out what those sharps are:\n\nFather Charles Goes Down And Ends Battles\n\nSo we know that A major has 3 sharps so we use the 1st 3 words in the SECOND phrase, and the first letter of each word will be the sharps. So for A Major: 'Father Charles Goes', A major has an F#, a C# and a G#.\n\nNOW for the flats there are 2 more phrases that work the EXACT same way. To count the NUMBER of flats in the scale use:\n\nFather's Battle Ends And Down Goes Charles\n\nIMPORTANT: The first word (first letter) in this phrase is the only natural scale the rest are flat scales. So for F Major (first word 'Father's') it has 1 flat. The second phrase for flats:\n\nBattle Ends And Down Goes Charles' Father\n\nSo we know F Major has one flat so that flat is a B flat ('battle'). The E flat scale would be the 3rd word in the FIRST FLAT phrase 'Ends' so the E flat major scale has a Bb, Eb and an Ab. TIP: Another way to remember which flats there are in the scale is to remember B-E-A-D or BEAD and then GCF.\n";
    if (el.innerText == infoText && currentQuestion != "") {
        currentQuestion.displayQuestion();
    } else if (el.innerText == infoText) {
        el.innerText = "Questions for the Major Scales will appear here.";
    } else {
        el.innerText = infoText;
    }
}
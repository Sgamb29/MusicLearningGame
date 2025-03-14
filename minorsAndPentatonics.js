
class MajorScale {

    currentAnswerText = "";
    answerLength;
    alreadyAnswered = [];

    constructor(scaleName, notes, sharpsOrFlats) {
        this.scaleName = scaleName;
        this.notes = notes;
        // Changed answer length for just finding natural minor.
        this.answerLength = 1;
        this.sharpsOrFlats = sharpsOrFlats;
        if (this.sharpsOrFlats === "penta") {
            this.answerLength = 2;
        }
    }

    displayQuestion() {
        if (this.sharpsOrFlats === "penta") {
            let majorOrMinor = this.scaleName === "minP" ? "minor" : "major";
            document.getElementById("question").innerText = `Which scale degrees do you remove for the ${majorOrMinor} pentatonic scale?`;
            return;
        }   
        document.getElementById("question").innerText = `What is the natural minor of the ${this.scaleName} Major scale?`;
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
        this.notes.forEach((n) => {
            if (input === n) {
                isCorrect = true;
            }
        })
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
    if (currentQuestion == "" || answerIndex == numberOfMajorScales) {
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
// Changed the notes in the scale to just be the natural minor for that scale.
const gMajScale = new MajorScale("G", ["E"], "sharps");
const dMajScale = new MajorScale("D", ["B"], "sharps");
const aMajScale = new MajorScale("A", ["F#", "Gb"], "sharps");
const eMajScale = new MajorScale("E", ["C#", "Db"], "sharps");
const bMajScale = new MajorScale("B", ["G#", "Ab"], "sharps");
const fSharpMajScale = new MajorScale("F#", ["D#", "Eb"], "sharps");
const cSharpMajScale = new MajorScale("C#", ["A#", "Bb"], "sharps");

const cMajorScale = new MajorScale("C", ["A"], "notes");

const fMajorScale = new MajorScale("F", ["D"], "flats");
const bFlatMajorScale = new MajorScale("Bb", ["G"], "flats");
const eFlatMajorScale = new MajorScale("Eb", ["C"], "flats");
const aFlatMajorScale = new MajorScale("Ab", ["F"], "flats");

// Doing a hack to add a couple pentatonic questions.
const majorPentatonic = new MajorScale("majP", ["4th", "7th"], "penta");
const minorPentatonic = new MajorScale("minP", ["2nd", "6th"], "penta");


// Duplicate scales
// const dFlatMajorScale = new MajorScale("Db", ["A#", "Bb"], "flats");
// const gFlatMajorScale = new MajorScale("Gb", ["Bb", "Eb", "Ab", "Db", "Gb", "Cb"], "flats");
// const cFlatMajorScale = new MajorScale("Cb", ["Bb", "Eb" ,"Ab", "Db" ,"Gb", "Cb", "Fb"], "flats");










// Current Question is being used to asign a class instance to.
let currentQuestion = "";

// Answer index isn't necessary for flashcards page as it will always be one.
let answerIndex = 1;

let lessonCount = 0;




const majorScales = [gMajScale, dMajScale, aMajScale, eMajScale, bMajScale, fSharpMajScale, cSharpMajScale,
                    cMajorScale, fMajorScale, bFlatMajorScale, eFlatMajorScale, aFlatMajorScale, minorPentatonic, majorPentatonic 
                    ];
const numberOfMajorScales = majorScales.length;

// Main Runtime Logic Here

function getQuestion() {
    const nextButton = document.getElementById("nextButton");
    if (currentQuestion != "") {
        currentQuestion.refreshAlreadyAnswered();
    }
    
    currentQuestion = majorScales[getRandomInt(numberOfMajorScales)];

    refreshElements();

    currentQuestion.displayQuestion();
    hideUnusedElements(currentQuestion.answerLength);


    
    if (nextButton.innerText == "Get Question") {
        nextButton.innerText = "Next Question";
    }

}

// None inclusive of max : for 3 can be 0, 1 and 2
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


 


function showInfo() {
    const el = document.getElementById("question");
    const infoText = "Natural Minor Scales: This scale starts on the 6th note of a major scale, and has the same notes as that major scale.\nEx: In C Major the natural minor (also called Aeolian mode) is A minor. The A minor scale has all the same notes as C major except you're starting on the A note. Ex: The natural minor of D major is B minor because B minor is the 6th note in D major (also called the 6th scale degree).\nSo if you know some major scales you already know a lot of minor scales as well!\nQuick way to find the natural minor: Go back a half step and a whole step from the root of the major scale. (It helps to visualize it on the instrument)\n\n\nPentatonic Scales: The pentatonic scales only have 5 notes instead of seven. In the major pentatonic you simply remove 4th and 7th notes of the major scale and for the minor pentatonic you remove the 2nd and 6th notes from that minor scale!\n\nBlues Scales: For a major blues scale you take the major pentatonic scale and add a flattened 3rd note of the major scale as a blue note. Ex: The C major pentatonic has C-D-E-G-A and you would add a E flat. For the A minor blues scale you take the minor pentatonic scale and add a flattened 5th note.\nEx: A minor pentatonic has A-C-D-E-G and you would add an Eb again (the 5th note of A minor).";
    if (el.innerText == infoText && currentQuestion != "") {
        currentQuestion.displayQuestion();
    } else if (el.innerText == infoText) {
        el.innerText = "";
    } else {
        el.innerText = infoText;
    }
}


class Guitar {
    num_strings = 6;

    fretboard =  {
        "E": ["E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#", "E"],
        "A": ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A"],
        "D": ["D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#", "D"],
        "G": ["G", "G#", "A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G"],
        "B": ["B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"],
        "e": ["E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#", "E"],
    }

    positions = {
        "0": [],
        "3": [],
        "5": [],
        "7": [],
        "10": [],
    }

    loadPositions() {
        Object.keys(this.positions).forEach((p) => {
            Object.keys(this.fretboard).forEach((f) => {
                this.positions[p].push(this.fretboard[f][parseInt(p)]);
            })
        })
    }
}

class Question {
    currentAnswerText = "";
    correctAmount = 0;
    answerlength = 0;

    constructor(question, answers) {
        this.question = question;
        this.answers = answers;
        this.answerlength = answers.length;
    }

    displayQuestion() {
        document.getElementById("question").innerText = this.question;
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
        if (this.currentAnswerText == this.answers[index - 1]) {
            colour = "green";
        }
        document.getElementById("a" + index.toString()).style.backgroundColor = colour;

        if (colour == "red") {
            return false;
        } else {
            this.correctAmount += 1;
            return true;
        }
    }

    checkForSuccess() {
        if (this.correctAmount == this.answerlength) {
            lessonCompleteCount += 1;
            let isPlural = " Lesson";
            if (lessonCompleteCount > 1) {
                isPlural = " Lessons";
            }
            document.getElementById("question").innerText = "Lesson Success! " + lessonCompleteCount.toString() + isPlural + " Done.";
            return true;
        }
        return false;
    }

    resetQuestionProgress() {
        this.currentAnswerText = "";
        this.correctAmount = 0;
    }

}

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
    currentQuestion.currentAnswerText = currentQuestion.currentAnswerText + note;
    let result = currentQuestion.checkAnswer(answerIndex, note);
    if (result) {
        answerIndex += 1;
    }
    let isDone = currentQuestion.checkForSuccess();
}

function backSpace(i) {
    if (i == answerIndex) {
        const pressed = document.getElementById("a" + i.toString());
        pressed.innerText = "";
        pressed.style.backgroundColor = "white";
    }
}

// Main VARIABLES Here
const guitar = new Guitar();
guitar.loadPositions();

const positionsPrefix = "From the low E string to the high e string, name all the "

const allStringsFret0 = new Question(positionsPrefix + "open notes.", guitar.positions["0"]);
const allStringsFret3 = new Question(positionsPrefix + "notes on the 3rd fret.", guitar.positions["3"]);
const allStringsFret5 = new Question(positionsPrefix + "notes on the 5th fret.", guitar.positions["5"]);
const allStringsFret7 = new Question(positionsPrefix + "notes on the 7th fret.", guitar.positions["7"]);
const allStringsFret9 = new Question(positionsPrefix + "notes on the 10th fret.", guitar.positions["10"]);


let currentQuestion = "";

// Used to get the right element for current question progress
let answerIndex = 1;

let questions = [
        allStringsFret0, allStringsFret9, allStringsFret7, allStringsFret5, allStringsFret3
                ];
let numberOfQuestions = questions.length;
let currentQuestionIndex = 0;

let lessonCompleteCount = 0;

// Main Runtime Logic Here
function getQuestion() {
    if (currentQuestion != "") {
        currentQuestion.resetQuestionProgress();
    }
    currentQuestionIndex = getRandomInt(numberOfQuestions);
    setUpQuestion();
}

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

function setUpQuestion() {
    refreshElements();
    currentQuestion = questions[currentQuestionIndex];
    // Get different question if already answered.
    let count = 0;
    while (isInPastQuestions(currentQuestion)) {
        currentQuestionIndex = getRandomInt(numberOfQuestions);
        currentQuestion = questions[currentQuestionIndex];
        count += 1;
        // clear past questions because it's full
        if (count >= 20) {
            pastQuestions = [];
        }
    }
    pastQuestions.push(currentQuestion);
    currentQuestion.displayQuestion();
    hideUnusedElements(currentQuestion.answerlength);
}

function showInfo() {
    const el = document.getElementById("question");
    const infoText = "The open string notes from low E (thickest string) to high e (thinest string) are E A D G B e.\nFor every consecutive fret on a string the note you are playing goes up by a 'half step'. A half step up of every note, except B and E goes to a sharp: '#'. So G goes up a half step to G# and A goes up a half step to A#, but B goes up a half step right to C and E goes up a half step right to F.\nAfter G# the notes start again from A, and that's how you count frets to find out what note you are on!\n"
    if (el.innerText == infoText && currentQuestion != "") {
        currentQuestion.displayQuestion();
    } else if (el.innerText == infoText) {
        el.innerText = "Questions will appear here.";
    } else {
        el.innerText = infoText;
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

// Traffic
const fetchKey = "lastFetch";
let toFetch = true;
const now = new Date();
const dotw = now.getDay();
const lastFetch = localStorage.getItem(fetchKey);
toFetch = dotw.toString() !== lastFetch;

if (toFetch) {
    const request = new Request("https://server.sgambapps.com/?site=musicGame", {
        method: "POST",
    });

    fetch(request)
    .then(res => {
        if (res.ok) {
        console.log("visit counted");
        }
    })
    .catch(err => console.log(err));
    localStorage.setItem(fetchKey, dotw.toString());
}
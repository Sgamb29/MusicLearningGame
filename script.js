



class Question {

    currentAnswerText = "";
    correctAmount = 0;

    constructor(question, answers, answerlength) {
        this.question = question;
        this.answers = answers;
        this.answerlength = answerlength;
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


const lowE03579 = new Question("Name the Low E String Notes from Frets Open, 3, 5, 7, and 9.", ["E", "G", "A", "B", "C#"], 5);
const A03579 = new Question("Name the A String Notes from Frets Open, 3, 5, 7, and 9.", ["A", "C", "D", "E", "F#"], 5);
const D03579 = new Question("Name the D String Notes from Frets Open, 3, 5, 7, and 9.", ["D", "F", "G", "A", "B"], 5);
const G03579 = new Question("Name the G String Notes from Frets Open, 3, 5, 7, and 9.", ["G", "A#", "C", "D", "E"], 5);
const B03579 = new Question("Name the B String Notes from Frets Open, 3, 5, 7, and 9.", ["B", "D", "E", "F#", "G#"], 5);
const e03579 = new Question("Name the high E String Notes from Frets Open, 3, 5, 7, and 9.", ["E", "G", "A", "B", "C#"], 5);


const lowE246810 = new Question("Name The Low E String Notes from Frets 2, 4, 6, 8, and 10.", ["F#", "G#", "A#", "C", "D"], 5);
const A246810 = new Question("Name the A String Notes from Frets 2, 4, 6, 8, 10", ["B", "C#", "D#", "F", "G"], 5);
const D246810 = new Question("Name the D String Notes from Frets 2, 4, 6, 8, 10", ["E", "F#", "G#", "A#", "C"], 5);
const G246810 = new Question("Name the G String Notes from Frets 2, 4, 6, 8, 10", ["A", "B", "C#", "D#", "F"], 5);
const B246810 = new Question("Name the B String Notes from Frets 2, 4, 6, 8, 10", ["C#", "D#", "F", "G", "A"], 5);
const e246810 = new Question("Name the high E String Notes from Frets 2, 4, 6, 8, 10", ["F#", "G#", "A#", "C", "D"], 5);

const allStringsFret3 = new Question("From the low E string to the high e string, name all the notes on the 3rd fret.", ["G", "C", "F", "A#", "D", "G"], 6);
const allStringsFret5 = new Question("From the low E string to the high e string, name all the notes on the 5th fret.", ["A", "D", "G", "C", "E", "A"], 6);
const allStringsFret7 = new Question("From the low E string to the high e string, name all the notes on the 7th fret.", ["B", "E", "A", "D", "F#", "B"], 6);
const allStringsFret9 = new Question("From the low E string to the high e string, name all the notes on the 9th fret.", ["C#", "F#", "B", "E", "G#", "C#"], 6);







let currentQuestion = "";

// Used to get the right element for current question progress
let answerIndex = 1;



let questions = [lowE03579, A03579, D03579, G03579, B03579, e03579, lowE246810, A246810, D246810, G246810, B246810, e246810,
                allStringsFret9, allStringsFret7, allStringsFret5, allStringsFret3
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

function setUpQuestion() {
    refreshElements();
    currentQuestion = questions[currentQuestionIndex];
    currentQuestion.displayQuestion();
    hideUnusedElements(currentQuestion.answerlength);
}



function showInfo() {
    const el = document.getElementById("question");
    const infoText = "Info: The notes of the open strings from the low E (thickest string) to the high e (thinest string) are E A D G B e.\nFor every consecutive fret on a string the note you are playing goes up by a 'half step'. A half step up of every note except B and E goes to a sharp: '#'. So G goes up a half step to G# and A goes up a half step to A#, but B goes up a half step right to C and E goes up a half step right to F.\nWhen you get to G# the notes start again from A, and that's how you can count frets to find out what note you are on!\nWith enough practice you will start remembering what notes are on what frets, making it easier to play scales, find chords, etc!"
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
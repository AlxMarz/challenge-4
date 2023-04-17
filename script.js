const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement =document.getElementById ('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement  = document.getElementById('answer-buttons')
let shuffledQuestions, currentQuestionIndex
var timerEl = document.querySelector("#timer")
var doneEl = document.querySelector('#done')
var clearButton = document.querySelector("#clear")



var scoreEl = document.querySelector("#score")

var backButton  = document.querySelector("#back")
var nameInput = document.querySelector("#name")
var userScores = document.querySelector("#userScores")
var doneEl = document.querySelector('#done')
var userScoreEl = document.querySelector("#userScores")
var highScoresWl = document.querySelector("#highScores")
var finalScore = 0
var submitButton = document.querySelector("#submit")

var timer = 75

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame(){
    console.log('start button has been pressed');
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(()  => Math.random() - .5 )
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
    
    timer = 75
    time()

}

function setNextQuestion(){
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question){
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}
function resetState(){
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild){
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e){
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if(shuffledQuestions.length > currentQuestionIndex + 1){
        nextButton.classList.remove('hide') 
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
        toggleDone()
    }
}

function setStatusClass(element, correct){
    clearStatusClass(element)
    if (correct){
        element.classList.add('correct')
        var correctTime = 1
        var timerInterval = setInterval(function() {
            correctTime--
            if(correctTime == 0){
                clearInterval(timerInterval)
            }
        
        }, 1000)
    } else {
        element.classList.add('wrong')

    }
}

function clearStatusClass(element){
    element.classList.remove('correct')
    element.classList.remove('wrong')

}


const questions = [
    {
        question: 'Commonly used data types DO NOT include',
        answers: [
            { text: 'Strings', correct: false },
            { text: 'booleans', correct: false },
            { text: 'alerts', correct: true },
            { text: 'numbers', correct: false }


        ]
    },
    {
        question: 'The condition in an if/else statement is enclose within ____.',
        answers: [
            { text: 'quotes', correct: false },
            { text: 'curly brackets', correct: false },
            { text: 'parentheses', correct: true },
            { text: 'square brackets', correct: false }
        ]

    },
    {
        question: 'Arrays in JavaScript can be used to store _____.',
        answers: [
            { text: 'numbers and strings', correct: false },
            { text: 'other arrays', correct: false },
            { text: 'booleans', correct: false },
            { text: 'all of the above', correct: true }
        ]

    },
    {
        question: 'String values must be enclosed within _______ when being assigned to variables.',
        answers: [
            { text: 'square brackets', correct: true},
            { text: 'parentheses', correct: false },
            { text: 'curly brackets', correct: false },
            { text: 'commas', correct: false }
        ]

    },
]

function time(){
    // timer = 75
    console.log(timer)
    var timerInterval = setInterval(function() {
        timer--
        timerEl.textContent = "Time: " + timer
        
        if(timer == 0){
            clearInterval(timerInterval)
            toggleDone()
        }
    
    }, 1000)
}


function toggleDone() {
    // Toggles the done element
    // Displays user score
    if(doneEl.style.display == "none"){
        doneEl.style.display = "block"
        userScoreEl.textContent = "Your final score " + finalScore
    }
    else{
        doneEl.style.display = "none"

    }
}


function toggleScore() {

    // Toggles the score element, Displays top scores
    while (userScores.lastElementChild) {
        userScores.removeChild(userScores.lastElementChild);
      }
    if(scoreEl.style.display == "none"){
        scoreEl.style.display = "block"

        Object.keys(localStorage).forEach(element => {
            var user = document.createElement("li")
            user.textContent = element + " - " +localStorage.getItem(element)
            user.setAttribute('class', "bg-secondary text-white p-1 mb-2")
            userScores.appendChild(user)
            // console.log(element, element.value )
            
        });

    }
    else{
        scoreEl.style.display = "none"

    }
}


submitButton.addEventListener("click", function(){
    toggleDone()
    var name = nameInput.value.trim()
    localStorage.setItem(name, timer)
    toggleScore()

})

clearButton.addEventListener("click", function(){
    localStorage.clear()

    while(userScores.lastElementChild){
        userScores.removeChild(userScores.lastElementChild)
    }

    toggleScore()
    toggleScore()
})

// Shows high scores
highScoresWl.addEventListener("click", function(){
    toggleScore()

})

// Returns user to home screen
backButton.addEventListener("click", function(){
    toggleScore()
    resetState()
    timerEl.textContent = "Time: 75"
})
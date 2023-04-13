const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement =document.getElementById ('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement  = document.getElementById('answer-buttons')
let shuffledQuestions, currentQuestionIndex

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
    }
}

function setStatusClass(element, correct){
    clearStatusClass(element)
    if (correct){
        element.classList.add('correct')
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
            toggleQuiz()
            toggleDone()
        }
    
    }, 1000)
}


//   https://repl.it/@bsameera/QuizApp

'use strict';

const STORE = [
  {
    id: 0,
    question: 'What is the most common command thought to dogs?',
    ans1: 'Dance',
    ans2: 'Sit',
    ans3: 'Stay',
    ans4: 'Stand',
    correctAnswer: 'Sit'
  },
  {
    id: 1,
    question: 'How many teeth does a normal adult dog have?',
    ans1: '24',
    ans2: '38',
    ans3: '42',
    ans4: '32',
    correctAnswer: '42'
  },
  {
    id: 2,
    question: 'Through which part of the body do dogs sweat?',
    ans1: 'Mouth',
    ans2: 'Ear',
    ans3: 'Paws',
    ans4: 'Nose',
    correctAnswer: 'Paws'
  },
  {
    id: 3,
    question: "Approximately how many scent receptors do dog's have in their noses?",
    ans1: 'Around 100 million',
    ans2: 'Over 500 million',
    ans3: 'Around 5 million',
    ans4: 'Over 200 million',
    correctAnswer: 'Over 200 million'
  },
  {
    id: 4,
    question: 'What is the favorite dog breed of the Queen of England?',
    ans1: 'Corgi',
    ans2: 'Basenji',
    ans3: 'Poodle',
    ans4: 'Pomeranian',
    correctAnswer: 'Corgi'
  },
  {
    id: 5,
    question: 'Which dog breed is the smallest of all?',
    ans1: 'Dachshund',
    ans2: 'Shih Tzu',
    ans3: 'Pomeranian',
    ans4: 'Chihuahua',
    correctAnswer: 'Chihuahua'
  },
  {
    id: 6,
    question: "Which breed was once known as St.John's Newfoundland?",
    ans1: 'Newfoundland',
    ans2: 'Golden Retriever',
    ans3: 'Labrador',
    ans4: 'Puli',
    correctAnswer: 'Labrador'
  },
  {
    id: 7,
    question: 'Which dog breeds have a black tongue?',
    ans1: 'Husky and Golden Retriver',
    ans2: 'Labrador Retiever and Beagle',
    ans3: 'Weimaraner and Dachshund',
    ans4: 'Chow Chow and Sharpei',
    correctAnswer: 'Chow Chow and Sharpei'
  },
  {
    id: 8,
    question: 'When a puppy is born it is ____?',
    ans1: 'Blind',
    ans2: 'Deaf',
    ans3: 'Toothless',
    ans4: 'All of the above',
    correctAnswer: 'All of the above'
  },
  {
    id: 9,
    question: 'Which is the fastest dog in the world which can reach speeds up to 45 miles per hour?',
    ans1: 'Vizsla',
    ans2: 'Saluki',
    ans3: 'Greyhound',
    ans4: 'Borzoi',
    correctAnswer: 'Greyhound'
  }
];
let score = 0;
let questionNum = 0;

function handleStartButton() {
   $('#start-button').click(function(event) {
     nextQuestion();
   });
}

function nextQuestion() {
  const quesAnsSet = STORE[questionNum];
  const questionNumber = questionNum;

  $('#container').html(questionTemplate(score, quesAnsSet, questionNumber));
}

function questionTemplate(score, quesAnsSet, questionNumber) {
  return `
  <section id="question-page" role="region">
    <header role="banner">
      <h2 id="question">
      ${quesAnsSet.question}</h2>
    </header>
    <form>
      <fieldset>
        <label>
          <input class="answer" type="radio" name="option" checked></input>
          <span>${quesAnsSet.ans1}</span>
        </label>

        <label>
          <input class="answer" type="radio" name="option"></input>
          <span>${quesAnsSet.ans2}</span>
        </label>

        <label>
          <input class="answer" type="radio" name="option"></input>
          <span>${quesAnsSet.ans3}</span>
        </label>

        <label>
          <input class="answer" type="radio" name="option"></input>
          <span>${quesAnsSet.ans4}</span>
        </label>
        <button id="js-submit-button">Submit</button>
      </fieldset>
    </form>
    <footer role="contentinfo" id="status-bar">
      <span id="question-count">Question: ${quesAnsSet.id+1}</span>
      <span id="score-count">Score: ${score}</span>
    </footer>
  </section>
  `;
}

function handleSubmitButton() {
  $('#container').on('click', '#js-submit-button', function(event) {
    const quesAnsSet = STORE[questionNum];
    event.preventDefault();
    let selectedVal = $('input:checked').siblings('span').text();
    console.log(selectedVal);
    console.log(quesAnsSet.correctAnswer)
    if(selectedVal===quesAnsSet.correctAnswer) {
      score++;
      generateCorrectFeedbackPage(questionNum);
    } else {
      generateIncorrectFeedbackPage(questionNum);
    }
  });
}

function handleNextButton() {
  $('#container').on('click', '#js-next-button', function(event) {
    questionNum++;
    if(questionNum <= 9) {
      nextQuestion();
    } else if(questionNum === 10) {
      //for final score and last set of question
      //generate final page
      generateFinalPage();
    }
  });
}

function handleRestartButton() {
  $('#container').on('click', '#js-restart-button', function(event) {
    score = 0;
    questionNum = 0;
    nextQuestion();
  });
}

function generateFinalPage() {
  $('#container').html(`
    <section id="js-final-page" role="region">
      <h1>You Were Great !!!</h1>
      <h1>Your Final Score : ${score} out of 10.</h1>
      <img  height="380px" width="460px" src="https://media.giphy.com/media/l0Ex3vQtX5VX2YtAQ/giphy.gif" alt="congratulations">
      <button id="js-restart-button">Wanna Play Again?</button>
    </section>
  `);
}

function generateCorrectFeedbackPage(questionNum) {
  $('#container').html(correctFeedback(questionNum));
}

function correctFeedback(questionNum) {
  return `
    <section class="feedback-page" role="region">
      <h1>You Got It Right !!!</h1>
      <h2>Score : ${score}/10</h2>
      <img  height="380px" width="460px" src="https://media.giphy.com/media/29p16JVUK9rhEIAzoj/giphy.gif" alt="flying dog">
      <button id="js-next-button">Next</button>
    </section>
  `;
}

function generateIncorrectFeedbackPage(questionNum) {
  const quesAnsSet = STORE[questionNum];
  $('#container').html(`
    <section class="feedback-page" role="region">
      <h1>You Got It Wrong !!!</h1>
      <h2>The correct answer is
      ${quesAnsSet.correctAnswer}.</h2>
      <h2>Score : ${score}/10</h2>
      <img src="https://media.giphy.com/media/3o85xnPx7SP1PyUhgs/giphy.gif" alt="confused dog" height>
      <button id="js-next-button">Next</button>
    </section>
  `);
}

function handleAllButtons() {
  handleStartButton();
  handleSubmitButton();
  handleNextButton();
  handleRestartButton();
}

handleAllButtons();
const questions = [
    {
      question: 'What is the capital of France?',
      choices: ['Paris', 'London', 'Berlin', 'Rome'],
      correctAnswer: 'Paris'
    },
    {
      question: 'What is the largest planet in our solar system?',
      choices: ['Jupiter', 'Mars', 'Venus', 'Saturn'],
      correctAnswer: 'Jupiter'
    },
    {
      question: 'Who painted the Mona Lisa?',
      choices: ['Leonardo da Vinci', 'Pablo Picasso', 'Vincent van Gogh', 'Michelangelo'],
      correctAnswer: 'Leonardo da Vinci'
    }
  ];
  
  let currentQuestion = 0;
  let correctCount = 0;
  let incorrectCount = 0;
  let isAnswered = false;
  
  const questionElement = document.getElementById('question');
  const choicesElement = document.getElementById('choices');
  const submitButton = document.getElementById('submit');
  const popupElement = document.getElementById('popup');
  const resultsElement = document.getElementById('results');
  const scoreElement = document.getElementById('score');
  const leaderboardElement = document.getElementById('leaderboard');
  
  function showQuestion() {
    const question = questions[currentQuestion];
    questionElement.textContent = question.question;
  
    choicesElement.innerHTML = '';
    question.choices.forEach((choice) => {
      const choiceButton = document.createElement('div');
      choiceButton.classList.add('choice');
      choiceButton.textContent = choice;
      choiceButton.addEventListener('click', () => selectAnswer(choice));
      choicesElement.appendChild(choiceButton);
    });
  }
  
  function selectAnswer(choice) {
    if (!isAnswered) {
      const selectedChoice = document.querySelector('.choice.selected');
      if (selectedChoice) {
        selectedChoice.classList.remove('selected');
      }
      const choiceButton = Array.from(choicesElement.getElementsByClassName('choice')).find(btn => btn.textContent === choice);
      choiceButton.classList.add('selected');
      submitButton.disabled = false;
    }
  }
  
  function checkAnswer() {
    if (!isAnswered) {
      isAnswered = true;
      const question = questions[currentQuestion];
      const selectedChoice = document.querySelector('.choice.selected');
      const selectedAnswer = selectedChoice ? selectedChoice.textContent : '';
      
      if (selectedAnswer === question.correctAnswer) {
        correctCount++;
        showPopup('Correct!', 'green');
      } else {
        incorrectCount++;
        showPopup('Wrong!', 'red');
      }
    }
  }
  
  function showPopup(message, color) {
    const popupMessage = document.createElement('div');
    popupMessage.classList.add('message');
    popupMessage.textContent = message;
    popupMessage.style.backgroundColor = color;
    popupElement.appendChild(popupMessage);
    popupElement.classList.remove('hide');
  
    setTimeout(() => {
      popupElement.innerHTML = '';
      popupElement.classList.add('hide');
      nextQuestion();
    }, 1000);
  }
  
  function nextQuestion() {
    currentQuestion++;
    isAnswered = false;
    submitButton.disabled = true;
    
    if (currentQuestion === questions.length) {
      showLeaderboard();
    } else {
      showQuestion();
    }
  }
  
  function showLeaderboard() {
    questionElement.classList.add('hide');
    choicesElement.classList.add('hide');
    submitButton.classList.add('hide');
    leaderboardElement.classList.remove('hide');
  
    resultsElement.innerHTML = `
      <div>Correct: ${correctCount}</div>
      <div>Incorrect: ${incorrectCount}</div>
    `;
  
    const totalQuestions = questions.length;
    const scorePercentage = (correctCount / totalQuestions) * 100;
    scoreElement.textContent = `Your score: ${scorePercentage}%`;
  }
  
  showQuestion();
  submitButton.addEventListener('click', checkAnswer);
  
const quizData = [
    {
        question: "What is the capital of Japan?",
        options: ["Tokyo", "Kyoto", "Osaka", "Hiroshima"],
        answer: "Tokyo"
    },
    {
        question: "Who is the current President of the United States?",
        options: ["Joe Biden", "Donald Trump", "Barack Obama", "George Washington"],
        answer: "Joe Biden"
    },
    {
        question: "What is the chemical symbol for gold?",
        options: ["Au", "Ag", "Pt", "Cu"],
        answer: "Au"
    },
    {
        question: "Who wrote the play 'Romeo and Juliet'?",
        options: ["William Shakespeare", "Charles Dickens", "Jane Austen", "Mark Twain"],
        answer: "William Shakespeare"
    },
    {
        question: "What is the largest mammal in the world?",
        options: ["Blue Whale", "Elephant", "Hippopotamus", "Rhino"],
        answer: "Blue Whale"
    },
    {
        question: "Who painted the Sistine Chapel ceiling?",
        options: ["Michelangelo", "Leonardo da Vinci", "Raphael", "Donatello"],
        answer: "Michelangelo"
    },
    {
        question: "What is the smallest prime number?",
        options: ["1", "2", "3", "4"],
        answer: "2"
    },
    {
        question: "Who discovered penicillin?",
        options: ["Alexander Fleming", "Isaac Newton", "Albert Einstein", "Thomas Edison"],
        answer: "Alexander Fleming"
    },
    {
        question: "What is the square root of 81?",
        options: ["9", "8", "7", "6"],
        answer: "9"
    },
    {
        question: "Who is the author of 'Pride and Prejudice'?",
        options: ["Jane Austen", "Charlotte Bronte", "Emily Bronte", "Virginia Woolf"],
        answer: "Jane Austen"
    }
];
  
  const quizContainer = document.getElementById('quiz');
  const resultContainer = document.getElementById('result');
  const submitButton = document.getElementById('next');
  const retryButton = document.getElementById('retry');
  const skip = document.getElementById('skip');
  const showAnswerButton = document.getElementById('showAnswer');
  
  let currentQuestion = 0;
  let score = 0;
  let incorrectAnswers = [];
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  function displayQuestion() {
    const questionData = quizData[currentQuestion];
  
    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;
  
    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';
  
    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);
  
    for (let i = 0; i < shuffledOptions.length; i++) {
      const option = document.createElement('label');
      option.className = 'option';
  
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz';
      radio.value = shuffledOptions[i];
  
      const optionText = document.createTextNode(shuffledOptions[i]);
  
      option.appendChild(radio);
      option.appendChild(optionText);
      optionsElement.appendChild(option);
    }
  
    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
  }
 
  function submitAnswer() {
    if (!optionsEl.querySelector("li.selected")) {
    
        return;
    }
    const selectedOption = optionsEl.querySelector("li.selected");
    const selectedOptionIndex = parseInt(selectedOption.getAttribute("data-index"));

    if (questions[currentQuestionIndex - 1].answer === selectedOptionIndex) {
        score += questions[currentQuestionIndex - 1].score;
        resultEl.textContent = "Correct!";
    } else {
        resultEl.textContent = "Incorrect!";
    }

    scoreEl.textContent = `Score: ${score}`;
    setTimeout(() => {
        resultEl.textContent = "";
        showNextQuestion();
    }, 1000);
}
  
  function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (!selectedOption) {
      alert("Please choose an option.");
      return;
  }
   
    if (selectedOption) {
      const answer = selectedOption.value;
      if (answer === quizData[currentQuestion].answer) {
        score++;
      } else {
        incorrectAnswers.push({
          question: quizData[currentQuestion].question,
          incorrectAnswer: answer,
          correctAnswer: quizData[currentQuestion].answer,
        });
      }
      currentQuestion++;
      selectedOption.checked = false;
      if (currentQuestion < quizData.length) {
        displayQuestion();
      } else {
        displayResult();
      }
    }
  }
  
  function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
  }
  
  function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestion();
  }
  
  function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';
  
    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
      incorrectAnswersHtml += `
        <p>
          <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
          <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
          <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
        </p>
      `;
    }
  
    resultContainer.innerHTML = `
      <p>You scored ${score} out of ${quizData.length}!</p>
      <p>Incorrect Answers:</p>
      ${incorrectAnswersHtml}
    `;
  }
  
  submitButton.addEventListener('click', checkAnswer);
  retryButton.addEventListener('click', retryQuiz);
  showAnswerButton.addEventListener('click', showAnswer);
  function skipQuestion() {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        displayQuestion();
    } else {
        displayResult();
    }
}

skip.addEventListener('click', skipQuestion);

  displayQuestion();
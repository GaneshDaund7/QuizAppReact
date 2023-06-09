import React, { useEffect, useState } from 'react';
import Start from './components/Start';
import Quiz from './components/Quiz';
import Result from './components/Result';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import CardGrid from './components/home';


function App() {
  // All Quizs, Current Question, Index of Current Question, Answer, Selected Answer, Total Marks

  const jsonFile = new URLSearchParams(window.location.search).get('jsonFile');
  console.log(jsonFile);

  const [quizs, setQuizs] = useState([]);
  const [question, setQuesion] = useState({});
  const [questionIndex, setQuestionIndex] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [marks, setMarks] = useState(0);

  // Display Controlling States
  const [showStart, setShowStart] = useState(true);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    
    if (jsonFile) {
      fetch(process.env.PUBLIC_URL + '/' + jsonFile)
        .then(res => res.json())
        .then(data => setQuizs(data))
        .catch(error => console.error(`Failed to fetch JSON data from ${jsonFile}:`, error));
    }
  }, [jsonFile]);
  // Set a Single Question
  useEffect(() => {
    if (quizs.length > questionIndex) {
      setQuesion(quizs[questionIndex]);
    }
  }, [quizs, questionIndex])

  // Start Quiz
  const startQuiz = () => {
    setShowStart(false);
    setShowQuiz(true);
  }

  // Check Answer
  const checkAnswer = (event, selected) => {
    if (!selectedAnswer) {
      setCorrectAnswer(question.answer);
      setSelectedAnswer(selected);

      if (selected === question.answer) {
        event.target.classList.add('bg-success');
        setMarks(marks + 5);
      } else {
        event.target.classList.add('bg-danger');
      }
    }
  }

  // Next Quesion
  const nextQuestion = () => {
    setCorrectAnswer('');
    setSelectedAnswer('');
    const wrongBtn = document.querySelector('button.bg-danger');
    wrongBtn?.classList.remove('bg-danger');
    const rightBtn = document.querySelector('button.bg-success');
    rightBtn?.classList.remove('bg-success');
    setQuestionIndex(questionIndex + 1);
  }

  // Show Result
  const showTheResult = () => {
    setShowResult(true);
    setShowStart(false);
    setShowQuiz(false);
  }

  // Start Over
  const startOver = () => {
    setShowStart(false);
    setShowResult(false);
    setShowQuiz(true);
    setCorrectAnswer('');
    setSelectedAnswer('');
    setQuestionIndex(0);
    setMarks(0);
    const wrongBtn = document.querySelector('button.bg-danger');
    wrongBtn?.classList.remove('bg-danger');
    const rightBtn = document.querySelector('button.bg-success');
    rightBtn?.classList.remove('bg-success');
  }

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/home" element={< CardGrid/>} />
      <Route path="/quiz" element={
        <>
          <Start startQuiz={startQuiz} showStart={showStart} />
          <Quiz
            showQuiz={showQuiz}
            question={question}
            quizs={quizs}
            checkAnswer={checkAnswer}
            correctAnswer={correctAnswer}
            selectedAnswer={selectedAnswer}
            questionIndex={questionIndex}
            nextQuestion={nextQuestion}
            showTheResult={showTheResult}
          />
          <Result
            showResult={showResult}
            quizs={quizs}
            marks={marks}
            startOver={startOver}
          />
        </>
      } />
    </Routes>
  </BrowserRouter>
  );
}

export default App;

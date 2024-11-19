class Quiz {
    constructor() {
        this.questions = [];
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.initializeElements();
        this.addEventListeners();
    }

    initializeElements() {
        // Form elements
        this.questionForm = document.getElementById('questionForm');
        this.questionInput = document.getElementById('questionText');
        this.answerInput = document.getElementById('correctAnswer');
        
        // Quiz elements
        this.teacherSection = document.getElementById('teacherSection');
        this.quizSection = document.getElementById('quizSection');
        this.resultsSection = document.getElementById('resultsSection');
        this.startQuizBtn = document.getElementById('startQuiz');
        this.questionDisplay = document.getElementById('questionDisplay');
        this.userAnswerInput = document.getElementById('userAnswer');
        this.submitAnswerBtn = document.getElementById('submitAnswer');
        this.currentQuestionSpan = document.getElementById('currentQuestion');
        this.totalQuestionsSpan = document.getElementById('totalQuestions');
        this.scoreSpan = document.getElementById('score');
        this.totalScoreSpan = document.getElementById('totalScore');
        this.restartQuizBtn = document.getElementById('restartQuiz');
    }

    addEventListeners() {
        this.questionForm.addEventListener('submit', (e) => this.handleAddQuestion(e));
        this.startQuizBtn.addEventListener('click', () => this.startQuiz());
        this.submitAnswerBtn.addEventListener('click', () => this.checkAnswer());
        this.restartQuizBtn.addEventListener('click', () => this.restartQuiz());
    }

    handleAddQuestion(e) {
        e.preventDefault();
        const question = this.questionInput.value;
        const answer = this.answerInput.value;
        
        this.questions.push({ question, answer });
        
        // Clear inputs
        this.questionInput.value = '';
        this.answerInput.value = '';
        
        // Show start quiz button if we have questions
        if (this.questions.length > 0) {
            this.startQuizBtn.style.display = 'block';
        }
    }

    startQuiz() {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.teacherSection.style.display = 'none';
        this.quizSection.style.display = 'block';
        this.totalQuestionsSpan.textContent = this.questions.length;
        this.displayQuestion();
    }

    displayQuestion() {
        const question = this.questions[this.currentQuestionIndex];
        this.questionDisplay.textContent = question.question;
        this.currentQuestionSpan.textContent = this.currentQuestionIndex + 1;
        this.userAnswerInput.value = '';
    }

    checkAnswer() {
        const currentQuestion = this.questions[this.currentQuestionIndex];
        const userAnswer = this.userAnswerInput.value.trim().toLowerCase();
        const correctAnswer = currentQuestion.answer.toLowerCase();

        if (userAnswer === correctAnswer) {
            this.score++;
        }

        this.currentQuestionIndex++;

        if (this.currentQuestionIndex < this.questions.length) {
            this.displayQuestion();
        } else {
            this.showResults();
        }
    }

    showResults() {
        this.quizSection.style.display = 'none';
        this.resultsSection.style.display = 'block';
        this.scoreSpan.textContent = this.score;
        this.totalScoreSpan.textContent = this.questions.length;
    }

    restartQuiz() {
        this.resultsSection.style.display = 'none';
        this.teacherSection.style.display = 'block';
        this.questions = [];
        this.startQuizBtn.style.display = 'none';
    }
}

// Initialize the quiz when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new Quiz();
}); 
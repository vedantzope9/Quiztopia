let currentQuizId;

        document.addEventListener("DOMContentLoaded", function () {
            const quizTableBody = document.getElementById("quizTableBody");

            fetch("http://localhost:8080/quiz/get")
                .then(response => response.json())
                .then(data => {
                    data.forEach(quiz => {
                        const row = document.createElement("tr");
                        row.innerHTML = `
                            <td>${quiz.id}</td>
                            <td>${quiz.title}</td>
                            <td><button onclick="fetchQuiz(${quiz.id}, '${quiz.title}')">Solve Quiz</button></td>
                        `;
                        quizTableBody.appendChild(row);
                    });
                })
                .catch(error => console.error("Error fetching quizzes:", error));
        });

        function fetchQuiz(quizId, quizTitle) {
            currentQuizId = quizId;
            document.getElementById("quizListContainer").style.display = "none";
            document.getElementById("quizQuestionsContainer").style.display = "block";
            document.getElementById("quizTitle").textContent = quizTitle;

            const questionsContainer = document.getElementById("questionsContainer");
            questionsContainer.innerHTML = "";

            fetch(`http://localhost:8080/quiz/get/${quizId}`)
                .then(response => response.json())
                .then(data => {
                    data.forEach(question => {
                        const questionCard = document.createElement("div");
                        questionCard.className = "question-card";
                        questionCard.innerHTML = `
                            <div><strong>${question.question_title}</strong></div>
                            <div class="options">
                                ${[question.option1, question.option2, question.option3, question.option4].map(option => `
                                    <label>
                                        <input type="radio" name="question-${question.id}" value="${option}">
                                        ${option}
                                    </label>
                                `).join('')}
                            </div>
                        `;
                        questionsContainer.appendChild(questionCard);
                    });
                })
                .catch(error => console.error("Error fetching quiz questions:", error));
        }

        document.getElementById("submitButton").addEventListener("click", function () {
            const responses = Array.from(document.querySelectorAll(".question-card")).map(card => {
                const questionId = parseInt(card.querySelector(".options input").name.split("-")[1], 10);
                const selectedOption = card.querySelector(".options input:checked")?.value || "";
                return { id: questionId, response: selectedOption };
            });

            const incompleteResponse = responses.some(res => res.response === "");
            if (incompleteResponse) {
                document.getElementById("errorMessage").textContent = "Please answer all questions before submitting.";
                return;
            }
            fetch(`http://localhost:8080/quiz/submit/${currentQuizId}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(responses)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Failed to submit quiz. Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(score => showScore(score, responses.length))
                .catch(error => console.error("Error submitting quiz:", error));
        });

        function showScore(score, totalQuestions) {
            document.getElementById("quizQuestionsContainer").style.display = "none";
            document.getElementById("scoreContainer").style.display = "block";
            document.getElementById("scoreMessage").textContent = `You scored ${score} out of ${totalQuestions} questions.`;
        }

        document.getElementById("cancelButton").addEventListener("click", function () {
            document.getElementById("quizListContainer").style.display = "block";
            document.getElementById("quizQuestionsContainer").style.display = "none";
        });

        document.getElementById("backToQuizList").addEventListener("click", function () {
            document.getElementById("scoreContainer").style.display = "none";
            document.getElementById("quizListContainer").style.display = "block";
        });

        //check Answers

        document.getElementById("checkAnswersButton").addEventListener("click", function () {
            const responses = Array.from(document.querySelectorAll(".question-card")).map(card => {
                const questionId = parseInt(card.querySelector(".options input").name.split("-")[1], 10);
                const selectedOption = card.querySelector(".options input:checked")?.value || "";
                return { id: questionId, response: selectedOption };
            });

            fetch(`http://localhost:8080/quiz/check_ans/${currentQuizId}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(responses)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Failed to fetch answers. Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(answers => showAnswers(answers))
                .catch(error => console.error("Error checking answers:", error));
        });


        function showAnswers(answers) {
            const scoreContainer = document.getElementById("scoreContainer");
            scoreContainer.style.display = "none";

            const answersContainer = document.createElement("div");
            answersContainer.id = "answersContainer";
            answersContainer.className = "container";
            answersContainer.innerHTML = `
        <h2>Quiz Answers</h2>
        
        ${answers.map(answer => `
            <div class="answer-card" style="
                border: 1px solid #ddd;
                padding: 15px;
                margin-bottom: 20px;
                border-radius: 5px;
                background-color: ${answer.correct ? '#e6ffe6' : '#ffe6e6'};">
                <div><strong>Q: ${answer.question_title}</strong></div>
                <ul>
                    ${[answer.option1, answer.option2, answer.option3, answer.option4].map(option => `
                        <li>${option}</li>
                    `).join('')}
                </ul>
                <div style="margin-top: 10px;">
                    ${answer.correct ?
                    `<div>Your Answer: <span style="color: green;">${answer.userResponse}</span></div>
                    <span style="color: green; font-weight: bold;">Correct!</span>`
                    : `
                        <div>Your Answer: <span style="color: red;">${answer.userResponse}</span></div>
                        <div>Right Answer: <span style="color: green;">${answer.right_ans}</span></div>
                    `}
                </div>
            </div>
        `).join('')}
        <div class="button-group">
            <button id="backToQuizListFromAnswers">Back to Quiz List</button>
        </div>
    `;
            document.body.appendChild(answersContainer);

            document.getElementById("backToQuizListFromAnswers").addEventListener("click", function () {
                document.getElementById("quizListContainer").style.display = "block";
                answersContainer.remove();
            });
        }
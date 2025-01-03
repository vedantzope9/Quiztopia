const API_BASE_URL = "http://localhost:8080/question";

        async function fetchQuestionsByCategory() {
            const categoryName = document.getElementById('category_name').value;

            try {
                const response = await fetch(`${API_BASE_URL}/category/${categoryName}`);
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }

                const questions = await response.json();
                displayQuestions(questions);
            } catch (error) {
                displayError(error.message);
            }
        }

        function displayQuestions(questions) {
            const resultDiv = document.getElementById('result');
            const resultContent = document.getElementById('resultContent');

            resultContent.innerHTML = '';
            if (questions.length === 0) {
                resultContent.innerHTML = '<tr><td colspan="6">No questions found for this category.</td></tr>';
            } else {
                questions.forEach(question => {
                    const row = document.createElement('tr');

                    row.innerHTML = `
                        <td>${question.id}</td>
                        <td>${question.category}</td>
                        <td>${question.difficultyLevel}</td>
                        <td>${question.question_title}</td>
                        <td>
                            1. ${question.option1}<br>
                            2. ${question.option2}<br>
                            3. ${question.option3}<br>
                            4. ${question.option4}
                        </td>
                        <td>${question.right_ans}</td>
                    `;

                    resultContent.appendChild(row);
                });
            }

            resultDiv.style.display = 'block';
        }

        function displayError(message) {
            const resultDiv = document.getElementById('result');
            const resultContent = document.getElementById('resultContent');

            resultContent.innerHTML = `<tr><td colspan="6">${message}</td></tr>`;
            resultDiv.style.display = 'block';
        }
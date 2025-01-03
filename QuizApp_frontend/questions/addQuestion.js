const API_BASE_URL = "http://localhost:8080/question";

        async function addQuestion() {
            const form = document.getElementById('addQuestionForm');
            const formData = new FormData(form);

            const questionData = {};
            formData.forEach((value, key) => {
                questionData[key] = value;
            });

            try {
                const response = await fetch(`${API_BASE_URL}/addQuestions`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(questionData),
                });

                const result = await response.text();
                displayResult(result);
            } catch (error) {
                displayResult(`Error: ${error.message}`);
            }
        }

        function displayResult(content) {
            const resultDiv = document.getElementById('result');
            const resultContent = document.getElementById('resultContent');
            resultDiv.style.display = 'block';
            resultContent.textContent = content;
        }
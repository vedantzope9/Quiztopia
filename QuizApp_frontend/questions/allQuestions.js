let currentQuestionId;
        const API_BASE_URL = "http://localhost:8080/question";

        async function fetchAllQuestions() {
            try {
                const response = await fetch(`${API_BASE_URL}/allQuestions`);
                const questions = await response.json();
                displayQuestions(questions);
            } catch (error) {
                alert(`Error fetching questions: ${error.message}`);
            }
        }

        function displayQuestions(questions) {
            const questionsBody = document.getElementById('questionsBody');
            questionsBody.innerHTML = '';

            questions.forEach(question => {
                const row = document.createElement('tr');

                row.innerHTML = `
                    <td>${question.id}</td>
                    <td>${question.category}</td>
                    <td>${question.difficultyLevel}</td>
                    <td><a href="#" onclick="fetchQuestionById(${question.id})">${question.question_title}</a></td>
                    <td>${question.option1}</td>
                    <td>${question.option2}</td>
                    <td>${question.option3}</td>
                    <td>${question.option4}</td>
                    <td>${question.right_ans}</td>
                `;

                questionsBody.appendChild(row);
            });
        }

        async function fetchQuestionById(id) {
            try {
                const response = await fetch(`${API_BASE_URL}/allQuestions/${id}`);
                const question = await response.json();
                displayQuestionDetail(question);
            } catch (error) {
                alert(`Error fetching question: ${error.message}`);
            }
        }

        function displayQuestionDetail(question) {
            document.getElementById('allQuestionsTable').style.display = 'none';

            const detailContainer = document.getElementById('questionDetail');
            detailContainer.style.display = 'block';

            currentQuestionId = question.id;

            document.getElementById('questionTitle').textContent = question.question_title;
            document.getElementById('questionCategory').textContent = question.category;
            document.getElementById('questionDifficulty').textContent = question.difficultyLevel;
            document.getElementById('option1').textContent = question.option1;
            document.getElementById('option2').textContent = question.option2;
            document.getElementById('option3').textContent = question.option3;
            document.getElementById('option4').textContent = question.option4;
            document.getElementById('rightAnswer').textContent = question.right_ans;
        }

        function goBack1() {
            document.getElementById('questionDetail').style.display = 'none';
            document.getElementById('allQuestionsTable').style.display = 'table';
            fetchAllQuestions(); // Reload questions
        }

        // Fetch questions on page load
        fetchAllQuestions();


        //for update
        async function fetchQuestionForUpdate(id) {
            if (!id) {
                alert("Error: Invalid question ID");
                return;
            }
            console.log(`Fetching question for update: ${id}`);
            try {
                const response = await fetch(`${API_BASE_URL}/allQuestions/${id}`);
                const question = await response.json();
                console.log(question); // Check the structure of the fetched question object
                showUpdateForm(question);
            } catch (error) {
                alert(`Error fetching question for update: ${error.message}`);
            }
        }



        function showUpdateForm(question) {
            document.getElementById('allQuestionsTable').style.display = 'none';
            document.getElementById('questionDetail').style.display = 'none';
            document.getElementById('updateQuestionForm').style.display = 'block';

            currentQuestionId = question.id; // Set globally
            document.getElementById('updateQuestionTitle').value = question.question_title || '';
            document.getElementById('updateCategory').value = question.category || '';
            document.getElementById('updateDifficulty').value = question.difficultyLevel || '';
            document.getElementById('updateOption1').value = question.option1 || '';
            document.getElementById('updateOption2').value = question.option2 || '';
            document.getElementById('updateOption3').value = question.option3 || '';
            document.getElementById('updateOption4').value = question.option4 || '';
            document.getElementById('updateRightAnswer').value = question.right_ans || '';
        }



        async function submitUpdatedQuestion() {
            const updatedQuestion = {
                id: currentQuestionId,
                question_title: document.getElementById('updateQuestionTitle').value,
                category: document.getElementById('updateCategory').value,
                difficultyLevel: document.getElementById('updateDifficulty').value,
                option1: document.getElementById('updateOption1').value,
                option2: document.getElementById('updateOption2').value,
                option3: document.getElementById('updateOption3').value,
                option4: document.getElementById('updateOption4').value,
                right_ans: document.getElementById('updateRightAnswer').value,
            };

            try {
                const response = await fetch(`${API_BASE_URL}/allQuestions/${currentQuestionId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedQuestion),
                });

                if (response.ok) {
                    alert('Question updated successfully!');
                    goBack(currentQuestionId);
                    fetchAllQuestions(); // Refresh questions list
                } else {
                    alert('Failed to update question. Please try again.');
                }
            } catch (error) {
                alert(`Error updating question: ${error.message}`);
            }
        }

        function goBack(id) {
            document.getElementById('updateQuestionForm').style.display = 'none';
            document.getElementById('allQuestionsTable').style.display = 'table';
            fetchQuestionById(id); // Reload questions
        }


        //for delete
        async function confirmDelete(id) {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: "Do you really want to delete this question?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#dc3545',
                cancelButtonColor: '#6c757d',
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel!',
            });

            if (result.isConfirmed) {
                try {
                    const response = await fetch(`${API_BASE_URL}/allQuestions/${id}`, {
                        method: 'DELETE',
                    });

                    if (response.ok) {
                        Swal.fire(
                            'Deleted!',
                            'The question has been deleted.',
                            'success'
                        );
                        goBack1(); // Refresh question list
                    } else {
                        Swal.fire(
                            'Failed!',
                            'Failed to delete the question. Please try again.',
                            'error'
                        );
                    }
                } catch (error) {
                    Swal.fire(
                        'Error!',
                        `Error deleting question: ${error.message}`,
                        'error'
                    );
                }
            }
        }
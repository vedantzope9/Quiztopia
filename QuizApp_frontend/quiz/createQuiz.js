// Handle form submission
document.getElementById('quizForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission

    const category = document.getElementById('category').value;
    const numQ = document.getElementById('numQ').value;
    const title = document.getElementById('title').value;

    const url = `http://localhost:8080/quiz/create?category=${encodeURIComponent(category)}&numQ=${encodeURIComponent(numQ)}&title=${encodeURIComponent(title)}`;

    fetch(url, { method: 'GET' })
        .then(response => response.text())
        .then(data => {
            document.getElementById('responseMessage').textContent = data;
            document.getElementById('responseMessage').style.color = "green";

            // Show OK button after success
            document.getElementById('okButton').style.display = 'inline-block';
        })
        .catch(error => {
            document.getElementById('responseMessage').textContent = "Error creating quiz: " + error.message;
            document.getElementById('responseMessage').style.color = "red";
        });
});

// Handle Cancel button click
document.getElementById('cancelButton').addEventListener('click', function () {
    window.history.back(); // Go back to the previous page
});

// Handle OK button click
document.getElementById('okButton').addEventListener('click', function () {
    window.history.back(); // Go back to the previous page
});
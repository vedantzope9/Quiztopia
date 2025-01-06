function redirectTo() {
    document.getElementById("addQuestion").addEventListener("click", () => {
        window.location.href = "../questions/addQuestion.html";
    });

    document.getElementById("findCategory").addEventListener("click", () => {
        window.location.href = "../questions/findByCategory.html";
    });

    document.getElementById("viewAll").addEventListener("click", () => {
        window.location.href = "../questions/allQuestions.html";
    });
}

// Call the redirectTo function to attach event listeners
redirectTo();

function goBack() {
    window.history.back();
}
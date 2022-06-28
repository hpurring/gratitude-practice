var questionEl = document.getElementById("question");
var responseEl = document.getElementById("response");
var saveBtn = document.getElementById("save-btn");
var savedItem = document.getElementById("saved-item")

var getQuestion = function() {

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '5f4b8fcd5dmsh8a2b9b8d6ea7074p1cc2c7jsn81d09102e3c1',
            'X-RapidAPI-Host': 'gratitude-questions.p.rapidapi.com'
        }
    };
    
    fetch('https://gratitude-questions.p.rapidapi.com/question', options)
    .then(function(response) {
        // request was successful
        if (response.ok) {
            console.log(response);
            response.json().then(function(data) {
                console.log(data);
                displayQuestion(data);
                displayResponse();
            });
            } else {
                alert('Error: ' + response.statusText);
                }
            })
            .catch(function(error) {
            alert('Unable to connect.');
            });
};

var displayQuestion = function(data) {
    questionEl.innerHTML = data.question;
};

var displayResponse = function() {
    responseEl.style.display = 'block';
    saveBtn.style.display = 'block';
}

saveBtn.addEventListener("click", function ()
    {
        var gratitudeText = responseEl.value;
        localStorage.setItem("gratitude", JSON.stringify(gratitudeText));
        alert("Saved successfully!");
        console.log("Gratitude entry saved.");
        responseEl.value = "";
        showSaved();
        getQuestion();
    } , false);

var showSaved = function() {
    var savedEntry = JSON.parse(localStorage.getItem("gratitude"));
    savedItem.innerHTML = savedEntry;
}

var buttonEl = document.getElementById("question-button");
buttonEl.addEventListener('click', getQuestion);
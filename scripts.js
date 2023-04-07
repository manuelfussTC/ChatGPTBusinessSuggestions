document.getElementById("analysis-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.getElementById("result").innerHTML = xhr.responseText;
            addSuggestionClickHandlers();
        }
    };

    xhr.open("POST", "process.php", true);
    xhr.send(formData);
});

function addSuggestionClickHandlers() {
    const suggestions = document.getElementsByClassName("suggestion-item");
    for (const suggestion of suggestions) {
        suggestion.addEventListener("click", function (event) {
            const actionText = event.target.textContent.trim();
            executeSuggestion(actionText);
        });
    }
}


function executeSuggestion(actionText) {
    const text = document.getElementById("text").value;
    const xhr = new XMLHttpRequest();

    // Lade-Indikator anzeigen
    document.querySelector(".loading-indicator").style.display = "block";

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const result = document.getElementById("result");
            const outputSection = document.createElement("div");
            outputSection.classList.add("result-section");
            outputSection.innerHTML = xhr.responseText;
            result.appendChild(outputSection);

            // Lade-Indikator ausblenden
            document.querySelector(".loading-indicator").style.display = "none";

            addSuggestionClickHandlers();
        }
    };

    xhr.open("POST", "process.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(`text=${encodeURIComponent(text)}&option=executeSuggestion&suggestion=${encodeURIComponent(actionText)}`);

}




function processData() {
    var form = document.getElementById("analysis-form");
    var text = form.elements["text"].value;
    var option = form.elements["option"].value;

    var requestData = "text=" + encodeURIComponent(text) + "&option=" + encodeURIComponent(option);

    // Wenn eine Aktion aus den Vorschlägen ausgeführt werden soll, fügen Sie die ausgewählte Aktion der Anfrage hinzu
    if (option === "executeSuggestion") {
        var suggestion = document.querySelector(".suggestions-list .selected").textContent;
        requestData += "&suggestion=" + encodeURIComponent(suggestion);
    }

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "process.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    // Lade-Indikator anzeigen
    document.querySelector(".loading-indicator").style.display = "block";

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status === 200) {
            document.querySelector("#result").innerHTML = xhr.responseText;

            // Lade-Indikator ausblenden
            document.querySelector(".loading-indicator").style.display = "none";

            addSuggestionClickHandlers();
        }
    };

    xhr.send(requestData);
}

// Listener für den Submit-Button
document.getElementById("submit-button").addEventListener("click", function (event) {
    event.preventDefault();
    processData();
});

// ...

// Listener für die Vorschläge-Liste
var suggestionsList = document.querySelector(".suggestions-list");
if (suggestionsList) {
    suggestionsList.addEventListener("click", function (e) {
        if (e.target && e.target.nodeName == "LI") {
            var listItems = suggestionsList.getElementsByTagName("li");
            for (var i = 0; i < listItems.length; i++) {
                listItems[i].classList.remove("selected");
            }
            e.target.classList.add("selected");

            // Lade-Indikator anzeigen
            document.querySelector(".loading-indicator").style.display = "block";

            // Daten verarbeiten
            var form = document.getElementById("analysis-form");
            var text = form.elements["text"].value;
            var option = form.elements["option"].value;
            var suggestion = e.target.textContent.trim();

            var requestData = "text=" + encodeURIComponent(text) + "&option=executeSuggestion" + "&suggestion=" + encodeURIComponent(suggestion);

            var xhr = new XMLHttpRequest();
            xhr.open("POST", "process.php", true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status === 200) {
                    document.querySelector("#result").innerHTML = xhr.responseText;

                    // Lade-Indikator ausblenden
                    document.querySelector(".loading-indicator").style.display = "none";
                }
            };

            xhr.send(requestData);
        }
    });
}


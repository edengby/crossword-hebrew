// Function to fetch and parse the CSV file into an array of words
function loadWordsFromCSV() {
    return fetch('./common_heb_words.csv')
        .then(response => response.text())
        .then(data => {
            const words = [];
            const lines = data.split('\n');

            // Skip the header and process each line
            for (let i = 1; i < lines.length; i++) {
                const word = lines[i].trim();
                if (word) {
                    words.push(word);
                }
            }
            return words;
        });
}

// Global variable to store the Hebrew words
let words = [];

// Load the words on page load and select 3 letters by default
window.onload = function() {
    loadWordsFromCSV().then(loadedWords => {
        words = loadedWords;
    });

    // Set default letter count to 3
    document.getElementById('letter-count').value = 3;
    generateInputs();
};

// Function to generate letter input fields based on selected number of letters
function generateInputs() {
    const letterCount = document.getElementById('letter-count').value;
    const letterInputs = document.getElementById('letter-inputs');
    letterInputs.innerHTML = '';  // Clear previous inputs

    // Create input fields based on the selected letter count
    for (let i = 0; i < letterCount; i++) {
        const input = document.createElement('input');
        input.type = 'text';
        input.maxLength = 1;
        input.className = 'letter';
        input.placeholder = '*';  // Placeholder for wildcards
        letterInputs.appendChild(input);
    }
}

// Function to find words matching the input pattern
function findWords() {
    const letterInputs = document.querySelectorAll('.letter');
    let pattern = '';

    // Build the pattern string
    letterInputs.forEach(input => {
        pattern += input.value.trim() === '' ? '.' : input.value.trim();  // Use '.' for wildcards
    });

    const regexPattern = new RegExp("^" + pattern + "$");
    const results = words.filter(word => regexPattern.test(word));

    displayResults(results);
}

// Function to display results
function displayResults(results) {
    const wordList = document.getElementById('word-list');
    wordList.innerHTML = '';

    if (results.length === 0) {
        wordList.innerHTML = '<li>לא נמצאו תוצאות</li>';
    } else {
        results.forEach(word => {
            const li = document.createElement('li');
            li.textContent = word;
            wordList.appendChild(li);
        });
    }
}

let currentLevel = 0;
let correctAnswers = 0;
let incorrectAnswers = 0;
let selectedLanguage = 'fr';
let selectedDifficulty = 'easy';

// Example level data with translations and difficulty
const levels = {
    easy: [
        {
            question: {
                en: "What is 2 + 2?",
                fr: "Combien font 2 + 2 ?",
                es: "¿Cuánto es 2 + 2?",
                de: "Was ist 2 + 2?",
                it: "Quanto fa 2 + 2?",
                pt: "Quanto é 2 + 2?",
                ru: "Сколько будет 2 + 2?",
                zh: "2 + 2 等于多少？",
                ja: "2 + 2 はいくつですか？",
                ar: "ما هو 2 + 2？"
            },
            options: {
                en: ["3", "4", "5"],
                fr: ["3", "4", "5"],
                es: ["3", "4", "5"],
                de: ["3", "4", "5"],
                it: ["3", "4", "5"],
                pt: ["3", "4", "5"],
                ru: ["3", "4", "5"],
                zh: ["3", "4", "5"],
                ja: ["3", "4", "5"],
                ar: ["3", "4", "5"]
            },
            answer: "4"
        },
        // Add more easy questions here...
    ],
    medium: [
        {
            question: {
                en: "What is the capital of France?",
                fr: "Quelle est la capitale de la France ?",
                es: "¿Cuál es la capital de Francia?",
                de: "Was ist die Hauptstadt von Frankreich?",
                it: "Qual è la capitale della Francia?",
                pt: "Qual é a capital da França?",
                ru: "Какая столица Франции?",
                zh: "法国的首都是什么？",
                ja: "フランスの首都はどこですか？",
                ar: "ما هي عاصمة فرنسا？"
            },
            options: {
                en: ["Berlin", "Paris", "London"],
                fr: ["Berlin", "Paris", "Londres"],
                es: ["Berlín", "París", "Londres"],
                de: ["Berlin", "Paris", "London"],
                it: ["Berlino", "Parigi", "Londra"],
                pt: ["Berlim", "Paris", "Londres"],
                ru: ["Берлин", "Париж", "Лондон"],
                zh: ["柏林", "巴黎", "伦敦"],
                ja: ["ベルリン", "パリ", "ロンドン"],
                ar: ["برلين", "باريس", "لندن"]
            },
            answer: "Paris"
        },
        // Add more medium questions here...
    ],
    hard: [
        {
            question: {
                en: "What is the result of 15 * 14?",
                fr: "Quel est le résultat de 15 * 14 ?",
                es: "¿Cuál es el resultado de 15 * 14?",
                de: "Was ist das Ergebnis von 15 * 14?",
                it: "Qual è il risultato di 15 * 14?",
                pt: "Qual é o resultado de 15 * 14?",
                ru: "Каков результат 15 * 14?",
                zh: "15 * 14 等于多少？",
                ja: "15 * 14 の結果は何ですか？",
                ar: "ما هو ناتج 15 * 14؟"
            },
            options: {
                en: ["210", "220", "230"],
                fr: ["210", "220", "230"],
                es: ["210", "220", "230"],
                de: ["210", "220", "230"],
                it: ["210", "220", "230"],
                pt: ["210", "220", "230"],
                ru: ["210", "220", "230"],
                zh: ["210", "220", "230"],
                ja: ["210", "220", "230"],
                ar: ["210", "220", "230"]
            },
            answer: "210"
        },
        // Add more hard questions here...
    ]
};

// Update the displayed question and options based on the selected language
function displayOptions(levelData) {
    let optionsHtml = "";
    const questionText = levelData.question[selectedLanguage];
    const options = levelData.options[selectedLanguage];

    options.forEach(option => {
        optionsHtml += `
            <div class="option-container">
                <input type="radio" name="answer" value="${option}" />
                <label>${option}</label>
            </div>
        `;
    });

    document.getElementById('game-content').innerHTML = `
        <p>${questionText}</p>
        <div class="options-wrapper">
            ${optionsHtml}
        </div>
    `;
}

// Load the level based on the selected difficulty
function loadLevel(level) {
    const filteredLevels = levels[selectedDifficulty];

    if (level < filteredLevels.length) {
        document.getElementById('level').innerText = level + 1;
        const levelData = filteredLevels[level];

        displayOptions(levelData);
        document.getElementById('feedback').innerText = '';
    } else {
        showEndMessage();
    }
}

// Event listener for language selector
document.getElementById('language-selector').addEventListener('change', (event) => {
    selectedLanguage = event.target.value;
    loadLevel(currentLevel);
});

// Event listener for difficulty selector
document.getElementById('difficulty-selector').addEventListener('change', (event) => {
    selectedDifficulty = event.target.value;
    currentLevel = 0; // Reset to the first level of the selected difficulty
    loadLevel(currentLevel);
});

// Function to check the answer
function checkAnswer() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    const filteredLevels = levels[selectedDifficulty];

    if (selectedOption && selectedOption.value === filteredLevels[currentLevel].answer) {
        correctAnswers++;
        document.getElementById('feedback').innerText = 'Bonne réponse!';
    } else {
        incorrectAnswers++;
        document.getElementById('feedback').innerText = 'Mauvaise réponse!';
    }

    currentLevel++;
    setTimeout(() => loadLevel(currentLevel), 2000);
}

// Function to show end message
function showEndMessage() {
    document.getElementById('end-text').innerText = 'Jeu terminé !';
    document.getElementById('score-text').innerText = `Bonnes réponses : ${correctAnswers} | Mauvaises réponses : ${incorrectAnswers}`;
    document.getElementById('end-message').style.display = 'block';
    document.getElementById('restart-game').style.display = 'block';
}

// Initialize the game
function initializeGame() {
    currentLevel = 0;
    correctAnswers = 0;
    incorrectAnswers = 0;
    loadLevel(currentLevel);
}

// Event listener for the "Vérifier" button
document.getElementById('submit-answer').addEventListener('click', checkAnswer);

// Event listener for the "Restart" button
document.getElementById('restart-game').addEventListener('click', () => {
    initializeGame();
    document.getElementById('end-message').style.display = 'none';
});

// Call initializeGame when the page loads
initializeGame();

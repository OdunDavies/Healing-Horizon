document.addEventListener('DOMContentLoaded', () => {
    const quizForm = document.getElementById('quizForm');
    const signupForm = document.getElementById('signupForm');
    const loginForm = document.getElementById('loginForm');

    if (quizForm) {
        quizForm.addEventListener('submit', handleQuizSubmit);
    }

    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }

    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
});

const quizQuestions = [
    {
        question: "How often do you feel overwhelmed by your emotions?",
        answers: [
            { text: "Rarely", score: 1 },
            { text: "Sometimes", score: 2 },
            { text: "Often", score: 3 },
            { text: "Always", score: 4 }
        ]
    },
    {
        question: "How frequently do you experience difficulty sleeping?",
        answers: [
            { text: "Rarely", score: 1 },
            { text: "Sometimes", score: 2 },
            { text: "Often", score: 3 },
            { text: "Almost every night", score: 4 }
        ]
    },
    {
        question: "How often do you feel hopeless about the future?",
        answers: [
            { text: "Rarely", score: 1 },
            { text: "Sometimes", score: 2 },
            { text: "Often", score: 3 },
            { text: "Almost always", score: 4 }
        ]
    },
    {
        question: "How frequently do you experience sudden anxiety or panic?",
        answers: [
            { text: "Rarely", score: 1 },
            { text: "Sometimes", score: 2 },
            { text: "Often", score: 3 },
            { text: "Very frequently", score: 4 }
        ]
    },
    {
        question: "How often do you have trouble concentrating?",
        answers: [
            { text: "Rarely", score: 1 },
            { text: "Sometimes", score: 2 },
            { text: "Often", score: 3 },
            { text: "Almost always", score: 4 }
        ]
    },
    {
        question: "How frequently do you feel isolated or lonely?",
        answers: [
            { text: "Rarely", score: 1 },
            { text: "Sometimes", score: 2 },
            { text: "Often", score: 3 },
            { text: "Almost always", score: 4 }
        ]
    },
    {
        question: "How often do you experience sudden mood swings?",
        answers: [
            { text: "Rarely", score: 1 },
            { text: "Sometimes", score: 2 },
            { text: "Often", score: 3 },
            { text: "Very frequently", score: 4 }
        ]
    },
    {
        question: "How frequently do you have thoughts of self-harm?",
        answers: [
            { text: "Never", score: 1 },
            { text: "Rarely", score: 2 },
            { text: "Sometimes", score: 3 },
            { text: "Often", score: 4 }
        ]
    }
];

function createQuiz() {
    const quizContainer = document.getElementById('quizContainer');
    quizQuestions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        questionDiv.innerHTML = `
            <p>${index + 1}. ${q.question}</p>
            ${q.answers.map((answer, i) => `
                <label>
                    <input type="radio" name="q${index}" value="${answer.score}" required>
                    ${answer.text}
                </label>
            `).join('')}
        `;
        quizContainer.appendChild(questionDiv);
    });
}

function handleQuizSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    let totalScore = 0;
    let answeredQuestions = 0;

    for (let i = 0; i < quizQuestions.length; i++) {
        const answer = formData.get(`q${i}`);
        if (answer) {
            totalScore += parseInt(answer);
            answeredQuestions++;
        }
    }

    if (answeredQuestions < quizQuestions.length) {
        alert("Please answer all questions before submitting.");
        return;
    }

    displayQuizResult(totalScore);
}

function displayQuizResult(score) {
    const resultDiv = document.getElementById('quizResult');
    let resultText = '';
    let adviceText = '';

    if (score <= 12) {
        resultText = "Your responses suggest a low risk of mental health concerns.";
        adviceText = "Continue maintaining your mental well-being through regular exercise, healthy eating, and stress management techniques.";
    } else if (score <= 20) {
        resultText = "Your responses suggest a moderate risk of mental health concerns.";
        adviceText = "Consider talking to a trusted friend or family member about your feelings. You may also benefit from learning stress management techniques or mindfulness practices.";
    } else if (score <= 28) {
        resultText = "Your responses suggest a high risk of mental health concerns.";
        adviceText = "It's recommended that you speak with a mental health professional to discuss your feelings and experiences. They can provide you with appropriate support and guidance.";
    } else {
        resultText = "Your responses suggest a very high risk of mental health concerns.";
        adviceText = "It's strongly recommended that you seek immediate help from a mental health professional. If you're having thoughts of self-harm, please contact a crisis helpline or emergency services immediately.";
    }

    resultDiv.innerHTML = `
        <h2>Quiz Result</h2>
        <p>${resultText}</p>
        <p>${adviceText}</p>
        <p><strong>Note:</strong> This quiz is not a diagnostic tool. For a proper diagnosis and treatment, please consult with a qualified mental health professional.</p>
    `;
    // Add this to the existing main.js file

document.addEventListener('DOMContentLoaded', () => {
    // ... existing code ...

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
});

// ... existing code ...

async function handleContactSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    try {
        const response = await fetch('/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Object.fromEntries(formData)),
        });

        const result = await response.json();

        if (result.success) {
            alert('Your message has been sent successfully!');
            form.reset();
        } else {
            alert('There was an error sending your message. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
    }
}
}

// Existing signup and login functions remain unchanged

// Call createQuiz when the page loads
if (document.getElementById('quizContainer')) {
    createQuiz();
}

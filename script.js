document.addEventListener("DOMContentLoaded", () => {
  // --- Login Form ---
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value.trim();
      const errorMsg = document.getElementById("login-error");
      if (username === "admin" && password === "hsk123") {
        localStorage.setItem("loggedIn", "true");
        window.location.href = "home.html";
      } else {
        errorMsg.textContent = "Invalid username or password.";
      }
    });
  }

  // --- Redirect to login if not logged in ---
  const protectedPages = ["home.html", "materials.html", "quizzes.html", "profile.html"];
  if (
    protectedPages.includes(location.pathname.split("/").pop()) &&
    localStorage.getItem("loggedIn") !== "true"
  ) {
    window.location.href = "index.html";
  }

  // --- Logout Button ---
  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("loggedIn");
      window.location.href = "index.html";
    });
  }

  // --- Hide invalid quiz questions (dynamic quizzes) ---
  document.querySelectorAll('.quiz-question').forEach(q => {
    const question = q.querySelector('p');
    const options = q.querySelectorAll('button');
    if (!question || !question.textContent.trim() || options.length === 0) {
      q.style.display = 'none';
    }
  });

  // --- Vocab Page ---
  if (document.getElementById('vocab-hanzi')) {
    showWord();
  }

  // --- Grammar Page ---
  if (document.getElementById('grammar-title')) {
    showGrammar();
  }

  // --- Conversation Page ---
  if (document.getElementById('dialogue')) {
    showConversation();
  }

  // --- Profile Progress Bar ---
  const progressBar = document.getElementById("progress-bar");
  const progressLabel = document.getElementById("progress-label");
  const progressMotivation = document.getElementById("progress-motivation");
  let progressPercent = 50; // Example value

  if (progressBar && progressLabel) {
    progressBar.style.width = `${progressPercent}%`;
    progressLabel.textContent = `${progressPercent}% Complete`;
    if (progressMotivation) {
      if (progressPercent < 30) {
        progressMotivation.textContent = "Every step you take is progress. Keep practicing!";
      } else if (progressPercent < 70) {
        progressMotivation.textContent = "Great work! Your dedication is moving you forward!";
      } else {
        progressMotivation.textContent = "Amazing effort! Your hard work is really paying off!";
      }
    }
  }
});

function checkAnswer(button) {
  
  let correctAnswer = "nǐ hǎo"; // Set your correct answer

  if (window.location.pathname.includes("quizzes2.html")) {
    correctAnswer = "xièxie";
  }

  else if (window.location.pathname.includes("quizzes3.html")) {
    correctAnswer = "nín hǎo";
  }

  else if (window.location.pathname.includes("quizzes4.html")) {
    correctAnswer = "zài jiàn";
  }

  // Show result
const result = button.parentElement.nextElementSibling;
if (button.textContent === correctAnswer) {
  result.textContent = "✅ 很棒! You Are Awesome!";
  result.style.color = "green";
} else {
  result.textContent = "❌ 加油! Try again!";
  result.style.color = "red";
}

  // Show Next button
const nextQuizBtn = document.getElementById('next-quiz-btn');
if (nextQuizBtn) nextQuizBtn.style.display = "inline-block";
}


// Mini Game
let selectedWords = [];

function selectWord(button) {
  selectedWords.push(button.innerText);
  document.getElementById('user-sentence').textContent = selectedWords.join(' ');
  button.disabled = true;
}

function checkSentence() {
  const correct = "你 好 吗 ？";
  const feedback = document.getElementById("feedback");

  if (selectedWords.join(' ') === correct) {
    feedback.textContent = "✅ 很棒! You Are Awesome!";
    feedback.style.color = "green";
  } else {
    feedback.textContent = "❌ 加油! Try again!";
    feedback.style.color = "red";
  }
}

// Optional reset function (you can add a "Reset" button to use it)
function resetMiniGame() {
  selectedWords = [];
  document.getElementById('user-sentence').textContent = '';
  document.getElementById('feedback').textContent = '';
  const buttons = document.querySelectorAll('.word-bank button');
  buttons.forEach(btn => btn.disabled = false);
}

// Function to toggle the visibility of the sidebar
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("hidden");
}

function checkSimulationAnswer(button) {
  const feedback = document.getElementById('simulation-feedback');
  const nextBtn = document.getElementById('next-simulation');
  if (button.innerText === "你好") { // correct answer
    feedback.textContent = "✅ 很棒! You Are Awesome!";
    nextBtn.style.display = "inline-block";
  } else {
    feedback.textContent = "❌ 加油! Try again!";
    nextBtn.style.display = "none";
  }
}

//Vocab Page
const vocab = [
  { hanzi: "你好", pinyin: "nǐ hǎo", meaning: "Hello", img: "Hello.png" },
  { hanzi: "谢谢", pinyin: "xièxie", meaning: "Thank you", img: "thankyou.png" },
  { hanzi: "再见", pinyin: "zàijiàn", meaning: "Goodbye", img: "goodbye.png" },
  { hanzi: "请", pinyin: "qǐng", meaning: "Please", img: "please.png" },
  { hanzi: "对不起", pinyin: "duìbuqǐ", meaning: "Sorry", img: "sorry.png" }
];
let current = 0;

function showWord() {
  document.getElementById('vocab-hanzi').textContent = vocab[current].hanzi;
  document.getElementById('vocab-pinyin').textContent = vocab[current].pinyin;
  document.getElementById('vocab-meaning').textContent = vocab[current].meaning;
  document.getElementById('prev-btn').disabled = current === 0;
  document.getElementById('next-btn').disabled = current === vocab.length - 1;
  document.getElementById('vocab-img').src = vocab[current].img; // update image
}
function nextWord() {
  if (current < vocab.length - 1) current++;
  showWord();
}
function prevWord() {
  if (current > 0) current--;
  showWord();
}
document.addEventListener('DOMContentLoaded', showWord);

//Grammar
const grammarPoints = [
  {
    title: "Subject + 是 + Noun",
    example: "Example: <br><br> 他是老师 <br> Tā shì lǎoshī <br> He is a teacher",
    img: "grammar1.png"
  },
  {
    title: "Subject + 不 + Verb",
    example: "Example: <br><br> 我不喜欢茶 <br> Wǒ bù xǐhuān chá <br> I don't like tea",
    img: "grammar2.png"
  },
  {
    title: "Subject + 有 + Object",
    example: "Example: <br><br> 她有一只猫 <br> Tā yǒu yī zhī māo <br> She has a cat",
    img: "grammar3.png"
  }
];

let grammarIndex = 0;

function showGrammar() {
  document.getElementById('grammar-title').textContent = grammarPoints[grammarIndex].title;
  document.getElementById('grammar-example').innerHTML = grammarPoints[grammarIndex].example;
  document.getElementById('grammar-img').src = grammarPoints[grammarIndex].img;
  document.getElementById('prev-grammar-btn').disabled = grammarIndex === 0;
  document.getElementById('next-grammar-btn').disabled = grammarIndex === grammarPoints.length - 1;
}

function nextGrammar() {
  if (grammarIndex < grammarPoints.length - 1) grammarIndex++;
  showGrammar();
}

function prevGrammar() {
  if (grammarIndex > 0) grammarIndex--;
  showGrammar();
}

document.addEventListener('DOMContentLoaded', showGrammar);

//Conversation
const conversations = [
  {
    dialogue: [
      "<p><strong>A:</strong> 你好！<br> Nǐ hǎo! <br> Hello!</p>",
      "<p><strong>B:</strong> 你好！<br> Nǐ hǎo! <br> Hello!</p>"
    ],
    img: "Hello.png"
  },
  {
    dialogue: [
      "<p><strong>A:</strong> 你好吗？<br> Nǐ hǎo ma? <br> How are you?</p>",
      "<p><strong>B:</strong> 我很好 <br> Wǒ hěn hǎo <br> I’m fine</p>"
    ],
    img: "convo2.png"
  },
  {
    dialogue: [
      "<p><strong>A:</strong> 请问，你叫什么名字？<br> Qǐng wèn, nǐ jiào shénme míngzi? <br> May I ask, what’s your name?</p>",
      "<p><strong>B:</strong> 我叫李雷。<br> Wǒ jiào Lǐ Léi. <br> My name is Li Lei.</p>"
    ],
    img: "convo3.png"
  }
];

let convoIndex = 0;

function showConversation() {
  document.getElementById('dialogue').innerHTML = conversations[convoIndex].dialogue.join('');
  document.getElementById('conversation-img').src = conversations[convoIndex].img;
  document.getElementById('prev-convo-btn').disabled = convoIndex === 0;
  document.getElementById('next-convo-btn').disabled = convoIndex === conversations.length - 1;
}

function nextConversation() {
  if (convoIndex < conversations.length - 1) convoIndex++;
  showConversation();
}

function prevConversation() {
  if (convoIndex > 0) convoIndex--;
  showConversation();
}

document.addEventListener('DOMContentLoaded', showConversation);
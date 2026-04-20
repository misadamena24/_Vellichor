const TOTAL_LEVELS = 100;
const QUESTIONS_PER_LEVEL = 10;
const PASS_MARK = 6;

const EASY_QUESTIONS = [
  { q: "Who wrote Pride and Prejudice?", options: ["Jane Austen", "Emily Bronte", "George Eliot", "Virginia Woolf"], answer: 0 },
  { q: "Who wrote Hamlet?", options: ["William Shakespeare", "Christopher Marlowe", "Ben Jonson", "John Milton"], answer: 0 },
  { q: "Who wrote 1984?", options: ["George Orwell", "Aldous Huxley", "Ray Bradbury", "H. G. Wells"], answer: 0 },
  { q: "Who wrote Moby-Dick?", options: ["Herman Melville", "Mark Twain", "Nathaniel Hawthorne", "Jack London"], answer: 0 },
  { q: "Who wrote To Kill a Mockingbird?", options: ["Harper Lee", "Flannery O'Connor", "Toni Morrison", "Maya Angelou"], answer: 0 },
  { q: "The Odyssey is traditionally attributed to which poet?", options: ["Homer", "Virgil", "Sophocles", "Ovid"], answer: 0 },
  { q: "Romeo and Juliet is primarily a:", options: ["Tragedy", "Comedy", "Epic poem", "Satire"], answer: 0 },
  { q: "Who wrote Dracula?", options: ["Bram Stoker", "Mary Shelley", "Oscar Wilde", "Robert Louis Stevenson"], answer: 0 },
  { q: "Who wrote Alice's Adventures in Wonderland?", options: ["Lewis Carroll", "J. M. Barrie", "E. Nesbit", "C. S. Lewis"], answer: 0 },
  { q: "Who is the narrator of The Great Gatsby?", options: ["Nick Carraway", "Jay Gatsby", "Tom Buchanan", "George Wilson"], answer: 0 },
  { q: "Who wrote The Adventures of Huckleberry Finn?", options: ["Mark Twain", "Charles Dickens", "Louisa May Alcott", "Walt Whitman"], answer: 0 },
  { q: "Who wrote Frankenstein?", options: ["Mary Shelley", "Bram Stoker", "Edgar Allan Poe", "Ann Radcliffe"], answer: 0 },
  { q: "Who wrote Don Quixote?", options: ["Miguel de Cervantes", "Lope de Vega", "Gabriel Garcia Marquez", "Jorge Luis Borges"], answer: 0 },
  { q: "Animal Farm is best described as a:", options: ["Political allegory", "Detective novel", "Romantic comedy", "Memoir"], answer: 0 },
  { q: "Who wrote Jane Eyre?", options: ["Charlotte Bronte", "Emily Bronte", "Anne Bronte", "George Eliot"], answer: 0 },
  { q: "In which book does the phrase 'Big Brother' appear?", options: ["1984", "Brave New World", "Fahrenheit 451", "The Handmaid's Tale"], answer: 0 },
  { q: "Which epic centers on the Trojan War?", options: ["The Iliad", "The Aeneid", "The Odyssey", "Metamorphoses"], answer: 0 },
  { q: "Who wrote The Raven?", options: ["Edgar Allan Poe", "Walt Whitman", "Emily Dickinson", "Robert Frost"], answer: 0 },
  { q: "Holden Caulfield is the main character of:", options: ["The Catcher in the Rye", "Lord of the Flies", "A Separate Peace", "On the Road"], answer: 0 },
  { q: "The Little Prince was originally written in:", options: ["French", "English", "Spanish", "Italian"], answer: 0 },
  { q: "Macbeth is set mainly in:", options: ["Scotland", "Denmark", "Rome", "France"], answer: 0 },
  { q: "Sherlock Holmes was created by:", options: ["Arthur Conan Doyle", "Agatha Christie", "G. K. Chesterton", "Wilkie Collins"], answer: 0 },
  { q: "Who wrote Lord of the Flies?", options: ["William Golding", "George Orwell", "J. R. R. Tolkien", "Aldous Huxley"], answer: 0 },
  { q: "Who wrote War and Peace?", options: ["Leo Tolstoy", "Fyodor Dostoevsky", "Anton Chekhov", "Ivan Turgenev"], answer: 0 },
  { q: "Who wrote Wuthering Heights?", options: ["Emily Bronte", "Charlotte Bronte", "Anne Bronte", "George Eliot"], answer: 0 },
  { q: "Who wrote One Hundred Years of Solitude?", options: ["Gabriel Garcia Marquez", "Isabel Allende", "Mario Vargas Llosa", "Carlos Fuentes"], answer: 0 },
  { q: "Gregor Samsa appears in which work?", options: ["The Metamorphosis", "The Trial", "The Stranger", "Nausea"], answer: 0 },
  { q: "Who wrote Fahrenheit 451?", options: ["Ray Bradbury", "Isaac Asimov", "George Orwell", "Philip K. Dick"], answer: 0 },
  { q: "Who wrote Brave New World?", options: ["Aldous Huxley", "George Orwell", "H. G. Wells", "Kurt Vonnegut"], answer: 0 },
  { q: "Of Mice and Men is set during which period?", options: ["The Great Depression", "World War I", "The Victorian era", "The Renaissance"], answer: 0 }
];

const MEDIUM_QUESTIONS = [
  { q: "George Eliot was the pen name of:", options: ["Mary Ann Evans", "Charlotte Bronte", "Mary Shelley", "Edith Wharton"], answer: 0 },
  { q: "Odysseus' wife in The Odyssey is:", options: ["Penelope", "Helen", "Andromache", "Clytemnestra"], answer: 0 },
  { q: "Who wrote Paradise Lost?", options: ["John Milton", "Alexander Pope", "Geoffrey Chaucer", "William Blake"], answer: 0 },
  { q: "Which line opens Shakespeare's Sonnet 18?", options: ["Shall I compare thee to a summer's day?", "Let me not to the marriage of true minds", "My mistress' eyes are nothing like the sun", "When in disgrace with fortune and men's eyes"], answer: 0 },
  { q: "Who wrote Crime and Punishment?", options: ["Fyodor Dostoevsky", "Leo Tolstoy", "Nikolai Gogol", "Anton Chekhov"], answer: 0 },
  { q: "Who wrote Invisible Man?", options: ["Ralph Ellison", "Richard Wright", "James Baldwin", "Langston Hughes"], answer: 0 },
  { q: "Who wrote Beloved?", options: ["Toni Morrison", "Alice Walker", "Zora Neale Hurston", "Maya Angelou"], answer: 0 },
  { q: "James Joyce's Ulysses is set in:", options: ["Dublin", "London", "Paris", "Rome"], answer: 0 },
  { q: "Which novel opens with 'Call me Ishmael.'?", options: ["Moby-Dick", "The Old Man and the Sea", "Billy Budd", "Typee"], answer: 0 },
  { q: "Who wrote Waiting for Godot?", options: ["Samuel Beckett", "Eugene Ionesco", "Harold Pinter", "Jean Genet"], answer: 0 },
  { q: "Who wrote Things Fall Apart?", options: ["Chinua Achebe", "Ngugi wa Thiong'o", "Wole Soyinka", "Ama Ata Aidoo"], answer: 0 },
  { q: "Who wrote Candide?", options: ["Voltaire", "Rousseau", "Diderot", "Moliere"], answer: 0 },
  { q: "The narrator of Great Expectations is:", options: ["Pip", "David Copperfield", "Oliver Twist", "Sydney Carton"], answer: 0 },
  { q: "Literary modernism is most associated with which period?", options: ["Early 20th century", "Late 18th century", "Mid 17th century", "Early 21st century"], answer: 0 },
  { q: "Stream of consciousness is strongly associated with:", options: ["Virginia Woolf", "Jane Austen", "Charles Dickens", "Graham Greene"], answer: 0 },
  { q: "Who wrote Ozymandias?", options: ["Percy Bysshe Shelley", "John Keats", "Lord Byron", "William Wordsworth"], answer: 0 },
  { q: "Jorge Luis Borges was from:", options: ["Argentina", "Chile", "Spain", "Mexico"], answer: 0 },
  { q: "The Divine Comedy includes Inferno, Purgatorio, and:", options: ["Paradiso", "Averno", "Elysium", "Olympus"], answer: 0 },
  { q: "Who wrote The Count of Monte Cristo?", options: ["Alexandre Dumas", "Victor Hugo", "Honore de Balzac", "Gustave Flaubert"], answer: 0 },
  { q: "Who wrote The Handmaid's Tale?", options: ["Margaret Atwood", "Doris Lessing", "Ursula K. Le Guin", "A. S. Byatt"], answer: 0 },
  { q: "Who wrote The Trial?", options: ["Franz Kafka", "Thomas Mann", "Robert Musil", "Hermann Hesse"], answer: 0 },
  { q: "Who wrote A Doll's House?", options: ["Henrik Ibsen", "August Strindberg", "Anton Chekhov", "Bertolt Brecht"], answer: 0 },
  { q: "Who wrote Midnight's Children?", options: ["Salman Rushdie", "Arundhati Roy", "V. S. Naipaul", "R. K. Narayan"], answer: 0 },
  { q: "Who wrote The Stranger?", options: ["Albert Camus", "Jean-Paul Sartre", "Andre Gide", "Marcel Proust"], answer: 0 },
  { q: "Who narrates Heart of Darkness?", options: ["Marlow", "Kurtz", "Jim", "Conrad"], answer: 0 },
  { q: "Emma Woodhouse is the protagonist of:", options: ["Emma", "Sense and Sensibility", "Mansfield Park", "Persuasion"], answer: 0 },
  { q: "Beowulf was composed in:", options: ["Old English", "Middle English", "Old Norse", "Latin"], answer: 0 },
  { q: "A traditional haiku usually follows which syllable pattern?", options: ["5-7-5", "4-4-4", "8-6-8", "7-7-7"], answer: 0 },
  { q: "Who wrote A Room of One's Own?", options: ["Virginia Woolf", "Simone de Beauvoir", "George Eliot", "Gertrude Stein"], answer: 0 },
  { q: "Who wrote The Waste Land?", options: ["T. S. Eliot", "Ezra Pound", "W. B. Yeats", "W. H. Auden"], answer: 0 }
];

const HARD_QUESTIONS = [
  { q: "Who wrote Pedro Paramo?", options: ["Juan Rulfo", "Julio Cortazar", "Alejo Carpentier", "Octavio Paz"], answer: 0 },
  { q: "Who wrote The Name of the Rose?", options: ["Umberto Eco", "Italo Calvino", "Primo Levi", "Alberto Moravia"], answer: 0 },
  { q: "Who wrote Season of Migration to the North?", options: ["Tayeb Salih", "Naguib Mahfouz", "Ahdaf Soueif", "Hanan al-Shaykh"], answer: 0 },
  { q: "Who wrote The Tale of Genji?", options: ["Murasaki Shikibu", "Sei Shonagon", "Yosano Akiko", "Izumi Shikibu"], answer: 0 },
  { q: "In the Bhagavad Gita, Krishna speaks primarily to:", options: ["Arjuna", "Bhishma", "Yudhishthira", "Karna"], answer: 0 },
  { q: "Who wrote Faust?", options: ["Johann Wolfgang von Goethe", "Friedrich Schiller", "Heinrich Heine", "Novalis"], answer: 0 },
  { q: "Who wrote Wide Sargasso Sea?", options: ["Jean Rhys", "Daphne du Maurier", "Angela Carter", "Muriel Spark"], answer: 0 },
  { q: "Who wrote If on a winter's night a traveler?", options: ["Italo Calvino", "Umberto Eco", "Milan Kundera", "Thomas Pynchon"], answer: 0 },
  { q: "Who wrote The Master and Margarita?", options: ["Mikhail Bulgakov", "Vladimir Nabokov", "Boris Pasternak", "Alexander Solzhenitsyn"], answer: 0 },
  { q: "Who wrote No Longer Human?", options: ["Osamu Dazai", "Yukio Mishima", "Kobo Abe", "Natsume Soseki"], answer: 0 },
  { q: "Who wrote The Tin Drum?", options: ["Gunter Grass", "Thomas Mann", "Heinrich Boll", "W. G. Sebald"], answer: 0 },
  { q: "Who wrote The God of Small Things?", options: ["Arundhati Roy", "Anita Desai", "Kiran Desai", "Jhumpa Lahiri"], answer: 0 },
  { q: "Who wrote The Leopard (Il Gattopardo)?", options: ["Giuseppe Tomasi di Lampedusa", "Italo Svevo", "Cesare Pavese", "Natalia Ginzburg"], answer: 0 },
  { q: "Who wrote The Remains of the Day?", options: ["Kazuo Ishiguro", "Julian Barnes", "Ian McEwan", "Graham Swift"], answer: 0 },
  { q: "Who wrote The Unbearable Lightness of Being?", options: ["Milan Kundera", "Bohumil Hrabal", "Vladimir Nabokov", "Ivan Klima"], answer: 0 },
  { q: "Who wrote Blindness?", options: ["Jose Saramago", "Fernando Pessoa", "Antonio Lobo Antunes", "Eca de Queiros"], answer: 0 },
  { q: "Who wrote The House of the Spirits?", options: ["Isabel Allende", "Elena Poniatowska", "Clarice Lispector", "Rosario Castellanos"], answer: 0 },
  { q: "Who wrote The Sound and the Fury?", options: ["William Faulkner", "Ernest Hemingway", "John Steinbeck", "F. Scott Fitzgerald"], answer: 0 },
  { q: "Who wrote Pale Fire?", options: ["Vladimir Nabokov", "Joseph Brodsky", "Isaac Babel", "Andrei Bely"], answer: 0 },
  { q: "The narrator of Lolita is:", options: ["Humbert Humbert", "Quilty", "John Ray", "Dolores Haze"], answer: 0 },
  { q: "Who wrote Blood Meridian?", options: ["Cormac McCarthy", "Don DeLillo", "Thomas Pynchon", "William Gaddis"], answer: 0 },
  { q: "Who wrote The Left Hand of Darkness?", options: ["Ursula K. Le Guin", "Octavia E. Butler", "Joanna Russ", "Margaret Atwood"], answer: 0 },
  { q: "Who wrote Never Let Me Go?", options: ["Kazuo Ishiguro", "Ian McEwan", "David Mitchell", "Hanif Kureishi"], answer: 0 },
  { q: "Who wrote 2666?", options: ["Roberto Bolano", "Javier Marias", "Cesar Aira", "Carlos Fuentes"], answer: 0 },
  { q: "Who wrote The Book of Disquiet?", options: ["Fernando Pessoa", "Jose Saramago", "Miguel Torga", "Camilo Castelo Branco"], answer: 0 },
  { q: "Who wrote The Sea, The Sea?", options: ["Iris Murdoch", "Muriel Spark", "Penelope Fitzgerald", "Doris Lessing"], answer: 0 },
  { q: "Who wrote Disgrace?", options: ["J. M. Coetzee", "Nadine Gordimer", "Andre Brink", "Athol Fugard"], answer: 0 },
  { q: "Persepolis is primarily a:", options: ["Graphic memoir", "Epic poem", "Detective novel", "Verse drama"], answer: 0 },
  { q: "The term 'objective correlative' is associated with:", options: ["T. S. Eliot", "I. A. Richards", "F. R. Leavis", "Cleanth Brooks"], answer: 0 },
  { q: "The phrase 'negative capability' was coined by:", options: ["John Keats", "Samuel Taylor Coleridge", "William Wordsworth", "Percy Bysshe Shelley"], answer: 0 }
];

const memberLibraryId = sessionStorage.getItem("memberLibraryId") || "guest";
const STORAGE_KEY = "vellichorQuizProgress_" + memberLibraryId;

let progress = loadProgress();
let currentLevel = null;
let currentQuestions = [];
let currentQuestionIndex = 0;
let selectedAnswers = [];
let lastResultPassed = false;

const progressText = document.getElementById("quizProgressText");
const passedText = document.getElementById("quizPassedText");
const levelsGrid = document.getElementById("quizLevelsGrid");
const levelsSection = document.getElementById("quizLevelsSection");
const playSection = document.getElementById("quizPlaySection");
const resultSection = document.getElementById("quizResultSection");
const playTitle = document.getElementById("quizPlayTitle");
const playMeta = document.getElementById("quizPlayMeta");
const inlineMessage = document.getElementById("quizInlineMessage");
const questionText = document.getElementById("quizQuestionText");
const optionsForm = document.getElementById("quizOptionsForm");
const nextBtn = document.getElementById("quizNextBtn");
const backBtn = document.getElementById("quizBackBtn");
const resultTitle = document.getElementById("quizResultTitle");
const resultText = document.getElementById("quizResultText");
const retryBtn = document.getElementById("quizRetryBtn");
const nextLevelBtn = document.getElementById("quizNextLevelBtn");
const memberQuizzesQuoteText = document.getElementById("memberQuizzesQuoteText");
const memberQuizzesQuoteAuthor = document.getElementById("memberQuizzesQuoteAuthor");

loadRandomQuoteInto(memberQuizzesQuoteText, memberQuizzesQuoteAuthor);

function loadProgress() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return { highestPassed: 0 };
  }

  try {
    const parsed = JSON.parse(raw);
    const highestPassed = Number(parsed.highestPassed) || 0;
    return { highestPassed: Math.max(0, Math.min(TOTAL_LEVELS, highestPassed)) };
  } catch (_error) {
    return { highestPassed: 0 };
  }
}

function saveProgress() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

function getNextUnlockedLevel() {
  return Math.min(progress.highestPassed + 1, TOTAL_LEVELS);
}

function isLevelUnlocked(level) {
  return level <= getNextUnlockedLevel();
}

function updateProgressTexts() {
  const nextLevel = getNextUnlockedLevel();
  const complete = progress.highestPassed === TOTAL_LEVELS;

  passedText.textContent = progress.highestPassed + " / " + TOTAL_LEVELS;

  if (complete) {
    progressText.textContent = "All 100 levels completed";
    return;
  }

  progressText.textContent = "Next unlocked level: " + nextLevel;
}

function renderLevels() {
  levelsGrid.innerHTML = "";

  for (let level = 1; level <= TOTAL_LEVELS; level += 1) {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "member-level-card";

    const passed = level <= progress.highestPassed;
    const unlocked = isLevelUnlocked(level);

    if (passed) {
      card.classList.add("passed");
    } else if (!unlocked) {
      card.classList.add("locked");
      card.disabled = true;
    } else {
      card.classList.add("open");
    }

    const statusText = passed ? "Passed" : unlocked ? "Unlocked" : "Locked";
    card.innerHTML = "<strong>Level " + level + "</strong><span>" + statusText + "</span>";

    if (unlocked || passed) {
      card.addEventListener("click", function () {
        startLevel(level);
      });
    }

    levelsGrid.appendChild(card);
  }
}

function getDifficultyForLevel(level) {
  if (level <= 30) {
    return "easy";
  }

  if (level <= 70) {
    return "medium";
  }

  return "hard";
}

function getQuestionPoolsForLevel(level) {
  const diff = getDifficultyForLevel(level);

  if (diff === "easy") {
    return [EASY_QUESTIONS];
  }

  if (diff === "medium") {
    if (level <= 50) {
      return [EASY_QUESTIONS, MEDIUM_QUESTIONS];
    }
    return [MEDIUM_QUESTIONS];
  }

  if (level <= 85) {
    return [MEDIUM_QUESTIONS, HARD_QUESTIONS];
  }
  return [HARD_QUESTIONS];
}

function mulberry32(seed) {
  let state = seed >>> 0;
  return function () {
    state += 0x6D2B79F5;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffleDeterministic(list, seed) {
  const random = mulberry32(seed);
  const arr = list.slice();
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
  return arr;
}

function buildLevelQuestions(level) {
  const pools = getQuestionPoolsForLevel(level);
  const random = mulberry32(1000 + level * 97);
  const picked = [];
  const usedKeys = {};

  while (picked.length < QUESTIONS_PER_LEVEL) {
    const questionNumber = picked.length;
    const pool = pools[Math.floor(random() * pools.length)];
    const idx = Math.floor(random() * pool.length);
    const base = pool[idx];
    const key = base.q;

    if (usedKeys[key]) {
      continue;
    }
    usedKeys[key] = true;

    const optionPairs = base.options.map(function (text, optionIndex) {
      return { text: text, isCorrect: optionIndex === base.answer };
    });
    const shuffledOptions = shuffleDeterministic(optionPairs, level * 100 + questionNumber * 13 + idx);
    const answerIndex = shuffledOptions.findIndex(function (option) {
      return option.isCorrect;
    });

    picked.push({
      q: base.q,
      options: shuffledOptions.map(function (option) { return option.text; }),
      answer: answerIndex
    });
  }

  return picked;
}

function showSection(section) {
  levelsSection.hidden = section !== "levels";
  playSection.hidden = section !== "play";
  resultSection.hidden = section !== "result";
}

function startLevel(level) {
  if (!isLevelUnlocked(level) && level > progress.highestPassed) {
    return;
  }

  currentLevel = level;
  currentQuestions = buildLevelQuestions(level);
  currentQuestionIndex = 0;
  selectedAnswers = new Array(QUESTIONS_PER_LEVEL).fill(null);
  inlineMessage.textContent = "";

  showSection("play");
  renderCurrentQuestion();
}

function renderCurrentQuestion() {
  const question = currentQuestions[currentQuestionIndex];
  playTitle.textContent = "Level " + currentLevel;
  playMeta.textContent = "Question " + (currentQuestionIndex + 1) + " of " + QUESTIONS_PER_LEVEL;
  questionText.textContent = question.q;

  optionsForm.innerHTML = "";
  question.options.forEach(function (optionText, idx) {
    const label = document.createElement("label");
    label.className = "member-quiz-option";

    const input = document.createElement("input");
    input.type = "radio";
    input.name = "quizOption";
    input.value = String(idx);
    input.checked = selectedAnswers[currentQuestionIndex] === idx;

    input.addEventListener("change", function () {
      selectedAnswers[currentQuestionIndex] = idx;
      inlineMessage.textContent = "";
    });

    const text = document.createElement("span");
    text.textContent = optionText;

    label.appendChild(input);
    label.appendChild(text);
    optionsForm.appendChild(label);
  });

  nextBtn.textContent = currentQuestionIndex === QUESTIONS_PER_LEVEL - 1 ? "Finish Level" : "Next Question";
}

function goNext() {
  if (selectedAnswers[currentQuestionIndex] === null) {
    inlineMessage.textContent = "Please select an answer before moving on.";
    return;
  }

  if (currentQuestionIndex < QUESTIONS_PER_LEVEL - 1) {
    currentQuestionIndex += 1;
    renderCurrentQuestion();
    return;
  }

  finishLevel();
}

function finishLevel() {
  let correct = 0;
  for (let i = 0; i < QUESTIONS_PER_LEVEL; i += 1) {
    if (selectedAnswers[i] === currentQuestions[i].answer) {
      correct += 1;
    }
  }

  const passed = correct >= PASS_MARK;
  lastResultPassed = passed;

  if (passed && currentLevel > progress.highestPassed) {
    progress.highestPassed = currentLevel;
    saveProgress();
  }

  const needed = PASS_MARK;
  const remaining = TOTAL_LEVELS - progress.highestPassed;

  if (passed) {
    resultTitle.textContent = "Level " + currentLevel + " Passed";
    resultText.textContent = "You scored " + correct + "/10. Pass mark is " + needed + "/10. Keep going - " + remaining + " levels left.";
  } else {
    resultTitle.textContent = "Level " + currentLevel + " Not Passed";
    resultText.textContent = "You scored " + correct + "/10. You need at least " + needed + "/10 to unlock the next level.";
  }

  nextLevelBtn.hidden = !passed || currentLevel >= TOTAL_LEVELS;
  showSection("result");
  updateProgressTexts();
  renderLevels();
}

nextBtn.addEventListener("click", goNext);

backBtn.addEventListener("click", function () {
  showSection("levels");
});

retryBtn.addEventListener("click", function () {
  if (currentLevel) {
    startLevel(currentLevel);
  }
});

nextLevelBtn.addEventListener("click", function () {
  if (!lastResultPassed) {
    return;
  }

  const next = currentLevel + 1;
  if (next <= TOTAL_LEVELS && isLevelUnlocked(next)) {
    startLevel(next);
    return;
  }

  showSection("levels");
});

updateProgressTexts();
renderLevels();
showSection("levels");

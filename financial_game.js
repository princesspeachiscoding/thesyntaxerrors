// Game state
let currentScenarioIndex = 0;
let points = 0;
let streak = 0;
let gameData = {
  correctPoints: 10,
  incorrectPoints: -5
};

// Game data - Adding the new scenarios
const scenarios = [
  {
    story: "It’s a big day—you're moving to a new city for a job you’ve dreamed about for years. The offer was too good to pass up, and you’re excited about the future. However, moving means a lot of upfront costs. Rent is high in the new city, and you need to buy new furniture. It’s easy to get caught up in the excitement and overspend, but you’re also aware of the importance of staying financially healthy.",
    choices: [
      {
        text: "Spend all on essentials (high rent, low furniture)",
        effect: { rent: 1200, newFurniture: 0, entertainment: 100, savings: 0, correct: false, explanation: "You focused too much on essentials and entertainment, leaving no room for savings." },
        lesson: "Remember the 50/30/20 rule: 50% to needs, 30% to wants, 20% to savings."
      },
      {
        text: "Prioritize essentials, cut back on entertainment, save more",
        effect: { rent: 1200, newFurniture: 0, entertainment: 50, savings: 100, correct: true, explanation: "You stuck to a balanced budget and saved for the future!" },
        lesson: "Following the 50/30/20 rule helps you keep your spending balanced and secure your financial future."
      },
      {
        text: "Buy all the furniture but skip rent and savings",
        effect: { rent: 500, newFurniture: 500, entertainment: 100, savings: 0, correct: false, explanation: "You overspent on non-essentials like furniture and ignored your rent and savings." },
        lesson: "Make sure to prioritize your essential expenses like rent and savings before splurging on things like furniture."
      }
    ]
  },
  {
    story: "Your best friend is getting married, and you’ve been given the honor of being their Maid of Honor. While you’re thrilled for them, you realize that this is going to be an expensive few months. There’s the dress, travel expenses, the bachelorette party, and don’t forget the wedding gift. You want to be a supportive friend, but how do you juggle all this while staying on top of your bills?",
    choices: [
      {
        text: "Overspend on travel and gift, cutting back on essentials",
        effect: { rent: 900, groceries: 200, travelExpenses: 500, entertainment: 150, savings: 0, correct: false, explanation: "You spent too much on the wedding and neglected your basic needs." },
        lesson: "Consider adjusting the 50/30/20 rule to fit short-term goals like saving for a wedding."
      },
      {
        text: "Cut down on entertainment and grocery costs, stay on budget",
        effect: { rent: 900, groceries: 150, travelExpenses: 350, entertainment: 50, savings: 50, correct: true, explanation: "You made sacrifices to make it work while still saving a little for emergencies." },
        lesson: "Trim non-essential spending to focus on large expenses like weddings and travel, but still aim to save."
      },
      {
        text: "Save no money, focus only on the wedding expenses",
        effect: { rent: 900, groceries: 250, travelExpenses: 350, entertainment: 150, savings: 0, correct: false, explanation: "You ignored saving for emergencies in favor of spending on the wedding." },
        lesson: "It’s important to prioritize savings even during events that require large expenses."
      }
    ]
  },
  {
    story: "You’ve been living your best life—going out with friends, traveling, and generally enjoying yourself. But then, disaster strikes: your car breaks down and it’s going to cost $800 to repair. You didn’t see this coming, and now you need to find a way to cover the repair without disrupting your life too much.",
    choices: [
      {
        text: "Use your savings to pay for the repair",
        effect: { rent: 950, groceries: 200, emergencyRepair: 800, entertainment: 75, savings: -50, correct: true, explanation: "You covered the unexpected expense using your savings, but it's a reminder of why emergency funds are essential." },
        lesson: "Building an emergency fund can help cover unexpected costs and avoid financial strain."
      },
      {
        text: "Skip the repair, cut back on rent",
        effect: { rent: 500, groceries: 200, emergencyRepair: 0, entertainment: 75, savings: 0, correct: false, explanation: "You avoided the repair, but now you’re dealing with a broken car. Prioritize essential expenses!" },
        lesson: "Sometimes you have to use your savings for emergencies. Skipping repairs can lead to more problems."
      },
      {
        text: "Use a credit card for the repair, focus on paying off debt later",
        effect: { rent: 950, groceries: 200, emergencyRepair: 800, entertainment: 75, savings: 0, correct: false, explanation: "You used credit, which could lead to high-interest debt. Try to save for emergencies rather than relying on credit." },
        lesson: "Using credit for emergencies can be costly due to interest. Build an emergency fund to avoid this."
      }
    ]
  },
  {
    story: "You've always dreamed of a vacation to Italy, and now you’ve finally got the chance to go. The trip would cost $2,500, and you plan to take it in six months. You’re excited, but the reality of budgeting for such a big expense hits you. How can you make this dream vacation a reality without sacrificing everything else?",
    choices: [
      {
        text: "Ignore savings, spend more on the vacation",
        effect: { rent: 1000, groceries: 250, vacationFund: 800, entertainment: 150, savings: 0, correct: false, explanation: "You spent too much on the vacation and ignored savings." },
        lesson: "You can prioritize big goals like vacations, but always ensure savings and essential expenses are covered first."
      },
      {
        text: "Save aggressively for the trip, reduce entertainment expenses",
        effect: { rent: 1000, groceries: 250, vacationFund: 400, entertainment: 50, savings: 50, correct: true, explanation: "You’re saving efficiently for the vacation and still putting some money aside for emergencies." },
        lesson: "Balance your goals by reducing non-essential spending. The 50/30/20 rule can help you stay on track."
      },
      {
        text: "Ignore the vacation and focus solely on savings",
        effect: { rent: 1000, groceries: 250, vacationFund: 0, entertainment: 100, savings: 200, correct: false, explanation: "You focused too much on savings and ignored the vacation fund." },
        lesson: "It’s important to save for long-term goals, but you can balance short-term pleasures like vacations too."
      }
    ]
  },
  {
    story: "You’ve just received a promotion at work with a nice pay raise. However, the increased income has come with some new responsibilities and lifestyle changes. You’ve always wanted to treat yourself to more luxury items, but how do you handle this pay raise without going overboard?",
    choices: [
      {
        text: "Increase your spending on luxury items and entertainment",
        effect: { rent: 950, groceries: 250, newClothes: 200, entertainment: 200, savings: 0, correct: false, explanation: "You’ve increased your lifestyle spending without saving enough for future goals." },
        lesson: "Lifestyle inflation can be dangerous. Stick to the 50/30/20 rule to make sure you're saving and investing your extra income."
      },
      {
        text: "Focus on saving and investing the extra income, reduce non-essentials",
        effect: { rent: 950, groceries: 250, newClothes: 150, entertainment: 100, savings: 150, correct: true, explanation: "You’ve focused on savings and investing your extra income, helping secure your financial future." },
        lesson: "When you get a pay raise, try to save and invest the extra income instead of spending it all on luxuries."
      },
      {
        text: "Increase spending on everything, ignore savings",
        effect: { rent: 950, groceries: 250, newClothes: 300, entertainment: 200, savings: 0, correct: false, explanation: "You’ve gone overboard with spending on luxuries, neglecting your savings." },
        lesson: "Lifestyle inflation can lead to overspending. Always keep your savings and investments as priorities."
      }
    ]
  }
];


  
function startGame() {
    showScenario(scenarios[currentScenarioIndex]);
  }
  
  function showScenario(scenario) {
    const storyElement = document.getElementById("story");
    const choicesElement = document.getElementById("choices");
    const streakElement = document.getElementById("streak");
    const pointsElement = document.getElementById("points");
    const lessonElement = document.getElementById("lesson");
    const nextButtonElement = document.getElementById("nextButton");
    const resultsElement = document.getElementById("results");
  
    // Display the story
    storyElement.textContent = scenario.story;
  
    // Display the choices (bubbled options)
    choicesElement.innerHTML = '';
    scenario.choices.forEach((choice, index) => {
      const button = document.createElement("button");
      button.textContent = choice.text;
      button.classList.add('bubble');
      button.onclick = () => handleChoice(choice, button);
      choicesElement.appendChild(button);
    });
  
    // Update streak and points display
    streakElement.textContent = `Streak: ${streak}`;
    pointsElement.textContent = `Points: ${points}`;
  
    // Hide "Next" button initially
    nextButtonElement.style.display = 'none';
  
    // Clear results and lesson
    resultsElement.textContent = '';
    lessonElement.textContent = '';
  }
  
  function handleChoice(choice, button) {
    const resultsElement = document.getElementById("results");
    const lessonElement = document.getElementById("lesson");
    const nextButtonElement = document.getElementById("nextButton");
  
    // Update points based on the answer
    if (choice.effect.correct) {
      points += gameData.correctPoints;
      streak++;
      button.classList.add("correct");
      resultsElement.textContent = "Correct! You earned points.";
    } else {
      points += gameData.incorrectPoints;
      streak = 0;
      button.classList.add("incorrect");
      resultsElement.textContent = "Incorrect! You lost points.";
    }
  
    // Display explanation and lesson
    lessonElement.textContent = choice.explanation + " " + choice.lesson;
  
    // Show "Next" button after answer
    nextButtonElement.style.display = 'inline-block';
    nextButtonElement.onclick = () => nextScenario();
  }
  
  function nextScenario() {
    // Proceed to next scenario
    currentScenarioIndex++;
    if (currentScenarioIndex < scenarios.length) {
      setTimeout(() => showScenario(scenarios[currentScenarioIndex]), 1000);
    } else {
      setTimeout(() => {
        alert("Game Over! Final Score: " + points);
      }, 1000);
    }
  }
  
  startGame();
// Types for dice rolling
enum DiceType {
  NORMAL = "normal",
  HUNGER = "hunger",
}

interface DiceResult {
  value: number;
  type: DiceType;
}

interface RollResults {
  normal: number[];
  hunger: number[];
}

// Dice rolling logic
function rollD10(): number {
  return Math.floor(Math.random() * 10) + 1;
}

function rollDicePool(count: number, type: DiceType): number[] {
  const results: number[] = [];
  for (let i = 0; i < count; i++) {
    results.push(rollD10());
  }
  return results;
}

// DOM manipulation
function createDiceElement(value: number, type: DiceType): HTMLElement {
  const diceDiv = document.createElement("div");
  diceDiv.className = `dice ${type}`;

  // Add special classes for critical results
  if (value === 10) {
    diceDiv.classList.add("critical-success");
  } else if (value === 1) {
    diceDiv.classList.add("critical-fail");
  } else if (value >= 6) {
    diceDiv.classList.add("success");
  }

  diceDiv.textContent = value.toString();

  // Add animation
  diceDiv.style.animation = "diceRoll 0.5s ease-out";

  return diceDiv;
}

function displayResults(results: RollResults): void {
  const normalContainer = document.getElementById(
    "normalResults",
  ) as HTMLElement;
  const hungerContainer = document.getElementById(
    "hungerResults",
  ) as HTMLElement;
  const summaryContainer = document.getElementById("summary") as HTMLElement;

  // Clear previous results
  normalContainer.innerHTML = "";
  hungerContainer.innerHTML = "";
  summaryContainer.innerHTML = "";

  // Display normal dice
  if (results.normal.length > 0) {
    results.normal.forEach((value) => {
      normalContainer.appendChild(createDiceElement(value, DiceType.NORMAL));
    });
  } else {
    normalContainer.innerHTML = '<p class="no-dice">Brak kości</p>';
  }

  // Display hunger dice
  if (results.hunger.length > 0) {
    results.hunger.forEach((value) => {
      hungerContainer.appendChild(createDiceElement(value, DiceType.HUNGER));
    });
  } else {
    hungerContainer.innerHTML = '<p class="no-dice">Brak kości</p>';
  }

  // Calculate and display summary
  const allDice = [...results.normal, ...results.hunger];

  // White dice: Count 10s for pairs
  const normalTens = results.normal.filter((v) => v === 10).length;
  const pairsOfTens = Math.floor(normalTens / 2);
  const unpairedTens = normalTens % 2;

  // Calculate successes:
  // White dice: 6-9 = 1 success each (not counting 10s yet)
  let successes = results.normal.filter((v) => v >= 6 && v <= 9).length;

  // Each PAIR of 10s on white dice = 4 successes
  successes += pairsOfTens * 4;

  // Unpaired 10s on white dice = 1 success each
  successes += unpairedTens;

  // Red (hunger) dice: 6-9 and 10 = 1 success each
  successes += results.hunger.filter((v) => v >= 6).length;

  // Check for special conditions on red dice
  const hungerOnes = results.hunger.filter((v) => v === 1).length;
  const hungerTens = results.hunger.filter((v) => v === 10).length;

  // Bestial failure: has 1 on red dice AND test failed (0 successes)
  const bestialFailure = hungerOnes > 0 && successes === 0;

  // Messy critical: has 10 on red dice AND there are critical pairs on white
  const messyCritical = hungerTens > 0 && pairsOfTens > 0;

  const totalOnes = allDice.filter((v) => v === 1).length;

  let summaryHTML = `
        <div class="summary-stats">
            <div class="stat">
                <span class="stat-label">Sukcesy:</span>
                <span class="stat-value">${successes}</span>
            </div>
            ${
              pairsOfTens > 0
                ? `
            <div class="stat">
                <span class="stat-label">Krytyczne zwycięstwo (pary 10):</span>
                <span class="stat-value critical">${pairsOfTens} ${
                  pairsOfTens === 1 ? "para" : "pary"
                }</span>
            </div>`
                : ""
            }
            ${
              messyCritical
                ? `
            <div class="stat">
                <span class="stat-label">⚠️ Krwawa wygrana:</span>
                <span class="stat-value critical">TAK</span>
            </div>`
                : ""
            }
            ${
              bestialFailure
                ? `
            <div class="stat">
                <span class="stat-label">💀 Bestialska porażka:</span>
                <span class="stat-value fail">TAK</span>
            </div>`
                : ""
            }
            ${
              totalOnes > 0
                ? `
            <div class="stat">
                <span class="stat-label">Jedynki:</span>
                <span class="stat-value fail">${totalOnes}</span>
            </div>`
                : ""
            }
        </div>
    `;

  summaryContainer.innerHTML = summaryHTML;
}

// Event handlers
function setupEventListeners(): void {
  const rollButton = document.getElementById("rollButton") as HTMLButtonElement;
  const normalDiceInput = document.getElementById(
    "normalDice",
  ) as HTMLInputElement;
  const hungerDiceInput = document.getElementById(
    "hungerDice",
  ) as HTMLInputElement;

  const increaseNormal = document.getElementById(
    "increaseNormal",
  ) as HTMLButtonElement;
  const decreaseNormal = document.getElementById(
    "decreaseNormal",
  ) as HTMLButtonElement;
  const increaseHunger = document.getElementById(
    "increaseHunger",
  ) as HTMLButtonElement;
  const decreaseHunger = document.getElementById(
    "decreaseHunger",
  ) as HTMLButtonElement;

  // Roll button handler
  rollButton.addEventListener("click", () => {
    const normalCount = parseInt(normalDiceInput.value) || 0;
    const hungerCount = parseInt(hungerDiceInput.value) || 0;

    if (normalCount === 0 && hungerCount === 0) {
      alert("Wybierz przynajmniej jedną kość!");
      return;
    }

    const results: RollResults = {
      normal: rollDicePool(normalCount, DiceType.NORMAL),
      hunger: rollDicePool(hungerCount, DiceType.HUNGER),
    };

    displayResults(results);

    // Add visual feedback to button
    rollButton.classList.add("rolling");
    setTimeout(() => {
      rollButton.classList.remove("rolling");
    }, 500);
  });

  // Counter button handlers
  increaseNormal.addEventListener("click", () => {
    const current = parseInt(normalDiceInput.value) || 0;
    if (current < 20) {
      normalDiceInput.value = (current + 1).toString();
    }
  });

  decreaseNormal.addEventListener("click", () => {
    const current = parseInt(normalDiceInput.value) || 0;
    if (current > 0) {
      normalDiceInput.value = (current - 1).toString();
    }
  });

  increaseHunger.addEventListener("click", () => {
    const current = parseInt(hungerDiceInput.value) || 0;
    if (current < 20) {
      hungerDiceInput.value = (current + 1).toString();
    }
  });

  decreaseHunger.addEventListener("click", () => {
    const current = parseInt(hungerDiceInput.value) || 0;
    if (current > 0) {
      hungerDiceInput.value = (current - 1).toString();
    }
  });

  // Allow Enter key to roll
  normalDiceInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      rollButton.click();
    }
  });

  hungerDiceInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      rollButton.click();
    }
  });
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  setupEventListeners();
});

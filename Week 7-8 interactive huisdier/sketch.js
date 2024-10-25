// all variables needed for image's and for music
let Idle, happy, food, unhappy, Sick, Died;
let bgDay, bgNight;
let shopshelf;
let pccoins;
let bgmg, normaleplatformimg, deathplatformimg;
let hitSound, MinigameSound;
let BGSoundMain, PSadSound;
let BGHalloween, BGSoundHalloween;
let BGinventory;

// all variables needed for the shop opening and buying stuff
let shopOpen = false;
let appleCost = 5;
let rodCost = 10;
let pillCost = 15;
let toyCost = 2;

// all variables needed for the colliders for minigame
let colliderHeight = 20
let colliderWidth = 85;
let colliderYOffset = 50;
let colliderXOffset = 80;

// all variables needed for the player
let player;
let gravity = 0.5;
let jumpForce = 15;
let isJumping = false;

// all variables needed to use the mingame
let playminigame = false;
let normaleplatform = [];
let deathplatform = [];
let score = 0;
let showScore = false;
const platformCount = 9;
let minigameStartScreen = false;
let minigameStarted = false;
let relocationInterval;

// all variables needed for the inventory
let inventoryVisible = false;

// all variables stats needed to save
let stats = {
  hunger: 100,
  happiness: 100,
  energy: 100,
  healthy: 100,
  coins: 0,
  apple: 4,
  rod: 5,
  pill: 2,
  toy: 8,
  highscore: 0
};

// all variables needed to save the game
let statsSaved = false;
let saveButtonVisible = false;
let animaleDied = false;

// Decrease rates
let hungerDecreaseRate = 80;
let happyDecreaseRate = 90;
let energyDecreaseRate = 120;
let healthyDecreaseRate = 60;
let coinsIncreaseRate = 60;

// Counters
let hungerCounter = 0;
let happyCounter = 0;
let energyCounter = 0;
let healthyCounter = 0;
let coinsCounter = 0;

// Buttons
let saveButton, hungerButton, shopButton, closeShopButton, buyAppleButton, energyButton, buyenergyButton, pillButton, buypillButton, toyButton, buytoyButton;
let minigameButton, platformButton;
let inventoryButton;
let resetButton;

// preload to load most of the image's and sounds
function preload() {
  Idle = loadImage('assets/Idle.png');
  happy = loadImage('assets/Happy.png');
  food = loadImage('assets/Hungry.png');
  unhappy = loadImage('assets/Sad.png');
  Sick = loadImage('assets/Sick.png');
  Died = loadImage('assets/Gravestone.png')
  bgDay = loadImage('assets/bgDay.png');
  bgNight = loadImage('assets/bgNight.png');
  shopshelf = loadImage('assets/Shopshelf.png');
  pccoins = loadImage('assets/Gold.png');
  bgmg = loadImage('assets/Jungle.png');
  hitSound = loadSound('assets/Hit.mp3');
  MinigameSound = loadSound('assets/BgSoundJungle.mp3');
  BGSoundMain = loadSound('assets/BackgroundMusicMain.mp3');
  PSadSound = loadSound('assets/SadSound.mp3');
  BGHalloween = loadImage('assets/BGHalloween.png');
  normaleplatformimg = loadImage('assets/Normalplatform.png');
  deathplatformimg = loadImage('assets/DeathPlatform.png')
  BGSoundHalloween = loadSound('assets/HalloweenMusic.mp3');
  BGinventory = loadImage('assets/InventoryBackground.png');

}

function setup() {
  createCanvas(1100, 1000);

  // for search the last save
  let savedStats = localStorage.getItem('stats');
  if (savedStats !== null) {
    stats = JSON.parse(savedStats);
  }

  // all buttons that need to be created
  inventoryButton = createImg('assets/Inventory.png');
  inventoryButton.position(width - 110, height - 210);
  inventoryButton.size(100, 100);
  inventoryButton.mousePressed(toggleInventory);
  inventoryButton.hide();

  saveButton = createButton('Save Game');
  saveButton.position(width / 2 - 50, height - 30);
  saveButton.mousePressed(saveStats);
  saveButton.style('font-size', '18px');
  saveButton.style('border-radius', '10px');
  saveButton.style('background-color', '#007BFF');
  saveButton.style('color', '#FFFFFF');
  saveButton.style('border', 'none');
  saveButton.style('cursor', 'pointer');

  hungerButton = createImg('assets/Apple.png');
  hungerButton.position(745, 220);
  hungerButton.mousePressed(increaseHunger);

  shopButton = createImg('assets/Shop.png');
  shopButton.position(width - 110, height - 110);
  shopButton.size(100, 100);
  shopButton.mousePressed(openShop);

  closeShopButton = createImg('assets/Cross.png');
  closeShopButton.position(width / 2 - 50, height - 75);
  closeShopButton.size(100, 100);
  closeShopButton.mousePressed(closeShop);
  closeShopButton.hide();

  buyAppleButton = createImg('assets/Apple.png');
  buyAppleButton.position(150, 150);
  buyAppleButton.size(150, 150);
  buyAppleButton.mousePressed(buyApple);
  buyAppleButton.hide();

  energyButton = createImg('assets/Energy.png');
  energyButton.position(850, 215);
  energyButton.size(75, 75);
  energyButton.mouseClicked(increaseEnergy);

  buyenergyButton = createImg('assets/Energy.png');
  buyenergyButton.position(300, 130);
  buyenergyButton.size(200, 200);
  buyenergyButton.mouseClicked(buyEnergy);

  pillButton = createImg('assets/Pill.png')
  pillButton.position(955,190)
  pillButton.mousePressed(increasehealth)

  buypillButton = createImg('assets/Pill.png')
  buypillButton.position(500,150)
  buypillButton.size(175,175)
  buypillButton.mousePressed(buypill)

  toyButton = createImg('assets/Toy.png');
  toyButton.position(735,315)
  toyButton.size(75,75)
  toyButton.mousePressed(increaseHappiness)

  buytoyButton = createImg('assets/Toy.png');
  buytoyButton.position(700,150)
  buytoyButton.size(175,175)
  buytoyButton.mousePressed(buytoy)

  minigameButton = createImg('assets/Game.png');
  minigameButton.position(25, height - 80);
  minigameButton.size(100, 75);
  minigameButton.mousePressed(minigame);

  resetButton = createButton('Reset Game')
  resetButton.position(width/2 - 50, height/2 - 50)
  resetButton.mousePressed(ResetFullGame)
  resetButton.style('font-size', '18px');
  resetButton.style('border-radius', '10px');
  resetButton.style('background-color', '#28a745'); // Green background
  resetButton.style('color', '#FFFFFF'); // White text
  resetButton.style('border', 'none');
  resetButton.style('cursor', 'pointer');

  // sets base of the player
  player = {
    x: width / 2,
    y: height / 2,
    size: 50,
    velocityY: 0,
  };
}

function draw() {
  textAlign(BOTTOM, LEFT);
  // get the date of the computer and add it to the game 
  const currentDate = new Date(Date.now());
  let currentDay = currentDate.getDate();
  let currentMonth = currentDate.getMonth();
  let currentHour = currentDate.getHours();

  // Minigame start screen
  if (minigameStartScreen && !minigameStarted) {
    background(0);
    fill(255);
    textSize(32);
    textAlign(CENTER, CENTER);
    text('Platform Minigame', width / 2, height / 2 - 100);
    textSize(24);
    text('highscore: ' + stats.highscore, width / 2, height / 2 - 50);
    text('Use LEFT and RIGHT arrow keys to move.', width / 2, height / 2);
    text('Avoid death platforms and keep jumping!', width / 2, height / 2 + 50);
    text('Press ENTER to start', width / 2, height / 2 + 100);

    if (keyIsDown(ENTER)) {
      minigameStartScreen = false;
      minigameStarted = true;
      minigame(); // Start the minigame
    }
    return;
  }

  // Game Over screen
  if (showScore) {
    background(0);
    textSize(32);
    fill(255);
    textAlign(CENTER, CENTER);
    text('Game Over!', width / 2, height / 2 - 100);
    textSize(24);
    text('Score: ' + score, width / 2, height / 2);
    text('Coins Earned: ' + (score * 2), width / 2, height / 2 + 50);
    text('highscore: ' + stats.highscore, width / 2, height / 2 - 50);
    if (stats.highscore < score) {
      stats.highscore = score;
    }
    text('Press R to restart', width / 2, height / 2 + 100);
    text('Press Backspace to get back', width / 2, height / 2 + 150);

    if (keyIsDown(82)) {
      score = 0;
      player.y = height / 2;
      player.x = width / 2;
      player.velocityY = 0;
      showScore = false;
      stats.healthy = 100;
      stats.happiness = 100;
      stats.energy = max(0, stats.energy - 10);
      resetPlatforms();
      createBasePlatform();
    }

    if (keyIsDown(BACKSPACE)) {
      resetGame();
    }

    return;
  }

  // Handle shop and minigame separately
  if (shopOpen) {
    image(shopshelf, -100, -100, width + 200, height + 200);
    closeShopButton.show();
    buyAppleButton.show(); // Ensure buy button is shown
    hungerButton.hide();
    minigameButton.hide();
    energyButton.hide();
    buyenergyButton.show();
    inventoryButton.hide();
    playminigame = false;
    saveButton.hide();  // Hide save button in shop
    pillButton.hide()
    buypillButton.show()
    buytoyButton.show()
    toyButton.hide()
    resetButton.hide()

    // Display coins and costs
    image(pccoins, 150, 332, 50, 50);
    image(pccoins, 350, 332, 50, 50);
    image(pccoins, 520, 332, 50, 50);
    image(pccoins, 700, 332, 50, 50);
    fill(255, 215, 0);
    textSize(22);
    text(appleCost, 200, 362);
    text(rodCost, 400, 362);
    text(pillCost, 575, 362);
    text(toyCost, 755, 362);

    // Display inventory counts
    fill(255, 204, 0);
    circle(310, 175, 30); // Apple circle
    circle(490, 175, 30); // Rod circle
    circle(630, 175, 30); // pill circle
    circle(880, 175, 30); // toy circle
    fill(0);
    textSize(22); // Set text size
    text(stats.apple, 304, 177); // Show number of apples
    text(stats.rod, 484, 177); // Show number of rods
    text(stats.pill, 624, 177);
    text(stats.toy, 874, 177);

    image(pccoins, 40, 110, 50, 50);
    fill(255, 215, 0);
    textSize(26);
    text(stats.coins, 90, 140);

  } else if (playminigame) {
    startMinigameSound();
    minigameStartScreen = true;
    image(bgmg, 0, 0, width, height);
    if (player.y > height) {
      player.y = height / 2;
      player.velocityY = 0;
    }
    hideButtons();
    PlatformGame();
    saveButton.hide();  // Hide save button in minigame
  } else {
    // Main game background
    if (currentMonth === 9 && currentDay === 31) {
      image(BGHalloween, 0, 0, width, height);
      if (!BGSoundHalloween.isPlaying()) {
        BGSoundHalloween.loop();
      }
      BGSoundMain.stop();
    } else {
      if (currentHour >= 18 || currentHour <= 6) {
        image(bgNight, 0, 0, width, height);
      } else {
        image(bgDay, 0, 0, width, height);
      }
      if (!BGSoundMain.isPlaying()) {
        BGSoundMain.loop();
      }
      BGSoundHalloween.stop();
    }

    if (inventoryVisible) {
      drawInventory();
      hungerButton.show();
      energyButton.show();
      pillButton.show();
      toyButton.show()
    } else {
      hungerButton.hide();
      energyButton.hide();
      pillButton.hide();
      toyButton.hide()
    }

    if (animaleDied) {
      resetButton.show()
    } else {
      resetButton.hide()
    }

    closeShopButton.hide();
    buyAppleButton.hide();
    minigameButton.show();
    buyenergyButton.hide();
    shopButton.show();
    inventoryButton.show();
    buypillButton.hide()
    buytoyButton.hide()

    saveButton.show();  // Always show save button in main game

    drawStatsBars();
    displayLabels();
    decreaseStats();
    constrainStats();
    displayCharacterImage();
    checkSaveButton();
  }
}


function startMinigameSound() {
  // Stop main background music and Halloween music when minigame starts
  BGSoundMain.stop();
  BGSoundHalloween.stop();

  // Play minigame sound if not already playing
  if (!MinigameSound.isPlaying()) {
    MinigameSound.loop();
  }
}

// hide every button needed
function hideButtons() {
  closeShopButton.hide();
  buyAppleButton.hide();
  hungerButton.hide();
  minigameButton.hide();
  buyenergyButton.hide();
  energyButton.hide();
  shopButton.hide();
  inventoryButton.hide();
  pillButton.hide()
  buypillButton.hide()
  buytoyButton.hide()
  resetButton.hide()
}

// stops all backgroundmusic to start new once
function stopAllBackgroundMusic() {
  BGSoundMain.stop();
  BGSoundHalloween.stop();
  MinigameSound.stop(); // Stop minigame sound when not in minigame
}

// displays differnt image based on the stats 
function displayCharacterImage() {
  if (stats.healthy <= 0){
    image(Died, 470, 470, 200, 200);
    animaleDied = true
  }
  else if (stats.healthy >= 1 &&stats.healthy <= 25) {
    image(Sick, 470, 470, 200, 200);
  } else if (stats.hunger <= 25) {
    image(food, 470, 470, 200, 200);
  } else if (stats.happiness <= 25) {
    image(unhappy, 470, 470, 200, 200);
    if (!PSadSound.isPlaying()) {
      PSadSound.play();
    }
  } else if (stats.happiness >= 75) {
    image(happy, 470, 470, 200, 200);
  } else {
    image(Idle, 470, 470, 200, 200);
  }
}

function saveStats() {
  localStorage.setItem('stats', JSON.stringify(stats)); // Save stats to local storage
  statsSaved = true; // Set the saved flag to true
  saveButtonTimeout = 0; // Reset the timeout to display the "Saved!" message
}

// draws the stats bars to show the differnt stats
function drawStatsBars() {
  rectMode(LEFT, BOTTOM);
  rect
  noStroke();
  fill(195, 88, 49);
  rect(130, 40.5, stats.hunger, 20, 7);

  fill(0, 255, 255);
  rect(360, 40.5, stats.happiness, 20, 7);

  fill(255, 255, 0);
  rect(580, 40.5, stats.energy, 20, 7);

  fill(203, 50, 52);
  rect(780, 40.5, stats.healthy, 20, 7);
}

// display labels to show to you which bars are which stats
function displayLabels() {
  fill(155, 155, 0);
  textAlign(LEFT, CENTER)
  textSize(22);
  text('Hunger: ', 50, 50);
  text('Happiness: ', 250, 50);
  text('Energy: ', 500, 50);
  text('Healthy: ', 700, 50);

  // shows the amount of coins 
  image(pccoins, 40, 110, 50, 50);
  fill(255, 215, 0);
  textSize(26);
  text(stats.coins, 90, 140);
}

// decreasestate by using decreaserates and shows it on a counter
function decreaseStats() {
  if (hungerCounter >= hungerDecreaseRate) {
    if (stats.hunger > 0) stats.hunger--;
    hungerCounter = 0;
  } else hungerCounter++;

  if (happyCounter >= happyDecreaseRate) {
    if (stats.happiness > 0) stats.happiness--;
    happyCounter = 0;
  } else happyCounter++;

  if (energyCounter >= energyDecreaseRate) {
    if (stats.energy > 0) stats.energy--;
    energyCounter = 0;
  } else energyCounter++;

  if (healthyCounter >= healthyDecreaseRate) {
    if (stats.healthy > 0 && stats.hunger <= 25) {
      stats.healthy--;
    } else if (stats.healthy < 100 && stats.hunger > 25) {
      stats.healthy++;
    }
    healthyCounter = 0;
  } else healthyCounter++;
}

// fix coins if needed to test if some coins work
function incrementCoins() {
  if (coinsCounter >= coinsIncreaseRate) {
    coinsCounter = 0;
  } else coinsCounter++;
}

// constrains to not go above the 100 and under 0
function constrainStats() {
  stats.hunger = constrain(stats.hunger, 0, 100);
  stats.happiness = constrain(stats.happiness, 0, 100);
  stats.energy = constrain(stats.energy, 0, 100);
  stats.healthy = constrain(stats.healthy, 0, 100);
}

// increaseHunger by eating a apple
function increaseHunger() {
  if (stats.apple > 0 && stats.hunger < 100) {
    stats.hunger += 10;
    stats.apple--;
  }
}

// increaseEnergy by a rod also called redbull
function increaseEnergy() {
  if (stats.rod > 0 && stats.energy < 100) {
    stats.energy += 25;
    stats.rod--;
  }
}

function increasehealth(){
  if (stats.pill > 0 && stats.healthy < 100) {
    stats.healthy += 50
    stats.pill--;
  }
}

function increaseHappiness(){
  if (stats.toy > 0 && stats.happiness < 100) {
    stats.happiness += 5
    stats.toy--;
  }
}

// opens the shop
function openShop() {
  shopOpen = true;
  playminigame = false;
}

// closes the shop
function closeShop() {
  shopOpen = false; // Close the shop
}

// sets cost to buy a apple and add it to you inventory
function buyApple() {
  if (stats.coins >= appleCost) {
    stats.apple++;
    stats.coins -= appleCost;
  }
}

// sets cost to buy a rod and add it to you inventory
function buyEnergy() {
  if (stats.coins >= rodCost) {
    stats.rod++;
    stats.coins -= rodCost;
  }
}

function buypill() {
  if (stats.coins >= pillCost) {
    stats.pill++
    stats.coins -= pillCost;
  }
}

function buytoy () {
  if (stats.coins >= toyCost) {
    stats.toy++
    stats.coins -= toyCost
  }
}

// draws the inventory with every function
function drawInventory() {
  image(BGinventory, 625, 150, 500, 500); // Draw inventory background

  fill(0);
  textSize(24);
  textAlign(LEFT, TOP);
  text('Inventory', 840, 170);

  fill(255, 204, 0)
  circle(820, 215, 30)
  circle(820, 315, 30)
  circle(930, 215, 30)
  circle(1040, 215, 30)
  fill(0)
  text(stats.apple, 812.5, 205);
  text(stats.rod, 923, 205);
  text(stats.pill, 1033.5, 205);
  text(stats.toy, 812.5, 305);
}

// let it use to if inventory is Visible
function toggleInventory() {
  inventoryVisible = !inventoryVisible;
}

// saveStates
function saveStats() {
  localStorage.setItem('stats', JSON.stringify(stats));
  statsSaved = true;
}

function checkSaveButton() {
  if (keyIsDown(83)) {
    saveButton.show();
  }
}
function relocateDeathPlatforms() {
  // Randomly relocate each death platform
  deathplatform.forEach((p) => {
    p.x = random(0, width);
    p.y = random(height / 2, height);
  });
}

function relocateNormalPlatform(p) {
  // Randomly relocate the specific platform that is hit
  p.x = random(0, width);
  p.y = random(height / 2, height);
}

function startPlatformMovement() {
  // Only start moving platforms if the game is active and no interval is set
  if (playminigame && !relocationInterval) {
    relocationInterval = setInterval(relocateDeathPlatforms, 4000);
  }
}

function minigame() {
  playminigame = true;
  score = 0; // Reset score

  // Initialize platforms
  repostitionPlatforms(); // Ensure platforms are created

  createBasePlatform();

  startMinigameSound(); // Start minigame sound

  startPlatformMovement(); // Start moving platforms
}
function createBasePlatform() {
  let basePlatform = {
    x: width / 2 - 125,
    y: height - 210,
    width: 250,
    height: 120
  };
  normaleplatform.push(basePlatform);
  player.x = basePlatform.x + basePlatform.width / 2;
  player.y = basePlatform.y - player.size / 2;
  player.velocityY = 0;
}

function PlatformGame() {
  drawPlatforms(); // Draw platforms
  drawPlayer(); // Draw player
  applyGravity(); // Apply gravity to player
  handlePlayerMovement(); // Handle player movement
  checkPlatformCollision(); // Check for platform collisions
}

function repostitionPlatforms() {
  normaleplatform = []; // Clear any existing platforms
  deathplatform = [];

  // Create normal platforms
  for (let i = 0; i < platformCount; i++) {
    normaleplatform.push({
      x: random(0, width - 100),
      y: random(height / 2, height - 100),
      width: 250,
      height: 120
    });
  }

  // Create death platforms
  for (let i = 0; i < platformCount / 2; i++) {
    deathplatform.push({
      x: random(0, width - 100),
      y: random(height / 2, height - 100),
      width: 250,
      height: 120
    });
  }
}

function drawPlayer() {
  fill(255, 255, 0);
  ellipse(player.x, player.y, player.size / 1.5);
}

function applyGravity() {
  player.velocityY += gravity; // Apply gravity
  player.y += player.velocityY; // Update player's vertical position

  // Prevent the player from falling below the ground
  if (player.y >= height - player.size / 2) {
    player.y = height - player.size / 2; // Stop player at ground level
    player.velocityY = 0; // Reset vertical velocity when on the ground
    isJumping = false; // Allow jumping again when on the ground
  }
}

function handlePlayerMovement() {
  // Check if the platform game is active before allowing player movement
  if (!playminigame) return;

  // Horizontal movement: left and right arrow keys
  if (keyIsDown(LEFT_ARROW)) {
    player.x -= 7; // Move left
  }
  if (keyIsDown(RIGHT_ARROW)) {
    player.x += 7; // Move right
  }

  // Prevent player from moving off the canvas horizontally
  player.x = constrain(player.x, player.size / 2, width - player.size / 2);

  // Jumping: Only allow jumping if the player is on the ground or platform
  if (keyIsDown(32) && !isJumping) {
    player.velocityY = -jumpForce; // Apply jump force upwards
    isJumping = true; // prevents dubble jump
  }
}

function drawPlatforms() {
  normaleplatform.forEach((p) => {
    image(normaleplatformimg, p.x, p.y, p.width, p.height); // Draw normal platforms
  });

  deathplatform.forEach((p) => {
    image(deathplatformimg, p.x, p.y, p.width, p.height); // Draw death platforms
  });
}

function checkPlatformCollision() {
  let onPlatform = false;

  const checkCollision = (p) => {
    // sets colliders to position on the platform
    const platformTop = p.y + colliderYOffset;
    const platformBottom = platformTop + colliderHeight;


    // checks if player is on platform
    if (
      player.velocityY > 0 &&
      player.y + player.size / 2 <= platformBottom &&
      player.y + player.size / 2 + player.velocityY >= platformTop &&
      player.x + player.size / 2 >= p.x + colliderXOffset &&
      player.x - player.size / 2 <= p.x + colliderXOffset + colliderWidth
    ) {
      return true;
    }
    return false;
  };

  // Check for collisions with normal platforms
  normaleplatform.forEach((p) => {
    if (checkCollision(p)) {
      player.y = p.y + colliderYOffset - player.size / 2;
      player.velocityY = -jumpForce;
      onPlatform = true;
      isJumping = true;

      // Play hit sound
      hitSound.play();

      // Relocate platform to a random position
      relocateNormalPlatform(p);

      // Increase score for hitting a platform
      score++;
    }
  });

  // checks collision on deathplatforms
  deathplatform.forEach((p) => {
    if (checkCollision(p)) {
      resetPlayerToDeath();
    }
  });

  // If player falls off the platform
  if (!onPlatform && player.y >= height - player.size / 2) {
    resetPlayerToDeath();
  }
}

function resetPlayerToDeath() {
  player.y = height / 2;
  player.x = width / 2;
  player.velocityY = 0;
  isJumping = false;

  // Calculate the player's score and coins
  stats.coins += score * 2;
  showScore = true;
}

function resetPlatforms() {
  normaleplatform = []; // Clear normal platforms
  deathplatform = []; // Clear death platforms
  repostitionPlatforms(); // Reinitialize platforms
}

function resetGame() {
  score = 0; // Reset score
  player.y = height / 2; // Reset player position
  player.velocityY = 0; // Reset velocity
  showScore = false; // Stop showing the score
  stats.healthy = 100; // Reset health
  stats.happiness = 100; // Reset happiness
  stats.energy = max(0, stats.energy - 10); // Deduct energy
  playminigame = false; // Ensure minigame state is reset
  MinigameSound.stop()
  clearInterval(relocationInterval); // Clear the relocation interval
  relocationInterval = null; // Reset the interval variable
}

function ResetFullGame() {
  localStorage.removeItem('stats')
}
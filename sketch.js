var knife, knifeImg, monster, fruit, monsterG, fruitG;
var monsterImg, fruitImage;
var fruit1, fruit2, fruit3, fruit4;
var gameOver;
//gameStates
var PLAY = 1;
var END = 0;
var gameState = PLAY;

//sounds
var gameOver_sound, swoosh_sound

var score = 0;

function preload() {
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  monsterImg = loadAnimation("alien1.png", "alien2.png");
  gameOver = loadImage("gameover.png");
  knifeImg = loadImage("knife.png");
}

function setup() {
  createCanvas(500, 400);

  knife = createSprite(250, 200);
  knife.addImage(knifeImg);
  knife.scale = 0.7;
  knife.setCollider("circle", 10, -20, 50);

  fruitG = new Group();
  monsterG = new Group();

  knife.setCollider("circle", 10, -21, 45);


}

function draw() {
  background("lightBlue");
  if (gameState === PLAY) {
    
    createFruits();
    createMonsters();
    
    knife.x = mouseX;
    knife.y = mouseY;

    if (fruitG.isTouching(knife)) {
      fruitG.destroyEach();
      score = score+2;
    }
    
    if(monsterG.isTouching(knife)) {
      gameState = END;
    }
    
}
  
  else if (gameState === END){
    knife.addImage(gameOver);
    knife.x = 250;
    knife.y = 200;
    knife.scale = 2
    knife.setCollider("rectangle", 0, 0, 200, 40);
    
    fruitG.setVelocityXEach(0);
    monsterG.setVelocityXEach(0);
    
    fruitG.destroyEach();
    monsterG.destroyEach();
    
    
  }
  if (mousePressedOver(knife)) {
      reset();
      
    }
  
  drawSprites();
  text("score: "+score, 220, 30)
}



function createFruits() {
  if (frameCount % 30 === 0) {
 var position = Math.round(random(1, 2));
    fruit = createSprite(400, 200, 20, 20);

    if (position == 1) {
      fruit.x = 600;
      fruit.velocityX = -(8+(score/4))
    } else {
      if (position == 2) {
        fruit.x = 0;
        fruit.velocityX = (8+(score/4));
      }
    }

    fruit.scale = 0.2;
  var randomImg = Math.round(random(1, 4));
    if (randomImg == 1) {
      fruit.addImage(fruit1);
    } else if (randomImg == 2) {
      fruit.addImage(fruit2);
    } else if (randomImg == 3) {
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }

    fruit.y = Math.round(random(50, 350));


    fruit.lifetime = 80;

    fruitG.add(fruit);
  }
}



function createMonsters() {
  if (frameCount % 80 === 0) {
 var position = Math.round(random(1, 2))
    monster = createSprite(0, 0)
    monster.addAnimation("monster", monsterImg)
    
    if (position === 1) {
      monster.x = 0;
      monster.velocityX = (8+(score/10));
    }
    else {
      monster.x = 500;
      monster.velocityX = -(8+(score/10));
    }
    
    monster.y = Math.round(random(50, 350))
    monster.lifetime =80;
    
    monsterG.add(monster);
    
    
    
    
  }
}


function reset() {
  gameState = PLAY;
  knife.addImage(knifeImg)
  knife.scale = 0.7
  score = 0;
}



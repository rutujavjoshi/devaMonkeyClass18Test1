var PLAY = 1;
var END = 1
var gameState = PLAY;

var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage, ground, collidedImage, gameOverImage;
var FoodGroup, obstacleGroup;
var score;

function preload(){
  collidedImage = loadAnimation("sprite_4.png");
  
  monkey_running =  loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}



function setup() {
  createCanvas(600,400);
  
  monkey = createSprite(80,315,20,20);
  monkey.scale = 0.1;
  monkey.addAnimation("running", monkey_running);
  
  ground = createSprite(400,350,1100,10);
  ground.velocityX = -4;
  ground.x = ground.width / 2;
  console.log(ground.x);
  
  score = 0;
  
  obstacleGroup = new Group();
  FoodGroup = new Group();
}


function draw() {
  background(220); 
  
  if(gameState === PLAY){
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    if(keyDown("space") && monkey.y > 100) {
      monkey.velocityY = -12;
    }
    
    if(FoodGroup.isTouching(monkey)){
      FoodGroup.destroyEach();
      score = score + 3;
    }
    
    monkey.velocityY = monkey.velocityY + 0.8;
    
    if(obstacleGroup.isTouching(monkey)){
      gameState = END;
    }
  }
  
  else if(gameState === END){
      monkey.velocityX = 0;
      ground.velocityX = 0;
    
      monkey.x = 300;
      monkey.y = 300;
      monkey.addImage(gameOverImage);
      
      obstacleGroup.setVelocityEach(0,0);
      FoodGroup.setVelocityEach(0,0);
    
      obstacleGroup.setLifetimeEach(-1);
      FoodGroup.setLifetimeEach(-1);
    }
  
  monkey.collide(ground);
  
  spawnObstacles();
  spawnBananas();
  drawSprites();
  stroke("blue");
  textSize(20);
  fill("white");
  text("Score: " + score, 500, 50);
  
  var survivalTime = 0;
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount / frameRate());
  text("Survival Time: " + survivalTime, 100, 50);
}

function spawnObstacles() {
  if (frameCount % 300 === 0) {
    var obstacle = createSprite(600,600,40,10);
    obstacle.y = Math.round(random(315,322));
    console.log(obstacle.y);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -3;
    
     //assign lifetime to the variable
    obstacle.lifetime = 200;
    
    //adjust the depth
    obstacle.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each cloud to the group
    obstacleGroup.add(obstacle);
  }
}

function spawnBananas() {
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,600,40,10);
    banana.y = Math.round(random(120,200));
    //console.log(obstacle.y);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
       
    //add each cloud to the group
    FoodGroup.add(banana);
  }
}


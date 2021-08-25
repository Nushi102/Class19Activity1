var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  ghost = createSprite(200,200);
  ghost.addImage("SPOOKY GHOST",ghostImg)
  ghost.scale=0.4

  spookySound.loop()
  spookySound.setVolume(0.3)

  doorG= new Group()
  climberG= new Group()
  invBlockG= new Group()
}

function draw() {
  background(0);
  if(gameState==="play"){
    if(tower.y > 400){
      tower.y = 300
    }
    if(keyDown("right_arrow")){
      ghost.x=ghost.x+3
    }
    if(keyDown("left_arrow")){
      ghost.x=ghost.x-3
    }
    if(keyDown("space")){
      ghost.velocityY= -10
    }
    ghost.velocityY= ghost.velocityY+0.9     
    spawnDoor()
    if(ghost.isTouching(climberG)){
      ghost.velocityY=0
    }
    if(ghost.y>600||ghost.isTouching(invBlockG)){
      gameState="end"
    }                                                      
    drawSprites()
  }
  else if(gameState==="end"){
  fill("yellow")
  textSize(30)
  text("Game Over",230,250)
  }
}

function spawnDoor(){
if(frameCount%240===0){
  door=createSprite(200,-50)
  climber=createSprite(200,10)
  invBlock=createSprite(200,15)
  invBlock.width=climber.width
  invBlock.height=2
  door.x=Math.round(random(100,500))
  door.velocityY=1
  climber.velocityY=1
  invBlock.velocityY=1
  climber.x=door.x
  invBlock.x=door.x
  door.addImage("Door",doorImg)
  climber.addImage("Climber",climberImg)
  door.lifetime=800
  climber.lifetime=door.lifetime
  invBlock.lifetime=door.lifetime
  //invBlock.debug=true
  door.depth=ghost.depth
  ghost.depth+=1
  doorG.add(door)
  climberG.add(climber)
  invBlockG.add(invBlock)
}
}
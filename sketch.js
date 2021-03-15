//Create variables here
var dogSprite, dog, happyDog, database, foodS, foodStock;
function preload()
{
  //load images here
  dog = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
  
}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);
  dogSprite = createSprite(width/2, height/2, 10, 10);
  dogSprite.addAnimation("dog", dog);
  dogSprite.scale = 0.5;

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
}


function draw() {  
  background(46, 139, 87);
  fill("white");
  text("Note: Press UP_ARROW key to feed Drago Milk!", width/2 - 100, 20);
  if (keyWentDown(UP_ARROW)) {
    writeStock(foodS);

  }
  drawSprites();
  //add styles here
  fill("white");
  text("Foodstock remaining: " + foodS, width/2, height/2 - 200);
  textSize(40);
  stroke("white");
}

function readStock(data) {
  foodS = data.val();
  //dogSprite.addImage(happyDog);
}

function writeStock(x) {
  if (x <= 0) {
    x = 0;
    dogSprite.addImage("dog", happyDog);
  } else {
    x = x - 3;
  }
  database.ref('/').set({
    'Food': x
  });
}
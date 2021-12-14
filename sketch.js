const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1,box2,box3,box4,box5, pig1,pig2;
var backgroundImg,platform;
var bird,slingShot;
var bgx = "sprites/bg.png";
var gameState = "NOLAN";


function preload() {
   //backgroundImg = loadImage("sprites/bg.png");
    getBackgroundImg();
}

function setup(){
    var canvas = createCanvas(windowWidth,windowHeight-10);
    engine = Engine.create();
    world = engine.world;

    ground = new Ground(851,height,1703,20);
    ground2 = new Ground(width-5,100,5,10000);
    ground3 = new Ground(width-1705,100,5,10000);
    bird = new Bird(510,202);
    box1 = new Box(1200,height-100,100,100);
    box2 = new Box(1400,height-100,100,100)
    log1 = new Log(1299,height-200,295,PI/2);
    box3 = new Box(1200,height-200,100,100);
    box4 = new Box(1400,height-201,100,100);
    log2 = new Log(1299,height-300,295,PI/2);
    box5 = new Box(1294,height-320,100,100);
    log3 = new Log(1245,height-420,150,PI/8);
    log4 = new Log(1362,height-420,150,PI/-6);
    pig1 = new Pig(1300,height-70);
    pig2 = new Pig(1300,height-270);
    platform = new Ground(width/16,height*7/8,1000,600);
    slingshot = new SlingShot(bird.body,{x:510,y:202});
}

function draw(){
    if(backgroundImg)

    background(backgroundImg);

    Engine.update(engine);
    strokeWeight(4);
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    pig2.display();
    log1.display();
    log2.display();
    ground2.display();
    ground3.display();

    box3.display();
    box4.display();
    log3.display();

    box5.display();
    log4.display();

    platform.display();
    slingshot.display(); 
    bird.display();

    if(gameState == "NOLAN") {
        bird.trajectory = [];
    }

}

function mouseDragged() {
if(gameState!="LAN"){
    Matter.Body.setPosition(bird.body,{x:mouseX,y:mouseY});
 }
}

function mouseReleased() {
    slingshot.fly();
    gameState = "LAN";
}

function keyPressed() {
    if(keyCode === 32){
       slingshot.attach(bird.body);
       gameState = 'NOLAN';
       World.add(world, this.body);
    }
}

async function getBackgroundImg() {
    var response = await fetch("http://worldtimeapi.org/api/timezone/Europe/Madrid");
    var responseJSON = await response.json();   
    var datetime = responseJSON.datetime;
    var hour = datetime.slice(11,13);
    if(hour >= 8 && hour < 18){
      bgx = "sprites/bg.png"
    }

    else if(hour >= 18 &&hour < 20){
        bgx = "sprites/bg3.png"
    }

    else{
        bgx = "sprites/bg2.Jpg";
    }
   backgroundImg = loadImage(bgx); 
}
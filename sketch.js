var PLAY=1;
var END=0;
var gameState=PLAY;
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var nubeImg, nubesGroup;
var obs1, obs2, obs3, obs4, obs5, obs6, obstaculosGrupo;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  nubeImg=loadImage("cloud.png");

  obs1=loadImage("obstacle1.png");
  obs2=loadImage("obstacle2.png");
  obs3=loadImage("obstacle3.png");
  obs4=loadImage("obstacle4.png");
  obs5=loadImage("obstacle5.png");
  obs6=loadImage("obstacle6.png");

}

function setup() {
  createCanvas(600,200);
  
  
  //crear sprite de Trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  trex.debug=true;
  
  //crear sprite de suelo
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  //crear sprite de suelo invisible
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;

 // var numero=Math.round(random(0,20));
 // console.log(numero);

 nubesGroup = new Group();
 obstaculosGrupo = new Group();
  
}

function draw() {
  //establecer color de fondo
  background(150);


  if(gameState === PLAY){
    if(keyDown("space") && trex.y >= 100) {
      trex.velocityY = -10;
   
      
          }    
    trex.velocityY = trex.velocityY + 0.8
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    
    trex.collide(invisibleGround);
  
    nubes();
    obstaculos();
    if(obstaculosGrupo.isTouching(trex)){
      gameState=END;
    }
  }else if(gameState === END){
    trex.velocityY=0;
    ground.velocityX=0;
    obstaculosGrupo.setVelocityXEach(0);
  }
  
  
  
  drawSprites();
}


function nubes(){
  if(frameCount % 60 === 0){
    nube=createSprite(600,100,40,10);
    nube.velocityX=-3;
    nube.lifetime=205;
    nube.y=Math.round(random(0,100));
    nube.addImage(nubeImg);
    nube.scale=0.09;
    nube.depth=trex.depth;
    trex.depth=trex.depth + 1;
    nubesGroup.add(nube);
  }
  
}

function obstaculos(){
  if(frameCount % 60 === 0){
    obstaculo=createSprite(600,165,10,40);
    obstaculo.velocityX=-6;
    var numero = Math.round(random(1,6));
    switch(numero){
      case 1: obstaculo.addImage(obs1); break;
      case 2: obstaculo.addImage(obs2); break;
      case 3: obstaculo.addImage(obs3); break;
      case 4: obstaculo.addImage(obs4); break;
      case 5: obstaculo.addImage(obs5); break;
      case 6: obstaculo.addImage(obs5); break;
      default: break;
    }
    obstaculo.scale=0.06;
    obstaculo.lifetime=100;
    obstaculosGrupo.add(obstaculo);
  }
}





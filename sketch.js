var bg,bgImg;
var player, shooterImg, shootingImg;
var bullet,bulletGroup;
var zombie,zombieImg,zombieGroup;
var score = 0;
var gameState = "fight";
var lose,win,explosion;

function preload(){
    bgImg = loadImage("assets/bg.jpeg");
    shooterImg = loadImage("assets/shooter_2.png");
    shootingImg = loadImage("assets/shooter_3.png");
    zombieImg = loadImage("assets/zombie.png");

    lose = loadSound("assets/lose.mp3");
    explosion = loadSound("assets/explosion.mp3");
    win = loadSound("assets/win.mp3");



}

function setup(){
    createCanvas(windowWidth,windowHeight);

    bg = createSprite(displayWidth/2-20, displayHeight/2-40);
    bg.addImage(bgImg);
    bg.scale = 1.1;

    player = createSprite(displayWidth-1150,displayHeight-300);
    player.addImage(shooterImg);
    player.scale = 0.3;

    bulletGroup = new Group();
    zombieGroup = new Group();
}

function draw(){
    background(0);
    if(gameState === "fight"){
        if(keyDown("UP_ARROW")){
            player.y = player.y-20;
        }

        if(keyDown("DOWN_ARROW")){
            player.y = player.y+20;
        }

        if(keyWentDown("SPACE")){
            bullet = createSprite(displayWidth-1150,player.y-30,20,10);
            bullet.velocityX = 10;
            bulletGroup.add(bullet);
            player.addImage(shootingImg);
            player.depth = bullet.depth+2;
            explosion.play();
        }

        else if(keyWentUp("SPACE")){
            
            player.addImage(shooterImg);
        }

        if(zombieGroup.isTouching(bulletGroup)){
            for(var i = 0; i < zombieGroup.length; i++){
                if(zombieGroup[i].isTouching(bulletGroup)){
                    zombieGroup[i].destroy();
                    bulletGroup.destroyEach();
                    //where we will add the explosion
                    score += 2;
                }
            }
        }

        if(zombieGroup.isTouching(player)){
            lose.play();
            for(var i = 0; i < zombieGroup.length; i++){
                if(zombieGroup[i].isTouching(player)){
                    gameState = "lost";
                    zombieGroup[i].destroy();


                }
            }
        }

        enemy();
}
    drawSprites();

    textSize(100);
    fill("red");
    text("score = ", score, displayWidth-300,displayHeight/2-320);

    if(gameState === "lost"){
        textSize(100);
        fill("red");
        text("Game Over",400,400);
        zombieGroup.destroyEach();
        bulletGroup.destroyEach();
        player.destroy();
    }
    
}

function enemy(){
    if(frameCount%90 === 0){
        zombie = createSprite(random(500,1100),random(100,500));
        zombie.addImage(zombieImg);
        zombie.scale = 0.13;
        zombie.velocityX = -3;
        zombie.debug = true;
        zombie.setCollider("rectangle",0,0,400,400);

        zombie.lifetime = 400;
        zombieGroup.add(zombie);

    }
}
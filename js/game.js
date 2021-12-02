
const tileSize = 64;
const numTiles = 9;
const uiWidth = 4;
let level = 1;
const maxHp = 6;

spritesheet = new Image();
spritesheet.src = 'js/spritesheet.png';
spritesheet.onload = showTitle;

gameState = "loading";

startingHp = 3;
numLevels = 6;

function setupCanvas(){
    canvas = document.querySelector("canvas");
    ctx = canvas.getContext("2d");
    canvas.width = tileSize*(numTiles+uiWidth);
    canvas.height = tileSize*numTiles;
    canvas.style.width = canvas.width + 'px';
    canvas.style.height = canvas.height + 'px';
}



document.querySelector("html").onkeypress = function(e){
    if(gameState == "title"){
        startGame();
    }else if(gameState =="dead"){
        showTitle();
    }else if(gameState == "running"){
        if(e.key=="w") player.tryMove(0,-1);
        if(e.key=="s") player.tryMove(0,1);
        if(e.key=="a") player.tryMove(-1,0);
        if(e.key=="d") player.tryMove(1,0);
    }
};
function drawSprite(sprite,x,y){
    ctx.drawImage(
        spritesheet,
        sprite*16,
        0,
        16,
        16,
        x*tileSize,
        y*tileSize,
        tileSize,
        tileSize
    );
}
function draw(){
    if(gameState == "running" || gameState == "dead"){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        for(let i=0;i<numTiles;i++){
            for(let j=0;j<numTiles;j++){
                getTile(i,j).draw();
            }
        }
        for(let i=0;i<monsters.length;i++){
            monsters[i].draw();
        }
        player.draw();
    }
}
function tick(){
    for(let k=monsters.length-1;k>=0;k--){
        if(!monsters[k].dead){
            monsters[k].update();
        }else{
            monsters.splice(k,1);
        }
    }
    if(player.dead){
        gameState = "dead";
    }
}
function showTitle(){
    ctx.fillStyle = 'rgba(0,0,0,.75)';
    ctx.fillRect(0,0,canvas.width, canvas.height);

    gameState = "title";
}
function startGame(){
    level = 1;
    startLevel(startingHp);

    gameState = "running";
}
function startLevel(playerHp){
    generateLevel();

    player = new Player(randomPassableTile());
    player.hp = playerHp;
}
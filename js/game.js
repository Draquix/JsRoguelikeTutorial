
const tileSize = 64;
const numTiles = 9;
const uiWidth = 4;

spritesheet = new Image();
spritesheet.src = 'js/spritesheet.png';

function setupCanvas(){
    canvas = document.querySelector("canvas");
    ctx = canvas.getContext("2d");
    canvas.width = tileSize*(numTiles+uiWidth);
    canvas.height = tileSize*numTiles;
    canvas.style.width = canvas.width + 'px';
    canvas.style.height = canvas.height + 'px';
}



document.querySelector("html").onkeypress = function(e){
    if(e.key=="w") player.tryMove(0,-1);
    if(e.key=="s") player.tryMove(0,1);
    if(e.key=="a") player.tryMove(-1,0);
    if(e.key=="d") player.tryMove(1,0);
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
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(let i=0;i<numTiles;i++){
        for(let j=0;j<numTiles;j++){
            getTile(i,j).draw();
        }
    }
    player.draw();
}

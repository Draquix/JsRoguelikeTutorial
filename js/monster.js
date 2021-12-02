class Monster{
    constructor(tile, sprite, hp){
        this.move(tile);
        this.sprite = sprite;
        this.hp = hp;
    }
    update(){
        this.doStuff();
    }
    doStuff(){
        let neighbors = this.tile.getAdjacentPassableNeighbors();
        neighbors = neighbors.filter(t => !t.monster || t.monster.isPlayer);
        if(neighbors.length){
            neighbors.sort((a,b) => a.dist(player.tile) - b.dist(player.tile));
            let newTile = neighbors[0];
            this.tryMove(newTile.x - this.tile.x, newTile.y - this.tile.y);
        }
    }
    draw(){
        drawSprite(this.sprite, this.tile.x, this.tile.y);
    }
    tryMove(dx,dy){
        let newTile = this.tile.getNeighbor(dx,dy);
        if(newTile.passable){
            this.move(newTile);
        }
        return true;
    }
    move(tile){
        if(this.tile){
            this.tile.monster = null;
        }
        this.tile = tile;
        tile.monster = this;
    }
}
class Player extends Monster{
    constructor(tile){
        super(tile,0,3);
        this.isPlayer = true;
    }
    tryMove(dx,dy){
        if(super.tryMove(dx,dy)){
            tick();
        }
    }
}
class Imp extends Monster{
    constructor(tile){
        super(tile,4,2);
    }
}
class Blob extends Monster{
    constructor(tile){
        super(tile,5,3);
    }
}
class Rat extends Monster{
    constructor(tile){
        super(tile,6,1);
    }
}
class Bat extends Monster{
    constructor(tile){
        super(tile,7,1);
    }
}
class MushMan extends Monster{
    constructor(tile){
        super(tile,8,3);
    }
}

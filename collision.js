
function Bird(){
  this.x = 100+floor(random(width-200));
  this.y = floor(30+random(height-200));
  this.img = birdImg[floor(random(birdImg.length))];
  this.hit = false;
  // this.initPos = ;

  this.draw = function(){

    this.x -= 20;
    // console.log(this.x)
    // console.log(t)
    if(!this.hit){
    push();
          translate(this.x,this.y);
          // rotate(this.rotate);
          image(this.img, 0, 0,BIRD_SIZE,BIRD_SIZE);
    pop();
    }

    this.checkBorders();

  }

  this.checkBorders = function(){
    if (this.x < 0){
      this.x = width - floor(random(40)) - 20;
      this.y = floor(30+random(height-200));
      this.hit = false;
    }   
  }

}
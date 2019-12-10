function startScreen(){
	image(startimg,0,0,width,height);

	button_s.mousePressed(function() {
     initPlay = 1;
     // button_s.position(width/2-100, height/2);
     button_s.style('visibility', 'hidden');
     button.style('visibility', 'visible')
     startSound.play();
     // document.getElementById('play').style.visibility='';
    });

}

function instruction(){
	
	if(!created){
		image(insimg,0,0,width,height);
		gif = createImg("assets/ins.gif");
		gif.position(width/2-60, 250);
		created = true;
	}
	
	button.mousePressed(function() {
	gif.remove();
	 button.style('visibility', 'hidden');
     audioContext.resume()
     initPlay = 2;
     startSound.play();
     bgm.stop();
    });
}

function endGame(){
	// image(score,width/2,)
	button_r.style('visibility', 'visible')

	text('Your Final Score', width/2-150, height/2-100);
	text(your_score, width/2-10, height/2);

	button_r.mousePressed(function() {

     // clearData();

     initPlay = 1;
     // button_s.position(width/2-100, height/2);
     button_r.style('visibility', 'hidden');
     button.style('visibility', 'visible');
     // document.getElementById('play').style.visibility='';

     // clear pitches
    });

}


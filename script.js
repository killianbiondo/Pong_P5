  let canvas;
  let coordX = 80; // déclare les coordonnées des balles X
  let coordY = 40; // déclare les coordonnées des balles Y
  let diametre = 50; // déclare le diamètre des balles
  let raquetteX, raquetteY, raquetteLargeur, raquetteHauteur; // déclare la position de la raquette(sa hauteur, sa largeur, ...)
  let vx, vy; // Vitesse du 1er cercle
  let vx2, vy2; // vitesse du 2eme cercle
  let compteur=0; // compteur de score
  let balle=[]; // tableau qui stocke les balles


  class balles {
      constructor(coordX,coordY,vx,vy,diametre,color) {
        this.coordX=coordX;
        this.coordY=coordY;
        this.vx=vx;
        this.vy=vy;
        this.diametre=diametre;
        this.color=color;
      }

    mouvement(){
      // Met la balle en movement
      this.coordX = this.coordX + this.vx;
      this.coordY = this.coordY + this.vy;
  }

      rebond(){
      // Permet de rebondir contre les murs 
      if (this.coordX + this.diametre / 2 > width || this.coordX - this.diametre / 2 < 0) {
        this.vx = -this.vx;
      }

      if (this.coordY - this.diametre / 2 < 0) {
        this.vy = -this.vy;
      }
    }

    rebond_raquette(raquetteX,raquetteY,raquetteHauteur,raquetteLargeur,compteur,color){
      // Vérifie la collision avec la raquette
      if (
        this.coordX + this.diametre / 2 > raquetteX &&
        this.coordX - this.diametre / 2 < raquetteX + raquetteLargeur &&
        this.coordY + this.diametre / 2 > raquetteY &&
        this.coordY - this.diametre / 2 < raquetteY + raquetteHauteur
      ) 
      {    
        this.vy = -this.vy;
        compteur++;

      if (compteur%2==0){
        return[true, compteur, true]
     }

      return [true, compteur, false];

      }
      
      // test pour voir si les coordonnées sont supérieur à la taille
      if (this.coordY>width){
        return [false, compteur];
      }
      return [true, compteur];
    }

      affiche(){
        // Dessine le 1er cercle 
      this.color=fill(255, 0, 0);
      ellipse(this.coordX, this.coordY, this.diametre, this.diametre);
      }
};


function setup() {
  let x = (3 * windowWidth) / 5;
  let y = windowHeight * 0.83;
  canvas = createCanvas(x, y);
  // Move the canvas so it’s inside our <div id="sketch-holder">.
  canvas.parent('sketch_holder');

  // Définis la vitesse de la 1er balle et la taille du cercle 
  coordX = Math.floor(Math.random() * (width - 100)) + 50;
  coordY = Math.floor(Math.random() * (height / 2)) + 50;
  vx = 6;
  vy = 5;


  // Position et dimensions de la raquette
  raquetteX = width / 2 - 50;
  raquetteY = height - 50;
  raquetteLargeur = 120;
  raquetteHauteur = 25;

  // appel de la classe balle
  balle.push(new balles(coordX,coordY,vx,vy,diametre));

}


function draw() {
  
 // if (coordY<height){
    raquetteX=mouseX;
    background(150);

    // Dessine la raquette 
    fill(255,255,255);
    rect(raquetteX, raquetteY, raquetteLargeur, raquetteHauteur);
  

    for (let i = 0; i < balle.length; i++) {
      balle[i].rebond();
      balle[i].affiche();
      balle[i].mouvement();
      rebond_r=balle[i].rebond_raquette(raquetteX,raquetteY,raquetteHauteur,raquetteLargeur,compteur);
      compteur=rebond_r[1];


      if (rebond_r[2]){
        coordX = Math.floor(Math.random() * (width - 100)) + 50;
        coordY = Math.floor(Math.random() * (height / 2)) + 50;
        balle.push(new balles(coordX,coordY,vx,vy,diametre));
      }
      if(!rebond_r[0]){
        background(0,0,0);
        compteur = " Votre score :"+ compteur;
        fill('rgb(0,255,0)')
        textSize(25);
        text('PERDU',width/2,height/2);
        text(compteur,10, 30);
        noLoop();
      } 
   }
}


// Refait la taille de la fenêtre windows 
function windowResized() {
  let x = (3 * windowWidth) / 5;
  let y = windowHeight * 0.84 - 12;
  resizeCanvas(x, y);

}

function restart() {
  balle=[];
  balle.push(new balles(coordX,coordY,vx,vy,diametre));
  //permet de faire apparaitre les balles au hasard 
  coordX = Math.floor(Math.random() * (width - 100)) + 50;
  coordY = Math.floor(Math.random() * (height / 2)) + 50;
  compteur=0;
  loop()



}
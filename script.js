/* Opdracht Objectgeorienteerd programmeren
   Informatica - Emmauscollege Rotterdam
*/

/* ******************************************************* */
/* instellingen om foutcontrole van je code beter te maken */
/* ******************************************************* */
///<reference path="p5.global-mode.d.ts" />
"use strict"

/* ********************************************* */
/* Klassendefinities                             */
/* ********************************************* */

class Mens {
  x;
  y;
  speedX;
  speedY;
  breedte;

  isBesmet;

  constructor(newX, newY, newSpeedX, newSpeedY) {
    this.x = newX;
    this.y = newY;
    this.speedX = newSpeedX;
    this.speedY = newSpeedY;
    this.breedte = 20;

    this.isBesmet = false;
  }

  show() {
    noStroke();
    if (this.isBesmet === true) {
      fill(255, 0, 0);      // rood
    }
    else {
      fill(255, 255, 255);  // wit
    }

    rect(this.x, this.y, this.breedte, this.breedte);
  }

  update() {
    // update positie
    this.x = this.x - this.speedX;
    this.y = this.y - this.speedY;

    // stuiter tegen randen
    if (this.x <= 0 || this.x + this.breedte >= width) {
      this.speedX = this.speedX * -1;
    }

    if (this.y <= 0 || this.y + this.breedte >= height) {
      this.speedY = this.speedY * -1;
    }
  }

  isOverlappend(andereMens) {
    // zet teruggeefwaarde standaard op false
    var overlappend = false;
  
    // zet teruggeefwaarde op true als er een overlap is
    if ( // valt linkerbovenhoek binnen randen van 'andereMens'?
         (this.x >= andereMens.x &&
          this.x <= andereMens.x + andereMens.breedte &&
          this.y >= andereMens.y &&
          this.y <= andereMens.y + andereMens.breedte)
        ||
         // OF valt rechterbovenhoek binnen randen van 'andereMens'?
         (this.x + this.breedte >= andereMens.x &&
          this.x + this.breedte <= andereMens.x + andereMens.breedte &&
          this.y >= andereMens.y &&
          this.y <= andereMens.y + andereMens.breedte)
        || // OF de linkeronderhoek?
         (this.x >= andereMens.x &&
          this.x <= andereMens.x + andereMens.breedte &&
          this.y + this.breedte >= andereMens.y &&
          this.y + this.breedte <= andereMens.y + andereMens.breedte)
        || // OF de hoek rechtsonder?
         (this.x >= andereMens.x &&
          this.x <= andereMens.x + andereMens.breedte &&
          this.y + this.breedte >= andereMens.y &&
          this.y + this.breedte <= andereMens.y + andereMens.breedte)
       ) {

      overlappend = true;
    }

    return overlappend;
  }
}


/* ********************************************* */
/* globale variabelen die je gebruikt in je game */
/* ********************************************* */
var mensen = [];        // lege array voor de mens-objecten



/* ********************************************* */
/* setup() en draw() functies / hoofdprogramma   */
/* ********************************************* */

/**
 * setup
 * de code in deze functie wordt één keer uitgevoerd door
 * de p5 library, zodra het spel geladen is in de browser
 */
function setup() {
  // Maak een canvas (rechthoek) waarin je je speelveld kunt tekenen
  createCanvas(1280, 720);

  // maak 25 random mensen
  for (var teller = 0; teller < 25; teller++) {
    // we moeten ze niet te dicht bij de rand tekenen
    // om geen problemen met stuiteren te krijgen
    var ruimteTotRand = 50;
    
    // creëer random positie en snelheid
    var randomX = random(ruimteTotRand, width - ruimteTotRand);
    var randomY = random(ruimteTotRand, height - ruimteTotRand);
    var randomSpeedX = random(-5, 5);
    var randomSpeedY = random(-5, 5);

    // maak nieuw mensobject
    var nieuwMens = new Mens(randomX, randomY, randomSpeedX, randomSpeedY);
    
    // voeg mensobject toe aan array
    mensen.push(nieuwMens);
  }

  mensen[0].isBesmet = true;
}

/**
 * draw
 * de code in deze functie wordt 50 keer per seconde
 * uitgevoerd door de p5 library, nadat de setup functie klaar is
 */
function draw() {
  // zwarte achtergrond
  background(0, 0, 0);
  

  // ga alle waarden in de arrays af:
  for (var i = 0; i < mensen.length; i++) {
    // verwijs met 'mens' naar het mens-object die bij deze
    // iteratie van de loop hoort.
    var mens = mensen[i];
    
    // teken
    mens.show();

    // update positie en stuiter eventueel
    mens.update();
  }

  // controleer of mensen elkaar aanraken
  // ga alle mensen langs
  for (var i = 0; i < mensen.length; i++) {
    var mensA = mensen[i];
    // ga met mensA opnieuw alle mensen langs om te checken op overlap, behalve met zichzelf
    for (var j = 0; j < mensen.length; j++) {
      var mensB = mensen[j];
      if (mensA != mensB) {
        // check overlap
        var mensenOverlappen = mensA.isOverlappend(mensB);
        if (mensenOverlappen) {
          // check of er een besmetting optreedt
          if (mensA.isBesmet || mensB.isBesmet) {
            // als er één besmet is, wordt ze allebei besmet
            // als ze allebei besmet zijn, verandert deze code niets.
            mensA.isBesmet = true;
            mensB.isBesmet = true;
          }
        }
      }
    }
  }
}

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

  besmet;

  constructor(newX, newY, newSpeedX, newSpeedY) {
    this.x = newX;
    this.y = newY;
    this.speedX = newSpeedX;
    this.speedY = newSpeedY;

    this.besmet = false;
  }

  update() {
    this.x = this.x - this.speedX;
    this.y = this.y - this.speedY;
  }
}


/* ********************************************* */
/* globale variabelen die je gebruikt in je game */
/* ********************************************* */
var mensen = [];        // lege array voor de mens-objecten
const BREEDTE = 20;



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

  mensen[0].besmet = true;
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
    // verwijs met 'eenMens' naar de mens die bij deze
    // iteratie van de loop hoort.
    var eenMens = mensen[i];
    
    // teken
    noStroke;
    fill(255, 255, 255);
    rect(eenMens.x, eenMens.y, BREEDTE, BREEDTE);

    // update positie
    eenMens.x = eenMens.x + eenMens.speedX;
    eenMens.y = eenMens.y + eenMens.speedY;

    // stuiter evt. tegen de kanten
    if (eenMens.x <= 0 || eenMens.x + BREEDTE >= width) {
      eenMens.speedX = eenMens.speedX * -1;
    }

    if (eenMens.y <= 0 || eenMens.y + BREEDTE >= height) {
      eenMens.speedY = eenMens.speedY * -1;
    }
  }
}

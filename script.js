/* Opdracht Objectgeorienteerd programmeren
   Informatica - Emmauscollege Rotterdam
*/

/* ******************************************************* */
/* instellingen om foutcontrole van je code beter te maken */
/* ******************************************************* */
///<reference path="p5.global-mode.d.ts" />
"use strict"


/* ********************************************* */
/* globale variabelen die je gebruikt in je game */
/* ********************************************* */
var mensen;             // array voor de mens-objecten
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

  // initialiseer 5 objecten met waarden x, y, speedX en speedY
  // deze waarden zijn een voorbeeld
  // het is prima als je hier je eigen waarden heb ingevuld 
  mensen = [ { x: 130, y: 650, speedX: 2,  speedY: 1  },
             { x: 60,  y: 400, speedX: -3, speedY: -5 },
             { x: 470, y: 40,  speedX: 5,  speedY: -2 },
             { x: 350, y: 110, speedX: -1, speedY: -3 },
             { x: 880, y: 20,  speedX: -1, speedY: 2  } ];
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

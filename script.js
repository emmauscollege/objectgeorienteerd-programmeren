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
  
    // stuur de teruggeefwaarde terug
    return overlappend;
  }
}

class Kat {
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
    this.breedte = 10;

    this.isBesmet = false;
  }

  show() {
    noStroke();
    if (this.isBesmet === true) {
      fill(255, 140, 0);   // oranje
    }
    else {
      fill(0, 0, 255);     // blauw
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

  isOverlappend(andereKat) {
    // zet teruggeefwaarde standaard op false
    var overlappend = false;
  
    if ( // valt linkerbovenhoek binnen randen van 'andereKat'?
         (this.x >= andereKat.x &&
          this.x <= andereKat.x + andereKat.breedte &&
          this.y >= andereKat.y &&
          this.y <= andereKat.y + andereKat.breedte)
        ||
         // OF valt rechterbovenhoek binnen randen van 'andereKat'?
         (this.x + this.breedte >= andereKat.x &&
          this.x + this.breedte <= andereKat.x + andereKat.breedte &&
          this.y >= andereKat.y &&
          this.y <= andereKat.y + andereKat.breedte)
        || // OF de linkeronderhoek?
         (this.x >= andereKat.x &&
          this.x <= andereKat.x + andereKat.breedte &&
          this.y + this.breedte >= andereKat.y &&
          this.y + this.breedte <= andereKat.y + andereKat.breedte)
        || // OF de hoek rechtsonder?
         (this.x >= andereKat.x &&
          this.x <= andereKat.x + andereKat.breedte &&
          this.y + this.breedte >= andereKat.y &&
          this.y + this.breedte <= andereKat.y + andereKat.breedte)
       ) {
        
      overlappend = true;
    }
  
    // stuur de teruggeefwaarde terug
    return overlappend;
  }
}


/* ********************************************* */
/* globale variabelen die je gebruikt in je game */
/* ********************************************* */
var actoren = [];        // lege array voor de mens-objecten



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
    actoren.push(nieuwMens);
  }

  // maak 10 random katten
  for (var teller = 0; teller < 10; teller++) {
    // we moeten ze niet te dicht bij de rand tekenen
    // om geen problemen met stuiteren te krijgen
    var ruimteTotRand = 50;
    
    // creëer random positie en snelheid
    var randomX = random(ruimteTotRand, width - ruimteTotRand);
    var randomY = random(ruimteTotRand, height - ruimteTotRand);
    var randomSpeedX = random(-2, 2);
    var randomSpeedY = random(-2, 2);

    // maak nieuw mensobject
    var nieuweKat = new Kat(randomX, randomY, randomSpeedX, randomSpeedY);
    
    // voeg mensobject toe aan array
    actoren.push(nieuweKat);
  }

  actoren[0].isBesmet = true;
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
  for (var i = 0; i < actoren.length; i++) {
    // verwijs met 'mens' naar het mens-object die bij deze
    // iteratie van de loop hoort.
    var actor = actoren[i];
    
    // teken
    actor.show();

    // update positie en stuiter eventueel
    actor.update();
  }

  // controleer of actoren elkaar aanraken
  // ga alle actoren langs
  for (var i = 0; i < actoren.length; i++) {
    var actorA = actoren[i];
    // ga met actorA opnieuw alle mensen langs om te checken op overlap, behalve met zichzelf
    for (var j = i+1; j < actoren.length; j++) {
      var actorB = actoren[j];
      if (actorA != actorB) {
        // check overlap
        var actorenOverlappen = actorA.isOverlappend(actorB);
        if (actorenOverlappen) {
          // check of er een besmetting optreedt
          if (actorA.isBesmet || actorB.isBesmet) {
            // als er één besmet is, wordt ze allebei besmet
            // als ze allebei besmet zijn, verandert deze code niets.
            actorA.isBesmet = true;
            actorB.isBesmet = true;
          }
        }
      }
    }
  }
}

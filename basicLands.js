//let colors = []; might use later
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

let green = 0;
let blue = 0;
let black = 0;
let red = 0;
let white = 0;
let greenPercent = 0;
let bluePercent = 0;
let blackPercent = 0;
let redPercent = 0;
let whitePercent = 0;
let numOfBasics = 24;

let howManyBasics = function(numOfBasics, ...colorPercents){
    let reaminingColors = colorPercents/*.filter(function(ele){
        if(ele > 0){
            return true;
        }
    });*/


    reaminingColors.forEach(function(ele, i){
        reaminingColors[i] = Math.floor(ele * numOfBasics);
    });

    let sumLands = reaminingColors.reduce((accum, curVal) => {
        return accum + curVal;
    });

    if(sumLands < numOfBasics){
        const lowIndex = minValue(reaminingColors);
        const landDif = numOfBasics - sumLands;
        reaminingColors[lowIndex] += landDif;
    }


    let [greenBasics, blueBasics, blackBasics, redBasics, whiteBasics] = reaminingColors;
    let returnValues = [
        "You'll need " + greenBasics + " Forests",
        "You'll need " + blueBasics + " Islands",
        "You'll need " + blackBasics + " Swamps",
        "You'll need " + redBasics + " Mountains",
        "You'll need " + whiteBasics + " Plains",
    ]
    for (let i = 0; i < reaminingColors.length; i++){
        if(reaminingColors[i] !== 0){
            console.log(returnValues[i]);
        }
    }
}

let minValue = function(nums){
    let value;
    if(nums == []){
        value = null;
        return value;
    }

    for(i = 0; i < nums.length; i++){
        let holder = nums[i];
      for(j = 0; j < nums.length; j++){
          if(nums[j] <= holder && nums[j] > 0){
              value = nums[j];
          }
      }
    }
  return nums.indexOf(value);
};



let devotionPercent = function(){
    let totalPips = green + blue + black + red + white;
    greenPercent = (green / totalPips);
    bluePercent = (blue / totalPips);
    blackPercent = (black / totalPips);
    redPercent = (red / totalPips);
    whitePercent = (white / totalPips);
    howManyBasics(numOfBasics, greenPercent, bluePercent, blackPercent, redPercent, whitePercent);
}

rl.question("How many basic lands are in your deck? ", (landAmount) => {
    numOfBasics = Number(landAmount);
    rl.question("What is your decks devotion to green? ", (devoGreen) => {
        green = Number(devoGreen);
         rl.question("What is your decks devotion to blue? ", (devoBlue) => {
           blue = Number(devoBlue);
            rl.question("What is your decks devotion to black? ", (devoBlack) => {
               black = Number(devoBlack);
                rl.question("What is your decks devotion to red? ", (devoRed) => {
                   red = Number(devoRed);
                    rl.question("What is your decks devotion to white? ", (devoWhite) => {
                       white = Number(devoWhite);
                        rl.close();
                        setTimeout(devotionPercent, 1000);
                   });
               });
           });
       });
    });
});

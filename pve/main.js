console.log("js loaded!");

const tiles = document.querySelectorAll(".tile");
const restartBtn = document.querySelector(".restart");
let toggle = true;
let winner = false;
let next = document.getElementById("beurt");
let tdX = document.querySelector(".scoreX");
let tdO = document.querySelector(".scoreO");
let scoreX = 0;
let scoreO = 0;
let isThinking = false;


for (let i = 0; i < tiles.length; i++) {
    const tile = tiles[i];
    tile.addEventListener('click', function(e) {
        console.log(e.target);

        
        //als winner true kan je niet meer klikken// 
        if(winner == true){
            return;
        }

        // als vak al X of O heeft, dan gelijk terugkeren
        if(tile.textContent != "") {
            return;
        }

        // Gebruiker mag pas klikken als computer klaar is
        // met denken.
        if(isThinking) {
            return;
        }
        
        // Kijk of alle vakken al gevuld zijn, want dan
        // is het gelijkspel
        if(checkGameFinished()) {
            setTimeout(function(){
                console.log("Player: Spel eindigt zonder winnaar");
                alert("Spel eindigt zonder winnaar");
                clearTiles();
            }, 100);
            
            return;
        }

        tile.textContent = "X";
        
        next.textContent = "It's O turn";
        
        // controleer of speler heeft gewonnen
        checkWinner(tile.textContent);
        if(winner) {
            return;
        }

        isThinking = true;

        // computer denken simuleren
        setTimeout(function(){
            
            isThinking = false;
            
            if(checkGameFinished()) {
                console.log("Computer: Spel eindigt zonder winnaar");
                alert("Spel eindigt zonder winnaar");
                clearTiles();
                return;
            }
            
            const box = nextMoveComputer();

            // controleer of computer heeft gewonnen
            checkWinner(box.textContent);
        }, 500); // 500ms is tijd om na te denken voor computer
    });
}

restartBtn.addEventListener("click", clearTiles);

// Alle vakjes leegmaken
function clearTiles() {
    
    tiles.forEach(function(tile) {
        tile.textContent = "";
    });

    // winnaar weer op false zetten
    winner = false;
}

const winconditions =  [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


// player geeft aan of het X of O is
function checkWinner(player){


    for (let i =0; i < winconditions.length; i++){
        const row = winconditions[i];
        const tilesX = tiles[row[0]];
        const tilesY = tiles [row[1]];
        const tilesZ = tiles [row[2]];

        // controleer of een van tiles leeg is//
        if(tilesX.textContent == "" || tilesY.textContent == "" || tilesZ.textContent == "") {
            console.log("continue")
            continue;
        }
    

        // hier check even als tilesx en y en z gelijk aan elkaar dan heb je gewonnen//
        if( tilesX.textContent == tilesY.textContent && tilesY.textContent == tilesZ.textContent){
           
            // setTimeout is nodig om X of O eerst op het scherm te
            // laten tekenen
            setTimeout(function(){
                 
                // player hier staat voor beslissing wij is gewonnen x of 0
                alert(player + " Heeft gewonnen !!");

            }, 100);

            //hier is gewonnen dus kan je niet meer klikken
            winner = true;

            // update scorebord
            updateScore(tilesX.textContent);

            break;

            // hier gaat stoppen//
        }else{
            continue;
            //hier gaat door //
        }
    }
}

function updateScore(player){
    if(player === 'X'){
        scoreX++;
        tdX.textContent = scoreX;
    }else {
        scoreO++;
        tdO.textContent = scoreO;
    }
}

function checkGameFinished(){
    let end = true;
    for (let x = 0; x < tiles.length; x++) {
        const box = tiles[x];
        if(box.textContent === '') {
            end = false;
            break;
        }
    }

    console.log("End is: ", end);

    return end;
}

// computer doet een volgende zet
function nextMoveComputer() {

    // verzamel lege vakjes in een nieuw array
    let emptyBoxes = [];
    for (let i = 0; i < tiles.length; i++) {
        const box = tiles[i];
        if(box.textContent === ""){
            emptyBoxes.push(box);
        }
    }

    // genereer random getal tuseen 0 en lengte array
    let position = getRandomInt(0, emptyBoxes.length);
    
    // pak willekeurig box
    const emptyBox = emptyBoxes[position];
    
    // vul een O in
    emptyBox.textContent = "O";
    
    return emptyBox;
}

// bron: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#examples
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }
  

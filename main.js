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

// voeg alle vierkantjes een addEventListener toe
for (let i = 0; i < tiles.length; i++) {
    const tile = tiles[i];
    tile.addEventListener('click', function (e) {
        console.log(e.target);


        //als winner true kan je niet meer klikken// 
        if (winner == true) {
            return;
        }

        // als vak al X of O heeft, dan gelijk terugkeren
        if (tile.textContent != "") {
            return;
        }

        // wie is aan de beurt
        if (toggle) {
            tile.textContent = "X";
            toggle = false;
            next.textContent = "It's 0 turn";


        } else {
            tile.textContent = "O";
            toggle = true;
            next.textContent = "It's X turn";
        }

        // geen winnaar --> gelijkspel
        if (checkGameFinished()) {
            alert("Spel eindigt zonder winnaar");
            clearTiles();
            return;
        }

        checkWinner(tile.textContent);
    });
}
restartBtn.addEventListener("click", clearTiles);

// Maak alle vierkantjes leeg 
function clearTiles() {

    tiles.forEach(function (tile) {
        tile.textContent = "";
    });
    // hier winner fals //
    winner = false;
}

const winconditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// dat function check als je gewonnen
function checkWinner(player) {

    for (let i = 0; i < winconditions.length; i++) {
        const row = winconditions[i];
        const tilesX = tiles[row[0]];
        const tilesY = tiles[row[1]];
        const tilesZ = tiles[row[2]];

        // controleer of een van tiles leeg is//
        if (tilesX.textContent == "" || tilesY.textContent == "" || tilesZ.textContent == "") {
            console.log("continue")
            continue;
        }


        // deze codes zjn voor controleren wat mis ge gaat//

        // console.log("TileX: " + tilesX.textContent);
        // console.log("TileY: " + tilesY.textContent);
        // console.log("TileZ: " + tilesZ.textContent);
        // console.log("tilesX.textContent: " + tilesX.textContent);


        // hier check even als tilesx en y en z gelijk aan elkaar dan heb je gewonnen//
        if (tilesX.textContent == tilesY.textContent && tilesY.textContent == tilesZ.textContent) {
            //setTimeout dat function verzorgt dat alert komt na de derde x of 0 controleren
            setTimeout(function () {
                // player hier staat voor beslissing wij is gewonnen x of 0
                alert(player + " Heeft gewonnen !!");
            }, 100);
            //hier is gewonnen dus kan je niet meer klikken//
            winner = true;

            updateScore(tilesX.textContent);

            break;//???

            // hier gaat stoppen//
        } else {
            continue;
            //hier gaat door //
        }
    }
}
// dat functie het is gewoon een updatescore
function updateScore(player) {
    if (player === 'X') {
        scoreX++;
        tdX.textContent = scoreX;
    } else {
        scoreO++;
        tdO.textContent = scoreO;
    }
}
// dat function verzorgt als de alltiles gevuld zijn
function checkGameFinished() {//??
    let end = true;
    for (let x = 0; x < tiles.length; x++) {
        const box = tiles[x];
        if (box.textContent === '') {
            end = false;
            break;
        }
    }

    console.log("End is: ", end);

    return end;
}

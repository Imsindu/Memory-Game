const cards = ["A", "A", "B", "B", "C", "C", "D", "D", "E", "E", "F", "F", "G", "G", "H", "H"];
cards.sort(() => Math.random() - 0.5);

const gameBoard = document.getElementById("gameBoard");
let flippedTiles = [];
let matchedTiles = [];

function createTiles() {
    cards.forEach((letter, index) => {
        const tile = document.createElement("div");
        tile.classList.add("tile");
        tile.dataset.letter = letter;
        tile.dataset.index = index;
        tile.addEventListener("click", flipTile);
        gameBoard.appendChild(tile);
    });
}

function flipTile() {
    if (flippedTiles.length < 2 && !this.classList.contains("flipped") && !matchedTiles.includes(this)) {
        this.textContent = this.dataset.letter;
        this.classList.add("flipped");
        flippedTiles.push(this);

        if (flippedTiles.length === 2) {
            setTimeout(checkMatch, 500);
        }
    }
}

function checkMatch() {
    if (flippedTiles[0].dataset.letter === flippedTiles[1].dataset.letter) {
        matchedTiles.push(...flippedTiles);
    } else {
        flippedTiles.forEach(tile => {
            tile.classList.remove("flipped");
            tile.textContent = "";
        });
    }
    flippedTiles = [];
    if (matchedTiles.length === cards.length) {
        setTimeout(() => alert("Congratulations! You won!"), 500);
    }
}

createTiles();
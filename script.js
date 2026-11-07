let symbols = ["😻","🙀","🐈‍⬛","🐈"];
let gameStats = {
    flippedCards : 0,
    foundPairs : 0,
    gameBoard: []
}
console.log(symbols);
function createBoard(){
    gameStats.gameBoard = [];
    for(let i = 0; i < 4; i++){
        gameStats.gameBoard.push(symbols[i]);
        gameStats.gameBoard.push(symbols[i]);
    }
    gameStats.gameBoard.sort(()=>Math.random() - 0.5);
    console.log(gameStats.gameBoard);
}

function checkPair(){
    let flippedPair =document.getElementsByClassName("flipped ");
    console.log(flippedPair);
    gameStats.flippedCards = 0;
    if ((flippedPair[0].dataset.symbol == flippedPair[1].dataset.symbol)){
        while(flippedPair.length != 0){
            flippedPair[0].classList.add("found");
            flippedPair[0].classList.toggle("flipped");
        }
        gameStats.foundPairs++;
    }else{

        setTimeout(()=>{
            while (flippedPair.length != 0){
                flippedPair[0].textContent = "";
                flippedPair[0].addEventListener('click', flipCard);
                flippedPair[0].classList.toggle("flipped");            }
        }, 1000);
    }
}
function resetGame(){
    document.getElementById("gameResult").remove();
    const childrenToRemove = document.getElementById("game-board").childNodes;
    console.log(childrenToRemove);
    while(childrenToRemove.length != 0){
        childrenToRemove[0].remove();
    }

    createBoard();
    createGame();
}

function checkGameStatus(){
    if (gameStats.foundPairs == gameStats.gameBoard.length / 2){
        let winMessage = document.createElement("h2");
        winMessage.textContent = "You won!";
        let newRow = document.createElement("div");
        newRow.classList.add("row");
        newRow.classList.add("justify-content-center");
        newRow.setAttribute("id", "gameResult");
        document.getElementById("game-container").appendChild(newRow);
        document.getElementById("gameResult").appendChild(winMessage);  
        let startOverButton = document.createElement("button");
        startOverButton.setAttribute("type", "button");
        startOverButton.classList.add("btn");
        startOverButton.classList.add("btn-primary");
        startOverButton.innerHTML = "New Game";
        startOverButton.addEventListener('click', resetGame);
        document.getElementById("gameResult").appendChild(startOverButton);        
    } 
}

function flipCard(event){
    let card = event.target;
    if(card.classList.contains("flipped")){
        card.classList.remove("flipped");
        card.textContent = "";
    }else{
        card.classList.add("flipped");
        card.textContent = card.dataset.symbol;
        card.removeEventListener('click', flipCard);
    }
    gameStats.flippedCards++;
    if (gameStats.flippedCards == 2){
        checkPair();

    }
    checkGameStatus();
}

function createGame(){
    gameStats.flippedCards = 0;
    gameStats.foundPairs = 0;
    for(let i = 0; i < gameStats.gameBoard.length; i++){
        let newCard = document.createElement("div");
        newCard.classList.add("card");
        let cardid = "card-" + (i+1);
        newCard.setAttribute("id", cardid );
        newCard.dataset.symbol = gameStats.gameBoard[i];
        newCard.addEventListener('click', flipCard);
        document.getElementById("game-board").appendChild(newCard);
    }
}

createBoard();
createGame();
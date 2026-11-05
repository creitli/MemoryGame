let symbols = ["😻","🙀","🐈‍⬛","🐈"];
let flippedCards = 0;
console.log(symbols);

let gameBoard = [];
function createBoard(){
    for(let i = 0; i < 4; i++){
        gameBoard.push(symbols[i]);
        gameBoard.push(symbols[i]);
    }
    gameBoard.sort(()=>Math.random() - 0.5);
    console.log(gameBoard);
}
function checkPair(){
    let flippedPair =document.getElementsByClassName("flipped ");
    console.log(flippedPair);
    flippedCards = 0;
    if ((flippedPair[0].dataset.symbol == flippedPair[1].dataset.symbol)){
        while(flippedPair.length != 0){
            flippedPair[0].classList.add("found");
            flippedPair[0].classList.toggle("flipped");
        }
    }else{

        setTimeout(()=>{
            while (flippedPair.length != 0){
                flippedPair[0].textContent = "";
                flippedPair[0].addEventListener('click', flipCard);
                flippedPair[0].classList.toggle("flipped");
                console.log("timeout over");
            }
        }, 1000);
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
    flippedCards++;
    if (flippedCards == 2){
        checkPair();
    }
}

function createGame(){
    for(let i = 0; i < gameBoard.length; i++){
        let newCard = document.createElement("div");
        newCard.classList.add("card");
        let cardid = "card-" + (i+1);
        newCard.setAttribute("id", cardid );
        newCard.dataset.symbol = gameBoard[i];
        newCard.addEventListener('click', flipCard);
        document.getElementById("game-board").appendChild(newCard);
    }
}

createBoard();
createGame();
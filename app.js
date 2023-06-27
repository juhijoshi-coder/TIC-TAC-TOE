let playerText = document.getElementById('playerText');
let restartBtn = document.getElementById('restartBtn')
let box = Array.from(document.getElementsByClassName('box'))

let player1 = "X";
let player2 = "O";
let currentPlayer = player1
let spaces = Array(9).fill(null)

const startGame = () => {
    box.forEach(boxes => boxes.addEventListener('click', BtnClicked))
}

function BtnClicked(e) {
    const id = e.target.id

    if (!spaces[id]) {
        spaces[id] = currentPlayer
        e.target.innerText = currentPlayer

        if (winningPlayer() !== false) {
            playerText.innerHTML = `${currentPlayer} has won!`
            box.forEach(box => box.removeEventListener('click', BtnClicked)) // Disable further moves
            return; 
        }
        currentPlayer = currentPlayer == player1 ? player2 : player1
    }
}

const combo = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

function winningPlayer() {
    for (const combination of combo) {
        let [a, b, c] = combination

        if (spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
            return [a, b, c]

        }
    }
    return false
}

restartBtn.addEventListener('click', restart)
function restart() {
    spaces.fill(null)
    currentPlayer = player1
    playerText.innerHTML = "Tic Tac Toe"
    box.forEach(box => {
        box.innerHTML = ""
    })

}

startGame();
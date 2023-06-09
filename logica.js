let playerText = document.getElementById('playerText')
let restartBtn = document.getElementById('restartBtn')
let boxes = Array.from(document.getElementsByClassName('casilla'))

//let ganador= getComputedStyle(document.body).getPropertyValue('--winning-blocks')

const jugador_0= "O"
const jugador_X = "X"
let jugadorActual = jugador_X
console.log(boxes)
let spaces = Array(9).fill(null)

const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', clickBox))
}

function clickBox(e) {
    const id = e.target.id

    if(!spaces[id]){
        spaces[id] = jugadorActual
        e.target.innerText = jugadorActual

        if(playerHasWon() !==false){
            playerText.innerHTML = `${jugadorActual} gano la partida!`
            let winning_blocks = playerHasWon()
            console.log(winning_blocks);
            winning_blocks.map( casilla => boxes[casilla].style.backgroundColor='red');

            for (let i = 0; i < boxes.length; i++) {
                boxes[i].classList.add('deshabilitado');
              }

            return
        }

        jugadorActual = jugadorActual == jugador_X ? jugador_0: jugador_X
    }
}

const winCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

function playerHasWon() {
    for (const condition of winCombos) {
        //desestructuro los combos ganadores
        let [a, b, c] = condition

        //verifica si todas las casillas en las posiciones a, b y c están ocupadas por el mismo jugador
        if(spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
            return [a,b,c]
        }
    }
    return false
}

restartBtn.addEventListener('click', restart)

function restart() {

    for (let i = 0; i < boxes.length; i++) {
        boxes[i].classList.remove('deshabilitado')
      }

    spaces.fill(null)

    boxes.forEach( casilla => {
        casilla.innerText = ''
        casilla.style.backgroundColor=''
    })

    playerText.innerHTML = 'TA-Te-TI'

    jugadorActual = jugador_X
}

startGame()

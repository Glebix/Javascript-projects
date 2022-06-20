const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('#statusText');
const restartBtn = document.querySelector('#restartBtn');
const winConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],



];
let options =['','','','','','','','',''];
let current_player = 'X';
let running = false;
initialize_game();

function initialize_game() {
    cells.forEach(cell => cell.addEventListener('click',cell_clicked));
    restartBtn.addEventListener('click',restartGame);
    statusText.textContent = `${current_player}'s turn`;
    running=true;
    
}

function cell_clicked() {
    const cell_index = this.getAttribute('cellIndex');

    if(options[cell_index] != "" || !running){
        return;
    }
    Update_cell(this,cell_index);
    checkWinner();
}
function Update_cell(cell,index) {
    options[index] = current_player;
    cell.textContent = current_player;
    
}
function change_player() {
    current_player =(current_player == 'X') ? "O":"X";
    statusText.textContent = `${current_player}'s turn`
    
}
function checkWinner() {
    let round_won = false;

    for(let i=0;i<winConditions.length;i++){
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if (cellA =="" || cellB =="" || cellC ==""){
            continue;

        }
        if(cellA == cellB && cellC == cellB){
            round_won=true;
            break;
        }
    }
    if(round_won ==true){
        statusText.textContent = `${current_player} wins`;
        running =false;
    }
    else if(!options.includes('')){
        statusText.textContent = "draw";
        running=false;

    }
    else{
        change_player()
    }
}
function restartGame() {
    current_player = 'X';
    options =['','','','','','','','',''];
    statusText.textContent = `${current_player}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running=true;

    
}
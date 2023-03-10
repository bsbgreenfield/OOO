class Game {
    constructor(height = 6, width = 7, p1, p2){
        this.HEIGHT = height;
        this.WIDTH = width;
        this.board = []
        this.p1 = p1
        this.p2 = p2
        this.currPlayer = p1
        this.gamOver = false;

        this.makeBoard = this.makeBoard();
        this.makeHtmlBoard = this.makeHtmlBoard();
    }

    makeBoard() {
        for (let y = 0; y <this.HEIGHT; y++) {
          this.board.push(Array.from({ length: this.WIDTH }));
        }
      }
     
    makeHtmlBoard() {
        const board = document.getElementById('board');
      
        // make column tops (clickable area for adding a piece to that column)
        const top = document.createElement('tr');
        top.setAttribute('id', 'column-top');

        this.handleGameClick = this.handleClick.bind(this)
        top.addEventListener('click', this.handleGameClick);
      
        for (let x = 0; x < this.WIDTH; x++) {
          const headCell = document.createElement('td');
          headCell.setAttribute('id', x);
          top.append(headCell);
        }
      
        board.append(top);
      
        // make main part of board
        for (let y = 0; y < this.HEIGHT; y++) {
          const row = document.createElement('tr');
      
          for (let x = 0; x < this.WIDTH; x++) {
            const cell = document.createElement('td');
            cell.setAttribute('id', `${y}-${x}`);
            row.append(cell);
          }
      
          board.append(row);
        }
      }
      
    findSpotForCol(x) {
        for (let y = this.HEIGHT - 1; y >= 0; y--) {
          if (!this.board[y][x]) {
            return y;
          }
        }
        return null;
      }

    placeInTable(y, x) {
        const piece = document.createElement('div');
        piece.classList.add('piece');
        piece.style.top = -50 * (y + 2);
        piece.style.backgroundColor = `${this.currPlayer.color}`;
        const spot = document.getElementById(`${y}-${x}`);
        spot.append(piece);
      }

    endGame(msg) {
        alert(msg);
        this.gamOver = true;
        const top = document.querySelector("#column-top");
        top.removeEventListener("click", this.handleGameClick);
      }

    handleClick(evt) {
        // get x from ID of clicked cell
        const x = +evt.target.id;
      
        // get next spot in column (if none, ignore click)
        const y = this.findSpotForCol(x);
        if (y === null) {
          return;
        }
      
        // place piece in board and add to HTML table
        this.board[y][x] = this.currPlayer;
        this.placeInTable(y, x);
        
        // check for win
        if (this.checkForWin()) {
          return this.endGame(`Player ${this.currPlayer} won!`);
        }
        
        // check for tie
        if (this.board.every(row => row.every(cell => cell))) {
          return this.endGame('Tie!');
        }
          
        // switch players
        this.currPlayer = this.currPlayer === this.p1 ? this.p2 : this.p1;
      }

     checkForWin() {
        const _winThis = _win.bind(this)
        function _win(cells) {
          // Check four cells to see if they're all color of current player
          //  - cells: list of four (y, x) cells
          //  - returns true if all are legal coordinates & all match currPlayer
      
          return cells.every(
            ([y, x]) =>
              y >= 0 &&
              y < this.HEIGHT &&
              x >= 0 &&
              x < this.WIDTH &&
              this.board[y][x] === this.currPlayer
          );
        }
      
        for (let y = 0; y < this.HEIGHT; y++) {
          for (let x = 0; x < this.WIDTH; x++) {
            // get "check list" of 4 cells (starting here) for each of the different
            // ways to win
            const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
            const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
            const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
            const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
      
            // find winner (only checking each win-possibility as needed)
            if (_winThis(horiz) || _winThis(vert) || _winThis(diagDR) || _winThis(diagDL)) {
              return true;
            }
          }
        }
      }
}

class Player{
    constructor(color){
        this.color = color;
    }
}
const form = document.querySelector('form')
const start = document.querySelector('#start')

start.addEventListener('click', function(e){
    e.preventDefault();
    const color1 = document.querySelector('#p1')
    const color2 = document.querySelector('#p2')
    let game = new Game(6, 7, new Player(`${color1.value}`), new Player(`${color2.value}`))
    game;
    form.remove()
    start.remove()
})





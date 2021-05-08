const BOARD_SIZE = 20;

export class Snake {
    constructor() {
        this.board = [];
        this.rowSize = 0;
    }

    startGame() {
        this.createBoard();
    }

    getState() {
        return {
          board: this.board,
          rowSize: this.rowSize,
        };
    }

    createBoard() {
        // 1- GET CELL SIZE
        const boardWidth =
        window.innerWidth / 2 > 800 ? 800 : window.innerWidth / 2;
        const rowSize = boardWidth / 20;
        const boardElement = document.getElementById("board-id");
        boardElement.style.width = boardWidth - 2 + "px";
        this.rowSize = rowSize - 2.1;

        // 2- SET THE ROW AND CELLS OF THE BOARD
        let counter = 1;
        const board = [];
        for (let row = 0; row < BOARD_SIZE; row++) {
          const currentRow = [];
          for (let col = 0; col < BOARD_SIZE; col++) {
            currentRow.push(counter++);
            if (counter > BOARD_SIZE) counter = 1;
          }
          board.push(currentRow);
        }
    
        // 3- CREATE THE HTML BOARD FROM THE BOARD ARRAY
        const result = board.map((row, rowIdx) => {
          return (
            <div key={rowIdx} className="row" style={{ height: this.rowSize }}>
              {row.map((cell, cellIdx) => (
                <div
                  key={cellIdx}
                  className={this.getCellClassName([rowIdx, cell])}
                  style={{ height: this.rowSize, width: this.rowSize }}
                ></div>
              ))}
            </div>
          );
        });

        // 4- RETURN THE HTML BOARD TO THE GLOBAL STATE BOARD
        this.board = result;
    }

    getCellClassName = (cellValue) => {
        return "cell";
    };
}
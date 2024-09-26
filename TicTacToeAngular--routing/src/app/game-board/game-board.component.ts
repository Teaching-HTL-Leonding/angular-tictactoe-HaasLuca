import {Component} from '@angular/core';

@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [],
  templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.css'
})
export class GameBoardComponent {
  // Tic Tac Toe game

  players: string[] = ['🏓', '🎾'];
  currentPlayer: number = 0;
  filledCells: number = 0;
  winner: boolean = false;
  SIZE: number = 3;
  row: HTMLDivElement[] = [];
  board: HTMLDivElement[][] = [];

  message = 'Current player: ' + this.players[this.currentPlayer];

  constructor() {
    this.generateFields();
  }

  // should be run when the component is initialized
  generateFields(): void {
    for (let x = 0; x < this.SIZE; x++) {
      this.row = [];
      for (let y = 0; y < this.SIZE; y++) {
        let cell = document.createElement('div');
        cell.innerText = '';
        cell.classList.add('cell');
        this.row.push(cell);
      }
      this.board.push(this.row);
    }
    console.log(this.board);
  }


  handleCellClick(x: number, y: number): void {
    let cell = this.board[x][y];
    console.log(cell);
    if (cell.innerText !== '') {
      return;
    }
    if (this.winner) {
      return;
    }

    this.filledCells++;
    cell.innerText = this.players[this.currentPlayer];
    this.currentPlayer = (this.currentPlayer + 1) % 2;
    this.message = 'Current player: ' + this.players[this.currentPlayer];

    if (this.checkWinner(x, y)) {
      this.message = 'Winner!';
      this.winner = true;
    } else if (this.filledCells === this.SIZE * this.SIZE) {
      this.message = 'It\'s a draw!';
    }
  }

// Check if the current player has won with the last move
  checkWinner(x: number, y: number) {
    return this.checkRow(x) || this.checkColumn(y) || this.checkDiagonal();
  }

  checkRow(x: number) {
    let player = this.players[(this.currentPlayer + 1) % 2];
    let hasWon = true;
    for (let y = 0; y < this.SIZE; y++) {
      if (this.board[x][y].innerText !== player) {
        hasWon = false;
      }
    }
    return hasWon;
  }

  checkColumn(y: number) {
    let player = this.players[(this.currentPlayer + 1) % 2];
    let hasWon = true;
    for (let x = 0; x < this.SIZE; x++) {
      if (this.board[x][y].innerText !== player) {
        hasWon = false;
      }
    }
    return hasWon;
  }

  checkDiagonal() {
    return this.checkDiagonal1() || this.checkDiagonal2();
  }

  checkDiagonal1() {
    let player = this.players[(this.currentPlayer + 1) % 2];
    let hasWon = true;
    for (let i = 0; i < this.SIZE; i++) {
      if (this.board[i][i].innerText !== player) {
        hasWon = false;
      }
    }
    return hasWon;
  }

  checkDiagonal2(): boolean {
    let player = this.players[(this.currentPlayer + 1) % 2];
    let hasWon = true;
    for (let i = 0; i < this.SIZE; i++) {
      if (this.board[i][this.SIZE - 1 - i].innerText !== player) {
        hasWon = false;
      }
    }
    return hasWon;
  }

  resetGame() {
    this.currentPlayer = 0;
    this.filledCells = 0;
    this.winner = false;
    this.message = 'Current player: ' + this.players[this.currentPlayer];
    this.board.forEach(row => row.forEach(cell => cell.innerText = ''));
  }
}

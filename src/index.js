import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
  render() {
    return (
      <button className="square" onClick={this.props.onClick}>
        {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {

  renderSquare(i) {
    return <Square value={this.props.gameState.board[i]} onClick={() => this.props.playMove(i)}/>;
  }

  render() {
    console.log(this.props);
    const status = 'Current player: ' + this.props.gameState.player;


    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  initState = {
    player: 1,
    board: {
      0: null,
      1: null,
      2: null,
      3: null,
      4: null,
      5: null,
      6: null,
      7: null,
      8: null,
    }
  };
  constructor() {
    super();
    this.state = this.initState;
  }

  playMove(squareId) {
    if (this.isGameOver(squareId)) {
      console.log("game is over");
      return;
    }
    if (this.state.board[squareId] !== null) {
      console.log(this.state.board[squareId] + " has been clicked");
      return;
    }
    const newState = JSON.parse(JSON.stringify(this.state));
    newState.board[squareId] = this.state.player === 1 ? "X" : "O";
    newState.player = this.state.player === 1 ? 0 : 1;
    this.setState(newState);
    console.log(this.isGameOver(squareId));
  }

  getGameInfo() {
    var winner = this.checkWin();
    if (winner === null) {
      if (this.checkTie()) {
        return "It's a tie!!";
      }
      return "Keep playing";
    }
    return this.state.player === 1 ? "Player 0 won!!" : "Player 1 won!!";
  }

  isGameOver() {
    return this.checkTie() || this.checkWin()!==null;
  }

  checkTie() {
    for (var i = 0; i < 9; i++) {
      if (this.state.board[i] === null) {
        return false;
      }
    }
    return true;
  }

  /**
   * Checks whether there is a win and returns the player that won.
   * win, then return null.
   */
  checkWin() {
    const potentialWins = [
      // Horizontals
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      // Verticals
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      // Diagonals
      [0, 4, 8],
      [6, 4, 2],
    ];
    for (var i = 0; i < potentialWins.length; i++) {
      var check = potentialWins[i]
      if (this.state.board[check[0]] !== null &&
        this.state.board[check[0]] === this.state.board[check[1]] &&
        this.state.board[check[1]] === this.state.board[check[2]]) {
          return this.state.player === 1 ? 0 : 1;
        }
    }
    return null;
  }

  restart() {
    this.setState(this.initState);
  }

  render() {
    const status = 'Game Info: ' + this.getGameInfo();
    return (
      <div className="game">
        <div className="game-board">
          <Board gameState={this.state} playMove={(i) => this.playMove(i)}/>
        </div>
        <div className="game-info">
          {status}
          <button onClick={() => this.restart()} >restart</button>
        </div>

      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

import React, { Component } from 'react';
import { getUserData, updateUserData } from './utils';
import Board from './Board';
import './App.css';

class App extends Component {
    constructor() {
        super();
        this.state = {
            played: 0,
            won: 0,
            sizex: 10,
            sizey: 10,
            count: 10,
        };
    }

    componentDidMount() {
        getUserData().then((data) => {
            if (data) {
                this.setState(data, this.resetBoard);
            } else {
                updateUserData(this.state);
                this.resetBoard();
            }
        });
    }

    resetBoard() {
        this.refs.board.init(this.state.sizex, this.state.sizey, this.state.count);
        this.refs.sizex.value = this.state.sizex;
        this.refs.sizey.value = this.state.sizey;
        this.refs.count.value = this.state.count;
        this.setState({ played: this.state.played + 1 }, this.updateData());
    }

    recordWin() {
        this.setState({ won: this.state.won + 1 }, this.updateData());
    }

    updateSetting(thing) {
        const obj = {}
        obj[thing] = parseInt(this.refs[thing].value, 10) || 0;
        this.setState(obj, this.updateData);
    }

    updateData() {
        updateUserData(this.state);
    }

    render() {
        return (
            <div className="App">
                <Board ref="board" win={() => this.recordWin()} />
                <div className="settings">
                    <input type="number" ref="sizex" onChange={() => this.updateSetting('sizex')} />
                    <input type="number" ref="sizey" onChange={() => this.updateSetting('sizey')} />
                    <input type="number" ref="count" onChange={() => this.updateSetting('count')} />
                    <button onClick={() => this.resetBoard()}>New game</button>
                </div>
                <div className="stats">
                    <div>{this.state.played}</div>
                    <div>{this.state.won}</div>
                </div>
            </div>
        );
    }
}

export default App;

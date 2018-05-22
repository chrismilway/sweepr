import React, { Component } from 'react';
import shuffle from 'shuffle-array';
import { adjacentCells } from './utils';
import Cell from './Cell';

class Board extends Component {
    constructor() {
        super();
        this.state = {
            sizex: 0,
            sizey: 0,
            count: 0,
            cells: [],
            status: 0,
        };
    }

    init(sizex, sizey, count) {
        this.setState(
            { sizex, sizey, count, cells: [], status: 0 },
            this.generateCells,
        );
    }

    generateCells() {
        const n = this.state.sizex * this.state.sizey;
        const mines = shuffle(Array(n).fill(null).map((x, id) => id )).slice(0, this.state.count);
        const cells = Array(n).fill(null).map((x, id) => {
            const row = Math.floor(id / this.state.sizex);
            const col = id % this.state.sizex;
            const adjacent = adjacentCells(col, row, this.state.sizex, this.state.sizey);
            const mine = mines.indexOf(id) > -1;
            const value = (!mine) ? mines.filter(m => adjacent.indexOf(m) > -1).length : -1;
            const visible = false;
            const marker = 0;
            return { id, row, col, mine, value, visible, marker };
        });
        this.setState({ cells });
    }

    getCellAndCells(c) {
        const cells = this.state.cells.slice(0);
        const cell = cells.find(i => i.id === c.id);
        return [cell, cells];
    }

    handleClick(c) {
        if (this.state.status || c.visible) return;
        this.expose(c);
        this.assessCells();
    }

    expose(c) {
        if (!c.visible) {
            const [cell, cells] = this.getCellAndCells(c);
            cell.visible = true;
            this.setState({ cells });
            if (!cell.value) {
                this.spreadZero(cell);
            }
        }
    }

    spreadZero(c) {
        const adjacent = adjacentCells(c.col, c.row, this.state.sizex, this.state.sizey);
        adjacent.forEach((a) => {
            const cell = this.state.cells.find(i => i.id === a);
            this.expose(cell);
        });
    }

    toggleMarker(c) {
        if (this.state.status || c.visible) return;
        const [cell, cells] = this.getCellAndCells(c);
        cell.marker = (cell.marker === 2) ? 0 : cell.marker + 1;
        this.setState({ cells });
        this.assessCells();
    }

    assessCells() {
        const mines = this.state.cells.filter(c => c.mine);
        const other = this.state.cells.filter(c => !c.mine);
        if (mines.every(m => m.marker === 1) && other.every(o => o.visible)) {
            this.yay();
        } else if (mines.some(m => m.visible)) {
            this.boom();
        }
    }

    yay() {
        this.setState({ status: 1 });
        this.props.win();
    }

    boom() {
        const cells = this.state.cells.slice(0);
        cells.forEach((c) => {
            if (c.mine) {
                c.visible = true;
            }
        });
        this.setState({ cells, status: 2 });
    }

    renderCells() {
        return this.state.cells.map(cell => this.renderCell(cell));
    }

    renderCell(cell) {
        return (
            <Cell
                key={cell.id}
                id={cell.id}
                mine={cell.mine}
                value={cell.value}
                visible={cell.visible}
                marker={cell.marker}
                lclick={() => this.handleClick(cell)}
                rclick={() => this.toggleMarker(cell)} />
        )
    }

    render() {
        const cells = this.renderCells();
        const styles = {
            gridTemplateColumns: `repeat(${this.state.sizex}, 2rem)`,
            gridTemplateRows: `repeat(${this.state.sizey}, 2rem)`,
        };
        let message;
        if (this.state.status === 1) {
            message = (
                <div className="msg">You win!</div>
            );
        } else if (this.state.status === 2) {
            message = (
                <div className="msg">You lose</div>
            );
        }
        const count = this.state.cells.filter(c => c.marker === 1 && !c.visible).length;
        const counter = (
            <div className="counter">{this.state.count - count}</div>
        )
        return (
            <div className="board" style={styles}>
                {cells}
                {counter}
                {message}
            </div>
        );
    }
}

export default Board;
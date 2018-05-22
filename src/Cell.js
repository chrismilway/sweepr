import React, { Component } from 'react';

class Cell extends Component {
    render() {
        let value = '';
        const classes = ['cell'];
        if (this.props.visible) {
            value = (this.props.mine) ? '' : this.props.value || '';
            classes.push('cell-visible');
            if (this.props.mine) classes.push('cell-mine');
        } else if (this.props.marker) {
            classes.push(`cell-marker-${this.props.marker}`);
        }
        return (
            <button className={classes.join(' ')}
                onClick={() => this.props.lclick() }
                onContextMenu={(e) => { e.preventDefault(); this.props.rclick() }}>
                {value}
            </button>
        );
    }
}

export default Cell;
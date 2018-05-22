const adjacentCells = (x, y, x2, y2) => {
    const coords = [
        [x - 1, y - 1], [x, y - 1], [x + 1, y - 1],
        [x - 1, y], [x + 1, y],
        [x - 1, y + 1], [x, y + 1], [x + 1, y + 1],
    ];
    const valid = (i, i2) => i > -1 && i < i2;
    const getId = c => (c[1] * x2) + c[0];
    return coords.reduce((acc, cur) => {
        if (valid(cur[0], x2) && valid(cur[1], y2)) {
            acc.push(getId(cur));
        }
        return acc;
    }, []);
}

export { adjacentCells };
function draw(width, height, padding) {

    let matrix = Array(height).fill(0).map(x => Array(width).fill(0));

    return (function fill(width, height, x, y) {

        if (width < 1 || height < 1) {
            return matrix;
        }

        for (let i = x; i < x + height; ++i) {
            matrix[x][i] = 1;
            matrix[x + height - 1][i] = 1;

        }

        for (let j = y; j < y + width; ++j) {
            matrix[j][y] = 2;
            matrix[j][y + width - 1] = 2;
        }

        return fill(
            width - padding - 2,
            height - padding - 2,
            x + padding / 2 + 1,
            y + padding / 2 + 1
        );

    }(width, height, 0, 0));
}

let rows = draw(10, 10, 2);

rows.forEach(row => {
    console.log(row.join(" "));
})

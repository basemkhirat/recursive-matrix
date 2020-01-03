/**
 * Draw recursive inner shapes.
 * @param width int
 * @param height int
 * @param padding int
 * @returns {[]}
 */
module.exports = (width, height, padding) => {

    width = parseInt(width);
    height = parseInt(height);
    padding = parseInt(padding);

    // Arguments validation.
    if (width < 20) throw new Error("Width value should be greater than 20.");
    if (Math.abs(width % 2) === 1) throw new Error("Width value should be even.");

    if (height < 20) throw new Error("Height value should be greater than 20.");
    if (Math.abs(height % 2) === 1) throw new Error("Height value should be even.");

    if (padding < 4) throw new Error("Padding value should be greater than or equal 4.");
    if (Math.abs(padding % 2) === 1) throw new Error("Padding value should be even.");

    let matrix = Array(height).fill(0).map(x => Array(width).fill(0));

    return (function render(width, height, x = 0, y = 0) {

        if (width < 1 || height < 1) return matrix;

        for (let i = x; i < x + width; ++i) {
            matrix[x][i] = 1;
            matrix[x + height - 1][i] = 1;
        }

        for (let j = y; j < y + height; ++j) {
            matrix[j][y] = 2;
            matrix[j][y + width - 1] = 2;
        }

        return render(
            width - padding - 2,
            height - padding - 2,
            x + padding / 2 + 1,
            y + padding / 2 + 1
        );

    }(width, height));
}

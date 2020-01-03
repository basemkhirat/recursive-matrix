/**
 * Draw recursive inner shapes.
 * @param width int
 * @param height int
 * @param padding int
 * @returns {Promise}
 */
module.exports = (width, height, padding) => {

    width = parseInt(width);
    height = parseInt(height);
    padding = parseInt(padding);

    // Arguments validation.
    if (isNaN(width)) return Promise.reject("Width value is not a number.");
    if (width < 20) return Promise.reject("Width value should be greater than 20.");
    if (Math.abs(width % 2) === 1) return Promise.reject("Width value should be even.");

    if (isNaN(height)) return Promise.reject("Height value is not a number.");
    if (height < 20) return Promise.reject("Height value should be greater than 20.");
    if (Math.abs(height % 2) === 1) return Promise.reject("Height value should be even.");

    if (isNaN(padding)) return Promise.reject("Padding value is not a number.");
    if (padding < 4) return Promise.reject("Padding value should be greater than or equal 4.");
    if (Math.abs(padding % 2) === 1) return Promise.reject("Padding value should be even.");

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

        return Promise.resolve(render(
            width - padding - 2,
            height - padding - 2,
            x + padding / 2 + 1,
            y + padding / 2 + 1
        ));

    }(width, height));
}

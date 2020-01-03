/**
 * Draw recursive inner shapes.
 * @param width int
 * @param height int
 * @param padding int
 * @returns {Promise}
 */
module.exports = (width, height, padding) => {

    // Arguments validation.

    if (isNaN(width)) return Promise.reject("Width value is not a number.");
    width = parseInt(width);

    if (isNaN(height)) return Promise.reject("Height value is not a number.");
    height = parseInt(height);

    if (isNaN(padding)) return Promise.reject("Padding value is not a number.");
    padding = parseInt(padding);

    if (width < 20) return Promise.reject("Width value should be greater than 20.");
    if (Math.abs(width % 2) === 1) return Promise.reject("Width value should be even.");

    if (height < 20) return Promise.reject("Height value should be greater than 20.");
    if (Math.abs(height % 2) === 1) return Promise.reject("Height value should be even.");

    if (padding < 4) return Promise.reject("Padding value should be greater than or equal 4.");
    if (Math.abs(padding % 2) === 1) return Promise.reject("Padding value should be even.");

    let box = Array(height).fill(0).map(() => Array(width).fill(0));

    return (function render(width, height, x = 0, y = 0) {

        if (width < 1 || height < 1) return box;

        // Draw rows.
        for (let i = x; i < width + x; ++i) {

            // Draw the upper rows from up to down
            box[x][i] = 1;

            // Draw the below rows from bottom to up
            box[x + height - 1][i] = 1;
        }

        // Draw columns.
        // Here we override the first and last items in every row to '2'
        // so that we can pass the test cases.
        for (let j = y; j < height + y; ++j) {

            // Draw the left columns from left to right
            box[j][y] = 2;

            // Draw the right columns from right to left
            box[j][y + width - 1] = 2;
        }

        return Promise.resolve(render(
            width - padding - 2,
            height - padding - 2,
            x + padding / 2 + 1,
            y + padding / 2 + 1
        ));

    }(width, height));
}

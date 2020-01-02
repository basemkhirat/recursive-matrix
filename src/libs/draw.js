/**
 * Draw recursive inner shapes.
 * @param width int
 * @param height int
 * @param padding int
 * @returns {[]}
 */
module.exports = (width, height, padding) => {

    // Arguments validation.
    if (width < 20) throw new Error("Width value should be greater than 20.");
    if (Math.abs(width % 2) === 1) throw new Error("Width value should be even.");

    if (height < 20) throw new Error("Height value should be greater than 20.");
    if (Math.abs(height % 2) === 1) throw new Error("Height value should be even.");

    if (padding < 4) throw new Error("Padding value should be greater than or equal 4.");
    if (Math.abs(padding % 2) === 1) throw new Error("Padding value should be even.");

    /**
     * Self-invoked function
     * to fill the matrix
     */
    return (function fill(width, height, padding) {

        /**
         * Draw the the shape of the center if possible
         */
        if (width <= padding + 2 || height <= padding + 2) {
            return [
                // generate the first line
                [2, ...Array(width - 2).fill(1), 2],

                // generate the next lines if possible
                ...Array.from(Array( height - 2), () => width < 2 ? [2] : [2, ...Array( width - 2).fill(0), 2]),

                // generate the last line
                [2, ...Array(width - 2).fill(1), 2],
            ];
        }
        /**
         * Draw the main outer shape
         */
        return [

            // generate the first line
            [2, ...Array(width - 2).fill(1), 2],

            // generate the next lines until we have the first inner shape.
            ...Array.from(Array(padding / 2), () => [2, ...Array(width - 2).fill(0), 2]),

            /**
             * Call the recursion function to
             * generate the inner shapes recursively
             * -2 to ignore the start/end item in row
             */
            ...fill(width - padding - 2, height - padding - 2, padding)
                .map(box => {
                        return [
                            2,
                            ...Array(padding / 2).fill(0),
                            ...box,
                            ...Array(padding / 2).fill(0),
                            2
                        ];
                    }
                ),

            // generate the next lines until the pre last line.
            ...Array.from(Array(padding / 2), () => [2, ...Array(width - 2).fill(0), 2]),

            // generate the last line
            [2, ...Array(width - 2).fill(1), 2],
        ];

    })(width, height, padding);
}

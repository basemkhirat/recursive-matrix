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
    if (Math.abs(width % 2) == 1) throw new Error("Width value should be even.");

    if (height < 20) throw new Error("Height value should be greater than 20.");
    if (Math.abs(height % 2) == 1) throw new Error("Height value should be even.");

    if (padding < 4) throw new Error("Padding value should be greater than or equal 4.");
    if (Math.abs(padding % 2) == 1) throw new Error("Padding value should be even.");

    /**
     * Self-invoked function
     * to fill the matrix
     */
    return (function fill(width, height, padding) {

        /**
         * Draw the inner shapes
         */
        if (width <= padding + 2 || height <= padding + 2) {
            // if (width <= 0 || height <= 0) return [];
            // if (height < 2) return [Array(width).fill(1)];
            return [
                [2, ...Array(width - 2).fill(1), 2],
                ...Array.from(Array( height - 2), () => width < 2 ? [2] : [2, ...Array( width - 2).fill(0), 2]),
                [2, ...Array(width - 2).fill(1), 2],
            ];
        }

        /**
         * Draw the main outer shape
         */
        return [
            [2, ...Array(width - 2).fill(1), 2],
            ...Array.from(Array(padding / 2), () => [2, ...Array(width - 2).fill(0), 2]),

            /**
             * Call the recursion function to
             * draw the inner shapes recursively
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

            ...Array.from(Array(padding / 2), () => [2, ...Array(width - 2).fill(0), 2]),
            [2, ...Array(width - 2).fill(1), 2],
        ];

    })(width, height, padding);
}

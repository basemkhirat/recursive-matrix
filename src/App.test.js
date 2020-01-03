import data from '../data.json';
import draw from './libs/draw';

data.forEach(row => {

    let args = row.input.split(",").map(number => parseInt(number));

    test("drawing the matrix with " + row.input, () => {
        draw.apply(this, args).then(data => {
            expect(JSON.stringify(data)).toEqual(row.pixelArrayJson);
        })
    });
});




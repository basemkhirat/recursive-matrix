import data from '../data.json';
import Draw from './libs/draw';

data.forEach(row => {

    let args = row.input.split(",").map(number => parseInt(number));

    test("drawing the matrix with " + row.input, () => {
        expect(JSON.stringify(Draw.apply(this, args))).toEqual(row.pixelArrayJson);
    });
});



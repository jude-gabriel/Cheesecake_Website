/**************************************************
 * Calls unit test on the sum.js file
 * 
 * Author: Jude Gabriel
 * Date: January 25, 2022
 **************************************************/

//Test for the sum function. Inputs 1, 2. Expected output 3
const sum = require('../public/javascripts/sum.js');
    test('adds 1 + 2 to equal 3', () => {
        expect(sum(1, 2)).toBe(3);
    });

    
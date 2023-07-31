//import fizzbuzz from './fizzbuzz';
const fizzbuzz = require('./fizzbuzz');


describe('fizzbuzz',()=>{
    test ('test',()=>{
        expect(true).toBe(true);
    })

    test('should print 1 if they recibe 1',()=>{
        const expected  =1;
        const result = fizzbuzz(1);
        expect( expected).toBe(result);
    })

    test('should print fizz if they recibe 3',()=>{
        const expected  ='fizz';
        const result = fizzbuzz(3);
        expect( expected).toBe(result);
    })

    test('should print fizz if they recibe a multiple of 3',()=>{
        const expected  ='fizz';
        const result = fizzbuzz(9);
        expect( expected).toBe(result);
    })

    test('should print buzz if they recibe a 5',()=>{
        const expected  ='buzz';
        const result = fizzbuzz(5);
        expect( expected).toBe(result);
    })

    test('should print buzz if they recibe a multiple of 5',()=>{
        const expected  ='buzz';
        const result = fizzbuzz(10);
        expect( expected).toBe(result);
    })

    test('should print fizzbuzz if they recibe a multiple of 5 and 3',()=>{
        const expected  ='fizzbuzz';
        const result = fizzbuzz(15);
        expect( expected).toBe(result);
    })

    test('should print an error message if the argument is not a number',()=>{
        const expected  ='Error: the argument must be a number';
        const result = fizzbuzz('15');
        expect( expected).toBe(result);
    })


});
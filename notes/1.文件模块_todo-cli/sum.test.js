const {sum, minus} = require('./sum')

test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3)
})

test('minus 100 - 1 tp equal 99', () => {
    expect(minus(100, 1)).toBe(99)
})

test('true or false', () => {
    expect(1).toBeTruthy()
    expect(0).toBeFalsy()
})
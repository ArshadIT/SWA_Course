//Pure - impure functions

//pure 
const add = (x, y) => x + y
add(10, 20) // 20

//impure
let y = 5
const add5 = x => x + y

//or
let y = 3
const addXToY = x => y += x


//function composition
const add10 = x => x + 10
const double = x => x * 2
add10(double(5)) // 20
double(add10(5)) // 30

//We can use function composition
const compose = (...fns) => arg => fns.reduce((acc, fn) => fn(acc), arg)

const add10ThenDouble = compose(add10, double)
const doubleThenAdd10 = compose(double, add10)
add10ThenDouble(5) // 30
doubleThenAdd10(5) // 20

add10(double(5)) === doubleThenAdd10(5) // true
double(add10(5)) === add10ThenDouble(5) // true


//Curring

const add = (x, y) => x + y
const subtract = (x, y) => x - y
const multiply = (x, y) => x * y
const divide = (x, y) => x / y

// Currying converts a function that takes in a certain number of arguments (which is called its arity),
// and if supplied fewer arguments than it takes, return a new function that takes in the rest of the arguments.

const add = x => y => x + y
const subtract = x => y => y - x
const multiply = x => y => x * y
const divide = x => y => y / x

compose(add(5), subtract(1), multiply(4), divide(2))(1) // 10

const sum = (x, y, z) => x + y + z
const curriedSum0 = x => y => z => x + y + z
// or is it
const curriedSum1 = (x, y) => z => x + y + z
// or perhaps
const curriedSum2 = x => (y, z) => x + y + z

curriedAdd(3)(4) // 7
curriedAdd(3, 4) // 7
curriedSum(1, 2, 3) // 6
curriedSum(1)(2)(3) // 6
curriedSum(1, 2)(3) // 6
curriedSum(1)(2, 3) // 6

//map
//reduce
//filter
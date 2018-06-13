//call 
var obj = { name: 12, num1: 1 }
var getName = function (a, b) {
    return this.name + this.num1 + a + b;
}
//console.log(getName.call(obj, 1, 2))

//apply 
var obj = { name: 12, num1: 1 }
var getName = function (a, b) {
    return this.name + this.num1 + a + b;
}
let arr = [1, 2, 3]
//console.log(getName.apply(obj, arr))

//bind
var obj = { name: 12, num1: 1 }
var getName = function (a, b) {
    return this.name + this.num1 + a + b;
}
//let arr = [1, 2, 3]
let bound = getName.bind(obj, arr)
//console.log(bound(1, 2, 3))

let person = {
    name: 'shubhedu',
    hello: function (things) {
        console.log(this.name + " Say hello " + things)
    }
}
//console.log(person.hello("World"));
let fun = person.hello.bind({ name: "Abhishek" });
//console.log(fun("Bye"))

each.js
=======

an prototype extend function for Object and Array iteration

* avoid using temporarily local variable (e.g. `var i, key, ...`)
* using `break` and `continue` to control iteration
* support chaining design pattern
* make the code more readable, clean, and graceful

Usage
-------

```javascript
Object.each(callback);  // callback(key, value)    ->    key is a string
Array.each(callback);   // callback(index, value)  ->  index is a number
```

#### 1. show each object's key and value

```javascript
var person = {
  name: "Leon",
  age: 25,
  sex: "male"
};

person.each(function (key, value) {
  console.log(key + ": " + value);
});


[output]

name: Leon
age: 25
sex: male
```

#### 2. show each item in array

```javascript
var fruits = ["Banana", "Orange", "Apple", "Mango"];

fruits.each(function(index, value) {
  console.log(index + ". " + value);
});


[output]

0. Banana
1. Orange
2. Apple
3. Mango
```

#### 3. using `this` to refer the Object or Array in callback function

```javascript
var person = {
  name: "Leon",
  age: 25,
  sex: "male"
};

person.each(function(key, value) {
  if (key === "name" && value === "Leon") {
    // add last name behind
    this[key] += " Huang";
  }
});

console.log(JSON.stringify(person, null, 2));


[output]

{
  "name": "Leon Huang",
  "age": 25,
  "sex": "male"
}
```

or

```javascript
var fruits = ["Banana", "Orange", "Apple", "Mango"];

fruits.each(function (i, fruit) {
  if (i === this.length - 1) {
    console.log("The last fruit is " + fruit);
  }
});


[output]

The last fruit is Mango
```

#### 4. using `break` and `continue` to control iteration in callback function

```javascript
var people = ["Leon", "Henry", "Peggy", "Peter"];

people.each(function(i, ppl) {
  console.log(i + ". " + ppl);

  if (ppl.toLowerCase() === "peggy") {
    console.log(ppl + " is found.");
    return "break";
  }
});


[output]

0. Leon
1. Henry
2. Peggy
Peggy is found.
```

or

```javascript
var people = ["Leon", "Henry", "Peggy", "Peter"];

people.each(function skip_odd(i, ppl) {
  if (i % 2 === 1) {
    return "continue";
  }

  // show even
  console.log(i + ". " + ppl);
});


[output]

0. Leon
2. Peggy
```

#### 5. support chaining design pattern

```javascript
var sum = 0;
var numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

numbers.each(function odd_to_double(i, n) {
  if (n % 2 === 1) {
    this[i] *= 2;
  }
})
.each(function calculate_sum(i, n) {
  sum += n;
});

console.log(numbers);
console.log("sum = " + sum);


[output]

[ 0, 2, 2, 6, 4, 10, 6, 14, 8, 18, 10 ]
sum = 80
```

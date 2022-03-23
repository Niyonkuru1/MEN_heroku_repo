// constructor function
function Person(person_name, person_age, person_gender) {

    // assigning  parameter values to the calling object
    this.name = person_name,
        this.age = person_age,
        this.gender = person_gender
}

Person.prototype.greet = function (nom) {
    return (nom + ' says Hi to ' + this.name
        + " with the years of " + this.age +
        " of the gender " + this.gender)
};

// creating objects
const person1 = new Person('John', 23, 'male');
const person2 = new Person('Sam', 25, 'female');

// accessing properties

// person2.color = "white";
console.log(person1.greet("Belinda"));
// console.log(person2);
//  console.log(Person);




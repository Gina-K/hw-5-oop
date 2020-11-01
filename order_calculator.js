'use strict'

var MENU = {
    PRICE: {
        burgerBig: 100,
        burgerSmall: 50,
        stuffingCheese: 10,
        stuffingLettuce: 20,
        stuffingPotato: 15,
        caesar: 100,
        olivier: 50,
        cola: 50,
        coffee: 80
    },
    CALORIE: {
        burgerBig: 40,
        burgerSmall: 20,
        stuffingCheese: 20,
        stuffingLettuce: 5,
        stuffingPotato: 10,
        caesar: 20,
        olivier: 80,
        cola: 40,
        coffee: 20
    }
};

function Dish(name1, name2, option1, option2) {
    this.custom = {};
    this.custom[name1] = option1;
    this.custom[name2] = option2;
}

Dish.prototype.calculatePrice = function () {
    var cost = 0;
    for (var key in this.custom) {
        if (this.custom[key]) {
            cost += MENU.PRICE[key];
        }
    }
    return cost;
};

Dish.prototype.calculateCalorie = function () {
    var calorie = 0;
    for (var key in this.custom) {
        if (this.custom[key]) {
            calorie += MENU.CALORIE[key];
        }
    }
    return calorie;
};

function Hamburger(burgerBig, burgerSmall, stuffingCheese, stuffingLettuce, stuffingPotato) {
    Dish.call(this);
    this.custom = {
        burgerBig: burgerBig,
        burgerSmall: burgerSmall,
        stuffingCheese: stuffingCheese,
        stuffingLettuce: stuffingLettuce,
        stuffingPotato: stuffingPotato
    }
}

Hamburger.prototype = new Dish();

function Beverage(cola, coffee) {
    Dish.call(this, "cola", "coffee", cola, coffee);
}

Beverage.prototype = new Dish();

function Salad(caesar, olivier, weight) {
    Dish.call(this, "caesar", "olivier", caesar, olivier);
    this.weight = weight;
}

Salad.prototype = new Dish();

Salad.prototype.calculatePrice = function () {
    var basicCalculatePrice = Dish.prototype.calculatePrice;
        return Math.floor(basicCalculatePrice.call(this) / 100 * this.weight);
}

var hamburger = new Hamburger(false, true, false, false, true);
var beverage = new Beverage(false, true);
var salad = new Salad(true, false, 50);

console.log("Hamburger price: " + hamburger.calculatePrice() + " coins");
console.log("Hamburger calorie: " + hamburger.calculateCalorie() + " cal");

console.log("Beverage price: " + beverage.calculatePrice() + " coins");
console.log("Beverage calorie: " + hamburger.calculateCalorie() + " cal");

console.log("Salad price: " + salad.calculatePrice() + " coins");
console.log("Salad calorie: " + hamburger.calculateCalorie() + " cal");

// TODO: Add methods to calculate price and calorie for any salad portion (at this time it works only for 100g)
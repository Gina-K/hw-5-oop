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

function Dish() {
    this.custom = {};
}

Dish.prototype.calculatePrice = function () {
    var cost = 0;
    for (var key in this.custom) {
        if (this.custom[key]) {
            cost += MENU.PRICE[key];
        }
    }
    this.price = cost;
};

Dish.prototype.calculateCalorie = function () {
    var calorieContent = 0;
    for (var key in this.custom) {
        if (this.custom[key]) {
            calorieContent += MENU.CALORIE[key];
        }
    }
    this.calorie = calorieContent;
};

Hamburger.prototype = new Dish;

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

var hamburger = new Hamburger(true, false, false, false, true);

hamburger.calculatePrice();
hamburger.calculateCalorie();
console.log(hamburger.price);
console.log(hamburger.calorie);
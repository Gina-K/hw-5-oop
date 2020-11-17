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
Hamburger.prototype.constructor = Hamburger;

Hamburger.prototype.getName = function () {
    return ((this.custom.burgerBig ? "Big" : "Small") + " hamburger" + (this.custom.stuffingCheese ? " with cheese" : "")
        + (this.custom.stuffingLettuce ? " with lettuce" : "" + (this.custom.stuffingPotato ? " with potato" : "")));
}

function Beverage(cola, coffee) {
    Dish.call(this, "cola", "coffee", cola, coffee);
}

Beverage.prototype = new Dish();
Beverage.prototype.constructor = Beverage;

Beverage.prototype.getName = function () {
    return (this.custom.cola ? "Cola" : "Coffee");
}

function Salad(caesar, olivier, weight) {
    Dish.call(this, "caesar", "olivier", caesar, olivier);
    this.weight = weight;
}

Salad.prototype = new Dish();
Salad.prototype.constructor = Salad;

Salad.prototype.getName = function () {
    return (this.custom.caesar ? "Caesar salad" : "Olivier salad");
}

Salad.prototype.calculatePrice = function () {
    var basicCalculatePrice = Dish.prototype.calculatePrice;
    return Math.floor(basicCalculatePrice.call(this) / 100 * this.weight);
}

Salad.prototype.calculateCalorie = function () {
    var basicCalculateCalorie = Dish.prototype.calculateCalorie;
    return Math.round(basicCalculateCalorie.call(this) / 100 * this.weight);
}

function Order() {
    this.orderContent = [];
    this.isPaid = false;
}

Order.prototype.pay = function () {
    this.isPaid = true;
    console.log("Your order was successfully paid. Thank you!");
    console.log("------------------------------------------------------------------");
};

Order.prototype.addToOrder = function (item) {
    if (!this.isPaid) {
        this.orderContent.push(item);
        console.log(item.getName() + " added to your order.");
        this.calculatePrice();
        this.calculateCalorie();
    } else {
        console.log("Sorry, your order has already been paid so you can't add a new position.");
        console.log("If you want something else, please make a new order.");
    }
}

Order.prototype.removeFromOrder = function (index) {
    if (!this.isPaid) {
        console.log(this.orderContent[index].getName() + " removed from your order.");
        this.orderContent.splice(index, 1);
        this.calculatePrice();
        this.calculateCalorie();
    } else {
        console.log("Sorry, your order has already been paid so you can't delete or change positions.");
    }
}

Order.prototype.calculatePrice = function () {
    var cost = null;
    this.orderContent.forEach(function (item) {
        cost += item.calculatePrice();
    });
    console.log("Your order price is " + cost + " tugr.");
    return cost;
}

Order.prototype.calculateCalorie = function () {
    var calorie = null;
    this.orderContent.forEach(function (item) {
        calorie += item.calculateCalorie();
    });
    console.log("The calorie content of your order is " + calorie + " cal.");
    console.log("------------------------------------------------------------------");
    return calorie;
}

// Usage example

var myOrder = new Order;

myOrder.addToOrder(new Hamburger(false, true, true, false, false));
myOrder.addToOrder(new Beverage(true, false));
myOrder.addToOrder(new Salad(true, false, 100));
myOrder.addToOrder(new Hamburger(true, false, false, true, true));
myOrder.removeFromOrder(0);
myOrder.pay();
myOrder.addToOrder(new Hamburger(true, false, false, true, true));
myOrder.removeFromOrder(0);
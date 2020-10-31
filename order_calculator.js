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

var hamburger = {
    calculatePrice: function () {
        var cost = 0;
        for (var key in this.custom) {
            if (this.custom[key]) {
                cost += MENU.PRICE[key];
            }
        }
        this.price = cost;
    },
    calculateCalorie: function () {
        //    some code here
    },
    price: null,
    calorie: null,
    custom: {
        burgerBig: false,
        burgerSmall: true,
        stuffingCheese: true,
        stuffingLettuce: true,
        stuffingPotato: false
    }
}

hamburger.calculatePrice();
console.log(hamburger.price);
'use strict'
hereApp.service('homeService', ['proxyService', function(proxyService) {
    var self = this;

    self.searchFilterGroup = {
        'DineOut': {
            'type': 'static',
            'heading': 'Dineout Places Nearby',
            'filters': [
                // { 'imgPath': 'img/icons/delivery.svg', 'name': 'Delivery' },
                { 'imgPath': 'img/icons/egg.svg', 'name': 'Breakfast', 'type': 'bakery' },
                { 'imgPath': 'img/icons/lunch.svg', 'name': 'Lunch', 'type': 'restaurant' },
                { 'imgPath': 'img/icons/dinner.svg', 'name': 'Dinner', 'type': 'restaurant' },
                { 'imgPath': 'img/icons/coffee.svg', 'name': 'Cafe', 'type': 'cafe' },
                // { 'imgPath': 'img/icons/drink.svg', 'name': 'Night Life' },
                { 'imgPath': 'img/icons/beer.svg', 'name': 'Bar', 'type': 'bar' },
                { 'imgPath': 'img/icons/hours.svg', 'name': 'Happy Hours', 'type': 'bar' },
                { 'imgPath': 'img/icons/sweet.svg', 'name': 'Sweets', 'type': 'bakery' },
                // { 'imgPath': 'img/icons/chicken.svg', 'name': 'Indian Cuisine' },
                { 'imgPath': 'img/icons/chinese.svg', 'name': 'Chinese', 'type': 'restaurant' },
                // { 'imgPath': 'img/icons/burger.svg', 'name': 'Fast Food' }
            ]
        },
        'Essentials': {
            'type': 'static',
            'heading': 'Essentials Places Nearby',
            'filters': [
                { 'imgPath': 'img/icons/atm.svg', 'name': 'ATM', 'type': 'atm' },
                { 'imgPath': 'img/icons/blood.svg', 'name': 'Blood Bank', 'type': 'bakery' },
                { 'imgPath': 'img/icons/bank.svg', 'name': 'Bank', 'type': 'bank' },
                { 'imgPath': 'img/icons/hospital.svg', 'name': 'Hospital', 'type': 'hospital' },
                { 'imgPath': 'img/icons/police.svg', 'name': 'Police Station', 'type': 'police' },
                { 'imgPath': 'img/icons/medicine.svg', 'name': 'Pharmacy', 'type': 'pharmacy' },
                { 'imgPath': 'img/icons/book.svg', 'name': 'Library', 'type': 'book_store' },
                { 'imgPath': 'img/icons/car-repair.svg', 'name': 'Car Repair', 'type': 'car_repair' }
            ]
        },
        'Entertainment': {
            'type': 'slide',
            'heading': 'Fun & Entertainment Places Nearby',
            'filters': [
                { 'imgPath': 'img/icons/theater.svg', 'name': 'Movie/Theater', 'type': 'movie_theater' },
                { 'imgPath': 'img/icons/stadium.svg', 'name': 'Stadium', 'type': 'stadium' },
                { 'imgPath': 'img/icons/horse.svg', 'name': 'Race Course', 'type': 'bakery' },
                // { 'imgPath': 'img/icons/theme-park.svg', 'name': 'Fun Park' },
                { 'imgPath': 'img/icons/art.svg', 'name': 'Art Gallery', 'type': 'art_gallery' },
                { 'imgPath': 'img/icons/museum.svg', 'name': 'Museum', 'type': 'museum' },
                // { 'imgPath': 'img/icons/disco.svg', 'name': 'Night Club' },
                { 'imgPath': 'img/icons/casino.svg', 'name': 'Casino', 'type': 'casino' },
                { 'imgPath': 'img/icons/bowling.svg', 'name': 'Bowling Alley', 'type': 'bowling_alley' },
                { 'imgPath': 'img/icons/zoo.svg', 'name': 'Zoo', 'type': 'zoo' }
                // { 'imgPath': 'img/icons/community.svg', 'name': 'City Hall' },
                // { 'imgPath': 'img/icons/park.svg', 'name': 'Park' }
            ]
        },
        // 'Miscleneous': {
        //     'type': 'slide',
        //     'heading': 'Other Miscleneous Places for daily life',
        //     'filters': [
        //         { 'imgPath': 'img/icons/shopping-bag.svg', 'name': 'Shopping Mall' },
        //         { 'imgPath': 'img/icons/gym.svg', 'name': 'Gym' },
        //         { 'imgPath': 'img/icons/spa.svg', 'name': 'Spa/Saloon' },
        //         { 'imgPath': 'img/icons/cloth.svg', 'name': 'Cloth Store' },
        //         { 'imgPath': 'img/icons/shoe.svg', 'name': 'Shoe Store' },
        //         { 'imgPath': 'img/icons/departmental-store.svg', 'name': 'Departmental Store' },
        //         { 'imgPath': 'img/icons/convenience-store.svg', 'name': 'Convenience Store' },
        //         { 'imgPath': 'img/icons/jewelry-store.svg', 'name': 'Jewelry Store' },
        //         { 'imgPath': 'img/icons/book-store.svg', 'name': 'Book Store' },
        //         { 'imgPath': 'img/icons/furniture-store.svg', 'name': 'Furniture Store' },
        //         { 'imgPath': 'img/icons/liqor-store.svg', 'name': 'Liquor Store' },
        //         { 'imgPath': 'img/icons/hardware-store.svg', 'name': 'Hardware Store' }
        //     ]
        // }
    }
}]);

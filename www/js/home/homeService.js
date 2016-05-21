'use strict'
hereApp.service('homeService',['proxyService',function(proxyService){
	var self =this;

	self.searchFilterGroup = {
		'DineOut':{
			'type':'static',
			'heading':'Here are some ways to think about you next meal',
			'filters':[
				{'imgPath':'img/icons/delivery.svg', 'name':'Delivery'},
				{'imgPath':'img/icons/egg.svg', 'name':'Breakfast'},
				{'imgPath':'img/icons/lunch.svg', 'name':'Lunch'},
				{'imgPath':'img/icons/dinner.svg', 'name':'Dinner'},
				{'imgPath':'img/icons/coffee.svg', 'name':'Cafe'},
				{'imgPath':'img/icons/drink.svg', 'name':'Night Life'},
				{'imgPath':'img/icons/beer.svg', 'name':'Bar'},
				{'imgPath':'img/icons/hours.svg', 'name':'Happy Hours'},
				{'imgPath':'img/icons/sweet.svg', 'name':'Sweets'},
				{'imgPath':'img/icons/chicken.svg', 'name':'Indian Cuisine'},
				{'imgPath':'img/icons/chinese.svg', 'name':'Chinese'},
				{'imgPath':'img/icons/burger.svg', 'name':'Fast Food'}
			]
		},
		'Essentials':{
			'type':'static',
			'heading':'Here are some Nearby Essentials which will help you in many ways',
			'filters':[
				{'imgPath':'img/icons/atm.svg', 'name':'ATM'},
				{'imgPath':'img/icons/blood.svg', 'name':'Blood Bank'},
				{'imgPath':'img/icons/bank.svg', 'name':'Bank'},
				{'imgPath':'img/icons/hospital.svg', 'name':'Hospital'},
				{'imgPath':'img/icons/police.svg', 'name':'Police Station'},
				{'imgPath':'img/icons/medicine.svg', 'name':'Pharmacy'},
				{'imgPath':'img/icons/book.svg', 'name':'Library'},
				{'imgPath':'img/icons/car-repair.svg', 'name':'Car Repair'}
			]
		},
		'Entertainment':{
			'type':'slide',
			'heading':'Are You looking for Some Nearby Entertainment & Fun',
			'filters':[
				{'imgPath':'img/icons/theater.svg', 'name':'Movie/Theater'},
				{'imgPath':'img/icons/stadium.svg', 'name':'Stadium'},
				{'imgPath':'img/icons/horse.svg', 'name':'Race Course'},
				{'imgPath':'img/icons/theme-park.svg', 'name':'Fun Park'},
				{'imgPath':'img/icons/art.svg', 'name':'Art Gallery'},
				{'imgPath':'img/icons/museum.svg', 'name':'Museum'},
				{'imgPath':'img/icons/disco.svg', 'name':'Night Club'},
				{'imgPath':'img/icons/casino.svg', 'name':'Casino'},
				{'imgPath':'img/icons/bowling.svg', 'name':'Bowling Alley'},
				{'imgPath':'img/icons/zoo.svg', 'name':'Zoo'},
				{'imgPath':'img/icons/community.svg', 'name':'City Hall'},
				{'imgPath':'img/icons/park.svg', 'name':'Park'}
			]
		},
		'Miscleneous':{
			'type':'slide',
			'heading':'Other Miscleneous Places for daily life',
			'filters':[
				{'imgPath':'img/icons/shopping-bag.svg', 'name':'Shopping Mall'},
				{'imgPath':'img/icons/gym.svg', 'name':'Gym'},
				{'imgPath':'img/icons/spa.svg', 'name':'Spa/Saloon'},
				{'imgPath':'img/icons/cloth.svg', 'name':'Cloth Store'},
				{'imgPath':'img/icons/shoe.svg', 'name':'Shoe Store'},
				{'imgPath':'img/icons/departmental-store.svg', 'name':'Departmental Store'},
				{'imgPath':'img/icons/convenience-store.svg', 'name':'Convenience Store'},
				{'imgPath':'img/icons/jewelry-store.svg', 'name':'Jewelry Store'},
				{'imgPath':'img/icons/book-store.svg', 'name':'Book Store'},
				{'imgPath':'img/icons/furniture-store.svg', 'name':'Furniture Store'},
				{'imgPath':'img/icons/liqor-store.svg', 'name':'Liquor Store'},
				{'imgPath':'img/icons/hardware-store.svg', 'name':'Hardware Store'}
			]
		}
	}
}]);
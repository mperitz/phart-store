'use strict'; // eslint-disable-line semi

var request = require('request'),
	cheerio = require('cheerio');
// var BandModel = require('./models/band');
// var UserModel = require('./models/user')

const db = require('APP/db')

var USERSARRAY = [];
var BANDSARRAY = [];
var ITEMSARRAY = [];
var count = 0;
var max = 100;
var Queue = [];
var URLQueue = [];

function scraper (URL){

			request(URL, function(err, response, body){

				var DOMNodes = [];

				if(!err && response.statusCode === 200){

							var $ = cheerio.load(body);
							$('.prod-detail__heading', '#p_lt_Body_lt_WebPartZone1_wpzProductDetail_ProductDetail_pnlDetailSettings' ).each(
								function(){
									DOMNodes.push(this.children[0].data);
								}
							)
							$('.prod-info__category', '#p_lt_Body_lt_WebPartZone1_wpzProductDetail_ProductDetail_ucPricing_liCategory').each(function(){
									DOMNodes.push(this.children[0].data);
								}
							)
							$('#p_lt_Body_lt_WebPartZone1_wpzProductDetail_ProductDetail_ProductDetailsTabs_hgcDesc', '.prod-content__item__content').each(function(){
									DOMNodes.push(this.children[0].data);
								}
							)
							$('#p_lt_Body_lt_WebPartZone3_wpzProductSupport_CrossSellProducts_ctlProductSummaryGroup_ctlProductSummary1_ctlHeading', '#p_lt_Body_lt_WebPartZone3_wpzProductSupport_CrossSellProducts_ctlProductSummaryGroup_hgcGroupSettings').each(function(){
									DOMNodes.push(this.children[0].data);
								}
							)
							$('#p_lt_Body_lt_WebPartZone3_wpzProductSupport_CrossSellProducts_ctlProductSummaryGroup_ctlProductSummary2_spnAuthorBody', '#p_lt_Body_lt_WebPartZone3_wpzProductSupport_CrossSellProducts_ctlProductSummaryGroup_hgcGroupSettings').each(function(){
									DOMNodes.push(this.children[0].data);
								}
							)
							$('#p_lt_Body_lt_WebPartZone3_wpzProductSupport_CrossSellProducts_ctlProductSummaryGroup_ctlProductSummary3_ctlHeading', '#p_lt_Body_lt_WebPartZone3_wpzProductSupport_CrossSellProducts_ctlProductSummaryGroup_hgcGroupSettings').each(function(){
									DOMNodes.push(this.children[0].data);
								}
							)
							$('#p_lt_Body_lt_WebPartZone1_wpzProductDetail_ProductDetail_ucZoomableImage_rptMainImages_ctl01_imgMainImage_hgcResponsive', '.prod-detail__img__inner').each(function(){
									DOMNodes.push(this.attribs['data-src'])
								}
							)
							$('#p_lt_Body_lt_WebPartZone3_wpzProductSupport_CrossSellProducts_ctlProductSummaryGroup_ctlProductSummary1_ctlImage_hgcResponsive','#p_lt_Body_lt_WebPartZone3_wpzProductSupport_CrossSellProducts_ctlProductSummaryGroup_ctlProductSummary1_lnkImage').each(function(){
									DOMNodes.push(this.parent.attribs.href)
								}
							)
							// console.log(DOMNodes)
					}


						var band = {};
						band.name = DOMNodes[0].replace('/r','').trim()
						band.profile_image = DOMNodes[6];
						band.description = DOMNodes[2].replace('/r','').trim();
						// band.genre = DOMNodes[1];
						band.favorite_users = [DOMNodes[3], DOMNodes[4], DOMNodes[5]];
						band.favorite_pieces = [DOMNodes[3], DOMNodes[4], DOMNodes[5]];
						console.log(band);
						BANDSARRAY.push(band);

						// BandModel.create(band);
						count++;


			})
}

function crawl(URL){
	request(URL, function(err, response, body){

			if(!err && response.statusCode === 200){
				// for(var i = 0; i< 24; i++){
					// var value;
					// 	if(i<10) value = '0' + i;
					// 	else value = i;
								var $ = cheerio.load(body);
								$(`.prod--music`,'.prod-listing__prod').each(function(){
									// console.log(this, '@@@')
									Queue.push(this)
									})

			}


			for(var i = 0; i<Queue.length; i++){

				if(Queue[i].children[3].children[1].attribs.href != undefined && URLQueue.indexOf(Queue[i].children[3].children[1].attribs.href) === -1){
					URLQueue.push(Queue[i].children[3].children[1].attribs.href)
				}
			}
			console.log(URLQueue)

			for(var j = 0; j<URLQueue.length; j++){
				var url = 'http://store.hmv.com/music/'+URLQueue[j];
				console.log(url);
				if(count < 1000){
					scraper(url);

				}else{
					j = URLQueue.length
				}
			}
		URLQueue = []
	});
}

for(var i = 0; i<1; i++){

	var input = `http://store.hmv.com/music/cd?sort=most_relevant%20desc&quantity=24&page=${i}&view=grid`;
	crawl(input);
}

var URLEndings = [];
var photoEndings = [];
var emailBeginnings = [];
var numPresidents = 0;

function scrapePresidents (URL, imageURL, emailBeginning){
		var array = []
		var user = {};
		request(URL, function(error, response, body){
			if(!error && response.statusCode === 200){
				var $ = cheerio.load(body);
				$('#main_content_id', '#main_content').each(function(){
					// user.name =;
					// user.email;

					// user.about;

					array.push(this)
				}
				)
				// user.photo = 'http://www.ipl.org/div/potus' + imageURL;
				user.name = array[0].children[19].children[0].next.children[0].next.next.next.children[0].children[0].children[0].children[0].data;
				$('li', '#main_content').each(function(){
					array.push(this)
				}
				)
				var description = [];
				for(var i = 0; i< array[1].parent.children.length; i++){
					if(array[1].parent.children[i].children != undefined){
				 		description.push(array[1].parent.children[i].children[0].data)
					}
				}
				user.about_me = description.join('\n');
				user.email = emailBeginning + Math.random()*10 + '@whitehouse.gov';
				user.username = emailBeginning;
				// user.password = '1234'

				// console.log(description.join('\n'))
				// console.log(user)
				USERSARRAY.push(user);

			}
			// console.log(array[1].parent.children[3].children[0].data);
			// console.log(array[1].next.next)

		})
}

request('http://www.ipl.org/div/potus/', function( error, response, body){
	if(!error && response.statusCode === 200){
		var p = [];

							var $ = cheerio.load(body);
							$('ol.potus','.potusTableIndex').each(function(){
								p.push(this)
							})
							var POTUS = p[0].children[0].next.children[0].attribs;
							// console.log(POTUS)
							// console.log(p[0].children[1].children[0].attribs)
							for(var i = 0; i<p[0].children.length; i++){
								if(p[0].children[i].children && URLEndings.indexOf(p[0].children[i].children[0].attribs) === -1){
									URLEndings.push(p[0].children[i].children[0].attribs)
								}
							}
							// console.log(URLEndings)
							for(var i = 0; i<URLEndings.length; i++){
								var name = URLEndings[i].href.split('.')[0]
								var ending = '/images/' + name + '.gif';
								photoEndings.push(ending);
								emailBeginnings.push(name);
							}
							// console.log(URLEndings)
	}
	for (var i = 0; i < URLEndings.length; i++){
	// console.log(URLEndings[i])
	var URL = 'http://www.ipl.org/div/potus/' + URLEndings[i].href
	numPresidents++;
	// console.log(URL);
	scrapePresidents(URL, photoEndings[i], emailBeginnings[i]);
	}
})

var tags = [];
var number = 0;

function scrapeArticles(URL){
	request(URL, function(err, response, body){

			console.error(err);
			// if(!err && response.statusCode = 200){
				number ++;
				number ++;
				number ++;
				var item = {}
					var $ = cheerio.load(body);
					$('#image-carousel', '#image-main').each(function(){
						if(this){
							// console.log(this.children[3].attribs)
							item.profile_image = this.children[1].attribs['data-full-image-href']
							// console.log(this.children[0])
						}
						// console.log('fingers crossed')
					})
					$('#description-text', '#description').each(function(){
						item.description = this.children[0].data.replace('\r','').trim() + '           \n';
					})

					item.num_available = Math.floor(Math.random()*100);

					$('.buy-box__price.ui-toolkit').each(function(){
						var string = this.children[1].children[0].data.replace('\r','').trim()
						var price = parseInt(string.slice(1, string.length-1));
						item.price = price * 100;
					})
					item.num_upvotes = Math.floor(Math.random()*500);

					$('#listing-page-cart-inner', '#listing-page-cart').each(function(){
						console.log(this.children[3].attribs['data-subject'])
						item.name = this.children[3].attribs['data-subject'];
						var medium = item.name.split(',')
						var med = medium.slice(1,medium.length-2).join(', ')

						if(med.length === 0){
							med = 'canvas'
						}
						item.medium = med;
						tags.push(med);
					})
					item.tags = tags.join(',');
					// if(item.profile_image && item.price && item.description){
						ITEMSARRAY.push(item);
					// }

					if(number%2 == 1){
						tags = []
					}




	})
}

var array = []
for(var i = 2; i<3; i++){
	request(`https://www.etsy.com/market/music_fan_art/${i}`, function(err, response, body){

			console.error(err);
			// if(!err && response.statusCode = 200){

					var $ = cheerio.load(body);
					$('.buyer-card', '.block-grid-item').each(function(){
						if(this.attribs.href){
							array.push(this.attribs.href)
						}
						// console.log('fingers crossed')
					})
				// 	console.log(array.length)
				// console.log('here')
			// }
			for(var i =0; i<array.length; i++){
				scrapeArticles(array[i])
			}

	})

}

const ORDERSARRAY = [
      {
        quantity: 5,
        price: 5.00,
        status: 'In Cart',
        item_id: 1,
        user_id: 1
      },
      {
        quantity: 1,
        price: 25.00,
        status: 'In Cart',
        item_id: 2,
        user_id: 1
      },
      {
        quantity: 1,
        price: 30.00,
        status: 'Processing',
        item_id: 8,
        user_id: 5
      },
      {
        quantity: 3,
        price: 30.00,
        status: 'Complete',
        item_id: 10,
        user_id: 5
      },
      {
        quantity: 10,
        price: 25.00,
        status: 'Dispatched',
        item_id: 12,
        user_id: 44
      }
    ]

const seedUsers = () => db.Promise.map(USERSARRAY, user => db.model('users').create(user))
const seedBands = () => db.Promise.map(BANDSARRAY, band => db.model('bands').create(band))
const seedItems = () => db.Promise.map(ITEMSARRAY, item => db.model('items').create(item))
const seedOrders = () => db.Promise.map(ORDERSARRAY, order => db.model('orders').create(order))

setTimeout(function(){
	console.log(BANDSARRAY);
	db.didSync
	  .then(() => db.sync({force: true}))
	  .then(seedUsers)
	  .then(users => console.log(`Seeded ${users.length} users OK`))
	  .then(seedBands)
	  .then(bands => console.log(`Seeded ${bands.length} bands OK`))
	  .then(seedItems)
	  .then(items => console.log(`Seeded ${items.length} items OK`))
    .then(seedOrders)
    .then(orders => console.log(`Seeded ${orders.length} orders OK`))
    .catch(error => console.error(error))
	  .finally(() => db.close())
	  console.log(BANDSARRAY);
}, 30000)

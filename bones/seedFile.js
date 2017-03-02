var request = require('request'),
	cheerio = require('cheerio');
var BandModel = require('./db/models/band');
var UserModel = require('./db/models/user')
// var db = require('./Models/db')
// var Crawler = require('node-webcrawler');
// var url = require('url');

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
						band.genre = DOMNodes[1];
						band.favorite_users = [DOMNodes[3], DOMNodes[4], DOMNodes[5]];
						band.favorite_pieces = [DOMNodes[3], DOMNodes[4], DOMNodes[5]];

						BandModel.create(band);
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
				if(count < max){
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
				console.log(user)
				UserModel.create(user)
				.catch(console.error)
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

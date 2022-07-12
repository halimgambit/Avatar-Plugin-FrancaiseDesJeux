exports.action = function(data, callback){

	
	var tblCommand = {
		loto : function() {loto (data, client);},					
		euromillion : function() {euromillion (data, client);}					
	};
	
	let client = setClient(data);

	info("FrancaiseDesJeux:", data.action.command, "From:", data.client, "To:", client);
	tblCommand[data.action.command]();
	callback();
}

function loto (data, client) {
	
	var url = 'https://www.fdj.fr/jeux-de-tirage/loto/resultats';
	request = require('request');
	cheerio = require('cheerio');
	request(url, function (error, response, body) {
	if (error || response.statusCode != 200) {
	Avatar.speak("je n'arrive pas accédé au site", data.client, function(){
	Avatar.Speech.end(data.client);
	});
	return;
}
	if(response) {
	var $ = cheerio.load(body, {xmlMode: true, ignoreWhitespace: false, lowerCaseTags: false });
    var dateloto = $('h1.fdj.Title').text();
    var numloto = $('#loto-results > div > section.result-full__tab-item.is-selected > div.result-full__drawing-content > div.result-full__drawing-infos > ul:nth-child(2) > li:nth-child(1)').text();
	var numloto1 = $('#loto-results > div > section.result-full__tab-item.is-selected > div.result-full__drawing-content > div.result-full__drawing-infos > ul:nth-child(2) > li:nth-child(2)').text();
	var numloto2 = $('#loto-results > div > section.result-full__tab-item.is-selected > div.result-full__drawing-content > div.result-full__drawing-infos > ul:nth-child(2) > li:nth-child(3)').text();
	var numloto3 = $('#loto-results > div > section.result-full__tab-item.is-selected > div.result-full__drawing-content > div.result-full__drawing-infos > ul:nth-child(2) > li:nth-child(4)').text();
	var numloto4 = $('#loto-results > div > section.result-full__tab-item.is-selected > div.result-full__drawing-content > div.result-full__drawing-infos > ul:nth-child(2) > li:nth-child(5)').text();
    var numlotomagique = $("span.game-ball.is-special").text();
    Avatar.speak(dateloto, data.client, function(){
	Avatar.speak(numloto, data.client, function(){
	Avatar.speak(numloto1, data.client, function(){
	Avatar.speak(numloto2, data.client, function(){
	Avatar.speak(numloto3, data.client, function(){
	Avatar.speak(numloto4, data.client, function(){
	Avatar.speak("le numéro magique est l'e." + numlotomagique, data.client, function(){ 
	Avatar.Speech.end(data.client);
	});
    });
    });
	})
    });
	});
    });
	}
	});
	return;
}


function euromillion (data, client) {
	
	var url = 'https://www.fdj.fr/jeux-de-tirage/euromillions-my-million/resultats';
	request = require('request');
	cheerio = require('cheerio');
	request(url, function (error, response, body) {
	if (error || response.statusCode != 200) {
	Avatar.speak("je n'arrive pas accédé au site", data.client, function(){
	Avatar.Speech.end(data.client);
	});
	return;
}
	if(response) {
	var $ = cheerio.load(body, {xmlMode: true, ignoreWhitespace: false, lowerCaseTags: false });
    var numeuromillion = $('#euromillions-results > div > section.result-full__tab-item.is-selected > div.result-full__drawing-content > div.result-full__drawing-infos > ul > li:nth-child(1)').text();
	var numeuromillion1 = $('#euromillions-results > div > section.result-full__tab-item.is-selected > div.result-full__drawing-content > div.result-full__drawing-infos > ul > li:nth-child(2)').text();
	var numeuromillion2 = $('#euromillions-results > div > section.result-full__tab-item.is-selected > div.result-full__drawing-content > div.result-full__drawing-infos > ul > li:nth-child(3)').text();
	var numeuromillion3 = $('#euromillions-results > div > section.result-full__tab-item.is-selected > div.result-full__drawing-content > div.result-full__drawing-infos > ul > li:nth-child(4)').text();
	var numeuromillion4 = $('#euromillions-results > div > section.result-full__tab-item.is-selected > div.result-full__drawing-content > div.result-full__drawing-infos > ul > li:nth-child(5)').text();
	Avatar.speak(numeuromillion, data.client, function(){
	Avatar.speak(numeuromillion1, data.client, function(){
	Avatar.speak(numeuromillion2, data.client, function(){
	Avatar.speak(numeuromillion3, data.client, function(){
    Avatar.speak(numeuromillion4, data.client, function(){
	Avatar.Speech.end(data.client);
	});
});
	});
});
});
}
	});
	return;
}

function setClient (data) {
	var client = data.client;
	if (data.action.room)
	client = (data.action.room != 'current') ? data.action.room : (Avatar.currentRoom) ? Avatar.currentRoom : Config.default.client;
    if (data.action.setRoom)
	client = data.action.setRoom;
	return client;
}
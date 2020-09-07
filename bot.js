console.log("hello followed bot!!!");

const Twit = require("twit"); //importing
const config = require("./config");
require("dotenv").config();

//authenticate
const T = new Twit(config);

//
// (5) FAVRIOUTE BOT
//
const favoriteTweet = function () {
	var params = {
		q: "#covid19, coronavirus", // REQUIRED
		result_type: "recent",
	};
	// find the tweet
	T.get("/search/tweets", params, (err, data) => {
		// find tweets
		var tweet = data.statuses;
		var randomTweet = ranDom(tweet); // pick a random tweet

		// if random tweet exists
		if (typeof randomTweet != "undefined") {
			// Tell TWITTER to 'favorite'
			T.post("favorites/create", { id: randomTweet.id_str }, function (
				err,
				response
			) {
				// if there was an error while 'favorite'
				if (err) {
					console.log("CANNOT BE FAVORITE... Error");
				} else {
					console.log("FAVORITED... Success!!!");
				}
			});
		}
	});
};
// grab & 'favorite' as soon as program is running...
favoriteTweet();
// 'favorite' a tweet in every 2 minute
setInterval(favoriteTweet, 20000);

// function to generate a random tweet tweet
function ranDom(arr) {
	var index = Math.floor(Math.random() * arr.length);
	return arr[index];
}

//
// (4) RETWEET BOT
//
const retweet = function () {
	const params = {
		q: "#covid, covid",
		result_type: "recent",
	};
	T.get("serach/tweete", prams, (err, data) => {
		if (err) {
			console.log(err);
		} else {
			const retweetId = data.statuses[0].id_str;
			//Tell Twitter to retweet
			T.post("statuses/retweet/:id", { id: retweetId }, (err, response) => {
				if (response) {
					console.log("Retweeted!!!");
				}
				// if there was an error while tweeting
				if (err) {
					console.log(
						"Something went wrong while RETWEETING... Duplication maybe..."
					);
				}
			});
		}
	});
};
retweet();
// retweet in every 2 minute
setInterval(retweet, 20000);

//
// (3)
//
//setting up a user stream
// const stream = T.stream("user");     //Not working - twitter deprecated it
// var stream = T.stream("statuses/filter", { track: "@Anna74841249" });

// stream.on("follow", followed);

// function followed(eventMsg) {
// 	console.log("follow event");
// 	const name = eventMsg.source.name;
// 	const screenName = eventMsg.source.screen_name; //screenName is the actual name of the user

// 	tweetIt(`@${screenName}thanks! for following;)`);
// }
// function tweetIt(txt) {
// 	const tweet = {
// 		status: txt,
// 	};
// 	T.post("statuses/update", tweet, (err, data, response) => {
// 		if (err) {
// 			console.log(err);
// 		} else {
// 			console.log("it worked!!!");
// 		}
// 	});
// }

//
// (2)
//  i.tweet 'hello world!'
//  ii.scheduling a tweet:
//
// function tweetIt() {
// 	const r = Math.floor(Math.random() * 100);
//
// 	const tweet = {
// 		status: "Here is random number " + r + " #twitter from node.js",
// 	};
// 	T.post("statuses/update", tweet, (err, data, response) => {
// 		if (err) {
// 			console.log(err);
// 		} else {
// 			console.log("it worked!!!");
// 		}
// 	});
// }
////set time for tweets
// setInterval(tweetIt, 1000 * 20);
////calling the function
// tweetIt();

// (1)
//  search twitter for all tweets containing the word 'banana' since July 11, 2011
//
// const params = {
// 	q: "rainbow",
// 	count: 2,
// };
// T.get("search/tweets", params, (err, data, response) => {
// 	const tweets = data.statuses;
// 	for (var i = 0; i < tweets.length; i++) {
// 		console.log(tweets[i].text);
// 	}
// });

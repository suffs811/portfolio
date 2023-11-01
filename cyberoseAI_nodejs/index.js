const fs = require('fs');
const nodemailer = require('nodemailer');
var extractor = require('unfluff');
var cron = require('node-cron');
const dotenv = require('dotenv');
dotenv.config();

// get text from hacker news cites
function getUrls() {

	// security week
	fetch("https://www.securityweek.com/feed/")
		.then(result => result.text())
		.then(text => {
			var split = text.split("<item>");
			for (i of split) {
				var newSplit = i.split("<link>")[1];
				var link = newSplit.split("</link>")[0];
				if (link !== "https://www.securityweek.com/") {
					fs.appendFile('links.txt', link+"\n", function (err) {
						if (err) throw err;
						console.log("link saved");
					});
				} else {
					continue;
				}
			}
		});
}


function summ() {
	console.log("summarizing articles");


	const project = 'cyberose';
	const location = 'cyberose';

	const aiplatform = require('@google-cloud/aiplatform');

	// Imports the Google Cloud Prediction service client
	const {PredictionServiceClient} = aiplatform.v1;

	// Import the helper module for converting arbitrary protobuf.Value objects.
	const {helpers} = aiplatform;

	// Specifies the location of the api endpoint
	const clientOptions = {
		apiEndpoint: 'us-central1-aiplatform.googleapis.com',
	};

	const publisher = 'google';
	const model = 'text-bison';

	// Instantiates a client
	const predictionServiceClient = new PredictionServiceClient(clientOptions);

	fs.appendFile('summary.txt', "Your Cybersecurity Article Summaries\n\n", function (err) {
				if (err) throw err;
			});

	async function callPredict(i) {
		// Configure the parent resource
		const endpoint = `projects/${project}/locations/${location}/publishers/${publisher}/models/${model}`;

		const instance = {
			content: `Summarize the following article in less than 150 words and place the url at the end of the summary:\n`+i,
		};
		const instanceValue = helpers.toValue(instance);
		const instances = [instanceValue];

		const parameter = {
			temperature: 0.2,
			maxOutputTokens: 256,
			topP: 0.95,
			topK: 40,
		};
		const parameters = helpers.toValue(parameter);

		const request = {
		endpoint,
		instances,
		parameters,
		};

		// Predict request
		const [response] = await predictionServiceClient.predict(request);
		const predictions = response.predictions;
		for (const prediction of predictions) {
			final = prediction.structValue.fields.content.stringValue

			fs.appendFile('summary.txt', "\nArticle Summary:\n\n"+final+"\n\n", function (err) {
				if (err) throw err;
			});
		}
	}

	var links = fs.readFile('links.txt', 'utf8', function(err, data) {
		var links = data;
		var preSplitLinks = links.split("\n");
		var splitLinks = preSplitLinks.slice(1, 6);
		for (link of splitLinks) {
			if (link != "" && link != " " && link != "undefined") {
				callPredict(link);
			}
		}
	});
}


// send email with top topics and summary of day's news
function email(req, res) {
	console.log("sending email");

	function sendEmail(toEmail) {
		var summary = fs.readFile('summary.txt', 'utf8', function(err, data) {
			var text = data;
	  		try {
	  			var email = process.env.EMAIL;
				var cID = process.env.CLIENTID;
				var cSecret = process.env.CLIENTSECRET;
				var refresh = process.env.REFRESH;
				var access = process.env.ACCESS;

				var transporter = nodemailer.createTransport({
					service: 'gmail',
		    		auth: {
		    			user: email,
		    			type: "OAuth2",
			    		clientId: cID,
					    clientSecret: cSecret,
					    refreshToken: refresh,
					    accessToken: access,
					    expires: 3599,
					}
				});
				
				var mailOptions = {
					from: 'cyberoseai@gmail.com',
					to: toEmail,
					subject: 'Your Daily Feed From CyberoseAI',
					text: text,
				};

				transporter.sendMail(mailOptions).then(info => {
				  console.log({info});
				}).catch(console.error);
				
			} catch (error) {
				console.log(error);
				res.send(error);
			}
		});
	}

	// Get a database reference to our posts
	const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
	const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');

	initializeApp({
  		credential: applicationDefault()
	});
	const db = getFirestore();


	// Attach an asynchronous callback to read the data at our posts reference
	const emailList = db.collection("users").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        console.log("Subscriber: "+doc.id);
        sendEmail(doc.id);
    });
});

	console.log("process complete");

	setTimeout(clean, 5000);
}

function clean() {
	fs.unlink('links.txt', function (err) {
		if (err) throw err;
		console.log('Links file deleted!');
	});

	fs.unlink('summary.txt', function (err) {
		if (err) throw err;
		console.log('Summary file deleted!');
	});
}

// call functions

//cron.schedule('0 7 * * *', () => {
console.log('running cyberoseAI');
getUrls();
setTimeout(summ, 5000);
setTimeout(email, 15000);
//});

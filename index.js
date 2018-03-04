const express = require('express')
const app = express()
var compression = require('compression')

const mongoose = require('mongoose');
mongoose.connect('mongodb://test:test@ds153958.mlab.com:53958/scoutfrc');

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(compression())


const Team = mongoose.model('Team', {
 	user: String,
 	matchNumber: Number,

 	teamNumber: Number,
 	teamName: String,
 	alliancePartner1: {

 	teamNumber: Number,
	teamName: String
},
 	alliancePartner2: {
 		teamNumber: Number,
	teamName: String
},
 	notes: String,
 	telly: {  

 		allianceTellyScalePlaced: Number,
          allianceTellySwitchPlaced: Number,
            opposingTellySwitchPlaced: Number,
            vaultTellyPlaced: Number,
            park: Boolean,
            selfClimbed: Boolean,
            climbOnAnotherRobot: Boolean,
            otherRobotsClimbedOn: Number,
            numberOfBlocks: Number,
            penaltyPoints: Number},
 	auto: { 
 		passAutoLine: Boolean,
            startingPosition: Number,
             allianceAutoScalePlaced: Number,
             allianceAutoSwitchPlaced: Number,
             opposingAutoSwitchPlaced: Number,
             vaultAutoPlaced: Number}


});






app.get('/team', (req, res) => {
	Team.find({}, (err, teams) => {
		console.log(err)
			res.json(teams)

	})

})

app.post('/team', (req, res) => {

	team = new Team(req.body);

	team.save((err, response) => {
			if(err) {
				res.send(err)
			} else {
				res.send("Success!")

			}

	})
})

app.get('/match/:matchNumber', (req, res) => {

	Team.find({
	matchNumber : req.params.matchNumber
		
}, (err, teams) => {
	

	if (err) {
		res.json(err)
	} else {
	res.json(teams)
}
})

})



app.get('/team/:teamNumber', (req, res) => {
	Team.find({
		teamNumber: req.params.teamNumber
	}, (err, teams) => {
		if (err) {
			res.json(err)
		} else {
		res.json(teams)			
		}
	})
})

app.listen(3000, () => console.log('Scout DB app listening on port 3000!'))




// Team object example

// {
//         "user":"Someone Else",
// 	      "matchNumber": 0,
//         "teamNumber": 1111,
//         "teamName": "Diamondback Turtles",
//         "alliancePartner1": {
//                 "teamNumber": 666,
//                 "teamName": "Unlucky"
//             },
//             "alliancePartner2": {
//                 "teamNumber": 69,
//                 "teamName": "Unlucky2"
//             },
//         "notes": "About to win",
//         "telly": {
//             "allianceTellyScalePlaced": 1,
//             "allianceTellySwitchPlaced": 2,
//             "opposingTellySwitchPlaced": 3,
//             "vaultTellyPlaced": 4,
//             "park": true,
//             "selfClimbed": true,
//             "climbOnAnotherRobot": false,
//             "otherRobotsClimbedOn": false,
//             "numberOfBlocks": 100,
//             "penaltyPoints": 0
//         },
//         "auto": {
//             "passAutoLine": true,
//             "startingPosition": 1,
//             "allianceAutoScalePlaced": 2,
//             "allianceAutoSwitchPlaced": 3,
//             "opposingAutoSwitchPlaced": 4,
//             "vaultAutoPlaced": 5
//         }
// }

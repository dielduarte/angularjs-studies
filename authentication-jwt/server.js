var express = require('express'),
		faker 	= require('faker'),
		cors 		= require('cors'),
		bodyParser = require('body-parser'),
		jwt = require('jsonwebtoken'),
		expressJwt = require('express-jwt');

var jwtsecret = 'asar10931iasdsuh/';

var user  = {
	username: 'diel',
	password: '123'
};

var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(expressJwt({ secret: jwtsecret }).unless({ path: ['/login'] }));

app.get('/random-user', function(req, res){
	var user = faker.helpers.userCard();
			user.avatar = faker.image.avatar();

			res.json(user);
});


app.post('/login', authenticate,function(req, res){
	var token = jwt.sign({
		username: user.username
	}, jwtsecret);

	res.send({ 
		token: token,
		user: user
	});
});

app.listen(3000, function(){
	console.log('server listening on localhost:3000');
});

//utils functions
function authenticate(req, res, next) {
	var body = req.body;
	if(!body.username || !body.password) {
		res.status(400).end('must provider username or password');
	}

	if(body.username !== user.username || body.password !== user.password) {
			res.status(401).end('username or password incorrect');	
	}

	next();
}
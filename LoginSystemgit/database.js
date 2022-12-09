const mysql = require('mysql');

const connection = mysql.createConnection({
	host : 'localhost',
	database : 'login',
	user : 'root',
	password : ''
});

connection.connect(function(error){
	if(error)
	{
		throw error;
	}
	connection.query("select * from login_details",function(errror,result)
    {
        console.log(result)
    })
});

module.exports = connection;
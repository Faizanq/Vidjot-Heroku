if(process.env.NODE_ENV == 'production'){
	module.exports = {mongoURI:'mongodb://FaizanQureshi:v15ce4q1@ds163182.mlab.com:63182/vidjot-dev'}
}else{
	module.exports = {mongoURI:'mongodb://localhost/vidjot-dev'}
}
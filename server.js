const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library if you're testing this on your local machine.
      // On Render, make sure `npm install` is your build command.
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const appdata = [
  { 'name': 'DEV', 'score': 0, 'date':  '09/02/2026'},
]

const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  }else if( request.method === 'POST' ){
    handlePost( request, response ) 
  }
})

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 )

    if (request.url === '/achievements') {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(appdata));
    return;
  }

  if( request.url === '/' ) {
    sendFile( response, 'public/index.html' )
  }else if (request.url === '/leaderboard'){
    sendFile( response, 'public/leaderboard.html' )
  }else {
    sendFile( response, filename )
  }
}

const handlePost = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    console.log( JSON.parse( dataString ) )
    if( request.url === '/enlist' ) {
      const data = JSON.parse( dataString )
      let enlistee_name = data[ 'enlistee_name' ]
      const today = new Date();
      appdata.push( {'name': enlistee_name, 'score':0, 'date': (today.getMonth()+1)+'/'+today.getDate()+'/'+today.getFullYear()} )
    }
    // ... do something with the data here!!!

    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })

    // change this to incorporate data
    response.end('test')
  })
}

const sendFile = function( response, filename ) {
   const type = mime.getType( filename ) 

   fs.readFile( filename, function( err, content ) {

     // if the error = null, then we've loaded the file successfully
     if( err === null ) {

       // status code: https://httpstatuses.com
       response.writeHeader( 200, { 'Content-Type': type })
       response.end( content )

     }else{

       // file not found, error code 404
       response.writeHeader( 404 )
       response.end( '404 Error: File Not Found' )

     }
   })
}

server.listen( process.env.PORT || port )

// ------------------------------------------
//  SOCKET IO
// ------------------------------------------
//
var goto_to	= 1;
var ready = false;
var io 		= false;
var callback_ext;
var init = function(SARAH){
  if (io){ return; }
  //io = require('./lib/socket.io').listen(SARAH.express.server);
 fs = require('fs');
  options = {
        key: fs.readFileSync('server.key'),
        cert: fs.readFileSync('server.crt')
    };
 
  app = require('express'); 
  server = require('https').createServer(options, app).listen(8000),
  io = require('./lib/socket.io').listen( server );

  console.log( '[Google Music] Preparation fait avec succes' );
  ready = true;
  io.sockets.on('connection', connection);
}

var socket = false
var connection = function( sck ){
  socket = sck;
  console.log( '[Google Music] Nouveau client' );
  socket.emit( { 'hello' : 'world' });
  socket.on('client', function (data) {
    
  });
  
  socket.on('glados_tts', function (data) {
    console.log( data );
  });
  
  socket.on('disconnect', function() {
    console.log( '[Google Music] Fermeture du client' );
  });  
  
}

exports.action = function(data, callback, config, SARAH){
  
 // Retrieve config
  config = config.modules.gladosControls;
  if (!config){
    console.log("[Google Music] Missing WebSocket config");
    callback({});
    return;
  }
  
  console.log( goto_to );
  console.log( data );
  
  if( !ready && data.constrols == "init" ) {
    console.log( '[Google Music] Preparation du WebService' );
    init( SARAH );
  } else if( data.constrols == 'pc_2' ) {
    goto_to = '2';
  } else if( data.constrols == 'pc_1' ) {
  	goto_to = '1';
  } else if( socket && data.constrols == 'play_pause' ) {
    socket.emit( 'options', { play : true, pc : goto_to } )
    socket.broadcast.emit( 'options', { play : true, pc : goto_to } );
    callback({'tts' : "C'est fait"});
    
  } else if( socket && data.constrols == 'jaime' ) {
    socket.emit( 'options', { jaime : true, pc : goto_to } )
    socket.broadcast.emit( 'options', { jaime : true, pc : goto_to } );
    callback({'tts' : "C'est fait, tu aime la musique"});
    
  } else if( socket && data.constrols == 'chance' ) {
    socket.emit( 'options', { chance : true, pc : goto_to } )
    socket.broadcast.emit( 'options', { chance : true, pc : goto_to } );
    callback({'tts' : "Bonne musique au pif"});
    
  } else if( socket && data.constrols == 'next' ) {
    socket.emit( 'options', { next : true, pc : goto_to } )
    socket.broadcast.emit( 'options', { next : true, pc : goto_to } );
    callback({'tts' : "Done."});
    
  } else if( socket && data.constrols == 'rewind' ) {
    socket.emit( 'options', { rewind : true, pc : goto_to } )
    socket.broadcast.emit( 'options', { rewind : true, pc : goto_to } );
    callback({'tts' : "Fait"});
    
  } else if( socket && data.constrols == 'shuffle' ) {
    socket.emit( 'options', { shuffle : true, pc : goto_to } )
    socket.broadcast.emit( 'options', { shuffle : true, pc : goto_to } );
    callback({'tts' : "Fait"});
    
  } else {
    
    callback({'tts' : 'aucun signal du client'}); 
    
  }
  callback({});
  
}


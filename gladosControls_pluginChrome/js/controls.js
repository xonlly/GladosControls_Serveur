/**
 * Fait par Xonlly Devteck VE
 * Libre de toutes modifications
 *
 * Good Dev :)
 *
 */

var pc_id 		= 1;
var ip_serveur 	= '127.0.0.1';
var socket;

function getStorage( fnc ) {
	var func = fnc;
	chrome.storage.local.get( function ( data ) {
		pc_id 		= data.pc_id != undefined ? data.pc_id : pc_id;
		ip_serveur 	= data.ip_serveur != undefined ? data.ip_serveur : ip_serveur;
		func.call( this );
	});

}

getStorage( function () {

	socket = io.connect( ip_serveur + ':8000');
	console.log( 'ip connect: ' + ip_serveur );
	socket.on('options', function (data) {
		getStorage( function () {
			console.log( pc_id );
			console.log( data );

			if( parseInt( data.pc ) == parseInt( pc_id ) ) {
				console.log( 'action send' );
				if( data.play ) {
					$("button[data-id=play-pause]").click();
				}
				
				if( data.next ) {
					$("button[data-id=forward]").click();
				}

				if( data.rewind ) {
					$("button[data-id=rewind]").click();
					$("button[data-id=rewind]").click();
				}
				
				if( data.repeat ) {
					$("button[data-id=repeat]").click();
				}
				
				if( data.shuffle ) {
					$("button[data-id=shuffle]").click();
				}
				
				if( data.chance ) {
					$(".card").click();
				}
				
				if( data.jaime ) {
					$("ul li[data-rating=\"5\"]").click()
				}
			}
		});
	});


});
setInterval( function () { 
	socket.emit('client', 'client, ok');
}, 2000 );
 $( function () { 
 	chrome.storage.local.get( function ( data ) {
 		console.log( data );
 		$("#setPcId option[value=" + data.pc_id +"]").attr("selected", "selected");
 		$("#ip_serveur").val( data.ip_serveur );
 	} );
 	

      $("#setPcId").change( function () { 
        chrome.storage.local.set({'pc_id': $(this).val()}, function() {
          console.log('Settings saved 2');
        });
      } );

      $("#edit_ip").click( function () {
      	chrome.storage.local.set({ 'ip_serveur' : $("#ip_serveur").val() }, function () {
      		$("#edit_ip").attr( "disabled", "disabled" );
      		console.log('Settings saved 3');
      	} )
      } );

      $("#ip_serveur").keyup( function () {
      	$("#edit_ip").removeAttr( 'disabled');
      })
    })
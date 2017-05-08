// JavaScript Document


function onDeviceReady() {
    //alert('cordova'+device.cordova);
	
	
			
		//alert('Dispositivo: '+device.uuid);
		window.localStorage.setItem('deviceuuid', ''+device.uuid);
		
		$.getJSON("https://quickvet.edifarm.com.ec/ws/mobile/login.php", {
			deviceuuid:device.uuid, 
			devicename:device.manufacturer, 
			version:device.version, 
			platform:device.platform, 
			model:device.model,
			action: 'consultar',
		}, function(data) {
			var da=''+JSON.stringify(data);
			//alert('data:'+da);
		}).done(function (data) {
			var r = data.respuesta;
			
			if (r === '1') {
				window.location = 'home.html';
			}

		}).fail(function (data) {
			var dt=''+JSON.stringify(data);
			//alert('data:'+dt);
		})
		.always(function (data) {
			$('.loader_init').fadeOut('slow');
		});

		//alert('final'+device.uuid);
	
}
	

var getUrlParameter = function getUrlParameter(sParam) {
	var sPageURL = decodeURIComponent(window.location.search.substring(1)),
		sURLVariables = sPageURL.split('&'),
		sParameterName,
		i;

	for (i = 0; i < sURLVariables.length; i++) {
		sParameterName = sURLVariables[i].split('=');

		if (sParameterName[0] === sParam) {
			return sParameterName[1] === undefined ? true : sParameterName[1];
		}
	}
};


function getSettings() {
	
	var uuid = window.localStorage.getItem("deviceuuid");
	
	var jqxhr = $.getJSON("https://quickvet.edifarm.com.ec/ws/mobile/login.php", {
			deviceuuid:uuid,
/*			deviceuuid: device.uuid,
			devicename: device.manufacturer,
			version: device.version,
			platform: device.platform,
			model: device.model,*/
			action: 'consultar',
		}, function () {
			var g=0;
		})
		.done(function (data) {
				alert('Datos: ' + JSON.stringify(data));
			var r = data.respuesta;
			var e = '';
			var u = '';
			var not = '0';
			var med = '0';
			
			if (r === '1') {


				u = data.datos.email;
				e = data.datos.nombre_usuario;
				if (u !== e) {
					$('#email').removeAttr('readonly');
				}

				$('#email').val(data.datos.email);
				$('#nombres').val(data.datos.fname);
				$('#apellidos').val(data.datos.lname);
				$('#telefono').val(data.datos.phone);
				$("#pais option").filter(function () {
					return $(this).text() === data.datos.country;
				}).prop('selected', true);
				$('#ciudad').val(data.datos.city);

				$('#cumple').val(data.datos.birth);
				$('#cumple').combodate();
				not = data.datos.notification;
				if (not === '1') {
					$('#cmn-toggle-1').attr('checked', true);
				} else {
					$('#cmn-toggle-1').attr('checked', false);
				}
				med = data.datos.ismedic;
				if (med === '1') {
					$('#ismedic').attr('checked', true);
				} else {
					$('#ismedic').attr('checked', false);
				}


			} else {

				window.location = 'home.html';
			}

			$('.loader').fadeOut('slow');

		})
		.fail(function (data) {

			var error='Error' + JSON.stringify(data);
			console.log(error);
		})
		.always(function () {
			$('.loader').fadeOut('slow');
		});

	//*/

}




function successAnalytics() {
	//console.log('Funciona perfecto');
}

function failAnalytics() {
	//console.log('No se conecta analytics');
}


function admobDisplay() {
	var banner = 'ca-app-pub-7271854751013605/3853227419';
	var interlestial = 'ca-app-pub-7271854751013605/5469561410';

	document.removeEventListener('deviceready', admobDisplay, false);
	// Set AdMobAds options:

	switch (device.platform) {
		case 'iOS':
			banner = 'ca-app-pub-7271854751013605/3853227419';
			interlestial = 'ca-app-pub-7271854751013605/5469561410';
			break;

		case 'Android':
			banner = 'ca-app-pub-7271854751013605/9457279011';
			interlestial = 'ca-app-pub-7271854751013605/1934012219';
			break;
	}
	admob.setOptions({
		publisherId: banner, // Required
		interstitialAdId: interlestial, // Optional
	});

	admob.createBannerView();
	// Request interstitial (will present automatically when autoShowInterstitial is set to true)
	admob.requestInterstitial();
}

document.addEventListener("deviceready", admobDisplay, false);

alert('device');
window.ga.startTrackerWithId('UA-18919211-2', 30);
alert('setAnalytics');
//*
//analytics.startTrackerWithId('UA-18919211-2', successAnalytics, failAnalytics);
//*/

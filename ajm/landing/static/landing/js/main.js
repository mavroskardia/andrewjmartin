 // no special configs makes everyone happier

 requirejs.config({});

 requirejs(['typlay', 'utilities'], function (Typlay, Utilities) {

 	var msg = [
 		'name = "Andrew Martin"',
 		'work = "Software Engineer"',
 		'location = "Florida"',
 		'',
 		'welcome_msg = """Hi! My name is {}. I\'m a {} who lives in {}.""".format(name, work, location)',
 		'',
 		'print(welcome_msg)',
 		'',
 		'> Hi! My name is Andrew Martin. I\'m a Software Engineer who lives in Florida.',
 		'',
 		'show_links()'
		];

 	var typlay = new Typlay('typlay_container', msg.join('\n'));

 	typlay.minspeed = 100;
 	typlay.maxspeed = 300;

 	typlay.onend = function () {
 		Utilities.remove_class('navlinks', 'hidden').remove_class('typlay_container', 'cursor-shown'); 		
 		var name_elt = Utilities.getElementByInnerText('Andrew Martin');
 		name_elt.innerHTML = name_elt.innerHTML.replace('Andrew Martin', '<a href="#">Andrew Martin</a>');
 		Utilities.add_class('typlay_interlace', 'fadeout');
 	}

 	window.setTimeout(function () {
 		typlay.start();
 	}, 500);
 });

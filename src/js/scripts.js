//Web font load
      WebFontConfig = {
        google: { families: [ 'Open+Sans::latin' ] }
      };
      (function() {
        var wf = document.createElement('script');
        wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
        '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
        wf.type = 'text/javascript';
        wf.async = 'true';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(wf, s);
      })(); 
//Scroll to projects
$(document).ready(function (){
	new WOW().init();
	$(".btn-projects").click(function (){
		$('html, body').animate({
			scrollTop: $(".project-title").offset().top
		}, 1000);
	});

	var repos, packages = [];
	$.getJSON('https://packagist.org/packages/list.json?vendor=rapidwebltd', function(repos) {

		for (i = 0; i < repos.packageNames.length; i++) {
			$.getJSON('https://packagist.org/packages/'+repos.packageNames[i]+'.json', function(package) {
				var package  = package.package;
				var title = package.name;
				title = title.replace('rapidwebltd/', '');
				title = title.replace(/-/g, ' ');
				packages.push(package);
				console.log(package);

				$('#packages').append('<div class="card text-center wow fadeIn" data-wow-delay="0.5s" data-wow-offset="5"><div class="card-body"><h5 class="card-title text-capitalize">'+title+'</h5><p class="card-text">Downloads: <span class="badge badge-info">'+package.downloads.total+'</span></p><p class="card-text text-left">'+package.description+'</p><p class="text-center m-0"><a href="'+package.repository+'" class="btn btn-outline-info btn-lg btn-block">View Project</a></p></div></div>');

			});

		}

		packages.sort(function(a, b){
			console.log(a);
			a.downloads.total-b.downloads.total
		});
         //console.log(packages); 

     });
});

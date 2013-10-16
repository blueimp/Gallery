$(function () {
    'use strict';
	$.getJSON("http://api.flickr.com/services/feeds/photoset.gne?set=72157629060741515&nsid=35213698@N08&lang=en-us&format=json&jsoncallback=?", function(data){  
	        var listItems = '';
	        var carouselLinks = [],
	            linksContainer = $('#links'),
	            baseUrl;
	        $('div.Desc').append(data.description);
	        $.each(data.items, function(i,item){
//	           <a href="images/banana.jpg" title="Banana">
//	              <img src="images/thumbnails/banana.jpg" alt="Banana">
//	           </a>
				var value = item.media.m;
				var valueBig = value.replace("m.jpg", "b.jpg");
				var valueSmall = value.replace("m.jpg", "s.jpg");
	           listItems
	               += '<a href="'+valueBig+'" data-gallery>'+
	                    '<img src="'+valueSmall+'" />'+
	                  '</a>';
	                  
	                  
	                  carouselLinks.push({
	                      href: valueBig,
	                      title: 'Random Images'
	                      });
	                  
	                  
	        });
	        $('div.links').append(listItems);
	        //initialize main slideshow viewer with flickr images.
	        blueimp.Gallery(carouselLinks, {
	            container: '#blueimp-image-carousel',
	            carousel: true
	        });
	    });  
    
    // Initialize the Gallery as video carousel:
    blueimp.Gallery([
        {
            title: 'Sintel',
            href: 'http://media.w3.org/2010/05/sintel/trailer.mp4',
            type: 'video/mp4',
            poster: 'http://media.w3.org/2010/05/sintel/poster.png'
        },
        {
            title: 'Big Buck Bunny',
            href: 'http://upload.wikimedia.org/wikipedia/commons/7/75/' +
                'Big_Buck_Bunny_Trailer_400p.ogg',
            type: 'video/ogg',
            poster: 'http://upload.wikimedia.org/wikipedia/commons/thumb/7/70/' +
                'Big.Buck.Bunny.-.Opening.Screen.png/' +
                '800px-Big.Buck.Bunny.-.Opening.Screen.png'
        },
        {
            title: 'Elephants Dream',
            href: 'http://upload.wikimedia.org/wikipedia/commons/transcoded/8/83/' +
                'Elephants_Dream_%28high_quality%29.ogv/' +
                'Elephants_Dream_%28high_quality%29.ogv.360p.webm',
            type: 'video/webm',
            poster: 'http://upload.wikimedia.org/wikipedia/commons/thumb/9/90/' +
                'Elephants_Dream_s1_proog.jpg/800px-Elephants_Dream_s1_proog.jpg'
        }
    ], {
        container: '#blueimp-video-carousel',
        carousel: true
    });

});

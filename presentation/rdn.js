$(document).ready(function () {
	
	(function ( $ ) {

		$.fn.generate = function ( options ) {

			/**
			 * Generate base markup if api equals false
			 * 
			 * @return void
			 */
			var markup = function () {

				var size;
				
				switch ( settings.api[2].size.toUpperCase() ) {

					case 'LARGE':
						size = 'col-md-12';
						break;

					case 'MEDIUM':
						size = 'col-md-8 col-md-offset-2';
						break;

					case 'SMALL':
						size = 'col-md-6 col-md-offset-3';
						break;

					default:
						break;

				}
			
				// gallery markup
				$('<div id="g">').appendTo(settings.api[1].appendTo);

				// view markup
				if ( settings.api[2].viewer ) {

					$('<div id="v">').addClass(size).insertAfter('#g');

				}

			}

			/**
			 * Fetch images from api
			 * 
			 * @return void
			 */
			var apiCall = function () {

				var mode;

				if ( settings.api[1].mode.all ) {

					mode = 'all';

				}

				if ( settings.api[1].mode.any ) {

					mode = 'any';

				}
				
				$.ajax({

					url: settings.api[1].url + settings.api[1].feed + '?' + settings.api[1].set,
					dataType: 'json',
					data: {
						
						id: settings.api[1].user,
						tags: settings.api[1].tags,
						tagmode: mode,
						format: 'json'

					},

					success: function ( data ) {

						if ( data.items.length > 0 ) {
						
							$.each(data.items, function ( i, item ) {

								i = i + 1;

								if ( data.items.length >= settings.api[1].amount ) {

									images(i, item);

									if ( i === settings.api[1].amount ) {

										if ( settings.api[2].viewer ) {

											viewer();

										}

										if ( settings.addon.lightbox ) {

											lightbox();

										}

										return false;

									}

								}
								else {

									empty();

									warning('The amount of images for your fetch criteria (' + data.items.length + ') is less than your chosen amount. Please lower your amount to ' + data.items.length + ' number of items or less.');

								}

							});

						}
						else {

							empty();

							warning('Couldn\'t find any images based on that criteria. Update your api properties.');

						}

					},

					error: function ( jqXHR, textStatus, errorThrown ) {

						console.log('.ajax() request failed: ' + textStatus + ', ' + errorThrown);

					}

				});

			}

			/**
			 * Generate image markup based on settings
			 * 
			 * @param  {int} 	r     used as alt attribute for images
			 * @param  {object} image contains the image data (carrier of src attribute)
			 * 
			 * @return void
			 */
			var images = function ( r, image ) {

				// set correct styling dependant on settings
				var lb_class = '',
					vw_class = '';

				if ( settings.api[2].viewer || settings.addon.lightbox ) {

					vw_class = 'cursor';

					if ( settings.api[2].viewer ) {

						vw_class = 'col-md-2 cursor';

					}
					else {

						vw_class = 'col-md-4 cursor';

					}

					if ( settings.addon.lightbox ) {

						lb_class = 'cursor';

					}

				}
				else {

					vw_class = 'col-md-4';

				}
				
				// change quality of images
				var imgSrc = image.media.m.replace("_m.jpg", "_b.jpg");

				if ( settings.api[2].viewer ) {
					
					$('<img src="' + imgSrc + '" alt="' + r + '" />')
						.addClass(vw_class + ' ' + lb_class)
						.appendTo('#g');

					$('<img src="' + imgSrc + '" alt="' + r + '" />')
						.addClass('img-responsive ' + lb_class)
						.hide()
						.appendTo('#v');

				}
				else {

					$('<img src="' + imgSrc + '" alt="' + r + '" />')
						.addClass(vw_class + ' ' + lb_class)
						.appendTo('#g');

				}

			}

			/**
			 * Generate markup and functionality for image viewer
			 * 
			 * @return void
			 */
			var viewer = function () {

				if ( settings.api[0].active ) {

					$('#g img[alt="' + settings.api[2].first + '"]').addClass('img-active');

					$('#v img[alt="' + settings.api[2].first + '"]').addClass('view-active').fadeIn();	

				}
				else {

					$('#v img:not(.view-active)').hide();

				}
				

				$('#g img').click(function () {
					
					$('#g img').removeClass('img-active');

					$(this).addClass('img-active');
					
					// fetch the chosen images' src value
					var src = $(this).attr('src');

					// show the chosen image in a larger view and hide the other ones
					$('#v img').each(function () {

						if ( src === $(this).attr('src') ) {
							
							$('#v img[src="' + src + '"]').addClass('view-active').fadeIn();

								if ( settings.addon.lightbox ) {

									lightbox();

								}

						} else {

							$(this).removeClass('view-active').hide();	

						}

					});

				});

			}

			/**
			 * Functionality for lightbox
			 * 
			 * @return void
			 */
			var lightbox = function () {

				var click,
					where,
					_clss,
					appTo;

				if ( settings.api[2].viewer ) {

					click = $('.view-active');
					where = '#v';
					_clss = 'img-responsive cursor';

				}
				else {

					click = $('#g img');
					where = '#g';
					_clss = 'col-md-4 cursor';

				}

				click.click(function () {

					// fetch the chosen images' values
					var src = $(this).attr('src'),
						alt = $(this).attr('alt'),
						pic = $(where + ' img[src="' + src + '"]').removeClass(_clss);

					if ( settings.api[2].viewer ) {

						if ( alt == 1 ) {

							appTo = '#v img[alt="2"]';

						}
						else {

							appTo = '#v img[alt="' + (alt - 1) + '"]';

						}

					}
					else {

						if ( alt == 1 ) {

							appTo = '#g img[alt="2"]';

						}
						else {

							appTo = '#g img[alt="' + (alt - 1) + '"]';

						}

					}

					// only create one opacity div
					if ( $('body').find('#op').length < 1 ) {

						// create close btn in right hierarchy if slides is true
						$('<div id="close"></div>').addClass('glyphicon glyphicon-remove cursor')
								.insertAfter('body ' + settings.api[1].appendTo)

						$('<div id="op"></div>')
							.insertAfter('body ' + settings.api[1].appendTo);

					}

					if ( settings.addon.slides ) {

						slides();

					}

					$('<div id="lb"></div>').insertAfter('#op');

					pic
						.css({'max-height': window.innerHeight - 40})
						.load(function () {
							
							$('#lb').fadeIn();

						})
						.appendTo('#lb');

					$('#lb:empty').remove();

					$('#close').click(function () { closeLightbox(pic, appTo, alt, _clss); });

					$(document).keyup(function ( e ) {
						
						if ( e.keyCode == 27 ) {

							closeLightbox(pic, appTo, alt, _clss);

						}

					});

				});

			}

			/**
			 * Functionality to close lightbox
			 * 
			 * @param  {string} el    which element to close and recreate in gallery
			 * @param  {string} where where to add the recreated element (different handeling if viewer is true/false)
			 * @param  {int} 	alt   the alt value of the closing element
			 * @param  {string} clss  the class/classes to add to the recreated element
			 * 
			 * @return void
			 */
			var closeLightbox = function ( el, where, alt, clss ) {
				
				el
					.css({'max-height': ''})
					.addClass(clss)
					.removeClass('view-active');

				if ( settings.api[2].viewer ) {

					el.hide();

				}
				
				if ( alt == 1 ) {

					el.insertBefore(where);

				}
				else {

					el.insertAfter(where);

				}

				if ( settings.api[2].viewer ) {

					var item = $('.img-active');
					_alt = item.attr('alt');

					$('#v img[alt="' + _alt + '"]').addClass('view-active').show();

				}

				$('#lb, #op, #close').remove();

				if ( settings.addon.slides ) {

					$('#next, #prev').remove();

				}

				lightbox();

			}

			/**
			 * Functionality for slides in lightbox
			 * 
			 * @return void
			 */
			var slides = function () {

				$('#next, #prev').remove();

				slidesBtn('next');
				slidesBtn('prev');

				if ( settings.api[0].active ) {

					if ( $('.img-active').attr('alt') >= settings.api[1].amount ) {

						$('#next').hide();

					}

				}
				else {

					if ( $('.img-active').attr('alt') >= $('#g').children().length ) {

						$('#next').hide();

					}

				}
				if ( $('.img-active').attr('alt') == 1 ) {

					$('#prev').hide();

				}

				// switch image on click
				$('#next').click(function () { slideSwitch('next'); });
				$('#prev').click(function () { slideSwitch('prev'); });

			}

			/**
			 * Functionality to switch picture (slides) with keyarrows
			 * 
			 * @param  {object} e the triggered event
			 * 
			 * @return void
			 */
			var slidesArrow = function ( e ) {

				if ( settings.addon.slides ) {

					var key = e.which || e.keyCode;
    	
			    	if ( key == 39 ) {

			    		if ( settings.api[0].active ) {

			    			if ( settings.api[1].amount > $('#lb img').attr('alt') ) {

			    				slideSwitch('next');

			    			}

			    		}
			    		else {

			    			if ( $('#g').children().length > $('#lb img').attr('alt') ) {

			    				slideSwitch('next');

			    			}

			    		}

			    	}
			    	
			    	if ( key == 37 ) {

			    		if ( $('#lb img').attr('alt') != 1 ) {

			    			slideSwitch('prev');

			    		}

			    	}

				}

		    }

		    /**
		     * Generate the markup for the slides buttons in lightbox
		     * 
		     * @param  {string} type which type of button to create
		     * 
		     * @return void
		     */
			var slidesBtn = function ( type ) {

				var id, 
					clss;

				switch ( type.toUpperCase() ) {

					case 'NEXT':
						id = 'next';
						clss = 'right';
						break;

					case 'PREV':
						id = 'prev';
						clss = 'left';

					default:
						break;

				}
				
				$('<div id="' + id + '"></div>')
					.css({
						'margin-top': Math.floor(window.innerHeight / 2 - 10),
					})
					.addClass('glyphicon glyphicon-chevron-' + clss + ' cursor')
					.insertAfter('#close');

				if ( type = 'next' ) {

					$('#next').css({'right': 0});

				}
				if ( type = 'prev' ) {

					$('#prev').css({'left': 0});

				}

			}

			/**
			 * Functionality to locate next/previous image and show it in lightbox
			 * 
			 * @param  {string} type show next or previous image in order
			 * 
			 * @return void
			 */
			var slideSwitch = function ( type ) {

				var pic = $('#lb img'),
					where = $('.img-active'),
					alt = where.attr('alt'),
					src = where.attr('src');

				where.removeClass('img-active');

				if ( type == 'next' ) {

					alt++;

					if ( settings.api[0].active ) {

						if ( alt >= settings.api[1].amount ) {

							$('#' + type).hide();

						}
						else {

							$('#prev').show();

						}

					}
					else {

						if ( alt >= $('#g').children().length ) {

							$('#' + type).hide();

						}
						else {

							$('#prev').show();

						}

					}

				}

				if ( type == 'prev' ) {

					alt--;

					if ( alt == 1 ) {

						$('#' + type).hide();

					}
					else {

						$('#next').show();

					}

				}

				var f_pic = $('#g img[alt="' + alt + '"]').addClass('img-active');
				var n_pic = $('<img src="' + f_pic.attr('src') + '" alt="' + f_pic.attr('alt') + '" />');

				$('#lb img').remove();
				
				n_pic
					.removeClass()
					.css({'max-height': window.innerHeight - 40})
					.load(function () {
						
						$('#lb').fadeIn();

					})
					.appendTo('#lb');

			}

			/**
			 * Show a "warning" text to the dev when settings can't be parsed
			 * 
			 * @param  {string} text what to display
			 * 
			 * @return void
			 */
			var warning = function ( text ) {

				empty();
				
				$('<div>')
					.addClass('well well-lg')
					.html(text)
					.appendTo(settings.api[1].appendTo);

			}

			/**
			 * Remove children of property appendTo when settings can't be parsed
			 * 
			 * @return void
			 */
			var empty = function () {
				
				$(settings.api[1].appendTo).children().remove();

			}

			var settings = $.extend({}, options, {});

			/* FUNCTIONS FOR PRESENATION PAGE */

			/**
			 * ONLY FOR PRESENTATION PAGE - Ajax call to fetch properties
			 * 
			 * @param  {string} what which property to update
			 * @param  {bool} 	how  set it to true or false
			 * 
			 * @return void
			 */
			var demo_ajaxCall = function ( what, how ) {
				
				$.ajax({
			
					url: 'settings.php',
					dataType: 'json',

					success: function ( data ) {

						demo_updateSettings(what, how);

						console.log('.ajax() request returned successfully.');
					},

					error: function ( jqXHR, textStatus, errorThrown ) {
						console.log('.ajax() request failed: ' + textStatus + ', ' + errorThrown);
					}

				});

			}

			/**
			 * ONLY FOR PRESENTATION PAGE - Update properties if ajax call was successfully
			 * 
			 * @param  {string} what which property to update
			 * @param  {bool} 	how  set it to true or false
			 * 
			 * @return void
			 */
			var demo_updateSettings = function ( what, how ) {

				switch ( what.toUpperCase() ) {

					case 'VIEWER':
						settings.api[2].viewer = how;

						if ( settings.addon.slides ) {

							settings.addon.slides = false;

						}
						break;

					case 'SLIDES':
						settings.addon.slides = how;
						break;

					case 'LIGHTBOX':
						settings.addon.lightbox = how;
						break;

					default:
						break;

				}

				$(this).generate(settings);

			}

			/**
			 * ONLY FOR PRESENTATION PAGE - Generate markup (buttons) and call ajax on click
			 * 
			 * @param  {string} what which property to update
			 * 
			 * @return void
			 */
			var demo_Events = function ( what ) {

				var name,
					prop;

				switch ( what.toUpperCase() ) {

					case 'VIEWER':
						name = 'viewer';
						prop = settings.api[2].viewer;
						break;

					case 'LIGHTBOX':
						name = 'lightbox';
						prop = settings.addon.lightbox;
						break;

					case 'SLIDES':
						name = 'slides';
						prop = settings.addon.slides;
						break;

					default:
						break;

				}
				
				if ( prop ) {

					$('<button id="' + name + '">' + name + ' </button> ').addClass('btn btn-danger btn-s demo').insertAfter('#btns');
					$('<i>').addClass('fa fa-times').appendTo('#' + name);

				}
				else {

					$('<button id="' + name + '">' + name + ' </button>').addClass('btn btn-success btn-s demo').insertAfter('#btns');
					$('<i>').addClass('fa fa-plus').appendTo('#' + name);

				}

				if ( settings.api[2].viewer == false ) {

					$('#slides').fadeOut();

				}
				else {

					$('#slides').show();

				}

				$('#' + name).click(function () { 
				
					if ( prop ) {

						$('button.demo').remove();

						demo_ajaxCall(name, false);

					}
					else {

						$('button.demo').remove();

						demo_ajaxCall(name, true);

					}

				});

			}

			demo_Events('slides');
			demo_Events('lightbox');
			demo_Events('viewer');

			/* /FUNCTIONS FOR PRESENATION PAGE */

			if ( settings.addon.lightbox && settings.addon.slides && settings.api[2].viewer == false ) {

				settings.addon.slides = false;

				// remove markup if user have entered some for use of plugin with api set to false
				empty();

				warning('Slides functionality is not yet applicable for the lightbox when having the viewer setting set to false. Set the slides to false to continue.');

				settings = {};

			}

			if ( settings.addon.lightbox == false && settings.addon.slides == true ) {

				warning('Settings the property slides to true will only work if you have lightbox set to true as well. Update your parameters in rdn.json if you want it to work.');

			}

			if ( settings.api[0].active ) {

				// remove markup if user have entered some for use of plugin with api set to false
				if ( $(settings.api[1].appendTo).children().length > 0 ) {

					empty();

				}

				if ( settings.api[1].amount >= settings.api[2].first && settings.api[1].amount <= 20 ) {

					if ( settings.api[0].active ) {

						// base markup
						markup();

						if ( $(settings.api[1].appendTo).children().length > 0 ) {

							// fetch images from api
							apiCall();

						}

						if ( settings.addon.slides ) {

							document.addEventListener('keyup', function ( event ) { slidesArrow(event) }, false);

						}

					}

				}
				else {

					warning('The first image to view cant be larger than the amount of images, nor can\'t it be more than 20 images in a gallery at the moment. We\'re working on improving that, sorry.');

				}

			}
			else {

				if ( settings.api[2].viewer ) {

					viewer();

				}
				else {

					// remove markup for the viewer if user have created such
					$('#v').remove();

					// fix styling of the gallery image markup
					$('#g img').removeClass('col-md-2 img-active').addClass('col-md-4');

				}

				if ( settings.addon.lightbox ) {

					lightbox();

				}
				else {

					$('#v img.cursor').removeClass('cursor');

				}

				if ( settings.addon.slides ) {

					document.addEventListener('keyup', function ( event ) { slidesArrow(event) }, false);

				}

			}

		}

	} ( jQuery ));

	$.getJSON("rdn.json").done(function ( data ) {

		$.each(data.rdn, function () {

			$(this).generate({

				api: data.rdn[0].api,
				addon: data.rdn[0].addon

			});

		});

	});

});
<?php

$title = "Gallery Plugin";

include(__DIR__ . '/../mall_2/header.php');

?>

<!-- main -->
<div id="top" class="header">
  	
  	<div class="vert-text">
    
    	<h1>the rdn plugin</h1>
    	
    	<h3>making image viewing easier since 2016</h3>
    	
    	<a href="#about" class="btn btn-default btn-m">get started</a>

  	</div>

</div>
<!-- /main -->

<!-- about -->
<div id="about" class="intro">
  
  	<div class="container">
    
    	<div class="row">
      		
      		<div class="col-md-6 col-md-offset-3 text-center">
        		
        		<h2>the rdn plugin will ease the process of adding images to your website</h2>
        		
        		<p class="lead">by using this plugin you'll be able to attach an image gallery - either from your local storage, or from the <a href="https://www.flickr.com" target="_blank">flickr</a> api - to any element on your website by manipulating simple json properties or html markup</p>
      		
      		</div>

    	</div>

  	</div>

</div>
<!-- /about -->

<!-- callout -->
<div class="callout">

  	<div class="vert-text">
    	
    	<h1>magnificent demo below</h1>

  	</div>

</div>
<!-- /callout -->

<!-- demo -->
<div id="portfolio" class="portfolio">

  	<div class="container">

    	<div class="row">
      		
      		<div class="col-md-6 col-md-offset-3 text-center">
        		
        		<h2>demo</h2>

        		<hr id="btns">

        		<div id="log"></div>
      		
      		</div>
    	
    	</div>

    	<section>
    		
    		<div class="row" id="demo">
    			
	    		<!-- markup -->
				<div id="g">
				
	    			<img class="col-md-2 cursor img-active" alt="1" src="../mall_2/img/gallery/1.jpg">
	    			<img class="col-md-2 cursor" alt="2" src="../mall_2/img/gallery/2.jpg">
	    			<img class="col-md-2 cursor" alt="3" src="../mall_2/img/gallery/3.jpg">
	    			<img class="col-md-2 cursor" alt="4" src="../mall_2/img/gallery/4.jpg">
	    			<img class="col-md-2 cursor" alt="5" src="../mall_2/img/gallery/5.jpg">
	    			<img class="col-md-2 cursor" alt="6" src="../mall_2/img/gallery/6.jpg">

	    		</div>

	    		<div id="v">
	    			
	    			<img class="img-responsive cursor view-active" alt="1" src="../mall_2/img/gallery/1.jpg">
	    			<img class="img-responsive cursor" alt="2" src="../mall_2/img/gallery/2.jpg">
	    			<img class="img-responsive cursor" alt="3" src="../mall_2/img/gallery/3.jpg">
	    			<img class="img-responsive cursor" alt="4" src="../mall_2/img/gallery/4.jpg">
	    			<img class="img-responsive cursor" alt="5" src="../mall_2/img/gallery/5.jpg">
	    			<img class="img-responsive cursor" alt="6" src="../mall_2/img/gallery/6.jpg">

	    		</div>
	    		<!-- /markup -->
	    	
	    	</div>

    	</section>

    	<div class="row">

    		<div class="col-md-6 col-md-offset-3 text-center">
    			
    			<h4>ok - so how do i do this?</h4>

    			<a href="#documentation" class="btn btn-default btn-s">teach me!</a>

    		</div>

    	</div>

	</div>

</div>
<!-- /demo -->

<!-- docs -->
<div id="documentation" class="documentation">
  
  	<div class="container">

    	<div class="row">
      		
      		<div class="col-md-4 col-md-offset-4 text-center">
        		
        		<h2>the docs</h2>
        		
        		<hr>  
      		
      		</div>
    	
    	</div>
    	
    	<div class="row" id="docs">
      		
      		<div class="col-md-12">

      			<section>
		          
		        	<h4 class="text-center">rdn.json</h4>
		          
		       	 	<p>the format of the file is very straight forward if you're familiar with json. well, even if you're not familiar with json but have had experience with other languages it should be fairly simple setting this up.</p>
		        	<p>.. ah! who am i kidding? this is simple for everyone! but before we dive in to the main plugin code. let me just explain the different properties in this file and what they're supposed to do.</p>

		        </section>

		        <section>

			        <div class="row">
			        	
			        	<div class="col-md-6">

			        		<section>

	        				<p>the file contains two main properties - <strong>api</strong> and <strong>addon</strong>.</p>

	        				<p>the <strong>api</strong> property is an array of three objects.</p>
	        				<p>the first one (<em>active</em>) is a boolean which determines if the gallery should be generated based on an ajax call against the <a href="https://www.flickr.com" target="_blank">flickr</a> api or based on markup written by the developer.</p>
	        			
	        				<p>the second object is a carrier of different kinds of settings. the 6 first properties are settings for the ajax call against the api.</p>

	        				<ul class="list-unstyled demo">
	        					<li><strong>url*</strong> is the main url for the flickr api</li>
	        					<li><strong>feed*</strong> determines which feed to fetch images from</li>
	        					<li><strong>set*</strong> is an additional setting which determines the format of the fetched data</li>
	        					<li><strong>user</strong> is an optional property if you would like to fetch images from a specific account from flickr. <a href="http://idgettr.com/" target="_blank">idgettr</a> is a great tool to find the user id to insert in this property. so the value should be either a string with the user id or null.</li>
	        					<li><strong>tags</strong> is an optional property where you can define image tags in a commaseparated list. the value should either contain a commaaseparated list or be set to null.</li>
	        					<li><strong>mode*</strong> is an object containing two properties. here you will decide which type of tagmode you want to use. either you set <strong>all</strong> to true, which will result in a api call where all of the tags in your commaseparated list must be set on an image. whereas if you set <strong>any</strong> to true, it's enough if one of the tags are set on an image in order for it to be included in the result.</li>
	        					<li><strong>amount*</strong> determines how many images will be generated to the gallery. the ajax call always fetches 20 images, but this setting will determine how many of those it will show in the gallery.</li>
	        				</ul>

	        				<p>the third and last object of the api property carries a couple of additional, but equally important as the others, settings for the gallery.</p>

	        				<ul class="list-unstyled demo">
	        					<li><strong>viewer*</strong> is a boolean which will, if set to true, first of all make the images in the gallery a little bit smaller in order for it to also generate a little window where the user can view the images.</li>
	        					<li><strong>size*</strong> is a string value of how big you'd like the viewer window to be. the choices are <em>small</em>, <em>medium</em> or <em>large</em>.</li>
	        					<li><strong>first*</strong> is a numeric value of which image in the gallery you'd like to show first in the viewer window.</li>
	        				</ul>

			        	</div>

			        	<div class="col-md-6">
			        			
			        		<img src="../mall_2/img/rdn-json.png" alt="rdn-json" class="img-responsive col-md-12">

			        	</div>

			        	<div class="col-md-12">
			        		
			        		<p>the <strong>addon</strong> property is an object including two properties.</p>

	        				<ul class="list-unstyled demo">
	        					<li><strong>lightbox*</strong> is a boolean which activates the lightbox funtionality if it's set to true.</li>
	        					<li><strong>slides*</strong> is a boolean which activates funtionality to be able to switch image back and forth within the lightbox if it's set to true. <em>only applicable if viewer is set to true at the moment</em></li>
	        				</ul>

			        	</div>

			        </div>

			    </section>

			    <section>
			    	
			    	<p class="small">* is a required property and must have a value. the others can be set to null if they should not be used.</p>

			    </section>

			    <section>
		          
		        	<h4 class="text-center">rdn.js</h4>
		          
		       	 	<p>this is where the magic happens.</p>

		        </section>

      		</div>
    	
    	</div>

  	</div>

</div>
<!-- /docs -->

<?php

$path = __DIR__;

include(__DIR__ . '/../mall_2/footer.php');

?>
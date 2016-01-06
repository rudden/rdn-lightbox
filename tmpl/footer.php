<?php

$d = explode("/", trim($path, "/"));
$srcUrl = "../source.php?dir=" . end($d) . "&amp;file=" . basename($_SERVER['PHP_SELF']) . '#file';

?>
	<!-- Footer -->
    <footer>

      	<div class="container">
        	
        	<div class="row">
          	
          		<div class="col-md-6 col-md-offset-3 text-center">
            		
            		<ul class="list-inline">
              			
              			<a href='<?= $srcUrl ?>'>code</a>
            		
            		</ul>
            		
            		<div class="top-scroll">
              			
              			<a href="#top"><i class="fa fa-circle-arrow-up scroll fa-4x"></i></a>
            		
            		</div>
            		
            		<hr>
            		
            		<p>Copyright &copy; Rudén 2016</p>
          		</div>
        	
        	</div>
      	
      	</div>

    </footer>
    <!-- /Footer -->
		
	<script src="../tmpl/js/jquery-1.11.3.min.js"></script>
	<script src="../tmpl/js/bootstrap.js"></script>
	<script src="../tmpl/js/ksr.js"></script>
  <script src="rdn.js"></script>
	<script src="main.js"></script>
</body>
</html>
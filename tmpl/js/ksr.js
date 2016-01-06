/**
 * 
 */
window.ksr = (function (window, document, undefined) {

	var ksr = {};
	
	/**
	 * Generate random number between min and max
	 * @param  {int} min the smallest number
	 * @param  {int} max the largest number
	 * @return {int}     the number
	 */
	ksr.random = function (min, max) {
		
		if ( min >= max ) {

			throw new RangeError('The max value must be larger than min.');

		} else {

			var num = Math.random() * (max - min) + min;
			return Math.round(num);

		}

	};

	return ksr;

})(window, document);
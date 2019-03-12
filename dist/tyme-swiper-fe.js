( function( $ ) {
	'use strict';

	$( document ).ready( function() {
		const swiperContainer = $( '.swiper-container' );

		new Swiper( swiperContainer, {
			autoplay: swiperContainer.data( 'swiper-autoplay' ),
			loop: swiperContainer.data( 'swiper-loop' ),
			slidesPerView: swiperContainer.data( 'swiper-perview' ),
			effect: swiperContainer.data( 'swiper-effect' ),
			fadeEffect: {
				crossFade: true,
			},
			grabCursor: true,
		} );
	} );
}( jQuery ) );

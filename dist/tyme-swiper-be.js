( function( $ ) {
	'use strict';

	$( document ).on( 'change', '.block-editor', function() {
		const swiperContainer = $( '.swiper-container' );

		const swiperOptions = {
			autoplay: swiperContainer.data( 'swiper-autoplay' ),
			loop: swiperContainer.data( 'swiper-loop' ),
			slidesPerView: swiperContainer.data( 'swiper-perview' ),
			centeredSlides: swiperContainer.data( 'swiper-centered' ),
			effect: swiperContainer.data( 'swiper-effect' ),
			navigation: ( swiperContainer.data( 'swiper-navigation' ) ? {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			} : false ),
			pagination: ( swiperContainer.data( 'swiper-pagination' ) ? {
				el: '.swiper-pagination',
				dynamicBullets: swiperContainer.data( 'swiper-pagination-effect' ) ? true : false,
			} : false ),
			fadeEffect: {
				crossFade: true,
			},
			grabCursor: true,
		};

		new Swiper( swiperContainer, swiperOptions );
	} );
}( jQuery ) );

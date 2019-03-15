/**
 * Initialize Tyme Post Swiper
 *
 * @author	Tyler Bailey <tylerb.media@gmail.com>
 * @package	tyme-post-swiper
 */

const action = ( tyme.curPage && tyme.curPage === 'post.php' ? 'change' : 'DOMContentLoaded' );

document.addEventListener( action, function() {
	const swiperContainer = document.querySelector( '.swiper-container' );

	const swiperOptions = {
		autoplay: swiperContainer.getAttribute( 'data-swiper-autoplay' ),
		loop: swiperContainer.getAttribute( 'data-swiper-loop' ),
		slidesPerView: swiperContainer.getAttribute( 'data-swiper-perview' ),
		centeredSlides: swiperContainer.getAttribute( 'data-swiper-centered' ),
		effect: swiperContainer.getAttribute( 'data-swiper-effect' ),
		navigation: ( swiperContainer.getAttribute( 'data-swiper-navigation' ) ? {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		} : false ),
		pagination: ( swiperContainer.getAttribute( 'data-swiper-pagination' ) ? {
			el: '.swiper-pagination',
			dynamicBullets: swiperContainer.getAttribute( 'data-swiper-pagination-effect' ),
		} : '' ),
		fadeEffect: {
			crossFade: true,
		},
		grabCursor: true,
	};

	new Swiper( swiperContainer, swiperOptions );
} );

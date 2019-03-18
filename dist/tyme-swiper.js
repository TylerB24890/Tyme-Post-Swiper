/**
 * Initialize Tyme Post Swiper
 *
 * @author	Tyler Bailey <tylerb.media@gmail.com>
 * @package	tyme-post-swiper
 */

// Initialize Swiper on CHANGE if in editor, otherwise on DOMContentLoaded if on frontend.
const action = ( tyme.curPage && tyme.curPage === 'post.php' ? 'change' : 'DOMContentLoaded' );

// Listen for the specified action above
document.addEventListener( action, function() {
	// Get the swiper element
	const swiperContainer = document.querySelector( '.swiper-container' );

	// Set the swiper options
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

	// Initialize swiper
	new Swiper( swiperContainer, swiperOptions );
} );

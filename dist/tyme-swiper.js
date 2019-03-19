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

	// Swiper Transition Effect
	const swiperEffect = swiperContainer.getAttribute( 'data-swiper-effect' );

	// Set the swiper options
	let swiperOptions = {
		autoplay: swiperContainer.getAttribute( 'data-swiper-autoplay' ),
		loop: swiperContainer.getAttribute( 'data-swiper-loop' ),
		slidesPerView: swiperContainer.getAttribute( 'data-swiper-perview' ),
		centeredSlides: swiperContainer.getAttribute( 'data-swiper-centered' ),
		effect: swiperEffect,
		navigation: ( swiperContainer.getAttribute( 'data-swiper-navigation' ) ? {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		} : false ),
		grabCursor: true,
	};

	// Set the Swiper Fade effect
	if ( swiperEffect === 'fade' ) {
		swiperOptions = {
			...swiperOptions,
			fadeEffect: {
				crossFade: true,
			},
		};
	}

	// Configure the Swiper pagination
	if ( swiperContainer.getAttribute( 'data-swiper-pagination' ) ) {
		// The pagination type
		const swiperPagiType = swiperContainer.getAttribute( 'data-swiper-pagination-type' );

		swiperOptions = {
			...swiperOptions,
			pagination: {
				el: '.swiper-pagination',
				dynamicBullets: ( swiperPagiType === 'dynamic' ? true : false ),
			},
		};

		// If a pagination type is chosen other than the default bullets, set it.
		if ( swiperPagiType !== 'default' && swiperPagiType !== 'dynamic' ) {
			swiperOptions.pagination = {
				...swiperOptions.pagination,
				type: swiperPagiType,
			};
		}
	}

	// Initialize swiper
	new Swiper( swiperContainer, swiperOptions );
} );

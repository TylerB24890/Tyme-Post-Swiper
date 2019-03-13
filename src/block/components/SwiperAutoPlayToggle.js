/**
 * Swiper Settings
 * Controls Autoplay boolean
 *
 * If set, Swiper carousel will begin cycling through posts on load.
 *
 * @type 		{Object}
 * @author	Tyler Bailey <tylerb.media@gmail.com>
 * @package tyme-post-swiper
 */

const { Component } = wp.element;
const { ToggleControl } = wp.components;
const { __ } = wp.i18n;

class SwiperAutoPlayToggle extends Component {
	constructor() {
		super( ...arguments );

		this.state = {
			autoplay: this.props.value,
		};
	}

	onChange( autoplay ) {
		this.props.onChange( autoplay );
		this.setState( {
			autoplay: autoplay,
		} );
	}

	render() {
		return (
			<ToggleControl
				label={ __( 'Autoplay Carousel' ) }
				help={ this.state.autoplay ? __( 'Carousel will autoplay.' ) : __( 'Carousel will not autoplay.' ) }
				checked={ this.state.autoplay }
				onChange={ ( newAutoplay ) => {
					this.onChange( newAutoplay );
				} }
			/>
		);
	}
}

export { SwiperAutoPlayToggle };

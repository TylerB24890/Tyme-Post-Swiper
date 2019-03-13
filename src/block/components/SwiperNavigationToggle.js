/**
 * Swiper Settings
 * Controls Swiper Carousel Navigation
 *
 * Lets the user choose to show the next/previous arrows
 *
 * @type 	{Object}
 * @author	Tyler Bailey <tylerb.media@gmail.com>
 * @package tyme-post-swiper
 */

const { Component } = wp.element;
const { ToggleControl } = wp.components;
const { __ } = wp.i18n;

class SwiperNavigationToggle extends Component {
	constructor() {
		super( ...arguments );

		this.state = {
			showNav: this.props.value,
		};
	}

	onChange( showNav ) {
		this.props.onChange( showNav );
		this.setState( {
			showNav: showNav,
		} );
	}

	render() {
		return (
			<ToggleControl
				label={ __( 'Carousel Navigation' ) }
				help={ this.state.showNav ? __( 'Carousel navigation is visible.' ) : __( 'No carousel navigation.' ) }
				checked={ this.state.showNav }
				onChange={ ( newNav ) => {
					this.onChange( newNav );
				} }
			/>
		);
	}
}

export { SwiperNavigationToggle };

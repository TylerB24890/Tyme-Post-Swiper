/**
 * Swiper Settings
 * Show the 'Read More...' link after the excerpt or not
 *
 * @type 	{Object}
 * @author	Tyler Bailey <tylerb.media@gmail.com>
 * @package tyme-post-swiper
 */

const { Component } = wp.element;
const { ToggleControl } = wp.components;
const { __ } = wp.i18n;

class SwiperMoreToggle extends Component {
	constructor() {
		super( ...arguments );

		this.state = {
			more: this.props.value,
		};
	}

	onChange( more ) {
		this.props.onChange( more );
		this.setState( {
			more: more,
		} );
	}

	render() {
		return (
			<ToggleControl
				label={ __( '"Read More" Link' ) }
				help={ this.state.more ? __( '"Read More" link will be shown.' ) : __( 'No "Read More" link.' ) }
				checked={ this.state.more }
				onChange={ ( newMore ) => {
					this.onChange( newMore );
				} }
			/>
		);
	}
}

export { SwiperMoreToggle };

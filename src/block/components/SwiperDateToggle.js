/**
 * Post Settings
 * Lets the user display the post publish date or not
 *
 * @type 	{Object}
 * @author	Tyler Bailey <tylerb.media@gmail.com>
 * @package tyme-post-swiper
 */

const { Component } = wp.element;
const { ToggleControl } = wp.components;
const { __ } = wp.i18n;

class SwiperDateToggle extends Component {
	constructor() {
		super( ...arguments );

		this.state = {
			showDate: this.props.value,
		};
	}

	onChange( showDate ) {
		this.props.onChange( showDate );
		this.setState( {
			showDate: showDate,
		} );
	}

	render() {
		return (
			<ToggleControl
				label={ __( 'Display Date' ) }
				help={ this.state.showDate ? __( 'Post dates is visible.' ) : __( 'Post dates is hidden.' ) }
				checked={ this.state.showDate }
				onChange={ ( newShowDate ) => {
					this.onChange( newShowDate );
				} }
			/>
		);
	}
}

export { SwiperDateToggle };

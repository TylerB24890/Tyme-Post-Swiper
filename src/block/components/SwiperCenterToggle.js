/**
 * Swiper Settings
 * Controls Content Alignment
 *
 * If set, Posts will be center aligned within the container.
 * If not, left align is default.
 *
 * @type 		{Object}
 * @author	Tyler Bailey <tylerb.media@gmail.com>
 * @package tyme-post-swiper
 */

const { Component } = wp.element;
const { ToggleControl } = wp.components;
const { __ } = wp.i18n;

class SwiperCenterToggle extends Component {
	constructor() {
		super( ...arguments );

		this.state = {
			centered: this.props.value,
		};
	}

	onChange( centered ) {
		this.props.onChange( centered );
		this.setState( {
			centered: centered,
		} );
	}

	render() {
		return (
			<ToggleControl
				label={ __( 'Center Posts' ) }
				help={ this.state.centered ? __( 'Posts are centered.' ) : __( 'Posts are left aligned.' ) }
				checked={ this.state.centered }
				onChange={ ( newCentered ) => {
					this.onChange( newCentered );
				} }
			/>
		);
	}
}

export { SwiperCenterToggle };

/**
 * Swiper Settings
 * Controls Swiper Loop Boolean
 *
 * If set, Swiper carousel will loop between the selected posts infinitely.
 *
 * @type 	{Object}
 * @author	Tyler Bailey <tylerb.media@gmail.com>
 * @package tyme-post-swiper
 */

const { Component } = wp.element;
const { ToggleControl } = wp.components;
const { __ } = wp.i18n;

class SwiperLoopToggle extends Component {
	constructor() {
		super( ...arguments );

		this.state = {
			loop: this.props.value,
		};
	}

	onChange( loop ) {
		this.props.onChange( loop );
		this.setState( {
			loop: loop,
		} );
	}

	render() {
		return (
			<ToggleControl
				label={ __( 'Loop Posts' ) }
				help={ this.state.loop ? __( 'Posts will loop infinitely.' ) : __( 'Posts will cycle once.' ) }
				checked={ this.state.loop }
				onChange={ ( newLoop ) => {
					this.onChange( newLoop );
				} }
			/>
		);
	}
}

export { SwiperLoopToggle };

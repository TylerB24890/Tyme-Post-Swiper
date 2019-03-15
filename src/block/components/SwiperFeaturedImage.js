/**
 * Post Settings
 * Controls Whether or not to display the post featured image
 *
 * @type 	{Object}
 * @author	Tyler Bailey <tylerb.media@gmail.com>
 * @package tyme-post-swiper
 */

const { Component } = wp.element;
const { ToggleControl } = wp.components;
const { __ } = wp.i18n;

class SwiperFeaturedImage extends Component {
	constructor() {
		super( ...arguments );

		this.state = {
			showImage: this.props.value,
		};
	}

	onChange( showImage ) {
		this.props.onChange( showImage );
		this.setState( {
			showImage: showImage,
		} );
	}

	render() {
		return (
			<ToggleControl
				label={ __( 'Featured Image' ) }
				help={ this.state.showImage ? __( 'Featured image will display.' ) : __( 'Featured image will not display.' ) }
				checked={ this.state.showImage }
				onChange={ ( newImage ) => {
					this.onChange( newImage );
				} }
			/>
		);
	}
}

export { SwiperFeaturedImage };

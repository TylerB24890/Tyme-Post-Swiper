/**
 * Post Settings
 * Controls Whether or not to display the post featured image
 * Also controls whether or not to link the featured image to the post
 *
 * @type 	{Object}
 * @author	Tyler Bailey <tylerb.media@gmail.com>
 * @package tyme-post-swiper
 */

const { Fragment, Component } = wp.element;
const { ToggleControl } = wp.components;
const { __ } = wp.i18n;

class SwiperFeaturedImage extends Component {
	constructor() {
		super( ...arguments );

		this.state = {
			showImage: this.props.value,
			linkImage: this.props.linkImage,
		};
	}

	onChange( showImage ) {
		this.props.onChange( showImage );
		this.setState( {
			showImage: showImage,
		} );
	}

	onLinkImageChange( linkImage ) {
		this.props.onLinkImageChange( linkImage );
		this.setState( {
			linkImage: linkImage,
		} );
	}

	render() {
		return (
			<Fragment>
				<ToggleControl
					label={ __( 'Featured Image' ) }
					help={ this.state.showImage ? __( 'Featured image will display.' ) : __( 'Featured image will not display.' ) }
					checked={ this.state.showImage }
					onChange={ ( newImage ) => {
						this.onChange( newImage );
					} }
				/>
				{
					this.state.showImage ? (
						<ToggleControl
							label={ __( 'Link Image' ) }
							help={ this.state.linkImage ? __( 'Image is linked to the post' ) : __( 'Image is not linked.' ) }
							checked={ this.state.linkImage }
							onChange={ ( linkImage ) => {
								this.onLinkImageChange( linkImage );
							} }
						/>
					) : ''
				}
			</Fragment>
		);
	}
}

export { SwiperFeaturedImage };

/**
 * Swiper Settings
 * Controls how many posts are shown per slide
 *
 * Lets the user choose to show between 1-4 posts per slide.
 *
 * @type 	{Object}
 * @author	Tyler Bailey <tylerb.media@gmail.com>
 * @package tyme-post-swiper
 */

const { Component } = wp.element;
const { RangeControl } = wp.components;
const { __ } = wp.i18n;

class SwiperPerView extends Component {
	constructor() {
		super( ...arguments );

		this.state = {
			perview: this.props.value,
		};
	}

	onChange( perview ) {
		this.props.onChange( perview );
		this.setState( {
			perview: perview,
		} );
	}

	render() {
		return (
			<RangeControl
				label={ __( 'Posts Per View' ) }
				value={ this.state.perview }
				onChange={ ( newPerView ) => {
					this.onChange( newPerView );
				} }
				min={ 1 }
				max={ 4 }
			/>
		);
	}
}

export { SwiperPerView };

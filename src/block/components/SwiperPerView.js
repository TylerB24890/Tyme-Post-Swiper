const { Component } = wp.element;
const { RangeControl } = wp.components;
const { __ } = wp.i18n;

class SwiperPerView extends Component {
	constructor() {
		super( ...arguments );

		this.state = {
			perview: 1,
		};
	}

	onChange( perview ) {
		if ( perview !== this.state.perview ) {
			this.setState( {
				perview: perview,
			} );
		}
	}

	render() {
		const swipePerView = this.state.perview;

		return (
			<RangeControl
				label={ __( 'Posts Per View' ) }
				value={ swipePerView }
				onChange={ ( newPerView ) => {
					this.onChange( newPerView );
				} }
				min={ 1 }
				max={ 5 }
			/>
		);
	}
}

export default SwiperPerView;

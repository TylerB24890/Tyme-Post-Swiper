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
				onChange={ ( newValue ) => {
					this.onChange( newValue );
				} }
				min={ 1 }
				max={ 5 }
			/>
		);
	}
}

export default SwiperPerView;

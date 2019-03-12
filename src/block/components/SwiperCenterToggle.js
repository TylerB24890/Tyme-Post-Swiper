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
				onChange={ ( newValue ) => {
					this.onChange( newValue );
				} }
			/>
		);
	}
}

export { SwiperCenterToggle };

const { Component } = wp.element;
const { SelectControl } = wp.components;
const { __ } = wp.i18n;

class SwiperEffectSelect extends Component {
	constructor() {
		super( ...arguments );

		this.state = {
			effect: 'slide',
		};
	}

	onChange( effect ) {
		if ( effect !== this.state.effect ) {
			this.setState( {
				effect: effect,
			} );
		}
	}

	render() {
		const curEffect = this.state.effect;

		const availableEffects = [
			{
				label: __( 'Slide' ),
				value: 'slide',
			},
			{
				label: __( 'Fade' ),
				value: 'fade',
			},
			{
				label: __( 'Cube' ),
				value: 'cube',
			},
			{
				label: __( 'Coverflow' ),
				value: 'coverflow',
			},
			{
				label: __( 'Flip' ),
				value: 'flip',
			},
		];

		return (
			<SelectControl
				label={ __( 'Swipe Effect' ) }
				value={ curEffect }
				options={ availableEffects }
				onChange={ ( newEffect ) => {
					this.onChange( newEffect );
				} }
			/>
		);
	}
}

export default SwiperEffectSelect;

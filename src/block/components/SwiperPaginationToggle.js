/**
 * Swiper Settings
 * Controls Swiper Carousel Pagination
 *
 * Lets the user choose to show the swiper carousel pagination dots
 * Also allows the user to animate the pagination dots
 *
 * @type 	{Object}
 * @author	Tyler Bailey <tylerb.media@gmail.com>
 * @package tyme-post-swiper
 */

const { Fragment, Component } = wp.element;
const { ToggleControl, SelectControl } = wp.components;
const { __ } = wp.i18n;

class SwiperPaginationToggle extends Component {
	constructor() {
		super( ...arguments );

		this.state = {
			showPagi: this.props.value,
			pagiEffect: this.props.effectVal,
			pagiType: this.props.type,
		};
	}

	onChange( showPagi ) {
		this.props.onChange( showPagi );
		this.setState( {
			showPagi: showPagi,
		} );
	}

	onChangeType( newType ) {
		this.props.changeType( newType );
		this.setState( {
			pagiType: newType,
		} );
	}

	render() {
		return (
			<Fragment>
				<ToggleControl
					label={ __( 'Carousel Pagination' ) }
					help={ this.state.showPagi ? __( 'Carousel pagination is visible.' ) : __( 'No carousel pagination.' ) }
					checked={ this.state.showPagi }
					onChange={ ( newPagi ) => {
						this.onChange( newPagi );
					} }
				/>
				{
					this.state.showPagi ? (
						<SelectControl
							label={ __( 'Pagination Type' ) }
							value={ this.state.pagiType }
							options={ [
								{ label: __( 'Bullets' ), value: 'default' },
								{ label: __( 'Dynamic Bullets' ), value: 'dynamic' },
								{ label: __( 'Progress Bar' ), value: 'progressbar' },
								{ label: __( 'Fraction Numbers' ), value: 'fraction' },
							] }
							onChange={ ( newType ) => {
								this.onChangeType( newType );
							} }
						/>
					) : null
				}
			</Fragment>
		);
	}
}

export { SwiperPaginationToggle };

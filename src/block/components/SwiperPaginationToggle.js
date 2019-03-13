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
const { ToggleControl } = wp.components;
const { __ } = wp.i18n;

class SwiperPaginationToggle extends Component {
	constructor() {
		super( ...arguments );

		this.state = {
			showPagi: this.props.value,
			pagiEffect: this.props.effectVal,
		};
	}

	onChange( showPagi ) {
		this.props.onChange( showPagi );
		this.setState( {
			showPagi: showPagi,
		} );
	}

	onChangeEffect( newEffect ) {
		this.props.effectChange( newEffect );
		this.setState( {
			pagiEffect: newEffect,
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
				{ this.state.showPagi ? (
					<ToggleControl
						label={ __( 'Animate Pagination' ) }
						help={ this.state.pagiEffect ? __( 'Pagination will animate.' ) : __( 'Pagination will not animate.' ) }
						checked={ this.state.pagiEffect }
						onChange={ ( newEffect ) => {
							this.onChangeEffect( newEffect );
						} }
					/>
				) : '' }
			</Fragment>
		);
	}
}

export { SwiperPaginationToggle };

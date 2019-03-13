/**
 * Swiper Settings
 * Show the 'Read more...' link after the excerpt or not
 * Also includes input for changing the "Read more..." text
 *
 * @type 	{Object}
 * @author	Tyler Bailey <tylerb.media@gmail.com>
 * @package tyme-post-swiper
 */

const { Fragment, Component } = wp.element;
const { ToggleControl, TextControl } = wp.components;
const { __ } = wp.i18n;

class SwiperMoreToggle extends Component {
	constructor() {
		super( ...arguments );

		this.state = {
			more: this.props.value,
			moreText: this.props.moreText,
		};
	}

	onChange( more ) {
		this.props.onChange( more );
		this.setState( {
			more: more,
		} );
	}

	onTextChange( moreText ) {
		this.props.onTextChange( moreText );
		this.setState( {
			moreText: moreText,
		} );
	}

	/* eslint-disable jsx-a11y/no-autofocus */
	render() {
		return (
			<Fragment>
				<ToggleControl
					label={ __( '"Read More" Link' ) }
					help={ this.state.more ? __( '"Read More" link will be shown.' ) : __( 'No "Read More" link.' ) }
					checked={ this.state.more }
					onChange={ ( newMore ) => {
						this.onChange( newMore );
					} }
				/>
				{ this.state.more ? (
					<div className="editor_more_input">
						<TextControl
							label={ __( 'Read more link text' ) }
							value={ this.state.moreText }
							help={ __( 'Change the "Read more..." link text' ) }
							onChange={ ( moreText ) => {
								this.onTextChange( moreText );
							} }
						/>
					</div>
				) : '' }
			</Fragment>
		);
	}
}

export { SwiperMoreToggle };

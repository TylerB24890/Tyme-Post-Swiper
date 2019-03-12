const { SelectControl, RangeControl } = wp.components;
const { withState } = wp.compose;

const availableEffects = [
	{
		label: 'Slide',
		value: 'slide',
	},
	{
		label: 'Fade',
		value: 'fade',
	},
	{
		label: 'Cube',
		value: 'cube',
	},
	{
		label: 'Coverflow',
		value: 'coverflow',
	},
	{
		label: 'Flip',
		value: 'flip',
	},
];

const SwiperEffectSelect = withState( {
	swipeEffect: 'slide',
} )( ( { swipeEffect, setState } ) => (
	<SelectControl
		label="Swipe Effect"
		value={ swipeEffect }
		options={ availableEffects }
		onChange={ ( swipeEffect ) => {
			setState( { swipeEffect } );
		} }
	/>
) );

const SwiperPerView = withState( {
	swipePerView: 1,
} )( ( { swipePerView, setState } ) => (
	<RangeControl
		label="Posts Per View"
		value={ swipePerView }
		onChange={ ( swipePerView ) => {
			setState( { swipePerView } );
		} }
		min={ 1 }
		max={ 5 }
	/>
) );

export { SwiperEffectSelect, SwiperPerView };

/**
 * Tyme Post Swiper Block
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

// Import Components
import PostSelector from './components/PostSelector';
import SwiperEffectSelect from './components/SwiperEffectSelect';
import SwiperPerView from './components/SwiperPerView';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { Fragment, RawHTML } = wp.element;
const { InspectorControls } = wp.editor;
const { PanelBody } = wp.components;

/**
 * Register Gutenberg Block.
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 */
registerBlockType( 'tyme/post-swiper', {
	title: __( 'Tyme Post Swiper' ),
	icon: 'slides',
	category: 'widgets',
	keywords: [
		__( 'Post Swiper' ),
		__( 'Tyme' ),
		__( 'Carousel' ),
	],
	attributes: {
		posts: {
			type: 'array',
			default: [],
		},
		showFeaturedImage: {
			default: false,
			type: 'boolean',
		},
		swiperSettings: {
			effect: {
				type: 'string',
				default: 'slide',
			},
			perview: {
				type: 'number',
				default: 1,
			},
		},
	},

	/**
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	edit: ( props ) => {
		const posts = props.attributes.posts;
		const settings = props.attributes.swiperSettings;
		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Swiper Posts' ) }>
						<PostSelector
							onPostSelect={ post => {
								posts.push( post );
								props.setAttributes( { posts: [ ...posts ] } );
							} }
							posts={ posts }
							onChange={ newValue => {
								props.setAttributes( { posts: [ ...newValue ] } );
							} }
							postType={ 'post' }
							limit="3"
							showSuggestions={ true }
						/>
					</PanelBody>

					<PanelBody title={ __( 'Swiper Settings' ) }>
						<SwiperEffectSelect />
						<SwiperPerView
							onChange={ newPerView => {
								props.setAttributes( { swiperPerView: newPerView } );
							} }
						/>
					</PanelBody>
				</InspectorControls>
				<div className="swiper-container">
					<div className="swiper-wrapper">
						{ props.attributes.posts.map( post => (
							<div className="swiper-slide" key={ post.id }>
								#{ post.id }
								<h2>{ post.title }</h2>
								<RawHTML>{ post.excerpt }</RawHTML>
							</div>
						) ) }
					</div>
				</div>
			</Fragment>
		);
	},

	/**
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	save: ( props ) => {
		return (
			<div className="swiper-container">
				<div className="swiper-wrapper">
					<h2>{ __( 'Settings' ) }</h2>
					<div>
						{ __( '# of Slides' ) + props.attributes.swiperPerView }
					</div>
					<div>
						{ __( 'Swiper Effect' ) + props.attributes.swiperEffect }
					</div>
					{ props.attributes.posts.map( post => (
						<div className="swiper-slide" key={ post.id }>
							#{ post.id }
							<h2>{ post.title }</h2>
							<RawHTML>{ post.excerpt }</RawHTML>
						</div>
					) ) }
				</div>
			</div>
		);
	},
} );

/**
 * Tyme Post Swiper Block
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

// Import Components
import PostSelector from './components/PostSelector';
import { SwiperEffectSelect, SwiperPerView } from './components/SwiperSettings';

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
		swiperEffect: {
			type: 'select',
			default: 'slide',
		},
		swiperPerView: {
			type: 'int',
			default: 1,
		},
	},

	/**
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	edit( { attributes, setAttributes } ) {
		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Swiper Posts' ) }>
						<PostSelector
							onPostSelect={ post=> {
								attributes.posts.push( post );
								setAttributes( { posts: [ ...attributes.posts ] } );
							} }
							posts={ attributes.posts }
							onChange={ newValue => {
								setAttributes( { posts: [ ...newValue ] } );
							} }
							postType={ 'post' }
							limit="3"
							showSuggestions={ true }
						/>
					</PanelBody>

					<PanelBody title={ __( 'Swiper Settings' ) }>
						<SwiperEffectSelect />
						<SwiperPerView />
					</PanelBody>
				</InspectorControls>
				<div>
					{ attributes.posts.map( post => (
						<div key={ post.id }>
							#{ post.id }
							<h2>{ post.title }</h2>
							<RawHTML>{ post.excerpt }</RawHTML>
						</div>
					) ) }
				</div>
			</Fragment>
		);
	},

	/**
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	save( { attributes } ) {
		return (
			<div>
				{ attributes.posts.map( post => (
					<div key={ post.id }>
						#{ post.id }
						<h2>{ post.title }</h2>
						<RawHTML>{ post.excerpt }</RawHTML>
					</div>
				) ) }
			</div>
		);
	},
} );

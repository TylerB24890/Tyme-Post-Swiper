/**
 * Tyme Post Swiper Block
 */

//  Import CSS.
import './style.scss';
import './editor.scss';
import PostSelector from './components/PostSelector';

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
	},

	/**
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	edit( { attributes, setAttributes } ) {
		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Tyme Post Swiper | Select Post' ) }>
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

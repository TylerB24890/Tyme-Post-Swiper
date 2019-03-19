/* eslint-disable valid-jsdoc */
/**
 * Tyme Post Swiper Block
 *
 * @author	Tyler Bailey <tylerb.media@gmail.com>
 * @package tyme-post-swiper
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

// Custom Components
import SwiperPostSelector from './components/SwiperPostSelector';
import {
	SwiperEffectSelect,
	SwiperPerView,
	SwiperLoopToggle,
	SwiperAutoPlayToggle,
	SwiperCenterToggle,
	SwiperMoreToggle,
	SwiperNavigationToggle,
	NextArrow,
	PrevArrow,
	SwiperPaginationToggle,
	SwiperFeaturedImage,
	SwiperDateToggle,
} from './components';

// WP Components
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { Fragment, RawHTML } = wp.element;
const { InspectorControls } = wp.editor;
const { PanelBody, ColorPicker } = wp.components;
const { dateI18n } = wp.date;

/**
 * Register Gutenberg Block
 *
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
		swiperEffect: {
			type: 'string',
			default: 'slide',
		},
		swiperPerView: {
			type: 'number',
			default: 1,
		},
		swiperLoop: {
			type: 'boolean',
			default: true,
		},
		swiperAutoPlay: {
			type: 'boolean',
			default: false,
		},
		swiperCentered: {
			type: 'boolean',
			default: true,
		},
		swiperReadMore: {
			type: 'boolean',
			default: false,
		},
		swiperReadMoreText: {
			type: 'string',
			default: __( 'Read more...' ),
		},
		swiperShowNav: {
			type: 'boolean',
			default: false,
		},
		swiperNavColor: {
			type: 'string',
			default: '#017AFF',
		},
		swiperShowPagi: {
			type: 'boolean',
			default: false,
		},
		swiperPagiType: {
			type: 'string',
			default: 'default',
		},
		swiperFeaturedImage: {
			type: 'boolean',
			default: true,
		},
		swiperLinkFeaturedImage: {
			type: 'boolean',
			default: false,
		},
		swiperShowDate: {
			type: 'boolean',
			default: false,
		},
	},

	/**
	 * The Gutenberg Edit Function
	 * Renders the Block Editor in wp-admin
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	edit: ( props ) => {
		const {
			posts,
			swiperEffect,
			swiperPerView,
			swiperLoop,
			swiperAutoPlay,
			swiperCentered,
			swiperReadMore,
			swiperReadMoreText,
			swiperShowNav,
			swiperNavColor,
			swiperShowPagi,
			swiperPagiType,
			swiperFeaturedImage,
			swiperLinkFeaturedImage,
			swiperShowDate,
		} = props.attributes;

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Swiper Posts' ) } icon="edit">
						<SwiperPostSelector
							onPostSelect={ ( post ) => {
								posts.push( post );
								props.setAttributes( { posts: [ ...posts ] } );
							} }
							posts={ posts }
							onChange={ ( newPost ) => {
								props.setAttributes( { posts: [ ...newPost ] } );
							} }
							postType={ 'post' }
							showSuggestions={ true }
						/>
					</PanelBody>

					<PanelBody title={ __( 'Post Settings' ) } icon="edit">
						<SwiperFeaturedImage
							onChange={ ( displayFeatured ) => {
								props.setAttributes( { swiperFeaturedImage: displayFeatured } );
							} }
							value={ swiperFeaturedImage }
							onLinkImageChange={ ( linkFeaturedImage ) => {
								props.setAttributes( { swiperLinkFeaturedImage: linkFeaturedImage } );
							} }
							linkImage={ swiperLinkFeaturedImage }
						/>
						<SwiperDateToggle
							onChange={ ( displayDate ) => {
								props.setAttributes( { swiperShowDate: displayDate } );
							} }
							value={ swiperShowDate }
						/>
						<SwiperMoreToggle
							onChange={ ( moreVal ) => {
								props.setAttributes( { swiperReadMore: moreVal } );
							} }
							value={ swiperReadMore }
							moreText={ swiperReadMoreText }
							onTextChange={ ( moreText ) => {
								props.setAttributes( { swiperReadMoreText: moreText } );
							} }
						/>
					</PanelBody>

					<PanelBody title={ __( 'Swiper Settings' ) } initialOpen={ false } icon="slides">
						<SwiperEffectSelect
							onChange={ ( newEffect ) => {
								props.setAttributes( { swiperEffect: newEffect } );
							} }
							value={ swiperEffect }
						/>
						<SwiperPerView
							onChange={ ( newPerView ) => {
								props.setAttributes( { swiperPerView: newPerView } );
							} }
							value={ swiperPerView }
						/>
						<SwiperLoopToggle
							onChange={ ( loopPosts ) => {
								props.setAttributes( { swiperLoop: loopPosts } );
							} }
							value={ swiperLoop }
						/>
						<SwiperCenterToggle
							onChange={ ( centerVal ) => {
								props.setAttributes( { swiperCentered: centerVal } );
							} }
							value={ swiperCentered }
						/>
						<SwiperAutoPlayToggle
							onChange={ ( autoPlayVal ) => {
								props.setAttributes( { swiperAutoPlay: autoPlayVal } );
							} }
							value={ swiperAutoPlay }
						/>
						<SwiperNavigationToggle
							onChange={ ( navVal ) => {
								props.setAttributes( { swiperShowNav: navVal } );
							} }
							value={ swiperShowNav }
						/>
						{
							swiperShowNav ? (
								<ColorPicker
									color={ swiperNavColor }
									onChangeComplete={ ( { hex } ) => {
										props.setAttributes( { swiperNavColor: hex } );
									} }
									disableAlpha
								/>
							) : null
						}
						<SwiperPaginationToggle
							onChange={ ( pagiVal ) => {
								props.setAttributes( { swiperShowPagi: pagiVal } );
							} }
							changeType={ ( pagiType ) => {
								props.setAttributes( { swiperPagiType: pagiType } );
							} }
							value={ swiperShowPagi }
							type={ swiperPagiType }
						/>
					</PanelBody>
				</InspectorControls>
				<div
					className="swiper-container"
					data-swiper-effect={ swiperEffect }
					data-swiper-perview={ swiperPerView }
					data-swiper-loop={ swiperLoop }
					data-swiper-autoplay={ swiperAutoPlay }
					data-swiper-centered={ swiperCentered }
					data-swiper-navigation={ swiperShowNav }
					data-swiper-pagination={ swiperShowPagi }
					data-swiper-pagination-type={ swiperPagiType }
					data-block-selected={ props.isSelected }
					data-swiper-more={ swiperReadMore }
				>
					<div className="swiper-wrapper">
						{ posts.map( post => (
							<div className="swiper-slide" key={ post.id }>
								{
									swiperFeaturedImage && post.image.length > 1 && swiperLinkFeaturedImage ? (
										<a href={ post.url }><img src={ post.image } alt={ post.title } /></a>
									) : null
								}
								{
									swiperFeaturedImage && post.image.length > 1 && ! swiperLinkFeaturedImage ? (
										<img src={ post.image } alt={ post.title } />
									) : null
								}
								<h2><a href={ post.url }>{ post.title }</a></h2>
								{
									swiperShowDate ? (
										<div className="post-date">{ dateI18n( 'F j, Y', post.date ) }</div>
									) : null
								}
								<RawHTML>{ post.excerpt }</RawHTML>
								{ swiperReadMore ? (
									<div className="read-more">
										<a href={ post.url }>{ swiperReadMoreText }</a>
									</div>
								) : null }
							</div>
						) ) }
					</div>

					{ swiperShowNav ? (
						<Fragment>
							<div className="swiper-button-next">
								<NextArrow color={ swiperNavColor } />
							</div>
							<div className="swiper-button-prev">
								<PrevArrow color={ swiperNavColor } />
							</div>
						</Fragment>
					) : null }

					{ swiperShowPagi ? (
						<div className="swiper-pagination"></div>
					) : null }
				</div>
			</Fragment>
		);
	},

	/**
	 * The Gutenberg Save Function
	 * Tells WP how to save the rendered block markup to the database.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	save: ( props ) => {
		const {
			posts,
			swiperEffect,
			swiperPerView,
			swiperLoop,
			swiperAutoPlay,
			swiperCentered,
			swiperReadMore,
			swiperReadMoreText,
			swiperShowNav,
			swiperNavColor,
			swiperShowPagi,
			swiperPagiType,
			swiperFeaturedImage,
			swiperLinkFeaturedImage,
			swiperShowDate,
		} = props.attributes;

		return (
			<div className="tyme-swiper">
				<div
					className="swiper-container"
					data-swiper-effect={ swiperEffect }
					data-swiper-perview={ swiperPerView }
					data-swiper-loop={ swiperLoop }
					data-swiper-autoplay={ swiperAutoPlay }
					data-swiper-centered={ swiperCentered }
					data-swiper-navigation={ swiperShowNav }
					data-swiper-pagination={ swiperShowPagi }
					data-swiper-pagination-type={ swiperPagiType }
					data-swiper-more={ swiperReadMore }
				>
					<div className="swiper-wrapper">
						{ posts.map( post => (
							<div className="swiper-slide" key={ post.id }>
								{
									swiperFeaturedImage && post.image.length > 1 && swiperLinkFeaturedImage ? (
										<a href={ post.url }><img src={ post.image } alt={ post.title } /></a>
									) : ''
								}
								{
									swiperFeaturedImage && post.image.length > 1 && ! swiperLinkFeaturedImage ? (
										<img src={ post.image } alt={ post.title } />
									) : ''
								}
								<h2><a href={ post.url }>{ post.title }</a></h2>
								{
									swiperShowDate ? (
										<div className="post-date">{ dateI18n( 'F j, Y', post.date ) }</div>
									) : ''
								}

								<RawHTML>{ post.excerpt }</RawHTML>
								{ swiperReadMore ? (
									<div className="read-more">
										<a href={ post.url }>{ swiperReadMoreText }</a>
									</div>
								) : '' }
							</div>
						) ) }
					</div>

					{ swiperShowNav ? (
						<Fragment>
							<div className="swiper-button-next">
								<NextArrow color={ swiperNavColor } />
							</div>
							<div className="swiper-button-prev">
								<PrevArrow color={ swiperNavColor } />
							</div>
						</Fragment>
					) : '' }

					{ swiperShowPagi ? (
						<div className="swiper-pagination"></div>
					) : '' }
				</div>
			</div>
		);
	},
} );

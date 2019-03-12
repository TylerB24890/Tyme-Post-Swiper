<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since   1.0.0
 * @package tyme-post-swiper
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueue Gutenberg block assets for both frontend + backend.
 */
function tyme_post_swiper_assets() { // phpcs:ignore
	// Styles.
	wp_enqueue_style(
		'tyme_post_swiper-css',
		plugins_url( 'dist/blocks.style.build.css', dirname( __FILE__ ) ),
		array( 'wp-editor' )
	);
}
add_action( 'enqueue_block_assets', 'tyme_post_swiper_assets' );

/**
 * Enqueue Gutenberg block assets for backend editor.
 */
function tyme_post_swiper_editor_assets() { // phpcs:ignore
	// Scripts.
	wp_enqueue_script(
		'tyme_post_swiper-js',
		plugins_url( '/dist/blocks.build.js', dirname( __FILE__ ) ),
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor', 'wp-html-entities', 'wp-keycodes', 'wp-components', 'wp-compose', 'wp-url' ),
		true
	);

	// Styles.
	wp_enqueue_style(
		'tyme_post_swiper-editor-css',
		plugins_url( 'dist/blocks.editor.build.css', dirname( __FILE__ ) ),
		array( 'wp-edit-blocks' )
	);
}
add_action( 'enqueue_block_editor_assets', 'tyme_post_swiper_editor_assets' );

function tyme_post_swiper_meta() {
	register_meta( 'post', 'swiperEffect', array(
		'show_in_rest' => true,
		'single' => true,
		'type' => 'string'
	) );

	register_meta( 'post', 'swiperPerView', array(
		'show_in_rest' => true,
		'single' => true,
		'type' => 'number'
	) );
}
add_action( 'init', 'tyme_post_swiper_meta' );

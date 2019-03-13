<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since   1.0.0
 * @package tyme-post-swiper
 */

namespace Tyme\PostSwiper\Core;

class PostSwiper {

	public function __construct() {
		add_action( 'enqueue_block_assets', array( $this, 'enqueue_global_assets' ) );
		add_action( 'enqueue_block_editor_assets', array( $this, 'enqueue_editor_assets' ) );
	}

  /**
   * Enqueue block assets for both frontend & backend
   *
   * @return void
   */
	public function enqueue_global_assets() {
		wp_enqueue_script(
			'tyme_post_swiper-swiper-script',
			TYME_URL . '/dist/vendor/swiper.min.js',
			array()
		);

		wp_enqueue_script(
			'tyme_post_swiper-fe-script',
			TYME_URL . '/dist/tyme-swiper-fe.js',
			array( 'tyme_post_swiper-swiper-script', 'jquery' ),
			true
		);

		// Styles.
		wp_enqueue_style(
			'tyme_post_swiper-css',
			TYME_URL . '/dist/blocks.style.build.css',
			array( 'wp-editor' )
		);
	}

  /**
   * Enqueue block assets for backend editor only
   *
   * @return void
   */
	public function enqueue_editor_assets() {
		// Scripts.
		wp_enqueue_script(
			'tyme_post_swiper-js',
			TYME_URL . '/dist/blocks.build.js',
			array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor', 'wp-html-entities', 'wp-keycodes', 'wp-components', 'wp-compose', 'wp-url' ),
			true
		);

		wp_enqueue_script(
			'tyme_post_swiper-be-js',
			TYME_URL . '/dist/tyme-swiper-be.js',
			array( 'jquery' ),
			true
		);

		// Styles.
		wp_enqueue_style(
			'tyme_post_swiper-editor-css',
			TYME_URL . '/dist/blocks.editor.build.css',
			array( 'wp-edit-blocks' )
		);
	}
}

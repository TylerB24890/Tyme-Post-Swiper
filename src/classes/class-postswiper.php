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

	/**
	 * Static reference to the single instance
	 *
	 * @var object
	 */
	protected static $instance;

	/**
	 * Object constructor
	 */
	public function __construct() {
		\add_action( 'enqueue_block_assets', array( $this, 'enqueue_global_assets' ) );
		\add_action( 'enqueue_block_editor_assets', array( $this, 'enqueue_editor_assets' ) );
	}

	/**
	 * Get object instance, set one up if we don't have one
	 *
	 * @return Content_Type
	 */
	public static function get_instance() {
		if ( ! self::$instance ) {
			self::$instance = new self();
		}

		return self::$instance;
	}


  /**
   * Enqueue block assets for both frontend & backend
   *
   * @return void
   */
	public function enqueue_global_assets() {
		\wp_enqueue_script(
			'tyme_post_swiper_swiper_script',
			TYME_URL . 'dist/vendor/swiper.min.js',
			array()
		);

		\wp_enqueue_script(
			'tyme_post_swiper_init',
			TYME_URL . 'dist/tyme-swiper.js',
			array( 'tyme_post_swiper_swiper_script' ),
			true
		);

		// Styles.
		\wp_enqueue_style(
			'tyme_post_swiper-css',
			TYME_URL . 'dist/blocks.style.build.css',
			array( 'wp-editor' )
		);

		$this->localize_data();
	}

  /**
   * Enqueue block assets for backend editor only
   *
   * @return void
   */
	public function enqueue_editor_assets() {
		// Scripts.
		\wp_enqueue_script(
			'tyme_post_swiper-js',
			TYME_URL . 'dist/blocks.build.js',
			array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor', 'wp-html-entities', 'wp-keycodes', 'wp-components', 'wp-compose', 'wp-url', 'wp-date' ),
			true
		);

		// Styles.
		\wp_enqueue_style(
			'tyme_post_swiper-editor-css',
			TYME_URL . 'dist/blocks.editor.build.css',
			array( 'wp-edit-blocks' )
		);
	}

	/**
	 * Localize data for JS script
	 *
	 * @return void
	 */
	private function localize_data() {
		global $pagenow;
		$localized = array(
			'curPage' => ( ! empty( $pagenow ) ? $pagenow : '' )
		);
		\wp_localize_script( 'tyme_post_swiper_init', 'tyme', $localized );
	}
}

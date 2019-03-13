<?php
/**
 * Plugin Name: Tyme Post Swiper
 * Plugin URI: https://github.com/TylerB24890/tyme-post-swiper
 * Description: A Gutenberg block to create a customizable carousel of existing posts
 * Author: Tyler Bailey
 * Author URI: https://www.tylerb.me
 * Version: 1.0.0
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package tyme-post-swiper
 */

namespace Tyme\PostSwiper\Core;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'TYME_DIR', plugin_dir_path( __FILE__ ) );
define( 'TYME_URL', plugin_dir_url( __FILE__ ) );

function run() {
	require_once TYME_DIR . 'src/classes/class-postswiper.php';
	new PostSwiper();
}

\Tyme\PostSwiper\Core\run();

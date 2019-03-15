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
 *
 * Copyright (C) 1989, 1991 Free Software Foundation, Inc.
 * 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA
 *
 * Everyone is permitted to copy and distribute verbatim copies
 * of this license document, but changing it is not allowed.
 */

namespace Tyme\PostSwiper\Core;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'TYME_DIR', plugin_dir_path( __FILE__ ) );
define( 'TYME_URL', plugin_dir_url( __FILE__ ) );

require_once TYME_DIR . 'src/classes/class-postswiper.php';

\Tyme\PostSwiper\Core\PostSwiper::get_instance();

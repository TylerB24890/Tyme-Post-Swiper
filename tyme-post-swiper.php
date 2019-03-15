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
 * Copyright (C) 2019  Tyler Bailey
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
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

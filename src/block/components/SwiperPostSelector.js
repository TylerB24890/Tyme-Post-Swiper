/**
 * Swiper Settings
 * Autosuggest input form for picking posts to cycle through
 *
 * Provides an input field for users to search for posts and select them
 * to cycle through the Post Swiper carousel.
 *
 * @type 	{Object}
 * @author	Tyler Bailey <tylerb.media@gmail.com>
 * @package tyme-post-swiper
 */

// WP Components
const { Component, Fragment } = wp.element;
const { decodeEntities } = wp.htmlEntities;
const { UP, DOWN, ENTER } = wp.keycodes;
const { Spinner, Popover, IconButton } = wp.components;
const { withInstanceId } = wp.compose;
const { apiFetch } = wp;
const { addQueryArgs } = wp.url;
const { __ } = wp.i18n;

// Stop script from executing
const stopExecution = ( event ) => {
	event.stopPropagation();
	event.stopPropagation();
};

// Wait to execute function
function debounce( func, wait = 100 ) {
	let timeout;
	return function( ...args ) {
		clearTimeout( timeout );
		timeout = setTimeout( () => {
			func.apply( this, args );
		}, wait );
	};
}

class SwiperPostSelector extends Component {
	constructor() {
		super( ...arguments );
		this.onChange = this.onChange.bind( this );
		this.onKeyDown = this.onKeyDown.bind( this );
		this.bindListNode = this.bindListNode.bind( this );
		this.updateSuggestions = debounce( this.updateSuggestions.bind( this ), 200 );
		this.limit = this.props.limit ? parseInt( this.props.limit ) : false;

		this.suggestionNodes = [];

		this.state = {
			posts: [],
			showSuggestions: false,
			selectedSuggestion: null,
			input: '',
		};
	}

	/**
	 * Remove post suggestions list
	 */
	componentWillUnmount() {
		delete this.suggestionsRequest;
	}

	/**
	 * Bind the Suggestion List object
	 * @param {object} ref The complete suggestion list
	 */
	bindListNode( ref ) {
		this.listNode = ref;
	}

	/**
	 * Bind a single post suggestion to suggested nodes.
	 * @param {string} index Bind single post suggestion
	 * @returns {array} Updated array of suggested posts
	 */
	bindSuggestionNode( index ) {
		return ref => {
			this.suggestionNodes[ index ] = ref;
		};
	}

	/**
	 * Update the suggested post list based on user input
	 * @param {string} value User input value
	 */
	updateSuggestions( value ) {
		const reUrl = /^https?:/;
		const searchPath = '/wp/v2/search';

		if ( value.length < 2 || reUrl.test( value ) ) {
			this.setState( {
				showSuggestions: false,
				selectedSuggestion: null,
				loading: false,
			} );

			return;
		}

		this.setState( {
			showSuggestions: true,
			selectedSuggestion: null,
			loading: true,
		} );

		const searchRequest = apiFetch( {
			path: addQueryArgs( searchPath, {
				search: value,
				per_page: 20,
				type: 'post',
				subtype: this.props.postType ? this.props.postType : undefined,
			} ),
		} );

		searchRequest
			.then( posts => {
				if ( this.suggestionsRequest !== searchRequest ) {
					return;
				}

				this.setState( {
					posts,
					loading: false,
				} );
			} )
			.catch( () => {
				if ( this.suggestionsRequest === searchRequest ) {
					this.setState( {
						loading: false,
					} );
				}
			} );

		this.suggestionsRequest = searchRequest;
	}

	/**
	 * Execute the onChange event for PostSelector input
	 * @param {event} event The event that occurred
	 */
	onChange( event ) {
		const inputValue = event.target.value;
		this.setState( { input: inputValue } );
		this.updateSuggestions( inputValue );
	}

	/**
	 * Listen for UP, DOWN, ENTER keyboard events and execute actions accordingly
	 * @param {event} event Keyboard key event
	 */
	onKeyDown( event ) {
		const { showSuggestions, selectedSuggestion, posts, loading } = this.state;

		if ( ! showSuggestions || ! posts.length || loading ) {
			return;
		}

		switch ( event.keyCode ) {
			case UP: {
				stopExecution( event );
				const previousIndex = ! selectedSuggestion ?
					posts.length - 1 :
					selectedSuggestion - 1;
				this.setState( {
					selectedSuggestion: previousIndex,
				} );
				break;
			}
			case DOWN: {
				stopExecution( event );
				const nextIndex =
					selectedSuggestion === null || selectedSuggestion === posts.length - 1 ?
						0 :
						selectedSuggestion + 1;
				this.setState( {
					selectedSuggestion: nextIndex,
				} );
				break;
			}
			case ENTER: {
				if ( this.state.selectedSuggestion !== null ) {
					stopExecution( event );
					const post = this.state.posts[ this.state.selectedSuggestion ];
					this.selectPost( post );
				}
			}
		}
	}

	/**
	 * Select a suggested post from the suggestion list and retrieve all post data
	 * @param {object} post The WP Post Object
	 */
	selectPost( post ) {
		if ( this.props.data ) {
			let doRequest = false;
			const returnData = {};
			for ( const prop of this.props.data ) {
				if ( ! post.hasOwnProperty( prop ) ) {
					doRequest = true;
					return;
				}
				returnData[ prop ] = post[ prop ];
			}

			if ( ! doRequest ) {
				this.props.onPostSelect( returnData );
				this.setState( {
					input: '',
					selectedSuggestion: null,
					showSuggestions: false,
				} );
				return;
			}
		}
		apiFetch( {
			path: `/wp/v2/${ post.subtype }s/${ post.id }?_embed`,
		} ).then( response => {
			const fullpost = {
				title: decodeEntities( response.title.rendered ),
				id: response.id,
				excerpt: decodeEntities( response.excerpt.rendered ),
				url: response.link,
				date: response.human_date,
				image: response._embedded[ 'wp:featuredmedia' ][ '0' ].source_url,
			};

			this.props.onPostSelect( fullpost );
		} );

		this.setState( {
			input: '',
			selectedSuggestion: null,
			showSuggestions: false,
		} );
	}

	/**
	 * Render the selected posts list below the Post Selector input
	 * @returns {html} HTML markup for selected post list
	 */
	renderPosts() {
		return (
			<ul>
				{ this.props.posts.map( ( post, i ) => (
					<li
						style={ {
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'baseline',
							flexWrap: 'nowrap',
						} }
						key={ post.id }
					>
						<span style={ { maxWidth: '60%' } }>{ post.title }</span>
						<span>
							{ i !== 0 ? (
								<IconButton
									style={ {
										display: 'inline-flex',
										padding: '8px 2px',
										textAlign: 'center',
									} }
									icon="arrow-up-alt2"
									onClick={ () => {
										this.props.posts.splice( i - 1, 0, this.props.posts.splice( i, 1 )[ 0 ] );
										this.props.onChange( this.props.posts );
										this.setState( { state: this.state } );
									} }
								/>
							) : null }

							{ i !== this.props.posts.length - 1 ? (
								<IconButton
									style={ {
										display: 'inline-flex',
										padding: '8px 2px',
										textAlign: 'center',
									} }
									icon="arrow-down-alt2"
									onClick={ () => {
										this.props.posts.splice( i + 1, 0, this.props.posts.splice( i, 1 )[ 0 ] );
										this.props.onChange( this.props.posts );
										this.setState( { state: this.state } );
									} }
								/>
							) : null }

							<IconButton
								style={ { display: 'inline-flex', textAlign: 'center' } }
								icon="no"
								onClick={ () => {
									this.props.posts.splice( i, 1 );
									this.props.onChange( this.props.posts );
									this.setState( { state: this.state } );
								} }
							/>
						</span>
					</li>
				) ) }
			</ul>
		);
	}

	/**
	 * Actually render out the post selector input AND selected posts
	 * @return {html} HTML markup for the component editor
	 */
	render() {
		const { autoFocus = true, instanceId } = this.props;
		const {
			showSuggestions,
			posts,
			selectedSuggestion,
			loading,
			input,
		} = this.state;

		/* eslint-disable jsx-a11y/no-autofocus */
		return (
			<Fragment>
				<div className="editor-url-input">
					<input
						autoFocus={ autoFocus }
						type="text"
						aria-label={ 'URL' }
						required
						value={ input }
						onChange={ this.onChange }
						onInput={ stopExecution }
						placeholder={ __( 'Type page or post name' ) }
						onKeyDown={ this.onKeyDown }
						role="combobox"
						aria-expanded={ showSuggestions }
						aria-autocomplete="list"
						aria-owns={ `editor-url-input-suggestions-${ instanceId }` }
						aria-activedescendant={
							selectedSuggestion !== null ?
								`editor-url-input-suggestion-${ instanceId }-${ selectedSuggestion }` :
								undefined
						}
						style={ { width: '100%' } }
					/>

					{ loading && <Spinner /> }

					{ showSuggestions && !! posts.length && (
						<Popover position="bottom" focusOnMount={ false }>
							<div
								className="editor-url-input__suggestions tyme-suggestions"
								id={ `editor-url-input-suggestions-${ instanceId }` }
								ref={ this.bindListNode }
								role="listbox"
							>
								{ posts.map( ( post, index ) => (
									<button
										key={ post.id }
										role="option"
										tabIndex="-1"
										id={ `editor-url-input-suggestion-${ instanceId }-${ index }` }
										ref={ this.bindSuggestionNode( index ) }
										className={ `editor-url-input__suggestion ${
											index === selectedSuggestion ? 'is-selected' : ''
										}` }
										onClick={ () => this.selectPost( post ) }
										aria-selected={ index === selectedSuggestion }
									>
										{ decodeEntities( post.title ) || __( '(no title)' ) }
									</button>
								) ) }
							</div>
						</Popover>
					) }
				</div>

				{ this.renderPosts() }
			</Fragment>
		);
		/* eslint-enable jsx-a11y/no-autofocus */
	}
}

export default withInstanceId( SwiperPostSelector );

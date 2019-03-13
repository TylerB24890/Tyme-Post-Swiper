/**
 * Swiper Settings
 * Autosuggest input form for picking posts to cycle through
 *
 * Provides an input field for users to search for posts and select them
 * to cycle through the Post Swiper carousel.
 *
 * @type 		{Object}
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
const stopEventPropagation = event => event.stopPropagation();

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

	// Remove Suggestions
	componentWillUnmount() {
		delete this.suggestionsRequest;
	}

	bindListNode( ref ) {
		this.listNode = ref;
	}

	bindSuggestionNode( index ) {
		return ref => {
			this.suggestionNodes[ index ] = ref;
		};
	}

	// Update Suggestions List
	updateSuggestions( value ) {
		if ( value.length < 2 || /^https?:/.test( value ) ) {
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

		const request = apiFetch( {
			path: addQueryArgs( '/wp/v2/search', {
				search: value,
				per_page: 20,
				type: 'post',
				subtype: this.props.postType ? this.props.postType : undefined,
			} ),
		} );

		request
			.then( posts => {
				if ( this.suggestionsRequest !== request ) {
					return;
				}

				this.setState( {
					posts,
					loading: false,
				} );
			} )
			.catch( () => {
				if ( this.suggestionsRequest === request ) {
					this.setState( {
						loading: false,
					} );
				}
			} );

		this.suggestionsRequest = request;
	}

	onChange( event ) {
		const inputValue = event.target.value;
		this.setState( { input: inputValue } );
		this.updateSuggestions( inputValue );
	}

	// Listen for key events (up, down, enter)
	onKeyDown( event ) {
		const { showSuggestions, selectedSuggestion, posts, loading } = this.state;

		if ( ! showSuggestions || ! posts.length || loading ) {
			return;
		}

		switch ( event.keyCode ) {
			case UP: {
				event.stopPropagation();
				event.preventDefault();
				const previousIndex = ! selectedSuggestion ?
					posts.length - 1 :
					selectedSuggestion - 1;
				this.setState( {
					selectedSuggestion: previousIndex,
				} );
				break;
			}
			case DOWN: {
				event.stopPropagation();
				event.preventDefault();
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
					event.stopPropagation();
					const post = this.state.posts[ this.state.selectedSuggestion ];
					this.selectPost( post );
				}
			}
		}
	}

	// Retreive the post data upon selection
	selectPost( post ) {
		if ( this.props.data ) {
			let reachOutToApi = false;
			const returnData = {};
			for ( const prop of this.props.data ) {
				if ( ! post.hasOwnProperty( prop ) ) {
					reachOutToApi = true;
					return;
				}
				returnData[ prop ] = post[ prop ];
			}

			if ( ! reachOutToApi ) {
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
			path: `/wp/v2/${ post.subtype }s/${ post.id }`,
		} ).then( response => {
			const fullpost = {
				title: decodeEntities( response.title.rendered ),
				id: response.id,
				excerpt: decodeEntities( response.excerpt.rendered ),
				url: response.link,
				date: response.human_date,
			};
			this.props.onPostSelect( fullpost );
		} );

		this.setState( {
			input: '',
			selectedSuggestion: null,
			showSuggestions: false,
		} );
	}

	// Suggested posts markup
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
										this.props.posts.splice(
											i - 1,
											0,
											this.props.posts.splice( i, 1 )[ 0 ]
										);
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
										this.props.posts.splice(
											i + 1,
											0,
											this.props.posts.splice( i, 1 )[ 0 ]
										);
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

	// Display the input + suggested posts
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
						onInput={ stopEventPropagation }
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
				</div>
				{ showSuggestions && !! posts.length && (
					<Popover position="bottom" noArrow focusOnMount={ false }>
						<div
							className="editor-url-input__suggestions"
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
									{ decodeEntities( post.title ) || '(no title)' }
								</button>
							) ) }
						</div>
					</Popover>
				) }

				{ this.renderPosts() }
			</Fragment>
		);
		/* eslint-enable jsx-a11y/no-autofocus */
	}
}

export default withInstanceId( SwiperPostSelector );

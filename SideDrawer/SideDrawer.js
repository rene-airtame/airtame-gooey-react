import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * SideDrawer component. Creates a Drawer that can be opened from the side
 *
 * @export
 * @class SideDrawer
 * @extends {Component}
 */
export default class SideDrawer extends Component {
  /**
   * Definition of props expected by the SideDrawer component
   * @type {Object}
   */
  static propTypes = {
    /**
     * Function to trigger when clicking on the overlay
     * @type {Function}
     */
    onOverlayClick: PropTypes.func.isRequired,
    /**
     * Flag indicating if the window should be open or not
     * @type {Boolean}
     */
    isOpen: PropTypes.bool.isRequired,
    /**
     * Optional class names to append to the parent container
     * @type {string|Array}
     */
    className: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  };

  static defaultProps = {
    isOpen: false,
    onOverlayClick: null,
  };

  // We keep the reference of the overlay so we can evaluate user click (onMouseUp and onMouseDown)
  // In the case of user clicking inside the SideDrawer and releasing it outside (in overlay), this
  // resulted in closing the SideDrawer and losing its state
  // If the button is pressed on one element and the pointer is moved outside the element before
  // the button is released, the event is fired on the most specific ancestor element that
  // contained both elements.
  // https://developer.mozilla.org/en-US/docs/Web/API/Element/click_event
  overlayRef = null;
  state = {
    wasMouseDownOnOverlay: false,
  };

  /**
   * Lifecycle method
   * @param {Object} prevProps provided
   */
  componentDidUpdate(prevProps) {
    if (prevProps.isOpen && !this.props.isOpen) {
      this.setState({ wasMouseDownOnOverlay: false });
    }
  }

  /**
   * onMouseDownHandler
   * @param {Event} e onmousedown
   */
  onMouseDownHandler = e => {
    this.setState({ wasMouseDownOnOverlay: e.target === this.overlayRef });
  };

  // If both click and release happen on the overlay, close it and reset state
  /**
   * onMouseUpHandler
   * @param {Event} e onmouseup
   */
  onMouseUpHandler = e => {
    if (e.target === this.overlayRef && this.state.wasMouseDownOnOverlay) {
      this.props.onOverlayClick();
    }
    this.setState({ wasMouseDownOnOverlay: false });
  };

  getSideDrawerStyles = () => {
    const openStyles = {
      transform: 'scale(1, 1)',
    };

    const closedStyles = {
      transform: 'scale(0, 1)',
    };

    return this.props.isOpen ? openStyles : closedStyles;
  };

  getContentStyles = () => {
    const openStyles = {
      opacity: 1,
    };

    const closedStyles = {
      opacity: 0,
    };

    return this.props.isOpen ? openStyles : closedStyles;
  };

  /**
   * Builds the component's markup
   * @return {JSX} The markup to be rendered
   */
  render() {
    const { isOpen } = this.props;

    const sideDrawerClassNames = classNames(
      'gooey-side-drawer',
      { 'gooey-side-drawer--open': isOpen },
      this.props.className
    );

    const sideDrawerStyles = Object.assign(
      {
        position: 'fixed',
        top: 0,
        zIndex: 101,
        width: '100%',
        height: '100vh',
      },
      this.getSideDrawerStyles()
    );

    const wrapperStyles = Object.assign(
      {
        position: 'fixed',
        top: 0,
        zIndex: 5,
        height: '100vh',
      },
      this.getSideDrawerStyles()
    );

    const contentStyles = this.getContentStyles();

    return (
      <div
        ref={el => (this.overlayRef = el)}
        className={sideDrawerClassNames}
        onMouseDown={this.onMouseDownHandler}
        onMouseUp={this.onMouseUpHandler}
        style={sideDrawerStyles}
      >
        <div
          className="gooey-side-drawer__wrapper"
          onClick={e => e.stopPropagation()}
          style={wrapperStyles}
        >
          <div className="gooey-side-drawer__content" style={contentStyles}>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

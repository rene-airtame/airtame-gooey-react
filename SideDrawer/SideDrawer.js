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
    const { isOpen, onOverlayClick } = this.props;

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
      <div className={sideDrawerClassNames} onClick={onOverlayClick} style={sideDrawerStyles}>
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

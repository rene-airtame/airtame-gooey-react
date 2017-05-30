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
  static PropTypes = {
    /**
     * Function to trigger when clicking the close button
     * @type {Function}
     */
    onClose: PropTypes.func.isRequired,
    /**
     * Flag indicating if the window should be open or not
     * @type {Boolean}
     */
    isOpen: PropTypes.bool.isRequired,
    /**
     * Optional class names to append to the parent container
     * @type {string|Array}
     */
    className: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.string,
    ]),
  };


  /**
   * Builds the component's markup
   * @return {JSX} The markup to be rendered
   */
  render() {
    const sideDrawerClassNames = classNames(
      'gooey-side-drawer',
      {'gooey-side-drawer--open': this.props.isOpen},
      this.props.className
    );

    return (
      <div className={sideDrawerClassNames} onClick={this.props.onClose}>
        <div className="gooey-side-drawer__wrapper" onClick={e => e.stopPropagation()}>
          <div className="gooey-side-drawer__content">
            <button
              onClick={this.props.onClose}
              className="gooey-side-drawer__close"
            >
              Close
            </button>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}


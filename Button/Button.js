import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * Button component. Renders a button and handles its behavior.
 * @param  {Object}   [props] - Component props
 * @param  {boolean}  [props.isDisabled]  - Is the button disabled
 * @param  {boolean}  [props.isSpinning] - Is the button displaying a spinning icon
 * @param {Function} [props.onClick]     - Function to call when the button is clicked
 * @return {JSX}     The markup to be rendered
 */
export default class Button extends Component {
  /**
   * List of possible props
   * @type {Object}
   */
  static propTypes = {
    /**
     * Flag indicating if the button is in a disabled state
     * @type {boolean}
     */
    isDisabled: PropTypes.bool,
    /**
     * Flag indicating if the button should display a spinning icon
     * @type {boolean}
     */
    isSpinning: PropTypes.bool,
    /**
     * Class name for the component
     * @type {string | Array}
     */
    className: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  };

  /**
   * Default prop values
   */
  static defaultProps = {
    isDisabled: false,
    isSpinning: false,
  };

  /**
   * Builds the className attribute for the button
   * @return {String} The classNames to be used in the button
   */
  getButtonClassNames = () => {
    const { className, isDisabled, isSpinning } = this.props;

    return classNames(
      'gooey-button',
      {
        'gooey-button--disabled': isDisabled,
        'gooey-button--spinning': isSpinning,
      },
      className
    );
  };

  /**
   * Sanitizes the component props by removing all custom props so the rest can be assigned to the
   * button element
   *
   * @return {Object} - The sanitized props
   */
  getProps = () => {
    const props = Object.assign({}, this.props);

    delete props.className;
    delete props.isDisabled;
    delete props.isSpinning;

    return props;
  };

  /**
   * The rendes method
   * @return {JSX} The component's markup
   */
  render() {
    const { isDisabled } = this.props;

    const buttonClassNames = this.getButtonClassNames();
    const extraProps = this.getProps();

    return (
      <button className={buttonClassNames} disabled={isDisabled} {...extraProps}>
        {this.props.children}
      </button>
    );
  }
}

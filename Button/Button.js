import React, {Component} from 'react';
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
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
    ]),
  };

  static defaultProps = {
    isDisabled: false,
    isSpinning: false,
  }

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
  }

  /**
   * The rendes method
   * @return {JSX} The component's markup
   */
  render() {
    const {isDisabled, onClick} = this.props;

    const buttonClassNames = this.getButtonClassNames();

    return (
      <button
        className={buttonClassNames}
        disabled={isDisabled}
        onClick={onClick}
      >
        {this.props.children}
      </button>
    );
  }
}

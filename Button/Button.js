import React from 'react';
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
export default function Button(props) {
  const {isDisabled, isSpinning, className, onClick} = props;

  const buttonClassNames = classNames(
    'gooey-button',
    {
      'gooey-button--disabled': isDisabled,
      'gooey-button--spinning': isSpinning,
    },
    className
  );

  return (
    <button
      className={buttonClassNames}
      disabled={isDisabled}
      onClick={onClick}
    >
      {props.children}
    </button>
  );
}

/**
 * List of possible props
 * @type {Object}
 */
Button.propTypes = {
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

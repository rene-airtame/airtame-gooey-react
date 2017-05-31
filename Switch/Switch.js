import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Checkbox from '../Checkbox';

/**
 * Switch component. Composes the Checkbox component adding it's own classes to the wrapper
 *
 * @export
 * @param {Object} [props] - Id for the input to link with the label
 * @returns {JSX} The component's markup
 */
export default function Switch(props) {
  const switchClassNames = classNames(
    'gooey-switch',
    {
      'gooey-switch--disabled': props.isDisabled,
      'gooey-switch--on': props.isOn,
    },
    props.className);
  return (
    <Checkbox
      id={props.id}
      label={props.label}
      value={props.value}
      className={switchClassNames}
      name={props.name}
      isChecked={props.isOn}
      isDisabled={props.isDisabled}
      onChange={props.onChange}
      inputRef={props.inputRef}
    />
  );
}

Switch.propTypes = {
  /**
   * Id for the input to link with the label
   * @type {string}
   */
  id: PropTypes.string.isRequired,
  /**
   * The switch's content title.
   * When used with airtame-gooey, this won't be visible, but it's required by the Checkbox
   * component and it's good for accessibility purposes
   * @type {string}
   */
  label: PropTypes.string.isRequired,
  /**
   * The name for the input field group
   * @type {string}
   */
  name: PropTypes.string,
  /**
   * The value for the individual switch
   * @type {string}
   */
  value: PropTypes.string.isRequired,
  /**
   * Flag indicating if the switch is on by default
   * @type {boolean}
   */
  isOn: PropTypes.bool,
  /**
   * Flag indicating if the switch should be disabled
   * @type {boolean}
   */
  isDisabled: PropTypes.bool,
  /**
   * Callback function to be triggered when the user toggles the switch
   * @type {function}
   */
  onChange: PropTypes.func,
  /**
   * ref for the input element
   * @type {function | string}
   */
  inputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
  ]),
  /**
   * Class name for the component
   * @type {string | Array}
   */
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
};

Switch.defaultProps = {
  isOn: false,
  isDisabled: false,
  onChange: null,
};

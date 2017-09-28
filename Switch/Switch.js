import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Checkbox from '../Checkbox';

/**
 * Switch component. Composes the Checkbox component adding it's own classes to the wrapper
 *
 * @export
 */
export default class Switch extends Component {
  /**
   * List of possible props
   * @type {Object}
   */
  static propTypes = {
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
    inputRef: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
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
    isOn: false,
    isDisabled: false,
    onChange: null,
  };

  /**
   * Sanitizes the component props by removing all custom props so the rest can be assigned to the
   * input element
   *
   * @return {Object} - The sanitized props
   */
  getProps = () => {
    const props = Object.assign({}, this.props);

    delete props.className;
    delete props.isOn;

    return props;
  };

  /**
   * Builds the component's markup
   * @return {JSX}  The markup to be rendered
   */
  render() {
    const { isDisabled, isOn, className } = this.props;

    const switchClassNames = classNames(
      'gooey-switch',
      {
        'gooey-switch--disabled': isDisabled,
        'gooey-switch--on': isOn,
      },
      className
    );

    const props = this.getProps();

    return <Checkbox className={switchClassNames} isChecked={isOn} {...props} />;
  }
}

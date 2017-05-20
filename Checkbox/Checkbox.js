import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * Checkbox component
 *
 * @export
 * @class Checkbox
 * @extends {Component}
 */
export default class Checkbox extends Component {

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
     * The checkbox's content title
     * @type {string}
     */
    label: PropTypes.string.isRequired,
    /**
     * The name for the input field group
     * @type {string}
     */
    name: PropTypes.string,
    /**
     * The value for the individual checkbox
     * @type {string}
     */
    value: PropTypes.string.isRequired,
    /**
     * Flag indicating if the checkbox is checked by default
     * @type {boolean}
     */
    isChecked: PropTypes.bool,
    /**
     * Flag indicating if the checkbox should be disabled
     * @type {boolean}
     */
    isDisabled: PropTypes.bool,
    /**
     * Callback function to be triggered when the user toggles the checkbox
     * @type {function}
     */
    onChange: PropTypes.func,
    /**
     * Class name for the component
     * @type {string | Array}
     */
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
    ]),
  };

  /**
   * Default prop values
   */
  static defaultProps = {
    isChecked: false,
    isDisabled: false,
    onChange: null,
  };

  /**
   * Component's initial state
   */
  state = {
    checked: this.props.isChecked || false,
  }

  /**
   * Handles the checked state change for the checkbox
   * @param {Event} evt The triggered event on the checkbox
   */
  toggleChecked = evt => {
    this.setState({
      checked: !this.state.checked,
    }, () => {
      if (this.props.onChange) {
        this.props.onChange(evt);
      }
    });
  }

  /**
   * Builds the component's markup
   * @return {JSX}  The markup to be rendered
   */
  render() {
    const { id, label, isDisabled, name, value } = this.props;
    const checkboxClassNames = classNames(
      'gooey-checkbox',
      {
        'gooey-checkbox--checked': this.state.checked,
        'gooey-checkbox--disabled': this.props.isDisabled,
      },
      this.props.className
    );

    return (
      <div className={checkboxClassNames}>
        <input
          id={id}
          className="gooey-checkbox__input"
          type="checkbox"
          checked={this.state.checked}
          disabled={isDisabled}
          name={name || null}
          value={value}
          onChange={evt => {
            this.toggleChecked(evt);
          }}
        />
        <label
          htmlFor={id}
          className="gooey-checkbox__label"
        >
          {label}
        </label>
      </div>
    );
  }
}

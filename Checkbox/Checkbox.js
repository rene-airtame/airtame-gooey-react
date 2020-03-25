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
    label: PropTypes.string,
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
    isChecked: false,
    isDisabled: false,
    onChange: null,
    inputRef: null,
    name: null,
  };

  /**
   * Component's initial state
   */
  state = {
    checked: this.props.isChecked,
  };

  /**
   * Updates state variables that are initialized based on props if the props change at some point
   * @param {Object} nextProps - The upcoming props
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.isChecked !== nextProps.isChecked) {
      this.setState({
        checked: nextProps.isChecked,
      });
    }
  }

  /**
   * Handles the checked state change for the checkbox
   * @param {Event} evt The triggered event on the checkbox
   */
  toggleChecked = evt => {
    evt.persist();
    this.setState(
      {
        checked: !this.state.checked,
      },
      () => {
        if (this.props.onChange) {
          this.props.onChange(evt);
        }
      }
    );
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
    delete props.type;
    delete props.isChecked;
    delete props.isDisabled;
    delete props.inputRef;
    delete props.onChange;
    delete props.children;

    return props;
  };

  /**
   * Builds the component's markup
   * @return {JSX}  The markup to be rendered
   */
  render() {
    const { id, label, isDisabled, inputRef, children } = this.props;
    const checkboxClassNames = classNames(
      'gooey-checkbox',
      {
        'gooey-checkbox--checked': this.state.checked,
        'gooey-checkbox--disabled': this.props.isDisabled,
      },
      this.props.className
    );

    const props = this.getProps();

    // Either a label has to be set or children provided
    if (!label && !children) {
      throw new Error('Neither children or label provided to Checkbox');
    }

    let content = children;

    if (label) {
      content = (
        <label htmlFor={id} className="gooey-checkbox__label">
          {label}
        </label>
      );
    }

    return (
      <div className={checkboxClassNames}>
        <input
          className="gooey-checkbox__input"
          type="checkbox"
          checked={this.state.checked}
          disabled={isDisabled}
          ref={inputRef}
          onChange={evt => {
            this.toggleChecked(evt);
          }}
          {...props}
        />
        {content}
      </div>
    );
  }
}

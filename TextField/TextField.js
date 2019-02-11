import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * TextField component. Renders an input field of type text or password and handles its behavior
 *
 * @export
 * @class TextField
 * @extends {Component}
 */
export default class TextField extends Component {
  /**
   * List of possible props
   * @type {Object}
   */
  static propTypes = {
    /**
     * Optional initial value for the field
     * @type {string}
     */
    value: PropTypes.string,
    /**
     * The type of input to display. It can be set to `text` or `password`
     *@type {string}
     */
    type: PropTypes.string,
    /**
     * Optional placeholder for the input field
     * @type {string}
     */
    placeholder: PropTypes.string,
    /**
     * Optional max number of characters to be contained in a TextField
     */
    maxContentLength: PropTypes.number,
    /**
     * Flag indicating if the field is in a disabled state
     *@type {boolean}
     */
    isDisabled: PropTypes.bool,
    /**
     * Flag indicating if the fiels is in an error state
     *@type {boolean}
     */
    isError: PropTypes.bool,
    /**
     * Flag indicating if the field is read-only
     *@type {boolean}
     */
    isReadOnly: PropTypes.bool,
    /**
     * The text to display when a validation error happens
     *@type {string}
     */
    errorMessage: PropTypes.string,
    /**
     * Flag to remove the toggle password button for password type fields
     * @type {boolean}
     */
    disablePasswordToggle: PropTypes.bool,
    /**
     * Optional onChange callback
     * @type {Function}
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
    /**
     * The id for the field. This should only be used if the field will be associated with a label
     * @type {string}
     */
    id: PropTypes.string,
  };

  /**
   * Default prop values
   */
  static defaultProps = {
    isDisabled: false,
    isError: false,
    isReadOnly: false,
    maxContentLength: 0,
    errorMessage: '',
    placeholder: null,
    type: 'text',
    disablePasswordToggle: false,
    onChange: null,
    inputRef: null,
    value: '',
  };

  /**
   * Error message for maxContentLength exceeded
   */
  maxLengthError = this.props.maxContentLength
    ? `Value can not be longer than ${this.props.maxContentLength} characters.`
    : '';

  /**
   * Component's initial state
   */
  state = {
    isPasswordShown: false,
    textFieldValue: this.props.value,
    isMaxLengthExceeded: false,
  };

  /**
   * Updates state variables that are initialized based on props if the props change at some point
   * @param {Object} nextProps - The upcoming props
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      this.setState({
        textFieldValue: nextProps.value,
      });
    }
  }

  /**
   * Takes care of updating the value of the input field when the user types in it
   *
   * @param {Event} [e] - The event triggered when the user types
   */
  handleInputValue = e => {
    e.persist();
    this.setState(
      {
        textFieldValue: e.target.value,
        isMaxLengthExceeded: false,
      },
      () => {
        this.attemptOnChangeCallback(e);
      }
    );
  };

  /**
   * Attempts to trigger the onChange callback function
   *
   * @param {Event} [e] - The triggered event
   */
  attemptOnChangeCallback = e => {
    const { maxContentLength } = this.props;
    if (maxContentLength && this.state.textFieldValue.length > maxContentLength) {
      this.setState(
        {
          isMaxLengthExceeded: true,
        },
        () => {
          if (this.props.onChange) {
            this.props.onChange(e, new Error(this.maxLengthError));
          }
        }
      );
    } else {
      if (this.props.onChange) {
        this.props.onChange(e);
      }
    }
  };

  /**
   * Updates the state to show/hide the password
   */
  handlePasswordVisibility = () => {
    this.setState({
      isPasswordShown: !this.state.isPasswordShown,
    });
  };

  /**
   * Provides the string to be used by the component to set the type of input field
   *
   * @return {string} The type of input
   */
  getType = () => {
    if (this.props.type === 'password') {
      return this.state.isPasswordShown ? 'text' : 'password';
    }
    return this.props.type;
  };

  /**
   * Sanitizes the component props by removing all custom props so the rest can be assigned to the
   * input element
   *
   * @return {Object} - The sanitized props
   */
  getProps = () => {
    const props = Object.assign({}, this.props);

    delete props.value;
    delete props.type;
    delete props.className;
    delete props.inputType;
    delete props.onChange;
    delete props.isDisabled;
    delete props.isReadOnly;
    delete props.isError;
    delete props.maxContentLength;
    delete props.errorMessage;
    delete props.disablePasswordToggle;
    delete props.inputRef;

    return props;
  };

  /**
   * The render method.
   * Builds the markup to be rendered by the component
   *
   * @return {JSX} The markup to be rendered
   */
  render() {
    const {
      isDisabled,
      isError,
      isReadOnly,
      type,
      className,
      errorMessage,
      disablePasswordToggle,
      inputRef,
    } = this.props;
    const isPassword = type === 'password';
    const textFieldClassNames = classNames(
      'gooey-text-field',
      {
        'gooey-text-field--disabled': isDisabled,
        'gooey-text-field--error': isError || this.state.isMaxLengthExceeded,
        'gooey-text-field--readonly': isReadOnly,
        'gooey-text-field--password': isPassword,
      },
      className
    );

    const showPasswordButtonClassnames = !isPassword
      ? []
      : classNames('gooey-text-field__show-password', {
          'gooey-text-field__show-password--hide': this.state.isPasswordShown,
        });

    const inputType = this.getType();

    const props = this.getProps();

    const toggleText = this.state.isPasswordShown ? 'Hide password' : 'Show password';

    return (
      <div className={textFieldClassNames}>
        <input
          className="gooey-text-field__input"
          type={inputType}
          value={this.state.textFieldValue}
          onChange={this.handleInputValue}
          disabled={isDisabled}
          readOnly={isReadOnly}
          ref={inputRef}
          {...props}
        />
        {isPassword && !disablePasswordToggle ? (
          <button
            className={showPasswordButtonClassnames}
            onClick={this.handlePasswordVisibility}
            title={toggleText}
            type="button"
          >
            {toggleText}
          </button>
        ) : null}
        {(isError && errorMessage.length) || this.state.isMaxLengthExceeded ? (
          <span className="gooey-text-field__error-message">
            {this.state.isMaxLengthExceeded ? this.maxLengthError : errorMessage}
          </span>
        ) : null}
      </div>
    );
  }
}

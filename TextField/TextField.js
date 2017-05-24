import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import warning from 'warning';

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
     * Class name for the component
     * @type {string | Array}
     */
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
    ]),
    /**
     * The id for the field. This should only be used if the field will be associated with a label
     * @type {string}
     */
    id: PropTypes.string,
  }

  /**
   * Default prop values
   */
  static defaultProps = {
    isDisabled: false,
    isError: false,
    isReadOnly: false,
    maxContentLength: 0,
    errorMessage: '',
    placeholder: '',
    type: 'text',
    disablePasswordToggle: false,
    onChange: null,
  };

  /**
   * Constat listing the valid values for the type prop
   */
  supportedTypes = [
    'text',
    'password',
  ];

  /**
   * Error message for maxContentLength exceeded
   */
  maxLengthError = this.props.maxContentLength ?
    `Value can not be longer than ${this.props.maxContentLength} characters.` : '';

  /**
   * Component's initial state
   */
  state = {
    isPasswordShown: false,
    textFieldValue: this.props.value || '',
    isMaxLengthExceeded: false,
  };

  /**
   * Lifecycle method.
   * Warns the user if an unsupported value is passed as the `type` prop
   */
  componentDidMount() {
    warning(
      this.supportedTypes.includes(this.props.type),
      'Only `text` and `password` are accepted as field types'
    );
  }

  /**
   * Takes care of updating the value of the input field when the user types in it
   *
   * @param {Event} [e] - The event triggered when the user types
   */
  handleInputValue = e => {
    e.persist();
    this.setState({
      textFieldValue: e.target.value,
      isMaxLengthExceeded: false,
    }, () => {
      const { maxContentLength } = this.props;
      if (maxContentLength && this.state.textFieldValue.length > maxContentLength) {
        this.setState({
          isMaxLengthExceeded: true,
        }, () => {
          if (this.props.onChange) {
            this.props.onChange(e);
          }
        });
      } else {
        if (this.props.onChange) {
          this.props.onChange(e);
        }
      }
    });
  }

  /**
   * Updates the state to show/hide the password
   */
  handlePasswordVisibility = () => {
    this.setState({
      isPasswordShown: !this.state.isPasswordShown,
    });
  }

  /**
   * Provides the string to be used by the component to set the type of input field
   *
   * @return {string} The type of input
   */
  getType = () => {
    if (this.props.type === 'text') {
      return 'text';
    }
    return this.state.isPasswordShown ? 'text' : 'password';
  }

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
      id,
      placeholder,
      disablePasswordToggle,
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

    const showPasswordButtonClassnames = !isPassword ? [] : classNames(
      'gooey-text-field__show-password',
      {
        'gooey-text-field__show-password--hide': this.state.isPasswordShown,
      }
    );

    const inputType = this.getType();

    const toggleText = this.state.isPasswordShown ? 'Hide password' : 'Show password';

    return (
      <div className={textFieldClassNames}>
        <input
          id={id}
          className="gooey-text-field__input"
          type={inputType}
          ref={textField => this.textField = textField}
          value={this.state.textFieldValue}
          onChange={this.handleInputValue}
          disabled={isDisabled}
          readOnly={isReadOnly}
          placeholder={placeholder.length ? placeholder : null}
        />
        {
          isPassword && !disablePasswordToggle
          ?
            <button
              className={showPasswordButtonClassnames}
              onClick={this.handlePasswordVisibility}
              title={toggleText}
            >
              {toggleText}
            </button>
          :
            null
        }
        {
        (isError && errorMessage.length || this.state.isMaxLengthExceeded)
          ?
            <span className="gooey-text-field__error-message">
              {
                this.state.isMaxLengthExceeded
                ?
                  this.maxLengthError
                :
                  errorMessage
              }
            </span>
          :
            null
        }
      </div>
    );
  }
}

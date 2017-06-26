import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * TextArea component. Renders a textarea element handles its behavior
 *
 * @export
 * @class TextArea
 * @extends {Component}
 */
export default class TextArea extends Component {
  /**
   * List of possible props
   * @type {Object}
   */
  static propTypes = {
    /**
     * Optional initial value for the textarea field
     * @type {string}
     */
    value: PropTypes.string,
    /**
     * Optional placeholder for the textarea field
     * @type {string}
     */
    placeholder: PropTypes.string,
    /**
     * Optional max number of characters to be contained in a TextArea
     */
    maxContentLength: PropTypes.number,
    /**
     * Flag indicating if the field is in a disabled state
     * @type {boolean}
     */
    isDisabled: PropTypes.bool,
    /**
     * Flag indicating if the field is in an error state
     * @type {boolean}
     */
    isError: PropTypes.bool,
    /**
     * Flag indicating if the field is read-only
     * @type {boolean}
     */
    isReadOnly: PropTypes.bool,
    /**
     * The text to display when a validation error happens
     * @type {string}
     */
    errorMessage: PropTypes.string,
    /**
     * Optional onChange callback, receives an object with the value and an error as parameters
     * @type {Function}
     */
    onChange: PropTypes.func,
    /**
     * ref for the textarea element
     * @type {function | string}
     */
    textAreaRef: PropTypes.oneOfType([
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
    placeholder: null,
    onChange: null,
    textAreaRef: null,
    value: '',
  };

  /**
   * Error message for maxContentLength exceeded
   */
  maxLengthError = this.props.maxContentLength ?
    `Value can not be longer than ${this.props.maxContentLength} characters.` : '';

  /**
   * Component's initial state
   */
  state = {
    textAreaValue: this.props.value,
    isMaxLengthExceeded: false,
  };

  /**
   * Updates state variables that are initialized based on props if the props change at some point
   * @param {Object} nextProps - The upcoming props
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      this.setState({
        textAreaValue: nextProps.value,
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
    this.setState({
      textAreaValue: e.target.value,
      isMaxLengthExceeded: false,
    }, () => {
      this.attemptOnChangeCallback(e);
    });
  }

  /**
   * Attempts to trigger the onChange callback function
   *
   * @param {Event} [e] - The triggered event
   */
  attemptOnChangeCallback = e => {
    const { maxContentLength } = this.props;
    if (maxContentLength && this.state.textAreaValue.length > maxContentLength) {
      this.setState({
        isMaxLengthExceeded: true,
      }, () => {
        if (this.props.onChange) {
          this.props.onChange(e, new Error(this.maxLengthError));
        }
      });
    } else {
      if (this.props.onChange) {
        this.props.onChange(e);
      }
    }
  }

  /**
   * Sanitizes the component props by removing all custom props so the rest can be assigned to the
   * input element
   *
   * @return {Object} - The sanitized props
   */
  getProps = () => {
    const props = Object.assign({}, this.props);

    delete props.value;
    delete props.className;
    delete props.inputType;
    delete props.onChange;
    delete props.isDisabled;
    delete props.isReadOnly;
    delete props.isError;
    delete props.maxContentLength;
    delete props.errorMessage;
    delete props.textAreaRef;

    return props;
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
      className,
      errorMessage,
      textAreaRef,
    } = this.props;

    const textAreaClassNames = classNames(
      'gooey-text-area',
      {
        'gooey-text-area--disabled': isDisabled,
        'gooey-text-area--error': isError || this.state.isMaxLengthExceeded,
        'gooey-text-area--readonly': isReadOnly,
      },
      className
    );

    const props = this.getProps();

    return (
      <div className={textAreaClassNames}>
        <textarea
          className="gooey-text-area__textarea"
          onChange={this.handleInputValue}
          disabled={isDisabled}
          readOnly={isReadOnly}
          value={this.state.textAreaValue}
          ref={textAreaRef}
          {...props}
        />
        {
        (isError && errorMessage.length || this.state.isMaxLengthExceeded)
          ?
            <span className="gooey-text-area__error-message">
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

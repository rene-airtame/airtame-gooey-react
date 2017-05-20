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
     *@type {boolean}
     */
    isDisabled: PropTypes.bool,
    /**
     * Flag indicating if the field is in an error state
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
    textAreaValue: this.props.value || '',
    isMaxLengthExceeded: false,
  };

  /**
   * Takes care of updating the value of the input field when the user types in it
   *
   * @param {Event} [e] - The event triggered when the user types
   */
  handleInputValue = e => {
    this.setState({
      textAreaValue: e.target.value,
      isMaxLengthExceeded: false,
    }, () => {
      const { maxContentLength } = this.props;
      if (maxContentLength && this.state.textAreaValue.length > maxContentLength) {
        this.setState({
          isMaxLengthExceeded: true,
        });
      }
    });
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
      id,
      placeholder,
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

    return (
      <div className={textAreaClassNames}>
        <textarea
          id={id}
          className="gooey-text-area__textarea"
          ref={textArea => this.textArea = textArea}
          onChange={this.handleInputValue}
          disabled={isDisabled}
          readOnly={isReadOnly}
          value={this.state.textAreaValue}
          placeholder={placeholder.length ? placeholder : null}
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

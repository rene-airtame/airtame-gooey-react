import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * Select component. Renders a select element handles its behavior
 *
 * @export
 * @class Select
 * @extends {Component}
 */
export default class Select extends Component {
    /**
   * List of possible props
   * @type {Object}
   */
  static propTypes = {
    /**
     * Select options
     * @type {array}
     */
    options: PropTypes.arrayOf(
      PropTypes.shape({
        /**
         * ID for the option
         * @type {string}
         */
        id: PropTypes.string.isRequired,
        /**
         * Optional text to be displayed as the option text instead of the value
         * @type {string}
         */
        label: PropTypes.string.isRequired,
        /**
         * The value for the select field
         * @type {string}
         */
        value: PropTypes.oneOfType([
          PropTypes.number,
          PropTypes.string,
        ]).isRequired,
        /**
         * Flag indicating if a the specific option is disabled
         */
        isDisabled: PropTypes.bool,
      })
    ).isRequired,
    /**
     * ID for the default selected option.
     * @type string
     */
    selected: PropTypes.string,
    /**
     * Flag indicating if the select is in a disabled state
     * @type {boolean}
     */
    isDisabled: PropTypes.bool,
    /**
     * Flag indicating if the select is in an error state
     *@type {boolean}
     */
    isError: PropTypes.bool,
    /**
     * Optional callback function to trigger after the select value changes
     */
    onChange: PropTypes.func,
    /**
     * ref for the select element
     * @type {function | string}
     */
    selectRef: PropTypes.oneOfType([
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
     * The id for the select. This should only be used if the field will be associated with a label
     * @type {string}
     */
    id: PropTypes.string,
  };

  static defaultProps = {
    selected: null,
    isDisabled: false,
    isError: false,
    id: null,
    onChange: null,
    selectRef: null,
  };

  /**
   * Class constructor
   * @param {Object} [props] - The component props
   */
  constructor(props) {
    super(props);
    this.state = {
      selected: this.getDefaultSelected(),
    };
  }

  /**
   * Finds the default option value for the select
   * @return {String|null} The id of the selected element or null
   */
  getDefaultSelected = () => {
    const { selected, options } = this.props;
    let selectedIndex = 0;

    options.some((o, i) => {
      if (o.id === selected) {
        selectedIndex = i;
        return true;
      }
    });

    return options[selectedIndex].value;
  }

  /**
   * Updates the state with the currently selected option
   * @param {Event} [evt] - The triggered event
   */
  updateSelected = evt => {
    evt.persist();
    this.setState({
      selected: evt.target.value,
    }, () => {
      if (this.props.onChange) {
        this.props.onChange(evt);
      }
    });
  }

  /**
   * The render method for the component
   * @return {JSX} The component's markup
   */
  render() {
    const {
      className,
      id,
      isDisabled,
      isError,
      options,
      selectRef,
    } = this.props;

    const componentClassNames = classNames(
      'gooey-select',
      {
        'gooey-select--disabled': isDisabled,
        'gooey-select--error': isError,
      },
      className
    );

    return (
      <div className={componentClassNames}>
        <select
          className="gooey-select__select"
          disabled={isDisabled}
          onChange={this.updateSelected}
          value={this.state.selected}
          id={id}
          ref={selectRef}
        >
          {
            options.map(option => (
              <option
                key={option.id}
                disabled={option.isDisabled || null}
                value={option.value}
                label={option.label}
                className="gooey-select__option"
              >
                {option.label}
              </option>
            ))
          }
        </select>
      </div>
    );
  }
}


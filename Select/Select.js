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

  /**
   * Default prop values
   */
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
      selected: this.getDefaultSelected(this.props.options, this.props.selected),
    };
  }

  /**
   * Updates state variables that are initialized based on props if the props change at some point
   * @param {Object} nextProps - The upcoming props
   */
  componentWillReceiveProps(nextProps) {
    const { selected, options } = this.props;
    if ((selected !== nextProps.selected) || (options !== nextProps.options)) {
      this.setState({
        selected: this.getDefaultSelected(nextProps.options, nextProps.selected),
      });
    }
  }

  /**
   * Finds the default option value for the select
   * @param {Array} options - Array of option objects
   * @param {string} selected - ID for the selected option
   *
   * @return {String|null} The id of the selected element or null
   */
  getDefaultSelected = (options, selected) => {
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
   * Sanitizes the component props by removing all custom props so the rest can be assigned to the
   * input element
   *
   * @return {Object} - The sanitized props
   */
  getProps = () => {
    const props = Object.assign({}, this.props);

    delete props.options;
    delete props.selected;
    delete props.isDisabled;
    delete props.isError;
    delete props.selectRef;
    delete props.id;
    delete props.onChange;

    return props;
  }

  /**
   * The render method for the component
   * @return {JSX} The component's markup
   */
  render() {
    const {
      className,
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

    const props = this.getProps();

    return (
      <div className={componentClassNames}>
        <select
          className="gooey-select__select"
          disabled={isDisabled}
          onChange={this.updateSelected}
          value={this.state.selected}
          ref={selectRef}
          {...props}
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


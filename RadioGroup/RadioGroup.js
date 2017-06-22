import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * RadioGroup component
 *
 * @export
 * @class RadioGroup
 * @extends {Component}
 */
export default class RadioGroup extends Component {

  /**
   * List of possible props
   * @type {Object}
   */
  static propTypes = {
    /**
     * id for the radio button group
     * @type {string}
     */
    id: PropTypes.string,
    /**
     * name attribute for the radio buttons in the group.
     * @type {string}
     */
    name: PropTypes.string.isRequired,
    /**
     * data array for the radion buttons in the format:
     * [{ id, label, value, isDisabled, ref }]
     * @type {Array}
     */
    data: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      isDisabled: PropTypes.bool,
      ref: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.string,
      ]),
      props: PropTypes.object,
    })).isRequired,
    /**
     * attibute indicating the checked radio button in the group.
     * its value will be equal to the id of the desired radio box object in the data array.
     * Defaults to first element in the data array
     * @type {string}
     */
    active: PropTypes.string,
    /**
     * Flag indicating if ALL elements in the radio group should be disabled. This overrides the
     * data[*].isDisabled value
     * @type {boolean}
     */
    isDisabled: PropTypes.bool,
    /**
     * Callback to be called when the state of any of the radio buttons in the group is changed
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
  };

   /**
   * Default prop values
   */
  static defaultProps = {
    isDisabled: false,
    onChange: null,
  };

  /**
   * Class Constructor
   * @param {Object} [props] - The component's props
   *
   */
  constructor(props) {
    super(props);

    this.state = {
      active: this.getDefaultActive(),
    };
  }

  /**
   * Gets the id for the default active radio
   * @return {String} The id of the active radio
   */
  getDefaultActive = () => {
    const { data, active } = this.props;
    let validActive = false;
    data.some(d => {
      if (d.id === active) {
        validActive = true;
        return true;
      }
    });

    return validActive ? active : data[0].id;
  }

  /**
   * Handles the checked state change for the radio
   * @param {Event}    [evt] - the DOM event
   * @param {String}   [id] - The id of the selected radio
   */
  handleChange = (evt, id) => {
    evt.persist();
    this.setState({
      active: id,
    }, () => {
      if (this.props.onChange) {
        this.props.onChange(evt, id);
      }
    });
  }

  /**
   * Builds the component's markup
   * @return {JSX}  The markup to be rendered
   */
  render() {
    const { id, name, data, isDisabled } = this.props;
    const radioGroupClassNames = classNames(
      'gooey-radio-group',
      {
        'gooey-radio-group--disabled': isDisabled,
      },
      this.props.className
    );

    return (
      <ul className={radioGroupClassNames} id={id}>
        {
          data.map((r, i) => {
            const inputClassNames = classNames(
              'gooey-radio-group__input',
              {
                'gooey-radio-group__input--disabled': isDisabled || r.isDisabled,
              }
            );
            return (
              <li key={r.id} className="gooey-radio-group__option">
                <input
                  className={inputClassNames}
                  type="radio"
                  name={name}
                  value={r.value}
                  id={r.id}
                  checked={this.state.active === r.id}
                  onChange={evt => this.handleChange(evt, r.id)}
                  disabled={isDisabled || r.isDisabled}
                  ref={r.ref || null}
                  {...r.props}
                />
                <label htmlFor={r.id} className="gooey-radio-group__label">
                  {r.label}
                </label>
              </li>
            );
          })
        }
      </ul>
    );
  }
}

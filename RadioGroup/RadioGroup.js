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
     * [{ id, label, value, isDisabled }]
     * @type {Array}
     */
    data: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      isDisabled: PropTypes.bool,
    })).isRequired,
    /**
     * attibute indicating the checked radio button in the group.
     * its value will be equal to the id of the desired radio box object in the data array
     * @type {string}
     */
    active: PropTypes.string.isRequired,
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
    onChange: null,
  };

  /**
   * Component's initial state
   */
  state = {
    active: this.props.active,
  };

  /**
   * Handles the checked state change for the radio
   * @param {Object}    [event] - the DOM event
   */
  handleChange = event => {
    this.setState({
      active: event.target.value,
    }, () => {
      if (this.props.onChange) {
        this.props.onChange(event);
      }
    });
  }

  /**
   * Builds the component's markup
   * @return {JSX}  The markup to be rendered
   */
  render() {
    const { id, name, data, active } = this.props;
    const radioGroupClassNames = classNames(
      'gooey-radio-group',
      this.props.className
    );

    return (
      <ul className={radioGroupClassNames} id={id}>
        {
          data
          ?
            data.map((r, i) =>
              <li key={r.id} className="gooey-radio-group__option">
                <input
                  className="gooey-radio-group__input"
                  type="radio"
                  name={name}
                  value={r.value}
                  id={r.id}
                  checked={active === r.id}
                  onChange={this.handleChange}
                  disabled={r.isDisabled}
                />
                <label htmlFor={r.id} className="gooey-radio-group__label">
                  {r.label}
                </label>
              </li>
            )
          :
            null
        }
      </ul>
    );
  }
}

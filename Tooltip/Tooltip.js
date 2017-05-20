import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * Tooltip component. Renders text which displays a tooltip bubble when hovered
 *
 * @export
 * @class Tooltip
 * @extends {Component}
 */
export default class Tooltip extends Component {
  /**
   * List of possible props
   * @type {Object}
   */
  static propTypes = {
    /**
     * Accessibility text for the tooltip
     * @type {string}
     */
    title: PropTypes.string.isRequired,
    /**
     * Class name for the component
     * @type {string | Array}
     */
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
    ]),
  }

  state = {
    isOpen: false,
  }

  /**
   * Updates the component state to open the tooltip bubble
   */
  handleTooltipHover = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  /**
   * Builds the component's markup
   * @return {JSX} The markup to be rendered
   */
  render() {
    const isOpen = this.state.isOpen ? 1 : 0;

    const tooltipClassnames = classNames(
      'gooey-tooltip',
      this.props.className,
    );

    const toopltipStyles = {
      display: 'inline-block',
    };

    const titleStyles = {
      cursor: 'pointer',
    };

    const bubbleStyles = {
      position: 'absolute',
      opacity: isOpen,
      transform: `scale(${isOpen})`,
    };

    return (
      <div
        className={tooltipClassnames}
        onMouseEnter={this.handleTooltipHover}
        onMouseLeave={this.handleTooltipHover}
        style={toopltipStyles}
      >
        <span
          className="gooey-tooltip__title"
          style={titleStyles}
        >
          {this.props.title}
        </span>
        <div
          className="gooey-tooltip__bubble"
          style={bubbleStyles}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}

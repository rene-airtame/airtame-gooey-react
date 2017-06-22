import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

 /**
   * Builds the Collapser's styles based on the current state
   * @param  {boolean} [isCollapsed] - Flag indicating if the Collapser is open or closed
   * @return {Object}                  Behavioral styles for the Collapser
   */
function getStyles(isCollapsed) {
  return isCollapsed
  ?
  {
    height: 0,
    overflow: 'hidden',
  }
  :
  {
    height: 'auto',
  };
}


/**
 * Collapser component to show/hide content as required
 */
export default class Collapser extends Component {

  /**
   * List of possible props
   * @type {Object}
   */
  static propTypes = {
    /**
     * The state of the collapser (collapsed/expanded)
     * @type {boolean}
     */
    collapsed: PropTypes.bool,
    /**
     * The collapser's content title
     * @type {string}
     */
    title: PropTypes.string,
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
    collapsed: false,
  }

  /**
   * Component's initial state
   */
  state = {
    collapsed: this.props.collapsed,
  }

  /**
   * Updates state variables that are initialized based on props if the props change at some point
   * @param {Object} nextProps - The upcoming props
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.collapsed !== nextProps.collapsed) {
      this.setState({
        collapsed: nextProps.collapsed,
      });
    }
  }

  /**
   * Handles the state change of the collapser
   */
  handleCollapserButtonClick = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  /**
   * Builds the component's markup
   * @return {JSX}  The markup to be rendered
   */
  render() {
    const collapserClassNames = classNames('gooey-collapser', this.props.className);

    const buttonClassNames = classNames(
      'gooey-collapser__buton',
      {'gooey-collapser__buton--expanded': !this.state.collapsed});

    const contentClassNames = classNames(
      'gooey-collapser__container',
      {'gooey-collapser__container--expanded': !this.state.collapsed});

    const styles = getStyles(this.state.collapsed);

    return (
      <div className={collapserClassNames}>
        {
          this.props.title
          ?
          <h2>{this.props.title}</h2>
          :
          null
        }
        <button
          onClick={this.handleCollapserButtonClick}
          className={buttonClassNames}
        >
        {
          this.state.collapsed
          ?
          'Expand'
          :
          'Collapse'
        }
        </button>
        <div
          className={contentClassNames}
          style={styles}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}

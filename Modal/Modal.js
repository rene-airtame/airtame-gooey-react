import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * Modal component. Renders a modal with the desired information.
 * @param  {Object}   [props] - Component props
 * @param  {boolean}  [props.isOpen] - Is the modal open or closed.
 * @param  {Function} [props.onClose] - Function to execute when the modal is closed.
 * @return {JSX}     The markup to be rendered
 */
export default function Modal(props) {
  const modalClassNames = classNames(
    'gooey-modal',
    props.className,
  );

  const modalStyles = {
    height: '100vh',
    left: 0,
    position: 'fixed',
    top: 0,
    width: '100vw',
  };

  const modalContentStyles = {
    left: '50%',
    position: 'absolute',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  };


  return props.isOpen
  ?
    (
      <div
        className={modalClassNames}
        style={modalStyles}
        onClick={
          !props.disableOverlayClose
          ?
            props.onClose
          :
            null
        }
      >
        <div
          className="gooey-modal__content"
          style={modalContentStyles}
          onClick={e => e.stopPropagation()}
        >
          <button
            className="gooey-modal__close"
            onClick={props.onClose}
          >
            Close
          </button>
          {props.children}
        </div>
      </div>
      )
  :
    null;
}

/**
 * List of possible props
 * @type {Object}
 */
Modal.propTypes = {
  /**
   * Is the modal open or closed.
   * @type {boolean}
   */
  isOpen: PropTypes.bool.isRequired,
  /**
   * Function to execute when the modal is closed.
   * @type {Function}
   */
  onClose: PropTypes.func.isRequired,
  /**
   * Flag to set whether the modal should be closed when clicking the overlay or not
   * @type {boolean}
   */
  disableOverlayClose: PropTypes.bool,
  /**
   * Class name for the component
   * @type {string | Array}
   */
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
};

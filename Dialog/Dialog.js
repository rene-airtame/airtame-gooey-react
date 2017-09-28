import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Modal from '../Modal';

/**
 * Dialog component. Renders a Modal with Dialog actions
 * @param {Object}    [props] - Component props
 * @param {boolean}   [props.isOpen] - Is the dialog open or closed.
 * @param {Function}  [props.onConfirm] - Function to execute when pressing the confirm button.
 * @param {Function}  [props.onCancel] - Function to execute when pressing the cancel button.
 * @param {string}    [props.confirmButtonText] - Text for the confirm button
 * @param {string}    [props.cancelButtonText] - Text for the cancel button
 * @return {JSX}      The markup to be rendered
 */
export default function Dialog(props) {
  const dialogClassNames = classNames('gooey-dialog', props.className);

  return (
    <Modal
      className={dialogClassNames}
      isOpen={props.isOpen}
      onClose={props.onCancel}
      disableOverlayClose
    >
      {props.children}
      <ul className="gooey-dialog__actions">
        <li>
          <button
            onClick={props.onConfirm}
            className="gooey-dialog__action gooey-dialog__action--confirm"
          >
            {props.confirmButtonText || 'Confirm'}
          </button>
        </li>
        <li>
          <button
            onClick={props.onCancel}
            className="gooey-dialog__action gooey-dialog__action--cancel"
          >
            {props.cancelButtonText || 'Cancel'}
          </button>
        </li>
      </ul>
    </Modal>
  );
}

/**
 * List of possible props
 * @type {Object}
 */
Dialog.propTypes = {
  /**
   * Is the dialog open or closed.
   * @type {boolean}
   */
  isOpen: PropTypes.bool.isRequired,
  /**
   * Function to execute when pressing the confirm button.
   * @type {Function}
   */
  onConfirm: PropTypes.func.isRequired,
  /**
   * Function to execute when pressing the cancel button.
   * @type {Function}
   */
  onCancel: PropTypes.func.isRequired,
  /**
   * Text to be displayed in the confirm button
   * @type {string}
   */
  confirmButtonText: PropTypes.string,
  /**
   * Text to be displayed in the cancel button
   * @type {string}
   */
  cancelButtonText: PropTypes.string,
  /**
   * Class name for the component
   * @type {string | Array}
   */
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
};

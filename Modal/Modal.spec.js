import React from 'react';
import { shallow, mount } from 'enzyme';
import { spy } from 'sinon';
import Modal from './Modal';

describe('<Modal />', () => {
  it('should render the modal', () => {
    const wrapper = shallow(
      <Modal isOpen onClose={e => false}>
        content
      </Modal>
    );
    expect(wrapper).toHaveTagName('div');
  });

  it('should not render anything when closed', () => {
    const wrapper = shallow(
      <Modal isOpen={false} onClose={e => false}>
        content
      </Modal>
    );
    expect(wrapper.type()).toEqual(null);
  });

  it('should trigger the onClose function when pressing the close button', () => {
    const closeCallback = spy();

    const wrapper = mount(
      <Modal isOpen onClose={closeCallback}>
        content
      </Modal>
    );
    wrapper.find('button').simulate('click');
    expect(closeCallback).toHaveProperty('callCount', 1);
  });

  it('should trigger the onClose function when clicking modal overlay', () => {
    const closeCallback = spy();

    const wrapper = mount(
      <Modal isOpen onClose={closeCallback}>
        content
      </Modal>
    );
    wrapper.find('.gooey-modal').simulate('click');
    expect(closeCallback).toHaveProperty('callCount', 1);
  });

  it('should not trigger the onClose function when clicking modal content', () => {
    const closeCallback = spy();

    const wrapper = mount(
      <Modal isOpen onClose={closeCallback}>
        content
      </Modal>
    );
    wrapper.find('.gooey-modal__content').simulate('click');
    expect(closeCallback).toHaveProperty('callCount', 0);
  });

  it('should not close when clicking the overlay if the disableOverlayClose prop is passed', () => {
    let open = true;
    const close = e => {
      open = false;
    };

    const wrapper = mount(
      <Modal isOpen={open} onClose={close} disableOverlayClose>
        content
      </Modal>
    );
    wrapper.find('.gooey-modal').simulate('click');
    expect(open).toEqual(true);
  });

  it('should open and close when the isOpen prop changes', () => {
    const wrapper = shallow(
      <Modal isOpen onClose={close}>
        content
      </Modal>
    );

    wrapper.setProps({ isOpen: false });
    expect(wrapper.type()).toEqual(null);

    wrapper.setProps({ isOpen: true });
    expect(wrapper).toHaveTagName('div');
  });
});

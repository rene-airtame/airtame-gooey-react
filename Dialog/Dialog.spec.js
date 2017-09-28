import React from 'react';
import { shallow, mount } from 'enzyme';
import Dialog from './Dialog';

describe('<Dialog />', () => {
  it('should render the dialog', () => {
    const wrapper = shallow(
      <Dialog
        isOpen
        onCancel={e => false}
        onConfirm={e => false}
      >
        content
      </Dialog>);
    expect(wrapper).toMatchSelector('Modal');
  });

  it('should not render anything when closed', () => {
    const wrapper = shallow(
      <Dialog
        isOpen={false}
        onCancel={e => false}
        onConfirm={e => false}
      >
        content
      </Dialog>);
    expect(wrapper.html()).toHaveLength(0);
  });

  it('should trigger the onCancel function when pressing the close button', () => {
    let open = true;
    const toggle = e => {
      open = false;
    };

    const wrapper = mount(
      <Dialog
        isOpen
        onCancel={toggle}
        onConfirm={e => false}
      >
        content
      </Dialog>);
    wrapper.find('.gooey-dialog__action--cancel').simulate('click');
    expect(open).toEqual(false);
  });

  it('should trigger the onConfirm function when pressing the close button', () => {
    let open = true;
    const toggle = e => {
      open = false;
    };

    const wrapper = mount(
      <Dialog
        isOpen
        onCancel={e => false}
        onConfirm={toggle}
      >
        content
      </Dialog>);
    wrapper.find('.gooey-dialog__action--confirm').simulate('click');
    expect(open).toEqual(false);
  });

  it('should open and close when the isOpen prop changes', () => {
    const wrapper = shallow(
      <Dialog
        isOpen
        onCancel={e => false}
        onConfirm={e => false}
      >
        content
      </Dialog>);

    wrapper.setProps({isOpen: false});
    expect(wrapper.html()).toHaveLength(0);

    wrapper.setProps({isOpen: true});
    expect(wrapper.html().length).toBeGreaterThan(0);
  });

  it('should set the right text on the confirm button', () => {
    const wrapper = shallow(
      <Dialog
        isOpen
        onCancel={e => false}
        onConfirm={e => false}
      >
        content
      </Dialog>);

    expect(wrapper.find('.gooey-dialog__action--confirm').text()).toBe('Confirm');

    wrapper.setProps({confirmButtonText: 'Test'});
    expect(wrapper.find('.gooey-dialog__action--confirm').text()).toBe('Test');
  });

  it('should set the right text on the cancel button', () => {
    const wrapper = shallow(
      <Dialog
        isOpen
        onCancel={e => false}
        onConfirm={e => false}
      >
        content
      </Dialog>);

    expect(wrapper.find('.gooey-dialog__action--cancel').text()).toBe('Cancel');

    wrapper.setProps({cancelButtonText: 'Test'});
    expect(wrapper.find('.gooey-dialog__action--cancel').text()).toBe('Test');
  });
});

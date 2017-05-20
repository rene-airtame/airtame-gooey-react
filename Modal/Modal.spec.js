import React from 'react';
import Modal from './Modal';

describe('<Modal />', () => {
  it('should render the modal', () => {
    const wrapper = render(<Modal isOpen onClose={e => false}>content</Modal>);
    expect(wrapper).to.have.tagName('div');
  });

  it('should not render anything when closed', () => {
    const wrapper = shallow(<Modal isOpen={false} onClose={e => false}>content</Modal>);
    expect(wrapper.type()).to.eql(null);
  });

  it('should trigger the onClose function when pressing the close button', () => {
    let open = true;
    const close = e => {
      open = false;
    };

    const wrapper = mount(<Modal isOpen={open} onClose={close}>content</Modal>);
    wrapper.find('button').simulate('click');
    expect(open).to.eql(false);
  });

  it('should trigger the onClose function when clicking modal overlay', () => {
    let open = true;
    const close = e => {
      open = false;
    };

    const wrapper = mount(<Modal isOpen={open} onClose={close}>content</Modal>);
    wrapper.find('.gooey-modal').simulate('click');
    expect(open).to.eql(false);
  });

  it('should not trigger the onClose function when clicking modal content', () => {
    let open = true;
    const close = e => {
      open = false;
    };

    const wrapper = mount(<Modal isOpen={open} onClose={close}>content</Modal>);
    wrapper.find('.gooey-modal__content').simulate('click');
    expect(open).to.eql(true);
  });

  it('should not close when clicking the overlay if the disableOverlayClose prop is passed', () => {
    let open = true;
    const close = e => {
      open = false;
    };

    const wrapper = mount(
      <Modal
        isOpen={open}
        onClose={close}
        disableOverlayClose
      >
        content
      </Modal>
    );
    wrapper.find('.gooey-modal').simulate('click');
    expect(open).to.eql(true);
  });

  it('should open and close when the isOpen prop changes', () => {
    const wrapper = shallow(<Modal isOpen onClose={close}>content</Modal>);

    wrapper.setProps({isOpen: false});
    expect(wrapper.type()).to.eql(null);

    wrapper.setProps({isOpen: true});
    expect(wrapper).to.have.tagName('div');
  });
});

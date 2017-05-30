import React from 'react';
import SideDrawer from './SideDrawer';

describe('<SideDrawer />', () => {
  it('should render the SideDrawer', () => {
    const wrapper = render(<SideDrawer isOpen onClose={e => false}>content</SideDrawer>);
    expect(wrapper.find('.gooey-side-drawer')).to.have.tagName('div');
  });

  it('should add a class when open', () => {
    const wrapper = render(<SideDrawer isOpen onClose={e => false}>content</SideDrawer>);
    expect(wrapper.find('.gooey-side-drawer--open')).to.have.length(1);
  });

  it('should not add the open class when closed', () => {
    const wrapper = shallow(<SideDrawer isOpen={false} onClose={e => false}>content</SideDrawer>);
    expect(wrapper.find('.gooey-side-drawer--open')).to.have.length(0);
  });

  it('should trigger the onClose function when pressing the close button', () => {
    const closeCallback = spy();

    const wrapper = mount(<SideDrawer isOpen={open} onClose={closeCallback}>content</SideDrawer>);
    wrapper.find('button').simulate('click');
    expect(closeCallback).to.have.property('callCount', 1);
  });

  it('should trigger the onClose function when clicking SideDrawer overlay', () => {
    const closeCallback = spy();

    const wrapper = mount(<SideDrawer isOpen={open} onClose={closeCallback}>content</SideDrawer>);
    wrapper.find('.gooey-side-drawer').simulate('click');
    expect(closeCallback).to.have.property('callCount', 1);
  });

  it('should not trigger the onClose function when clicking SideDrawer content', () => {
    const closeCallback = spy();

    const wrapper = mount(<SideDrawer isOpen={open} onClose={closeCallback}>content</SideDrawer>);
    wrapper.find('.gooey-side-drawer__content').simulate('click');
    expect(closeCallback).to.have.property('callCount', 0);
  });
});

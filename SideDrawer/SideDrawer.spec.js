import React from 'react';
import { shallow, mount } from 'enzyme';
import { spy } from 'sinon';
import SideDrawer from './SideDrawer';

describe('<SideDrawer />', () => {
  it('should render the SideDrawer', () => {
    const wrapper = shallow(
      <SideDrawer isOpen onClose={e => false}>
        content
      </SideDrawer>
    );
    expect(wrapper.find('.gooey-side-drawer')).toHaveTagName('div');
  });

  it('should add a class when open', () => {
    const wrapper = shallow(
      <SideDrawer isOpen onClose={e => false}>
        content
      </SideDrawer>
    );
    expect(wrapper).toHaveClassName('gooey-side-drawer--open');
  });

  it('should not add the open class when closed', () => {
    const wrapper = shallow(
      <SideDrawer isOpen={false} onClose={e => false}>
        content
      </SideDrawer>
    );
    expect(wrapper.find('.gooey-side-drawer--open')).toHaveLength(0);
  });

  it('should trigger the onOverlayClick function when clicking SideDrawer overlay', () => {
    const closeCallback = spy();

    const wrapper = mount(
      <SideDrawer isOpen={open} onOverlayClick={closeCallback}>
        content
      </SideDrawer>
    );
    wrapper.find('.gooey-side-drawer').simulate('click');
    expect(closeCallback).toHaveProperty('callCount', 1);
  });

  it('should not trigger the onOverlayClick function when clicking SideDrawer content', () => {
    const closeCallback = spy();

    const wrapper = mount(
      <SideDrawer isOpen={open} onOverlayClick={closeCallback}>
        content
      </SideDrawer>
    );
    wrapper.find('.gooey-side-drawer__content').simulate('click');
    expect(closeCallback).toHaveProperty('callCount', 0);
  });

  it('should not trigger the onOverlayClick fn when clicking content and release outside', () => {
    const closeCallback = spy();

    const wrapper = mount(
      <SideDrawer isOpen={open} onOverlayClick={closeCallback}>
        content
      </SideDrawer>
    );
    wrapper.find('.gooey-side-drawer__content').simulate('onmousedown');
    wrapper.find('.gooey-side-drawer').simulate('onmouseup');
    expect(closeCallback).toHaveProperty('callCount', 0);
  });

  it('should not trigger the onOverlayClick fn when clicking outside and release inside', () => {
    const closeCallback = spy();

    const wrapper = mount(
      <SideDrawer isOpen={open} onOverlayClick={closeCallback}>
        content
      </SideDrawer>
    );
    wrapper.find('.gooey-side-drawer').simulate('onmousedown');
    wrapper.find('.gooey-side-drawer__content').simulate('onmouseup');
    expect(closeCallback).toHaveProperty('callCount', 0);
  });

  it('should trigger the onOverlayClick fn when clicking outside ', () => {
    const closeCallback = spy();

    const wrapper = mount(
      <SideDrawer isOpen={open} onOverlayClick={closeCallback}>
        content
      </SideDrawer>
    );
    wrapper.find('.gooey-side-drawer').simulate('onmousedown');
    wrapper.find('.gooey-side-drawer').simulate('onmouseup');
    expect(closeCallback).toHaveProperty('callCount', 0);
  });

  it('should not trigger the onOverlayClick fn when clicking inside ', () => {
    const closeCallback = spy();

    const wrapper = mount(
      <SideDrawer isOpen={open} onOverlayClick={closeCallback}>
        content
      </SideDrawer>
    );
    wrapper.find('.gooey-side-drawer__content').simulate('onmousedown');
    wrapper.find('.gooey-side-drawer__content').simulate('onmouseup');
    expect(closeCallback).toHaveProperty('callCount', 0);
  });
});

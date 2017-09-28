import React from 'react';
import { shallow, mount } from 'enzyme';
import { spy } from 'sinon';
import Collapser from './Collapser';

describe('<Collapser />', () => {
  it('should render the collapser', () => {
    const wrapper = shallow(<Collapser title="Test">content</Collapser>);
    expect(wrapper).toHaveTagName('div');
  });

  it('should properly use the title prop', () => {
    const wrapper = shallow(<Collapser title="Test">content</Collapser>);
    expect(wrapper.find('h2').contains('Test')).toEqual(true);
  });

  it('should not render extra tags if no title is wanted', () => {
    const wrapper = shallow(<Collapser>content</Collapser>);
    expect(wrapper.find('h2')).toHaveLength(0);
  });


  it('should initialize open without collapsed prop', () => {
    const wrapper = shallow(<Collapser title="Test">content</Collapser>);
    expect(wrapper.find('.gooey-collapser__container--expanded')).toHaveLength(1);
  });

  it('should initialize closed with collapsed prop set to true', () => {
    const wrapper = shallow(<Collapser title="Test" collapsed>content</Collapser>);
    expect(wrapper.find('.gooey-collapser__container--expanded')).toHaveLength(0);
  });

  it('should toggle from open to close and viceversa', () => {
    const wrapper = shallow(<Collapser title="Test">content</Collapser>);

    wrapper.setState({collapsed: true});
    expect(wrapper.find('.gooey-collapser__container')).not.toHaveClassName('gooey-collapser__container--expanded');

    wrapper.setState({collapsed: false});
    expect(wrapper.find('.gooey-collapser__container')).toHaveClassName('gooey-collapser__container--expanded');
  });

  it('should update the component state when clicking the toggle button', () => {
    const wrapper = mount(<Collapser title="Test">content</Collapser>);

    wrapper.find('button').simulate('click');
    expect(wrapper.state('collapsed')).toEqual(true);

    wrapper.find('button').simulate('click');
    expect(wrapper.state('collapsed')).toEqual(false);
  });

  it('should hide the content when collapsed', () => {
    const wrapper = shallow(<Collapser title="Test">content</Collapser>);
    expect(wrapper.find('.gooey-collapser__container')).toHaveStyle('height', 'auto');
  });

  it('should set the proper collapsed state if the prop is updated', () => {
    const wrapper = shallow(<Collapser title="Test">content</Collapser>);
    expect(wrapper.state('collapsed')).toEqual(false);
    wrapper.setProps({ collapsed: true })
    expect(wrapper.state('collapsed')).toEqual(true);
  });

  it('should not touch the state if props other than collapsed change', () => {
    const stateSpy = spy(Collapser.prototype, 'setState');
    const wrapper = shallow(<Collapser title="Test">content</Collapser>);
    expect(stateSpy.callCount).toEqual(0);
    wrapper.setProps({ title: 'updated title' });
    expect(stateSpy.callCount).toEqual(0);
  });
});

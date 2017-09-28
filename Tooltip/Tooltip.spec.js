import React from 'react';
import { shallow } from 'enzyme';
import Tooltip from './Tooltip';

// tooltip__bubble
// tooltip
describe('<Tooltip />', () => {
  it('should render the tooltip', () => {
    const wrapper = shallow(<Tooltip content="title">foo</Tooltip>);
    expect(wrapper).toHaveTagName('div');
  });

  it('should update the state on mouse enter/leave', () => {
    const wrapper = shallow(<Tooltip content="title">foo</Tooltip>);

    wrapper.simulate('mouseenter');
    expect(wrapper.state('isOpen')).toEqual(true);

    wrapper.simulate('mouseleave');
    expect(wrapper.state('isOpen')).toEqual(false);
  });

  it('should only display the tooltip information on hover', () => {
    const wrapper = shallow(<Tooltip content="title">foo</Tooltip>);
    expect(wrapper.find('.gooey-tooltip__bubble')).toHaveStyle('opacity', 0);

    wrapper.simulate('mouseenter');
    expect(wrapper.find('.gooey-tooltip__bubble')).toHaveStyle('opacity', 1);
  });
});

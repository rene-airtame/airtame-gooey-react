import React from 'react';
import Tooltip from './Tooltip';

// tooltip__bubble
// tooltip
describe('<Tooltip />', () => {
  it('should render the tooltip', () => {
    const wrapper = render(<Tooltip content="title">foo</Tooltip>);
    expect(wrapper).to.have.tagName('div');
  });

  it('should update the state on mouse enter/leave', () => {
    const wrapper = shallow(<Tooltip content="title">foo</Tooltip>);

    wrapper.simulate('mouseenter');
    expect(wrapper.state('isOpen')).to.eql(true);

    wrapper.simulate('mouseleave');
    expect(wrapper.state('isOpen')).to.eql(false);
  });

  it('should only display the tooltip information on hover', () => {
    const wrapper = mount(<Tooltip content="title">foo</Tooltip>);
    expect(wrapper.find('.gooey-tooltip__bubble')).to.have.style('opacity', '0');

    wrapper.simulate('mouseenter');
    expect(wrapper.find('.gooey-tooltip__bubble')).to.have.style('opacity', '1');
  });
});

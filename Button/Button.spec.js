import React from 'react';
import Button from './Button';

describe('<Button />', () => {
  it('should render the button', () => {
    const wrapper = render(<Button />);
    expect(wrapper).to.have.tagName('button');
  });

  it('should create a disabled button when requested', () => {
    const wrapper = render(<Button isDisabled />);
    expect(wrapper.find('button')[0].attribs.disabled).to.eql('');
  });

  it('should add a disabled class if disabled state is passed', () => {
    const wrapper = render(<Button isDisabled />);
    expect(wrapper.find('.gooey-button--disabled')).to.have.length(1);
  });

  it('should add a spinning class if spinning state is passed', () => {
    const wrapper = render(<Button isSpinning />);
    expect(wrapper.find('.gooey-button--spinning')).to.have.length(1);
  });

  it('should trigger the onClick callback when clicked', () => {
    const clickCallback = spy();
    const wrapper = shallow(<Button onClick={clickCallback} />);
    wrapper.find('button').simulate('click')
    expect(clickCallback).to.have.property('callCount', 1);
  });

  it('should propagate additional valid props to the button element', () => {
    const focusCallback = spy();
    const wrapper = shallow(<Button onFocus={focusCallback} />);
    wrapper.find('button').simulate('focus')
    expect(focusCallback).to.have.property('callCount', 1);
  });
});

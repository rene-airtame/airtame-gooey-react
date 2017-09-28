import React from 'react';
import { shallow } from 'enzyme';
import { spy } from 'sinon';
import Button from './Button';

describe('<Button />', () => {
  it('should render the button', () => {
    const wrapper = shallow(<Button />);
    expect(wrapper).toHaveTagName('button');
  });

  it('should create a disabled button when requested', () => {
    const wrapper = shallow(<Button isDisabled />);
    expect(wrapper).toBeDisabled();
  });

  it('should add a disabled class if disabled state is passed', () => {
    const wrapper = shallow(<Button isDisabled />);
    expect(wrapper).toHaveClassName('.gooey-button--disabled');
  });

  it('should add a spinning class if spinning state is passed', () => {
    const wrapper = shallow(<Button isSpinning />);
    expect(wrapper).toHaveClassName('.gooey-button--spinning');
  });

  it('should trigger the onClick callback when clicked', () => {
    const clickCallback = spy();
    const wrapper = shallow(<Button onClick={clickCallback} />);
    wrapper.find('button').simulate('click')
    expect(clickCallback).toHaveProperty('callCount', 1);
  });

  it('should propagate additional valid props to the button element', () => {
    const focusCallback = spy();
    const wrapper = shallow(<Button onFocus={focusCallback} />);
    wrapper.find('button').simulate('focus')
    expect(focusCallback).toHaveProperty('callCount', 1);
  });
});

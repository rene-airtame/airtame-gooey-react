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

  it('should call the triggerHandler prop function on click', () => {
    let wasCalled = false;
    const triggerHandler = () => {
      wasCalled = true;
    };

    const wrapper = shallow(<Button onClick={triggerHandler} />);
    wrapper.find('button').simulate('click');
    expect(wasCalled).to.eql(true);
  });
});

import React from 'react';
import Switch from './Switch';
import Checkbox from '../Checkbox';

describe('<Switch />', () => {
  it('should render the switch', () => {
    const wrapper = render(
      <Switch id="test-siwtch" label="test-switch" value="foo" />
    );
    expect(wrapper).to.have.tagName('div');
  });

  it('should render a Checkbox component', () => {
    const wrapper = shallow(
      <Switch id="test-siwtch" label="test-switch" value="foo" />
    );
    expect(wrapper.find(Checkbox)).to.have.length('1');
  });

  it('should properly translate the isOn prop', () => {
    const wrapper = render(
      <Switch id="test-siwtch" label="test-switch" value="foo" isOn />
    );
    expect(wrapper.find('input')[0].attribs.checked).to.eql('');
  });

  it('should add state classes for the switch', () => {
    const wrapper = render(
      <Switch id="test-siwtch" label="test-switch" value="foo" isOn isDisabled />
    );
    expect(wrapper.find('.gooey-switch--disabled')).to.have.length(1);
    expect(wrapper.find('.gooey-switch--on')).to.have.length(1);
  });

  it('should propagate additional valid props to the input element', () => {
    const focusCallback = spy();
    const wrapper = mount(
      <Switch id="test-siwtch" label="test-switch" value="foo"  onFocus={focusCallback} />
    );
    wrapper.find('input').simulate('focus')
    expect(focusCallback).to.have.property('callCount', 1);
  });
});

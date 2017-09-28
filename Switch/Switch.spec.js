import React from 'react';
import { render, shallow, mount } from 'enzyme';
import { spy } from 'sinon';
import Switch from './Switch';

describe('<Switch />', () => {
  it('should render the switch', () => {
    const wrapper = shallow(
      <Switch id="test-siwtch" label="test-switch" value="foo" />
    );
    expect(wrapper).toMatchSelector('Checkbox');
  });

  it('should render a Checkbox component', () => {
    const wrapper = shallow(
      <Switch id="test-siwtch" label="test-switch" value="foo" />
    );
    expect(wrapper.name()).toBe('Checkbox');
  });

  it('should properly translate the isOn prop', () => {
    const wrapper = render(
      <Switch id="test-siwtch" label="test-switch" value="foo" isOn />
    );
    expect(wrapper.find('input')[0].attribs.checked).toEqual('');
  });

  it('should add state classes for the switch', () => {
    const wrapper = shallow(
      <Switch id="test-siwtch" label="test-switch" value="foo" isOn isDisabled />
    );
    expect(wrapper).toHaveClassName('gooey-switch--disabled');
    expect(wrapper).toHaveClassName('gooey-switch--on');
  });

  it('should propagate additional valid props to the input element', () => {
    const focusCallback = spy();
    const wrapper = mount(
      <Switch id="test-siwtch" label="test-switch" value="foo" onFocus={focusCallback} />
    );
    wrapper.find('input').simulate('focus')
    expect(focusCallback).toHaveProperty('callCount', 1);
  });
});

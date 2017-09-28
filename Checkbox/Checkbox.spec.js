import React from 'react';
import { render, shallow, mount } from 'enzyme';
import { spy } from 'sinon';
import Checkbox from './Checkbox';

describe('<Checkbox />', () => {
  it('should render the checkbox', () => {
    const wrapper = shallow(<Checkbox id="test-checkbox" label="test-checkbox" value="foo" />);
    expect(wrapper).toHaveTagName('div');
  });

  it('should not be checked by default', () => {
    const wrapper = render(<Checkbox id="test-checkbox" label="test-checkbox" value="foo" />);
    expect(wrapper.find('input')[0].attribs.checked).toEqual(undefined);
  });

  it('should be checked when requested', () => {
    const wrapper = render(
      <Checkbox id="test-checkbox" label="test-checkbox" value="foo" isChecked />
    );
    expect(wrapper.find('input')[0].attribs.checked).toEqual('');
  });

  it('should set the name prop properly', () => {
    const wrapper = render(
      <Checkbox id="text-checkbox" label="test checkbox" value="foo" name="myname" />
    );
    expect(wrapper.find('input')[0].attribs.name).toEqual('myname');
  });

  it('should not set the name attribute without a prop', () => {
    const wrapper = render(<Checkbox id="text-checkbox" label="test checkbox" value="foo" />);
    expect(wrapper.find('input')[0].attribs.name).toEqual(undefined);
  });

  it('should set the value prop properly', () => {
    const wrapper = render(<Checkbox id="text-checkbox" label="test checkbox" value="foo" />);
    expect(wrapper.find('input')[0].attribs.value).toEqual('foo');
  });

  it('should be disabled when requested', () => {
    const wrapper = render(
      <Checkbox id="test-checkbox" label="test-checkbox" value="foo" isDisabled />
    );
    expect(wrapper.find('input')[0].attribs.disabled).toEqual('');
  });

  it('should toggle on when unchecked and pressed', () => {
    const wrapper = shallow(<Checkbox id="test-checkbox" label="test-checkbox" value="foo" />);
    expect(wrapper.state('checked')).toEqual(false);
    wrapper.find('input').simulate('change', {
      target: { checked: true },
      persist: () => {},
    });
    expect(wrapper.state('checked')).toEqual(true);
  });

  it('should toggle off when checked and pressed', () => {
    const wrapper = shallow(
      <Checkbox id="test-checkbox" label="test-checkbox" value="foo" isChecked />
    );
    expect(wrapper.state('checked')).toEqual(true);
    wrapper.find('input').simulate('change', {
      target: { checked: false },
      persist: () => {},
    });
    expect(wrapper.state('checked')).toEqual(false);
  });

  it('should have a linked input and label', () => {
    const wrapper = render(<Checkbox id="test-checkbox" label="test-checkbox" value="foo" />);
    const inputId = wrapper.find('input')[0].attribs.id;
    const labelFor = wrapper.find('label')[0].attribs.for;
    expect(inputId).toEqual(labelFor);
  });

  it('should trigger the onChange callback function', () => {
    const onChangeCallback = spy();
    const wrapper = shallow(
      <Checkbox id="test-checkbox" label="test-checkbox" value="foo" onChange={onChangeCallback} />
    );
    expect(onChangeCallback).toHaveProperty('callCount', 0);
    wrapper.find('input').simulate('change', {
      target: { checked: true },
      persist: () => {},
    });
    expect(onChangeCallback).toHaveProperty('callCount', 1);
  });

  it('should properly create the ref for the input element', () => {
    const wrapper = mount(
      <Checkbox id="test-checkbox" label="test-checkbox" value="foo" inputRef="inputEl" />
    );
    expect(wrapper.ref('inputEl').tagName).toEqual('INPUT');
  });

  it('should propagate additional valid props to the input element', () => {
    const focusCallback = spy();
    const wrapper = shallow(
      <Checkbox id="test-checkbox" label="test-checkbox" value="foo" onFocus={focusCallback} />
    );
    wrapper.find('input').simulate('focus');
    expect(focusCallback).toHaveProperty('callCount', 1);
  });

  it('should set the proper checked state if the prop is updated', () => {
    const wrapper = shallow(
      <Checkbox id="test-checkbox" label="test-checkbox" value="foo" isChecked />
    );
    expect(wrapper.state('checked')).toEqual(true);
    wrapper.setProps({ isChecked: false });
    expect(wrapper.state('checked')).toEqual(false);
  });

  it('should not touch the state if props other than isChecked change', () => {
    const stateSpy = spy(Checkbox.prototype, 'setState');
    const wrapper = shallow(
      <Checkbox id="test-checkbox" label="test-checkbox" value="foo" isChecked />
    );
    expect(stateSpy.callCount).toEqual(0);
    wrapper.setProps({ label: 'updated label' });
    expect(stateSpy.callCount).toEqual(0);
  });
});

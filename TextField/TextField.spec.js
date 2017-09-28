import React from 'react';
import { render, shallow, mount } from 'enzyme';
import { spy } from 'sinon';
import TextField from './TextField';

describe('<TextField />', () => {
  it('should render the text field', () => {
    const wrapper = shallow(<TextField />);
    expect(wrapper).toHaveTagName('div');
  });

  it('should create a text field by default', () => {
    const wrapper = render(<TextField />);
    expect(wrapper.find('input')[0].attribs.type).toEqual('text');
  });

  it('should create a text field with an initial value', () => {
    const wrapper = render(<TextField value="foo" />);
    expect(wrapper.find('input')[0].attribs.value).toEqual('foo');
  });

  it('should update create a password field with the right props', () => {
    const wrapper = render(<TextField type="password" />);
    expect(wrapper.find('input')[0].attribs.type).toEqual('password');
  });

  it('should create a toggle button when creating a password field', () => {
    const wrapper = render(<TextField type="password" />);
    expect(wrapper.find('button')).toHaveLength(1);
  });

  it('should omit the password toggle button if requested', () => {
    const wrapper = render(<TextField type="password" disablePasswordToggle />);
    expect(wrapper.find('button')).toHaveLength(0);
  });

  it('should switch to a text field when clicking view password', () => {
    const wrapper = shallow(<TextField type="password" />);
    wrapper.find('button').simulate('click');
    expect(wrapper.find('input').is('[type="text"]')).toBe(true);
  });

  it('should switch back to a password field when clicking hide password', () => {
    const wrapper = shallow(<TextField type="password" />);
    wrapper.find('button').simulate('click');
    wrapper.find('button').simulate('click');
    expect(wrapper.find('input').is('[type="password"]')).toBe(true);
  });

  it('should create a disabled field when requested', () => {
    const wrapper = render(<TextField isDisabled />);
    expect(wrapper.find('input')[0].attribs.disabled).toEqual('');
  });

  it('should create a readonly field when requested', () => {
    const wrapper = render(<TextField isReadOnly />);
    expect(wrapper.find('input')[0].attribs.readonly).toEqual('');
  });

  it('should add an error class if an error state is passed', () => {
    const wrapper = shallow(<TextField isError />);
    expect(wrapper).toHaveClassName('gooey-text-field--error');
  });

  it('should display an error message if error and a message is passed', () => {
    const wrapper = render(<TextField isError errorMessage="an error" />);
    expect(wrapper.find('.gooey-text-field__error-message').text()).toEqual('an error');
  });

  it('should not render an error message if an error flag is not passed', () => {
    const wrapper = render(<TextField errorMessage="an error" />);
    expect(wrapper.find('.gooey-text-field__error-message')).toHaveLength(0);
  });

  it('should not render an error message container if no error message is passed', () => {
    const wrapper = render(<TextField isError />);
    expect(wrapper.find('.gooey-text-field__error-message')).toHaveLength(0);
  });

  it('should add a placeholder text if requested', () => {
    const wrapper = render(<TextField placeholder="foo" />);
    expect(wrapper.find('input')[0].attribs.placeholder).toEqual('foo');
  });

  it('should show an error message when the maxContentLength is exceeded', () => {
    const wrapper = shallow(<TextField maxContentLength={3} />);
    wrapper.find('input').simulate('change', {
      target: {value: 'My new value'},
      persist: () => {},
    });
    expect(wrapper.find('.gooey-text-field__error-message')).toHaveLength(1);
    expect(wrapper.find('.gooey-text-field--error')).toHaveLength(1);
  });

  it('should trigger onChange callback with an error when the maxContentLength is exceeded', () => {
    const onChangeCallback = spy();
    const wrapper = shallow(<TextField onChange={onChangeCallback} maxContentLength={3} />);
    wrapper.find('input').simulate('change', {
      target: {value: 'My new value'},
      persist: () => {},
    });
    expect(onChangeCallback.args[0][1].name).toBe('Error');
  });

  it('should trigger an onChange callback function', () => {
    const onChangeCallback = spy();
    const wrapper = shallow(<TextField onChange={onChangeCallback} />);
    wrapper.find('input').simulate('change', {
      target: {value: 'a'},
      persist: () => {},
    });
    expect(onChangeCallback).toHaveProperty('callCount', 1);
  });

  it('should not attempt to trigger an onChange callback function is not passed', () => {
    const onChangeCallback = spy();
    const wrapper = shallow(<TextField />);
    wrapper.find('input').simulate('change', {
      target: {value: 'a'},
      persist: () => {},
    });
    expect(onChangeCallback).toHaveProperty('callCount', 0);
  });

  it('should properly create the ref for the input element', () => {
    const wrapper = mount(<TextField inputRef="inputEl" />);
    expect(wrapper.ref('inputEl').tagName).toEqual('INPUT');
  });

  it('should propagate additional valid props to the input element', () => {
    const focusCallback = spy();
    const wrapper = shallow(<TextField onFocus={focusCallback} />);
    wrapper.find('input').simulate('focus')
    expect(focusCallback).toHaveProperty('callCount', 1);
  });

  it('should set the proper value state if the prop is updated', () => {
    const wrapper = shallow(<TextField value="foo" />);
    expect(wrapper.state('textFieldValue')).toEqual('foo');
    wrapper.setProps({ value: 'bar' })
    expect(wrapper.state('textFieldValue')).toEqual('bar');
  });

  it('should not touch the state if props other than value change', () => {
    const stateSpy = spy(TextField.prototype, 'setState');
    const wrapper = shallow(<TextField value="foo" />);
    expect(stateSpy.callCount).toEqual(0);
    wrapper.setProps({ placeholder: 'updated placeholder' });
    expect(stateSpy.callCount).toEqual(0);
  });
});

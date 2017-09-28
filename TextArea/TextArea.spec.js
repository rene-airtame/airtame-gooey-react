import React from 'react';
import { render, shallow, mount } from 'enzyme';
import { spy } from 'sinon';
import TextArea from './TextArea';

describe('<TextArea />', () => {
  it('should render the textarea field', () => {
    const wrapper = shallow(<TextArea />);
    expect(wrapper).toHaveTagName('div');
  });

  it('should create a textarea field with an initial value', () => {
    const wrapper = shallow(<TextArea value="foo" />);
    expect(wrapper.find('textarea')).toHaveValue('foo');
  });

  it('should create a disabled textarea field when requested', () => {
    const wrapper = shallow(<TextArea isDisabled />);
    expect(wrapper.find('textarea')).toBeDisabled();
  });

  it('should create a readonly textarea field when requested', () => {
    const wrapper = render(<TextArea isReadOnly />);
    expect(wrapper.find('textarea')[0].attribs.readonly).toEqual('');
  });

  it('should add an error class if an error state is passed', () => {
    const wrapper = shallow(<TextArea isError />);
    expect(wrapper).toHaveClassName('gooey-text-area--error');
  });

  it('should display an error message if error and a message is passed', () => {
    const wrapper = render(<TextArea isError errorMessage="an error" />);
    expect(wrapper.find('.gooey-text-area__error-message').text()).toEqual('an error');
  });

  it('should not render an error message if an error flag is not passed', () => {
    const wrapper = render(<TextArea errorMessage="an error" />);
    expect(wrapper.find('.gooey-text-area__error-message')).toHaveLength(0);
  });

  it('should show an error icon even if no error message was passed', () => {
    const wrapper = render(<TextArea isError />);
    expect(wrapper.find('.gooey-text-area__error-icon')).toHaveLength(1);
  });

  it('should add a placeholder text if requested', () => {
    const wrapper = render(<TextArea placeholder="foo" />);
    expect(wrapper.find('textarea')[0].attribs.placeholder).toEqual('foo');
  });

  it('should show an error message when the maxContentLength is exceeded', () => {
    const wrapper = shallow(<TextArea maxContentLength={3} />);
    wrapper.find('textarea').simulate('change', {
      target: { value: 'My new value' },
      persist: () => {},
    });
    expect(wrapper.find('.gooey-text-area__error-message')).toHaveLength(1);
    expect(wrapper.find('.gooey-text-area--error')).toHaveLength(1);
  });

  it('should trigger onChange callback with an error when the maxContentLength is exceeded', () => {
    const onChangeCallback = spy();
    const wrapper = shallow(<TextArea onChange={onChangeCallback} maxContentLength={3} />);
    wrapper.find('textarea').simulate('change', {
      target: { value: 'My new value' },
      persist: () => {},
    });
    expect(onChangeCallback.args[0][1].name).toBe('Error');
  });

  it('should trigger an onChange callback function', () => {
    const onChangeCallback = spy();
    const wrapper = shallow(<TextArea onChange={onChangeCallback} />);
    wrapper.find('textarea').simulate('change', {
      target: { value: 'a' },
      persist: () => {},
    });
    expect(onChangeCallback).toHaveProperty('callCount', 1);
  });

  it('should not attempt to trigger an onChange callback function is not passed', () => {
    const onChangeCallback = spy();
    const wrapper = shallow(<TextArea />);
    wrapper.find('textarea').simulate('change', {
      target: { value: 'a' },
      persist: () => {},
    });
    expect(onChangeCallback).toHaveProperty('callCount', 0);
  });

  it('should properly create the ref for the textarea element', () => {
    const wrapper = mount(<TextArea textAreaRef="textEl" />);
    expect(wrapper.ref('textEl').tagName).toEqual('TEXTAREA');
  });

  it('should propagate additional valid props to the textarea element', () => {
    const focusCallback = spy();
    const wrapper = shallow(<TextArea onFocus={focusCallback} />);
    wrapper.find('textarea').simulate('focus');
    expect(focusCallback).toHaveProperty('callCount', 1);
  });

  it('should set the proper value state if the prop is updated', () => {
    const wrapper = shallow(<TextArea value="foo" />);
    expect(wrapper.state('textAreaValue')).toEqual('foo');
    wrapper.setProps({ value: 'bar' });
    expect(wrapper.state('textAreaValue')).toEqual('bar');
  });

  it('should not touch the state if props other than value change', () => {
    const stateSpy = spy(TextArea.prototype, 'setState');
    const wrapper = shallow(<TextArea value="foo" />);
    expect(stateSpy.callCount).toEqual(0);
    wrapper.setProps({ placeholder: 'updated placeholder' });
    expect(stateSpy.callCount).toEqual(0);
  });
});

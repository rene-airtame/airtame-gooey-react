import React from 'react';
import TextField from './TextField';

describe('<TextField />', () => {
  it('should render the text field', () => {
    const wrapper = render(<TextField />);
    expect(wrapper).to.have.tagName('div');
  });

  it('should create a text field by default', () => {
    const wrapper = render(<TextField />);
    expect(wrapper.find('input')[0].attribs.type).to.eql('text');
  });

  it('should create a text field with an initial value', () => {
    const wrapper = render(<TextField value="foo" />);
    expect(wrapper.find('input')[0].attribs.value).to.eql('foo');
  });

  it('should update create a password field with the right props', () => {
    const wrapper = render(<TextField type="password" />);
    expect(wrapper.find('input')[0].attribs.type).to.eql('password');
  });

  it('should create a toggle button when creating a password field', () => {
    const wrapper = render(<TextField type="password" />);
    expect(wrapper.find('button')).to.have.length(1);
  });

  it('should omit the password toggle button if requested', () => {
    const wrapper = render(<TextField type="password" disablePasswordToggle />);
    expect(wrapper.find('button')).to.have.length(0);
  });

  it('should switch to a text field when clicking view password', () => {
    const wrapper = shallow(<TextField type="password" />);
    wrapper.find('button').simulate('click');
    expect(wrapper.find('input').node.props.type).to.eql('text');
  });

  it('should switch back to a password field when clicking hide password', () => {
    const wrapper = shallow(<TextField type="password" />);
    wrapper.find('button').simulate('click');
    wrapper.find('button').simulate('click');
    expect(wrapper.find('input').node.props.type).to.eql('password');
  });

  it('should create a disabled field when requested', () => {
    const wrapper = render(<TextField isDisabled />);
    expect(wrapper.find('input')[0].attribs.disabled).to.eql('');
  });

  it('should create a readonly field when requested', () => {
    const wrapper = render(<TextField isReadOnly />);
    expect(wrapper.find('input')[0].attribs.readonly).to.eql('');
  });

  it('should add an error class if an error state is passed', () => {
    const wrapper = render(<TextField isError />);
    expect(wrapper.find('.gooey-text-field--error')).to.have.length(1);
  });

  it('should display an error message if error and a message is passed', () => {
    const wrapper = render(<TextField isError errorMessage="an error" />);
    expect(wrapper.find('.gooey-text-field__error-message').text()).to.eql('an error');
  });

  it('should not render an error message if an error flag is not passed', () => {
    const wrapper = render(<TextField errorMessage="an error" />);
    expect(wrapper.find('.gooey-text-field__error-message')).to.have.length(0);
  });

  it('should not render an error message container if no error message is passed', () => {
    const wrapper = render(<TextField isError />);
    expect(wrapper.find('.gooey-text-field__error-message')).to.have.length(0);
  });

  it('should add a placeholder text if requested', () => {
    const wrapper = render(<TextField placeholder="foo" />);
    expect(wrapper.find('input')[0].attribs.placeholder).to.eql('foo');
  });

  it('should show an error message when the maxContentLength is exceeded', () => {
    const wrapper = shallow(<TextField maxContentLength={3} />);
    wrapper.find('input').simulate('change', {
      target: {value: 'My new value'},
      persist: () => {},
    });
    expect(wrapper.find('.gooey-text-field__error-message')).to.have.length(1);
    expect(wrapper.find('.gooey-text-field--error')).to.have.length(1);
  });

  it('should trigger onChange callback with an error when the maxContentLength is exceeded', () => {
    const onChangeCallback = spy();
    const wrapper = shallow(<TextField onChange={onChangeCallback} maxContentLength={3} />);
    wrapper.find('input').simulate('change', {
      target: {value: 'My new value'},
      persist: () => {},
    });
    expect(onChangeCallback.args[0][1]).to.be.an('error');
  });

  it('should trigger an onChange callback function', () => {
    const onChangeCallback = spy();
    const wrapper = shallow(<TextField onChange={onChangeCallback} />);
    wrapper.find('input').simulate('change', {
      target: {value: 'a'},
      persist: () => {},
    });
    expect(onChangeCallback).to.have.property('callCount', 1);
  });

  it('should not attempt to trigger an onChange callback function is not passed', () => {
    const onChangeCallback = spy();
    const wrapper = shallow(<TextField />);
    wrapper.find('input').simulate('change', {
      target: {value: 'a'},
      persist: () => {},
    });
    expect(onChangeCallback).to.have.property('callCount', 0);
  });

  it('should properly create the ref for the input element', () => {
    const wrapper = mount(<TextField inputRef="inputEl" />);
    expect(wrapper.ref('inputEl').type()).to.eql('input');
  });

  it('should propagate additional valid props to the input element', () => {
    const focusCallback = spy();
    const wrapper = shallow(<TextField onFocus={focusCallback} />);
    wrapper.find('input').simulate('focus')
    expect(focusCallback).to.have.property('callCount', 1);
  });

  it('should set the proper value state if the prop is updated', () => {
    const wrapper = shallow(<TextField value="foo" />);
    expect(wrapper.state('textFieldValue')).to.eql('foo');
    wrapper.setProps({ value: 'bar' })
    expect(wrapper.state('textFieldValue')).to.eql('bar');
  });

  it('should not touch the state if props other than value change', () => {
    const stateSpy = spy(TextField.prototype, 'setState');
    const wrapper = shallow(<TextField value="foo" />);
    expect(stateSpy.callCount).to.eql(0);
    wrapper.setProps({ placeholder: 'updated placeholder' });
    expect(stateSpy.callCount).to.eql(0);
  });
});

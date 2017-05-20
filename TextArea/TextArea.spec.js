import React from 'react';
import TextArea from './TextArea';

describe('<TextArea />', () => {
  it('should render the textarea field', () => {
    const wrapper = render(<TextArea />);
    expect(wrapper).to.have.tagName('div');
  });

  it('should create a textarea field with an initial value', () => {
    const wrapper = render(<TextArea value="foo" />);
    expect(wrapper.find('textarea')).to.have.value('foo');
  });

  it('should create a disabled textarea field when requested', () => {
    const wrapper = render(<TextArea isDisabled />);
    expect(wrapper.find('textarea')[0].attribs.disabled).to.eql('');
  });

  it('should create a readonly textarea field when requested', () => {
    const wrapper = render(<TextArea isReadOnly />);
    expect(wrapper.find('textarea')[0].attribs.readonly).to.eql('');
  });

  it('should add an error class if an error state is passed', () => {
    const wrapper = render(<TextArea isError />);
    expect(wrapper.find('.gooey-text-area--error')).to.have.length(1);
  });

  it('should display an error message if error and a message is passed', () => {
    const wrapper = render(<TextArea isError errorMessage="an error" />);
    expect(wrapper.find('.gooey-text-area__error-message').text()).to.eql('an error');
  });

  it('should not render an error message if an error flag is not passed', () => {
    const wrapper = render(<TextArea errorMessage="an error" />);
    expect(wrapper.find('.gooey-text-area__error-message')).to.have.length(0);
  });

  it('should not render an error message container if no error message is passed', () => {
    const wrapper = render(<TextArea isError />);
    expect(wrapper.find('.gooey-text-area__error-message')).to.have.length(0);
  });

  it('should add a placeholder text if requested', () => {
    const wrapper = render(<TextArea placeholder="foo" />);
    expect(wrapper.find('textarea')[0].attribs.placeholder).to.eql('foo');
  });

  it('should show an error message when the maxContentLength is exceeded', () => {
    const wrapper = shallow(<TextArea maxContentLength={3} />);
    wrapper.find('textarea').simulate('change', {target: {value: 'My new value'}});
    expect(wrapper.find('.gooey-text-area__error-message')).to.have.length(1);
    expect(wrapper.find('.gooey-text-area--error')).to.have.length(1);
  });
});

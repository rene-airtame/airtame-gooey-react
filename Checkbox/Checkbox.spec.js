import React from 'react';
import Checkbox from './Checkbox';

describe('<Checkbox />', () => {
  it('should render the checkbox', () => {
    const wrapper = render(
      <Checkbox id="test-checkbox" label="test-checkbox" value="foo" />
    );
    expect(wrapper).to.have.tagName('div');
  });

  it('should not be checked by default', () => {
    const wrapper = render(
      <Checkbox id="test-checkbox" label="test-checkbox" value="foo" />
    );
    expect(wrapper.find('input')[0].attribs.checked).to.eql(undefined);
  });

  it('should be checked when requested', () => {
    const wrapper = render(
      <Checkbox id="test-checkbox" label="test-checkbox" value="foo" isChecked />
    );
    expect(wrapper.find('input')[0].attribs.checked).to.eql('');
  });

  it('should set the name prop properly', () => {
    const wrapper = render(
      <Checkbox id="text-checkbox" label="test checkbox" value="foo" name="myname" />
    );
    expect(wrapper.find('input')[0].attribs.name).to.eql('myname');
  });

  it('should not set the name attribute without a prop', () => {
    const wrapper = render(
      <Checkbox id="text-checkbox" label="test checkbox" value="foo" />
    );
    expect(wrapper.find('input')[0].attribs.name).to.eql(undefined);
  });

  it('should set the value prop properly', () => {
    const wrapper = render(
      <Checkbox id="text-checkbox" label="test checkbox" value="foo" />
    );
    expect(wrapper.find('input')[0].attribs.value).to.eql('foo');
  });

  it('should be disabled when requested', () => {
    const wrapper = render(
      <Checkbox id="test-checkbox" label="test-checkbox" value="foo" isDisabled />
    );
    expect(wrapper.find('input')[0].attribs.disabled).to.eql('');
  });

  it('should toggle on when unchecked and pressed', () => {
    const wrapper = shallow(
      <Checkbox id="test-checkbox" label="test-checkbox" value="foo" />
    );
    expect(wrapper.state('checked')).to.eql(false);
    wrapper.find('input').simulate('change', {
      target: { checked: true },
      persist: () => {},
    });
    expect(wrapper.state('checked')).to.eql(true);
  });

  it('should toggle off when checked and pressed', () => {
    const wrapper = shallow(
      <Checkbox id="test-checkbox" label="test-checkbox" value="foo" isChecked />
    );
    expect(wrapper.state('checked')).to.eql(true);
    wrapper.find('input').simulate('change', {
      target: { checked: false },
      persist: () => {},
    });
    expect(wrapper.state('checked')).to.eql(false);
  });

  it('should have a linked input and label', () => {
    const wrapper = render(
      <Checkbox id="test-checkbox" label="test-checkbox" value="foo" />
    );
    const inputId = wrapper.find('input')[0].attribs.id;
    const labelFor = wrapper.find('label')[0].attribs.for;
    expect(inputId).to.eql(labelFor);
  });

  it('should trigger the onChange callback function', () => {
    const onChangeCallback = spy();
    const wrapper = shallow(
      <Checkbox id="test-checkbox" label="test-checkbox" value="foo" onChange={onChangeCallback} />
    );
    expect(onChangeCallback).to.have.property('callCount', 0);
    wrapper.find('input').simulate('change', {
      target: { checked: true },
      persist: () => {},
    });
    expect(onChangeCallback).to.have.property('callCount', 1);
  });

  it('should properly create the ref for the input element', () => {
    const wrapper = mount(
      <Checkbox id="test-checkbox" label="test-checkbox" value="foo" inputRef="inputEl" />
    );
    expect(wrapper.ref('inputEl').type()).to.eql('input');
  });
});

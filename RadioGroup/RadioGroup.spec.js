import React from 'react';
import RadioGroup from './RadioGroup';

describe('<RadioGroup />', () => {
  it('should render the radio button group', () => {
    const radios = [{
      id: 'foo',
      label: 'Foo',
      value: 'foo',
      isDisabled: false,
    }];
    const wrapper = render(
      <RadioGroup name="test-radio" data={radios} active="foo" />
    );
    expect(wrapper).to.have.tagName('ul');
  });

  it('should make the first radio checked by default', () => {
    const radios = [{
      id: 'foo',
      label: 'Foo',
      value: 'foo',
    }, {
      id: 'bar',
      label: 'Bar',
      value: 'bar',
    }];
    const wrapper = render(
      <RadioGroup name="test-radio" data={radios} />
    );
    expect(wrapper.find('#foo')[0].attribs.checked).to.eql('');
  });

  it('should make the requested radio checked', () => {
    const radios = [{
      id: 'foo',
      label: 'Foo',
      value: 'foo',
    }, {
      id: 'bar',
      label: 'Bar',
      value: 'bar',
    }];
    const wrapper = render(
      <RadioGroup name="test-radio" data={radios} active="bar" />
    );
    expect(wrapper.find('#foo')[0].attribs.checked).to.eql(undefined);
    expect(wrapper.find('#bar')[0].attribs.checked).to.eql('');
  });

  it('should toggle two radios', () => {
    const radios = [{
      id: 'foo',
      label: 'Foo',
      value: 'foo',
    }, {
      id: 'bar',
      label: 'Bar',
      value: 'bar',
    }];
    const wrapper = shallow(
      <RadioGroup name="test-radio" data={radios} active="foo" />
    );

    expect(wrapper.state('active')).to.eql('foo');
    wrapper.find('#bar').simulate('change', { target: { value: 'bar' } });
    expect(wrapper.state('active')).to.eql('bar');
  });

  it('should disable individual radios', () => {
    const radios = [{
      id: 'foo',
      label: 'Foo',
      value: 'foo',
    }, {
      id: 'bar',
      label: 'Bar',
      value: 'bar',
      isDisabled: true
    }];
    const wrapper = render(
      <RadioGroup name="test-radio" data={radios} active="foo" />
    );
    expect(wrapper.find('#foo')[0].attribs.disabled).to.eql(undefined);
    expect(wrapper.find('#bar')[0].attribs.disabled).to.eql('');
  });

  it('should disable all radios', () => {
    const radios = [{
      id: 'foo',
      label: 'Foo',
      value: 'foo',
    }, {
      id: 'bar',
      label: 'Bar',
      value: 'bar',
    }];
    const wrapper = render(
      <RadioGroup name="test-radio" data={radios} active="foo" isDisabled={true} />
    );
    expect(wrapper.find('input:disabled')).to.have.length(2);
  });

  it('should have a linked input and label', () => {
    const radios = [{
      id: 'foo',
      label: 'Foo',
      value: 'foo',
    }, {
      id: 'bar',
      label: 'Bar',
      value: 'bar',
    }];
    const wrapper = render(
      <RadioGroup name="test-radio" data={radios} active="foo" />
    );

    const fooID = wrapper.find('input')[0].attribs.id;
    const fooLabel = wrapper.find('label')[0].attribs.for;
    expect(fooID).to.eql(fooLabel);

    const barID = wrapper.find('input')[1].attribs.id;
    const barLabel = wrapper.find('label')[1].attribs.for;
    expect(barID).to.eql(barLabel);
  });

  it('should trigger the onChange callback function', () => {
    const onChangeCallback = spy();
    const radios = [{
      id: 'foo',
      label: 'Foo',
      value: 'foo',
    }, {
      id: 'bar',
      label: 'Bar',
      value: 'bar',
    }];
    const wrapper = shallow(
      <RadioGroup name="test-radio" data={radios} active="foo" onChange={onChangeCallback} />
    );
    expect(onChangeCallback).to.have.property('callCount', 0);
    wrapper.find('#bar').simulate('change', { target: { value: 'bar' } });
    expect(onChangeCallback).to.have.property('callCount', 1);
  });

});

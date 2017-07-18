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
    wrapper.find('#bar').simulate('change', {
      target: { value: 'bar' },
      persist: () => {},
    });
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
    wrapper.find('#bar').simulate('change', {
      target: { value: 'bar' },
      persist: () => {},
    });
    expect(onChangeCallback).to.have.property('callCount', 1);
  });

  it('should properly set refs for the radios', () => {
    const radios = [{
      id: 'foo',
      label: 'Foo',
      value: 'foo',
      ref: 'firstInput'
    }, {
      id: 'bar',
      label: 'Bar',
      value: 'bar',
      ref: 'secondInput'
    }];
    const wrapper = mount(
      <RadioGroup name="test-radio" data={radios} active="foo" />
    );
    expect(wrapper.ref('firstInput').is('#foo')).to.eql(true);
    expect(wrapper.ref('secondInput').is('#bar')).to.eql(true);
  });

  it('should add valid additional props to specified radios', () => {
    const focusCallback = spy();
    const radios = [{
      id: 'foo',
      label: 'Foo',
      value: 'foo',
      ref: 'firstInput',
      props: {
        onFocus: focusCallback
      }
    }, {
      id: 'bar',
      label: 'Bar',
      value: 'bar',
      ref: 'secondInput'
    }];
    const wrapper = shallow(
      <RadioGroup name="test-radio" data={radios} active="foo" />
    );
    wrapper.find('#foo').simulate('focus')
    expect(focusCallback).to.have.property('callCount', 1);
  });

  it('should set the proper state if the active prop is updated', () => {
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
    wrapper.setProps({ active: 'bar' })
    expect(wrapper.state('active')).to.eql('bar');
  });

  it('should set the proper state if the data prop is updated', () => {
    const radios = [{
      id: 'foo',
      label: 'Foo',
      value: 'foo',
    }, {
      id: 'bar',
      label: 'Bar',
      value: 'bar',
    }];

    const radios2 = [{
      id: 'foo2',
      label: 'Foo2',
      value: 'foo2',
    }, {
      id: 'bar2',
      label: 'Bar2',
      value: 'bar2',
    }];
    const wrapper = shallow(
      <RadioGroup name="test-radio" data={radios} />
    );
    expect(wrapper.state('active')).to.eql('foo');
    wrapper.setProps({ data: radios2 })
    expect(wrapper.state('active')).to.eql('foo2');
  });

  it('should not touch the state if invalid props change', () => {
    const stateSpy = spy(RadioGroup.prototype, 'setState');
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
    expect(stateSpy.callCount).to.eql(0);
    wrapper.setProps({ name: 'updated-name' });
    expect(stateSpy.callCount).to.eql(0);
  });

  it('should not touch the state if the data prop doesnt change', () => {
    const radios = [{
      id: 'foo',
      label: 'Foo',
      value: 'foo',
    }, {
      id: 'bar',
      label: 'Bar',
      value: 'bar',
    }];

    const radios2 = [{
      id: 'foo',
      label: 'Foo',
      value: 'foo',
    }, {
      id: 'bar',
      label: 'Bar',
      value: 'bar',
    }];
    const wrapper = shallow(
      <RadioGroup name="test-radio" data={radios} active="bar" />
    );
    expect(wrapper.state('active')).to.eql('bar');
    wrapper.setProps({ data: radios2 })
    expect(wrapper.state('active')).to.eql('bar');
  });

});

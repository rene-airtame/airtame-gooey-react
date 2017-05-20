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
});

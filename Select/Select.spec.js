import React from 'react';
import Select from './Select';

const options = [
  {
    id: 'articuno',
    value: 'Articuno'
  },
  {
    id: 'zapdos',
    label: 'El Zapdos',
    value: 'Zapdos'
  },
  {
    id: 'moltres',
    value: 'Moltres',
    isDisabled: true,
  }
];

describe('<Select />', () => {
  it('should render the select field', () => {
    const wrapper = render(<Select options={options} />);
    expect(wrapper).to.have.tagName('div');
  });

  it('should create a multifield select if requested', () => {
    const wrapper = render(<Select options={options} isMultiline={true} />);
    expect(wrapper.find('select')[0].attribs.multiple).to.eql('');
  });

  it('should create a disabled select if requested', () => {
    const wrapper = render(<Select options={options} isDisabled={true} />);
    expect(wrapper.find('select')[0].attribs.disabled).to.eql('');
  });

  it('should add an error className if is error', () => {
    const wrapper = shallow(<Select options={options} isError={true} />);
    expect(wrapper.find('.gooey-select--error')).to.have.length(1);
  });

  it('should mark the requested value as selected', () => {
    const wrapper = shallow(<Select options={options} selected="zapdos" />);
    expect(wrapper.state('selected')).to.eql('Zapdos');
  });

  it('should use the state to keep track of the selected value', () => {
    const wrapper = render(<Select options={options} selected="zapdos" />);
    expect(wrapper.find('option')[1].attribs.selected).to.eql('');
  });

  it('should set a requested option as disabled', () => {
    const wrapper = render(<Select options={options} />);
    expect(wrapper.find('option')[2].attribs.disabled).to.eql('');
  });

  it('should set the first value as selected when no selected is specified', () => {
    const wrapper = shallow(<Select options={options} />);
    expect(wrapper.state('selected')).to.eql('Articuno');
  });

  it('should update the state when the select value changes', () => {
    const o = options;
    delete o[2].isDisabled;
    const wrapper = mount(<Select options={o} />);
    wrapper.find('select').simulate('change', { target: { value: 'Moltres' } });
    expect(wrapper.state('selected')).to.eql('Moltres');
  });

  it('should trigger a callback function when a callback is available', () => {
    const onChangeCall = spy();
    const wrapper = mount(<Select options={options} onChange={onChangeCall} />);
    expect(onChangeCall).to.have.property('callCount', 0);
    wrapper.find('select').simulate('change', { target: { value: 'moltres' } });
    expect(onChangeCall).to.have.property('callCount', 1);
  });
});

import React from 'react';
import Select from './Select';

const options = [
  {
    id: 'articuno',
    label: 'Articuno',
    value: 'Articuno'
  },
  {
    id: 'zapdos',
    label: 'El Zapdos',
    value: 'Zapdos'
  },
  {
    id: 'moltres',
    label: 'Moltres',
    value: 'Moltres',
    isDisabled: true,
  }
];

describe('<Select />', () => {
  it('should render the select field', () => {
    const wrapper = render(<Select options={options} />);
    expect(wrapper).to.have.tagName('div');
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

  it('should set a requested option as disabled', () => {
    const wrapper = render(<Select options={options} />);
    expect(wrapper.find('option')[2].attribs.disabled).to.eql('');
  });

  it('should set the first value as selected when no selected is specified', () => {
    const wrapper = shallow(<Select options={options} />);
    expect(wrapper.state('selected')).to.eql('Articuno');
  });

  it('should update the state when the select value changes', () => {
    const o = options.slice(0);
    delete o[2].isDisabled;
    const wrapper = mount(<Select options={o} />);
    wrapper.find('select').simulate('change', {
      target: { value: 'Moltres' },
      persist: () => {},
    });
    expect(wrapper.state('selected')).to.eql('Moltres');
  });

  it('should trigger a callback function when a callback is available', () => {
    const onChangeCall = spy();
    const wrapper = mount(<Select options={options} onChange={onChangeCall} />);
    expect(onChangeCall).to.have.property('callCount', 0);
    wrapper.find('select').simulate('change', {
      target: { value: 'moltres' },
      persist: () => {},
    });
    expect(onChangeCall).to.have.property('callCount', 1);
  });

  it('should properly create the ref for the select element', () => {
    const wrapper = mount(<Select options={options} selectRef="selectEl" />);
    expect(wrapper.ref('selectEl').type()).to.eql('select');
  });

  it('should propagate additional valid props to the select element', () => {
    const focusCallback = spy();
    const wrapper = shallow(
      <Select options={options} onFocus={focusCallback} />
    );
    wrapper.find('select').simulate('focus')
    expect(focusCallback).to.have.property('callCount', 1);
  });


  it('should set the proper state if the selected prop is updated', () => {
    const wrapper = shallow(
      <Select options={options} selected="zapdos" />
    );
    expect(wrapper.state('selected')).to.eql('Zapdos');
    wrapper.setProps({ selected: 'articuno' })
    expect(wrapper.state('selected')).to.eql('Articuno');
  });

  it('should set the proper state if the options prop is updated', () => {
    const newOptions = [
      { id: 'a', label: 'a', value: 'a' },
      { id: 'b', label: 'b', value: 'b' },
    ];

    const wrapper = shallow(<Select options={options} />);
    expect(wrapper.state('selected')).to.eql('Articuno');

    wrapper.setProps({ options: newOptions })
    expect(wrapper.state('selected')).to.eql('a');
  });

  it('should not touch the state if invalid props change', () => {
    const stateSpy = spy(Select.prototype, 'setState');
    const wrapper = shallow(
      <Select options={options} selected="zapdos" />
    );
    expect(stateSpy.callCount).to.eql(0);
    wrapper.setProps({ isError: true });
    expect(stateSpy.callCount).to.eql(0);
  });

  it('should not touch the state if the options prop doesnt change', () => {
     const newOptions = [
      {
        id: 'articuno',
        label: 'Articuno',
        value: 'Articuno'
      },
      {
        id: 'zapdos',
        label: 'El Zapdos',
        value: 'Zapdos'
      },
      {
        id: 'moltres',
        label: 'Moltres',
        value: 'Moltres',
        isDisabled: true,
      }
    ];
    const wrapper = shallow(
      <Select options={options} selected="zapdos" />
    );
    expect(wrapper.state('selected')).to.eql('Zapdos');
    wrapper.setProps({ options: newOptions })
    expect(wrapper.state('selected')).to.eql('Zapdos');
  });
});

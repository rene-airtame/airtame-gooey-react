import React from 'react';
import Collapser from './Collapser';

describe('<Collapser />', () => {
  it('should render the collapser', () => {
    const wrapper = render(<Collapser title="Test">content</Collapser>);
    expect(wrapper).to.have.tagName('div');
  });

  it('should properly use the title prop', () => {
    const wrapper = shallow(<Collapser title="Test">content</Collapser>);
    expect(wrapper.find('h2').contains('Test')).to.eql(true);
  });

  it('should not render extra tags if no title is wanted', () => {
    const wrapper = shallow(<Collapser>content</Collapser>);
    expect(wrapper.find('h2')).to.have.length(0);
  });


  it('should initialize open without collapsed prop', () => {
    const wrapper = shallow(<Collapser title="Test">content</Collapser>);
    expect(wrapper.find('.gooey-collapser__container--expanded')).to.have.length(1);
  });

  it('should initialize closed with collapsed prop set to true', () => {
    const wrapper = shallow(<Collapser title="Test" collapsed>content</Collapser>);
    expect(wrapper.find('.gooey-collapser__container--expanded')).to.have.length(0);
  });

  it('should toggle from open to close and viceversa', () => {
    const wrapper = mount(<Collapser title="Test">content</Collapser>);

    wrapper.setState({collapsed: true});
    expect(wrapper.find('.gooey-collapser__container--expanded')).to.have.length(0);

    wrapper.setState({collapsed: false});
    expect(wrapper.find('.gooey-collapser__container--expanded')).to.have.length(1);
  });

  it('should update the component state when clicking the toggle button', () => {
    const wrapper = mount(<Collapser title="Test">content</Collapser>);

    wrapper.find('button').simulate('click');
    expect(wrapper.state('collapsed')).to.eql(true);

    wrapper.find('button').simulate('click');
    expect(wrapper.state('collapsed')).to.eql(false);
  });

  it('should hide the content when collapsed', () => {
    const wrapper = render(<Collapser title="Test">content</Collapser>);
    expect(wrapper.find('.gooey-collapser__container')).to.have.style('height', 'auto');
  });
});

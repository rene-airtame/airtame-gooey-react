import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'core-js/es6/map';
import 'core-js/es6/set';

configure({ adapter: new Adapter() });

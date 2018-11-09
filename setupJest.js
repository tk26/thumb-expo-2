import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16.3';
configure({ adapter: new Adapter() });

global.fetch = require('jest-fetch-mock');

function FormDataMock() {
  this.append = jest.fn();
}
global.FormData = FormDataMock

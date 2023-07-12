import renderer from 'react-test-renderer';
import LoginAdmin from './LoginAdmin';
import {describe,test} from '@jest/globals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import {Store} from "../../store";
describe('LoginAdmin.js should work as expected', ()=>{
  test('LoginAdmin.js should match with snapshot',()=>{
    const comp = renderer
    .create(
     <BrowserRouter>
      <Provider store={Store}>
        <LoginAdmin/>
      </Provider>
     </BrowserRouter>
      )
    .toJSON();

    expect (comp).toMatchSnapshot();
  });
});
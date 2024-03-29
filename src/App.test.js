import renderer from 'react-test-renderer';
import App from './App.js';
import {describe,test} from '@jest/globals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import {Store} from "./store";
describe('app.js should work as expected', ()=>{
  test('app.js should match with snapshot',()=>{
    const comp = renderer
    .create(
     <BrowserRouter>
      <Provider store={Store}>
        <App/>
      </Provider>
     </BrowserRouter>
      )
    .toJSON();

    expect (comp).toMatchSnapshot();
  });
});
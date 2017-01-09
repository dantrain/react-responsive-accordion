import React from 'react';
import ReactDOM from 'react-dom';
import { take, random } from 'lodash';
import App from './App';
import './index.css';

const lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
anim id est laborum.`.split(' ');

const list = [];

for (let i = 0; i < 20; i++) {
  list.push(i + 1);
}

const data = list.map(item => ({
  id: item,
  content: item + ' ' + take(lorem, random(5, lorem.length)).join(' ')
}));

ReactDOM.render(
  <App data={data} />,
  document.getElementById('root')
);

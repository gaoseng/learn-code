// import React from 'react'
import reactDOM from './react-dom';
import React from './react';

let element = (
  <div id="A1">
    A1
    <div id="B1">
      B1
      <div id="C1">C1</div>
      <div id="C2">C2</div>
    </div>
    <div id="B2">B2</div>
  </div>
)
reactDOM.render(element, document.getElementById('root'));
let element2 = (
  <div id="A1-new">
    A1-new
    <div id="B1-new">
      B1-new
      <div id="C1-new">C1-new</div>
      <div id="C2-new">C2-new</div>
    </div>
    <div id="B2-new">B2-new</div>
    <div id="B3-new">B3-new</div>
  </div>
)
let render2 = document.getElementById('render2');
render2.addEventListener('click', () => {
  reactDOM.render(element2, document.getElementById('root'));
})
let element3 = (
  <div id="A1-new">
    A1-new
    <div id="B1-new">
      B1-new
      <div id="C1-new">C1-new</div>
      <div id="C2-new">C2-new</div>
    </div>
  </div>
)
let render3 = document.getElementById('render3');
render3.addEventListener('click', () => {
  reactDOM.render(element3, document.getElementById('root'));
})
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
// console.log(element)
//  element = React.createElement("div", {
//   id: "A1"
// }, React.createElement("div", {
//   id: "B1"
// }, React.createElement("div", {
//   id: "C1"
// }, "C1"), React.createElement("div", {
//   id: "C2"
// }, "C2")), React.createElement("div", {
//   id: "B2"
// }));
console.log(element);
reactDOM.render(element, document.getElementById('root'));
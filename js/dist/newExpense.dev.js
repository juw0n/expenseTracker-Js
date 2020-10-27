"use strict";

var entryForm = document.getElementById("enteries");
var expDes = document.getElementById('textField');
var fdBack1 = document.getElementById('feedBack1');
var expAmt = document.getElementById('amount');
var fdBack2 = document.getElementById('feedBack2');
var addItem = document.getElementById('addItem');
var UList = document.getElementById('UList');
var income = document.getElementById('tIncomes');
var expense = document.getElementById('tExpenses');
var balance = document.getElementById('tBalances');
var deleteAll = document.getElementById('clearAll');

function newTrack(e) {
  e.preventDefault();

  if (expDes.value === '' && expAmt.value !== '') {
    fdBack1.innerHTML = 'You have to enter a Description';
    fdBack2.innerHTML = '';
  } else if (expDes.value !== '' && expAmt.value === '') {
    fdBack1.innerHTML = '';
    fdBack2.innerHTML = 'You have to enter an amount';
  } else if (expDes.value === '' && expAmt.value === '') {
    fdBack1.innerHTML = 'You have to enter a Description';
    fdBack2.innerHTML = 'You have to enter an amount';
  } else {
    addToList(expDes.value, expAmt.value);
    totalIncome(expAmt.value);
    expDes.value = '';
    expAmt.value = '';
    fdBack1.innerHTML = '';
    fdBack2.innerHTML = '';
  }
}

addItem.addEventListener('click', newTrack, false);

function addToList(a, b) {
  var li = document.createElement('li');
  li.className = 'trackItem';
  li.appendChild(document.createTextNode(a));
  li.appendChild(document.createTextNode('$' + b));
  var removeTrack = document.createElement('button');
  removeTrack.setAttribute('id', 'deleteTrack');
  removeTrack.textContent = 'X';
  removeTrack.addEventListener('click', deleteItemList, false);
  li.appendChild(removeTrack);
  UList.appendChild(li);
} //function to calculate totalIncome


function totalIncome(x) {
  var sum = [];
  var total = 0;

  if (x > 0) {
    sum.push(Number(x));

    for (i in sum) {
      // income.value = total + sum[i];
      income.value = total + sum[i];
    }
  }
} // Delete an item from the list


function deleteItemList() {
  //alert('remove this Item!');
  var li = this.parentNode;
  li.remove();
} //function to clear all list item


var deleteAll = document.getElementById('clearAll');

function clearList() {
  UList.innerHTML = '';
}

deleteAll.addEventListener('click', clearList, false);
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

// Function to check and take inputs from user
function newTrack(e) {
    e.preventDefault();
    if (expDes.value === '' && expAmt.value !== '') {
        fdBack1.innerHTML = 'Enter a Description';
        fdBack2.innerHTML = '';
    } else if (expDes.value !== '' && expAmt.value === '') {
        fdBack1.innerHTML = '';
        fdBack2.innerHTML = 'Enter an amount';
    } else if (expDes.value === '' && expAmt.value === '') {
        fdBack1.innerHTML = 'Enter a Description';
        fdBack2.innerHTML = 'Enter an amount';
    } else {
        addToList(expDes.value, parseFloat(expAmt.value));
        tIncomesExpenses(parseFloat(expAmt.value));
        expDes.value = '';
        expAmt.value = '';
        fdBack1.innerHTML = '';
        fdBack2.innerHTML = '';
        expDes.focus();
        balance.value = tBalance();
    }
}
addItem.addEventListener('click', newTrack, false);

// Funtion to add the user input to the list
function addToList(a, b) {
    var li = document.createElement('li');
    li.className = 'trackItem';
    var removeTrack = document.createElement('button');
        removeTrack.setAttribute('id', 'deleteTrack');
        removeTrack.textContent = 'X';
        removeTrack.addEventListener('click', deleteItemList, false);
    li.appendChild(document.createTextNode(a));
    // li.textContent = parseFloat(a);
    var price = document.createElement('span')
    price.setAttribute('id', 'prices');
    price.appendChild(document.createTextNode(b));
    if (b > 0) {
        li.setAttribute('class', 'incomePrice');
    } else {
        li.setAttribute('class', 'expensePrice');
    }
    li.appendChild(removeTrack);
    li.appendChild(price);
    UList.appendChild(li);
}

//function to calculate totalIncome
let sumIncome = [];
let sumExpense = [];
function tIncomesExpenses(x) { 
    X = parseFloat(x);
    if (X >= 0) {
        sumIncome.push(X);
        addt = sumIncome.reduce((p, q) => p + q, 0);
        income.value = addt.toFixed(2);
    } else {
        sumExpense.push(X);
        subt = sumExpense.reduce((p, q) => p + q, 0);
        expense.value = subt.toFixed(2);
    }
}


// Delete an item from the list and remove the price
function deleteItemList() {
    // function to remove item from list
    var li = this.parentNode;
    li.remove();

    var expenseAmount = parseFloat(li.lastElementChild.innerText);
    console.log(expenseAmount);
    console.log(typeof expenseAmount);
    console.log(sumIncome);
    console.log(sumExpense);
    if (expenseAmount > 0) {
        if (sumIncome.includes(expenseAmount)) {
            var indexAmountDelete = sumIncome.indexOf(expenseAmount);
            console.log(indexAmountDelete);   
            sumIncome.splice(indexAmountDelete, 1);
            // console.log(sumIncome);
            addt2 = sumIncome.reduce((p, q) => p + q, 0);
            income.value = addt2.toFixed(2);

            balance.value = tBalance();
        }
    } else {
        if (sumExpense.includes(expenseAmount)) {
            var indexAmountDelete = sumExpense.indexOf(expenseAmount);
            console.log(indexAmountDelete);   
            sumExpense.splice(indexAmountDelete, 1);
            console.log(sumExpense);
            subt2 = sumExpense.reduce((p, q) => p + q, 0);
            expense.value = subt2.toFixed(2);

            balance.value = tBalance();
        }
    }    
}

//function to clear all list item
var deleteAll = document.getElementById('clearAll');
function clearList() {
    UList.innerHTML = '';
    income.value = parseFloat(0).toFixed(2);
    expense.value = parseFloat(0).toFixed(2);
    balance.value = parseFloat(0).toFixed(2);
    expDes.value = '';
    expAmt.value = '';
    fdBack1.innerHTML = '';
    fdBack2.innerHTML = '';
    sumIncome = [];
    sumExpense = [];
}
deleteAll.addEventListener('click', clearList, false)

// Making the total amount field non-editable
income.readOnly = true;
expense.readOnly = true;
balance.readOnly = true;

function tBalance() {
    var elTincomes = parseFloat(income.value);
    var elTexpenses = parseFloat(expense.value);
    var elBalance = eval(elTincomes + elTexpenses);
    return elBalance.toFixed(2);
}
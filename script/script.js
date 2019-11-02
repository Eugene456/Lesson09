'use strict';

let start = document.getElementById('start'),
	cancel = document.getElementById('cancel'),
	buttons = document.getElementsByTagName('button'),
	 incomePlus = buttons[0],
	 expensesPlus = buttons[1],
	 depositCheck = document.querySelector('#deposit-check'),
	 addIncomeItem = document.querySelectorAll('.additional_income-item'),
	 budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
	 budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
	 expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
	 addIncomeValue = document.getElementsByClassName('additional_income-value')[0],
	 addExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
	 incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
	 targetMonthValue = document.getElementsByClassName('target_month-value')[0],
	 salaryAmount = document.querySelector('.salary-amount'),
	 incomeItems = document.querySelectorAll('.income-items'),
	 incomeTitle = incomeItems[0],
	 incomeAmount = document.querySelector('.income-amount'),
	 expensesItems = document.querySelectorAll('.expenses-items'),
	 expensesTitle = expensesItems[0],
	 expensesAmount = document.querySelector('.expenses-amount'),
	 addExpensesItem = document.querySelector('.additional_expenses-item'),
	 targetAmount = document.querySelector('.target-amount'),
	 periodSelect = document.querySelector('.period-select'),
	 periodAmount = document.querySelector('.period-amount'),
	 data = document.querySelector('.data'),
	 inputData = data.querySelectorAll('input'),
	 reset = document.getElementById('cancel');
	 
	

let appData = {
	budget: 0,
	budgetDay: 0,
	budgetMonth: 0,
	expensesMonth: 0,
	income: {},
	incomeMonth: 0,
	expenses: {},
	addIncome: [],
	addExpenses: [],
	deposit: false,

	start: function() {
		appData.budget = Number(salaryAmount.value);
		appData.getExpenses();
		appData.getIncome();
		appData.getExpensesMonth();
		appData.getTargetMonth();
		appData.getAddExpenses();
		appData.getAddIncome();
		appData.getBudget();
		appData.showResult();
	
	},

	showResult: function(){
		budgetMonthValue.value = this.budgetMonth;
		budgetDayValue.value = this.budgetDay;
		expensesMonthValue.value = this.expensesMonth;
		addExpensesValue.value = this.addExpenses.join(', ');
		addIncomeValue.value = this.addIncome.join(', ');
		targetMonthValue.value = Math.ceil(this.getTargetMonth());
		incomePeriodValue.value = this.calcPeriod();
		
	},
	addExpensesBlock: function(){
		
		let cloneExpensesItem = expensesItems[0].cloneNode(true);
		let inputsClone = cloneExpensesItem.querySelectorAll('input');
		inputsClone.forEach(function(item){
			item.value = '';
			onlyNum(item);
			onlyText(item);

		})
		expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
		expensesItems = document.querySelectorAll('.expenses-items');
		if(expensesItems.length == 3){
			expensesPlus.style.display = 'none';
		}
		
	},
	getExpenses: function(){
		expensesItems.forEach(function(item){
			let itemExpenses = item.querySelector('.expenses-title').value;
			let cashExpenses = item.querySelector('.expenses-amount').value;
			if(itemExpenses !== '' && cashExpenses !== ''){
				appData.expenses[itemExpenses] = Number(cashExpenses);
			}
		})
		
	},

	addIncomeBlock: function(){
		
		let cloneIncomeItem = incomeItems[0].cloneNode(true);
		let inputsClone = cloneIncomeItem.querySelectorAll('input');
		inputsClone.forEach(function(item){
			item.value = '';
			onlyNum(item);
			onlyText(item);
		})
		incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
		incomeItems = document.querySelectorAll('.income-items');
		if(incomeItems.length == 3){
			incomePlus.style.display = 'none';
		}
		
		
	},
	getIncome: function(){
		incomeItems.forEach(function(item){
			let itemIncome = item.querySelector('.income-title').value;
			let cashIncome = item.querySelector('.income-amount').value;
			if (itemIncome !== '' && cashIncome !== ''){
				appData.income[itemIncome] = Number(cashIncome);
			}

		})
		for (let key in this.income){
			this.incomeMonth += +this.income[key];
		}
	},
	
	getExpensesMonth: function() {
		for (let keys in this.expenses){
			this.expensesMonth += this.expenses[keys];
		}
		console.log(this);
	},

	getBudget:function() { 
		 this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
		 this.budgetDay = Math.floor(this.budgetMonth / 30);
		 
	},

	getTargetMonth:function() { 
		return targetAmount.value / this.budgetMonth;
	},
/*
	getStatusIncome:function () {
		if(0 <= appData.budgetDay && appData.budgetDay < 300){
			return 'Низкий уровень дохода';
		} else if (300 <= appData.budgetDay && appData.budgetDay < 800) {
			return 'Средний уровень дохода';
		} else if (800 <= appData.budgetDay) {
			return 'Высокий уровень дохода';
		} else {
			return 'Что-то пошло не так';
		}
	},*/
	calcPeriod: function(){
		return this.budgetMonth * periodSelect.value;
	},
	getAddExpenses: function(){
		let addExpenses = addExpensesItem.value.split(',');
		addExpenses.forEach(function(item){
			item = item.trim();
			if(item !== ''){
				appData.addExpenses.push(item);
			}
		})
	},
	getAddIncome: function(){
		addIncomeItem.forEach(function(item){
			let itemValue = item.value.trim();
			if(itemValue !== ''){
				appData.addIncome.push(itemValue);
			}
		})
	},
	
}

block();
function block(){	
start.setAttribute('disabled', 'disabled');	
salaryAmount.addEventListener('input', function(){
	let trimValue = salaryAmount.value.trim();
	let check = trimValue.split('');
	if (check.length == 0){
		start.setAttribute('disabled', 'disabled');
	} else if(salaryAmount.value == Number(salaryAmount.value)){
		start.removeAttribute('disabled');
	} else{
		start.setAttribute('disabled', 'disabled');
	}
})
}

function onlyNum(item){
    if(item.hasAttribute('placeholder')){
        if (item.placeholder == 'Сумма'){
           item.addEventListener('input', removeNotNumbers);
    
       }
    }
}


function onlyText(item){
    if(item.hasAttribute('placeholder')){
        if (item.placeholder == 'Наименование'){

           item.addEventListener('input', removeNotText);
    
       }
    }
}

inputData.forEach(function(item){
	onlyNum(item);
	onlyText(item);
	});

function removeNotNumbers(){
    this.value = this.value.replace(/[^0-9]/g, '')
}
function removeNotText(){
	this.value = this.value.replace(/\w/g, '')
}



periodSelect.addEventListener('change', function(){
	periodAmount.innerHTML = periodSelect.value;
	incomePeriodValue.value = appData.calcPeriod();

})
//appData.start.apply(appData);
start.addEventListener('click', appData.start.bind(appData));

start.addEventListener('click', function(){
	start.style.display = 'none';
	cancel.style.display = 'block';
	inputData = data.querySelectorAll('input');
	inputData.forEach(function(item, i){
		item.setAttribute('disabled', 'disabled');
	})
	inputData[inputData.length - 1].removeAttribute('disabled');
	incomePlus.style.display = 'none';
	expensesPlus.style.display = 'none';
})

expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);

reset.addEventListener('click', function(){
	let inputs = document.querySelectorAll('input');
	expensesItems.forEach(function(item, i) {
		if(i > 0){
			expensesItems[i].remove();
		}

	})
	incomeItems.forEach(function(item, i) {
		if(i > 0){
			incomeItems[i].remove();
		}

	})
	incomePlus.style.display = 'block';
	expensesPlus.style.display = 'block';
	
	appData.budget = 0;
	appData.budgetDay = 0;
	appData.budgetMonth =0;
	appData.expensesMonth = 0;
	appData.income = {};
	appData.incomeMonth = 0;
	appData.expenses = {};
	appData.addIncome = [];
	appData.addExpenses = [];
	appData.deposit = false;

	periodSelect.value = 1;
	inputs.forEach(function(item){
		item.value = '';
	})
	inputData.forEach(function(item, i){
		item.removeAttribute('disabled');
	})
	start.style.display = 'block';
	cancel.style.display = 'none';
	block();
})
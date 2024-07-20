import React, { Component } from 'react'
import TransactionItem from '../TransactionItem/TranscationItem'
import './index.css'

const transactionTypeOptions = [
  { optionId: 'INCOME', displayText: 'Income' },
  { optionId: 'EXPENSE', displayText: 'Expense' },
]

class MoneyManager extends Component {
  state = {
    transactionsList: [],
    title: '',
    amount: '',
    type: transactionTypeOptions[0].optionId,
  }

  onAddTransaction = event => {
    event.preventDefault()
    const { title, amount, type } = this.state
    const newTransaction = {
      id: new Date().getTime().toString(),
      title,
      amount: parseInt(amount),
      type,
    }
    this.setState(prevState => ({
      transactionsList: [...prevState.transactionsList, newTransaction],
      title: '',
      amount: '',
      type: transactionTypeOptions[0].optionId,
    }))
  }

  onDeleteTransaction = id => {
    const { transactionsList } = this.state
    const updatedTransactionsList = transactionsList.filter(
      eachTransaction => eachTransaction.id !== id,
    )
    this.setState({ transactionsList: updatedTransactionsList })
  }

  onChangeTitle = event => {
    this.setState({ title: event.target.value })
  }

  onChangeAmount = event => {
    this.setState({ amount: event.target.value })
  }

  onChangeType = event => {
    this.setState({ type: event.target.value })
  }

  calculateBalance = () => {
    const { transactionsList } = this.state
    let income = 0
    let expenses = 0
    transactionsList.forEach(eachTransaction => {
      if (eachTransaction.type === 'INCOME') {
        income += eachTransaction.amount
      } else {
        expenses += eachTransaction.amount
      }
    })
    return income - expenses
  }

  calculateIncome = () => {
    const { transactionsList } = this.state
    let income = 0
    transactionsList.forEach(eachTransaction => {
      if (eachTransaction.type === 'INCOME') {
        income += eachTransaction.amount
      }
    })
    return income
  }

  calculateExpenses = () => {
    const { transactionsList } = this.state
    let expenses = 0
    transactionsList.forEach(eachTransaction => {
      if (eachTransaction.type === 'EXPENSE') {
        expenses += eachTransaction.amount
      }
    })
    return expenses
  }

  render() {
    const { transactionsList, title, amount, type } = this.state
    const balance = this.calculateBalance()
    const income = this.calculateIncome()
    const expenses = this.calculateExpenses()

    return (
      <div className="money-manager-container">
        <div className="header-container">
          <h1 className="heading">Money Manager</h1>
          <img
            src="https://assets.ccbp.in/frontend/react-js/money-manager/money-manager-bg.png"
            alt="money manager"
            className="money-manager-image"
          />
        </div>
        <div className="money-details-container">
          <div className="money-detail-item balance">
            <img
              src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
              alt="balance"
              className="money-detail-icon"
            />
            <div>
              <p className="money-detail-title">Your Balance</p>
              <p className="money-detail-amount" data-testid="balanceAmount">
                Rs {balance}
              </p>
            </div>
          </div>
          <div className="money-detail-item income">
            <img
              src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
              alt="income"
              className="money-detail-icon"
            />
            <div>
              <p className="money-detail-title">Your Income</p>
              <p className="money-detail-amount" data-testid="incomeAmount">
                Rs {income}
              </p>
            </div>
          </div>
          <div className="money-detail-item expenses">
            <img
              src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
              alt="expenses"
              className="money-detail-icon"
            />
            <div>
              <p className="money-detail-title">Your Expenses</p>
              <p className="money-detail-amount" data-testid="expensesAmount">
                Rs {expenses}
              </p>
            </div>
          </div>
        </div>
        <div className="form-transactions-container">
          <form className="transaction-form" onSubmit={this.onAddTransaction}>
            <h2 className="form-title">Add Transaction</h2>
            <label htmlFor="title" className="label">
              TITLE
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={this.onChangeTitle}
              className="input"
            />
            <label htmlFor="amount" className="label">
              AMOUNT
            </label>
            <input
              type="text"
              id="amount"
              value={amount}
              onChange={this.onChangeAmount}
              className="input"
            />
            <label htmlFor="type" className="label">
              TYPE
            </label>
            <select
              id="type"
              value={type}
              onChange={this.onChangeType}
              className="input"
            >
              {transactionTypeOptions.map(eachOption => (
                <option key={eachOption.optionId} value={eachOption.optionId}>
                  {eachOption.displayText}
                </option>
              ))}
            </select>
            <button type="submit" className="add-button">
              Add
            </button>
          </form>
          <div className="transactions-history">
            <h2 className="form-title">History</h2>
            <ul className="transactions-list">
              {transactionsList.map(eachTransaction => (
                <TransactionItem
                  key={eachTransaction.id}
                  transactionDetails={eachTransaction}
                  onDeleteTransaction={this.onDeleteTransaction}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager

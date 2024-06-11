import React from 'react'

const PaymentMethods = ({ userID }) => {
  return (
    <form className="update-payment-methods">
        <div className="update-address-book__header">
        <h1 className="upp">manage your saved payment methods</h1>
      </div>
      <div className="no-payments">
        <p className="cap">your payment method list is empty.</p>
        <div className="create-payment__button-light">add a new payment method</div>
      </div>
    </form>
  )
}

export default PaymentMethods

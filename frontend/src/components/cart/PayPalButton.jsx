import React from 'react'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import { useNavigate } from 'react-router-dom'

const PayPalButton = ({amount, onSuccess, onError}) => {
  const navigate = useNavigate();                       
  return (
    <div>
      <PayPalScriptProvider options={{
        "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID
      }}>
        <PayPalButtons
          style={{
            layout: 'vertical',
            color: 'gold',
            shape: 'rect'
          }}
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [{ amount: {value: parseFloat(amount).toFixed(2),}
              }]
            })
          }}
          onApprove={(data, actions) => {
            return actions.order.capture().then(onSuccess);
          }}
          onError={onError}
        />
      </PayPalScriptProvider>
    </div>
  )
}

export default PayPalButton

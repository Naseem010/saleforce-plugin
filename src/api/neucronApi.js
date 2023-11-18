const axios=require('axios');
require('dotenv').config();
// require('dotenv').config({ path: '.' })
// const neucronAuth=require('./neucronAuth');

// Neucron API endpoint URLs
const TRANSACTION_HISTORY_URL = 'wallet/history';
const WALLET_BALANCES_URL = 'wallet/balance?walletID=c00c5542-f799-4d59-b9ab-16d0c67c3b50';
const MAKE_PAYMENT_URL = 'tx/send';
const SEND_PAYMENT_REQUEST_URL = 'https://api.neucron.com/payment-requests';
const access_token= process.env;
console.log(access_token);
// console.log(process.env);

// const access_token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTQ5NjQ0MTQsImlhdCI6MTY5MjM3MjQxNCwiaXNzIjoiaHR0cHM6Ly9uZXVjcm9uLmlvIiwianRpIjoiMjRlNjg1NzAtMzMyNy00MTExLWFiMTUtY2UwZjc2YzNmY2M5IiwibmJmIjoxNjkyMzcyNDE0LCJzdWIiOiIzOTkzY2UyNy1hYTg0LTQzNjEtYjc2ZC1lMGQ1MzBkNTNmN2YiLCJ1c2VyX2lkIjoiMzk5M2NlMjctYWE4NC00MzYxLWI3NmQtZTBkNTMwZDUzZjdmIn0.QTPIkAR_IcYTvwxr8ndlNqIyGnFuGORQNnI9F3_apaM';

const neucronApi = axios.create({
    baseURL: 'https://dev.neucron.io/',
  });

  function generateAuthHeaders() {
    const headers = {
      'Authorization': `${access_token}`,
      'Content-Type': 'application/json'
    };
    return headers;
  }
// Function to make API requests with authentication headers
async function makeApiRequest(url) {
    try {
      const headers = generateAuthHeaders(access_token);
      const response = await neucronApi.get(url, { headers: headers });
      return response.data;
    } catch (error) {
      console.error('Error making API request:', error.message);
      throw error;
    }
  }

  // Function to retrieve wallet balances
async function getWalletBalances() {
    try {
      const walletBalances = await makeApiRequest(WALLET_BALANCES_URL);
      return walletBalances;
    } catch (error) {
      console.error('Error retrieving wallet balances:', error.message);
      throw error;
    }
  }


// Function to retrieve transaction history
async function getTransactionHistory() {
    // try {
    //   const transactionHistory = await makeApiRequest(TRANSACTION_HISTORY_URL);
    //   return transactionHistory;
    // } catch (error) {
    //   console.error('Error retrieving transaction history:', error.message);
    //   throw error;
    // }
    try {
      const headers = generateAuthHeaders();
      const response = await neucronApi.post('wallet/history/?walletID=c00c5542-f799-4d59-b9ab-16d0c67c3b50', { headers });
      return response.data;
    } catch (error) {
      throw new Error('Failed to make payment');
    }
  }
  // Function to make a payment to another user
async function makePayment(targetWalletId, amount) {
    try {
      const headers = generateAuthHeaders();
      const payload = {

        target_wallet_id: targetWalletId,
        amount,
      };
      const response = await neucronApi.post('/tx/send', payload, { headers });
      return response.data;
    } catch (error) {
      throw new Error('Failed to make payment');
    }
  }

  // Function to send a payment request to another user
async function sendPaymentRequest(targetUserId, amount) {
    try {
      const headers = generateAuthHeaders();
      const payload = {
        target_user_id: targetUserId,
        amount,
      };
      const response = await neucronApi.post('/wallet/payment-requests', payload, { headers });
      return response.data;
    } catch (error) {
      throw new Error('Failed to send payment request');
    }
  }

  // Example usage
  async function main() {
    try {
      // const transactionHistory = await getTransactionHistory();
      // console.log('Transaction History:', transactionHistory);
  
      const walletBalances = await getWalletBalances();
      console.log('Wallet Balances:', walletBalances);
  
      // const paymentResponse = await makePayment('recipientWalletId', 100);
      // console.log('Payment Response:', paymentResponse);
  
      // const paymentRequestResponse = await sendPaymentRequest('recipientWalletId', 200);
      // console.log('Payment Request Response:', paymentRequestResponse);
    } catch (error) {
      console.error('An error occurred:', error.message);
    }
  }
  
  main();
  // module.exports = {
  //   getWalletBalances,
  //   getTransactionHistory,
  //   makePayment,
  //   sendPaymentRequest,
  // };
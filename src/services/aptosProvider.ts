// create a aptos Provider
//@ts-ignore
import { SafeEventEmitterProvider } from '@web3auth/base'
import { AptosAccount, AptosClient } from 'aptos'

import { CHAIN_CONFIG } from '../config/chainConfig'
import { IWalletProvider } from './walletProvider'
const aptos = require('aptos')
const WalletClient = require('aptos-wallet-api/src/wallet-client')
const SHA3 = require('js-sha3')

const aptosProvider = (
  provider: SafeEventEmitterProvider,
  uiConsole: (...args: unknown[]) => void
): IWalletProvider => {
  //Assuming user is already logged in.
  async function getPrivateKey() {
    const privateKey: any = await provider.request({
      method: 'private_key',
    })
    //Do something with privateKey
    console.log('privateKey', privateKey)
    return privateKey
  }

  /** Convert string to hex-encoded utf-8 bytes. */
  function stringToHex(text: string) {
    const encoder = new TextEncoder()
    const encoded = encoder.encode(text)
    return Array.from(encoded, (i) => i.toString(16).padStart(2, '0')).join('')
  }

  const toUint8Array = (hex: string) => {
    const arr = new Uint8Array(hex.length / 2)
    for (let i = 0; i < hex.length; i += 2) {
      arr[i / 2] = parseInt(hex.substr(i, 2), 16)
    }
    return arr
  }

  const fromObjectToHex = (obj: any): any => {
    return Buffer.from(JSON.stringify(obj)).toString('hex')
  }

  const fromObjectToUint8Array = (obj: any): any => {
    const arr = new Uint8Array(obj.length)
    for (let i = 0; i < obj.length; i++) {
      arr[i] = obj[i]
    }
    return arr
  }

  const getAccounts = async (): Promise<any> => {
    try {
      const privateKey = await getPrivateKey()
      const aptosAccount = new AptosAccount(toUint8Array(privateKey))
      const accounts = aptosAccount.address().hex()

      uiConsole('Aptos accounts', accounts)
      return { account: accounts, private_key: privateKey }
      return accounts
    } catch (error) {
      console.error('Error', error)
      uiConsole('error', error)
    }
  }

  const getBalance = async (): Promise<any> => {
    try {
      const privateKey = await getPrivateKey()
      const aptosAccount = new AptosAccount(toUint8Array(privateKey))
      const accounts = aptosAccount.address().hex()

      const walletClient = new WalletClient(CHAIN_CONFIG.aptos.rpcTarget, 'https://faucet.devnet.aptoslabs.com/')
      const balance = await walletClient.balance(accounts)

      uiConsole('Aptos balance', balance)

      return balance
    } catch (error) {
      console.error('Error', error)
      uiConsole('error', error)
    }
  }

  const signMessage = async (): Promise<any> => {
    try {
      const privateKey = await getPrivateKey()
      const aptosAccount = new AptosAccount(toUint8Array(privateKey))

      const message = 'Hello World'
      const messageHash = SHA3.keccak256(message)
      const signature = aptosAccount.signBuffer(toUint8Array(messageHash))

      uiConsole('Aptos signMessage', signature)

      return signature
    } catch (error) {
      console.error('Error', error)
      uiConsole('error', error)
    }
  }

  const signTransaction = async (): Promise<any> => {
    try {
      const privateKey = await getPrivateKey()
      const aptosAccount = new AptosAccount(toUint8Array(privateKey))
      const aptosClient = new AptosClient(CHAIN_CONFIG.aptos.rpcTarget)

      const payload = {
        type: 'entry_function_payload',
        function: '0x1::coin::transfer',
        type_arguments: ['0x1::aptos_coin::AptosCoin'],
        arguments: ['0x81701e60a8e783aecf4dd5e5c9eb76f70a4431bb7441309dc3c6099f2c9e63d5', '1000'],
      }

      // generate transaction and sign it
      const txn = await aptosClient.generateTransaction(aptosAccount.address().hex(), payload)
      const signedTxn = await aptosClient.signTransaction(aptosAccount, txn)

      uiConsole('Aptos sign transaction', signedTxn)

      return signedTxn
    } catch (error) {
      console.error('Error', error)
      uiConsole('error', error)
    }
  }

  const signAndSendTransaction = async (): Promise<any> => {
    try {
      const privateKey = await getPrivateKey()
      const aptosAccount = new AptosAccount(toUint8Array(privateKey))
      const aptosClient = new AptosClient(CHAIN_CONFIG.aptos.rpcTarget)

      const payload = {
        type: 'entry_function_payload',
        function: '0x1::coin::transfer',
        type_arguments: ['0x1::aptos_coin::AptosCoin'],
        arguments: ['0x81701e60a8e783aecf4dd5e5c9eb76f70a4431bb7441309dc3c6099f2c9e63d5', '1000'],
      }

      // generate transaction and sign it
      const txn = await aptosClient.generateTransaction(aptosAccount.address().hex(), payload)
      const signedTxn = await aptosClient.signTransaction(aptosAccount, txn)

      // send transaction

      const response = await aptosClient.submitTransaction(signedTxn)

      uiConsole('Aptos sign and send transaction', response)

      return response
    } catch (error) {
      console.error('Error', error)
      uiConsole('error', error)
    }
  }

  return {
    getAccounts,
    getBalance,
    signMessage,
    signTransaction,
    signAndSendTransaction,
  }
}

export default aptosProvider

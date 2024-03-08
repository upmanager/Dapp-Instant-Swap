//@ts-ignore
import { SafeEventEmitterProvider } from '@web3auth/base'

import { CHAIN_CONFIG } from '../config/chainConfig'
import { IWalletProvider } from './walletProvider'

const TronWeb = require('tronweb')

const KEY = 'ac7c9150-bc40-42f8-9bc7-6058fd9e35ce'

const tronProvider = (provider: SafeEventEmitterProvider, uiConsole: (...args: unknown[]) => void): IWalletProvider => {
  //Assuming user is already logged in.
  async function getPrivateKey() {
    const privateKey = await provider.request({
      method: 'private_key',
    })
    //Do something with privateKey
    console.log('privateKey', privateKey)
    return privateKey
  }

  const fromObjectToHex = (obj: any) => {
    return Buffer.from(JSON.stringify(obj)).toString('hex')
  }

  const getAccounts = async (): Promise<any> => {
    try {
      uiConsole('provider', provider)

      let PK = await getPrivateKey()

      const tronWeb = new TronWeb({
        fullHost: CHAIN_CONFIG.tron.rpcTarget,
        headers: { 'TRON-PRO-API-KEY': KEY },
        privateKey: PK,
      })

      const accounts = await tronWeb.defaultAddress.base58

      uiConsole('Tron accounts', accounts)

      return [accounts]
    } catch (error) {
      console.error('Error', error)
      uiConsole('error', error)
    }
  }

  const getBalance = async () => {
    try {
      let PK = await getPrivateKey()

      const tronWeb = new TronWeb({
        fullHost: CHAIN_CONFIG.tron.rpcTarget,
        headers: { 'TRON-PRO-API-KEY': KEY },
        privateKey: PK,
      })
      const account = await tronWeb.defaultAddress.base58
      const balance = await tronWeb.trx.getBalance(account)
      uiConsole('Tron balance', balance)
    } catch (error) {
      console.error('Error', error)
      uiConsole('error', error)
    }
  }

  const signMessage = async () => {
    try {
      let PK = await getPrivateKey()

      const tronWeb = new TronWeb({
        fullHost: CHAIN_CONFIG.tron.rpcTarget,
        headers: { 'TRON-PRO-API-KEY': KEY },
        privateKey: PK,
      })
      const message = 'Hello World'
      const signedMessage = await tronWeb.trx.sign(Buffer.from(message, 'utf-8').toString('hex'))
      uiConsole('Tron sign message => true', signedMessage)
    } catch (error) {
      console.log('error', error)
      uiConsole('error', error)
    }
  }

  const signTransaction = async () => {
    try {
      let PK = await getPrivateKey()

      const tronWeb = new TronWeb({
        fullHost: CHAIN_CONFIG.tron.rpcTarget,
        headers: { 'TRON-PRO-API-KEY': KEY },
        privateKey: PK,
      })
      const signedTransaction = await tronWeb.trx.signTransaction(
        fromObjectToHex({
          to: 'TNQ5vgjyNPVozFPtTXXHvR8JpB4oX15S9o',
          amount: 1000000,
          feeLimit: 1000000,
          callValue: 0,
          tokenId: 0,
          tokenValue: 0,
          data: '',
          timestamp: Date.now(),
        })
      )
      uiConsole('Tron sign transaction => true', signedTransaction)
    } catch (error) {
      console.log('error', error)
      uiConsole('error', error)
    }
  }

  const signAndSendTransaction = async () => {
    try {
      let PK = await getPrivateKey()

      const tronWeb = new TronWeb({
        fullHost: CHAIN_CONFIG.tron.rpcTarget,
        headers: { 'TRON-PRO-API-KEY': KEY },
        privateKey: PK,
      })
      const signedTransaction = await tronWeb.trx.signTransaction(
        fromObjectToHex({
          to: 'TNQ5vgjyNPVozFPtTXXHvR8JpB4oX15S9o',
          amount: 1000000,
          feeLimit: 1000000,
          callValue: 0,
          tokenId: 0,
          tokenValue: 0,
          data: '',
          timestamp: Date.now(),
        })
      )
      const transaction = await tronWeb.trx.sendRawTransaction(signedTransaction)
      uiConsole('Tron sign and send transaction => true', transaction)
    } catch (error) {
      console.log('error', error)
      uiConsole('error', error)
    }
  }

  return {
    getAccounts,
    getBalance,
    signAndSendTransaction,
    signMessage,
    signTransaction,
  }
}

export default tronProvider

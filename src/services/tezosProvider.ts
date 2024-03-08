// create a tezos Provider
//@ts-ignore
import { SafeEventEmitterProvider } from '@web3auth/base'
import { CHAIN_CONFIG } from '../config/chainConfig'
import { IWalletProvider } from './walletProvider'

import { TezosToolkit } from '@taquito/taquito'

// const tezosCrypto = require('@tezos-core-tools/crypto-utils')

const tezosProvider = (
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

  const fromObjectToHex = (obj: any) => {
    return Buffer.from(JSON.stringify(obj)).toString('hex')
  }

  const getAccounts = async (): Promise<any> => {
    try {
      // derive the Tezos Key Pair from the private key
      // const keyPair = tezosCrypto.utils.seedToKeyPair(hex2buf(await getPrivateKey()))
      const privateKey = await getPrivateKey()
      // keyPair.pkh is the account address.
      // const account = keyPair?.pkh
      const account = ''

      uiConsole('Tezos accounts', account)
      return { account: account, private_key: privateKey }
    } catch (error) {
      console.error('Error', error)
      uiConsole('error', error)
    }
  }

  const getBalance = async (): Promise<any> => {
    try {
      const tezos = new TezosToolkit(CHAIN_CONFIG.tezos.rpcTarget)
      // const keyPair = tezosCrypto.utils.seedToKeyPair(hex2buf(await getPrivateKey()))
      // tezos.setSignerProvider(await InMemorySigner.fromSecretKey(keyPair?.sk))

      // const account = keyPair?.pkh
      const account = ''

      let balance: any = 0
      try {
        console.log('tezos', tezos)
        console.log('tezos.tz', tezos.tz)
        balance = await tezos.tz.getBalance(account)
      } catch (e) {
        console.log('e--->', e)
      }

      uiConsole('Tezos balance', balance)

      return balance
    } catch (error) {
      console.error('Error', error)
      uiConsole('error', error)
    }
  }

  const signMessage = async (): Promise<any> => {
    try {
      const tezos = new TezosToolkit(CHAIN_CONFIG.tezos.rpcTarget)
      // const keyPair = tezosCrypto.utils.seedToKeyPair(hex2buf(await getPrivateKey()))
      // tezos.setSignerProvider(await InMemorySigner.fromSecretKey(keyPair?.sk))

      const signedMessage = await tezos.signer.sign(Buffer.from('Hello World', 'utf-8').toString('hex'))

      uiConsole('Tezos signedMessage', signedMessage)

      return signedMessage
    } catch (error) {
      console.error('Error', error)
      uiConsole('error', error)
    }
  }

  const signTransaction = async (): Promise<any> => {
    // signTransaction
    const transaction = {
      to: 'tz1gZ8JUQ6bbwjyN7yFrZKV3hTqHPr4Erky9',
      amount: 1000000,
      fee: 10000,
      storageLimit: 0,
      gasLimit: 10600,
      counter: 0,
      derivationPath: "44'/1729'/0'/0'/0'",
    }

    try {
      const tezos = new TezosToolkit(CHAIN_CONFIG.tezos.rpcTarget)
      // const keyPair = tezosCrypto.utils.seedToKeyPair(hex2buf(await getPrivateKey()))
      // tezos.setSignerProvider(await InMemorySigner.fromSecretKey(keyPair?.sk))
      // const signedTransaction = await tezos.signer.sign(fromObjectToHex(transaction))

      // uiConsole('Tezos signedTransaction', signedTransaction)

      // return signedTransaction
    } catch (error) {
      console.error('Error', error)
      uiConsole('error', error)
    }
  }

  const signAndSendTransaction = async (): Promise<any> => {
    try {
      const tezos = new TezosToolkit(CHAIN_CONFIG.tezos.rpcTarget)
      // const keyPair = tezosCrypto.utils.seedToKeyPair(hex2buf(await getPrivateKey()))
      // tezos.setSignerProvider(await InMemorySigner.fromSecretKey(keyPair?.sk))

      const transaction = {
        to: 'tz1P2hN3gzyjzDrABXm4JjTaTikMUyCQp1wH',
        amount: 1000000,
        fee: 10000,
        storageLimit: 0,
        gasLimit: 10600,
      }

      const signedTransaction = await tezos.signer.sign(fromObjectToHex(transaction))

      const op = await tezos.wallet
        .transfer({
          to: transaction.to,
          amount: transaction.amount,
          fee: transaction.fee,
          storageLimit: transaction.storageLimit,
          gasLimit: transaction.gasLimit,
        })
        .send()

      uiConsole('Tezos signedTransaction', signedTransaction)

      return signedTransaction
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

export default tezosProvider

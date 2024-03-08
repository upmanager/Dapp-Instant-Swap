// create a cosmos Provider
//@ts-ignore
import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate'
//@ts-ignore
import { DirectSecp256k1Wallet } from '@cosmjs/proto-signing'
//@ts-ignore
import { SafeEventEmitterProvider } from '@web3auth/base'
import { cosmosclient, proto, rest } from 'cosmos-client'

import { CHAIN_CONFIG, CHAIN_CONFIG_TYPE, DENOM, DENOM_TYPE } from '../config/chainConfig'
import { IWalletProvider } from './walletProvider'

const cosmosProvider = (
  provider: SafeEventEmitterProvider,
  uiConsole: (...args: unknown[]) => void,
  chain: CHAIN_CONFIG_TYPE
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

  const toUint8Array = (hex: string) => {
    const arr = new Uint8Array(hex.length / 2)
    for (let i = 0; i < hex.length; i += 2) {
      arr[i / 2] = parseInt(hex.substr(i, 2), 16)
    }
    return arr
  }

  const getAccounts = async (): Promise<any> => {
    try {
      const privKey = new proto.cosmos.crypto.secp256k1.PrivKey({
        key: toUint8Array(await getPrivateKey()),
      })
      const wallet = await DirectSecp256k1Wallet.fromKey(privKey.key, chain)
      const [address] = await wallet.getAccounts()
      console.log('address', address.address)
      return { account: address.address, private_key: privKey.key }
      uiConsole(address.address)

      return wallet
    } catch (error) {
      console.error('Error', error)
      uiConsole('error', error)
    }
  }

  const getBalance = async (): Promise<any> => {
    const wallet = await getAccounts()
    const [address] = await wallet.getAccounts()

    const client = await SigningCosmWasmClient.connectWithSigner(CHAIN_CONFIG[chain].rpcTarget, wallet, {
      prefix: chain,
    })

    const chainKey = chain as DENOM_TYPE

    const { amount, denom } = await client.getBalance(address.address, DENOM[chainKey])
    uiConsole('Balance: ', amount, denom)

    console.log(amount, denom)
    return amount
  }

  const signMessage = async (): Promise<any> => {
    const message = ' '
    try {
      const privKey = new proto.cosmos.crypto.secp256k1.PrivKey({
        key: toUint8Array(await getPrivateKey()),
      })
      const pubKey = privKey.pubKey()
      const address = cosmosclient.AccAddress.fromPublicKey(pubKey)

      const signBytes: any = Buffer.from(message)
      const signature = privKey.sign(signBytes)
      const signed = new proto.cosmos.tx.v1beta1.SignDoc({
        body_bytes: signBytes,
        auth_info_bytes: Buffer.from(''),
        chain_id: CHAIN_CONFIG[chain].chainId,
      })

      console.log('signed', signed)
      uiConsole('Cosmos signed message', signed)

      return signed
    } catch (error) {
      console.error('Error', error)
      uiConsole('error', error)
    }
  }

  const signTransaction = async (): Promise<any> => {
    const transaction = ''
    try {
      const privKey = new proto.cosmos.crypto.secp256k1.PrivKey({
        key: toUint8Array(await getPrivateKey()),
      })
      const pubKey = privKey.pubKey()
      const address = cosmosclient.AccAddress.fromPublicKey(pubKey)

      const signBytes: any = Buffer.from(transaction)
      const signature = privKey.sign(signBytes)

      console.log('signature', signature)
      uiConsole('Cosmos signature', signature)
    } catch (error) {
      console.error('Error', error)
      uiConsole('error', error)
    }
  }

  const signAndSendTransaction = async (): Promise<void> => {
    const transaction = ''
    try {
      const sdk = new cosmosclient.CosmosSDK(CHAIN_CONFIG[chain].rpcTarget, CHAIN_CONFIG[chain].chainId)

      const privKey = new proto.cosmos.crypto.secp256k1.PrivKey({
        key: toUint8Array(await getPrivateKey()),
      })
      const pubKey = privKey.pubKey()
      const address = cosmosclient.AccAddress.fromPublicKey(pubKey)

      const signBytes: any = Buffer.from(transaction)
      const signature = privKey.sign(signBytes)

      console.log('signature', signature)
      uiConsole('Cosmos signature', signature)

      const txRaw: any = new proto.cosmos.tx.v1beta1.TxRaw({
        body_bytes: Buffer.from(''),
        auth_info_bytes: Buffer.from(''),
        signatures: [],
      })

      const txBroadcastResult = await rest.cosmos.tx.broadcastTx(sdk, txRaw)
      console.log('txBroadcastResult', txBroadcastResult)
      uiConsole('Cosmos signature', signature, 'Cosmos signed and sent transaction', txBroadcastResult)
    } catch (error) {
      console.error('Error', error)
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

export default cosmosProvider

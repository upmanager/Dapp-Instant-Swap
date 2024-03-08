import { t } from '@lingui/macro'
import { useWallet as useWalletAptos } from '@manahippo/aptos-wallet-adapter'
import detectEthereumProvider from '@metamask/detect-provider'
import type { default as SolWalletAdapter } from '@project-serum/sol-wallet-adapter'
import {
  WalletAdapterNetwork,
  WalletConfigError,
  WalletConnectionError,
  WalletLoadError,
} from '@solana/wallet-adapter-base'
import { PublicKey } from '@solana/web3.js'
import type { StrikeWallet } from '@strike-protocols/solana-wallet-adapter'
import { TempleWallet } from '@temple-wallet/dapp'
import Button from 'app/components/Button'
import SwapAssetPanel from 'app/features/trident/buy/SwapAssetPanel'
import { classNames } from 'app/functions'
import { SwapLayout, SwapLayoutCard } from 'app/layouts/SwapLayout'
import { useActiveWeb3React } from 'app/services/web3'
import { Field } from 'app/state/buy/actions'
import { useBuyActionHandlers } from 'app/state/buy/hooks'
// @ts-ignore TYPE NEEDS FIXING
import axios from 'axios'
import { NextSeo } from 'next-seo'
import { useCallback, useEffect, useState } from 'react'
import { WalletConnectConnector } from 'web3-react-walletconnect-connector'
import { WalletLinkConnector } from 'web3-react-walletlink-connector'
import WalletModal from '../../features/trident/swap/WalletModal'
import HeaderNew from 'app/features/trade/HeaderNew'
import { modalStyles, NETWORKNAMES, networks } from '../../utils/constants'
// @ts-ignore TYPE NEEDS FIXING
import { Bars } from 'react-loader-spinner'
import { useWeb3Auth } from '../../services/web3auth'
// @ts-ignore TYPE NEEDS FIXING
import Modal from 'react-modal'
// import { TOKEN_LIST_URL } from '@jup-ag/core'
var Web3 = require('web3')
const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/'));
const Tx = require('ethereumjs-tx');
const Swap = () => {
  const [inputNetwork, setInputNetwork] = useState('binancecoin')
  const [outputNetwork, setOutputNetwork] = useState('binancecoin')
  const [showWalletModal, setShowWalletModal] = useState(false)
  const {
    connected: connectedAptos,
    account: accountAptos,
    connect: connectAptos,
    WalletReadyState,
  }: any = useWalletAptos()

  const [inHolderAddress, setInputHolderAddress] = useState('')
  const [OutHolderAddress, setOutputHolderAddress] = useState('')

  const [private_key, setPrivateKey] = useState('')

  const [InPrivate_key, setInPrivateKey] = useState('')
  const [OutPrivate_key, setOutPrivateKey] = useState('')

  const { provider: web3authProvider, login, logout, web3Auth } = useWeb3Auth()
  const [inited, setInited] = useState(false)
  // @ts-ignore TYPE NEEDS FIXING
  const { active, account, activate } = useActiveWeb3React()
  const [loading, setLoading] = useState(false)
  const [amount, setAmount] = useState('100')
  const [outAmount, setOutAmount] = useState('0')
  const [isModalConnected, setModalConnectState] = useState(false)
  const [frameUrl, setFrameUrl] = useState('https://localhost')
  const [frameModal, setFrameModal] = useState(false)
  const [tokenPrice, setTokenPrice] = useState('1')
  const [tokens, setAllTokens] = useState<any[]>([])

  const [currentInputToken, setCurrentInputToken] = useState<Object>({})
  const [currentOutputToken, setCurrentOutputToken] = useState<Object>({})

  useEffect(() => {
    if (!web3authProvider) return
    if (web3Auth?.status == 'connected') {
      if (inited) {
        web3authProvider
          ?.getAccounts()
          .then((account) => {
            console.log('wallet address==>', account.account[0])

            if (!inHolderAddress) {
              setInputHolderAddress(account.account[0])
              setInPrivateKey(account.private_key)
            } else {
              setOutputHolderAddress(account.account[0])
              setOutPrivateKey(account.private_key)
            }
            setModalConnectState(true)
          })
          .catch((e) => console.log('error', e))
      } else {
        logout()
        setInited(true)
      }
    } else {
      setInited(true)
    }
  }, [web3authProvider])

  const showMessage = (message: string) => {
    alert(message)
  }

  const CoinbaseWallet = new WalletLinkConnector({
    url: `https://mainnet.infura.io/v3/8043bb2cf99347b1bfadfb233c5325c0`,
    appName: '2cexy',
    supportedChainIds: [1, 3, 4, 5, 42],
  })

  const WalletConnect = new WalletConnectConnector({
    //@ts-ignore
    rpcUrl: `https://mainnet.infura.io/v3/8043bb2cf99347b1bfadfb233c5325c0`,
    bridge: 'https://bridge.walletconnect.org',
    qrcode: true,
  })

  const BinanceWallet = new WalletConnectConnector({
    //@ts-ignore
    rpc: { 56: 'https://bsc-dataseed.binance.org/' },
    bridge: 'https://bridge.walletconnect.org',
    qrcode: true,
  })
  //@ts-ignore
  // const ledger = new LedgerConnector({ chainId: 1, url: 'https://rinkeby.infura.io/v3/60ab76e16df54c808e50a79975b4779f', pollingInterval: 12000 })

  //@ts-ignore
  useEffect(() => {
    if (active) {
      //@ts-ignore
      console.log('wallet addres=>', account)
      if (!inHolderAddress) {
        //@ts-ignore
        setInputHolderAddress(account)
      } else {
        //@ts-ignore
        setOutputHolderAddress(account)
      }
      setShowWalletModal(false)
    }
  }, [active])

  const connectWalletCustom = async (item: any) => {
    const nnet = inHolderAddress ? outputNetwork : inputNetwork
    // const network = networks.find((itemNet) => itemNet.id == nnet)
    const network = networks.find((itemNet) => itemNet.id == inputNetwork)
    if (item.name == 'Web3Auth') {
      setInited(true)
      setShowWalletModal(false)
      try {
        login()
      } catch (error) {}
    } else {
      //@ts-ignore
      if (network.value === NETWORKNAMES.TEZOS) {
        if (item.name == 'Temple Wallet') {
          try {
            const available = await TempleWallet.isAvailable()
            if (!available) {
              showMessage('Please install Temple Wallet')
              window.open(
                'https://chrome.google.com/webstore/detail/temple-tezos-wallet/ookjlbkiijinhpmnjffcofjonbfbgaoc',
                '_blank'
              )
              return
            }
            const wallet = new TempleWallet('Awsome')
            const permission = await TempleWallet.getCurrentPermission()
            await wallet.connect('mainnet', { forcePermission: true })
            const tezos = wallet.toTezos()
            const accountPkh = await tezos.wallet.pkh()
            console.log('wallet address==>', accountPkh)
            if (!inHolderAddress) {
              //@ts-ignore
              setInputHolderAddress(accountPkh)
            } else {
              //@ts-ignore
              setOutputHolderAddress(accountPkh)
            }
            setShowWalletModal(false)
          } catch (err) {
            console.error(err)
          }
        }
        //@ts-ignore
      } else if (network.value === NETWORKNAMES.COSMOS) {
        if (item.name === 'Keplr') {
          //@ts-ignore
          while (!window.keplr) {
            showMessage('Install Keplr Wallet')
            window.open(
              'https://chrome.google.com/webstore/detail/keplr/dmkamcknogkgcdfhhbddcghachkejeap?hl=en',
              '_blank'
            )
            return
          }
          const CHAIN_ID = 'juno-1'
          //@ts-ignore
          await window.keplr.enable(CHAIN_ID)
          //@ts-ignore
          const keplrOfflineSigner = window.keplr.getOfflineSignerOnlyAmino(CHAIN_ID)
          const [{ address: myAddress }] = await keplrOfflineSigner.getAccounts()
          console.log('wallet address==>', myAddress)
          if (!inHolderAddress) {
            setInputHolderAddress(myAddress)
          } else {
            setOutputHolderAddress(myAddress)
          }
          setShowWalletModal(false)
        }
        //@ts-ignore
      } else if (network.value === NETWORKNAMES.APTOS) {
        if (WalletReadyState != undefined) connectAptos(item.name)
        else alert('install extension')
        //@ts-ignore
      } else if (network.value === NETWORKNAMES.SOLANA) {
        if (item.name == 'Solflare') {
          //@ts-ignore
          while (!window.solflare) {
            showMessage('Install Solflare Wallet')
            window.open(
              'https://chrome.google.com/webstore/detail/solflare-wallet/bhhhlbepdkbapadjdnnojkbgioiodbic',
              '_blank'
            )
            return
          }
          //@ts-ignore
          window.solflare.connect()
          //@ts-ignore
          window.solflare.on('connect', () => {
            if (!inHolderAddress) {
              //@ts-ignore
              setInputHolderAddress(window.solflare.publicKey.toString())
            } else {
              //@ts-ignore
              setOutputHolderAddress(window.solflare.publicKey.toString())
            }
            //@ts-ignore
            console.log('wallet address==>', window.solflare.publicKey.toString())
            setShowWalletModal(false)
          })
        } else if (item.name == 'Ledger') {
        } else if (item.name == 'Sollet') {
          //@ts-ignore
          while (!window.sollet) {
            showMessage('Install Sollet Wallet')
            window.open(
              'https://chrome.google.com/webstore/detail/sollet/fhmfendgdocmcbmfikdcogofphimnkno?hl=en',
              '_blank'
            )
            return
          }
          //@ts-ignore
          const provider = 'https://www.sollet.io'
          const networkSolana = WalletAdapterNetwork.Mainnet
          let SolWalletAdapterClass: typeof SolWalletAdapter
          try {
            SolWalletAdapterClass = (await import('@project-serum/sol-wallet-adapter')).default
          } catch (error: any) {}
          let sollet_wallet: SolWalletAdapter
          try {
            //@ts-ignore
            sollet_wallet = new SolWalletAdapterClass(provider, networkSolana)
          } catch (error: any) {
            showMessage('Y')
          }
          try {
            await new Promise<void>((resolve, reject) => {
              const connect = () => {
                sollet_wallet.off('connect', connect)
                resolve()
              }

              sollet_wallet.on('connect', connect)

              sollet_wallet.connect().catch((reason: any) => {
                sollet_wallet.off('connect', connect)
                reject(reason)
              })
            })
          } finally {
            //@ts-ignore
            console.log('wallet address==>', sollet_wallet.publicKey.toString(16))
            if (!inHolderAddress) {
              //@ts-ignore
              setInputHolderAddress(sollet_wallet.publicKey.toString(16))
            } else {
              //@ts-ignore
              setOutputHolderAddress(sollet_wallet.publicKey.toString(16))
            }
            setShowWalletModal(false)
          }
        } else if (item.name == 'Strike') {
          let StrikeClass: typeof StrikeWallet
          try {
            StrikeClass = (await import('@strike-protocols/solana-wallet-adapter')).StrikeWallet
          } catch (error: any) {
            throw new WalletLoadError(error?.message, error)
          }

          let wallet: StrikeWallet
          try {
            wallet = new StrikeClass()
          } catch (error: any) {
            throw new WalletConfigError(error?.message, error)
          }

          let publicKey: PublicKey
          try {
            publicKey = await wallet.connect('https://wallet.strikeprotocols.com')
            console.log('wallet address==>', publicKey.toString())

            if (!inHolderAddress) {
              setInputHolderAddress(publicKey.toString())
            } else {
              setOutputHolderAddress(publicKey.toString())
            }
            setShowWalletModal(false)
          } catch (error: any) {
            throw new WalletConnectionError(error?.message, error)
          }
        }
      } else {
        if (item.name === 'Metamask') {
          let provider = await detectEthereumProvider()
          //get account
          //@ts-ignore
          if (provider.providerMap) {
            //@ts-ignore
            provider = provider.providerMap.get('MetaMask')
          }
          if (window.ethereum) {
            let netName = 'ethereum'
            let chainId = '0x1'
            //@ts-ignore
            if (network.value == NETWORKNAMES.BINANCESMARTCHAIN) {
              netName = 'bsc'
              chainId = '0x38'
              //@ts-ignore
            } else if (network.value == NETWORKNAMES.AVALANCHE) {
              netName = 'avalanche'
              chainId = '0xA86A'
              //@ts-ignore
            } else if (network.value == NETWORKNAMES.POLYGON) {
              netName = 'polygon'
              chainId = '0x89'
            }
            try {
              //@ts-ignore
              await provider.request({
                method: 'wallet_switchEthereumChain',
                //@ts-ignore
                params: [{ chainId: chainId }], // chainId must be in hexadecimal numbers
              })
            } catch (err) {
              console.log('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', err)
              try {
                //@ts-ignore
                await provider.request({
                  method: 'wallet_addEthereumChain',
                  params: [
                    {
                      //@ts-ignore
                      ...networks[netName],
                    },
                  ],
                })
              } catch (err) {
                //@ts-ignore
                // showMessage(err.message)
              }
            }

            try {
              //@ts-ignore
              const res = await provider.request({
                method: 'eth_requestAccounts',
              })
              console.log('wallet address==>', res[0])
              if (!inHolderAddress) {
                setInputHolderAddress(res[0])
              } else {
                setOutputHolderAddress(res[0])
              }
              setShowWalletModal(false)
            } catch (err) {
              showMessage('There was a problem connecting to MetaMask. please check the MetaMask.')
            }
          } else {
            showMessage('Install MetaMask')
          }
        } else if (item.name === 'Coinbase') {
          activate(CoinbaseWallet)
        } else if (item.name === 'Wallet Connect') {
          activate(WalletConnect)
        } else if (item.name === 'Binance Wallet') {
          activate(BinanceWallet)
        }
      }
    }
    setModalConnectState(true)
  }
  const submit = (name: string = '') => {
    let InputNet = networks.find((itemNet) => itemNet.id == inputNetwork)
    let OutputNet = networks.find((itemNet) => itemNet.id == outputNetwork)
    let url = ''
    if (
      (InputNet?.id == 'ethereum' || InputNet?.id == 'avalanche-2') &&
      (OutputNet?.id == 'ethereum' || OutputNet?.id == 'avalanche-2')
    ) {
      url = 'https://thorswap-api-4v2uk4wfga-uc.a.run.app'
    } else url = 'https://send-to-contract-api-6wkszomaia-ue.a.run.app'
    let payload = {}
    let paymentName = '',
      step2Token = ''
    //@ts-ignore
    if (currentInputToken?.symbol != OutputNet?.gasToken) {
      //@ts-ignore
      step2Token = currentInputToken?.address
    }
    payload = {
      api_key: '',
      //@ts-ignore
      Innetwork: InputNet.value,
      Outnetwork: OutputNet?.value,
      destination_wallet: OutHolderAddress,
      //@ts-ignore
      token_address: currentOutputToken?.address,
      pool_address: OutputNet?.poolAddress,
      //@ts-ignore
      inToken: currentInputToken?.symbol,
      slippage: '0.5',
      token_type: 'Tokens',
      amount: tokenAmountToWei(outAmount, erc20_decimals),
      orgination: 'swap',
      staging: 'false',
      //@ts-ignore
      Intoken_address: step2Token,
      url: url,
    }
    console.log('payload========', payload)
    // paymentName = exchange
    paymentName = 'null'
    setLoading(true)
    axios
      .post('https://api.2cexy.com/swap', payload)
      // .post('http://localhost:3001/swap', payload)
      .then((res) => {
        setLoading(false)
        if (res.data && res.data.status === 200) {
        }
      })
      .catch((e) => {
        setLoading(false)
      })
  }
  // dismiss warning if all imported tokens are in active lists

  const { onCurrencySelection, onUserInput } = useBuyActionHandlers()

  /* @ts-ignore TYPE NEEDS FIXING */
  const [symbols, setSymbols] = useState<any[]>()

  useEffect(() => {
    setModalConnectState(false)
    setInputHolderAddress('')
    if (currentInputToken) {
      //@ts-ignore
      const gasToken = networks.find((item) => item.id == inputNetwork).gasToken
      console.log('gasToken', tokens)
      const item = tokens?.find((item) =>
        item?.symbol.toLowerCase().includes(gasToken.toLowerCase()) ? true : item.symbol.toLowerCase().includes('bnb')
      )
      setCurrentInputToken(item)
    }
  }, [inputNetwork])

  useEffect(() => {
    setModalConnectState(false)
    setOutputHolderAddress('')
    if (currentOutputToken) {
      //@ts-ignore
      const gasToken = networks.find((item) => item.id == outputNetwork).gasToken
      console.log('gasToken', tokens)
      const item = tokens?.find((item) =>
        item?.symbol.toLowerCase().includes(gasToken.toLowerCase()) ? true : item.symbol.toLowerCase().includes('bnb')
      )
      setCurrentOutputToken(item)
    }
  }, [outputNetwork])

  useEffect(() => {
    if (currentInputToken && currentOutputToken) {
      getPrice()
    }
  }, [currentInputToken, currentOutputToken])

  const tokenAmountToWei = (amount1: any, decimals: any) => {
    return Web3.utils.toBN('0x' + (amount1 * 10 ** decimals).toString(16)).toString()
  }

  let erc20_decimals = 6
  let amount1 = 5000

  function sendToken(receiver: any, amount: any) {
    const contract = web3.eth.contract(contractAbi).at(contractAddr);
    const data = contract.transfer.getData(receiver, amount * 1e18);
    const gasPrice = web3.eth.gasPrice;
    const gasLimit = 90000;
    const rawTransaction = {
     'from': contractOwner.addr,
     'nonce': web3.toHex(web3.eth.getTransactionCount(contractOwner.addr)),
     'gasPrice': web3.toHex(gasPrice),
     'gasLimit': web3.toHex(gasLimit),
     'to': contractAddr,
     'value': 0,
     'data': data,
     'chainId': 1
    };
    // 0x4a66426499f3e0A1EA2936FA3ABf49EB8846BF1c
    // binance: 0x91d93e3807c1a2eaa7f6e4513c03a3c168c5c5ca
    
    
    const privKey = new Buffer(contractOwner.key, 'hex');
    const tx = new Tx(rawTransaction);
    tx.sign(privKey);
    const serializedTx = tx.serialize();
    web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'), function (err, hash) {
     if (err) {
      console.log(err);
     }
   
     console.log(hash);
    });


  //   let txObj = {
  //     gas: gasfee,
  //     "to": toAddress,
  //     "value": amount,
  //     "from": fromAddress
  // }
  // eth_web3.eth.accounts.signTransaction(txObj, privateKey, (err, signedTx) => {}

  useEffect(() => {
    if (tokens) {
      //@ts-ignore
      const gasToken = networks.find((item) => item.id == inputNetwork).gasToken
      const item = tokens.find((item) =>
        item.symbol.toLowerCase().includes(gasToken.toLowerCase()) ? true : item?.symbol.toLowerCase().includes('bnb')
      )
      if (!item) return
      setCurrentInputToken(item)
      setCurrentOutputToken(item)
    }
  }, [tokens])

  useEffect(() => {
    getIdofCurrency()
  }, [])

  const getIdofCurrency = async () => {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/coins/list')
      const data = await response.json()
      setSymbols(data)
      if (data) {
        fetch('/allToken.json')
          .then((res) => res.json())
          .then((data) => {
            console.log('data:', data)
            setAllTokens(data)
          })
          .catch((error) => console.log('error====', error))
      }
    } catch (error) {}
  }

  const getPrice = async () => {
    let symbol = ''
    if (!currentInputToken.hasOwnProperty('symbol') || !currentOutputToken.hasOwnProperty('symbol')) return
    //@ts-ignore
    symbol = currentOutputToken?.symbol
    const item = symbols?.find((item) => item?.symbol?.toUpperCase() == symbol?.toUpperCase())
    const id = item?.id
    let outPrice = '1',
      symbol2 = '',
      id2 = ''
    axios
      .get(`https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd&precision=5`)
      .then((res) => {
        if (res.data) {
          outPrice = res.data[id].usd
          //@ts-ignore
          symbol2 = currentInputToken?.symbol
          //@ts-ignore
          const item1 = symbols?.find((item) => item?.symbol?.toUpperCase() == symbol2?.toUpperCase())
          id2 = item1?.id
          axios
            .get(`https://api.coingecko.com/api/v3/simple/price?ids=${id2}&vs_currencies=usd&precision=5`)
            //@ts-ignore
            .then((res1) => {
              if (res1.data) {
                //@ts-ignore
                setTokenPrice(outPrice / res1.data[id2].usd)
                //@ts-ignore
                setOutAmount(((1 / Number(outPrice / res1.data[id2].usd)) * Number(amount)).toFixed(3))
              }
            })
        }
      })
      .catch((e) => {
        console.error(e)
      })
  }

  // const handleInputSelect = useCallback((inputCurrency: Currency) => {}, [onCurrencySelection])

  const handleTypeOutput = useCallback(
    (value: string) => {
      onUserInput(Field.OUTPUT, value)
      setOutAmount(value)
      setAmount((Number(tokenPrice) * Number(value)).toFixed(3))
    },
    [tokenPrice]
  )

  const handleTypeInput = useCallback(
    (value: string) => {
      onUserInput(Field.INPUT, value)
      setAmount(value)
      setOutAmount(((1 / Number(tokenPrice)) * Number(value)).toFixed(3))
    },
    [tokenPrice]
  )

  const handleOutputSelect = (item: Object) => {
    setCurrentOutputToken(item)
  }

  const handleInputSelect = (item: Object) => {
    setCurrentInputToken(item)
  }
  let showString = !inHolderAddress ? '(From)' : 'To'
  return (
    <>
      <NextSeo title="Swap" />
      <SwapLayoutCard>
        <div className="px-5">
          <HeaderNew />
        </div>
        <div className="flex flex-col gap-3">
          <SwapAssetPanel
            spendFromWallet={true}
            header={SwapAssetPanel.Header}
            currentToken={currentInputToken}
            value={amount}
            currentNetwork={inputNetwork}
            sel={false}
            networks={networks}
            onChange={handleTypeInput}
            tokens={tokens}
            onSelect={handleInputSelect}
            // @ts-ignore TYPE NEEDS FIXING
            onSelectNetwork={setInputNetwork}
            showSelectNetwork={false}
          />
          <div
            style={{
              display: 'flex',
              flexFlow: 'column',
              alignItems: 'center',
              backgroundColor: '#1e293b',
            }}
          >
            <SwapAssetPanel
              spendFromWallet={true}
              header={SwapAssetPanel.Header}
              currentToken={currentOutputToken}
              value={outAmount}
              currentNetwork={outputNetwork}
              sel={false}
              networks={networks}
              onChange={handleTypeOutput}
              tokens={tokens}
              onSelect={handleOutputSelect}
              // @ts-ignore TYPE NEEDS FIXING
              onSelectNetwork={setOutputNetwork}
              showSelectNetwork={false}
            />
            {!inHolderAddress || !isModalConnected || !OutHolderAddress ? (
              <Button
                id="connect-wallet"
                onClick={() => setShowWalletModal(true)}
                variant="outlined"
                className={classNames(
                  'rounded-2xl md:rounded w-3/5 mb-2 text-center !text-white !bg-blue',
                  '!border-none p-2 md:p-4 '
                )}
              >
                Connect to a wallet {showString}
              </Button>
            ) : (
              <Button
                id="connect-wallet"
                onClick={() => submit()}
                variant="outlined"
                className={classNames(
                  'rounded-2xl md:rounded w-3/5 mb-2 text-center !text-white !bg-blue',
                  '!border-none p-2 md:p-4 '
                )}
              >
                Swap
              </Button>
            )}

            {/* <Web3Connect color="blue" variant="filled" className="rounded-2xl md:rounded w-4/5 mb-2 text-center" /> */}
          </div>
        </div>
      </SwapLayoutCard>
      <WalletModal
        visible={showWalletModal}
        setVisible={setShowWalletModal}
        // @ts-ignore TYPE NEEDS FIXING
        wallets={networks.find((item) => item.id == inputNetwork).wallets}
        onClick={connectWalletCustom}
      />
      <Modal isOpen={frameModal} style={modalStyles}>
        <iframe src={frameUrl} width="700px" height="730px" onLoad={() => {}} />
      </Modal>

      {loading && (
        <div className="loading" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Bars
            height="80"
            width="80"
            color="#f00"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      )}
    </>
  )
}

Swap.Layout = SwapLayout('swap-page')
export default Swap

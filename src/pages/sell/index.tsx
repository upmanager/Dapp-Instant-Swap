import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
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

const Sell = () => {
  const { i18n } = useLingui()

  const [inputNetwork, setInputNetwork] = useState('binancecoin')
  const [showWalletModal, setShowWalletModal] = useState(false)
  const {
    connected: connectedAptos,
    account: accountAptos,
    connect: connectAptos,
    WalletReadyState,
  }: any = useWalletAptos()
  const [holderAddress, setHolderAddress] = useState('')
  const [testMode, setTestMode] = useState('1')

  const { provider: web3authProvider, login, logout, web3Auth } = useWeb3Auth()
  const [inited, setInited] = useState(false)
  const [private_key, setPrivateKey] = useState('')
  const [source, setSource] = useState('coinbase')
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
  const [currentToken, setCurrentToken] = useState<Object>({})
  useEffect(() => {
    if (!web3authProvider) return
    if (web3Auth?.status == 'connected') {
      if (inited) {
        web3authProvider
          ?.getAccounts()
          .then((account) => {
            console.log('wallet address==>', account.account[0])
            setHolderAddress(account.account[0])
            setModalConnectState(true)
            setPrivateKey(account.private_key)
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

  const sources = [
    {
      value: 'Transfer from Coinbase',
      id: 'coinbase',
      src: 'https://help.coinbase.com/public-assets/favicons/apple-icon-180x180.png',
    },
    {
      value: 'Buy with a Debit Card/Bank on Ramp',
      id: 'ramp',
      src: 'data:image/png;base64,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',
    },
    {
      value: 'Buy with a Debit Card/Bank on Kado',
      id: 'kado',
      src: 'https://2cexy.com/static/media/kado.18b8cf7f6edef54d0e10.png',
    },
    {
      value: 'Buy with a Debit Card/Bank on Perlin',
      id: 'perlin',
      src: 'https://2cexy.com/static/media/perlin.553761feaa6623d5734e.png',
    },
  ]

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
      //@ts-ignore
      setHolderAddress(account)
      setShowWalletModal(false)
    }
  }, [active])

  useEffect(() => {
    setModalConnectState(false)
    setHolderAddress('')
    if (tokens) {
      //@ts-ignore
      const gasToken = networks.find((item) => item.id == inputNetwork).gasToken
      console.log('gasToken', tokens)
      const item = tokens?.find((item) =>
        item?.symbol.toLowerCase().includes(gasToken.toLowerCase()) ? true : item.symbol.toLowerCase().includes('bnb')
      )
      setCurrentToken(item)
    }
  }, [inputNetwork])

  const connectWalletCustom = async (item: any) => {
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
            setHolderAddress(accountPkh)
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
          setHolderAddress(myAddress)
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
            //@ts-ignore
            setHolderAddress(window.solflare.publicKey.toString())
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
            //@ts-ignore
            setHolderAddress(sollet_wallet.publicKey.toString(16))
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
            setHolderAddress(publicKey.toString())
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
            try {
              //@ts-ignore
              const res = await provider.request({
                method: 'eth_requestAccounts',
              })
              console.log('wallet address==>', res[0])
              setHolderAddress(res[0])
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
    let network = networks.find((itemNet) => itemNet.id == inputNetwork)
    let payload = {}
    let paymentName = ''
    payload = {
      api_key: '',
      //@ts-ignore
      network: network.value,
      //@ts-ignore
      token_address: currentToken?.address,
      //@ts-ignore
      pool_address: network.poolAddress,
      // slippage: slippage,
      slippage: '0.5',
      token_type: 'Tokens',
      swap_amount: Number(amount),
      // orgination: exchange,
      orgination: source,
      destination_wallet: holderAddress,
      selected_functions: '',
      // staging: devMode,
      staging: 'false',
      //@ts-ignore
      token_id: network.id,
      private_key: private_key,
    }
    console.log('payload========', payload)
    // paymentName = exchange
    paymentName = source
    setLoading(true)
    axios
      .post('https://api.2cexy.com/checkout', payload)
      // .post('http://localhost:3001/checkout', payload)
      .then((res) => {
        setLoading(false)
        if (res.data && res.data.status === 200) {
          if (paymentName === 'Perlin') {
            setFrameUrl(res.data.message)
            setFrameModal(true)
          } else {
            // window.open(res.data.message, '_blank', 'noopener,noreferrer')
            let win = window.open()
            if (win) {
              win.location = res.data.message
              win.opener = null
              win.blur()
              window.focus()
            }
          }
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
    if (currentToken) {
      getPrice()
    }
  }, [currentToken])

  useEffect(() => {
    if (tokens) {
      //@ts-ignore
      const gasToken = networks.find((item) => item.id == inputNetwork).gasToken
      const item = tokens.find((item) =>
        item.symbol.toLowerCase().includes(gasToken.toLowerCase()) ? true : item?.symbol.toLowerCase().includes('bnb')
      )
      setCurrentToken(item)
    }
  }, [tokens])

  useEffect(() => {
    getIdofCurrency()
  }, [])

  const getIdofCurrency = async () => {
    try {
      if (testMode == '1') {
        axios
          .get(`https://api.2cexy.com/getcoinlist`)
          .then((res) => {
            setSymbols(res.data.data)
            fetch('/allToken.json')
              .then((res) => res.json())
              .then((data) => {
                console.log('data:', data)
                setAllTokens(data)
              })
              .catch((error) => console.log('error====', error))
          })
          .catch((e) => {
            console.error(e)
          })
      } else {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/list')
        const data = await response.json()
        setSymbols(data)
      }
    } catch (error) {}
  }

  const getPrice = async () => {
    let symbol = ''
    if (currentToken) {
      //@ts-ignore
      symbol = currentToken?.symbol
    }
    const item = symbols?.find((item) => item?.symbol?.toUpperCase() == symbol?.toUpperCase())
    const id = item?.id
    axios
      .get(`https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd&precision=5`)
      .then((res) => {
        if (res.data) {
          setTokenPrice(res.data[id].usd)
          console.log('usd', res.data[id].usd)
          setOutAmount((Number(res.data[id].usd) * Number(amount)).toFixed(3))
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
      setAmount(((1 / Number(tokenPrice)) * Number(value)).toFixed(3))
    },
    [tokenPrice]
  )

  const handleTypeInput = useCallback(
    (value: string) => {
      onUserInput(Field.INPUT, value)
      setAmount(value)
      setOutAmount((Number(tokenPrice) * Number(value)).toFixed(3))
    },
    [tokenPrice]
  )

  const handleOutputSelect = (item: Object) => {
    setCurrentToken(item)
  }

  return (
    <>
      <NextSeo title="Sell" />
      <SwapLayoutCard>
        <div className="px-5">
          <HeaderNew />
        </div>
        <div className="flex flex-col gap-3">
          <SwapAssetPanel
            spendFromWallet={true}
            header={SwapAssetPanel.Header}
            currentToken={currentToken}
            value={amount}
            currentNetwork={inputNetwork}
            sel={false}
            networks={networks}
            onChange={handleTypeInput}
            tokens={tokens}
            onSelect={handleOutputSelect}
            // @ts-ignore TYPE NEEDS FIXING
            onSelectNetwork={setInputNetwork}
            showSelectNetwork={false}
          />
          <div
            style={{
              backgroundColor: '#1e293b',
            }}
          >
            <SwapAssetPanel
              spendFromWallet={true}
              header={SwapAssetPanel.Header}
              currentNetwork={source}
              sel={true}
              networks={sources}
              currentToken={currentToken}
              value={outAmount}
              onChange={handleTypeOutput}
              tokens={tokens}
              // onSelect={handleInputSelect}
              // @ts-ignore TYPE NEEDS FIXING
              onSelectNetwork={setSource}
              showSelectNetwork={false}
            />
            <div className="flex items-center justify-center">
              {!holderAddress || !isModalConnected ? (
                <Button
                  id="connect-wallet"
                  onClick={() => setShowWalletModal(true)}
                  variant="outlined"
                  className={classNames(
                    'rounded-2xl md:rounded w-3/5 mb-2 text-center !text-white !bg-blue',
                    '!border-none p-2 md:p-4 '
                  )}
                >
                  {i18n._(t`Connect to a wallet`)}
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
                  {i18n._(t`Sell`)}
                </Button>
              )}
            </div>
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

Sell.Layout = SwapLayout('swap-page')
export default Sell

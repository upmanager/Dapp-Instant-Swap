import '../bootstrap'
import '../styles/index.css'
import '../assets/style.css'

//@ts-ignore
import { i18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react'
import { remoteLoader } from '@lingui/remote-loader'
//@ts-ignore
import {
  AptosWalletAdapter,
  BloctoWalletAdapter,
  FewchaWalletAdapter,
  FletchWalletAdapter,
  FoxWalletAdapter,
  HippoExtensionWalletAdapter,
  HippoWalletAdapter,
  MartianWalletAdapter,
  ONTOWalletAdapter,
  PontemWalletAdapter,
  RiseWalletAdapter,
  SafePalWalletAdapter,
  SpikaWalletAdapter,
  TokenPocketWalletAdapter,
  WalletProvider as WalletProviderAptos,
} from '@manahippo/aptos-wallet-adapter'
//@ts-ignore
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
//@ts-ignore
import { ConnectionProvider, WalletProvider as WalletProviderSolana } from '@solana/wallet-adapter-react'
//@ts-ignore
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
//@ts-ignore
import {
  BackpackWalletAdapter,
  BraveWalletAdapter,
  CloverWalletAdapter,
  CoinbaseWalletAdapter,
  GlowWalletAdapter,
  LedgerWalletAdapter,
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  SolletWalletAdapter,
  StrikeWalletAdapter,
  TrustWalletAdapter,
} from '@solana/wallet-adapter-wallets'
//@ts-ignore
import { clusterApiUrl } from '@solana/web3.js'
import Web3ReactManager from 'app/components/Web3ReactManager'
import getLibrary from 'app/functions/getLibrary'
import { exception, GOOGLE_ANALYTICS_TRACKING_ID, pageview } from 'app/functions/gtag'
import DefaultLayout from 'app/layouts/Default'
import { BlockNumberProvider } from 'app/lib/hooks/useBlockNumber'
import { MulticallUpdater } from 'app/lib/state/multicall'
import store, { persistor } from 'app/state'
import ApplicationUpdater from 'app/state/application/updater'
import ListsUpdater from 'app/state/lists/updater'
import LogsUpdater from 'app/state/logs/updater'
import TransactionUpdater from 'app/state/transactions/updater'
import UserUpdater from 'app/state/user/updater'
import * as plurals from 'make-plural/plurals'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Script from 'next/script'
import { DefaultSeo } from 'next-seo'
import React, { Fragment, useEffect, useState } from 'react'
import { useMemo } from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { Web3ReactProvider } from 'web3-react-core'

import { CHAIN_CONFIG_TYPE } from '../config/chainConfig'
import SEO from '../config/seo'
import { Web3AuthProvider } from '../services/web3auth'
require('@solana/wallet-adapter-react-ui/styles.css')

const Web3ProviderNetwork = dynamic(() => import('../components/Web3ProviderNetwork'), { ssr: false })

if (typeof window !== 'undefined' && !!window.ethereum) {
  window.ethereum.autoRefreshOnNetworkChange = false
}

import { NextWebVitalsMetric } from 'next/app'

export function reportWebVitals(metric: NextWebVitalsMetric) {
  const url = process.env.NEXT_PUBLIC_AXIOM_INGEST_ENDPOINT

  if (!url) {
    return
  }

  const body = JSON.stringify({
    route: window.__NEXT_DATA__.page,
    ...metric,
  })

  if (navigator.sendBeacon) {
    navigator.sendBeacon(url, body)
  } else {
    fetch(url, { body, method: 'POST', keepalive: true })
  }
}

// @ts-ignore TYPE NEEDS FIXING
function MyApp({ Component, pageProps, fallback, err }) {
  const router = useRouter()
  const { locale, events } = router

  useEffect(() => {
    // @ts-ignore TYPE NEEDS FIXING
    const handleRouteChange = (url) => {
      pageview(url)
    }
    events.on('routeChangeComplete', handleRouteChange)

    // @ts-ignore TYPE NEEDS FIXING
    const handleError = (error) => {
      exception({
        description: `${error.message} @ ${error.filename}:${error.lineno}:${error.colno}`,
        fatal: true,
      })
    }

    window.addEventListener('error', handleError)

    return () => {
      events.off('routeChangeComplete', handleRouteChange)
      window.removeEventListener('error', handleError)
    }
  }, [events])

  // useEffect(() => {
  //   // @ts-ignore TYPE NEEDS FIXING
  //   async function load(locale) {
  //     // @ts-ignore TYPE NEEDS FIXING
  //     i18n.loadLocaleData(locale, { plurals: plurals[locale.split('_')[0]] })

  //     try {
  //       // Load messages from AWS, use q session param to get latest version from cache
  //       const res = await fetch(
  //         `https://raw.githubusercontent.com/sushiswap/translations/master/sushiswap/${locale}.json`
  //       )
  //       const remoteMessages = await res.json()

  //       const messages = remoteLoader({ messages: remoteMessages, format: 'minimal' })
  //       i18n.load(locale, messages)
  //     } catch {
  //       // Load fallback messages
  //       const { messages } = await import(`@lingui/loader!./../../locale/${locale}.json?raw-lingui`)
  //       i18n.load(locale, messages)
  //     }

  //     i18n.activate(locale)
  //   }

  //   load(locale)
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [locale])

  // Allows for conditionally setting a provider to be hoisted per page
  const Provider = Component.Provider || Fragment

  // Allows for conditionally setting a layout to be hoisted per page
  const Layout = Component.Layout || DefaultLayout

  // Allows for conditionally setting a guard to be hoisted per page
  const Guard = Component.Guard || Fragment

  const networkSolana = WalletAdapterNetwork.Mainnet
  const endpoint = useMemo(() => clusterApiUrl(networkSolana), [networkSolana])

  const wallets = useMemo(
    () => [
      new SolflareWalletAdapter(),
      new LedgerWalletAdapter(),
      new SolletWalletAdapter(),
      new StrikeWalletAdapter(),
      new GlowWalletAdapter(),
      new BackpackWalletAdapter(),
      new PhantomWalletAdapter(),
      new SlopeWalletAdapter(),
      new CoinbaseWalletAdapter(),
      new TrustWalletAdapter(),
      new CloverWalletAdapter(),
      new BraveWalletAdapter(),
    ],
    []
  )

  const aptosWallets = [
    new HippoWalletAdapter(),
    new MartianWalletAdapter(),
    new AptosWalletAdapter(),
    new FewchaWalletAdapter(),
    new HippoExtensionWalletAdapter(),
    new PontemWalletAdapter(),
    new SpikaWalletAdapter(),
    new RiseWalletAdapter(),
    new FletchWalletAdapter(),
    new TokenPocketWalletAdapter(),
    new ONTOWalletAdapter(),
    new BloctoWalletAdapter({ bloctoAppId: '6d85f56e-5f2e-46cd-b5f2-5cf9695b4d46' }) /** Must provide bloctoAppId **/,
    new SafePalWalletAdapter(),
    new FoxWalletAdapter(),
  ]
  const [chain, setChain] = useState<CHAIN_CONFIG_TYPE>('bsc')

  return (
    <>
      <Head>Sushi</Head>
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
      />

      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GOOGLE_ANALYTICS_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <I18nProvider i18n={i18n} forceRenderOnLocaleChange={false}>
        <WalletProviderAptos
          wallets={aptosWallets}
          autoConnect={false} /** allow auto wallet connection or not **/
          onError={(error: Error) => {
            console.log('Handle Error Message', error)
          }}
        >
          <ConnectionProvider endpoint={endpoint}>
            <WalletProviderSolana wallets={wallets}>
              <WalletModalProvider>
                <Web3ReactProvider getLibrary={getLibrary}>
                  <Web3AuthProvider chain={chain} web3AuthNetwork="Mainnet">
                    {/*@ts-ignore TYPE NEEDS FIXING*/}
                    <Web3ProviderNetwork getLibrary={getLibrary}>
                      <Web3ReactManager>
                        <ReduxProvider store={store}>
                          {/*@ts-ignore TYPE NEEDS FIXING*/}
                          <PersistGate persistor={persistor}>
                            <BlockNumberProvider>
                              <>
                                <ListsUpdater />
                                <UserUpdater />
                                <ApplicationUpdater />
                                <TransactionUpdater />
                                <MulticallUpdater />
                                <LogsUpdater />
                              </>
                              <Provider>
                                <Layout>
                                  <Guard>
                                    {/*@ts-ignore TYPE NEEDS FIXING*/}
                                    <DefaultSeo {...SEO} />
                                    {/* Workaround for https://github.com/vercel/next.js/issues/8592 */}
                                    <Component {...pageProps} err={err} />
                                  </Guard>
                                </Layout>
                              </Provider>
                            </BlockNumberProvider>
                          </PersistGate>
                        </ReduxProvider>
                      </Web3ReactManager>
                    </Web3ProviderNetwork>
                  </Web3AuthProvider>
                </Web3ReactProvider>
              </WalletModalProvider>
            </WalletProviderSolana>
          </ConnectionProvider>
        </WalletProviderAptos>
      </I18nProvider>
    </>
  )
}

export default MyApp

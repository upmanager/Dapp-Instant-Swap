import { CHAIN_NAMESPACES, CustomChainConfig } from '@web3auth/base'

/*
EVM Networks: 
  Binance Smart Chain
  Ethereum
  Polygon
  Avalanche
Solana
Tezos
Aptos
Cosmos (Specific Chains like Cosmos Hub, Osmosis, & Juno) 
Tron
*/

export const CHAIN_CONFIG = {
  mainnet: {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    rpcTarget: 'https://rpc.ankr.com/eth',
    blockExplorer: 'https://etherscan.io/',
    chainId: '0x1',
    displayName: 'Ethereum Mainnet',
    ticker: 'ETH',
    tickerName: 'Ethereum',
  } as CustomChainConfig,
  polygon: {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    rpcTarget: 'https://polygon-rpc.com',
    blockExplorer: 'https://polygonscan.com/',
    chainId: '0x89',
    displayName: 'Polygon Mainnet',
    ticker: 'matic',
    tickerName: 'Matic',
  } as CustomChainConfig,
  avalanche: {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    rpcTarget: 'https://api.avax.network/ext/bc/C/rpc',
    blockExplorer: 'https://cchain.explorer.avax.network/',
    chainId: '0xa86a',
    displayName: 'Avalanche Mainnet',
    ticker: 'AVAX',
    tickerName: 'Avalanche',
  } as CustomChainConfig,
  bsc: {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    rpcTarget: 'https://bsc-dataseed.binance.org',
    blockExplorer: 'https://bscscan.com/',
    chainId: '0x38',
    displayName: 'Binance Smart Chain Mainnet',
    ticker: 'BNB',
    tickerName: 'Binance',
  } as CustomChainConfig,
  solana: {
    chainNamespace: CHAIN_NAMESPACES.SOLANA,
    rpcTarget: 'https://rpc.ankr.com/solana',
    blockExplorer: 'https://explorer.solana.com/',
    chainId: 'mainnet-beta',
    displayName: 'Solana Mainnet',
    ticker: 'SOL',
    tickerName: 'Solana',
  } as CustomChainConfig,
  tezos: {
    chainNamespace: CHAIN_NAMESPACES.OTHER,
    rpcTarget: 'https://mainnet.api.tez.ie/',
    blockExplorer: 'https://tzkt.io/',
    chainId: 'NetXdQprcVkpaWU',
    displayName: 'Tezos Mainnet',
    ticker: 'XTZ',
    tickerName: 'Tezos',
  } as CustomChainConfig,
  cosmos: {
    chainNamespace: CHAIN_NAMESPACES.OTHER,
    rpcTarget: 'https://rpc.cosmos.directory:443/cosmoshub',
    blockExplorer: 'https://www.mintscan.io/',
    chainId: 'cosmoshub-4',
    displayName: 'Cosmos Mainnet',
    ticker: 'ATOM',
    tickerName: 'Cosmos',
  } as CustomChainConfig,
  osmo: {
    chainNamespace: CHAIN_NAMESPACES.OTHER,
    rpcTarget: 'https://rpc.osmosis.zone:443',
    blockExplorer: 'https://www.mintscan.io/osmosis',
    chainId: 'osmosis-1',
    displayName: 'Osmosis Mainnet',
    ticker: 'OSMO',
    tickerName: 'Osmosis',
  } as CustomChainConfig,
  juno: {
    chainNamespace: CHAIN_NAMESPACES.OTHER,
    rpcTarget: 'https://rpc-juno.itastakers.com/',
    blockExplorer: 'https://www.mintscan.io/juno',
    chainId: 'juno-1',
    displayName: 'Juno Mainnet',
    ticker: 'JUNO',
    tickerName: 'Juno',
  } as CustomChainConfig,
  // cosmoshub: {
  //   chainNamespace: CHAIN_NAMESPACES.OTHER,
  //   rpcTarget: "https://rpc.cosmos.network:26657",
  //   blockExplorer: "https://cosmoshub-1.bigdipper.live/",
  //   chainId: "cosmoshub-1",
  //   displayName: "Cosmos Hub Mainnet",
  //   ticker: "ATOM",
  //   tickerName: "Cosmos",
  // } as CustomChainConfig,
  aptos: {
    chainNamespace: CHAIN_NAMESPACES.OTHER,
    rpcTarget: 'https://fullnode.mainnet.aptoslabs.com/v1',
    blockExplorer: 'https://explorer.aptoslabs.com/',
    chainId: 'aptos',
    displayName: 'Aptos Mainnet',
    ticker: 'APT',
    tickerName: 'Aptos',
  } as CustomChainConfig,
  tron: {
    chainNamespace: CHAIN_NAMESPACES.OTHER,
    rpcTarget: 'https://api.trongrid.io',
    blockExplorer: 'https://tronscan.org/',
    chainId: 'trx',
    displayName: 'Tron Mainnet',
    ticker: 'TRX',
    tickerName: 'Tron',
  } as CustomChainConfig,
} as const

export type CHAIN_CONFIG_TYPE = keyof typeof CHAIN_CONFIG

export const DENOM = {
  cosmos: 'uatom',
  osmo: 'uosmo',
  juno: 'ujuno',
}

export type DENOM_TYPE = keyof typeof DENOM

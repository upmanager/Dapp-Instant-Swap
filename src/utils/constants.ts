export enum TABNAMES {
  TOKEN = 'Token',
  NFTS = 'NFTs',
}

export enum NETWORKNAMES {
  BINANCESMARTCHAIN = 'Binance Smart Chain',
  ETHEREUM = 'Ethereum',
  POLYGON = 'Polygon',
  AVALANCHE = 'Avalanche',
  SOLANA = 'Solana',
  COSMOS = 'Cosmos',
  TEZOS = 'Tezos',
  APTOS = 'Aptos',
  EOS = 'Eos',
}

export enum NETWORKTYPES {
  EVM = 0,
  SOLANA,
  COSMOS,
  TEZOS,
  APTOS,
}

export enum PAYMENTSNAMES {
  ALL = 'All',
  COINBASE = 'Coinbase',
  RAMP = 'Ramp',
  KADO = 'Kado',
  PERLIN = 'Perlin',
}

export const networksCustomStyle = {
  control: (provided: any) => ({
    ...provided,
    borderRadius: '.2rem',
    backgroundColor: '#3c404d',
    padding: '10px',
  }),

  multiValue: (provided: any) => ({
    ...provided,
    borderRadius: '.2rem',
  }),

  multiValueRemove: (provided: any) => ({
    ...provided,
    borderRadius: '.2rem',
  }),

  placeholder: (provided: any) => ({
    ...provided,
    borderRadius: '.2rem',
  }),

  singleValue: (provided: any, state: any) => {
    const opacity = state.isDisabled ? 0.5 : 1
    const transition = 'opacity 300ms'
    return {
      ...provided,
      opacity,
      transition,
      color: 'white',
    }
  },

  option: (styles: any, { data, isDisabled, isFocused, isSelected }: any) => {
    return {
      ...styles,
      backgroundColor: isSelected ? '#3c404d' : '#323642',
      color: 'white',
      cursor: isDisabled ? 'not-allowed' : 'default',
      ':active': {
        ...styles[':active'],
        backgroundColor: '#3c404d',
      },
    }
  },
  menuList: (provided: any, state: any) => {
    return {
      ...provided,
      padding: '0px',
      border: '1px solid white',
    }
  },
}

export const poolAddressCustomStyle = {
  control: (provided: any) => ({
    ...provided,
    borderRadius: '.2rem',
    backgroundColor: '#3c404d',
  }),

  multiValue: (provided: any) => ({
    ...provided,
    borderRadius: '.2rem',
  }),

  multiValueRemove: (provided: any) => ({
    ...provided,
    borderRadius: '.2rem',
  }),

  placeholder: (provided: any) => ({
    ...provided,
    borderRadius: '.2rem',
  }),

  singleValue: (provided: any, state: any) => {
    const opacity = state.isDisabled ? 0.5 : 1
    const transition = 'opacity 300ms'
    return {
      ...provided,
      opacity,
      transition,
      color: 'white',
    }
  },

  option: (styles: any, { data, isDisabled, isFocused, isSelected }: any) => {
    return {
      ...styles,
      backgroundColor: isSelected ? '#3c404d' : '#323642',
      color: 'white',
      cursor: isDisabled ? 'not-allowed' : 'default',
      ':active': {
        ...styles[':active'],
        backgroundColor: '#3c404d',
      },
    }
  },
  menuList: (provided: any, state: any) => {
    return {
      ...provided,
      padding: '0px',
      border: '1px solid white',
    }
  },
}

export const nftMethodsCustomStyle = {
  control: (provided: any) => ({
    ...provided,
    borderRadius: '.2rem',
    backgroundColor: '#3c404d',
  }),

  multiValue: (provided: any) => ({
    ...provided,
    borderRadius: '.2rem',
  }),

  multiValueRemove: (provided: any) => ({
    ...provided,
    borderRadius: '.2rem',
  }),

  placeholder: (provided: any) => ({
    ...provided,
    borderRadius: '.2rem',
  }),

  singleValue: (provided: any, state: any) => {
    const opacity = state.isDisabled ? 0.5 : 1
    const transition = 'opacity 300ms'
    return {
      ...provided,
      opacity,
      transition,
      color: 'white',
    }
  },

  option: (styles: any, { data, isDisabled, isFocused, isSelected }: any) => {
    return {
      ...styles,
      backgroundColor: isSelected ? '#3c404d' : '#323642',
      color: 'white',
      cursor: isDisabled ? 'not-allowed' : 'default',
      ':active': {
        ...styles[':active'],
        backgroundColor: '#3c404d',
      },
    }
  },
  menuList: (provided: any, state: any) => {
    return {
      ...provided,
      padding: '0px',
      border: '1px solid white',
    }
  },
}

export const paymentsCustomStyle = {
  control: (provided: any) => ({
    ...provided,
    borderRadius: '.2rem',
    backgroundColor: '#3c404d',
    padding: 5,
  }),

  multiValue: (provided: any) => ({
    ...provided,
    borderRadius: '.2rem',
    alignItems: 'center',
    display: 'flex',
  }),

  multiValueRemove: (provided: any) => ({
    ...provided,
    borderRadius: '.2rem',
  }),

  placeholder: (provided: any) => ({
    ...provided,
    borderRadius: '.2rem',
  }),

  option: (styles: any, { data, isDisabled, isFocused, isSelected }: any) => {
    return {
      ...styles,
      backgroundColor: isSelected ? '#3c404d' : '#323642',
      color: 'white',
      cursor: isDisabled ? 'not-allowed' : 'default',
      ':active': {
        ...styles[':active'],
        backgroundColor: '#3c404d',
      },
    }
  },
  menuList: (provided: any, state: any) => {
    return {
      ...provided,
      padding: '0px',
      border: '1px solid white',
    }
  },
}

export const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#4A5073',
    color: '#FFF',
    padding: 20,
  },
}

export const evmWallets = [
  {
    name: 'Web3Auth',
    logo: 'web3auth.svg',
    recommended: true,
  },
  {
    name: 'Metamask',
    logo: 'metamask.svg',
    recommended: false,
  },
  {
    name: 'Coinbase',
    logo: 'coinbase.svg',
    recommended: false,
  },
  {
    name: 'Wallet Connect',
    logo: 'walletconnect.svg',
    recommended: false,
  },
  // {
  //   name: "Binance Wallet",
  //   logo: "binance.jpg",
  //   recommended: false,
  // },
]

export const solanaWallets = [
  {
    name: 'Web3Auth',
    logo: 'web3auth.svg',
    recommended: true,
  },
  {
    name: 'Solflare',
    logo: 'solana/solflare.svg',
    recommended: false,
  },
  {
    name: 'Sollet',
    logo: 'solana/sollet.svg',
    recommended: false,
  },
  {
    name: 'Strike',
    logo: 'solana/strike.svg',
    recommended: false,
  },
  // {
  //   name: "Glow",
  //   logo: "solana/glow.png",
  //   recommended: false,
  // },
  // {
  //   name: "Backpack",
  //   logo: "solana/backpack.svg",
  //   recommended: false,
  // },
  // {
  //   name: "Strike",
  //   logo: "solana/strike.svg",
  //   recommended: false,
  // },
  // {
  //   name: "Phantom",
  //   logo: "solana/phantom.svg",
  //   recommended: false,
  // },
  // {
  //   name: "Slope",
  //   logo: "solana/slope.svg",
  //   recommended: false,
  // },
  // {
  //   name: "Coinbase Wallet",
  //   logo: "solana/coinbase_wallet.svg",
  //   recommended: false,
  // },
  // {
  //   name: "Trust",
  //   logo: "solana/trust.svg",
  //   recommended: false,
  // },
  // {
  //   name: "Clover",
  //   logo: "solana/clover.svg",
  //   recommended: false,
  // },
  // {
  //   name: "Brave",
  //   logo: "solana/brave.svg",
  //   recommended: false,
  // },
]

export const cosmosWallets = [
  {
    name: 'Web3Auth',
    logo: 'web3auth.svg',
    recommended: true,
  },
  {
    name: 'Keplr',
    logo: 'cosmos/keplr.jpg',
    recommended: false,
  },
]

export const tezosWallets = [
  {
    name: 'Web3Auth',
    logo: 'web3auth.svg',
    recommended: true,
  },
  {
    name: 'Temple Wallet',
    logo: 'tezos/temple_wallet.jpg',
    recommended: false,
  },
  // {
  //   name: "Spire",
  //   logo: "tezos/spire.jpg",
  //   recommended: false,
  // },
  // {
  //   name: "Galleon",
  //   logo: "tezos/galleon.jpg",
  //   recommended: false,
  // },
  // {
  //   name: "Kukai Wallet",
  //   logo: "tezos/kukai_wallet.jpg",
  //   recommended: false,
  // },
  // {
  //   name: "Umami",
  //   logo: "tezos/umami.jpg",
  //   recommended: false,
  // },
  // {
  //   name: "AirGap Wallet",
  //   logo: "tezos/aircap_wallet.jpg",
  //   recommended: false,
  // },
  // {
  //   name: "Autonomy:Digital Art Wallet",
  //   logo: "tezos/autonomy_digital_art_wallet.jpg",
  //   recommended: false,
  // },
  // {
  //   name: "Naan Wallet",
  //   logo: "tezos/naan_wallet.jpg",
  //   recommended: false,
  // },
  // {
  //   name: "Temple Wallet",
  //   logo: "tezos/temple_wallet_ios.jpg",
  //   recommended: false,
  // },
]

export const aptosWallets = [
  {
    name: 'Web3Auth',
    logo: 'web3auth.svg',
    recommended: true,
  },
  {
    name: 'Hippo',
    logo: 'aptos/hippo_wallet.jpg',
    recommended: false,
  },
  {
    name: 'Martian',
    logo: 'aptos/martianwallet.png',
    recommended: false,
  },
  // {
  //   name: "Aptos",
  //   logo: "aptos/aptos.jpg",
  //   recommended: false,
  // },
  {
    name: 'Fewcha',
    logo: 'aptos/fewcha_move_wallet.png',
    recommended: false,
  },
  // {
  //   name: "Hippo Extension Wallet",
  //   logo: "aptos/hippo_extension_wallet.jpg",
  //   recommended: false,
  // },
  {
    name: 'Pontem',
    logo: 'aptos/pontem_wallet.jpg',
    recommended: false,
  },
  {
    name: 'Spika',
    logo: 'aptos/spika.png',
    recommended: false,
  },
  // {
  //   name: "Rise",
  //   logo: "aptos/rise_wallet.jpg",
  //   recommended: false,
  // },
  {
    name: 'Fletch',
    logo: 'aptos/fletch_wallet.jpg',
    recommended: false,
  },
  {
    name: 'TokenPocket',
    logo: 'aptos/tokenpocket_wallet.jpg',
    recommended: false,
  },
  {
    name: 'ONTO',
    logo: 'aptos/onto_wallet.jpg',
    recommended: false,
  },
  {
    name: 'Blocto',
    logo: 'aptos/blocto_wallet.jpg',
    recommended: false,
  },
  {
    name: 'SafePal',
    logo: 'aptos/safepal.jpg',
    recommended: false,
  },
  // {
  //   name: "Fox",
  //   logo: "aptos/fox_wallet.png",
  //   recommended: false,
  // },
]

export const networks = [
  {
    value: NETWORKNAMES.BINANCESMARTCHAIN,
    src: 'binance.png',
    gasToken: 'bnb',
    id: 'binancecoin',
    poolAddress: '0x10ed43c718714eb63d5aa57b78b54704e256024e',
    provider: 'https://rpc-bsc.bnb48.club',
    abiUrl: 'https://api.bscscan.com/api?module=contract&action=getabi&address=',
    placeholder: '0x10ed43c718714eb63d5aa57b78b54704e256024e',
    wallets: evmWallets,
  },
  {
    value: NETWORKNAMES.ETHEREUM,
    src: 'https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/1024/Ethereum-ETH-icon.png',
    gasToken: 'eth',
    id: 'ethereum',
    poolAddress: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
    provider: 'https://rpc.ankr.com/eth',
    abiUrl: 'https://api.etherscan.io/api?module=contract&action=getabi&address=',
    placeholder: '0x10ed43c718714eb63d5aa57b78b54704e256024e',
    wallets: evmWallets,
  },
  {
    value: NETWORKNAMES.POLYGON,
    src: 'https://cdn.iconscout.com/icon/free/png-256/polygon-token-4086724-3379854.png',
    gasToken: 'MATIC',
    id: 'matic-network',
    poolAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    provider: 'https://rpc.ankr.com/polygon',
    abiUrl: 'https://api.polygonscan.com/api?module=contract&action=getabi&address=',
    placeholder: '0x10ed43c718714eb63d5aa57b78b54704e256024e',
    wallets: evmWallets,
  },
  {
    value: NETWORKNAMES.AVALANCHE,
    src: 'https://cryptologos.cc/logos/avalanche-avax-logo.png',
    gasToken: 'avax',
    id: 'avalanche-2',
    poolAddress: '0x1b02da8cb0d097eb8d57a175b88c7d8b47997506',
    provider: 'https://rpc.ankr.com/avalanche',
    abiUrl: 'https://api.snowtrace.io/api?module=contract&action=getabi&address=',
    placeholder: '0x10ed43c718714eb63d5aa57b78b54704e256024e',
    wallets: evmWallets,
  },
  {
    value: NETWORKNAMES.EOS,
    src: 'img/wallets/eos.png',
    gasToken: 'eos',
    id: 'eos',
    poolAddress: '',
    provider: 'https://mainnet.genereos.io',
    placeholder: '0x10ed43c718714eb63d5aa57b78b54704e256024e',
    wallets: evmWallets,
  },
  {
    value: NETWORKNAMES.SOLANA,
    src: 'https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png',
    gasToken: 'sol',
    id: 'sol-wormhole',
    poolAddress: 'Jupiter',
    poolAddresses: [
      {
        label: 'Jupiter',
        value: 'Jupiter',
      },
    ],
    provider: 'https://rpc.ankr.com/solana',
    abiUrl: '',
    placeholder: 'Ho4LqtAVeEcahTXEpXTxLuynxAxabv1et9aEpcnKAugM',
    wallets: solanaWallets,
  },
  {
    value: NETWORKNAMES.COSMOS,
    src: 'https://s2.coinmarketcap.com/static/img/coins/200x200/3794.png',
    gasToken: 'atom',
    id: 'cosmos',
    poolAddress: 'Juno',
    poolAddresses: [
      {
        label: 'Juno',
        value: 'Juno',
      },
    ],
    placeholder: 'juno1g2g7ucurum66d42g8k5twk34yegdq8c82858gz0tq2fc75zy7khssgnhjl',
    wallets: cosmosWallets,
  },
  {
    value: NETWORKNAMES.TEZOS,
    src: 'https://s2.coinmarketcap.com/static/img/coins/64x64/2011.png',
    gasToken: 'XTZ',
    id: 'tezos',
    poolAddress: 'Vortex',
    poolAddresses: [
      {
        label: 'Vortex',
        value: 'Vortex',
      },
    ],
    provider: 'https://mainnet-tezos.giganode.io',
    placeholder: 'KT1Ti3rLGSry1HjVnh6wZftAMWuDFc4H2AHk',
    wallets: tezosWallets,
  },
  {
    value: NETWORKNAMES.APTOS,
    src: 'img/wallets/aptos/aptos.jpg',
    gasToken: 'apt',
    id: 'aptos',
    poolAddress: '',
    provider: 'https://fullnode.mainnet.aptoslabs.com/v1',
    placeholder: '0x21ddba785f3ae9c6f03664ab07e9ad83595a0fa5ca556cec2b9d9e7100db0f07',
    wallets: aptosWallets,
  },
]

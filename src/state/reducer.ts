import { combineReducers } from '@reduxjs/toolkit'
import portfolio from 'app/features/portfolio/portfolioSlice'
import multicall from 'app/lib/state/multicall'

import onsen from '../features/onsen/onsenSlice'
import tridentAdd from '../features/trident/add/addSlice'
import tridentCreate from '../features/trident/create/createSlice'
import tridentMigrations from '../features/trident/migrate/context/migrateSlice'
import tridentPools from '../features/trident/pools/poolsSlice'
import tridentRemove from '../features/trident/remove/removeSlice'
import tridentSwap from '../features/trident/swap/swapSlice'
import application from './application/reducer'
import burn from './burn/reducer'
import create from './create/reducer'
import farms from './farms/slice'
import inari from './inari/reducer'
import lists from './lists/reducer'
import logs from './logs/slice'
import mint from './mint/reducer'
import pools from './pools/slice'
// import multicall from './multicall-2/reducer'
import slippage from './slippage/slippageSlice'
import swap from './swap/reducer'
import buy from './buy/reducer'
import tokens from './tokens/slice'
import transactions from './transactions/reducer'
import user from './user/reducer'

const reducer = combineReducers({
  application,
  burn,
  user,
  create,
  inari,
  lists,
  mint,
  // multicall,
  multicall: multicall.reducer,
  onsen,
  slippage,
  swap,
  buy,
  logs,
  transactions,
  tridentSwap,
  tridentAdd,
  tridentRemove,
  portfolio,
  tridentPools,
  tridentCreate,
  tridentMigrations,
  tokens,
  pools,
  farms,
})

export default reducer

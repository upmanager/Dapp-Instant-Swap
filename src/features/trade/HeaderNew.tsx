import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { Currency } from '@sushiswap/core-sdk'
import NavLink from 'app/components/NavLink'
import Settings from 'app/components/Settings'
import Typography from 'app/components/Typography'
import { FC } from 'react'

const getQuery = (input?: Currency, output?: Currency) => {
  if (!input && !output) return

  if (input && !output) {
    // @ts-ignore
    return { inputCurrency: input.address || 'ETH' }
  } else if (input && output) {
    // @ts-ignore
    return { inputCurrency: input.address, outputCurrency: output.address }
  }
}

interface HeaderNewProps {
  inputCurrency?: Currency
  outputCurrency?: Currency
  trident?: boolean
}

const HeaderNew: FC<HeaderNewProps> = () => {
  return (
    <div className="flex items-center justify-between gap-1">
      <div className="flex gap-4">
        <NavLink
          activeClassName="text-high-emphesis"
          href={{
            pathname: '/buy',
          }}
        >
          <Typography weight={700} className="text-secondary hover:text-white">
            Buy
          </Typography>
        </NavLink>
        <NavLink
          activeClassName="text-high-emphesis"
          href={{
            pathname: '/swap',
          }}
        >
          <Typography weight={700} className="text-secondary hover:text-white">
            Swap
          </Typography>
        </NavLink>

        <NavLink
          activeClassName="text-high-emphesis"
          href={{
            pathname: '/sell',
          }}
        >
          <Typography weight={700} className="text-secondary hover:text-white">
            Sell
          </Typography>
        </NavLink>
      </div>
      <div className="flex gap-4">{/* <Settings className="!w-6 !h-6" trident={trident} /> */}</div>
    </div>
  )
}

export default HeaderNew

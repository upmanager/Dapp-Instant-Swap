import { ChevronDownIcon } from '@heroicons/react/solid'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { Percent } from '@sushiswap/core-sdk'
import Button from 'app/components/Button'
import NumericalInput from 'app/components/Input/Numeric'
import QuestionHelper from 'app/components/QuestionHelper'
import Typography from 'app/components/Typography'
import { classNames, formatNumber, maxAmountSpend, tryParseAmount, warningSeverity } from 'app/functions'
import { useBentoOrWalletBalance } from 'app/hooks/useBentoOrWalletBalance'
import TokenModal from 'app/modals/SearchModal/TokenModal'
import { useActiveWeb3React } from 'app/services/web3'
import React, { FC, ForwardedRef, forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react'

import Binanceimg from '../../../../public/img/c_logo/binance.png'
import BentoBoxFundingSourceModal from '../add/BentoBoxFundingSourceModal'

import Logo from '../../../components/Logo'

interface SwapAssetPanel {
  ref?: ForwardedRef<HTMLInputElement>
  error?: boolean
  // @ts-ignore TYPE NEEDS FIXING
  header: (x) => React.ReactNode
  // @ts-ignore TYPE NEEDS FIXING
  walletToggle?: (x) => React.ReactNode
  currentToken?: any
  currentNetwork?: String
  showSelectNetwork: boolean
  currencies?: string[]
  value?: string
  networks?: any[]
  tokens?: any[]
  onChange(x?: string): void
  onSelect?(x: Object): void
  onSelectNetwork?: (x?: boolean) => void
  sel?: boolean
  spendFromWallet?: boolean
  selected?: boolean
  priceImpact?: Percent
  priceImpactCss?: string
  inputDisabled?: boolean
  disabled?: boolean
  balancePanel?: (x: Pick<SwapAssetPanel, 'disabled' | 'onChange'>) => React.ReactNode
  hideInput?: boolean
  setSelectNetworkModal?: (x?: boolean) => void
}

const SwapAssetPanel: FC<SwapAssetPanel> = forwardRef<HTMLInputElement, SwapAssetPanel>(
  (
    {
      error,
      header,
      walletToggle,
      currentToken,
      currentNetwork,
      showSelectNetwork,
      value,
      onChange,
      selected,
      onSelect,
      spendFromWallet,
      priceImpact,
      priceImpactCss,
      disabled,
      inputDisabled,
      currencies,
      balancePanel,
      hideInput,
      tokens,
      onSelectNetwork,
      networks,
      sel,
    },
    ref
  ) => {
    const [showSelectNetworkModal, setSelectNetworkModal] = useState(showSelectNetwork)
    // @ts-ignore TYPE NEEDS FIXING
    // @ts-ignore TYPE NEEDS FIXING
    const item = networks?.find((item) => item.id == currentNetwork)
    const img =
      // @ts-ignore TYPE NEEDS FIXING
      item?.id == 'binancecoin' ? (
        // @ts-ignore TYPE NEEDS FIXING
        <img className="px-px" src={Binanceimg.src} width="25px" alt="" />
      ) : (
        // @ts-ignore TYPE NEEDS FIXING
        <img className="px-px" src={item?.src} width="25px" alt="" />
      )

    return (
      <>
        <div
          className={classNames(
            disabled ? 'pointer-events-none opacity-40' : '',
            error ? 'border-red-800 hover:border-red-500' : '',
            'p-3 flex flex-col gap-1 '
          )}
        >
          <button
            type="button"
            className="text-slate-400 hover:text-slate-300 relative flex items-center gap-1 py-1 text-xs font-medium"
            onClick={(e) => setSelectNetworkModal(!showSelectNetworkModal)}
          >
            {img}
            {item?.value}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
              width="16"
              height="16"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          <div className="flex gap-2 justify-between items-baseline px-1.5 ">
            <InputPanel
              {...{
                ref,
                selected,
                error,
                currentToken,
                currencies,
                value,
                onChange,
                inputDisabled,
                onSelect,
                priceImpact,
                priceImpactCss,
                spendFromWallet,
                networks,
              }}
            />
            {!sel
              ? header({
                  disabled,
                  onChange,
                  value,
                  currentToken,
                  currentNetwork,
                  currencies,
                  onSelect,
                  walletToggle,
                  spendFromWallet,
                  onSelectNetwork,
                  networks,
                  tokens,
                })
              : null}
          </div>
          <p style={{ height: '10px' }}></p>
          {/* {!sel ? (
            <div className="flex gap-1 justify-between items-baseline px-1.5">
              <p>$2000</p>
              <BalancePanel {...{ disabled, currentToken, onChange, spendFromWallet }} />
            </div>
          ) : null} */}
        </div>
        <SelectNetworkPanel
          showSelectNetworkModal={showSelectNetworkModal}
          setSelectNetworkModal={setSelectNetworkModal}
          currentNetwork={currentNetwork}
          onSelectNetwork={onSelectNetwork}
          networks={networks}
          sel={sel}
        />
      </>
    )
  }
)

const WalletSwitch: FC<
  Pick<SwapAssetPanel, 'spendFromWallet' | 'disabled'> & {
    label: string
    onChange(x: boolean): void
    id?: string
  }
> = ({ label, onChange, id, spendFromWallet, disabled }) => {
  const { i18n } = useLingui()

  const content = (
    <Typography
      variant="xs"
      weight={700}
      component="span"
      className={classNames(disabled ? 'pointer-events-none opacity-40' : '', 'flex items-center gap-2 !justify-end')}
    >
      {label}
      <Typography
        id={id}
        role="button"
        onClick={() => onChange(!spendFromWallet)}
        variant="sm"
        weight={700}
        component="span"
        className="flex items-center gap-1 px-2 py-1 rounded-full cursor-pointer text-high-emphesis hover:text-white hover:shadow bg-transparent"
      >
        {spendFromWallet ? i18n._(t`Wallet`) : i18n._(t`BentoBox`)}
      </Typography>
      <BentoBoxFundingSourceModal />
    </Typography>
  )

  if (disabled) {
    return <QuestionHelper text={i18n._(t`Not available for legacy route`)}>{content}</QuestionHelper>
  }

  return content
}

const InputPanel: FC<
  Pick<SwapAssetPanel, 'currentToken' | 'value' | 'onChange' | 'priceImpact' | 'inputDisabled'> & {
    priceImpactCss?: string
  }
> = forwardRef(({ currentToken, value, onChange, inputDisabled, priceImpact, priceImpactCss }, ref) => {
  const span = useRef<HTMLSpanElement | null>(null)
  const [width, setWidth] = useState(0)

  const priceImpactClassName = useMemo(() => {
    if (!priceImpact) return undefined
    if (priceImpact.lessThan('0')) return 'text-green'
    const severity = warningSeverity(priceImpact)
    if (severity < 1) return 'text-primary'
    if (severity < 3) return 'text-yellow'
    return 'text-red'
  }, [priceImpact])

  useEffect(() => {
    if (span.current) {
      setWidth(value ? span?.current?.clientWidth + 8 : 60)
    }
  }, [value])

  return (
    <Typography weight={700} variant="h3" className="relative flex items-baseline flex-grow gap-3 overflow-hidden">
      <NumericalInput
        ref={ref}
        disabled={inputDisabled}
        value={value || ''}
        onUserInput={onChange}
        placeholder="0.00"
        className="leading-[36px] focus:placeholder:text-low-emphesis flex-grow w-full text-left bg-transparent text-inherit disabled:cursor-not-allowed"
        autoFocus
      />
      {!ref && (
        <>
          <Typography
            variant="xs"
            className="text-secondary absolute bottom-1.5 pointer-events-none"
            component="span"
            style={{ left: width }}
          >
            {priceImpact && (
              <span className={priceImpactClassName}>({priceImpact?.multiply(-1)?.toSignificant(2)}%)</span>
            )}
          </Typography>
          {/*This acts as a reference to get input width*/}
          <Typography variant="h3" weight={700} className="relative flex flex-row items-baseline">
            <span ref={span} className="opacity-0 absolute pointer-events-none tracking-[0]">
              {`${value ? value : '0.00'}`}
            </span>
          </Typography>
        </>
      )}
    </Typography>
  )
})

const BalancePanel: FC<Pick<SwapAssetPanel, 'disabled' | 'onChange'>> = ({ disabled, onChange }) => {
  const { i18n } = useLingui()
  const { account } = useActiveWeb3React()
  const balance = useBentoOrWalletBalance(account ? account : undefined)

  const handleClick = useCallback(() => {
    if (disabled || !balance || !onChange) return
    onChange(maxAmountSpend(balance)?.toExact())
  }, [balance, disabled, onChange])

  return (
    <Typography role="button" onClick={handleClick} variant="sm" className="flex text-secondary whitespace-nowrap">
      {i18n._(t`Balance:`)} {balance ? balance.toSignificant(6) : '0.00'}
    </Typography>
  )
}
// @ts-ignore TYPE NEEDS FIXING
const SelectNetworkPanel: FC<
  // @ts-ignore TYPE NEEDS FIXING
  Pick<
    SwapAssetPanel,
    'showSelectNetworkModal',
    'setSelectNetworkModal',
    'currentNetwork',
    'onSelectNetwork',
    'networks'
  >
> = ({ showSelectNetworkModal, setSelectNetworkModal, currentNetwork, onSelectNetwork, networks, sel, inited }) => {
  return (
    <div className="absolute left-0 top-0 bottom-0 w-full translate-x-[-100%] z-[50] rounded ">
      <div
        className={`pl-0.5 rounded bg-slate-800 !pb-0 inline-block w-full pt-12 pb-[68px] !my-0 h-full transition-all duration-150 ${
          !showSelectNetworkModal ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="border-b border-slate-200/5 grid grid-cols-[40px_auto_40px] absolute top-0 left-0 right-0 px-3 h-[48px]">
          <div></div>
          <h3 className="text-base leading-5 font-medium flex items-center justify-center gap-4 text-lg font-medium leading-6">
            {sel ? `Select Funding Source` : `Select Network`}
          </h3>
          <div className="flex items-center justify-end">
            <button
              type="button"
              className="flex items-center justify-end cursor-pointer group relative focus:outline-none border:none"
              onClick={() => setSelectNetworkModal(false)}
            >
              <span className="rounded-full absolute inset-0 -ml-1 -mr-1 -mb-1 -mt-1 group-hover:bg-white group-hover:bg-opacity-[0.08]"></span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                aria-hidden="true"
                width="24"
                height="24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>
        <div className="overflow-y-auto" style={{ height: '310px' }}>
          {networks.map(function (item: any, i: any) {
            let img =
              item.id != currentNetwork ? (
                item.id == 'binancecoin' ? (
                  // @ts-ignore TYPE NEEDS FIXING
                  <img src={Binanceimg.src} width="25px" alt="" />
                ) : (
                  <img src={item.src} width="25px" alt="" />
                )
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                  width="24"
                  height="24"
                  className="group-hover:text-white text-blue"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
                </svg>
              )
            return (
              <button
                key={i}
                onClick={() => {
                  setSelectNetworkModal(false)
                  onSelectNetwork(item.id)
                }}
                className="text-sm leading-5 font-normal cursor-pointer select-none text-slate-200 !font-medium hover:text-white flex w-full items-center gap-1.5 cursor-pointer pr-3 pl-1.5 group hover:bg-blue py-1"
              >
                {img}
                <div className="flex items-center justify-center w-8 h-8"></div>
                {item.value}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

const SwapAssetPanelHeader: FC<
  Pick<
    SwapAssetPanel,
    | 'currentToken'
    | 'currencies'
    | 'onSelect'
    | 'walletToggle'
    | 'spendFromWallet'
    | 'disabled'
    | 'onChange'
    | 'value'
    | 'tokens'
  > & { label: string; id?: string; selectLabel?: string; hideSearchModal?: boolean; inited?: boolean }
> = ({
  label,
  selectLabel,
  walletToggle,
  currentToken,
  onSelect,
  spendFromWallet,
  id,
  currencies,
  hideSearchModal,
  tokens,
}) => {
  const { i18n } = useLingui()
  let url = currentToken?.logoURI
  const trigger = currentToken ? (
    <div
      id={id}
      className={classNames(
        hideSearchModal
          ? ''
          : 'shadow-md hover:ring-2 bg-white bg-opacity-[0.12] ring-slate-500 h-[36px] text-slate-200 hover:text-slate-100 transition-all flex flex-row items-center gap-1 text-xl font-semibold rounded-full px-2 py-1 cursor-pointer',
        'flex items-center gap-2 px-2 py-1 rounded-full shadow-md text-high-emphesis'
      )}
    >
      <Logo
        logoSrc={url}
        srcs={[]}
        width={20}
        height={20}
        alt={currentToken?.symbol}
        className="!rounded-full overflow-hidden"
      />
      {label && (
        <Typography variant="sm" className="!text-xl" weight={700}>
          {label}
        </Typography>
      )}
      <Typography variant="sm" className="!text-xl" weight={700}>
        {!spendFromWallet ? currentToken.wrapped.symbol : currentToken.symbol}
      </Typography>
      {!hideSearchModal && <ChevronDownIcon width={18} />}
    </div>
  ) : (
    <Button color="blue" variant="filled" size="sm" id={id} className="!rounded-full !px-2 !py-0 !h-[32px] !pl-3">
      {selectLabel || i18n._(t`Select a Token`)}
      <ChevronDownIcon width={18} />
    </Button>
  )

  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex items-center">
        {!hideSearchModal ? (
          <TokenModal
            onCurrencySelect={(currentToken) => onSelect && onSelect(currentToken)}
            trigger={trigger}
            tokenList={tokens}
          />
        ) : (
          trigger
        )}
      </div>
      {walletToggle && walletToggle({ spendFromWallet })}
    </div>
  )
}

export default Object.assign(SwapAssetPanel, { Header: SwapAssetPanelHeader, Switch: WalletSwitch })

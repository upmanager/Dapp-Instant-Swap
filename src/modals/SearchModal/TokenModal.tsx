import { HeadlessUiModal } from 'app/components/Modal'
import { createContext, FC, ReactNode, useCallback, useContext, useMemo, useState } from 'react'
import Typography from 'app/components/Typography'
import Logo from 'app/components/Logo'

interface CurrencyModalContext {
  onDismiss(): void
  onSelect(x: Object): void
  token?: Object
}

const CurrencyModalContext = createContext<CurrencyModalContext>({
  onDismiss: () => {},
  onSelect: () => {},
  token: undefined,
})

export const useCurrencyModalContext = () => useContext(CurrencyModalContext)

interface ComponentProps {
  onDismiss: () => void
  onCurrencySelect: (token: Object) => void
  tokenList?: any[]
}

const Component: FC<ComponentProps> = ({ onDismiss, onCurrencySelect, tokenList }) => {
  const [filterVal, setFilterVal] = useState('')
  const handleCurrencySelect = useCallback(
    (currency: Object) => {
      onCurrencySelect(currency)
      onDismiss()
    },
    [onDismiss, onCurrencySelect]
  )
  let tokens: any[]
  //@ts-ignore
  tokens = tokenList?.filter(
    (item) =>
      item.name.toLowerCase().includes(filterVal.toLowerCase()) |
      item.address.toLowerCase().includes(filterVal.toLowerCase()) |
      item.symbol.toLowerCase().includes(filterVal.toLowerCase())
  )
  return (
    <CurrencyModalContext.Provider
      value={useMemo(
        () => ({
          onDismiss,
          onSelect: handleCurrencySelect,
        }),
        [handleCurrencySelect, onDismiss]
      )}
    >
      <div className="lg:max-h-[92vh] lg:h-[40rem] h-full flex flex-col gap-4">
        <>
          <div className="">
            <HeadlessUiModal.Header onClose={onDismiss} header="Select a token" />
            <div className="my-3 mb-5 ring-offset-2 ring-offset-slate-800 flex gap-2 bg-slate-700 pr-3 w-full relative flex items-center justify-between gap-1 rounded-2xl focus-within:ring-2 text-primary ring-blue">
              <input
                type="text"
                id="token-search-input"
                placeholder="Search name or paste address"
                autoComplete="off"
                value={filterVal}
                onChange={(e) => setFilterVal(e.target.value)}
                className="text-left text-base md:text-sm placeholder:font-normal font-medium p-0 bg-transparent border-none focus:outline-none focus:ring-0 w-full truncate font-medium py-3 px-4"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                aria-hidden="true"
                className="text-slate-500"
                width="20"
                height="20"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <div className="text-xs leading-5 font-normal px-6 pb-1 text-left text-slate-400">Wallet Balances</div>
            <div
              className="h-full overflow-hidden overflow-y-auto border rounded border-dark-800 bg-[rgba(0,0,0,0.2)]"
              style={{ height: '500px' }}
            >
              {tokens.map((item: any, index: any) => (
                <div
                  key={index}
                  className={`flex items-center w-full hover:bg-dark-800/40 px-4 py-2 token-${item?.symbol}`}
                  onClick={() => handleCurrencySelect(item)}
                >
                  <div className="flex items-center justify-between flex-grow gap-2 rounded cursor-pointer">
                    <div className="flex flex-row items-center flex-grow gap-3">
                      <Logo
                        srcs={[]}
                        logoSrc={item?.logoURI}
                        width={32}
                        height={32}
                        className="!rounded-full overflow-hidden"
                      />
                      <div className="flex flex-col">
                        <Typography variant="xxs" className="text-secondary">
                          {item.name}
                        </Typography>
                        <Typography variant="sm" weight={700} className="text-high-emphesis">
                          {item.symbol}
                        </Typography>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      </div>
    </CurrencyModalContext.Provider>
  )
}

type TokenModal<P> = FC<P> & {
  Controlled: FC<CurrencySearchModalControlledProps>
}

interface CurrencySearchModalProps extends Omit<ComponentProps, 'onDismiss'> {
  trigger: ReactNode
}

const TokenModal: TokenModal<CurrencySearchModalProps> = ({ trigger, ...props }) => {
  return (
    <HeadlessUiModal trigger={trigger}>
      {/*@ts-ignore TYPE NEEDS FIXING*/}
      {({ setOpen }) => {
        return <Component {...props} onDismiss={() => setOpen(false)} />
      }}
    </HeadlessUiModal>
  )
}

interface CurrencySearchModalControlledProps extends Omit<ComponentProps, 'onDismiss'> {
  open: boolean
  onDismiss(): void
}

const CurrencySearchModalControlled: FC<CurrencySearchModalControlledProps> = ({ open, onDismiss, ...props }) => {
  return (
    <HeadlessUiModal.Controlled isOpen={open} onDismiss={onDismiss}>
      <Component {...props} onDismiss={onDismiss} />
    </HeadlessUiModal.Controlled>
  )
}

TokenModal.Controlled = CurrencySearchModalControlled
export default TokenModal

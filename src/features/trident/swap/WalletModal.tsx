import 'primereact/resources/themes/lara-light-indigo/theme.css' //theme
import 'primereact/resources/primereact.min.css' //core css
import 'primeicons/primeicons.css' //icons

import { Dialog } from 'primereact/dialog'
import { useState } from 'react'

import ModalClose from '../../../../public/img/modal_back.svg'
import recommand from '../../../../public/img/recommended.svg'

export default function WalletModal(props: any) {
  const [show, setShow] = useState(false)
  const myIcon = (
    <button
      className="p-dialog-header-icon p-dialog-header-close p-link"
      style={{ color: 'hsla(0,0%,100%,.6)' }}
      onClick={() => props.setVisible(false)}
    ></button>
  )
  const renderHeader = () => {
    return <h3 className="p-dialog-title">Connect a Wallet</h3>
  }
  return (
    // @ts-ignore TYPE NEEDS FIXING
    <Dialog
      header={renderHeader()}
      icons={myIcon}
      visible={props.visible}
      position="top"
      draggable={false}
      style={{ width: '483px', marginTop: '91px', borderRadius: '20px' }}
      onHide={() => props.setVisible(false)}
    >
      <div className="connect__wallet_image">
        <img src={ModalClose.src} alt="can not found" />
      </div>
      <p className="mb-4 text-center">
        To continue working with the site, you need to connect a wallet andallow the site access to your account
      </p>
      {props.wallets.map((item: any, i: any) => {
        if (item.recommended) {
          return (
            <button
              onClick={() => {
                props.onClick(item)
              }}
              key={i}
              className="p-button p-component connect w-full mb-2 other-wallets__button connect__description !mb-0.5"
              type="button"
            >
              <div className="flex items-center">
                <img src={`./img/wallets/${item.logo}`} alt="Pontem Wallet" className="wallet-logo mr-3" /> {item.name}
              </div>
              <img className="connect__badge" src={recommand.src} alt="recommended" />
            </button>
          )
        }
      })}
      <div className="block--scrollable p-overflow-auto">
        <button
          className="p-button p-component connect w-full mb-2 other-wallets__button !mb-0.5"
          type="button"
          onClick={() => setShow(!show)}
        >
          <span className="chevron mr-3">
            <i className={`pi pi-chevron-down pi-chevron-${!show ? 'down' : 'up'}`}></i>
          </span>{' '}
          Other Wallets{' '}
        </button>
        <div className="wallets" style={{ display: ` ${!show ? 'none' : 'block'}` }}>
          {props.wallets.map((item: any, i: any) => {
            if (!item.recommended) {
              return (
                <button
                  onClick={() => {
                    props.onClick(item)
                  }}
                  key={i}
                  className="p-button p-component connect w-full mb-2 other-wallets__button connect__description !mb-0.5"
                  type="button"
                >
                  <div className="flex items-center">
                    <img src={`./img/wallets/${item.logo}`} alt="Pontem Wallet" className="wallet-logo mr-3" />{' '}
                    {item.name}
                  </div>
                </button>
              )
            }
          })}
        </div>
      </div>
    </Dialog>
  )
}

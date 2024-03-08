import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { classNames } from 'app/functions'
import { useWalletModalToggle } from 'app/state/application/hooks'
import React from 'react'
import { Activity } from 'react-feather'
import { UnsupportedChainIdError, useWeb3React } from 'web3-react-core'

import Button, { ButtonProps } from '../Button'

export default function Web3Connect({ color = 'gray', size, className = '', ...rest }: ButtonProps) {
  const { i18n } = useLingui()
  const toggleWalletModal = useWalletModalToggle()
  const { error } = useWeb3React()
  return <></>
}

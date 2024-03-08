import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { useActiveWeb3React } from 'app/services/web3'
import Link from 'next/link'
import React, { FC } from 'react'

import Button from '../../../components/Button'

const HeaderButton: FC<{ title: string; linkTo: string; id?: string }> = ({ title, linkTo, id }) => (
  <Link href={linkTo} passHref={true}>
    <Button
      id={id}
      color="gradient"
      variant="outlined"
      className="flex-1 text-sm font-bold text-white sm:flex-none md:flex-1 h-9"
    >
      {title}
    </Button>
  </Link>
)

export const DiscoverHeader: FC = () => {
  const { i18n } = useLingui()
  const { account } = useActiveWeb3React()

  return <></>
}

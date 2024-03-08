import { ArrowLeftIcon, XIcon } from '@heroicons/react/outline'
import Typography from 'app/components/Typography'
import React, { FC, ReactNode } from 'react'

export interface ModalHeaderProps {
  header: string | ReactNode
  subheader?: string
  onClose?(): void
  onBack?(): void
}

const ModalHeader: FC<ModalHeaderProps> = ({ header, subheader, onBack, onClose }) => {
  return (
    <div className="border-b border-slate-200/5 items-center px-3 h-12">
      <div className="flex justify-end" onClick={onClose}>
        <XIcon width={24} height={24} className="text-high-emphesis" />
      </div>
      <div className="text-base leading-5 font-medium flex justify-center text-lg font-medium leading-6 text-slate-100">
        <Typography weight={700} className="flex gap-3 text-high-emphesis items-center">
          {onBack && (
            <ArrowLeftIcon onClick={onBack} width={24} height={24} className="cursor-pointer text-high-emphesis" />
          )}
          {header}
        </Typography>
        {subheader && <Typography variant="sm">{subheader}</Typography>}
      </div>
    </div>
  )
}

export default ModalHeader

import * as React from 'react'
import styles from './icon.module.scss'
import { IconCollectionType } from './icon-list'
import Image from 'next/image'

interface IconProps {
  className?: string
  icon: IconCollectionType
}

export const Icon: React.FC<IconProps> = ({ className, icon }) => {
  const Component = icon
  return (
    <span className={`${styles.icon} ${className}`}>
      <Image src={icon} alt='Icon' />
    </span>
  )
}

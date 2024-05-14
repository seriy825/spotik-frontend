import * as React from 'react'
import { ButtonHTMLAttributes, forwardRef, ReactElement } from 'react'
import styles from './button.module.scss'
import clsx from 'clsx'
import { Spinner } from '../spinner'

type modeType = 'text' | 'small' | 'remove' | 'navbar'

export interface ButtonProps {
  component?: React.ElementType
  className?: string
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type']
  label: string | ReactElement
  isLoading?: boolean
  disabled?: boolean
  id?: string
  mainButton?: boolean
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  mode?: modeType
}

const ButtonRoot: React.ForwardRefRenderFunction<
  HTMLButtonElement,
  ButtonProps
> = (
  { component, className, type, label, id, isLoading, disabled, mode, onClick },
  ref
) => {
  return (
    <button
      ref={ref}
      // @ts-ignore
      component={component}
      id={id}
      type={type}
      className={clsx(
        styles.btn,
        {
          [styles[`btn--${mode}`]]: mode,
        },
        className
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {isLoading ? <Spinner /> : label}
    </button>
  )
}

export const Button = forwardRef(ButtonRoot)

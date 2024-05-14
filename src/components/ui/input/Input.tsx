'use client'
import React, {
  InputHTMLAttributes,
  forwardRef,
  useId,
  FocusEvent,
  useState,
} from 'react'
import styles from './input.module.scss'
import clsx from 'clsx'

export interface InputProps {
  value?: string | number
  disabled?: HTMLInputElement['disabled']
  classNames?: string
  type?: InputHTMLAttributes<HTMLInputElement>['type']
  autoComplete?: InputHTMLAttributes<HTMLInputElement>['autoComplete']
  readOnly?: InputHTMLAttributes<HTMLInputElement>['readOnly']
  placeholder?: InputHTMLAttributes<HTMLInputElement>['placeholder']
  error?: boolean
  errorText?: React.ReactNode
  step?: number
  startAdornment?: React.ReactNode
  endAdornment?: React.ReactNode
  min?: number
  max?: number
  name?: InputHTMLAttributes<HTMLInputElement>['name']
  autoFocus?: InputHTMLAttributes<HTMLInputElement>['autoFocus']
  tabIndex?: InputHTMLAttributes<HTMLInputElement>['tabIndex']
  onKeyDown?: InputHTMLAttributes<HTMLInputElement>['onKeyDown']
  onClick?: InputHTMLAttributes<HTMLInputElement>['onClick']
  onChange?: InputHTMLAttributes<HTMLInputElement>['onChange']
  onBlur?: InputHTMLAttributes<HTMLInputElement>['onBlur']
  onFocus?: InputHTMLAttributes<HTMLInputElement>['onFocus']
}

const RootInput: React.ForwardRefRenderFunction<
  HTMLInputElement,
  InputProps
> = (
  {
    value,
    disabled = false,
    classNames,
    type = 'text',
    autoComplete,
    readOnly,
    placeholder,
    error,
    errorText,
    startAdornment,
    endAdornment,
    name,
    step,
    min,
    max,
    autoFocus,
    tabIndex,
    onKeyDown,
    onClick,
    onChange,
    onBlur,
    onFocus,
  },
  ref
) => {
  const id = useId()
  const [isFocused, setIsFocused] = useState(false)

  const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
    setIsFocused(true)
    onFocus && onFocus(event)
  }

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    setIsFocused(false)
    onBlur && onBlur(event)
  }
  return (
    <>
      <div
        className={clsx(classNames, styles.wrapper, {
          [styles['wrapper--focused']]: isFocused,
          [styles.hasError]: error,
          ['flex']: startAdornment || endAdornment,
        })}
      >
        {startAdornment && startAdornment}
        <input
          ref={ref}
          id={id}
          className={clsx(styles.input)}
          value={value}
          disabled={disabled}
          type={type}
          autoComplete={autoComplete}
          readOnly={readOnly}
          placeholder={placeholder}
          name={name}
          min={min}
          max={max}
          step={step || 'any'}
          autoFocus={autoFocus}
          tabIndex={tabIndex}
          onKeyDown={onKeyDown}
          onClick={onClick}
          onChange={onChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
        />
        {endAdornment && endAdornment}
      </div>
      {error && errorText && <span className={styles.error}>{errorText}</span>}
    </>
  )
}

export const Input = forwardRef(RootInput)

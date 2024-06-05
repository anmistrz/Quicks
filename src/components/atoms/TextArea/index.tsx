'use client';

import React, { ComponentPropsWithRef, FC, LegacyRef, forwardRef } from 'react'

export interface TextAreaProps extends Omit<ComponentPropsWithRef<'textarea'>, 'ref'> {
  isLoading?: boolean
  isDisabled?: boolean
  isInvalid?: boolean
  isValid?: boolean
  counter?: boolean
  maxLength?: number
}

const TextArea: FC<TextAreaProps> = forwardRef(
  ({ className, isDisabled, isInvalid, counter, maxLength, ...props }, ref: LegacyRef<HTMLTextAreaElement>) => {
    return (
      <div className="relative">
        <textarea
          ref={ref}
          disabled={isDisabled}
          className={`w-full py-2 px-3 border rounded-lg outline-none 4 ${className}`}
          rows={props.rows ?? 3}
          {...props}
          value={props.value}
          maxLength={maxLength}
        />
        {counter ? (
          <span className="absolute bottom-2 right-2 text-xs">
            {props.value?.toString()?.length || 0} / {maxLength}
          </span>
        ) : null}
      </div>
    )
  }
)

TextArea.displayName = 'TextAreaInput'

export default TextArea
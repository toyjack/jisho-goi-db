import React from 'react'

interface DividerProps {
  dividerText?: string
  children?: React.ReactNode
}

export function Divider({ dividerText, children }: DividerProps) {
  const text = dividerText || children
  
  if (text) {
    return (
      <div className="divider my-8">
        <span className="text-base-content/60">{text}</span>
      </div>
    )
  }
  
  return <hr className="my-8 border-base-300" />
}
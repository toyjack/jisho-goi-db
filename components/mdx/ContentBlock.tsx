import React from 'react'

interface ContentBlockProps {
  title?: string
  children: React.ReactNode
}

export function ContentBlock({ title, children }: ContentBlockProps) {
  return (
    <section className="mb-8">
      {title && (
        <h2 className="text-2xl font-semibold mb-4 pb-2 border-b border-base-300">
          {title}
        </h2>
      )}
      <div className="prose max-w-none">
        {children}
      </div>
    </section>
  )
}
import type { MDXComponents } from 'mdx/types'
import { Alert } from './components/mdx/Alert'
import { SiteDescription } from './components/mdx/SiteDescription'
import { MembersList } from './components/mdx/MembersList'
import { ContentBlock } from './components/mdx/ContentBlock'
import { CCLicense } from './components/mdx/CCLicense'
import { Divider } from './components/mdx/Divider'

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including inline styles,
// components from other libraries, and more.

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    h1: ({ children }: { children?: React.ReactNode }) => (
      <h1 className="text-3xl font-bold mb-6 text-primary">{children}</h1>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="text-2xl font-semibold mb-4 text-secondary">{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="text-xl font-medium mb-3">{children}</h3>
    ),
    p: ({ children }: { children?: React.ReactNode }) => (
      <p className="mb-4 leading-relaxed">{children}</p>
    ),
    ul: ({ children }: { children?: React.ReactNode }) => (
      <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>
    ),
    ol: ({ children }: { children?: React.ReactNode }) => (
      <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>
    ),
    a: ({ href, children }: { href?: string; children?: React.ReactNode }) => (
      <a 
        href={href} 
        className="text-primary hover:text-primary-focus underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
    
    // 自定义组件 - 替代 TinaCMS 组件
    Alert,
    SiteDescription,
    MembersList,
    ContentBlock,
    CCLicense,
    Divider,
    
    // 兼容旧的组件名称
    ManualAlert: Alert,
    SiteDescriptionBlock: SiteDescription,
    Members: MembersList,
    ManualBlock: ContentBlock,
    CcLicense: CCLicense,
    ManualDivider: Divider,
    
    ...components,
  }
}
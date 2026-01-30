import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { useForm, FormProvider } from 'react-hook-form'
import TextInput from './TextInput'

// Wrapper component to provide react-hook-form context
function TestWrapper({ children }: { children: React.ReactNode }) {
    const methods = useForm()
    return <FormProvider {...methods}>{children}</FormProvider>
}

describe('TextInput', () => {
    it('renders with correct labels', () => {
        const TestComponent = () => {
            const { register } = useForm()
            return (
                <TextInput
                    labelLeftUppon="見出し語"
                    labelRightBottom="カタカナ"
                    name="entry"
                    register={register}
                />
            )
        }

        render(<TestComponent />)

        expect(screen.getByText('見出し語')).toBeInTheDocument()
        expect(screen.getByText('カタカナ')).toBeInTheDocument()
    })

    it('renders an input element', () => {
        const TestComponent = () => {
            const { register } = useForm()
            return (
                <TextInput
                    labelLeftUppon="Test Label"
                    name="testField"
                    register={register}
                />
            )
        }

        render(<TestComponent />)

        expect(screen.getByRole('textbox')).toBeInTheDocument()
    })
})

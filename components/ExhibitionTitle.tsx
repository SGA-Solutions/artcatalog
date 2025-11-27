'use client'

import { PortableText, PortableTextComponents } from '@portabletext/react'

interface ExhibitionTitleProps {
    value: any
    className?: string
}

const components: PortableTextComponents = {
    block: {
        normal: ({ children }) => <>{children}</>,
        h1: ({ children }) => <>{children}</>,
    },
    marks: {
        strong: ({ children }) => <strong className="font-medium">{children}</strong>,
        em: ({ children }) => <em className="italic">{children}</em>,
        small: ({ children }) => <span className="text-[0.6em]">{children}</span>,
    },
}

export default function ExhibitionTitle({ value, className = '' }: ExhibitionTitleProps) {
    return (
        <h1 className={className}>
            <PortableText value={value} components={components} />
        </h1>
    )
}

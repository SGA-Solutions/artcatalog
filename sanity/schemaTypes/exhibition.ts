import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'exhibition',
    title: 'Exhibition',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'array',
            of: [
                {
                    type: 'block',
                    styles: [
                        { title: 'Normal', value: 'normal' },
                        { title: 'H1', value: 'h1' },
                    ],
                    marks: {
                        decorators: [
                            { title: 'Strong', value: 'strong' },
                            { title: 'Emphasis', value: 'em' },
                            { title: 'Small', value: 'small' },
                        ],
                    },
                },
            ],
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'theme',
            title: 'Theme Explanation',
            type: 'text',
        }),
        defineField({
            name: 'startDate',
            title: 'Start Date',
            type: 'date',
        }),
        defineField({
            name: 'endDate',
            title: 'End Date',
            type: 'date',
        }),
        defineField({
            name: 'location',
            title: 'Location',
            type: 'string',
            description: 'Exhibition venue or gallery location',
        }),
        defineField({
            name: 'openHours',
            title: 'Open Hours',
            type: 'string',
            description: 'e.g., "Mon-Fri 10AM-6PM, Sat-Sun 12PM-8PM"',
        }),
        defineField({
            name: 'contactNumber',
            title: 'Contact Number',
            type: 'string',
            description: 'Contact phone number for inquiries',
        }),
        defineField({
            name: 'featuredImage',
            title: 'Featured Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'artworks',
            title: 'Artworks',
            type: 'array',
            of: [{ type: 'reference', to: { type: 'artwork' } }],
        }),
    ],
    preview: {
        select: {
            title: 'title',
            media: 'featuredImage',
        },
    },
})

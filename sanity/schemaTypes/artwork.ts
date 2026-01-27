import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'artwork',
    title: 'Artwork',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
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
            name: 'artist',
            title: 'Artist',
            type: 'reference',
            to: { type: 'artist' },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'artworkType',
            title: 'Artwork Type',
            type: 'string',
            options: {
                list: [
                    { title: 'Single Panel', value: 'single' },
                    { title: 'Diptych (2 Panels)', value: 'diptych' },
                    { title: 'Triptych (3 Panels)', value: 'triptych' },
                ],
                layout: 'radio',
            },
            initialValue: 'single',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true,
            },
            hidden: ({ document }) => document?.artworkType !== 'single',
            validation: (rule) => rule.custom((value, context) => {
                const artworkType = (context.document as any)?.artworkType;
                if (artworkType === 'single' && !value) {
                    return 'Image is required for single panel artworks';
                }
                return true;
            }),
        }),
        defineField({
            name: 'panels',
            title: 'Panels',
            type: 'array',
            of: [
                {
                    type: 'image',
                    options: { hotspot: true },
                    fields: [
                        {
                            name: 'position',
                            title: 'Position',
                            type: 'string',
                            options: {
                                list: [
                                    { title: 'Left', value: 'left' },
                                    { title: 'Center', value: 'center' },
                                    { title: 'Right', value: 'right' },
                                ],
                            },
                        },
                    ],
                },
            ],
            hidden: ({ document }) => document?.artworkType === 'single',
            validation: (rule) => rule.custom((value, context) => {
                const artworkType = (context.document as any)?.artworkType;
                if (artworkType === 'diptych' && (!value || value.length !== 2)) {
                    return 'Diptych artworks must have exactly 2 panels';
                }
                if (artworkType === 'triptych' && (!value || value.length !== 3)) {
                    return 'Triptych artworks must have exactly 3 panels';
                }
                return true;
            }),
        }),
        defineField({
            name: 'year',
            title: 'Year',
            type: 'string',
        }),
        defineField({
            name: 'medium',
            title: 'Medium',
            type: 'string',
        }),
        defineField({
            name: 'dimensions',
            title: 'Dimensions',
            type: 'string',
        }),
        defineField({
            name: 'price',
            title: 'Price',
            type: 'number',
            description: 'Price in USD (optional)',
        }),
        defineField({
            name: 'description',
            title: 'Description / Narrative',
            type: 'text',
            description: 'Inspiration, narrative, or interpretation.',
        }),
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'artist.name',
            media: 'image',
        },
    },
})

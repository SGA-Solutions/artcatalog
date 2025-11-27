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
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true,
            },
            validation: (rule) => rule.required(),
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

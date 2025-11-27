import { groq } from 'next-sanity'

export const homePageQuery = groq`
  *[_type == "exhibition"] | order(startDate desc)[0] {
    title,
    slug,
    theme,
    startDate,
    endDate,
    location,
    openHours,
    contactNumber,
    featuredImage,
    "artworks": artworks[]->{
      title,
      slug,
      image,
      artist->{name}
    }
  }
`

export const exhibitionPathsQuery = groq`*[_type == "exhibition" && defined(slug.current)][].slug.current`

export const exhibitionQuery = groq`
  *[_type == "exhibition" && slug.current == $slug][0] {
    title,
    slug,
    theme,
    startDate,
    endDate,
    location,
    openHours,
    contactNumber,
    featuredImage,
    "artworks": artworks[]->{
      _id,
      title,
      slug,
      image,
      year,
      artist->{name}
    }
  }
`

export const artistPathsQuery = groq`*[_type == "artist" && defined(slug.current)][].slug.current`

export const artistQuery = groq`
  *[_type == "artist" && slug.current == $slug][0] {
    name,
    bio,
    image,
    "artworks": *[_type == "artwork" && references(^._id)] {
      title,
      slug,
      image,
      year
    }
  }
`

export const artworkPathsQuery = groq`*[_type == "artwork" && defined(slug.current)][].slug.current`

export const artworkQuery = groq`
  *[_type == "artwork" && slug.current == $slug][0] {
    title,
    image,
    year,
    medium,
    dimensions,
    price,
    description,
    artist->{name, slug}
  }
`

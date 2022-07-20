import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { HeadingForm, FormFeatured, LayoutAdmin } from '../../../../../../../components'
import { SITE, SITES, SITE_ROUTE } from '../../../../../../../src/graphql/query/site.query'
import { ISite, Section0, Item, Routes } from '../../../../../../../src/interfacesV2/siteV2'
import { graphQLClientS, graphQLClientSS } from '../../../../../../../src/swr/graphQLClient'
import { getURL } from '../../../../../../../src/utils/function'

interface Props {
  featured: Routes
}

const Featured1: FC<Props> = ({ featured }) => {
  const { query, pathname, asPath } = useRouter()
  return (
    <LayoutAdmin title="Sites">
      
      <HeadingForm title="Featured" />
      <FormFeatured section={featured} url={getURL(getURL(asPath))}/>
    </LayoutAdmin>)
}
export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { featured1 = '', section0 = '', id = '' } = query
  let featured: Section0 | null | any
  if (featured1 === 'new') {
    featured = {
      name: "",
      description: "",
      imageSrc: "https://res.cloudinary.com/dvcyhn0lj/image/upload/v1655217461/14.1_no-image.jpg_gkwtld.jpg",
      imageAlt: "",
    }
  } else {
    const data = await graphQLClientS.request(SITE_ROUTE, { _id: id })
    const section00 = data.site.route.find((data: { href: string; }) => data.href === `${section0}`)
    featured = section00.featured.find((data: { href: string; }) => data.href === `${featured1}`)
    // item = data.site.routes.section_level_0.find((data: { href: string; }) => data.href === `${item1}`)
    

  }
  return {
    props: {
      featured
    },
  };
}
export default Featured1

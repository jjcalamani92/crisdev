import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { HeadingDashboard, HeadingForm } from '../../../../../../../../components/component'
import { FormFeatured } from '../../../../../../../../components/form'
import { FormItem } from '../../../../../../../../components/form/formItem'
import { FormSection } from '../../../../../../../../components/form/formSection'
import { GridFeatured, GridItem, GridSection } from '../../../../../../../../components/grid'
import { LayoutAdmin } from '../../../../../../../../components/LayoutAdmin'
import { SITE, SITES, SITE_ROUTE } from '../../../../../../../../src/graphql/query/site.query'
import { ISite, Section0, Item, Routes } from '../../../../../../../../src/interfacesV2/siteV2'
import { graphQLClientS, graphQLClientSS } from '../../../../../../../../src/swr/graphQLClient'
import { getURL } from '../../../../../../../../src/utils/function'


interface Props {
  featured: Routes
}

const Featured2: FC<Props> = ({ featured }) => {
  const { query, pathname, asPath } = useRouter()

  return (
    <LayoutAdmin title="Sites">
      <HeadingForm title="Featured" />
      <FormFeatured section={featured}url={getURL(getURL(asPath))}/>
    </LayoutAdmin>)
}
export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { featured2 = '', section1 = '', section0 = '', id = '' } = query
  let featured: Routes | null | any
  if (featured2 === 'new') {
    featured = {
      name: "",
      description: "",
      imageSrc: "https://res.cloudinary.com/dvcyhn0lj/image/upload/v1655217461/14.1_no-image.jpg_gkwtld.jpg",
      imageAlt: "",
    }
  } else {
    const data = await graphQLClientS.request(SITE_ROUTE, { _id: id })
    const section00 = data.site.route.find((data: { href: string; }) => data.href === `${section0}`)
    const section11 = section00.children.find((data: { href: string; }) => data.href === `${section1}`)
    featured = section11.featured.find((data: { href: string; }) => data.href === `${featured2}`)
  }
  return {
    props: {
      featured
    },
  };
}
export default Featured2

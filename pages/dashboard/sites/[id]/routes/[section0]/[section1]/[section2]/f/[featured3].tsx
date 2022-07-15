import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { HeadingDashboard, HeadingForm } from '../../../../../../../../../components/component'
import { FormFeatured } from '../../../../../../../../../components/form'
import { FormItem } from '../../../../../../../../../components/form/formItem'
import { FormSection } from '../../../../../../../../../components/form/formSection'
import { GridFeatured, GridItem, GridSection } from '../../../../../../../../../components/grid'
import { LayoutAdmin } from '../../../../../../../../../components/LayoutAdmin'
import { SITE, SITES } from '../../../../../../../../../src/graphql/site.query'
import { ISite, Section0, Item } from '../../../../../../../../../src/interfacesV2/siteV2'
import { graphQLClientS, graphQLClientSS } from '../../../../../../../../../src/swr/graphQLClient'
import { getURL } from '../../../../../../../../../src/utils/function'

interface Props {
  featured: Section0
}

const Featured3: FC<Props> = ({ featured }) => {
  const { query, pathname } = useRouter()

  return (
    <LayoutAdmin title="Sites">
      
      <HeadingForm title="Featured" />
      <FormFeatured section={featured} url={getURL(pathname, query)}/>
    </LayoutAdmin>)
}
export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { featured3 = '',section2 = '', section1 = '', section0 = '', id = '' } = query
  let featured: Section0 | null | any
  if (featured3 === 'new') {
    featured = {
      name: "",
      description: "",
      imageSrc: "https://res.cloudinary.com/dvcyhn0lj/image/upload/v1655217461/14.1_no-image.jpg_gkwtld.jpg",
      imageAlt: "",
    }
  } else {
    const data = await graphQLClientS.request(SITE, { _id: id })
    const section00 = data.site.routes.section_level_0.find((data: { href: string; }) => data.href === `${section0}`)
    const section11 = section00.section_level_1.find((data: { href: string; }) => data.href === `${section1}`)
    const section22 = section11.section_level_2.find((data: { href: string; }) => data.href === `${section2}`)
    featured = section22.featured.find((data: { href: string; }) => data.href === `${featured3}`)
    

  }
  return {
    props: {
      featured
    },
  };
}
export default Featured3

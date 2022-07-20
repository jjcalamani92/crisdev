import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { HeadingDashboard, HeadingForm } from '../../../../../../../../../../../components/component'
import { FormItem } from '../../../../../../../../../../../components/form/formItem'
import { FormSection } from '../../../../../../../../../../../components/form/formSection'
import { GridFeatured, GridItem, GridSection } from '../../../../../../../../../../../components/grid'
import { LayoutAdmin } from '../../../../../../../../../../../components/LayoutAdmin'
import { SITE, SITES } from '../../../../../../../../../../../src/graphql/query/site.query'
import { ISite, Section0, Item, Routes } from '../../../../../../../../../../../src/interfacesV2/siteV2'
import { graphQLClientS, graphQLClientSS } from '../../../../../../../../../../../src/swr/graphQLClient'
import { getURL } from '../../../../../../../../../../../src/utils/function'

interface Props {
  item: Routes
}

const Item5: FC<Props> = ({ item }) => {
  const { query, pathname, asPath } = useRouter()

  return (
    <LayoutAdmin title="Sites">
      <HeadingForm title="Item" />
      <FormItem section={item} url={getURL(getURL(asPath))}/>
    </LayoutAdmin>)
}
export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { item5 = '',section4 = '',section3 = '',section2 = '', section1 = '', section0 = '', id = '' } = query
  let item: Routes | null | any
  if (item5 === 'new') {
    item = {
      name: "",
      description: "",
      imageSrc: "https://res.cloudinary.com/dvcyhn0lj/image/upload/v1655217461/14.1_no-image.jpg_gkwtld.jpg",
      imageAlt: "",
    }
  } else {
    const data = await graphQLClientS.request(SITE, { _id: id })
    const section00 = data.site.route.find((data: { href: string; }) => data.href === `${section0}`)
    const section11 = section00.children.find((data: { href: string; }) => data.href === `${section1}`)
    const section22 = section11.children.find((data: { href: string; }) => data.href === `${section2}`)
    const section33 = section22.children.find((data: { href: string; }) => data.href === `${section3}`)
    const section44 = section33.children.find((data: { href: string; }) => data.href === `${section4}`)
    item = section44.items.find((data: { href: string; }) => data.href === `${item5}`)
    // item = data.site.routes.section_level_0.find((data: { href: string; }) => data.href === `${item1}`)
    

  }
  return {
    props: {
      item
    },
  };
}
export default Item5

import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { HeadingDashboard, HeadingForm } from '../../../../../../../../components/component'
import { FormItem } from '../../../../../../../../components/form/formItem'
import { FormSection } from '../../../../../../../../components/form/formSection'
import { GridFeatured, GridItem, GridSection } from '../../../../../../../../components/grid'
import { LayoutAdmin } from '../../../../../../../../components/LayoutAdmin'
import { SITE, SITES } from '../../../../../../../../src/graphql/site.query'
import { ISite, Section0, Item } from '../../../../../../../../src/interfacesV2/siteV2'
import { graphQLClientS, graphQLClientSS } from '../../../../../../../../src/swr/graphQLClient'
import { getURL } from '../../../../../../../../src/utils/function'

interface Props {
  item: Section0
}

const Item2: FC<Props> = ({ item }) => {
  const { query, pathname } = useRouter()

  return (
    <LayoutAdmin title="Sites">
      <HeadingForm title="Item" />
      <FormItem section={item} url={getURL(pathname, query)}/>
    </LayoutAdmin>)
}
export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { item2 = '', section1 = '', section0 = '', id = '' } = query
  let item: Section0 | null | any
  if (item2 === 'new') {
    item = {
      name: "",
      description: "",
      imageSrc: "https://res.cloudinary.com/dvcyhn0lj/image/upload/v1655217461/14.1_no-image.jpg_gkwtld.jpg",
      imageAlt: "",
    }
  } else {
    const data = await graphQLClientS.request(SITE, { _id: id })
    const section00 = data.site.routes.section_level_0.find((data: { href: string; }) => data.href === `${section0}`)
    const section11 = section00.section_level_1.find((data: { href: string; }) => data.href === `${section1}`)
    item = section11.items.find((data: { href: string; }) => data.href === `${item2}`)
  }
  return {
    props: {
      item
    },
  };
}
export default Item2
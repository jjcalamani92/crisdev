import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { HeadingForm, FormItem, LayoutAdmin } from '../../../../../../../components'
import { SITE } from '../../../../../../../src/graphql/site.query'
import {  Section0,  } from '../../../../../../../src/interfacesV2/siteV2'
import { graphQLClientS, graphQLClientSS } from '../../../../../../../src/swr/graphQLClient'
import { getURL } from '../../../../../../../src/utils/function'

interface Props {
  item: Section0
}

const Item1: FC<Props> = ({ item }) => {
  const { query, pathname } = useRouter()


  
  return (
    <LayoutAdmin title="Sites">
      
      <HeadingForm title="Item" />
      <FormItem section={item} url={getURL(pathname, query)}/>
    </LayoutAdmin>)
}
export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { item1 = '', section0 = '', id = '' } = query
  let item: Section0 | null | any
  if (item1 === 'new') {
    item = {
      name: "",
      description: "",
      imageSrc: "https://res.cloudinary.com/dvcyhn0lj/image/upload/v1655217461/14.1_no-image.jpg_gkwtld.jpg",
      imageAlt: "",
    }
  } else {
    const data = await graphQLClientS.request(SITE, { _id: id })
    const section00 = data.site.routes.section_level_0.find((data: { href: string; }) => data.href === `${section0}`)
    item = section00.items.find((data: { href: string; }) => data.href === `${item1}`)
    // item = data.site.routes.section_level_0.find((data: { href: string; }) => data.href === `${item1}`)
    

  }
  return {
    props: {
      item
    },
  };
}
export default Item1

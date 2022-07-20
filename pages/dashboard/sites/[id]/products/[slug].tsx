import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { HeadingDashboard, HeadingForm, FormSection, GridFeatured, GridItem, GridSection, LayoutAdmin, FormProduct } from '../../../../../components'
import { FormProductAnt } from '../../../../../components/form/formProductAnt'
import { SITE, SITES, SITE_ROUTE, SITE_ROUTE_PRODUCT } from '../../../../../src/graphql/query/site.query'
import { PRODUCT_BY_SLUG } from '../../../../../src/graphql/query/wear.query'
import { CreateProductInput } from '../../../../../src/interfacesV2'
import { ISite, Routes, Section0 } from '../../../../../src/interfacesV2/siteV2'
import { graphQLClientP, graphQLClientS, graphQLClientSS } from '../../../../../src/swr/graphQLClient'
import { getURL,  } from '../../../../../src/utils/function'

interface Props {
  product: CreateProductInput
  route: Routes[]
}

const Slug:FC<Props> = ({ product, route }) => {
  const { query, pathname, asPath } = useRouter()
  // console.log(route);
  
  return (
    <LayoutAdmin title="Sites">

      <HeadingForm title="Product" />
      <FormProduct product={product} routes={route}/>
      <FormProductAnt product={product} routes={route}/>
    </LayoutAdmin>
  )
}
export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { slug = '', id = '' } = query
  const data = await graphQLClientS.request(SITE_ROUTE_PRODUCT, { _id: id })
  
  let product: CreateProductInput | null | any
  if (slug === 'new') {
    product = {
      name: "title",
      mark: "totto",
      description: "description del producto",
      price: 0,
      discountPrice: 0,
      inStock: 0,
      featured: "ninguno",
      specs:["hola mundo", "w"],
      imageSrc:[],
      tags:["a", "b", "c"],
      site: "",
      route: []
    }
  } else {
    const data = await graphQLClientP.request(PRODUCT_BY_SLUG, { slug: slug, site: id })
    product = {
      _id: data.wearBySlug._id,
      name: data.wearBySlug.article.title,
      mark: data.wearBySlug.article.mark,
      description: data.wearBySlug.article.description,
      price: data.wearBySlug.article.price,
      discountPrice: data.wearBySlug.article.discountPrice,
      inStock: data.wearBySlug.article.inStock,
      featured: data.wearBySlug.article.featured.name,
      specs: data.wearBySlug.article.specs.map((data: {text: string}) => data.text),
      imageSrc: data.wearBySlug.article.image.map((data: {imageSrc: string}) => data.imageSrc),
      tags: data.wearBySlug.article.tags.map((data: {text: string}) => data.text),
      route: data.wearBySlug.article.route.map((data: {name: string}) => data.name),
    }
  }
  
  return {
    props: {
      product,
      route: data.site.route
    },
  };
}
export default Slug

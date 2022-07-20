import type { GetServerSideProps } from 'next'
import { FC } from 'react'
import { HeadingDashboard, LayoutAdmin, GridSection, Pagination } from '../../../../../components'
import { SITE_ROUTE } from '../../../../../src/graphql/query/site.query';
import { ISite } from '../../../../../src/interfacesV2/siteV2'
import { graphQLClientP, graphQLClientS } from '../../../../../src/swr/graphQLClient'
import { useRouter } from 'next/router'
import { PRODUCTS_PAGINATION } from '../../../../../src/graphql/query/wear.query';
import { listWearsWithCursor } from '../../../../../src/interfacesV2/wear';
import { GridProduct } from '../../../../../components/grid/gridProduct';

interface Props {
  site: ISite
  products: listWearsWithCursor
}

const Routes: FC<Props> = ({ site, products }) => {
  const { query, pathname, asPath } = useRouter()
  console.log(products);
  
  return (
    <LayoutAdmin title="Sites">
      
      <HeadingDashboard title='Products' url={asPath} />
      <GridProduct edges={products.page.edges} />
      {/* <Pagination /> */}
      {/* <GridSection data={site.route} /> */}
    </LayoutAdmin>)
}
export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const data = await graphQLClientP.request(PRODUCTS_PAGINATION, { args: {last: null, first:10, before: null, after: null}, site: query.id})
  return {
    props: {
      products: data.listWearsWithCursor
    },
  };
}
export default Routes

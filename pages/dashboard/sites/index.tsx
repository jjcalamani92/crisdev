import type { GetServerSideProps, GetStaticProps, NextPage } from 'next'
import { FC } from 'react'
import { HeadingDashboard, LayoutAdmin, GridSite } from '../../../components'
import { SITES } from '../../../src/graphql/query/site.query'
import { ISite } from '../../../src/interfacesV2/siteV2'
import { graphQLClientS } from '../../../src/swr/graphQLClient'
import { request, RequestDocument } from 'graphql-request'
import useSWR from 'swr';
import { useRouter } from 'next/router'

interface Props {
  sitesAll: ISite[]
}

const fetcher = (query: RequestDocument) => request(`${process.env.APIS_URL}/graphql`, query)

const Sites: FC<Props> = ({ sitesAll }) => {
  const { query, pathname } = useRouter()


  return (
    <LayoutAdmin title="Sites">
      <HeadingDashboard title='Sitio' url={pathname} />
      <GridSite data={sitesAll} />
    </LayoutAdmin>)
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { sitesAll }  = await graphQLClientS.request(SITES)
  return {
    props: {
      sitesAll
    },
  };
}
// export const getStaticProps: GetStaticProps = async ({params}) => {
//   const { sitesAll } = await graphQLClientS.request(SITES)
//   return {
//     props: {
//       sitesAll
//     },
//   };
// }
export default Sites

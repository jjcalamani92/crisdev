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
  // const { data, error, isValidating } = useSWR(SITES, fetcher)
  // if (isValidating) {
  //   console.log('cargando');
  // }
  const { query, pathname } = useRouter()
  
  const responsive = {
    sm: "2",
    md: "3",
    lg: "6"
  }

  return (
    <LayoutAdmin title="Sites">
      <HeadingDashboard title='Sitio' url={pathname} />
      <GridSite data={sitesAll} />
    </LayoutAdmin>)
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  const { sitesAll } = await graphQLClientS.request(SITES)
  return {
    props: {
      sitesAll
    },
  };
}
export default Sites

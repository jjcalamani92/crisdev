import type { GetServerSideProps, NextPage } from 'next'
import { FC } from 'react'
import { HeadingDashboard } from '../../../components/component'
import { Grid } from '../../../components/grid'
import { LayoutAdmin } from '../../../components/LayoutAdmin'
import { S } from '../../../src/gql'
import { SITES } from '../../../src/graphql/site.query'
import { Site } from '../../../src/interfaces'
import { ISite } from '../../../src/interfacesV2/siteV2'
import { graphQLClientS, graphQLClientSS } from '../../../src/swr/graphQLClient'
import { request, RequestDocument } from 'graphql-request'
import useSWR from 'swr';
import { ImageOptimizerCache } from 'next/dist/server/image-optimizer'
import { useRouter } from 'next/router'

interface Props {
  sitesAll: ISite[]
  site: Site
}

const fetcher = (query: RequestDocument) => request(`${process.env.APIS_URL}/graphql`, query)

const Sites: FC<Props> = ({ site, sitesAll }) => {
  const { data, error, isValidating } = useSWR(SITES, fetcher)
  if (isValidating) {
    console.log('cargando');
  }
  const { query, pathname } = useRouter()
  console.log('pathname', pathname);
  let p = pathname.substring(1).split('/')
  p.length = p.length-1
  p.push(`${query.id}`, `${query.section0}` )
  let url = p.join('/')
  console.log('url', p);
  
  const responsive = {
    sm: "2",
    md: "3",
    lg: 6
  }

  return (
    <LayoutAdmin title="Sites">
      <HeadingDashboard title='Sitio' url={pathname} />
      <Grid data={sitesAll} responsive={responsive} />
    </LayoutAdmin>)
}
export const getServerSideProps: GetServerSideProps = async () => {
  const { sitesAll } = await graphQLClientS.request(SITES)
  return {
    props: {
      sitesAll
    },
  };
}
export default Sites

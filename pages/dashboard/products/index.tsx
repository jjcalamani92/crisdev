import type { GetServerSideProps, NextPage } from 'next'
import { FC } from 'react'
import { HeadingDashboard, LayoutAdmin, GridSite } from '../../../components'
import { SITES } from '../../../src/graphql/site.query'
import { ISite } from '../../../src/interfacesV2/siteV2'
import { graphQLClientS } from '../../../src/swr/graphQLClient'
import { useRouter } from 'next/router';

interface Props {
  sitesAll: ISite[]
}

const Clients:FC<Props> = ({sitesAll}) => {
  const { pathname } = useRouter()
  const responsive = {
    sm: "2",
    md: "3",
    lg: "6"
  }
  return (
    <LayoutAdmin title="Products">
      <HeadingDashboard title='Tiendas' url={pathname} />
      <GridSite data={sitesAll} responsive={responsive} />
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
export default Clients

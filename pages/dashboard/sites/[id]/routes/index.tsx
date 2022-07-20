import type { GetServerSideProps, NextPage } from 'next'
import { FC } from 'react'
import { HeadingDashboard, LayoutAdmin, GridSite, GridSection } from '../../../../../components'
import { SITE, SITES, SITE_ROUTE } from '../../../../../src/graphql/query/site.query';
import { ISite } from '../../../../../src/interfacesV2/siteV2'
import { graphQLClientS } from '../../../../../src/swr/graphQLClient'
import { request, RequestDocument } from 'graphql-request'
import useSWR from 'swr';
import { useRouter } from 'next/router'
import { getURL } from '../../../../../src/utils/function'

interface Props {
  site: ISite
}

const Routes: FC<Props> = ({ site }) => {
  const { query, pathname, asPath } = useRouter()

  return (
    <LayoutAdmin title="Sites">
      {
        query.children0 === 'new'
          ?
          null
          :
          <>

            {
              site.route
                ?
                <>
                  <HeadingDashboard title='Sections' url={asPath} />
                  <GridSection data={site.route} />
                </>
                :
                null
            }
          </>
      }
    </LayoutAdmin>)
}
export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { id = '' } = query
  const data = await graphQLClientS.request(SITE_ROUTE, { _id: id })
  return {
    props: {
      site: data.site
    },
  };
}
export default Routes

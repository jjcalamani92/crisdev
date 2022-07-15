import type { GetServerSideProps, NextPage } from 'next'
import { FC } from 'react'
import { HeadingDashboard, LayoutAdmin, GridSite, GridSection } from '../../../../../components'
import { SITE, SITES } from '../../../../../src/graphql/site.query'
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
  const { query, pathname } = useRouter()
  return (
    <LayoutAdmin title="Sites">
      {
        query.section0 === 'new'
          ?
          null
          :
          <>
            
            {
              site.routes?.section_level_0
                ?
                  <>
                    <HeadingDashboard title='Sections' url={getURL(pathname, query)} />
                    <GridSection data={site.routes.section_level_0}/>
                  </>
                :
                null
            }
          </>
      } 
    </LayoutAdmin>)
}
export const getServerSideProps:GetServerSideProps = async({ query }) => {
  const { id = '' } = query
  const data = await graphQLClientS.request(SITE, { _id: id })
	return {
		props: {
      site: data.site
		},
	};
}
export default Routes

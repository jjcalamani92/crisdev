import type { GetServerSideProps, NextPage } from 'next'
import { FC } from 'react'
import { Grid } from '../../../components/grid'
import { LayoutAdmin } from '../../../components/LayoutAdmin'
import { S } from '../../../src/gql'
import { SITES } from '../../../src/graphql/site'
import { Site } from '../../../src/interfaces'
import { ISite } from '../../../src/interfacesV2/siteV2'
import { graphQLClientS, graphQLClientSS } from '../../../src/swr/graphQLClient'

interface Props {
  sitesAll: ISite[]
	site: Site
}

const Sites:FC<Props> = ({site, sitesAll}) => {
  // console.log(sitesAll);
  const responsive = {
    sm: "2",
    md: "3",
    lg: "5"
  }
  return (
    <LayoutAdmin title="Sites">
      <Grid data={sitesAll} responsive={responsive}/>
    </LayoutAdmin>)
}
export const getServerSideProps:GetServerSideProps = async() => {
  const { site } = await graphQLClientSS.request(S, {id: process.env.API_SITE})
  const { sitesAll } = await graphQLClientS.request(SITES)
  console.log(sitesAll);
  
	return {
		props: {
			site,
      sitesAll
		},
	};
}
export default Sites

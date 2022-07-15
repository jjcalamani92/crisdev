import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { HeadingDashboard, HeadingForm, FormSite, GridSection, LayoutAdmin, Heading, Grid } from '../../../../components';
import { SITE, SITES } from '../../../../src/graphql/site.query'
import { ISite } from '../../../../src/interfacesV2/siteV2'
import { graphQLClientS, graphQLClientSS } from '../../../../src/swr/graphQLClient'
import { getURL, getURLMutation } from '../../../../src/utils/function';

interface Props {
	site: ISite
}

const data = [
  {
    title: 'routes',
    href: 'routes', 
    imageSrc: "https://res.cloudinary.com/dvcyhn0lj/image/upload/v1655217461/14.1_no-image.jpg_gkwtld.jpg"
  },
  {
    title: 'products',
    href: 'products',
    imageSrc: "https://res.cloudinary.com/dvcyhn0lj/image/upload/v1655217461/14.1_no-image.jpg_gkwtld.jpg"
  },
  {
    title: 'marks',
    href: 'marks',
    imageSrc: "https://res.cloudinary.com/dvcyhn0lj/image/upload/v1655217461/14.1_no-image.jpg_gkwtld.jpg"
  },

]

const Id:FC<Props> = ({site}) => {
  const { query, pathname } = useRouter()
  
  return (
    <LayoutAdmin title="Sites">
      <Heading title={site.data.title}/>
      <Grid data={data} url={getURL(pathname, query)}/>
      <HeadingForm title="Sitio"/>
      <FormSite site={site} url={getURLMutation(pathname, query)}/>
    </LayoutAdmin>)
}
export const getServerSideProps:GetServerSideProps = async({ query }) => {
  const { id = '' } = query
  let site: ISite | null | any
  if (id === 'new') {
		site= {
      data: {
        title: 'title',
        domain: 'domain.com',
        logo: 'https://res.cloudinary.com/dvcyhn0lj/image/upload/v1655217461/14.1_no-image.jpg_gkwtld.jpg',
        icon: 'https://res.cloudinary.com/dvcyhn0lj/image/upload/v1655217461/14.1_no-image.jpg_gkwtld.jpg',
        imageSrc: 'https://res.cloudinary.com/dvcyhn0lj/image/upload/v1655217461/14.1_no-image.jpg_gkwtld.jpg',
        imageAlt: 'nan',
        numberPhone: 123456,
        address: 'address',
        location: 'location',
        description: 'description',
      },
      type: 'ecommerce',
      client: '123456',
    }
	} else {
    const data = await graphQLClientS.request(SITE, { _id: id })
    site = data.site
	}
	return {
		props: {
      site
		},
	};
}
export default Id

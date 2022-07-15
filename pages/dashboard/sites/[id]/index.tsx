import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { HeadingDashboard, HeadingForm } from '../../../../components/component';
import { FormSite } from '../../../../components/form'
import { GridSection } from '../../../../components/grid';
import { LayoutAdmin } from '../../../../components/LayoutAdmin'
import { SITE, SITES } from '../../../../src/graphql/site.query'
import { ISite } from '../../../../src/interfacesV2/siteV2'
import { graphQLClientS, graphQLClientSS } from '../../../../src/swr/graphQLClient'

interface Props {
	site: ISite
}

const Id:FC<Props> = ({site}) => {
  // console.log(site?.routes?.section_level_0);
  // console.log(site.routes)
  const { query, pathname } = useRouter()
  let p = pathname.substring(1).split('/')
  p.splice(-1,1)
  p.push(`${query.id}`)
  let url = p.join('/')
  return (
    <LayoutAdmin title="Sites">
      {
        query.section0 === 'new'
          ?
          null
          :
          <>
            {/* {
              section.items.length === 0
                ?
                null
                :
                <>
                  <HeadingDashboard title='Items' url={`${url}`} />
                  <GridSection data={section.items} />
                </>
            }
            {
              section.featured.length === 0
                ?
                null
                :
                <>
                  <HeadingDashboard title='Promociones' url={url} />
                  <GridSection data={section.featured} />
                </>
            } */}
            {
              site.routes?.section_level_0
                ?
                  <>
                    <HeadingDashboard title='Sections' url={url} />
                    <GridSection data={site.routes.section_level_0}  url={`${url}`}/>
                  </>
                :
                null
            }
          </>
      } 
      <HeadingForm title="Sitio"/>
      <FormSite site={site} />
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

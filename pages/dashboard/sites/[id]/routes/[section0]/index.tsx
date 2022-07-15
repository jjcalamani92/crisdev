import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { HeadingDashboard, HeadingForm, FormSection, GridFeatured, GridItem, GridSection, LayoutAdmin } from '../../../../../../components'
import { SITE, SITES } from '../../../../../../src/graphql/site.query'
import { ISite, Section0 } from '../../../../../../src/interfacesV2/siteV2'
import { graphQLClientS, graphQLClientSS } from '../../../../../../src/swr/graphQLClient'
import { getURL, getURLMutation } from '../../../../../../src/utils/function'

interface Props {
  section: Section0
}

const Section0: FC<Props> = ({ section }) => {
  const responsive = {
    sm: "2",
    md: "3",
    lg: 6
  }
  const { query, pathname } = useRouter()
  const url = getURL(pathname, query)

  
  return (
    <LayoutAdmin title="Sites">
      {
        query.section0 === 'new'
          ?
          null
          :
          <>
            {
              section.section_level_1
                ?
                  <>
                    <HeadingDashboard title='Sections' url={url} />
                    <GridSection data={section.section_level_1}/>
                  </>
                :
                null
            }
            {
              section.items
                ?
                <>
                  <HeadingDashboard title='Items' url={`${url}/i`} />
                  <GridItem data={section.items} />
                </>
                :
                null
            }
            {
              section.featured
                ?
                <>
                  <HeadingDashboard title='Promociones' url={`${url}/f`} />
                  <GridFeatured data={section.featured} />
                </>
                :
                null
            }
            
          </>
      }
      <HeadingForm title="Sección" />
      <FormSection section={section} url={getURLMutation(pathname, query)}/>
    </LayoutAdmin>
  )
}
export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { section0 = '', id = '' } = query
  let section: Section0 | null | any
  if (section0 === 'new') {
    section = {
      name: "",
      description: "",
      imageSrc: "https://res.cloudinary.com/dvcyhn0lj/image/upload/v1655217461/14.1_no-image.jpg_gkwtld.jpg",
      imageAlt: "",
    }
  } else {
    const data = await graphQLClientS.request(SITE, { _id: id })
    section = data.site.routes.section_level_0.find((data: { href: string; }) => data.href === `${section0}`)
  }
  return {
    props: {
      section
    },
  };
}
export default Section0

import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { HeadingDashboard, HeadingForm, FormSection, GridFeatured, GridItem, GridSection, LayoutAdmin } from '../../../../../../components'
import { SITE, SITES, SITE_ROUTE } from '../../../../../../src/graphql/query/site.query'
import { ISite, Routes, Section0 } from '../../../../../../src/interfacesV2/siteV2'
import { graphQLClientS, graphQLClientSS } from '../../../../../../src/swr/graphQLClient'
import { getURL,  } from '../../../../../../src/utils/function'

interface Props {
  section: Routes
}

const Section0: FC<Props> = ({ section }) => {
  const { query, pathname, asPath } = useRouter()

  return (
    <LayoutAdmin title="Sites">
      {
        query.section0 === 'new'
          ?
          null
          :
          <>
            {
              section.children
                ?
                  <>
                    <HeadingDashboard title='Sections' url={asPath} />
                    <GridSection data={section.children}/>
                  </>
                :
                null
            }
            {
              section.items
                ?
                <>
                  <HeadingDashboard title='Items' url={`${asPath}/i`} />
                  <GridItem data={section.items} />
                </>
                :
                null
            }
            {
              section.featured
                ?
                <>
                  <HeadingDashboard title='Promociones' url={`${asPath}/f`} />
                  <GridFeatured data={section.featured} />
                </>
                :
                null
            }
            
          </>
      }
      <HeadingForm title="Sección" />
      <FormSection section={section} url={getURL(asPath)}/>
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
    const data = await graphQLClientS.request(SITE_ROUTE, { _id: id })
    section = data.site.route.find((data: { href: string; }) => data.href === `${section0}`)
  }
  return {
    props: {
      section
    },
  };
}
export default Section0

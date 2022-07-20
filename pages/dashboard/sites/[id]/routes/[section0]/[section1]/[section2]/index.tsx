import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { HeadingDashboard, HeadingForm } from '../../../../../../../../components/component'
import { FormSection } from '../../../../../../../../components/form/formSection'
import { GridFeatured, GridItem, GridSection } from '../../../../../../../../components/grid'
import { LayoutAdmin } from '../../../../../../../../components/LayoutAdmin'
import { SITE, SITES, SITE_ROUTE } from '../../../../../../../../src/graphql/query/site.query'
import { ISite, Routes, Section0 } from '../../../../../../../../src/interfacesV2/siteV2'
import { graphQLClientS, graphQLClientSS } from '../../../../../../../../src/swr/graphQLClient'
import { getURL } from '../../../../../../../../src/utils/function'

interface Props {
  section: Routes
}

const Section2: FC<Props> = ({ section }) => {
  const { query, pathname, asPath } = useRouter()
  // console.log(getURL(asPath));
  
  return (
    <LayoutAdmin title="Sites">
      {
        query.section2 === 'new'
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
                    <GridItem data={section.items}/>
                  </>
                :
                null
            }
            {
              section.featured 
                ?
                  <>
                    <HeadingDashboard title='Promociones' url={`${asPath}/f`} />
                    <GridFeatured data={section.featured}/>
                  </>
                :
                null
            }
          </>
      }
      <HeadingForm title="Section" />
      <FormSection section={section} url={getURL(asPath)}/>
    </LayoutAdmin>)
}
export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { section2 = '', section1 = '', section0 = '', id = '' } = query
  let section: Routes | null | any
  if (section2 === 'new') {
    section = {
      name: "",
      description: "",
      imageSrc: "https://res.cloudinary.com/dvcyhn0lj/image/upload/v1655217461/14.1_no-image.jpg_gkwtld.jpg",
      imageAlt: "",
    }
  } else {
    const data = await graphQLClientS.request(SITE_ROUTE, { _id: id })
    const section00 = data.site.route.find((data: { href: string; }) => data.href === `${section0}`)
    const section11 = section00.children.find((data: { href: string; }) => data.href === `${section1}`)
    section = section11.children.find((data: { href: string; }) => data.href === `${section2}`)
  }
  return {
    props: {
      section
    },
  };
}
export default Section2

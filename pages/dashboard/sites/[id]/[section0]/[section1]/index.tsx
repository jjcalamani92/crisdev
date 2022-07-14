import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { HeadingDashboard, HeadingForm } from '../../../../../../components/component'
import { FormSection } from '../../../../../../components/form/formSection'
import { GridFeatured, GridItem, GridSection } from '../../../../../../components/grid'
import { LayoutAdmin } from '../../../../../../components/LayoutAdmin'
import { SITE, SITES } from '../../../../../../src/graphql/site.query'
import { ISite, Section0, Section1 } from '../../../../../../src/interfacesV2/siteV2'
import { graphQLClientS, graphQLClientSS } from '../../../../../../src/swr/graphQLClient'

interface Props {
  section: Section1
}

const Section1: FC<Props> = ({ section }) => {
  const { query, pathname } = useRouter()
  let p = pathname.substring(1).split('/')
  p.length = p.length - 3
  p.push(`${query.id}`, `${query.section0}`,`${query.section1}`)
  let url = p.join('/')

  let u = pathname.substring(1).split('/')
  u.length = u.length - 3
  u.push(`${query.id}`, `${query.section0}`)
  let urlu = u.join('/')

  console.log('section 1', section);
  
  return (
    <LayoutAdmin title="Sites">
      {
        query.section1 === 'new'
          ?
          null
          :
          <>
            {
              section.section_level_2 
                ?
                <>
                  <HeadingDashboard title='Sections' url={`${url}`} />
                  <GridSection data={section.section_level_2} url={`${url}`}/>
                </>
                :
                null
            }
            {
              section.items 
                ?
                  <>
                    <HeadingDashboard title='Items' url={`${url}/i`} />
                    <GridItem data={section.items} url={`${url}`}/>
                  </>
                :
                null
            }
            {
              section.featured 
                ?
                  <>
                    <HeadingDashboard title='Promociones' url={`${url}`} />
                    <GridFeatured data={section.featured} url={`${url}`}/>
                  </>
                :
                null
            }

            {/* <HeadingDashboard title='Promociones' url={url} /> */}
            {/* <GridSection data={site?.routes?.section_level_0}/> */}

            {/* <HeadingDashboard title='Items' /> */}
          </>
      }
      <HeadingForm title="Section" />
      <FormSection section={section} url={urlu}/>
    </LayoutAdmin>)
}
export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { section1 = '', section0 = '', id = '' } = query
  let section: Section1 | null | any
  if (section1 === 'new') {
    section = {
      name: "",
      description: "",
      imageSrc: "https://res.cloudinary.com/dvcyhn0lj/image/upload/v1655217461/14.1_no-image.jpg_gkwtld.jpg",
      imageAlt: "",
    }
  } else {
    const data = await graphQLClientS.request(SITE, { _id: id })
    const sectino00 = data.site.routes.section_level_0.find((data: { href: string; }) => data.href === `${section0}`)
    section = sectino00.section_level_1.find((data: { href: string; }) => data.href === `${section1}`)

  }
  return {
    props: {
      section
    },
  };
}
export default Section1

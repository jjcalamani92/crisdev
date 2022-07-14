import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { HeadingDashboard, HeadingForm } from '../../../../../../../../components/component'
import { FormSection } from '../../../../../../../../components/form/formSection'
import { GridFeatured, GridItem, GridSection } from '../../../../../../../../components/grid'
import { LayoutAdmin } from '../../../../../../../../components/LayoutAdmin'
import { SITE, SITES } from '../../../../../../../../src/graphql/site.query'
import { ISite, Section0, Section3 } from '../../../../../../../../src/interfacesV2/siteV2'
import { graphQLClientS, graphQLClientSS } from '../../../../../../../../src/swr/graphQLClient'

interface Props {
  section: Section3
}

const Section3: FC<Props> = ({ section }) => {
  const { query, pathname } = useRouter()
  let p = pathname.substring(1).split('/')
  p.length = p.length - 5
  p.push(`${query.id}`, `${query.section0}`,`${query.section1}`,`${query.section2}`,`${query.section3}`)
  let url = p.join('/')

  let u = pathname.substring(1).split('/')
  u.length = u.length - 5
  u.push(`${query.id}`, `${query.section0}`,`${query.section1}`,`${query.section2}`)
  let urlu = u.join('/')
  console.log('section 03 from')
  return (
    <LayoutAdmin title="Sites">
      {
        query.section3 === 'new'
          ?
          null
          :
          <>
            {
              section.section_level_4 
                ?
                <>
                  <HeadingDashboard title='Sections' url={`${url}`} />
                  <GridSection data={section.section_level_4} url={`${url}`}/>
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
  const { section3 = '',section2 = '', section1 = '', section0 = '', id = '' } = query
  let section: Section3 | null | any
  if (section3 === 'new') {
    section = {
      name: "",
      description: "",
      imageSrc: "https://res.cloudinary.com/dvcyhn0lj/image/upload/v1655217461/14.1_no-image.jpg_gkwtld.jpg",
      imageAlt: "",
    }
  } else {
    const data = await graphQLClientS.request(SITE, { _id: id })
    const section00 = data.site.routes.section_level_0.find((data: { href: string; }) => data.href === `${section0}`)
    const section11 = section00.section_level_1.find((data: { href: string; }) => data.href === `${section1}`)
    const section22 = section11.section_level_2.find((data: { href: string; }) => data.href === `${section2}`)
    section = section22.section_level_3.find((data: { href: string; }) => data.href === `${section3}`)

  }
  return {
    props: {
      section
    },
  };
}
export default Section3

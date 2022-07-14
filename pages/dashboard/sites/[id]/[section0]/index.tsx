import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { HeadingDashboard, HeadingForm } from '../../../../../components/component'
import { FormSite } from '../../../../../components/form'
import { FormSection } from '../../../../../components/form/formSection'
import { GridFeatured, GridItem, GridSection } from '../../../../../components/grid'
import { LayoutAdmin } from '../../../../../components/LayoutAdmin'
import { SITE, SITES } from '../../../../../src/graphql/site.query'
import { ISite, Section0 } from '../../../../../src/interfacesV2/siteV2'
import { graphQLClientS, graphQLClientSS } from '../../../../../src/swr/graphQLClient'

interface Props {
  section: Section0
}

const Section0: FC<Props> = ({ section }) => {
  console.log('hola', section);
  
  const { query, pathname } = useRouter()
  let p = pathname.substring(1).split('/')
  p.length = p.length - 2
  p.push(`${query.id}`, `${query.section0}`)
  let url = p.join('/')

  let u = pathname.substring(1).split('/')
  u.length = u.length - 2
  u.push(`${query.id}`)
  let urlu = u.join('/')
  
  return (
    <LayoutAdmin title="Sites">
      {
        query.section0 === 'new'
          ?
          null
          :
          <>
            {
              section.section_level_1.length === 0
                ?
                null
                :
                <>
                  <HeadingDashboard title='Sections' url={`${url}`} />
                  <GridSection data={section.section_level_1} url={`${url}`}/>
                </>
            }
            {
              section.items
                ?
                <>
                  <HeadingDashboard title='Items' url={`${url}/i`} />
                  <GridItem data={section.items}  url={`${url}`}/>
                </>
                :
                null
            }
            {
              section.featured.length === 0
                ?
                null
                :
                <>
                  <HeadingDashboard title='Promociones' url={`${url}`} />
                  <GridFeatured data={section.featured}  url={`${url}`}/>
                </>
            }
            
          </>
      }
      <HeadingForm title="Sección" />
      <FormSection section={section} url={urlu}/>
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

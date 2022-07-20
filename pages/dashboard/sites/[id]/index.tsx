import type { GetServerSideProps, GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { HeadingDashboard, HeadingForm, FormSite, GridSection, LayoutAdmin, Heading, Grid } from '../../../../components';
import { SITE, SITES, SITES_ID } from '../../../../src/graphql/query/site.query'
import { ISite } from '../../../../src/interfacesV2/siteV2'
import { graphQLClientS, graphQLClientSS } from '../../../../src/swr/graphQLClient'
import { getURL } from '../../../../src/utils/function';

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

const Id: FC<Props> = ({ site }) => {
  const { query, pathname, asPath } = useRouter()
  return (
    <LayoutAdmin title="Sites">
      {
        query.id !== 'new'
        ?
        <>
          <Heading title={site.data.title} />
          <Grid data={data} url={asPath} />
        </>
        :
          null
      }
      
      <HeadingForm title="Sitio" />
      <FormSite site={site} url={getURL(pathname)} />
    </LayoutAdmin>)
}


export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const { sitesAll } = await graphQLClientS.request(SITES_ID)
  const paths = sitesAll.map((data: {_id: string}) => ({params: {id: data._id}}))

  return {
    paths,
    fallback: 'blocking'
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id = '' } = params as {id: string}
  let site: ISite | null | any
  if (id === 'new') {
    site = {
      data: {
        title: '',
        domain: 'dominio.com',
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

// export const getServerSideProps:GetServerSideProps = async({ query }) => {
//   const { id = '' } = query
//   let site: ISite | null | any
//   if (id === 'new') {
// 		site= {
//       data: {
//         title: 'title',
//         domain: 'domain.com',
//         logo: 'https://res.cloudinary.com/dvcyhn0lj/image/upload/v1655217461/14.1_no-image.jpg_gkwtld.jpg',
//         icon: 'https://res.cloudinary.com/dvcyhn0lj/image/upload/v1655217461/14.1_no-image.jpg_gkwtld.jpg',
//         imageSrc: 'https://res.cloudinary.com/dvcyhn0lj/image/upload/v1655217461/14.1_no-image.jpg_gkwtld.jpg',
//         imageAlt: 'nan',
//         numberPhone: 123456,
//         address: 'address',
//         location: 'location',
//         description: 'description',
//       },
//       type: 'ecommerce',
//       client: '123456',
//     }
// 	} else {
//     const data = await graphQLClientS.request(SITE, { _id: id })
//     site = data.site
// 	}
// 	return {
// 		props: {
//       site
// 		},
// 	};
// }
export default Id

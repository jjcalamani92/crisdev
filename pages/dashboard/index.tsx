import type { GetStaticProps, NextPage } from 'next'
import { FC } from 'react'
import { LayoutAdmin } from '../../components'
import { SITE_PATHS_TREE } from '../../src/graphql/query/site.query'
import { Routes } from '../../src/interfacesV2'
import { graphQLClientS } from '../../src/swr/graphQLClient'
interface Props {
tree : any
}

const Dashboard: FC<Props> = ({tree}) => {
  console.log(tree);
  
  return (
    <LayoutAdmin title="Dashboard" tree={tree}>
      <h1>Productos</h1>
    </LayoutAdmin>)
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await graphQLClientS.request(SITE_PATHS_TREE, { _id: process.env.API_SITE })
  let tree = data.site.route.map((data0: Routes, i: number) => (
    {
      title: data0.name,
      key: `0-${i}`,
      children:
        data0.children
          ?
          data0.children.map((data1: Routes, j: number) => (
            {
              title: data1.name,
              key: `0-${i}-${j}`,
              children:
              data1.children
              ?
              data1.children.map((data2:Routes, k: number) => (
                {
                  title: data2.name,
                  key: `0-${i}-${j}-${k}`,
                }
              ))
              :
              []

            }
          ))
          :
          []
    }
    // data0.children 
    //   ?
    //   data0.children.map((data1: Children, j:number) => (
    //   [
    //     {
    //       title: data1.name,
    //       key: `0-${i}-${j}`
    //     },
    //     data1.children
    //     ?
    //     data1.children.map((data2: Children, k:number) => (
    //       {
    //         title: data2.name,
    //         key: `0-${i}-${j}-${k}`
    //       }
    //     ))
    //     : 
    //     {
    //       title: data0.name,
    //     },
    //   ]
    //   ))
    //   :
    //   {
    //     title: data0.name,
    //   },
  ))
  return {
    props: { tree }, // will be passed to the page component as props
    revalidate: 10,
  }
}

export default Dashboard

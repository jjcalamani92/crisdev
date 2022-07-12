import type { NextPage } from 'next'
import { Hero, Layout } from '../components'
import { Featured } from '../components/feature'
import Newsletter from '../components/newsletter'

const Home: NextPage = () => {
  return (
    <Layout
			title='CrisDev'
			pageDescription='StartUp de Tecnologia'
			// imageFullUrl={site.logo}
		>
			
			<Hero />
			{/* <Featured /> */}
			{/* <Newsletter /> */}
		</Layout>
  )
}

export default Home

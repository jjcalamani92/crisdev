import type { NextPage } from 'next'
import { Layout } from '../components'
import Hero from '../components/hero'
import Newsletter from '../components/newsletter'

const Home: NextPage = () => {
  return (
    <Layout
			title='CrisDev'
			pageDescription='StartUp de Tecnologia'
			// imageFullUrl={site.logo}
		>
			
			<Hero />
			{/* <Newsletter /> */}
		</Layout>
  )
}

export default Home

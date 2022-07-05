import type { NextPage } from 'next'
import { Hero, Layout } from '../components'
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

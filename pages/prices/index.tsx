import type { NextPage } from 'next'
import { Layout } from '../../components'
import { HeadingPrimary,Pricing } from '../../components'

const Prices: NextPage = () => {
  return (
    <Layout
			title='CrisDev'
			pageDescription='StartUp de Tecnologia'
			// imageFullUrl={site.logo}
		>
			<HeadingPrimary title=" Planes y Precios"/>
			<Pricing />
		</Layout>
  )
}

export default Prices

import React, { useState } from "react";
import { Layout, FAQComponent, HeadingPrimary} from "../../components";

const FAQs = () => {
    return (
      <Layout
			title='CrisDev'
			pageDescription='StartUp de Tecnologia'
			// imageFullUrl={site.logo}
		>
			<HeadingPrimary title="Preguntas Frecuentes"/>
			
      <FAQComponent />
		</Layout>
    );
};

export default FAQs

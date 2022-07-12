import React, { useState } from "react";
import { Layout } from "../../components";
import { HeadingPrimary } from "../../components/component";
import { FAQComponent } from "../../components/faq";

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

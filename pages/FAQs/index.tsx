import React, { useState } from "react";
import { Layout } from "../../components";
import { HeadingPrimary } from "../../components/component";
import { FAQsComponent } from "../../components/faqs";

const FAQs = () => {
    return (
      <Layout
			title='CrisDev'
			pageDescription='StartUp de Tecnologia'
			// imageFullUrl={site.logo}
		>
			<HeadingPrimary title="Preguntas Frecuentes"/>
			
      <FAQsComponent />
		</Layout>
    );
};

export default FAQs

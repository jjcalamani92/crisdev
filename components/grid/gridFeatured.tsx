import { useRouter } from "next/router";
import React, { FC, useState } from "react";
import { IResponsive } from "../../src/interfacesV2/crisdev";
import { Section0, Featured, Item } from '../../src/interfacesV2/siteV2';
import { CardItem, CardSection, CardSite } from "../card";
import { CardFeatured } from "../card/cardFeatured";

import { Main } from "../component";

interface GridFeatured {
  responsive?: IResponsive
  url: string
  data: Section0[] | Featured[] | Item[] | undefined
  // data: Category[] | Section[] | Featured[] | Item[] | IMark[];
}
export const GridFeatured:FC<GridFeatured> = ({data, responsive, url}) => {
  return (
    <Main>
      <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 col-span-5 gap-6`}>
            {data?.map((d, i) => (
              <CardFeatured url={url} data={d} key={i} />
            ))}
          </div>
    </Main>
  )
}
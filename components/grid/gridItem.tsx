import { useRouter } from "next/router";
import React, { FC, useState } from "react";
import { IResponsive } from "../../src/interfacesV2/crisdev";
import { Section0, Featured, Item } from '../../src/interfacesV2/siteV2';
import { CardItem, CardSection, CardSite } from "../card";

import { Main } from "../component";

interface GridItem {
  responsive?: IResponsive
  url: string
  data: Section0[] | Featured[] | Item[] | undefined
  // data: Category[] | Section[] | Featured[] | Item[] | IMark[];
}
export const GridItem: FC<GridItem> = ({ data, responsive, url }) => {
  return (
    <Main>
      <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 col-span-5 gap-3 md:gap-6`}>
        {data?.map((d, i) => (
          <CardItem url={url} data={d} key={i} />
        ))}
      </div>
    </Main>
  )
}
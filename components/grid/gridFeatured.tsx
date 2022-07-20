import { useRouter } from "next/router";
import React, { FC, useState } from "react";
import { Section0, Featured, Item, Routes } from '../../src/interfacesV2/siteV2';
import { CardFeatured } from "../card/cardFeatured";

import { Main } from "../component";

interface GridFeatured {
  data: Routes[] | Featured[] | Item[] | undefined
  // data: Category[] | Section[] | Featured[] | Item[] | IMark[];
}
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}
export const GridFeatured:FC<GridFeatured> = ({data}) => {
  // const {sm, md, lg} = responsive
  return (
    <Main>

      <div className={`grid grid-cols-2 md:grid-cols-3 col-span-5 gap-3 md:gap-6 lg:grid-cols-5`}>
            {data?.map((d, i) => (
              <CardFeatured data={d} key={i} />
            ))}
          </div>
    </Main>
  )
}
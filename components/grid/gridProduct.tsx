import { useRouter } from "next/router";
import React, { FC, useState } from "react";
import { IResponsive } from "../../src/interfacesV2/crisdev";
import { Section0, Featured, Item } from '../../src/interfacesV2/siteV2';
import { CardSection, CardSite } from "../card";
import { Main } from "../component";

interface Grid {
  responsive: IResponsive
  data: any[]
  // data: Category[] | Section[] | Featured[] | Item[] | IMark[];
}
export const Grid:FC<Grid> = ({data, responsive}) => {
  const {sm, md, lg} = responsive
  // console.log(responsive);
  const { pathname }  = useRouter();
  return (
    <Main>
      <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 col-span-5 gap-6`}>
            {data.map((d, i) => (
              <CardSite url={pathname} data={d} key={i} />
            ))}
          </div>
    </Main>
  )
}

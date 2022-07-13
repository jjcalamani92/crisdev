import { useRouter } from "next/router";
import React, { FC, useState } from "react";
import { IResponsive } from "../src/interfacesV2/crisdev";
import { CardSite } from "./card";
import { Main } from "./component";

interface Grid {
  data: any[]
  responsive: IResponsive
  // data: Category[] | Section[] | Featured[] | Item[] | IMark[];
}
export const Grid:FC<Grid> = ({data, responsive}) => {
  const { pathname }  = useRouter();
  // const { pathname } = router
  console.log(pathname);
  console.log(data);
  
  const {sm, md, lg} = responsive
  return (
    <Main>
      <div className={`grid grid-cols-${sm} md:grid-cols-${md} lg:grid-cols-${lg} col-span-5 gap-6`}>
            {data.map((d, i) => (
              <CardSite url={pathname} data={d} key={i} />
              // <h1 key={i}>{d.data.domain}</h1>
            ))}
          </div>
    </Main>
  )
}
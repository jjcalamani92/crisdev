import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import { DELETE_SECTION_0, DELETE_SECTION_1, DELETE_SECTION_2, DELETE_SECTION_3, DELETE_SECTION_4, DELETE_SECTION_5, REMOVE_SITE } from "../../src/graphql/mutation/site.mutation";
import { Featured, Item, Section0 } from "../../src/interfacesV2/siteV2";
import { graphQLClientS } from "../../src/swr/graphQLClient";
import { Button } from "../component";

interface CardSite {
  data: any
  // data: Category | Section | Featured | Item;
  url: string
}

export const CardSite: FC<CardSite> = ({ data, url }) => {
  const onDelete = async (id: string) => {
    await graphQLClientS.request(REMOVE_SITE, { _id: id })
  }
  const {title, imageSrc, imageAlt} = data.data
  // console.log(imageSrc);
  // console.log(url);
  
  return (
    <div className="shadow-lg p-2 ">
      <Link href={`${url}/${data._id}`}>
        <a>
          <div className="w-full bg-white rounded-sm overflow-hidden leading-none">
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={210}
              height={210}
              objectFit={'cover'}
            />
          </div>
          <div className="py-2 flex justify-between">
            <h3 className="text-xs md:text-sm text-gray-700">
              {title}
            </h3>
          </div>
        </a>
      </Link>
      <Button content='eliminar' click={() => onDelete(data._id)} />
    </div>
  )
}

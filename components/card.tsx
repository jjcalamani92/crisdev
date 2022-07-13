import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import { DELETE_SECTION_0, REMOVE_SITE } from "../src/graphql/mutation/site.mutation";
import { Featured, Item, Section0 } from "../src/interfacesV2/siteV2";
import { graphQLClientS } from "../src/swr/graphQLClient";
import { Button } from "./component";

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

interface CardSection {
  data: Section0 | Featured | Item
  // data: Category | Section | Featured | Item;
  url: string
}

export const CardSection: FC<CardSection> = ({ data, url }) => {
  
  const {replace, pathname, query} = useRouter()
  
  const onDelete = async (id: string) => {
    await graphQLClientS.request(DELETE_SECTION_0, { _id: query.id, input: {'section_level_0': id}})
  }
  // let p = pathname.substring(1).split('/')
  // p.splice(-1,1)
  // let path = p.join('/')
  // // console.log(path)
  
  // let u = pathname.substring(1).split('/')
  // u.length = u.length - 2
  // u.push(`${query.id}`)
  // let urlu = u.join('/')
  
  // console.log(urlu);
  const {name, href, imageSrc, imageAlt} = data
  // console.log(href);
  // console.log(imageSrc);
  // console.log(query.id);
  
  return (
    <div className="shadow-lg p-2 ">
      <Link href={`/${url}/${href}`}>
      {/* <Link href={`/${path}/${query.id}/${href}`}> */}
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
              {name}
            </h3>
          </div>
        </a>
      </Link>
      <Button content='eliminar' click={() => onDelete(data.id)} />
    </div>
  )
}
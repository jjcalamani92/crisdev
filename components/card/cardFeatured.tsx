import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import { DELETE_FEATURED_1, DELETE_FEATURED_2, DELETE_FEATURED_3, DELETE_FEATURED_4, DELETE_FEATURED_5} from "../../src/graphql/mutation/site.mutation";
import { Featured, Item, Section0, Routes } from '../../src/interfacesV2/siteV2';
import { graphQLClientS } from "../../src/swr/graphQLClient";
import { getURL } from "../../src/utils/function";
import { Button } from "../component";

interface CardFeatured {
  data: Routes | Featured | Item
}

export const CardFeatured: FC<CardFeatured> = ({ data }) => {
  const {name, href, imageSrc, imageAlt, uid} = data
  const {replace, pathname, query, push, asPath} = useRouter()
  
  const onDelete = async (uid: string) => {
    {
      query.section4
      ?
      await graphQLClientS.request(DELETE_FEATURED_5, { _id: query.id, input: {'children_uid_0': query.section0, 'children_uid_1': query.section1, 'children_uid_2': query.section2, 'children_uid_3': query.section3, 'children_uid_4': query.section4, 'children_uid_5': uid}})
      :
      query.section3
      ?
      await graphQLClientS.request(DELETE_FEATURED_4, { _id: query.id, input: {'children_uid_0': query.section0, 'children_uid_1': query.section1, 'children_uid_2': query.section2, 'children_uid_3': query.section3, 'children_uid_4': uid}})
      :
      query.section2
      ?
      await graphQLClientS.request(DELETE_FEATURED_3, { _id: query.id, input: {'children_uid_0': query.section0, 'children_uid_1': query.section1, 'children_uid_2': query.section2, 'children_uid_3': uid}})
      :
      query.section1
      ?
      await graphQLClientS.request(DELETE_FEATURED_2, { _id: query.id, input: {'children_uid_0': query.section0, 'children_uid_1': query.section1, 'children_uid_2': uid}})
      :
      query.section0
      ?
      await graphQLClientS.request(DELETE_FEATURED_1, { _id: query.id, input: {'children_uid_0': query.section0, 'children_uid_1': uid}})
      :
      null
    }
    push(`${asPath}`)
  }

  return (
    <div className="shadow-lg p-2 ">
      <Link href={`${asPath}/f/${href}`}>
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
      <Button bg="none" content='eliminar' click={() => onDelete(uid)} />
    </div>
  )
}
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import Swal from "sweetalert2";
import { DELETE_ITEM_1, DELETE_ITEM_2, DELETE_ITEM_3, DELETE_ITEM_4, DELETE_ITEM_5, DELETE_SECTION_1, DELETE_SECTION_2, DELETE_SECTION_3, DELETE_SECTION_4, DELETE_SECTION_5, REMOVE_SITE } from "../../src/graphql/mutation/site.mutation";
import { Featured, Item, Routes, Section0 } from "../../src/interfacesV2/siteV2";
import { graphQLClientS } from "../../src/swr/graphQLClient";
import { getURL } from "../../src/utils/function";
import { Button } from "../component";

interface CardItem {
  data: Routes | Featured | Item
}

export const CardItem: FC<CardItem> = ({ data }) => {
  const {replace, pathname, query, push, asPath} = useRouter()
  const {name, href, imageSrc, imageAlt, uid} = data
  
  const onDelete = async (uid: string) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        if (query.section0) {
          await graphQLClientS.request(DELETE_ITEM_1, { _id: query.id, input: {'children_uid_0': query.section0, 'children_uid_1': uid}})
          push(`${asPath}`)
        } else if (query.section1) {
          await graphQLClientS.request(DELETE_ITEM_2, { _id: query.id, input: { 'children_uid_0': query.section0, 'children_uid_1': query.section1, 'children_uid_2': uid } })
          push(`${asPath}`)
        } else if (query.section2) {
          await graphQLClientS.request(DELETE_ITEM_3, { _id: query.id, input: { 'children_uid_0': query.section0, 'children_uid_1': query.section1, 'children_uid_2': query.section2, 'children_uid_3': uid } })
          push(`${asPath}`)
        } else if (query.section3) {
          await graphQLClientS.request(DELETE_ITEM_4, { _id: query.id, input: { 'children_uid_0': query.section0, 'children_uid_1': query.section1, 'children_uid_2': query.section2, 'children_uid_3': query.section3, 'children_uid_4': uid } })
          push(`${asPath}`)
        } else if (query.section4) {
          await graphQLClientS.request(DELETE_ITEM_5, { _id: query.id, input: { 'children_uid_0': query.section0, 'children_uid_1': query.section1, 'children_uid_2': query.section2, 'children_uid_3': query.section3, 'children_uid_4': query.section4, 'children_uid_5': uid } })
          push(`${asPath}`)
        }
      }
    })
    // {
    //   query.section4
    //   ?
    //   await graphQLClientS.request(DELETE_ITEM_5, { _id: query.id, input: {'children_uid_0': query.section0, 'children_uid_1': query.section1, 'children_uid_2': query.section2, 'children_uid_3': query.section3, 'children_uid_4': query.section4, 'children_uid_5': uid}})
    //   :
    //   query.section3
    //   ?
    //   await graphQLClientS.request(DELETE_ITEM_4, { _id: query.id, input: {'children_uid_0': query.section0, 'children_uid_1': query.section1, 'children_uid_2': query.section2, 'children_uid_3': query.section3, 'children_uid_4': uid}})
    //   :
    //   query.section2
    //   ?
    //   await graphQLClientS.request(DELETE_ITEM_3, { _id: query.id, input: {'children_uid_0': query.section0, 'children_uid_1': query.section1, 'children_uid_2': query.section2, 'children_uid_3': uid}})
    //   :
    //   query.section1
    //   ?
    //   await graphQLClientS.request(DELETE_ITEM_2, { _id: query.id, input: {'children_uid_0': query.section0, 'children_uid_1': query.section1, 'children_uid_2': uid}})
    //   :
    //   query.section0
    //   ?
    //   await graphQLClientS.request(DELETE_ITEM_1, { _id: query.id, input: {'children_uid_0': query.section0, 'children_uid_1': uid}})
    //   :
    //   null
    // }
    // push(`${asPath}`)
  }

  return (
    <div className="shadow-lg p-2 ">
      <Link href={`${asPath}/i/${href}`}>
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
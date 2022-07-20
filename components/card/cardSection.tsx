import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import Swal from "sweetalert2";
import { DELETE_CHILDREN_0, DELETE_CHILDREN_1, DELETE_CHILDREN_2, DELETE_CHILDREN_3, DELETE_CHILDREN_4, DELETE_CHILDREN_5, REMOVE_SITE } from "../../src/graphql/mutation/site.mutation";
import { Featured, Item, Routes, Section0 } from "../../src/interfacesV2/siteV2";
import { graphQLClientS } from "../../src/swr/graphQLClient";
import { getURL } from "../../src/utils/function";
import { Button } from "../component";

interface CardSection {
  data: Routes | Featured | Item
  // data: Category | Section | Featured | Item;
}

export const CardSection: FC<CardSection> = ({ data }) => {
  // console.log('data', data);


  const { replace, pathname, query, push, asPath } = useRouter()

  const onDelete = async (uid: string) => {
    // {
    //   query.section4
    //   ?
    //   await graphQLClientS.request(DELETE_CHILDREN_5, { _id: query.id, input: {'children_uid_0': query.section0, 'children_uid_1': query.section1, 'children_uid_2': query.section2, 'children_uid_3': query.section3, 'children_uid_4': query.section4, 'children_uid_5': uid}})
    //   :
    //   query.section3
    //   ?
    //   await graphQLClientS.request(DELETE_CHILDREN_4, { _id: query.id, input: {'children_uid_0': query.section0, 'children_uid_1': query.section1, 'children_uid_2': query.section2, 'children_uid_3': query.section3, 'children_uid_4': uid}})
    //   :
    //   query.section2
    //   ?
    //   await graphQLClientS.request(DELETE_CHILDREN_3, { _id: query.id, input: {'children_uid_0': query.section0, 'children_uid_1': query.section1, 'children_uid_2': query.section2, 'children_uid_3': uid}})
    //   :
    //   query.section1
    //   ?
    //   await graphQLClientS.request(DELETE_CHILDREN_2, { _id: query.id, input: {'children_uid_0': query.section0, 'children_uid_1': query.section1, 'children_uid_2': uid}})
    //   :
    //   query.section0
    //   ?
    //   await graphQLClientS.request(DELETE_CHILDREN_1, { _id: query.id, input: {'children_uid_0': query.section0, 'children_uid_1': uid}})
    //   :
    //   query.id
    //   ?
    //   (
    //     Swal.fire({
    //       title: 'Are you sure?',
    //       text: "You won't be able to revert this!",
    //       icon: 'warning',
    //       showCancelButton: true,
    //       confirmButtonColor: '#3085d6',
    //       cancelButtonColor: '#d33',
    //       confirmButtonText: 'Yes, delete it!'
    //     }).then(async (result) => {
    //       if (result.isConfirmed) {
    //         Swal.fire(
    //           'Deleted!',
    //           'Your file has been deleted.',
    //           'success'
    //         ),

    //         await graphQLClientS.request(DELETE_CHILDREN_0, { _id: query.id, input: {'children_uid_0': uid}})
    //       }
    //     })
    //   )
    //   :
    //   null
    // }
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
        if (query.id) {
          await graphQLClientS.request(DELETE_CHILDREN_0, { _id: query.id, input: { 'children_uid_0': uid } })
          push(`${asPath}`)
        } else if (query.section0) {
          await graphQLClientS.request(DELETE_CHILDREN_1, { _id: query.id, input: { 'children_uid_0': query.section0, 'children_uid_1': uid } })
          push(`${asPath}`)
        } else if (query.section1) {
          await graphQLClientS.request(DELETE_CHILDREN_2, { _id: query.id, input: { 'children_uid_0': query.section0, 'children_uid_1': query.section1, 'children_uid_2': uid } })
          push(`${asPath}`)
        } else if (query.section2) {
          await graphQLClientS.request(DELETE_CHILDREN_3, { _id: query.id, input: { 'children_uid_0': query.section0, 'children_uid_1': query.section1, 'children_uid_2': query.section2, 'children_uid_3': uid } })
          push(`${asPath}`)
        } else if (query.section3) {
          await graphQLClientS.request(DELETE_CHILDREN_4, { _id: query.id, input: { 'children_uid_0': query.section0, 'children_uid_1': query.section1, 'children_uid_2': query.section2, 'children_uid_3': query.section3, 'children_uid_4': uid } })
          push(`${asPath}`)
        } else if (query.section4) {
          await graphQLClientS.request(DELETE_CHILDREN_5, { _id: query.id, input: { 'children_uid_0': query.section0, 'children_uid_1': query.section1, 'children_uid_2': query.section2, 'children_uid_3': query.section3, 'children_uid_4': query.section4, 'children_uid_5': uid } })
          push(`${asPath}`)
        }
      }
    })
  }

  const { name, href, imageSrc, imageAlt, uid } = data
  return (
    <div className="shadow-lg p-2 ">
      <Link href={`${asPath}/${href}`}>
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
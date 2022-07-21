import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import Swal from "sweetalert2";
import { REMOVE_SITE } from "../../src/graphql/mutation/site.mutation";
import { Featured, ISite, Item, Section0 } from "../../src/interfacesV2/siteV2";
import { graphQLClientS } from "../../src/swr/graphQLClient";
import { getURL } from "../../src/utils/function";
import { Button } from "../component";

interface CardSite {
  data: ISite
}

export const CardSite: FC<CardSite> = ({ data }) => {
  const { push, pathname, query, asPath } = useRouter()
  
  const onDelete = async (id: string) => {
    Swal.fire({
      title: '¿Está seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, bórralo!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await graphQLClientS.request(REMOVE_SITE, { _id: id })
        push(`${asPath}`)
      }
    })
  }
  const {title, imageSrc, imageAlt} = data.data
  const {_id} = data

  return (
    <div className="shadow-lg p-2 ">
      <Link href={`${asPath}/${_id}`}>
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
      <Button bg="none" content='eliminar' click={() => onDelete(_id)} />
    </div>
  )
}

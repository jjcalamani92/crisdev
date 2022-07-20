import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import { Article } from "../../src/interfacesV2/wear";
import { graphQLClient, graphQLClientP, graphQLClientS } from "../../src/swr/graphQLClient";
import { Button } from "../component";
import Swal from "sweetalert2";
import { REMOVE_PRODUCT } from '../../src/graphql/mutation/wear.mutation';

interface CardProduct {
  article: Article;
  id: string
}

export const CardProduct: FC<CardProduct> = ({ article, id }) => {

  
  const { push, pathname, query, asPath } = useRouter()
    
  const { title, slug, image } = article
  const onDelete = async (id: string) => {
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
        await graphQLClient.request(REMOVE_PRODUCT, { _id: id })
        push(asPath)
      }
    })
    

  }
  return (
    <div className="shadow-lg p-2 ">
      <Link href={`${asPath}/${slug}`}>
        <a>
          <div className="w-full bg-white rounded-sm overflow-hidden leading-none">
            <Image
              src={"https://res.cloudinary.com/dvcyhn0lj/image/upload/v1655217461/14.1_no-image.jpg_gkwtld.jpg"}
              alt={title}
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
      <Button bg="none" content='eliminar' click={() => onDelete(id)} />
    </div>
  )
}

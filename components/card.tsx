import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { Button } from "./component";

interface CardSite {
  data: any
  // data: Category | Section | Featured | Item;
  url: string
}

export const CardSite: FC<CardSite> = ({ data, url }) => {
  const onDeleteData = (id: string) => {
  }
  const {title, imageSrc, imageAlt} = data.data
  // console.log(imageSrc);
  console.log(url);
  
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
      <Button content='eliminar' click={() => onDeleteData(data._id)} />
    </div>
  )
}
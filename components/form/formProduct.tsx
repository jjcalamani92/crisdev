import Image from "next/image";
import { useRouter } from "next/router";
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { CREATE_PRODUCT, UPDATE_PRODUCT } from "../../src/graphql/mutation/wear.mutation";


import SortableList, { SortableItem } from "react-easy-sort";
import { Button } from "../component";
import arrayMove from "array-move";
import { graphQLClient } from "../../src/swr/graphQLClient";
import { Cascader } from "antd";
import { routes } from "./formAnt";
import axios from "axios";
import Input from "antd/lib/input/Input";
import { CreateProductInput, IMark } from "../../src/interfacesV2/wear";
import { getURL } from "../../src/utils/function";


interface Option {
  href: string;
  name: string;
  children?: Option[];
}


interface Props {
  product: CreateProductInput
  routes: Option[]
}
const validSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']

const KeyCodes = {
  comma: 188,
  enter: 13
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

export const FormProduct: FC<Props> = ({ product, routes }) => {

  const { asPath, query } = useRouter()
	let url = asPath.split('/')
  const dataID = url[url.length-1]

  const { register, handleSubmit, formState: { errors }, getValues, setValue, watch } = useForm<CreateProductInput>({
    defaultValues: { ...product }
  })
  const [images, setImages] = useState(getValues('imageSrc'));

  const [brand, setBrand] = useState([]);
  const [brandHref, setBrandHref] = useState('');

  const [category, setCategory] = useState([]);
  const [categoryHref, setCategoryHref] = useState('');
  const [section, setSection] = useState([]);
  const [sectionHref, setSectionHref] = useState('');
  const [item, setItem] = useState([]);
  const [itemHref, setItemHref] = useState('');
  const [featured, setFeatured] = useState([]);
  const [featuredHref, setFeaturedHref] = useState('');


  useEffect(() => {
    if (product._id) {

      setBrandHref(product.mark);
      setSectionHref(product.section);
      setCategoryHref(product.category);
      setFeaturedHref(product.featured);
    }
  }, [])

  const handleBrand = (event: ChangeEvent<HTMLSelectElement>) => {
    const getBrandHref = event.target.value;
    setValue('mark', getBrandHref, { shouldValidate: true })
    setBrandHref(getBrandHref);
  }

  useEffect(() => {
    const getBrand = async () => {
      const resp = await fetch(`${process.env.APIPP_URL}/api/marks`)
        .then(res => res.json())
      const res = resp.filter((d: { site: string; }) => d.site === `${process.env.API_SITE}`)
      const re = res.map((data: { href: IMark; }): IMark => data.href)
      setBrand(re)
    }
    getBrand();
  }, []);

  const handleFeatured = (event: ChangeEvent<HTMLSelectElement>) => {
    const getFeaturedHref = event.target.value;
    setFeaturedHref(getFeaturedHref);
    setValue('featured', getFeaturedHref, { shouldValidate: true })
  }

 

  const router = useRouter()
  const [newTagValue, setNewTagValue] = useState('')
  const [route, setRoute] = useState(getValues('route'))

  // const onNewTag = () => {

  //   const newTag = newTagValue.trim().toLocaleLowerCase();
  //   setNewTagValue('');
  //   const currentTags = getValues('tags');
  //   if (currentTags.includes(newTag)) {
  //     return;
  //   }
  //   currentTags.push(newTag);
  // }
  // const onDeleteTag = (tag: string) => {
  //   const updatedTags = getValues('tags').filter(t => t !== tag);
  //   setValue('tags', updatedTags, { shouldValidate: true })
  // }

  const onSortEnd = (oldIndex: number, newIndex: number) => {
    setImages((array) => arrayMove(array, oldIndex, newIndex));
  };

  const onDeleteImage = async (image: string) => {
    setValue('imageSrc', getValues('imageSrc').filter(img => img !== image), { shouldValidate: true })
    const fileExtension = image.substring(image.lastIndexOf('/') + 1).split('.').slice(0, -1).join('.')
    // await axios.patch(`${process.env.APIUP_URL}/api/upload/${fileExtension}`)

  }
  const onChangeRoute = (value: any, selectedOptions: any) => {
    {
      selectedOptions
    }
    setRoute(selectedOptions.map((data: { name: string; }) => (data.name)));
  };

  

  const onSubmit = async (form: CreateProductInput) => {
    // const data = { ...form, name: form.name.trim(), price: Number(form.price), oldPrice: Number(form.oldPrice), inStock: Number(form.inStock), site: process.env.API_SITE }
    const data = { ...form, price: Number(form.price), discountPrice: Number(form.discountPrice), inStock: Number(form.inStock), site: query.id, route: route }
    // console.log(data);
    const { _id, ...dat } = data
    
    if (product._id) {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Producto Actualizado',
        showConfirmButton: false,
        timer: 1500
      })
      await graphQLClient.request(UPDATE_PRODUCT, {_id: product._id, input: dat })
      router.replace(getURL(asPath))
      
    } else {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Producto Creado',
        showConfirmButton: false,
        timer: 1500
      })
      await graphQLClient.request(CREATE_PRODUCT, { input: data })
      router.push(getURL(asPath))
    }

  }

  const onFileSelected = async ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (!target.files || target.files.length === 0) {
      return;
    }

    try {
      for (const file of target.files) {
        const formData = new FormData();
        formData.append('file', file);

        const { data } = await axios.post(`${process.env.APIUP_URL}/api/upload/image`, formData)
        setValue('imageSrc', [...getValues('imageSrc'), data.url], { shouldValidate: true })
        // setImages(getValues('imageSrc'))
      }
    } catch (error) {
      console.log({ error })
    }
  }
  const filter = (inputValue: string, path: any[]) =>
  path.some(
    (option) =>
      option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
  );

  const [tags, setTags] = useState([
    { id: 'Thailand', text: 'Thailand' },
    { id: 'India', text: 'India' },
    { id: 'Vietnam', text: 'Vietnam' },
    { id: 'Turkey', text: 'Turkey' }
  ]);

  const handleDelete = (i: number) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag: { id: string; text: string; }) => {
    setTags([...tags, tag]);
  };

  const handleDrag = (tag: { id: string; text: string; }, currPos: number, newPos: number) => {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    setTags(newTags);
  };

  const handleTagClick = (index: number) => {
    console.log('The tag at index ' + index + ' was clicked');
  };
  return (
    <>
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto lg:max-w-none mb-3">

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="sm:shadow sm:rounded-md sm:overflow-hidden">
                <div className="sm:p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-3 lg:gap-6">
                    <div className="grid grid-cols-8 gap-3 sm:gap-4 col-span-2">
                      <div className="col-span-8">
                        <label htmlFor="name" className="block text-xs md:text-sm font-medium text-gray-700">
                          Nombre
                        </label>
                        <input
                          className="mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm text-xs md:text-sm  rounded-md  py-2 px-3 border border-gray-300"
                          type={"text"}
                          {...register('name', {
                            onChange: (e) => { },
                            onBlur: (e) => { },
                            required: 'Este campo es requerido',
                            minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                          })}
                        />
                        <div>
                          {errors.name && <span className="text-xs md:text-sm text-orange-500">{errors.name.message}</span>}
                        </div>
                      </div>
                      {/* <div className="col-span-8 sm:col-span-4">
                        <label htmlFor="name" className="block text-xs md:text-sm font-medium text-gray-700">
                          Slug
                        </label>
                        <input
                          className="mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm text-xs md:text-sm  rounded-md  py-2 px-3 border border-gray-300"
                          type={"text"}
                        />

                      </div> */}
                     
                      <div className="col-span-6">
                        <label htmlFor="route" className="block text-xs md:text-sm font-medium text-gray-700">
                          Ruta
                        </label>
                        <Cascader
                          options={routes}
                          placeholder="Selecciona la ruta"
                          size={"large"}
                          allowClear={false}
                          fieldNames={{label: "name", value: "href", children: "children"}}
                          defaultValue={route}
                          style={{width: "100%", marginTop:1, paddingTop:2, fontSize: 15}}
                          // className={'w-auto text-xs md:text-sm'}
                          showSearch={{
                              filter
                            }}
                            onSearch={(value) => console.log(value)}
                            // {...register('section', {
                            //   required: 'Este campo es requerido',
                            // })}
                            onChange={onChangeRoute}
                        />
                        {/* <div>
                          {errors.section && <span className="text-xs md:text-sm text-orange-500">{errors.section.message}</span>}
                        </div> */}
                      </div>
                      {/* <div className="col-span-4 sm:col-span-2">
                        <label htmlFor="section" className="block text-xs md:text-sm font-medium text-gray-700">
                          Sección
                        </label>
                        <select
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-xs md:text-sm capitalize"
                          {...register('section', {
                            required: 'Este campo es requerido',
                          })}
                          onChange={(e) => handleSection(e)}
                          value={getValues('section')}


                        >
                          <option value="prueba">--Seleccionar--</option>
                          {
                            section?.map((data, i) => (

                              <option key={i} className="capitalize">{data}</option>
                            ))
                          }
                        </select>
                        <div>
                          {errors.category && <span className="text-xs md:text-sm text-orange-500">{errors.category.message}</span>}
                        </div>
                      </div>
                      <div className="col-span-4 sm:col-span-2">
                        <label htmlFor="category" className="block text-xs md:text-sm font-medium text-gray-700">
                          Categoría
                        </label>
                        <select
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-xs md:text-sm capitalize"
                          {...register('category', {
                            required: 'Este campo es requerido',
                          })}
                          onChange={(e) => handleCategory(e)}
                          value={getValues('category')}
                        >
                          <option value="prueba">--Seleccionar--</option>
                          {
                            category?.map((data: string, i: number) => (
                              <option
                                className="capitalize"
                                key={i}
                              >{data}</option>
                            ))
                          }
                        </select>
                        <div>
                          {errors.category && <span className="text-xs md:text-sm text-orange-500">{errors.category.message}</span>}
                        </div>
                      </div>
                      <div className="col-span-4 sm:col-span-2">
                        <label htmlFor="subCategory" className="block text-xs md:text-sm font-medium text-gray-700">
                          Sub Categoría
                        </label>
                        <select
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-xs md:text-sm capitalize"
                          {...register('subCategory', {
                            required: 'Este campo es requerido',
                          })}
                          onChange={(e) => handleCategory(e)}
                          value={getValues('subCategory')}
                        >
                          <option value="prueba">--Seleccionar--</option>
                          {
                            [].map((data: string, i: number) => (
                              <option
                                className="capitalize"
                                key={i}
                              >{data}</option>
                            ))
                          }
                        </select>
                        <div>
                          {errors.subCategory && <span className="text-xs md:text-sm text-orange-500">{errors.subCategory.message}</span>}
                        </div>
                      </div>

                      <div className="col-span-4 sm:col-span-2">
                        <label htmlFor="item" className="block text-xs md:text-sm font-medium text-gray-700">
                          Item
                        </label>
                        <select
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-xs md:text-sm capitalize"
                          {...register('item', {
                            required: 'Este campo es requerido',
                          })}
                          onChange={(e) => handleItem(e)}
                          value={getValues('item')}


                        >
                          <option value="prueba">--Seleccionar--</option>
                          {
                            item?.map((data, i) => (

                              <option key={i} className="capitalize">{data}</option>
                            ))
                          }
                        </select>
                        <div>
                          {errors.item && <span className="text-xs md:text-sm text-orange-500">{errors.item.message}</span>}
                        </div>
                      </div> */}
                      <div className="col-span-4 sm:col-span-2">
                        <label htmlFor="brand" className="block text-xs md:text-sm font-medium text-gray-700">
                          Marca
                        </label>
                        <select
                          className="mt-1  block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-xs md:text-sm capitalize"
                          {...register('mark', {
                            required: 'Este campo es requerido',
                          })}
                          onChange={(e) => handleBrand(e)}
                          value={getValues('mark')}
                        >
                          <option value="prueba" >--Seleccionar--</option>
                          {
                            brand?.map((data: string, i: number) => (
                              <option
                                className="capitalize"
                                key={i}
                              >{data}</option>
                            ))
                          }
                        </select>
                        <div>
                          {errors.mark && <span className="text-xs md:text-sm text-orange-500">{errors.mark.message}</span>}
                        </div>
                      </div>
                      <div className="col-span-4 sm:col-span-2">
                        <label htmlFor="inStock" className="block text-xs md:text-sm font-medium text-gray-700">
                          Inventario
                        </label>
                        <input
                          className="mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm text-xs md:text-sm border border-gray-300 rounded-md  py-2 px-3"
                          type='number'
                          min={0}

                          {...register('inStock', {
                            required: 'Este campo es requerido',
                            min: { value: 0, message: 'Mínimo de valor cero' }
                          })}
                        />
                        <div>
                          {errors.inStock && <span className="text-xs md:text-sm text-orange-500">{errors.inStock.message}</span>}
                        </div>
                      </div>
                      <div className="col-span-4 sm:col-span-2">
                        <label htmlFor="price" className="block text-xs md:text-sm font-medium text-gray-700">
                          Precio[Bs]
                        </label>
                        <input
                          className="mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm text-xs md:text-sm border border-gray-300 rounded-md  py-2 px-3"
                          type='number'
                          min={0}
                          {...register('price', {
                            required: 'Este campo es requerido',
                            min: { value: 0, message: 'Mínimo de valor cero' }
                          })}
                        />
                        <div>
                          {errors.price && <span className="text-xs md:text-sm text-orange-500">{errors.price.message}</span>}
                        </div>
                      </div>
                      <div className="col-span-4 sm:col-span-2">
                        <label htmlFor="discountPrice" className="block text-xs md:text-sm font-medium text-gray-700">
                          Precio de descuento[Bs]
                        </label>
                        <input
                          type='number'
                          min={0}
                          className="mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm text-xs md:text-sm border border-gray-300 rounded-md  py-2 px-3"
                          {...register('discountPrice', {
                            required: 'Este campo es requerido',
                            min: { value: 0, message: 'Mínimo de valor cero' }
                          })}
                        />
                        <div>
                          {errors.discountPrice && <span className="text-xs md:text-sm text-orange-500">{errors.discountPrice.message}</span>}
                        </div>
                      </div>
                      <div className="col-span-4 sm:col-span-2">
                        <label htmlFor="featured" className="block text-xs md:text-sm font-medium text-gray-700">
                          Destacados
                        </label>
                        <select
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-xs md:text-sm capitalize"
                          {...register('featured')}
                          onChange={(e) => handleFeatured(e)}
                          value={getValues('featured')}


                        >
                          <option value="ninguno">--Seleccionar--</option>
                          {
                            featured?.map((data, i) => (

                              <option key={i} className="capitalize text-xs md:text-sm">{data}</option>
                            ))
                          }
                        </select>
                        <div>
                          {errors.featured && <span className="text-xs md:text-sm text-orange-500">{errors.featured.message}</span>}
                        </div>
                      </div>
                      <div className="col-span-4">
                        <label htmlFor="description" className="block text-xs md:text-sm font-medium text-gray-700">
                          Descripción
                        </label>
                        <div className="">
                          <textarea
                            rows={4}
                            className="mt-1 shadow-sm focus:ring-orange-500 focus:border-orange-500 block w-full text-xs md:text-sm border border-gray-300 rounded-md  py-2 px-3"
                            {...register('description', {
                              required: 'Este campo es requerido',
                              minLength: { value: 2, message: 'Mínimo 3 caracteres' }
                            })}
                          />
                        </div>
                        <div>
                          {errors.description && <span className="text-xs md:text-sm text-orange-500">{errors.description.message}</span>}
                        </div>
                      </div>

                      {/* <div className="col-span-6 sm:col-span-2">
                        <fieldset
                        >
                          <legend className="contents text-xs md:text-sm font-medium text-gray-900">Tallas</legend>
                          <div className="grid grid-cols-4 sm:grid-cols-3 gap-2 mt-4 ">
                            {
                              validSizes.map((data, i) => (
                                <div className="flex items-center" key={i}>

                                  <input
                                    type="checkbox"
                                    value={data}
                                    className="focus:ring-orange-500 h-4 w-4 text-orange-500 border-gray-300 text-xs md:text-sm"
                                    {...register('sizes', {
                                      required: {
                                        value: true,
                                        message: 'size is required'
                                      },
                                    })}
                                  />
                                  <label htmlFor="sizes" className="ml-3 block text-xs md:text-sm font-medium text-gray-700">
                                    {data}
                                  </label>
                                </div>
                              ))
                            }
                          </div>
                        </fieldset>
                        <div>
                          {errors.sizes && <span className="text-xs md:text-sm text-orange-500">seleccione al menos una talla</span>}
                        </div>
                      </div>

                      <div className="col-span-6 sm:col-span-2">
                        <div>
                          <label htmlFor="tags" className="block text-xs md:text-sm font-medium text-gray-700">
                            Tags
                          </label>
                          <input
                            className="mt-2 py-2 px-3 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm text-xs md:text-sm border border-gray-300 rounded-md p-1"
                            type={"text"}
                            value={newTagValue}
                            onChange={({ target }) => setNewTagValue(target.value)}
                            onKeyUp={({ code, key }) =>
                              code === 'Enter' ? onNewTag() : code === 'Space' ? onNewTag() : undefined
                            }

                          />
                          <p className="mt-2 text-xs md:text-sm text-gray-500 hidden lg:block mb-2">
                            Presiona [Spacio] para agregar.
                          </p>
                          <p className="mt-2 text-xs md:text-sm text-gray-500 lg:hidden mb-2">
                            Presiona [Enter] para agregar.
                          </p>

                        </div>
                        <div className="col-span-6 sm:col-span-2 border py-2 px-3 border-gray-300 rounded-md h-20 overflow-y-auto">

                          <div className="grid grid-cols-2 gap-2 "  >
                            {
                              getValues('tags').map((data, i) => (
                                <p key={i} className="flex items-center text-xs md:text-sm">{data}
                                  <FontAwesomeIcon
                                    className="text-xs md:text-sm leading-none mx-1 text-gray-600 hover:text-gray-900 rounded focus:outline-none "
                                    onClick={() => onDeleteTag(data)}
                                    icon={faCircleMinus}
                                  />
                                </p>
                              ))
                            }
                          </div>

                        </div>

                      </div>
                       */}


                    </div>
                    <div className="col-span-1 mt-3 sm:mt-0">
                      <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">Imagen</label>
                      <div className="grid grid-cols-1 gap-2">
                        <div className="flex justify-center p-4 border-2 border-gray-300 border-dashed rounded-md">
                          <div className=" text-center">
                            <svg
                              className="mx-auto h-12 w-12 text-gray-400"
                              stroke="currentColor"
                              fill="none"
                              viewBox="0 0 48 48"
                              aria-hidden="true"
                            >
                              <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <div className="flex flex-col text-xs md:text-sm text-gray-600 pt-1">
                              <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer bg-white rounded-md font-medium text-orange-500 hover:text-orange-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-orange-500 py-1"
                              >
                                <span>Cargar un archivo</span>
                                <input id="file-upload" name="file-upload" accept="image/png, image/gif, image/jpeg, image/webp" type="file" className="sr-only" onChange={onFileSelected} />
                              </label>
                              <p className="py-1">o arrastrar y soltar</p>
                            </div>
                            <p className="text-xs text-gray-500 py-1">PNG, JPG, GIF hasta 5MB</p>
                          </div>
                        </div>
                        {
                          getValues('imageSrc').length === 0 
                          ?
                          null
                          :
                          <>
                            <SortableList
                              onSortEnd={onSortEnd}
                              className="grid grid-cols-3 gap-2"
                              draggedItemClassName="dragged"
                            >
                              {getValues('imageSrc').map((item, i) => (
                                <SortableItem key={i}>
                                  <div className="grid grid-cols-1 gap-2"
                                  >
                                    <Image
                                      src={item}
                                      alt="image"
                                      height={250}
                                      width={250}
                                      layout="responsive"
                                      objectFit="contain"
                                      className="mb-10"
                                    />
                                    <Button content="eliminar" click={() => onDeleteImage(item)} />
                                  </div>
                                </SortableItem>
                              ))}
                            </SortableList>
                          </>
                        }

                       
                        {/* <DragDropContext
                            onDragEnd={(result) => console.log(result)}
                           >
                          <Droppable droppableId="image" >
                            {(droppableProvided) => (

                              <div className="grid grid-cols-2 gap-2" {...droppableProvided.droppableProps}
                                ref={droppableProvided.innerRef}
                              >
                                {
                                  getValues('imageSrc')?.map((data, i) => (
                                    <Draggable key={i} draggableId={`${i}`} index={i}>
                                      {(draggableProvider) => (

                                        <div className="relative border-2"
                                        {...droppableProvided.droppableProps}
                                        ref={droppableProvided.innerRef}
                                        {...draggableProvider.dragHandleProps}
                                        >
                                          <Image
                                            src={data}
                                            alt="image"
                                            height={200}
                                            width={200}
                                            objectFit="contain"
                                          // className="object-center object-cover"
                                          />
                                          <FontAwesomeIcon
                                            className="text-xs md:text-sm leading-none mx-1 text-gray-600 hover:text-gray-900 rounded focus:outline-none absolute bottom-1 right-1"
                                            onClick={() => onDeleteImage(data)}
                                            icon={faCircleMinus}
                                          />
                                        </div>
                                      )}
                                    </Draggable>
                                  ))
                                }
                                {droppableProvided.placeholder}
                              </div>
                            )}
                          </Droppable>
                        </DragDropContext> */}
                        <div className="flex items-center">

                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-6 col-span-1"> */}

                <div className=" bg-white text-right mt-3">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-xs md:text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                  >
                    {
                      product._id ? `Actualizar` : `Crear`
                    }
                  </button>
                </div>
                </div>
              </div>
              {/* </div> */}
            </form>
          </div>
        </div>
      </div>


    </>
  )
}


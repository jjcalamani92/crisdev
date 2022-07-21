import {
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
  Row,
  Select,
  Upload,

} from 'antd';
import { InboxOutlined, UploadOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import React, { FC, useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Main } from '../component';
import { ImageUploader } from '../ant/image';
// import { CreateProductInput } from '../../src/interfacesV2/wear';
import { UploadImage } from '../ant/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';

import { CreateProductInput } from '../../src/interfacesV2/wear';
import { ImageUploads } from '../ant/imageUpload';
import { ImageU } from '../ant/imageU';
import { useRouter } from 'next/router';
import { graphQLClient } from '../../src/swr/graphQLClient';
import { CREATE_PRODUCT, UPDATE_PRODUCT } from '../../src/graphql/mutation/wear.mutation';
import Swal from 'sweetalert2';
import { getURL } from '../../src/utils/function';
const { Option } = Select;
// export const routes = [
//   {
//     value: 'ropa',
//     label: 'Ropa',
//     description: 'description de Ropa',
//     children: [
//       {
//         value: 'ropa-de-hombre',
//         label: 'Ropa de Hombre',
//         description: 'description de Ropa',
//         children: [
//           {
//             value: 'chamarras',
//             label: 'Chamarras',
//           },
//         ],
//       },
//       {
//         value: 'ropa-de-mujer',
//         label: 'Ropa de Mujer',
//         children: [
//           {
//             value: 'chamarras',
//             label: 'Chamarras',
//           },
//         ],
//       },
//     ],
//   },
//   {
//     value: 'accesorios',
//     label: 'Accesorios',
//     children: [
//       {
//         value: 'para-de-hombre',
//         label: 'para de Hombre',
//         children: [
//           {
//             value: 'relojes-de-hombre',
//             label: 'relojes de hombre',
//             children: [
//               {
//                 value: 'relojes-de-hombre-1',
//                 label: 'relojes de hombre 1',
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },

// ];

const formItemLayout = {
  labelCol: {
    // xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    // xs: { span: 24 },
    // sm: { span: 20 },
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    // xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};

const normFile = (e: any) => {
  console.log('Upload event:', e);
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
interface Option {
  href: string;
  name: string;
  children?: Option[];
}

const filter = (inputValue: string, path: any[]) =>
  path.some(
    (option) =>
      option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
  );

interface Props {
  product: CreateProductInput
  routes: Option[]
}

export const FormProductAnt: FC<Props> = ({ product, routes }) => {
  const [form] = Form.useForm();
  const { asPath, query, replace, push } = useRouter()
  const [image, setImage] = useState<UploadFile[]>(product.imageSrc)
  const [route, setRoute] = useState()


  const onChangeRoute = (value: any, selectedOptions: any) => {
    setRoute(selectedOptions.map((data: { label: string; }) => ({ name: data.label })));
  };


  const onFinish = async (values: any) => {
    // console.log('Received values of form: ', { ...values, image });
    let data = {
      ...values, site: query.id, imageSrc: image.map(news => (
        news.response
          ?
          news.response.url
          :
          news.url
      )), specs: ["hola mundo", "w"], tags: ["a", "b", "c"]
    }

    try {
      if (product._id) {
        await graphQLClient.request(UPDATE_PRODUCT, { _id: product._id, input: data })
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Producto Actualizado',
          showConfirmButton: false,
          timer: 1500
        })
        replace(getURL(asPath))

      } else {
        await graphQLClient.request(CREATE_PRODUCT, { input: data })
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Producto Creado',
          showConfirmButton: false,
          timer: 1500
        })
        push(getURL(asPath))
      }
    } catch (error: any) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error?.response.errors[0].message,
        footer: '<a href="#">¿Por qué tengo este problema?</a>'
      })
    }

  };

  const [autoCompleteResult, setAutoCompleteResult] = useState(['']);

  const onWebsiteChange = (value: string) => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(['.com', '.org', '.net', '.app'].map((domain) => `${value}${domain}`));
    }
  };

  const websiteOptions = autoCompleteResult.map((website) => ({
    label: website,
    value: website,
  }));

  return (
    <Main>
      <Form
        // {...formItemLayoutWithOutLabel}
        // {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={product}
        scrollToFirstError
        className='p-6'
      >

        <div className=" sm:p-6 sm:shadow sm:rounded-md sm:overflow-hidden">
          <div className="grid grid-cols-12 gap-3 sm:gap-4 col-span-2">

            <Form.Item
              name="name"
              label="Nombre"
              rules={[
                {
                  required: true,
                  message: 'Please input your product name!',
                },
              ]}
              className="col-span-8"
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="mark"
              label="Marca"
              className='col-span-4'
              rules={[
                {
                  required: true,
                  message: 'Please select mark!',
                },
              ]}
            >
              <Select placeholder="select your mark">
                <Option value="male">piccoletti</Option>
                <Option value="female">makita</Option>
                <Option value="other">Other</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="route"
              label="Ruta del Producto"
              rules={[
                {
                  type: 'array',
                  required: true,
                  message: 'Please select your routes!',
                },
              ]}
              className="col-span-12"
            >
              <Cascader
                options={routes}
                onChange={onChangeRoute}
                placeholder="Selecciona la ruta"
                fieldNames={{ label: "name", value: "href", children: "children" }}
                showSearch={{
                  filter
                }}
                onSearch={(value) => console.log(value)}
                style={{ width: "100%" }}
              />
            </Form.Item>
            <Form.Item label="Precio" className='col-span-6 lg:col-span-4'>
              <Form.Item name="price" noStyle >
                <InputNumber min={1} max={10} />
              </Form.Item>
              <span className="ant-form-text"> Bs</span>
            </Form.Item>

            <Form.Item label="Precio de Descuento" className='col-span-6 lg:col-span-4'>
              <Form.Item name="discountPrice" noStyle >
                <InputNumber min={1} max={10} />
              </Form.Item>
              <span className="ant-form-text"> Bs</span>
            </Form.Item>

            <Form.Item label="Inventario" className='col-span-6 lg:col-span-4'>
              <Form.Item name="inStock" noStyle >
                <InputNumber min={1} max={10} />
              </Form.Item>
              <span className="ant-form-text"> Unidades</span>
            </Form.Item>
            <Form.Item
              name="description"
              label="Descripcion"
              className='col-span-12'
              rules={[
                {
                  required: true,
                  message: 'Please input description of product',
                },
              ]}
            >
              <Input.TextArea showCount maxLength={100} />
            </Form.Item>



            <Form.Item name="featured" label="Promociones" className='col-span-12 flex' >
              <Radio.Group className=''>
                <Radio value="a">descuentos marzo</Radio>
                <Radio value="b">descuentos abril</Radio>
                <Radio value="c">descuentos mayo</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              label="Upload"
              className='col-span-12'
              valuePropName="fileList"
              getValueFromEvent={normFile}
              style={{ width: "auto" }}
            >
              {/* <ImageUploader image={image} setImage={setImage} /> */}
              {/* <ImageUploads image={images} setImage={setImage} />
               */}
              <ImageU image={image} setImage={setImage} />
            </Form.Item>

            {/* <Form.List
              name="names"
              rules={[
                {
                  validator: async (_, names) => {
                    if (!names || names.length < 2) {
                      return Promise.reject(new Error('At least 2 passengers'));
                    }
                  },
                },
              ]}
            >
              {(fields, { add, remove }, { errors }) => (
                <>
                  {fields.map((field, index) => (
                    <Form.Item
                      {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                      label={index === 0 ? 'Detalles' : ''}
                      required={false}
                      key={field.key}
                      className='col-span-12'
                    >
                      <Form.Item
                        {...field}

                        validateTrigger={['onChange', 'onBlur']}
                        rules={[
                          {
                            required: true,
                            whitespace: true,
                            message: "Please input passenger's name or delete this field.",
                          },
                        ]}
                        noStyle
                      >
                        <Input placeholder="passenger name" style={{ width: '60%' }} />
                      </Form.Item>
                      {fields.length > 1 ? (
                        <MinusCircleOutlined
                          className="dynamic-delete-button"
                          onClick={() => remove(field.name)}
                        />
                      ) : null}
                    </Form.Item>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      className='col-span-4'

                      onClick={() => add()}
                      icon={<PlusOutlined />}

                    >
                      Agregar Detalle
                    </Button>
                    {/* <Button
                      type="dashed"
                      onClick={() => {
                        add('The head item', 0);
                      }}
                      style={{ width: '60%', marginTop: '20px' }}
                      icon={<PlusOutlined />}
                    >
                      Add field at head
                    </Button> 
                    {/* <Form.ErrorList errors={errors} /> 
                  </Form.Item>
                </>
              )}
            </Form.List> */}

            {/* <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item> */}
          </div>
          <Form.Item >
            <Button type="primary" htmlType="submit">
              {
                product._id ? `Actualizar` : `Crear`
              }
            </Button>
          </Form.Item>
        </div>
      </Form>
    </Main>
  );
};

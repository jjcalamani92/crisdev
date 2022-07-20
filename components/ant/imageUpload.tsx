import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import React, { FC, SetStateAction, useEffect, useState } from 'react';

export interface UploadFileI<T = any> {
  uid: string;
  size?: number;
  name: string;
  fileName?: string;
  lastModified?: number;
  lastModifiedDate?: Date;
  url?: string;
  percent?: number;
  thumbUrl?: string;
  crossOrigin?: React.ImgHTMLAttributes<HTMLImageElement>['crossOrigin'];
  originFileObj?: RcFile;
  response?: T;
  error?: any;
  linkProps?: any;
  type?: string;
  xhr?: T;
  preview?: string;
}

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });

  interface Props {
    image: UploadFile[]
    setImage: any
  }


export const ImageUploader:FC<Props> = ({setImage, image}) => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>(image);
  // useEffect(() => {
  //   setFileList(image)
  // }, [])
  console.log(previewTitle);
  console.log(fileList);
  
  // const url = fileList.map(news => ({url: news.response?.url}));
  // console.log(url);

  
  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewVisible(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };
  
  function generarResponse({ response }:any) {
    return response;
  }
  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {

    setFileList(newFileList);
    setImage(newFileList.map(news => ({
      name: "dfg",
      uid:"123",
      url: news.response?.url
    })))
    // console.log();
  }


  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <>
      <Upload
        action={`${process.env.APIUP_URL}/api/upload/image`}
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      {/* <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal> */}
    </>
  );
};



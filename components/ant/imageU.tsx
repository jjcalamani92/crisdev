import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import React, { FC, useState } from 'react';

interface Props {
  image: UploadFile[]
  setImage: any
}

export const ImageU:FC<Props> = ({image, setImage}) => {
  // console.log('fileList form', image);
  const [fileList, setFileList] = useState<UploadFile[]>(image);
  
  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    setImage(newFileList)
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  return (
    <ImgCrop rotate>
      <Upload
        action={`${process.env.APIUP_URL}/api/upload/image`}
        listType="picture-card"
        fileList={fileList}
        onChange={onChange}
        onPreview={onPreview}
      >
        {fileList?.length < 5 && '+ Upload'}
      </Upload>
    </ImgCrop>
  );
};

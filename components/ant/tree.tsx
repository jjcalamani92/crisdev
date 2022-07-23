import { CarryOutOutlined, FormOutlined } from '@ant-design/icons';
import { Switch, Tree } from 'antd';
import type { DataNode } from 'antd/es/tree';
import React, { FC, useState } from 'react';

const treeData: DataNode[] = [
  {
    title: 'parent 1',
    key: '0-0',
    icon: <CarryOutOutlined />,
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
        icon: <CarryOutOutlined />,
        children: [
          { title: 'leaf', key: '0-0-0-0', icon: <CarryOutOutlined /> },
          {
            title: (
              <>
                <div>multiple line title</div>
                <div>multiple line title</div>
              </>
            ),
            key: '0-0-0-1',
            icon: <CarryOutOutlined />,
          },
          { title: 'leaf', key: '0-0-0-2', icon: <CarryOutOutlined /> },
        ],
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        icon: <CarryOutOutlined />,
        children: [{ title: 'leaf', key: '0-0-1-0', icon: <CarryOutOutlined /> }],
      },
      {
        title: 'parent 1-2',
        key: '0-0-2',
        icon: <CarryOutOutlined />,
        children: [
          { title: 'leaf', key: '0-0-2-0', icon: <CarryOutOutlined /> },
          {
            title: 'leaf',
            key: '0-0-2-1',
            icon: <CarryOutOutlined />,
            switcherIcon: <FormOutlined />,
          },
        ],
      },
    ],
  },
  {
    title: 'home',
    key: '0-1',
    icon: <CarryOutOutlined />,
    children: [
      {
        title: 'parent 2-0',
        key: '0-1-0',
        icon: <CarryOutOutlined />,
        children: [
          { title: 'leaf', key: '0-1-0-0', icon: <CarryOutOutlined /> },
          { title: 'leaf', key: '0-1-0-1', icon: <CarryOutOutlined /> },
        ],
      },
    ],
  },
];
const treeData2: DataNode[] = [
  
  {
    title: 'home',
    key: '0-0',
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
        children: [
          { title: 'leaf', key: '0-0-0-0',  },
          {
            title: 'leafs',
            key: '0-0-0-1',
          },
          { title: 'leaf', key: '0-0-0-2',  },
        ],
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        children: [{ title: 'leaf', key: '0-0-1-0', }],
      },
      {
        title: 'parent 1-2',
        key: '0-0-2',
        children: [
          { title: 'leaf', key: '0-0-2-0',  },
          {
            title: 'leaf',
            key: '0-0-2-1',
          },
        ],
      },
    ],
  },
  {
    title: 'parent 2',
    key: 'parent-1',
    children: [
      {
        title: 'parent 2-0',
        key: '0-1-0',
        children: [
          { title: 'leaf', key: '0-1-0-0', },
          { title: 'leaf', key: '0-1-0-1', },
        ],
      },
    ],
  },
];
interface Props {
  tree: any
}
export const TreeAnt:FC<Props> = ({tree}) => {
  console.log(tree);
  
  const [showLine, setShowLine] = useState<boolean | { showLeafIcon: boolean }>(true);
  const [showIcon, setShowIcon] = useState<boolean>(false);
  const [showLeafIcon, setShowLeafIcon] = useState<boolean>(true);

  const onSelect = (selectedKeys: React.Key[], info: any) => {
    console.log('selected', selectedKeys, info);
  };
  // const onSelect = (selectedKeys: React.Key[], info: any) => {
  //   console.log('selected', selectedKeys, info);
  // };

  const onSetLeafIcon = (checked: boolean) => {
    setShowLeafIcon(checked);
    setShowLine({ showLeafIcon: checked });
  };

  const onSetShowLine = (checked: boolean) => {
    setShowLine(checked ? { showLeafIcon } : false);
  };

  return (
    <div>
      {/* <div style={{ marginBottom: 16 }}>
        showLine: <Switch checked={!!showLine} onChange={onSetShowLine} />
        <br />
        <br />
        showIcon: <Switch checked={showIcon} onChange={setShowIcon} />
        <br />
        <br />
        showLeafIcon: <Switch checked={showLeafIcon} onChange={onSetLeafIcon} />
      </div> */}
      <Tree
        showLine={showLine}
        showIcon={showIcon}
        defaultExpandedKeys={['0-0-0']}
        onSelect={onSelect}
        treeData={tree}
      />
    </div>
  );
};
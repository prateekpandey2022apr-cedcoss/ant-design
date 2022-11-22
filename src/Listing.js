import React, { useState, useEffect } from "react";
import { Divider, Radio, Table } from "antd";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Username",
    dataIndex: "username",
  },
  {
    title: "Website",
    dataIndex: "website",
  },
  {
    title: "Action",
    dataIndex: "delete",
    key: "x",
    render: () => <a>Delete</a>,
  },
];

const data = [
  {
    key: 1,
    name: "John Brown sr.",
    age: 60,
    address: "New York No. 1 Lake Park",
    children: [
      {
        key: 11,
        name: "John Brown",
        age: 42,
        address: "New York No. 2 Lake Park",
      },
      {
        key: 12,
        name: "John Brown jr.",
        age: 30,
        address: "New York No. 3 Lake Park",
        children: [
          {
            key: 121,
            name: "Jimmy Brown",
            age: 16,
            address: "New York No. 3 Lake Park",
          },
        ],
      },
      {
        key: 13,
        name: "Jim Green sr.",
        age: 72,
        address: "London No. 1 Lake Park",
        children: [
          {
            key: 131,
            name: "Jim Green",
            age: 42,
            address: "London No. 2 Lake Park",
            children: [
              {
                key: 1311,
                name: "Jim Green jr.",
                age: 25,
                address: "London No. 3 Lake Park",
              },
              {
                key: 1312,
                name: "Jimmy Green sr.",
                age: 18,
                address: "London No. 4 Lake Park",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    key: 2,
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
  },
];

const Listing = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [posts, setPosts] = useState();

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        // debugger;
        // setPosts([...response.slice(0, 5)]);
        setPosts(
          [...response.slice(0, 5)].map((post) => {
            return { key: post.id, ...post };
          })
        );
      });
  }, []);

  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      debugger;
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
  };

  const [selectionType, setSelectionType] = useState("checkbox");
  return (
    <div>
      {/* <Radio.Group
        onChange={({ target: { value } }) => {
          setSelectionType(value);
        }}
        value={selectionType}
      >
        <Radio value="checkbox">Checkbox</Radio>
        <Radio value="radio">radio</Radio>
      </Radio.Group> */}

      <Divider />

      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              console.log(record);
              // debugger;
              if (event.target.tagName === "A") {
                setPosts(posts.filter((post) => post.id !== record.id));
              }
            }, // click row
            onDoubleClick: (event) => {}, // double click row
            onContextMenu: (event) => {}, // right button click row
            onMouseEnter: (event) => {}, // mouse enter row
            onMouseLeave: (event) => {}, // mouse leave row
          };
        }}
        expandable={{
          expandedRowRender: (record) => (
            <p
              style={{
                margin: 0,
              }}
            >
              {Object.values(record.address)
                .join(" ")
                .replace("[object Object]", "")}
            </p>
          ),
          rowExpandable: (record) => record.website !== "hildegard.org",
        }}
        dataSource={posts}
      />
    </div>
  );
};
export default Listing;

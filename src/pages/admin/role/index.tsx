import React, { useEffect, useMemo, useState } from 'react';
import {
  Layout,
  Table,
  message,
  Input,
  Button,
  Row,
  Col,
  Form,
  InputNumber,
  Popconfirm,
  Spin,
} from 'antd';
import { withApollo } from 'src/helper/apollo';
import { useQuery, useMutation } from '@apollo/client';
import Loading from 'src/components/Loading/Loading';
import { EditOutlined, SaveOutlined } from '@ant-design/icons';
import {
  AdminLogo as Logo,
  MainMenu,
  DashboardHeader as Header,
  FormModal,
} from 'src/components/Admin';
import { Box } from 'theme-ui';
import { ROLE_LIST } from 'src/graphql/query/role.query';
import { UPDATE_ROLE } from 'src/graphql/mutation/role.mutation';

const { Sider, Content } = Layout;
const { Search } = Input;

export interface RegisterType {
  email: string;
  username: string;
  password: string;
}

interface Item {
  id: string;
  name: string;
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'number' | 'text';
  record: Item;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const defaultFields = [
  {
    type: 'text',
    name: 'name',
    label: 'Name',
    required: [{ required: true, message: 'Name is required.' }],
  },
  {
    type: 'checkbox',
    name: 'permission',
    label: 'Permision',
    required: [{ required: true, message: 'Permision is required.' }],
  },
];

const Role = () => {
  const { loading, error, data, refetch } = useQuery(ROLE_LIST);
  const [UseUpdateRole, { loading: mutationLoading, error: mutationError }] = useMutation(
    UPDATE_ROLE
  );
  const [form] = Form.useForm();
  const [collapsed, setCollapsed] = useState(false);
  const [addRole, setAddRole] = useState(false);
  const [dataSource, setDataSource] = useState<any[]>([]);
  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record: Item) => record.id === editingKey;

  const edit = (record: Item) => {
    form.setFieldsValue({ name: record.name });
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey('');
  };
  const save = async (id: React.Key) => {
    try {
      const row = (await form.validateFields()) as Item;

      const newData = [...dataSource];
      const currentRow = newData.find((item) => id === item.id);
      if (currentRow.name !== row.name) {
        handleUpdateRole({
          id: Number(id),
          name: row.name,
        });
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };
  const onSearch = (v: string) => {
    let result: any[] = [];
    result = data.roleList.filter((role: any) => role.name.includes(v));
    setDataSource(result);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: '25%',
    },
    {
      title: 'Role name',
      dataIndex: 'name',
      width: '25%',
      editable: true,
    },
    {
      title: 'Operation',
      dataIndex: 'operation',
      render: (_: any, record: Item) => {
        const editable = isEditing(record);
        return editable ? (
          <>
            <Popconfirm title="Sure to save?" onConfirm={() => save(record.id)}>
              <Button type="primary" icon={<SaveOutlined />} style={{ marginRight: 10 }}>
                Save
              </Button>
            </Popconfirm>
            <Button onClick={() => cancel()} type="default">
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={() => edit(record)}
              type="primary"
              icon={<EditOutlined />}
              disabled={!!editingKey}
              style={{ marginRight: 10 }}
            >
              Edit
            </Button>
          </>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: col.dataIndex === 'name' ? 'text' : 'number',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  const handleUpdateRole = async (payload: { id: number; name: string }) => {
    const res = await UseUpdateRole({
      variables: {
        id: payload.id,
        name: payload.name,
      },
    });
    if (res.data.updateRole.role) {
      message.success('Role changed!');
    }
  };

  // const onAddRole = () => setAddRole(true);

  useMemo(() => data && data.updateRole && refetch(), [data, refetch]);

  useEffect(() => {
    data && data.roleList && setDataSource(data.roleList);
  }, [data]);

  if (error) {
    message.error(error.message);
  }

  if (mutationError) {
    message.error(mutationError.message);
  }

  return (
    <Layout style={{ height: '100%' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        {/* Logo comp */}
        <Logo />
        {/* Menu comp */}
        <MainMenu pageId={3} />
      </Sider>
      <Layout>
        <FormModal fields={defaultFields} visible={addRole} onCancel={() => setAddRole(!addRole)} />
        <Header setCollapsed={() => setCollapsed(!collapsed)} collapsed={collapsed} />
        <Content>
          <Box
            sx={{
              padding: '20px',
            }}
          >
            <Box
              sx={{
                marginBottom: 20,
              }}
            >
              <Row>
                <Col span={12}>
                  <Search
                    placeholder="Search by Role name"
                    onSearch={onSearch}
                    onChange={(v) => onSearch(v.target.value)}
                    enterButton
                  />
                </Col>
              </Row>
            </Box>
            {loading ? (
              <Loading text="Loading..." />
            ) : (
              <Spin spinning={mutationLoading}>
                <Form form={form} component={false}>
                  <Table
                    components={{
                      body: {
                        cell: EditableCell,
                      },
                    }}
                    bordered
                    dataSource={dataSource}
                    columns={mergedColumns}
                    rowClassName="editable-row"
                    pagination={{
                      onChange: cancel,
                    }}
                  />
                </Form>
              </Spin>
            )}
          </Box>
        </Content>
      </Layout>
    </Layout>
  );
};

export default withApollo(Role);

import React, { Component } from 'react';
import { getUserList, updateUser, deleteUser } from '@/api/user';
import { Table, Divider, Tag, Modal, Form, Input, Select, message, Popconfirm } from 'antd';

@Form.create({
    name: 'editForm', mapPropsToFields(props) {
        return {
            username: Form.createFormField({
                ...props.username,
                value: '',
            }),
            password: Form.createFormField({
                ...props.password,
                value: '',
            }),
            type: Form.createFormField({
                ...props.type,
                value: null,
            }),
            uid: Form.createFormField({
                ...props.uid,
                value: null,
            }),
        };
    },
})
class Show extends Component {
    state = {
        userList: [],
        selectedRowKeys: [],
        visible: false,
        modelData: {},
        columns: [
            {
                title: '用户名',
                dataIndex: 'username',
                key: 'username',
            },
            {
                title: '密码',
                dataIndex: 'password',
                key: 'password',
            },
            {
                title: '身份',
                key: 'type',
                dataIndex: 'type',
                render: type => {
                    let color = type === '0' ? 'geekblue' : 'green';
                    return <span>
                        <Tag color={color} key={type}>
                            {type === '0' ? "游客" : "管理员"}
                        </Tag>
                    </span>
                },
            },
            {
                title: '操作',
                key: 'action',
                render: (context) => {
                    return <span>
                        <span onClick={() => {
                            this.updateHandler(context);
                        }}>更新</span>
                        <Divider type="vertical" />
                        <Popconfirm
                            title="你确定要删除这条记录吗？"
                            okText="删除"
                            cancelText="放弃"
                            onConfirm={() => this.deleteHandler(context.uid)}
                            onCancel={this.cancel}>
                            <span>删除</span>
                        </Popconfirm>
                    </span>
                }
            },
        ]
    };
    componentDidMount() {
        this.getUserList()
    };
    render() {
        const { userList, columns } = this.state;
        const { getFieldDecorator } = this.props.form;
        return <div>
            <Table columns={columns} dataSource={userList} key={'userList'} />
            <Modal title="更新用户" visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel}>
                <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
                    <Form.Item label="用户ID" class="hide">
                        {getFieldDecorator('uid')(<Input disabled />)}
                    </Form.Item>
                    <Form.Item label="用户名">
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="密码">
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your password!' }],
                        })(<Input />)}
                    </Form.Item>

                    <Form.Item label="身份">
                        {
                            getFieldDecorator('type', {
                                rules: [{ required: true, message: 'Please select you account!' }],
                            })(<Select>
                                <Select.Option value="0">游客</Select.Option>
                                <Select.Option value="1">管理员</Select.Option>
                            </Select>)
                        }
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    };

    /**
     * table组件渲染数据
     * @param {Array} datasource 
     */
    formatData(datasource) {
        const temp = [];
        datasource.forEach((itm, ind) => {
            temp.push({
                key: itm.uid,
                ...itm
            })
        })
        this.setState({
            userList: temp
        })
    };
    // 获取用户列表
    async getUserList() {
        const result = await getUserList();
        this.formatData(result.data.result);

    };
    //点击更新的回调函数
    updateHandler(rowData) {
        this.setState({
            modelData: rowData
        }, (state) => {
            const { username, password, type, uid } = this.state.modelData;
            this.showModal();
            this.props.form.setFieldsValue({
                username,
                password,
                type,
                uid
            });
        })
    };
    //确认删除的回调
    deleteHandler(context) {
        deleteUser(context).then(res => {
            if (res.data.code === 1) {
                this.getUserList();
            }
        })
    };
    //显示对话框
    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    //添加用户对话框，点击确认的回调函数
    handleOk = e => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                updateUser(values).then(res => {
                    message.success(res.data.msg)
                    this.getUserList()
                })
            }
        });
        this.setState({
            visible: false,
        });
    };
    //添加用户对话框，点击取消的回调函数
    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };
}
export default Show;
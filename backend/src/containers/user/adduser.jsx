import React, { Component } from 'react';
import { addUser } from '@/api/user';
import { Form, Input, Select, Button } from 'antd';

@Form.create({
    name: 'AddUserFrom', mapPropsToFields(props) {
        return {
            username: Form.createFormField({
                ...props.username,
                value: 'zhangsan',
            }),
            password: Form.createFormField({
                ...props.password,
                value: '123321',
            }),
            type: Form.createFormField({
                ...props.type,
                value: 0,
            }),
        };
    },
})
class AddUser extends Component {
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} onSubmit={this.handleSubmit}>
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
                <Form.Item>
                    <Button type="primary" htmlType="submit">Register</Button>
                </Form.Item>
            </Form>
        )
    };
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                addUser(values).then(res => {
                    console.log(res)
                })
            }
        });
    };
}


export default AddUser;
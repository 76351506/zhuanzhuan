import { connect } from 'dva';
import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';
import 'antd/dist/antd.css';

const mapState2Props = (state) => {
    return state.login
}
@connect(mapState2Props)
@Form.create({
    name: 'loginFrom', mapPropsToFields(props) {
        return {
            username: Form.createFormField({
                ...props.username,
                value: 'haonan',
            }),
            password: Form.createFormField({
                ...props.password,
                value: '123321',
            }),
        };
    },
})
class Login extends Component {
    render() {
        const { getFieldDecorator } = this.props.form;
        return <div>
            <h1>{this.props.token}我是标题</h1>
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
                <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
      </Button>
                </Form.Item>
            </Form>
        </div>
    };
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.dispatch({
                    type: 'login/login',
                    payload: values
                })
                this.props.history.push('/home')
            }
        });
    };
}


export default Login;
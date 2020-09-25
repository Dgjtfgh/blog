import React, { useState, useEffect } from 'react';


import { Form, Input, Button, message } from 'antd';
import axios from 'axios';
import servicePath from '../config/ApiUrl';

// const { Option } = Select;
const { TextArea } = Input;

function ChangeInfo(props) {
    const [portrait, setPortrait] = useState('') 
    const [username, setUsername] = useState('')   
    const [pass, setPassword] = useState('') 
    const [QQ, setQQ] = useState('') 
    const [githubUrl, setGithubUrl] = useState('') 
    const [introduce, setIntroduce] = useState('')
    const id = localStorage.getItem('userId');
    useEffect(() => {
        getUserInfo();
    }, [])

    const changePortrait = (e) => {
        setPortrait(e.target.value)
    }
    const changeUserName = (e) => {
        setUsername(e.target.value)
    }
    const changePassword = (e) => {
        setPassword(e.target.value)
    }
    const changeQQ = (e) => {
        setQQ(e.target.value)
    }
    const changeGithubUrl = (e) => {
        setGithubUrl(e.target.value)
    }
    const changeIntriduce = (e) => {
        setIntroduce(e.target.value)
    }

    const getUserInfo = () => {
        axios({
            method: 'GET',
            url: servicePath.getUserInfo + id,
            withCredentials: true,
        })
            .then(
                res => {
                    console.log(res.data)
                    if (res.data.data === '没有登录') {
                        localStorage.removeItem('userId');
                        props.history.push('/');
                    } else {
                        // console.log(res.data);
                        setPortrait(res.data.data[0].portrait);
                        setUsername(res.data.data[0].userName);
                        setPassword(res.data.data[0].password);
                        setQQ(res.data.data[0].qq);
                        setGithubUrl(res.data.data[0].githubUrl);
                        setIntroduce(res.data.data[0].introduce);
                    }
                }
            )
    }


    const saveUserInfo = () => {
        let dataProps = {};   //传递到接口的参数
        dataProps.id = id;
        dataProps.portrait = portrait;
        dataProps.userName = username;
        dataProps.password = pass;
        dataProps.qq = QQ;
        dataProps.githubUrl = githubUrl;
        dataProps.introduce = introduce;
        axios({
            method: 'POST',
            url: servicePath.changeUserInfo,
            data: dataProps,
            withCredentials: true
        }).then(
            res => {
                console.log(res.data)
                if (res.data.isScuccess) {
                     message.success('信息保存成功');
                } else {
                    message.error('信息保存失败');
                }
            }
        )
    }

    return (
        <div>
            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
            >
                <Form.Item label="头像">
                    <Input value={portrait} onChange={changePortrait}/>
                </Form.Item>
                <Form.Item label="用户名">
                    <Input value={username} onChange={changeUserName}/>
                </Form.Item>
                <Form.Item label="密码">
                    <Input.Password 
                            value={pass}
                            onChange={changePassword} 
                        />
                </Form.Item>
                <Form.Item label="QQ">
                    <Input value={QQ} onChange={changeQQ}/>
                </Form.Item>
                <Form.Item label="Github">
                    <Input value={githubUrl} onChange={changeGithubUrl}/>
                </Form.Item>
                <Form.Item label="介绍">
                    <TextArea 
                        rows={35}
                        onChange={changeIntriduce}
                        placeholder="介绍" 
                        value={introduce}
                        autoSize={{minRows: 4}}
                    />
                </Form.Item>
                <Form.Item style={{textAlign: 'right'}}>
                    <Button style={{width: "50%"}} type="primary"  onClick={() => saveUserInfo()}>提交</Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default ChangeInfo;
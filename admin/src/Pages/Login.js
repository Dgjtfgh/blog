import React , {useState} from 'react';
import 'antd/dist/antd.css';
import { Card,Input,Button,Spin,message} from 'antd';
import axios from 'axios';
import '../static/style/Login.css';
import servicePath from '../config/ApiUrl';

function Login(props){
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const checkLogin = () => {
        setIsLoading(true);
        if (!userName) {
            message.error('用户名不能为空!');
            setTimeout(()=>{
                setIsLoading(false)
            },500)
            return false;
        } else if (!password) {
            message.error('密码不能为空!');
            setTimeout(()=>{
                setIsLoading(false)
            },500)
            return false;
        }
        let dataProps = {
            'userName': userName,
            'password': password
        }
        axios({
            method: 'POST',
            url:servicePath.checkLogin,
            data: dataProps,
            withCredentials: true
        }).then(
            res => {
                // setIsLoading(false);
                if (res.data.data === '登录成功') {
                    // localStorage.setItem('openId',res.data.openId);
                    localStorage.setItem('userId',res.data.id.id);
                    props.history.push('/index');
                } else {
                    message.error('用户名密码错误!');
                    setTimeout(()=>{
                        setIsLoading(false)
                    },500)
                }
            }
        )
    }
    return (
        <div className="login-div">
           <Spin tip="Loading..." spinning={isLoading}>
                <Card title="Dgjtfgh Blog" bordered={true} style={{width:400}}>
                    <Input 
                        id="userName" 
                        size="large" 
                        placeholder="Enter your userName" 
                        // prefix={} 
                        onChange={(e)=>{setUserName(e.target.value)}}
                    />
                    <br/><br/>
                    <Input.Password 
                        id="password" 
                        size="large" 
                        placeholder="Enter your password" 
                        // prefix={} 
                        onChange={(e)=>{setPassword(e.target.value)}}
                    />
                    <br/><br/>
                    <Button type="primary" size="large" block onClick={checkLogin} >Login in</Button>
                </Card>   
            </Spin> 
        </div>
    )
}
export default Login
import React, { useState, useEffect } from 'react'
import '../static/style/components/header.css'
import { Row, Col, Menu } from 'antd'
import { HomeOutlined, VideoCameraOutlined } from '@ant-design/icons'
import axios from 'axios'
import servicePath  from '../config/apiUrl'
import Router from 'next/router'
const Header = () => {
    const [navArray, setNavArray] = useState([]);
    const [username, setUsername] = useState('');
    useEffect(() => {
        getUserInfo();
        const fetchData = async () => {
            const result = await axios(servicePath.getTypeInfo).then(
                (res) => {
                    // console.log(res.data)
                    return res.data.data;
                }
            )
            setNavArray(result);
        }
        fetchData();
    }, [])
    const getUserInfo = () => {
        axios(servicePath.getUserInfo).then(
             res => {
                // console.log(res.data)
                setUsername(res.data.data[0].userName);
            }
        )
    }
    const handleClick = (e) => {
        if (e.key == 0){
            Router.push('/')
        } else {
            Router.push('/list?id='+e.key)
        }
    }

    return (
        <div className="header">
            <Row type="flex" justify="center">
                <Col xs={24} sm={24} md={10} lg={15} xl={12}>
                    <span className="header-logo">{username}</span>
                    <span className="header-txt">前端开发学习分享</span>
                </Col>
                <Col xs={0} sm={0} md={14} lg={8} xl={6}>
                    <Menu mode="horizontal" onClick={handleClick}>
                        <Menu.Item key="0">
                            <HomeOutlined />首页
                        </Menu.Item>
                        {
                            navArray.map((item) => {
                                return (
                                    <Menu.Item key={item.id}>
                                    {/* <VideoCameraOutlined />  */}
                                        {item.typeName}
                                    </Menu.Item>
                                )
                            })
                        }
                    </Menu>
                </Col>
            </Row>
        </div>
    )
    
}

export default Header
import React, { useState, useEffect } from 'react';
import '../static/style/ArticleList.css';
import { List, Row, Col, Modal, message, Button } from 'antd';
import axios from 'axios';
import servicePath from '../config/ApiUrl';

const { confirm } = Modal;

function ArticleList(props) {
    const [list, setList] = useState([])
    useEffect(() => {
        getList();
    }, [])
    const getList = () => {
        axios({
            method: 'GET',
            url: servicePath.getArticleList,
            withCredentials: true,
        }).then(
            res => {
                console.log(res.data);
                if (res.data.data === '没有登录') {
                    localStorage.removeItem('userId');
                    props.history.push('/');
                } else {
                    setList(res.data.list);
                }
            }
        )
    }

    const updateArticle = (id,checked)=>{
        props.history.push('/index/add/'+id);
    }

    const delArticle = (id) => {
        console.log(id);
        confirm({
            title: '确定要删除这篇博客文章吗?',
            content: '如果你点击OK按钮，文章将会永远被删除，无法恢复。',
            onOk() {
                axios(servicePath.delArticle + id, { withCredentials: true }).then(
                    res => {
                        message.success('文章删除成功');
                        getList();
                    }
                )
            },
            onCancel() {
                message.success('没有任何改变');
            },
        });
    }

    return (
        <div>
            <List
                header={
                    <Row className="list-div">
                        <Col span={8}>
                            <b>标题</b>
                        </Col>
                        <Col span={4}>
                            <b>类别</b>
                        </Col>
                        <Col span={4}>
                            <b>发布时间</b>
                        </Col>
                        <Col span={4}>
                            <b>浏览量</b>
                        </Col>

                        <Col span={4}>
                            <b>操作</b>
                        </Col>
                    </Row>
                }
                bordered
                dataSource={list}
                renderItem={item => (
                    <List.Item>
                        <Row className="list-div">
                            <Col span={8}>
                                {item.title}
                            </Col>
                            <Col span={4}>
                                {item.typeName}
                            </Col>
                            <Col span={4}>
                                {item.addTime}
                            </Col>
                            <Col span={4}>
                                {item.view_count}
                            </Col>
                            <Col span={4}>
                                <Button type="primary" size="middle" onClick={() => {updateArticle(item.id)}}>修改</Button>
                                <Button size="middle" style={{marginLeft: '2px'}} onClick={() => {delArticle(item.id)}} >删除 </Button>
                            </Col>
                        </Row>
                    </List.Item>
                )}
            />
        </div>
    )

}

export default ArticleList
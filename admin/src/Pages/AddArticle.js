import React, { useState, useEffect } from 'react';
import marked from 'marked';
import '../static/style/AddArticle.css';
import { Row, Col, Input, Select, Button, DatePicker, message } from 'antd';
import axios from 'axios';
import servicePath from '../config/ApiUrl';

const { Option } = Select;
const { TextArea } = Input;

function AddArticle(props) {
    const [articleId, setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
    const [articleTitle, setArticleTitle] = useState('')   //文章标题
    const [articleContent, setArticleContent] = useState('')  //markdown的编辑内容
    const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
    const [introducemd, setIntroducemd] = useState()            //简介的markdown内容
    const [introducehtml, setIntroducehtml] = useState('等待编辑') //简介的html内容
    const [showDate, setShowDate] = useState()   //发布日期
    const [updateDate, setUpdateDate] = useState() //修改日志的日期
    const [typeInfo, setTypeInfo] = useState([]) // 文章类别信息
    const [selectedType, setSelectType] = useState('选择类别') //选择的文章类别

    useEffect(() => {
        getTypeInfo();
        //获得文章ID
        let tmpId = props.match.params.id;
        if (tmpId) {
            setArticleId(tmpId);
            getArticleById(tmpId);
        }
    }, [])

    marked.setOptions({
        renderer: marked.Renderer(),
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartLists: true,
        smartypants: false,
    });

    const changeContent = (e) => {
        setArticleContent(e.target.value)
        let html = marked(e.target.value)
        setMarkdownContent(html)
    }

    const changeIntroduce = (e) => {
        setIntroducemd(e.target.value)
        let html = marked(e.target.value)
        setIntroducehtml(html)
    }

    const getTypeInfo = () => {
        axios({
            method: 'GET',
            url: servicePath.getTypeInfo,
            withCredentials: true,
        })
            .then(
                res => {
                    if (res.data.data == '没有登录') {
                        localStorage.removeItem('openId');
                        console.log(res.data.data);
                        props.history.push('/');
                    } else {
                        // console.log(res.data.data, '++++');
                        setTypeInfo(res.data.data);
                    }
                }
            )
    }

    const selectedTypeHandler = (value) => {
        setSelectType(value);
    }

    const saveArticle = () => {
        if (!selectedType) {
            message.error('必须选择文章类别');
            return false;
        } else if (!articleTitle) {
            message.error('文章名称不能为空');
            return false;
        } else if (!articleContent) {
            message.error('文章内容不能为空');
            return false;
        } else if (!introducemd) {
            message.error('简介不能为空');
            return false;
        } else if (!showDate) {
            message.error('发布日期不能为空');
            return false;
        }
        // message.success('检验通过');

        let dataProps = {};   //传递到接口的参数
        dataProps.type_id = selectedType;
        dataProps.title = articleTitle;
        dataProps.article_content = articleContent;
        dataProps.introduce = introducemd;
        let datetext = showDate.replace('-', '/'); //把字符串转换成时间戳
        dataProps.addTime = (new Date(datetext).getTime()) / 1000;

        if (articleId == 0) {
            // console.log('articleId=:' + articleId)
            dataProps.view_count = Math.ceil(Math.random() * 100) + 1000
            axios({
                method: 'POST',
                url: servicePath.addArticle,
                data: dataProps,
                withCredentials: true
            }).then(
                res => {
                    setArticleId(res.data.insertId)
                    if (res.data.isScuccess) {
                        message.success('文章保存成功')
                    } else {
                        message.error('文章保存失败');
                    }

                }
            )
        } else {
            console.log('articleId=:' + articleId);
            dataProps.id = articleId
            axios({
                method: 'POST',
                url: servicePath.updateArticle,
                header: { 'Access-Control-Allow-Origin': '*' },
                data: dataProps,
                withCredentials: true
            }).then(
                res => {
                    if (res.data.isScuccess) {
                        message.success('文章保存成功')
                    } else {
                        message.error('保存失败');
                    }
                }
            )
        }
    }

    const getArticleById = (id) => {
        axios(servicePath.getArticleById + id, {
            withCredentials: true,
            header: { 'Access-Control-Allow-Origin': '*' },
        }).then(
            res => {
                console.log(res.data.data[0]);
                setArticleTitle(res.data.data[0].title);
                setArticleContent(res.data.data[0].article_content);
                let html = marked(res.data.data[0].article_content);
                setMarkdownContent(html);
                setIntroducemd(res.data.data[0].introduce);
                let tmpInt = marked(res.data.data[0].introduce);
                setIntroducehtml(tmpInt);
                setShowDate(res.data.data[0].addTime);
                setSelectType(res.data.data[0].typeId);
            }
        )
    }

    return (
        <div>
            <Row gutter={5}>
                <Col span={18}>
                    <Row gutter={10}>
                        <Col span={20}>
                            <Input
                                placeholder="文章标题"
                                size="middle"
                                value={articleTitle}
                                onChange={(e) => { setArticleTitle(e.target.value) }}
                            />
                        </Col>
                        <Col span={4}>
                            <Select defaultValue={selectedType} size="middle" onChange={selectedTypeHandler}>
                                {
                                    typeInfo.map((item, index) => {
                                        return (<Option key={index} value={item.id}>{item.typeName}</Option>)
                                    })
                                }
                            </Select>
                        </Col>
                    </Row>
                    <br />
                    <Row gutter={10}>
                        <Col span={12}>
                            <TextArea
                                className="markdown-content"
                                rows={35}
                                onChange={changeContent}
                                placeholder="文章内容" 
                                value={articleContent}
                            />

                        </Col>
                        <Col span={12}>
                            <div
                                className="show-html"
                                dangerouslySetInnerHTML={{ __html: markdownContent }} >
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col span={6}>
                    <Row>
                        <Col span={24}>
                            <Button size="middle ">暂存文章</Button>
                            <Button type="primary" size="middle" onClick={saveArticle} >发布文章</Button>
                        </Col>
                        <Col span={24}>
                            <TextArea
                                rows={4}
                                onChange={changeIntroduce}
                                placeholder="文章简介"
                                value={introducemd}
                            ></TextArea>
                            <div
                                className="introduce-html"
                                dangerouslySetInnerHTML={{ __html: '文章简介：' + introducehtml }} >
                            </div>
                        </Col>
                        <Col span={12}>
                            <div className="date-select"></div>
                            <DatePicker
                                placeholder="发布日期"
                                size="middle"
                                onChange={(date, dateString) => { setShowDate(dateString) }}
                            ></DatePicker>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default AddArticle;
import React, { useState } from 'react'
import Head from 'next/head'
import { Row, Col, List } from 'antd'
import Header from '../components/Header'
import Author from '../components/Author'
// import Advert from '../components/Advert'
import Footer from '../components/Footer'
import '../static/style/pages/comm.css'
import '../static/style/pages/index.css'
import axios from 'axios'
import Link from 'next/link'
import servicePath  from '../config/apiUrl'
import marked from 'marked'
import hljs from 'highlight.js'

export default function Home(list) {
    const [mylist, setMylist] = useState(list.data);
    const renderer = new marked.Renderer();
    marked.setOptions({
        renderer: renderer,
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartLists: true,
        highlight: function (code) {
            return hljs.highlightAuto(code).value
        }
    })
    return (
        <div className="container" >
            <Head>
                <title> Home </title>
            </Head> 
            <Header />
            <Row className="comm-main"
                type="flex"
                justify="center" >
                <Col className="comm-left"
                    xs={24}
                    sm={24}
                    md={16}
                    lg={18}
                    xl={14} >
                    <List header={<div> 最新日志 </div>}
                        itemLayout="vertical"
                        dataSource={mylist}
                        renderItem={
                            item => (
                                <List.Item>
                                    <div className="list-title" >
                                        <Link href={{ pathname: '/detailed',query:{id:item.id}}}>
                                            <a>{item.title}</a>
                                        </Link>
                                    </div>
                                    <div className="list-icon">
                                        <span ><img src="../static/images/calendar.png" ></img>{item.addTime}</span>
                                        <span ><img src="../static/images/type.png" ></img> {item.typeName}</span >
                                        <span><img src="../static/images/ren.png"></img> {item.view_count}人</span>
                                    </div>
                                    <div className="list-context"
                                        dangerouslySetInnerHTML={{__html:marked(item.introduce)}}
                                    ></div>
                                </List.Item>
                            )
                        }
                    />
                </Col>
                <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4} >
                    <Author />
                    {/* <Advert /> */}
                </Col>
            </Row>
            <Footer />
        </div>
    )
}

Home.getInitialProps = async () => {
    const promise = new Promise((resolve) => {
        axios(servicePath.getArticleList).then(
            (res) => {
                let data = res.data;
                data.data.sort((a, b) => {
                    let A = new Date(a.addTime).getTime();
                    let B = new Date(b.addTime).getTime();
                    return B - A;
                })
                resolve(data);
            }
        )
    })
    return await promise;
}
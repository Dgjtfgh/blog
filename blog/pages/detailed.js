import React from 'react'
import Head from 'next/head'
import { Row, Col, Breadcrumb, Affix } from 'antd'
import Header from '../components/Header'
import Author from '../components/Author'
import Footer from '../components/Footer'
import '../static/style/pages/comm.css'
import '../static/style/pages/detailed.css'
import axios from 'axios'
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
import Tocify from '../components/tocify.tsx'
import servicePath  from '../config/apiUrl'

const Detailed = (props) => {
    let articleContent = props.article_content;
    const renderer = new marked.Renderer();
    const tocify = new Tocify()
    renderer.heading = function (text, level, raw) {
        const anchor = tocify.add(text, level);
        return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
    };
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

    let html = marked(articleContent)

    return (
        <>
            <Head>
                <title>博客详细页</title>
            </Head>
            <Header />
            <Row className="comm-main" type="flex" justify="center">
                <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
                    <div>
                        <div className="bread-div">
                            <Breadcrumb>
                                <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                                <Breadcrumb.Item><a href="#">{props.typeName}</a></Breadcrumb.Item>
                                <Breadcrumb.Item>{props.title}</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <div>
                            <div className="detailed-title">
                                {props.title}
                            </div>
                            <div className="list-icon center">
                                <span><img src="../static/images/calendar.png"></img>{props.addTime}</span>
                                <span><img src="../static/images/type.png"></img> {props.typeName}</span>
                                <span><img src="../static/images/ren.png"></img> {props.view_count}人</span>
                            </div>
                            <div className="detailed-content"
                                dangerouslySetInnerHTML={{ __html: html }}
                            >
                            </div>
                        </div>
                    </div>
                </Col>

                <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
                    <Author />
                    <Affix offsetTop={5}>
                        <div className="detailed-nav comm-box">
                            <div className="nav-title">文章目录</div>
                            <div className="toc-list">
                                {tocify && tocify.render()}
                            </div>
                        </div>
                    </Affix>
                </Col>
            </Row>
            <Footer />
        </>
    )
}

Detailed.getInitialProps = async (context) => {
    let id = context.query.id;
    // let id = 1;
    console.log(id);
    const promise = new Promise((resolve) => {
        axios(servicePath.getArticleById+id).then(
            (res) => {
                // console.log(res);
                resolve(res.data.data[0]);
            }
        )
    })
    return await promise;
}

export default Detailed
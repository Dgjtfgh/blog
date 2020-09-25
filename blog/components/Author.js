import React, { useEffect, useState } from 'react';
import { Avatar, Divider, Tooltip, message  } from 'antd';
import { GithubOutlined, QqOutlined } from '@ant-design/icons';
import '../static/style/components/author.css';
import copy from "copy-to-clipboard";
import servicePath  from '../config/apiUrl';
import axios from 'axios';
function Author() {
    const [portrait, setPortrait] = useState('');
    const [QQ, setQQ] = useState('');
    const [githubUrl, setGithubUrl] = useState('');
    const [introduce, setIntroduce] = useState('');
    useEffect(() => {
        getUserInfo();
    }, [])
    const handleCopy = (value) => {
        console.log('复制')
        if (copy(value)) {
            message.success("复制成功");
        } else message.error("复制失败，请手动复制");
    }
    // const copy = () => {
    //     const copyEle = document.querySelector('.contentText') // 获取要复制的节点
    //     const range = document.createRange(); // 创造range
    //     window.getSelection().removeAllRanges(); //清除页面中已有的selection
    //     range.selectNode(copyEle); // 选中需要复制的节点
    //     window.getSelection().addRange(range); // 执行选中元素
    //     const copyStatus = document.execCommand("Copy"); // 执行copy操作
    //     // 对成功与否定进行提示
    //     if (copyStatus) {
    //       message.success('复制成功');
    //     } else {
    //       message.fail('复制失败');
    //     }
    //     window.getSelection().removeAllRanges(); //清除页面中已有的selection
    //   }
    const getUserInfo = () => {
        axios(servicePath.getUserInfo).then(
             res => {
                // console.log(res.data)
                setPortrait(res.data.data[0].portrait);
                setQQ(res.data.data[0].qq);
                setGithubUrl(res.data.data[0].githubUrl);
                setIntroduce(res.data.data[0].introduce);
            }
        )
    }
    return (
        <div className="author-div comm-box">
            <div><Avatar size={100} src={portrait}></Avatar></div>
            <div className="author-introduction">
                {introduce}
                <Divider>社交账号</Divider>
                <a style={{marginRight: '1rem'}} href={githubUrl} ><Avatar size={28}><GithubOutlined /></Avatar></a> 
                <Tooltip  title={QQ}>
                    <Avatar onClick={() => handleCopy(QQ)} size={28}><QqOutlined /></Avatar>
                </Tooltip >
            </div>
        </div>
    )
}

export default Author
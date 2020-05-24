import React from 'react'
import { Avatar, Divider } from 'antd'
import { GithubOutlined } from '@ant-design/icons'
import '../static/style/components/author.css'

function Author() {
    return (
        <div className="author-div comm-box">
            <div><Avatar size={100} src="https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1950846641,3729028697&fm=111&gp=0.jpg"></Avatar></div>
            <div className="author-introduction">
                介绍
                <Divider>社交账号</Divider>
                <Avatar size={28}><GithubOutlined /></Avatar>
            </div>
        </div>
    )
}

export default Author
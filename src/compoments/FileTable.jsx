import React, {useEffect, useState} from "react";
import {Table, Button} from "@douyinfe/semi-ui";
import { IconFile, IconFolderOpen } from "@douyinfe/semi-icons";
import axios from "axios";
import OpenDir from "./OpenDir";
import DeleteFile from "./DeleteFile";
import MoveFile from "./MoveFile";
import DownloadFile from "./DownloadFile";
import MyContext from "../context"

const { Column } = Table
const ThemeContext = React.createContext({},[])
const sortBy = ['dir', 'file']

const FileTable = () => {
    const [data,setData] = useState([])

    const getData = () => {
        axios.get('/api/hdfs/list',{
            params: {
                path: window.localStorage.getItem("path")
            },
            headers: {
                Authorization: window.localStorage.getItem("authorization")
            }
        })
            .then((response) => {
                console.log(response)
                let midData = response.data.data
                customSort({data: midData, sortBy, sortField: 'type'})
                setData(midData)
                console.log(data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        getData()
    },[])

    const customSort = ({data, sortBy, sortField}) => {
        const sortByObject = sortBy.reduce(
            (obj, item, index) => ({
                ...obj,
                [item]: index
            }),{}
        )
        return data.sort((a, b) => sortByObject[a[sortField]] - sortByObject[b[sortField]])
    }

    const renderName = (text, record, index) => {
        return (
            <div>
                { record.type === 'dir' ?
                    <IconFolderOpen
                        style={{
                            marginRight: 4
                        }}/>
                    :
                    <IconFile
                        style={{
                            marginRight: 4
                        }}
                    />}
                {text}
            </div>
        );
    };

    const renderSize = (text, record, index) => {
        return (
            <div>
                {
                    text / 1024 > 1024
                        ? (text / 1024 / 1024).toFixed(2) + ' M'
                        : (text / 1024).toFixed(2) + ' K'
                }B
            </div>
        )
    }

    const renderModTime = (text, record, index) => {
        var date = new Date(text);  // 参数需要毫秒数，所以这里将秒数乘于 1000
        let Y = date.getFullYear() + '-';
        let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        let D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
        let h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
        let m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
        let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
        return (
            <div>
                {
                    Y+M+D+h+m+s
                }
            </div>
        )
    }

    const renderOperate = (text, record, index) => {
        return (
                <MyContext.Provider value={[{name: record.name},[data,setData]]}>
                    {record.type === 'dir' ? <OpenDir/> : <DownloadFile/>}
                    <MoveFile/>
                    <DeleteFile/>
                </MyContext.Provider>
        )
    }

    return (
        <div>
            <Table dataSource={data} pagination={false}>
                <Column title="标题" dataIndex="name" key="name" render={renderName} />
                <Column title="大小" dataIndex="size" key="size" render={renderSize}/>
                <Column title="更新时间" dataIndex="modTime" key="modTime" render={renderModTime}/>
                <Column title="操作" dataIndex="operate" key="operate" render={renderOperate}
                />
            </Table>

            <Button onClick={()=>{
                console.log(window.localStorage.getItem("path"))
                console.log(window.localStorage.getItem("name"))
                let midPath = window.localStorage.getItem("path").slice(0,-window.localStorage.getItem("name").length)
                window.localStorage.setItem("path", midPath)
            }}>返回</Button>
        </div>
    )
}

export default FileTable
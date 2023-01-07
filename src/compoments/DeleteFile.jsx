import React, {useState, useContext, useEffect} from "react";
import {Button, Modal} from "@douyinfe/semi-ui";
import axios from "axios";
import MyContext from "../context"

const DeleteFile = () => {
    const context = useContext(MyContext)

    const [visible, setVisible] = useState(false)
    const [name, setName] = useState('')
    const [dirPath, setDirPath] = useState('')
    const [data, setData] = useState([])

    const sortBy = ['dir', 'file']

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
                let Data = [...midData]
                setData(Data)
                context[1][1](midData)
                console.log(data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const customSort = ({data, sortBy, sortField}) => {
        const sortByObject = sortBy.reduce(
            (obj, item, index) => ({
                ...obj,
                [item]: index
            }),{}
        )
        return data.sort((a, b) => sortByObject[a[sortField]] - sortByObject[b[sortField]])
    }

    const showDialog = () => {
        setVisible(true)
        setName(context[0].name)
        console.log(name)
        let midPath
        if(window.localStorage.getItem("path") === "/"){
            midPath = `${window.localStorage.getItem("path")}${name}`
        } else {
            midPath = `${window.localStorage.getItem("path")}/${name}`
        }
        setDirPath(midPath)
    }

    const handleOk = (e) => {
        axios.delete('/api/hdfs',{
            params: {
                path: `${dirPath}`
            },
            headers: {
                Authorization: window.localStorage.getItem("authorization")
            }
        })
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error.response)
            })
            .finally(() => {
                getData()
                setVisible(false)
            })
    }

    const handleCancel = (e) => {
        setVisible(false)
    }

    return (
        <>
            <Button
                onClick={showDialog}
                style={{marginLeft: 4}}
            >删除</Button>
            <Modal
                header={null}
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}>
                <h3 style={{ textAlign: 'center', fontSize: 24, margin: 40 }}>确定要删除这个文件吗？</h3>
            </Modal>
        </>
    )

}

export default DeleteFile
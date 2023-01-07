import React, {useContext, useState} from "react";
import {Button, Modal, Input} from "@douyinfe/semi-ui";
import axios from "axios";
import MyContext from "../context"

const qs = require('qs')

const DeleteFile = () => {
    const context = useContext(MyContext)

    const [visible, setVisible] = useState(false)
    const [text, setText] = useState('')
    const [name, setName] = useState('')
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
    }

    const handleOk = (e) => {
        axios.put('/api/hdfs', null,{
            params: {
                oldPath: `${window.localStorage.getItem("path")}/${name}`,
                newPath: `${text}/${name}`
            },
            headers:{
                Authorization: localStorage.getItem("authorization")
            },
        })
            .then(function (response){
                console.log(response)
                getData()
            })
            .catch(function (error){
                console.log(error.response)
            })
            .finally(() => {
                setVisible(false)
            })
    }

    const handleCancel = (e) => {
        setVisible(false)
    }

    const onChange = (text) => {
        setText(text)
    }

    return (
        <>
            <Button
                onClick={showDialog}
                style={{marginLeft: 4}}
            >移动</Button>
            <Modal
                header={null}
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}>
                <p style={{ textAlign: 'center', fontSize: 24, margin: 40 }}>将文件移动到：</p>
                <Input
                    onChange={onChange}
                    showClear
                    value={text}
                    addonBefore="/">
                </Input>
            </Modal>
        </>
    )
}

export default DeleteFile
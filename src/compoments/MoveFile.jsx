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
    const [path, setPath] = useState('')


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
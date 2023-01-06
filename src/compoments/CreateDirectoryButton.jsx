import { Tooltip, Button, Modal, Input } from "@douyinfe/semi-ui";
import { IconPlus } from "@douyinfe/semi-icons";
import React, {useContext, useState} from "react";
import axios from "axios";

const qs = require('qs');

const CreateDirectoryButton = () => {

    const [visible, setVisible] = useState(false)
    const [text, setText] = useState('新建文件夹')

    const showDialog = () => {
        setVisible(true)
    }

    const handleOk = () => {
        axios.post('/api/hdfs/mkdir',qs.stringify({
            path: `${window.localStorage.getItem("path")}/${text}`
        }),{
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
                setVisible(false)
            })
    }

    const handleCancel = () => {
        setVisible(false)
    }

    const onChange = (text) => {
        setText(text)
    }

    return (
        <>
            <Tooltip position='topLeft' content='点击此处在此目录创建文件夹'>
                <Button
                    style={{ float: "right" }}
                    icon={<IconPlus></IconPlus>}
                    onClick={showDialog}
                ></Button>
            </Tooltip>
            <Modal
                title='创建文件夹'
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
                bodyStyle={{ overflow: 'auto', height: 'auto' }}>
                <h2>
                    请输入文件夹名称：
                </h2>
                <Input
                    showClear
                    value={text}
                    onChange={onChange}
                    style={{marginTop: 20}}>
                </Input>
            </Modal>
        </>
    )
}

export default CreateDirectoryButton

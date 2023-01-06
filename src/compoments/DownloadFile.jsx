import React, {useContext, useState, useReducer} from "react";
import {Button, Modal, Input} from "@douyinfe/semi-ui";
import axios from "axios";
import MyContext from "../context"

const DeleteFile = () => {
    const context = useContext(MyContext)

    const [visible, setVisible] = useState(false)
    const [name, setName] = useState('')

    const showDialog = () => {
        setVisible(true)
        setName(context[0].name)
    }

    const handleOk = (e) => {
        axios.get('/api/hdfs/download', {
            params: {
                path: `${window.localStorage.getItem("path")}`
            },
            headers: {
                Authorization: window.localStorage.getItem("authorization")
            },
            responseType: "blob"
        })
            .then((response) =>{
                console.log(response)
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', name);
                document.body.appendChild(link);
                link.click();
            })
            .catch((error) => {
                console.log("error" + error.response)
            })
            .finally(() => {
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
            >下载</Button>
            <Modal
                header={null}
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}>
                <h3 style={{ textAlign: 'center', fontSize: 24, margin: 40 }}>下载该文件</h3>
            </Modal>
        </>
    )
}

export default DeleteFile
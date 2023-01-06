import React, { useState, useEffect, useContext } from "react";
import { IconUpload } from "@douyinfe/semi-icons";
import axios from "axios";

const UploadFileButton = () => {
    const getFilds = () =>{
        const filedom = document.getElementById('file');
        filedom.click()
    }

    // 用于监听按钮上传的事件
    const fileinputChange = (event) =>{
        const fileData = event.target.files[0];
        if(fileData){
            const formdata = new FormData();
            formdata.append("file",fileData);
            send(formdata)
        }
    }

    const send = async (formdata) =>{
        console.log(formdata.getAll('file')[0])
        const data = formdata.getAll('file')[0]
        console.log(data)

        axios.post('/api/hdfs/upload', {
                multipartFileList: formdata.getAll('file')[0]
            }
            ,{
                params: {
                    path: `${window.localStorage.getItem("path")}/`
                },
                headers: {
                    Authorization: localStorage.getItem("authorization"),
                    "Content-Type": "multipart/form-data"
                },
                processData: false,  // 不处理数据
                contentType: false   // 不设置内容类型
            })
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
            })
    }


    return (
        <div>
            <input id="file" type="file"
                   style={{ display:"none", }}
                   onChange={fileinputChange}
            />
            <button onClick={getFilds}>上传文件</button>
        </div>
    )

}

export default UploadFileButton
import React, { useState, useEffect } from "react";
import { Table, Avatar } from "@douyinfe/semi-ui";
import { IconMore, IconFile, IconFolderOpen } from "@douyinfe/semi-icons";
import axios from "axios";

const { Column } = Table

function FileTable() {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(' http://129.226.91.218:8807/hdfs/list',{
            headers: {
                Authorization:"Bearer eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoieXVuZHVvIiwicGFzc3dvcmQiOiIyMDAzMDEzMCJ9LCJzdWIiOiJ5dW5kdW8iLCJpc3MiOiJDb2RlcldkZCIsImlhdCI6MTY3MjQ2MjYyOCwiZXhwIjoxNjczMDY3NDI4fQ.U5iHNmcZDR8z7H35qK9GKgip-yquMrzOxXYYWhRkWm-5DCBVagRpNuUUu0ZKt9Sm6XlyuD4eNLRtEjgTWib3yA"
            },
            params: {
                path: 'home'
            }
        })
            .then((response) => setData(response))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);

    const renderName = (text, record, index) => {
        return (
            <div>
                { record.type === 'dir' ?
                    <IconFolderOpen/>
                    :
                    < IconFile/>}
                {text}
            </div>
        );
    };

    return (
        <Table dataSource={data} pagination={false}>
            <Column title="标题" dataIndex="name" key="name" render={renderName} />
            <Column title="大小" dataIndex="size" key="size" />
            <Column title="更新时间" dataIndex="updateTime" key="updateTime" />
            <Column title="" dataIndex="operate" key="operate" render={() => <IconMore />} />
        </Table>
    );
}

export default FileTable
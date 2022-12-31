import { Tooltip, Button, Modal, Input } from "@douyinfe/semi-ui";
import { IconPlus } from "@douyinfe/semi-icons";
import React from "react";
import "../globalData"

class CreateDirectoryButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            visible: false,
            text: '新建文件夹',
        };
        this.showDialog = this.showDialog.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }
    showDialog() {
        this.setState({ visible: true })
    }
    handleOk(e) {
        fetch("http://129.226.91.218:8807/hdfs/mkdir", {
            method: "GET",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "mode": "cors",
                "Authorization":"Bearer eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoieXVuZHVvIiwicGFzc3dvcmQiOiIyMDAzMDEzMCJ9LCJzdWIiOiJ5dW5kdW8iLCJpc3MiOiJDb2RlcldkZCIsImlhdCI6MTY3MjQ2MjYyOCwiZXhwIjoxNjczMDY3NDI4fQ.U5iHNmcZDR8z7H35qK9GKgip-yquMrzOxXYYWhRkWm-5DCBVagRpNuUUu0ZKt9Sm6XlyuD4eNLRtEjgTWib3yA"
            }
        })
            .then((response) => response.json())
            .then((json) => {
                this.setState({ data: json.data })
            })
            .catch((error) => console.error(error))
            .finally(() => {
                this.setState({
                    visible: false
                })
            });
    }
    handleCancel(e) {
        this.setState({
            visible: false,
        });
    }
    onChange(text,e) {
        console.log(text)
        this.setState( {text} )
    }
    render() {
        return (
            <>
                <Tooltip position='topLeft' content='点击此处在此目录创建文件夹'>
                    <Button
                        style={{ float: "right" }}
                        icon={<IconPlus></IconPlus>}
                        onClick={this.showDialog}
                    ></Button>
                </Tooltip>
                <Modal
                    title='创建文件夹'
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    bodyStyle={{ overflow: 'auto', height: 'auto' }}>
                    <h2>
                        请输入文件夹名称：
                    </h2>
                    <Input
                        showClear
                        value={this.state.text}
                        addonBefore="/"
                        onChange={this.onChange}>
                    </Input>
                </Modal>
            </>
        )
    }
}

export default CreateDirectoryButton

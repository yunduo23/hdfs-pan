import React from "react";
import { Modal } from "@douyinfe/semi-ui";

class DeleteFile extends React.Component {
    constructor() {
        super();
        this.state = { visible: false };
        this.showDialog = this.showDialog.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }
    showDialog() {
        this.setState({
            visible: true,
        });
    }
    handleOk(e) {
        this.setState({
            visible: false,
        });
    }
    handleCancel(e) {
        this.setState({
            visible: false,
        });
    }
    render() {
        return (
            <>
                <Modal
                    header={null}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}>
                    <h3 style={{ textAlign: 'center', fontSize: 24, margin: 40 }}>确定要删除这个文件吗？</h3>
                </Modal>
            </>
        )
    }
}

export default DeleteFile
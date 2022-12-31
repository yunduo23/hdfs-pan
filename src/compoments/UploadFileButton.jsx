import React from "react";
import { Upload, Button } from "@douyinfe/semi-ui";
import { IconUpload } from "@douyinfe/semi-icons";

class UploadFileButton extends React.Component {
    render() {
        const action = 'http://129.226.91.218:8807/hdfs/upload/image';
        return (
            <>
                <Upload action={action}>
                    <Button icon={<IconUpload />} theme="light"></Button>
                </Upload>
            </>
        )
    }
}

export default UploadFileButton
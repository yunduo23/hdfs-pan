import React from "react";
import { Col, Row} from "@douyinfe/semi-ui";

function SubTitle(){
    return (
        <div className="SubTitle">
            <Row gutter={{ xs: 16, sm: 16, md: 16, lg: 24, xl: 24, xxl: 24 }}>
                <Col xs={2} sm={4} md={6} lg={8} xl={10}><div className="col-content">Col</div></Col>
                <Col xs={20} sm={16} md={12} lg={8} xl={4}><div className="col-content">Col</div></Col>
                <Col xs={2} sm={4} md={6} lg={8} xl={10}><div className="col-content">Col</div></Col>
            </Row>
        </div>
    )
}

export default SubTitle
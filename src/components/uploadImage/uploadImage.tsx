import { CloseOutlined } from "@ant-design/icons";
import { Button, Col, GetProp, Image, message, Row, Upload, UploadProps } from "antd"
import { FC, useState } from "react";
import { randomPatron } from "../../util/util";

// type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
// should refactor it, this component is not reusable, should no have hard set sizes

interface IUploadImage {
    label: string,
    file: string,
    updateFile: (_: string) => void
}

export const UploadImage: FC<IUploadImage> = ({ label, file, updateFile }) => {


    const handleChange = async (e: any) => {
        console.log(e.target.files[0])
        const b64 = await blobToBase64(e.target.files[0]) as string
        console.log(b64)
        updateFile(b64)
    }

    const blobToBase64 = (F: File) => new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(F)
        reader.onload = () => {resolve(reader.result)}
        reader.onerror = er => reject(er)
    })

    return (
        <Row>
            <Col span={24} style={{ position: "relative", height: '80%' }}>
                <Image style={{ height: '65vh', borderRadius: 10, objectFit: 'cover' }} preview={false} src={file || randomPatron()} alt="" />
                <Button
                    style={{
                        backgroundColor: "transparent",
                        position: "absolute",
                        display: 'inline-flex',
                        padding: 10,
                        top: 40,
                        right: 30,
                    }}
                    onClick={() => updateFile('')}
                    danger
                >
                    <CloseOutlined />
                </Button>
            </Col>
            <Col style={{ paddingTop: 15, paddingBottom : 15 }}>
                <Row>
                    <Col span={5}>
                        {label}
                    </Col>
                    <Col span={19}>
                        <input style={{ fontSize: 7, }} type="file" onChange={(e) => handleChange(e)} multiple={false} />
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}
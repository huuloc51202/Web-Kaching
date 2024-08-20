import { Upload } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled.h1`
    color: #000;
    font-size: 1.8rem;
    margin: 4px 0;
    padding-top: 30px;
`

export const WrapperContentProfile = styled.div`
    display: flex;
    flex-direction: column;
    border:1px solid #ccc;
    width: 550px;
    margin: 0 auto;
    padding: 30px;
    border-radius: 10px;
    gap: 30px;
`

export const WrapperLabel = styled.label`
    color: #000;
    font-size: 12px;
    line-height: 39px;
    font-weight: 600;
    width: 50px;
    text-align: left;
`

export const InputForm = styled.input`
    border: 1px solid #f7f7f7;
    border-radius: .15rem;
    font-size: 1.5rem;
    padding: 10px;
    width:100%;
    outline:none;
    box-sizing: border-box;
`
export const WrapperInput = styled.div`
    display: flex;
    text-align: center;
    gap:20px;
`
export const WrapperUploadFile = styled(Upload)`
    & .ant-upload.ant-upload-select.ant-upload-select-picture-card {
        width: 60px;
        height: 60px;
        border-radius: 50%
    }
    & .ant-upload-list-item-name {
        display: none;
    }
    & .ant-upload-icon{
        display: none;
    }
    & .ant-upload-list-item-action {
        display: none;
    }
`
import { Upload } from "antd";
import styled from "styled-components";

export const ProfileWrapper = styled.div`
    width: 100%;
    max-width: 1270px;
    margin: 60px auto 0px;
    height: 500px;

    @media (max-width: 768px) {
        height: 925px;
    }
`;

export const WrapperHeader = styled.h1`
    color: #000;
    font-size: 1.8rem;
    margin: 4px 0;
    padding-top: 30px;

    @media (max-width: 768px) {
        font-size: 1.5rem;
        text-align: center;
    }
`;

export const WrapperContentProfile = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid #ccc;
    width: 550px;
    margin: 0 auto;
    padding: 30px;
    border-radius: 10px;
    gap: 30px;

    @media (max-width: 768px) {
        width: 100%;
        padding: 20px;
        gap: 20px;
    }

    @media (max-width: 503px) {
        width: 100%;
        padding: 15px;
        gap: 15px;
    }
`;

export const WrapperInput = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 20px;
    text-align: center;

    @media (max-width: 768px) {
        flex-direction: column;
        gap: 10px;
    }
`;

export const InputForm = styled.input`
    border: 1px solid #c8c5c5;
    border-radius: 0.15rem;
    font-size: 1.5rem;
    padding: 10px;
    width: 100%;
    outline: none;
    box-sizing: border-box;

    @media (max-width: 768px) {
        font-size: 1.2rem;
        padding: 8px;
    }
`;

export const WrapperLabel = styled.label`
    color: #000;
    font-size: 12px;
    line-height: 39px;
    font-weight: 600;
    width: 100px;
    text-align: left;

    @media (max-width: 768px) {
        text-align: center;
        width: 100%;
    }
`;

export const WrapperUploadFile = styled(Upload)`
    & .ant-upload.ant-upload-select.ant-upload-select-picture-card {
        width: 60px;
        height: 60px;
        border-radius: 50%;
    }
    & .ant-upload-list-item-name {
        display: none;
    }
    & .ant-upload-icon {
        display: none;
    }
    & .ant-upload-list-item-action {
        display: none;
    }
`;

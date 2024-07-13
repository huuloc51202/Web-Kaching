import styled from "styled-components";

export const SignIn = styled.div`
    margin: 120px 132.500px 80px;
    display: flex;
    justify-content: center;
`

export const UserWrapper = styled.div`
    text-align:center;
    width:30%;
    padding:20px;
`

export const FormLogin = styled.input`
    border: 1px solid #f7f7f7;
    border-radius: .15rem;
    font-size: 1.5rem;
    padding: 10px;
    width:100%;
    outline:none;
    box-sizing: border-box;
`

export const Btn = styled.button`
    width: 100%;
    color: #fff;
    font-size: 1.5rem;
    border-radius: .15rem;
    outline: 0;
    border: none;
    background-color:#000;
    cursor: pointer;
    padding:6px 12px;
    margin: 0 0 10px;
    line-height: 1.5;
    &:disabled{
        background-color: #ccc;
        cursor: not-allowed;
        color: #666;
    }
`

export const ClearFixA = styled.a`
    margin: 0 10px;
    color: #000;
    &:hover{
        text-decoration: none;
    }
`

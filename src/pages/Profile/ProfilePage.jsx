import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import { InputForm, ProfileWrapper, WrapperContentProfile, WrapperHeader, WrapperInput, WrapperLabel, WrapperUploadFile } from './style'
import * as UserService from '../../services/UserService'
import { useMutationHooks } from '../../hooks/useMutationHook'
import * as message from '../../components/Message/Message'
import Loading from '../../components/LoadingComponent/Loading'
import { updateUser } from '../../redux/slides/userSlide'
import { Button, Upload } from 'antd'
import {UploadOutlined} from '@ant-design/icons'
import { getBase64 } from '../../utils'

const ProfilePage = () => {
    const user = useSelector((state) => state.user)
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [avatar, setAvatar] = useState('')
    const mutation = useMutationHooks(
        (data) =>{ 
            const {id,access_token, ...rests} = data
            UserService.updateUser(id, rests, access_token)
        }
    )
    
    const dispatch = useDispatch()
    const {data, isSuccess, isError} = mutation

    useEffect(() => {
        setEmail(user?.email)
        setName(user?.name)
        setPhone(user?.phone)
        setAddress(user?.address)
        setAvatar(user?.avatar)
    }, [user])

    useEffect(() =>{
        if(isSuccess){
            
            message.success()
            handleGetDetailsUser(user?.id, user?.access_token)
        }else if(isError){
            message.error()
        }
    }, [isSuccess, isError])

    const handleGetDetailsUser = async (id, token) =>{
        const res = await UserService.getDetailsUser(id, token)
        dispatch(updateUser({...res?.data, access_token: token}))
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handleNameChange = (e) => {
        setName(e.target.value)
    }

    const handlePhoneChange = (e) => {
        setPhone(e.target.value)
    }

    const handleAddressChange = (e) => {
        setAddress(e.target.value)
    }

    const handleAvatarChange = async ({fileList}) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setAvatar(file.preview)
    }

    const handleUpdate = () =>{
        mutation.mutate({ id: user?.id, email,phone, name, address, avatar, access_token: user?.access_token})
    }
    return (
        <ProfileWrapper> 
            <WrapperHeader>Thông tin cá nhân</WrapperHeader>
            <Loading isPending={mutation.isPending}>

                <WrapperContentProfile>
                    <WrapperInput>
                        <WrapperLabel htmlFor='email'>Email</WrapperLabel>
                        <InputForm  id="email" value={email} onChange={handleEmailChange} placeholder='Email người dùng'/>
                        <ButtonComponent
                            onClick={handleUpdate}
                            size={40}
                            style={{
                                height: '40px',
                                width: 'fit-content',
                                border: '1px solid #000',
                                borderRadius:'4px',
                                padding: '6px',
                            }}
                            textButton={'Cập nhật'}
                            styleTextButton={{color:'#000', fontSize:'1.6rem', fontWeight:'700'}}
                        ></ButtonComponent>
                    </WrapperInput>
                    <WrapperInput>
                        <WrapperLabel htmlFor='name'>Name</WrapperLabel>
                        <InputForm  id="name" value={name} onChange={handleNameChange} placeholder='Tên người dùng'/>
                        <ButtonComponent
                            onClick={handleUpdate}
                            size={40}
                            style={{
                                height: '40px',
                                width: 'fit-content',
                                border: '1px solid #000',
                                borderRadius:'4px',
                                padding: '6px',
                            }}
                            textButton={'Cập nhật'}
                            styleTextButton={{color:'#000', fontSize:'1.6rem', fontWeight:'700'}}
                        ></ButtonComponent>
                    </WrapperInput>
                    <WrapperInput>
                        <WrapperLabel htmlFor='phone'>Phone</WrapperLabel>
                        <InputForm  id="phone" value={phone} onChange={handlePhoneChange} placeholder='Số điện thoại'/>
                        <ButtonComponent
                            onClick={handleUpdate}
                            size={40}
                            style={{
                                height: '40px',
                                width: 'fit-content',
                                border: '1px solid #000',
                                borderRadius:'4px',
                                padding: '6px',
                            }}
                            textButton={'Cập nhật'}
                            styleTextButton={{color:'#000', fontSize:'1.6rem', fontWeight:'700'}}
                        ></ButtonComponent>
                    </WrapperInput>
                    <WrapperInput>
                        <WrapperLabel htmlFor='address'>Address</WrapperLabel>
                        <InputForm  id="address" value={address} onChange={handleAddressChange} placeholder='Địa chỉ'/>
                        <ButtonComponent
                            onClick={handleUpdate}
                            size={40}
                            style={{
                                height: '40px',
                                width: 'fit-content',
                                border: '1px solid #000',
                                borderRadius:'4px',
                                padding: '6px',
                            }}
                            textButton={'Cập nhật'}
                            styleTextButton={{color:'#000', fontSize:'1.6rem', fontWeight:'700'}}
                        ></ButtonComponent>
                    </WrapperInput>
                    <WrapperInput>
                        <WrapperLabel htmlFor='avatar'>Avatar</WrapperLabel>
                        <WrapperUploadFile onChange={handleAvatarChange} maxCount={1}> 
                            <Button icon={<UploadOutlined />}>Upload</Button>
                        </WrapperUploadFile>
                        {avatar && (
                            <img src={avatar} style={{height:'60px',width:'60px', borderRadius:'50%',objectFit:'cover'}} alt="avatar"/>
                        )}
                        {/* <InputForm  id="avatar" value={avatar} onChange={handleAvatarChange} placeholder='Địa chỉ'/> */}
                        <ButtonComponent
                            onClick={handleUpdate}
                            size={40}
                            style={{
                                height: '40px',
                                width: 'fit-content',
                                border: '1px solid #000',
                                borderRadius:'4px',
                                padding: '6px',
                            }}
                            textButton={'Cập nhật'}
                            styleTextButton={{color:'#000', fontSize:'1.6rem', fontWeight:'700'}}
                        ></ButtonComponent>
                    </WrapperInput>
                </WrapperContentProfile>
            </Loading>
        </ProfileWrapper>
    )
}

export default ProfilePage

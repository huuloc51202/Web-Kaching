import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import { InputForm, WrapperContentProfile, WrapperHeader, WrapperInput, WrapperLabel } from './style'
import * as UserService from '../../services/UserService'
import { useMutationHooks } from '../../hooks/useMutationHook'
import * as message from '../../components/Message/Message'
import Loading from '../../components/LoadingComponent/Loading'

const ProfilePage = () => {
    const user = useSelector((state) => state.user)
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const mutation = useMutationHooks(
        (id, data) => UserService.updateUser(id, data)
    )
    
    const dispatch = useDispatch()
    const {data, isSuccess, isError} = mutation
    console.log('data', data)

    useEffect(() => {
        setEmail(user?.email)
        setName(user?.name)
        setPhone(user?.phone)
        setAddress(user?.address)
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
        dispatch(UserService.updateUser({...res?.data, access_token: token}))
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
    const handleUpdate = () =>{
        mutation.mutate(user?.id, {email,phone, name, address})
    }
    return (
        <div style={{ width:'1270px', margin: '60px auto 0', height:'500px'}}> 
            <WrapperHeader>Thông tin cá nhân</WrapperHeader>
            <Loading isPending={mutation.isPending}>

                <WrapperContentProfile>
                    <WrapperInput>
                        <WrapperLabel htmlFor='email'>Email</WrapperLabel>
                        <InputForm style={{width:'300px'}} id="email" value={email} onChange={handleEmailChange} placeholder='Email người dùng'/>
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
                        <InputForm style={{width:'300px'}} id="name" value={name} onChange={handleNameChange} placeholder='Tên người dùng'/>
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
                        <InputForm style={{width:'300px'}} id="phone" value={phone} onChange={handlePhoneChange} placeholder='Số điện thoại'/>
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
                        <InputForm style={{width:'300px'}} id="address" value={address} onChange={handleAddressChange} placeholder='Địa chỉ'/>
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
        </div>
    )
}

export default ProfilePage

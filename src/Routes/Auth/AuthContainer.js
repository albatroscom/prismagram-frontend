import React, { useState } from 'react';
import AuthPresenter from './AuthPresenter'
import useInput from '../../Hooks/useInput';
import { useMutation } from 'react-apollo-hooks';
import { LOG_IN, CREATE_ACCOUNT } from './AuthQueries';
import { toast } from 'react-toastify';

export default () => {
    const [ action, setAction ] = useState('logIn');
    const userName = useInput("");
    const firstName = useInput("");
    const lastName = useInput("");
    const email = useInput("");
    const requestSecret = useMutation(LOG_IN, { 
        update: (_, {data}) => {
            const { requestSecret } = data;
            if(!requestSecret){
                toast.error("You don't have an account yet, please create one!");
                setTimeout(() => setAction("signUp"), 3000);
            }
        },
        variables: { email: email.value }
    });
    const createAccount = useMutation(CREATE_ACCOUNT, {
        variables: {
            email: email.value,
            userName: userName.value,
            firstName: firstName.value,
            lastName: lastName.value
        }
    })

    const onSubmit = e => {
        e.preventDefault();
        if(action === 'logIn'){
            if(email.value !== ''){
                requestSecret();
            } else {
                toast.error("Email is requied!");
            }
        } else if(action === 'signUp'){
            if(email.value !== '' &&
                userName.value !== '' &&
                firstName.value !== '' &&
                lastName.value !== '') {
                createAccount();
            } else {
                toast.error('All field are required!');
            }
        }
    };

    return (
    <AuthPresenter 
        setAction={setAction} 
        action={action} 
        userName={userName} 
        firstName={firstName}
        lastName={lastName}
        email={email} 
        onSubmit={onSubmit}
    />);
};
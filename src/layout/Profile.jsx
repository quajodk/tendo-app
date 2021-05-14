/* eslint-disable jsx-a11y/anchor-is-valid */
import { useMutation } from '@apollo/client';
import React, { Fragment, useState, useRef } from 'react'
import { useSelector } from 'react-redux';
import { Transition } from '../components'
import Modal from '../components/Modal';
import { LOGIN_QUERY, REGISTER_QUERY } from '../graphql/queries';
import { useOutsideClick } from '../hooks';
import { useDispatch } from 'react-redux'
import { notification, Spin } from 'antd';
import { useForm } from 'react-hook-form';
import _ from 'lodash';

const Profile = () => {
    const profileMenuRef = useRef(null);
    useOutsideClick(profileMenuRef, () => {
        setShowProfileMenu(false)
    })
    const { register, handleSubmit } = useForm()
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [rememberme, setRememberme] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [username, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const [login, { loading }] = useMutation(LOGIN_QUERY);
    const [registerM, { loading: registering }] = useMutation(REGISTER_QUERY)
    const onLoginClicked = () => {
        if (!username || !password) return;
        login({
            variables: {
                input: { username, password }
            }
        }).then(({ data: { authenticate } }) => {
            // console.log(authenticate)
            setPassword("");
            setEmail("");
            dispatch({
                type: "authenticateUser",
                payload: authenticate?.user
            })
            dispatch({
                type: "toggleLogin"
            })
        })
            .catch(err => {
                notification.error({
                    message: "Error",
                    description: err.message
                })
            })
    }
    const onRegisterClicked = values => {
        registerM({
            variables: {
                input: _.omit(values, ["confirm_password"])
            }
        }).then(({ data: { register } }) => {
            dispatch({
                type: "authenticateUser",
                payload: register?.user
            })
            setShowRegister(false)
        })
            .catch(err => {
                notification.error({
                    message: "Error",
                    description: err.message
                })
            })
    }

    const onSignOutClicked = () => {
        dispatch({ type: "signOut" })
        setShowProfileMenu(false)
    }

    const { auth, showLogin } = useSelector(state => state)
    return (
        <Fragment>
            <div className="ml-4 relative flex-shrink-0">
                {auth && <div className="flex flex-row items-center" onClick={() => setShowProfileMenu(c => !c)}>
                    <button className="bg-yellow-600 dark:bg-green-400 flex text-sm rounded-full text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-yellow-400 focus:ring-white" id="user-menu" aria-haspopup="true">
                        <span className="sr-only">Open user menu</span>
                        <div className=" h-10 w-10 flex items-center justify-center rounded-full">
                            <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&h=256&q=80" alt="" />
                        </div>
                    </button>
                    <span className="dark:text-white text-gray-800 font-medium ml-2">{auth?.name}</span>
                </div>}
                {!auth && (
                    <div className="dark:text-white font-bold">
                        <span onClick={() => dispatch({
                            type: "toggleLogin"
                        })} className="mr-2 cursor-pointer">Login</span>
                        <span onClick={() => setShowRegister(true)} className="cursor-pointer">Register</span>
                    </div>
                )}

                <Transition
                    show={showProfileMenu}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-95"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-95"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <div ref={profileMenuRef} className="origin-top-right absolute z-10 right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">View Profile</a>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Settings</a>
                        <a onClick={onSignOutClicked} href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Logout</a>
                    </div>
                </Transition>


            </div>


            <Modal show={showLogin} canClose={!loading} setShow={() => dispatch({
                type: "toggleLogin"
            })}>
                <div className="py-4 px-5 bg-white">
                    <div className="mb-3">
                        <h3 className="text-gray-800 text-2xl font-medium">Login</h3>
                        <p>Provide your valid details to be able to access your account</p>
                    </div>
                    <div className="flex flex-col">
                        <label htmlhtmlFor="">Username</label>
                        <input value={username} onChange={e => setEmail(e.target.value)} type="text" placeholder="email or phone" className="outline-none h-12 px-2 focus:outline-none border border-gray-300" />
                    </div>
                    <div className="flex mb-2 flex-col">
                        <label htmlhtmlFor="">Password</label>
                        <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="*****" className="outline-none h-12 px-2 focus:outline-none border border-gray-300" />
                    </div>
                    <div className="flex mb-3 items-center">
                        <button onClick={() => setRememberme(prev => !prev)} type="button" className={`${rememberme ? "bg-green-700" : "bg-gray-200"} relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`} aria-pressed="false" aria-labelledby="annual-billing-label">
                            <span className="sr-only">Use setting</span>
                            <span aria-hidden="true" className={`${rememberme ? "translate-x-5" : "translate-x-0"} pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}></span>
                        </button>
                        <span className="ml-3" id="annual-billing-label">
                            <span className="text-sm text-gray-500">Remember me</span>
                        </span>
                    </div>
                    <div className="flex flex-col">
                        <button disabled={loading} onClick={onLoginClicked} className="bg-green-700 rounded-md text-white py-3">Sign in</button>
                    </div>
                </div>
            </Modal>

            <Modal show={showRegister} setShow={setShowRegister}>
                <Spin spinning={registering}>
                    <form onSubmit={handleSubmit(onRegisterClicked)} className="py-4 px-5 bg-white">
                        <div className="mb-3">
                            <h3 className="text-gray-800 text-2xl font-medium">Register</h3>
                            <p>Fill out the form to make your lofe easier on the platform</p>
                        </div>
                        <div className="flex flex-col">
                            <label htmlhtmlFor="">Name</label>
                            <input name="name" ref={register({ required: true })} type="text" placeholder="eg. Jone Doe" className="outline-none h-12 px-2 focus:outline-none border border-gray-300" />
                        </div>
                        <div className="flex flex-col">
                            <label htmlhtmlFor="">Email</label>
                            <input name="email" ref={register({ required: true })} type="email" placeholder="eg. johdoe@mail.com" className="outline-none h-12 px-2 focus:outline-none border border-gray-300" />
                        </div>
                        <div className="flex flex-col">
                            <label htmlhtmlFor="">Phone</label>
                            <input name="phone" ref={register({ required: true })} type="text" placeholder="eg. 02744855686" className="outline-none h-12 px-2 focus:outline-none border border-gray-300" />
                        </div>
                        <div className="flex mb-2 flex-col">
                            <label htmlhtmlFor="">Password</label>
                            <input name="password" ref={register({ required: true })} type="password" placeholder="*****" className="outline-none h-12 px-2 focus:outline-none border border-gray-300" />
                        </div>
                        <div className="flex mb-2 flex-col">
                            <label htmlhtmlFor="">Confirm Password</label>
                            <input name="confirm_password" ref={register({ required: true })} type="password" placeholder="*****" className="outline-none h-12 px-2 focus:outline-none border border-gray-300" />
                        </div>
                        <div className="flex flex-col">
                            <button type="submit" className="bg-green-700 rounded-md text-white py-3">Sign in</button>
                        </div>
                    </form>
                </Spin>
            </Modal>


        </Fragment>
    )
}

export default Profile

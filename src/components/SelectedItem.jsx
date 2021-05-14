/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BiCart } from 'react-icons/bi'
import { ImWhatsapp } from 'react-icons/im'
import Modal from './Modal'
// import QRCode from 'qrcode.react'


const SelectedItem = () => {
    const dispatch = useDispatch();
    const [number, setNumber] = useState("")
    const [showPhoneModal, setShowPhoneModal] = useState(false);
    const item = useSelector(state => state.selectedSneaker)

    // add to cart
    const addToCart = () => {
        dispatch({
            type: "addToCart",
        })
    }

    const cancel = () => {
        dispatch({
            type: "unselectSneaker"
        })
    }

    const share = () => {
        window.open(`https://wa.me/+233${number.slice(-9)}/?text=${message}`, "blank")

        setShowPhoneModal(false);
    }
    const message = `hey i just found the ${item?.name} and you wont believe it, it goes for a cool ${item?.retail_price_cents?.toLocaleString("en-US", { style: "currency", currency: "USD" })}`
    return !item ? null : (
        <Fragment>
            <div className="bg-white sm:hidden lg:block dark:bg-gray-800  max-w-md w-full lg:flex-shrink-0 lg:border-l dark:border-gray-500 lg:border-gray-200 xl:pr-0">
                <div className="h-full px-6 py-6 lg:w-full">
                    {/* <!-- Start right column area --> */}
                    <div className="h-full relative overflow-scroll" >
                        <div className="absolute inset-0 rounded-lg">
                            <Fragment>
                                <div className="flex justify-between flex-col h-full">
                                    <div className="flex justify-between">
                                        <a onClick={() => setShowPhoneModal(true)} className="text-green-600 flex items-center outline-none focus:outline-none">
                                            <ImWhatsapp className="mr-3" />
                                            share item
                                        </a>
                                        {/* <WhatsappShareButton title="Share item" /> */}
                                        <button onClick={cancel} className="text-red-600 outline-none focus:outline-none">Cancel</button>
                                    </div>
                                    <div className="flex-1 pb-3 overflow-scroll">
                                        <div className="h-46">
                                            <img src={item.original_picture_url} className="h-full w-full" alt="" />
                                        </div>
                                        <div className="flex flex-col justify-center">
                                            <h2 className="font-bold text-2xl dark:text-white text-center">{item.name}</h2>
                                            <h4 className="text-center dark:text-gray-300 text-gray-500">{item.designer}</h4>
                                        </div>
                                        <div className="mt-6">
                                            <h3 className="font-bold dark:text-gray-400">Select Size</h3>
                                            <div className="flex overflow-scroll mt-2">
                                                {item.size_range?.map((size, sizeIndex) => (
                                                    <div key={sizeIndex} className="h-11 w-11 px-4 dark:bg-white bg-gray-900 text-white dark:text-gray-600 flex dark:border-gray-300 items-center rounded-md justify-center border mr-4 border-gray-800">{size}</div>
                                                ))}
                                            </div>
                                        </div>

                                        {item.story_html && <div className="mt-2">
                                            <h3 className="font-bold dark:text-gray-400">Description</h3>
                                            <div className="mt-1  dark:font-light dark:text-gray-300" dangerouslySetInnerHTML={{ __html: item?.story_html }}>
                                            </div>
                                        </div>}
                                    </div>


                                    <div className="h-13">
                                        <div onClick={addToCart} className="flex w-full cursor-pointer items-center justify-between rounded-lg dark:bg-gray-100 dark:text-gray-900  text-white bg-gray-900 py-3">
                                            <div className="flex px-4 items-end ">
                                                <BiCart size={30} className="text-white dark:text-gray-900" />
                                                <h2 className="ml-6 text-white dark:text-gray-800">Add to cart</h2>
                                            </div>
                                            <div className="px-4">
                                                <h2 className="dark:text-gray-900 font-extrabold text-white">{item.retail_price_cents?.toLocaleString("en-US", { style: "currency", currency: "USD" })}</h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Fragment>
                        </div>
                    </div>
                    {/* <!-- End right column area --> */}
                </div>
            </div>

            <Modal show={showPhoneModal} setShow={setShowPhoneModal} size={35}>
                <div className="bg-white flex flex-col py-4 px-4">
                    <label htmlhtmlFor="phonenumber">Phone Number</label>
                    <input value={number} onChange={e => setNumber(e.target.value)} type="text" min={10} max={13} className="border h-11 px-3 focus:outline-none " />
                    <button onClick={share} className="bg-green-600 py-4 px-4 mt-3 text-white">
                        Send link
                    </button>
                </div>

                {/* <div className="w-auto flex items-center justify-center mb-2">
                    <QRCode value="google.com" />
                </div> */}
            </Modal>

        </Fragment>
    )
}

export default SelectedItem

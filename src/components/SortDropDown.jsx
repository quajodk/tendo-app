/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useState, useRef } from 'react'
import { Transition } from '.'
import { useOutsideClick } from '../hooks';

const SortDropDown = ({ title, list = [] }) => {
    const menuRef = useRef(null)
    const [isOpen, setIsOpen] = useState(false);
    useOutsideClick(menuRef, () => {
        setIsOpen(false)
    })
    return (
        <Fragment>
            <div className="relative inline-block text-left">
                <div>
                    <button onClick={() => setIsOpen(true)} type="button" className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" id="options-menu" aria-haspopup="true" aria-expanded="true">
                        {title}
                        <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
                <Transition
                    show={isOpen}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <div ref={menuRef} className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                            {
                                list.map((item, key) => (
                                    <a key={key} href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">{item}</a>
                                ))
                            }
                        </div>
                    </div>
                </Transition>
            </div>

        </Fragment>
    )
}

export default SortDropDown

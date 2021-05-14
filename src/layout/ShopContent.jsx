import React, { Fragment } from 'react'
import ItemsListing from '../components/ItemsListing'
import FlitersPane from './FlitersPane'
import SelectedItem from '../components/SelectedItem'
import Cart from '../components/Cart'

const ShopContent = () => {
    return (
        <Fragment>
            <div className="flex-grow w-full lg:flex">
                {/* <!-- Left sidebar & main wrapper --> */}
                <div className="flex-1 min-w-0 bg-white dark:bg-gray-800 xl:flex">
                    <FlitersPane />
                    <ItemsListing />
                </div>
                <SelectedItem />
                <Cart />
            </div>

        </Fragment>
    )
}

export default ShopContent

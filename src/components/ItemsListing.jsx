import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { SortDropDown } from '.';


const sortList = ["Prize", "In Stock", "Size", "Color"];


const ItemsListing = () => {
    const items = useSelector(state => state.sneakers)
    return (
        <Fragment>
            <div className="bg-white h-full w-full dark:bg-gray-800 lg:min-w-0 lg:flex-1">
                <div className="h-full py-6 px-2 sm:px-6 lg:px-2">
                    {/* <!-- Start main area--> */}
                    <div className="relative h-full overflow-scroll" >
                        <div className="absolute inset-0 rounded-lg">
                            {/* Sort Layer */}
                            <div className="flex justify-between mb-3">
                                <h1 className="font-bold dark:text-white text-xl">New Arrivals</h1>
                                <SortDropDown title="Sort By" list={sortList} />
                            </div>

                            {/* Lisitng Layer */}

                            <div className="flex-1 grid grid-cols-2">

                                {items.map((item, key) => <Item key={key} item={item} />)}

                            </div>

                        </div>
                    </div>
                    {/* <!-- End main area --> */}
                </div>
            </div>
        </Fragment>
    )
}

export default ItemsListing


const Item = ({ item }) => {
    const categories = useSelector(state => state.selectedCategories || [])
    const categorySelected = categories.some(e => item?.category?.includes(e))
    const dispatch = useDispatch();

    const selectItem = () => {
        dispatch({
            type: "SelectSneaker",
            payload: item
        })
    }

    return categorySelected ? (
        <div onClick={selectItem} className="h-auto cursor-pointer mr-3 ml-2 mb-2  border dark:border-gray-500 border-gray-300 rounded-lg overflow-hidden">
            <div className="absolute h-10 w-2 bg-gray-700 dark:bg-white mt-4 -ml-2  "></div>
            <div className="p-3 ">
                <h4 className="font-light  text-gray-400">{item.designer}</h4>
                <h1 className="dark:text-white">{item.name}</h1>

                <div className="h-42 w-full ">
                    <img src={item.original_picture_url} className="h-full rotate-180 w-full" alt="" />
                </div>
                <div>
                    <h3 className="font-thin text-lg text-gray-400">Price</h3>
                    <h2 className="dark:text-white">{item.retail_price_cents?.toLocaleString("en-US", { style: "currency", currency: "USD" })}</h2>
                </div>
            </div>
        </div>
    ) : null
}

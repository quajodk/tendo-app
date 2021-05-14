import React, { Fragment } from 'react'
import FliterItemDropDown from '../components/FliterItemDropDown';
import { useDispatch, useSelector } from 'react-redux';



const shippedFromList = [
    {
        label: "Abroad",
        value: "abroad"
    },
    {
        label: "Ghana",
        value: "Ghana"
    }
]



const FlitersPane = () => {
    const dispatch = useDispatch()
    const { categories, selectedCategories } = useSelector(state => state)

    const onCategoryClicked = value => {
        dispatch({
            type: "SelectCategory",
            payload: value
        })
    }

    return (
        <Fragment>
            <div className="border-b hidden lg:block border-gray-200 dark:border-gray-500 xl:border-b-0 xl:flex-shrink-0 dark:bg-gray-800 xl:w-72 xl:border-r xl:border-gray-200 bg-white">
                <div className="h-full py-2 sm:pl-6 lg:pl-8 xl:pl-0">
                    <div className="h-full w-full" >
                        <div className=" inset-0">
                            <FliterItemDropDown name="Shipped From" list={shippedFromList} />
                            <FliterItemDropDown onItemClicked={onCategoryClicked} selectedValues={selectedCategories} name="Categories" list={categories} />
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default FlitersPane

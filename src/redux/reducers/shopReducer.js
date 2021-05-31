import sneakers from "../../assets/shops.json";
import ExploreMobile from "../../layout/mobile/ExploreMobile";
import HelpMobile from "../../layout/mobile/HelpMobile";
import MobileCategories from "../../layout/mobile/MobileCategories";
import ProductListing from "../../layout/mobile/ProductListing";
import PromoMobile from "../../layout/mobile/PromoMobile";
import { GET_CATEGORIES, GET_PRODUCTS, SELECT_PRODUCT, SET_SCREEN, TOGGLE_ORDER_FORM, UPDATE_PRODUCTS } from "../actions";

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

const allCategories = sneakers.map((el) => el.category);

let _categories = [];
for (let i = 0; i < allCategories.length; i++) {
  const category = allCategories[i];
  _categories = [..._categories, ...category];
}
_categories = _categories.filter(onlyUnique);

const initialState = {
  sneakers: sneakers.filter((el) => el.retail_price_cents),
  selectedSneaker: null,
  categories: _categories.map((el) => ({ label: el, value: el })),
  selectedCategories: _categories,
  showLogin: false,
  cart: [],
  showCart: false,
  auth: null,
  currentMobileScreen: 0,
  mobileScreens: [
    { component: <ProductListing />, title: "Home" },
    { component: <MobileCategories />, title: "Categories" },
    { component: <ExploreMobile />, title: "Explore" },
    { component: <PromoMobile />, title: "Promotions" },
    { component: <HelpMobile />, title: "Account" },
  ],
  mobileProductSelect: null,
  productName: "",
  showOrderForm: false,
  mobileProducts: [],
  orginalMobileProducts: [],
  mobileCategories: [],
  originalMobileCategories: [],
  mobileSelectedCategory: [],
  categorySelected: false,
  categoryName: "",
  orderProduct: null,
  deliveryLocations: [],
  mobileShowLogin: false,
  mobileShowSignUp: false,
  userOrders: [],
};

function shopReducer(state = initialState, action) {
  switch (action.type) {
    case "toggleLogin":
      return {
        ...state,
        showLogin: !state.showLogin,
      };
    case "addToCart":
      return {
        ...state,
        cart: [
          ...state.cart.filter((item) => item.id !== state.selectedSneaker.id),
          state.selectedSneaker,
        ],
        selectedSneaker: null,
      };

    case "authenticateUser":
      return {
        ...state,
        auth: action.payload,
      };
    case "emptyCart":
      return {
        ...state,
        cart: [],
      };
    case "signOut":
      return {
        ...state,
        auth: null,
      };
    case SET_SCREEN:
      return {
        ...state,
        currentMobileScreen: action.payload,
        // mobileProductSelect: null,
        mobileSelectedCategory: [],
      };
    case SELECT_PRODUCT:
      return {
        ...state,
        mobileProductSelect: action.payload,
        productName: action.payload?.product,
      };
    case TOGGLE_ORDER_FORM:
      return {
        ...state,
        showOrderForm: !state.showOrderForm,
        orderProduct: action?.payload,
      };
    case GET_PRODUCTS:
      return {
        ...state,
        mobileProducts: action.payload,
        orginalMobileProducts: action.payload,
      };
    case UPDATE_PRODUCTS:
      return {
        ...state,
        mobileProducts: action.payload,
      };
    case GET_CATEGORIES:
      return {
        ...state,
        mobileCategories: [...state.mobileCategories, ...action.payload],
        originalMobileCategories: [...state.mobileCategories, ...action.payload],
      };
    case "updateMobileCategories":
      return {
        ...state,
        mobileCategories: [...action.payload]
      }
    case "selectedMobileCategory":
      return {
        ...state,
        mobileSelectedCategory: [
          ...state.mobileSelectedCategory,
          ...state.mobileProducts.filter((items) =>
            [items.type1, items.type2, items.type3].includes(action.payload)
          ),
        ],
        categorySelected: !state.categorySelected,
        categoryName: action.payload,
      };
    case "categorySelectedPop":
      return {
        ...state,
        mobileSelectedCategory: [],
        categorySelected: !state.categorySelected,
        categoryName: "",
      };
    case "selectExploreProduct":
      return {
        ...state,
        exploreProductSelected: action.payload,
        productName: action.payload?.product,
      };
    case "getDeliveryRate":
      return {
        ...state,
        deliveryLocations: action.payload,
      };
    case "toggleMobileLogin":
      return {
        ...state,
        showMobileLogin: !state.showMobileLogin,
      };
    case "toggleMobileSignUp":
      return {
        ...state,
        mobileShowSignUp: !state.mobileShowSignUp,
      };
    case "getUserOrders":
      return {
        ...state,
        userOrders: [...action.payload],
      };
    default:
      return state;
  }
}

export default shopReducer;

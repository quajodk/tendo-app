import sneakers from "../../assets/shops.json";
import ExploreMobile from "../../layout/mobile/ExploreMobile";
import HelpMobile from "../../layout/mobile/HelpMobile";
import MobileCategories from "../../layout/mobile/MobileCategories";
import ProductListing from "../../layout/mobile/ProductListing";
import PromoMobile from "../../layout/mobile/PromoMobile";

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
  mobileExploreProducts: [],
  originalMobileExploreProducts: [],
  orginalMobileProducts: [],
  mobileCategories: [],
  originalMobileCategories: [],
  mobileSelectedCategory: [],
  originalMobileSelectedCategory: [],
  categorySelected: false,
  categoryName: "",
  orderProduct: null,
  deliveryLocations: [],
  mobileShowLogin: false,
  mobileShowSignUp: false,
  userOrders: [],
  numOfUserOrders: 0,
  numOfCancelledUserOrders: 0,
  numOfSuccessUserOrders: 0,
  totalEarned: 0,
  isSearch: false,
  searchTerm: "",
  copyOfProducts: [],
  copyOfExploreProducts: [],
  copyOfCategories: [],
};

function shopReducer(state = initialState, action) {
  switch (action.type) {
    case "SelectSneaker":
      return {
        ...state,
        selectedSneaker: { ...action.payload, qty: 1 },
      };
    case "unselectSneaker":
      return {
        ...state,
        selectedSneaker: null,
      };
    case "increaseQty":
      const cart = state.cart;
      cart[action.payload] = {
        ...cart[action.payload],
        qty: cart[action.payload].qty + 1,
      };
      return {
        ...state,
        cart: cart,
      };
    case "decreaseQty":
      const _cart = state.cart;
      _cart[action.payload] = {
        ..._cart[action.payload],
        qty: _cart[action.payload].qty - 1,
      };
      return {
        ...state,
        cart: _cart,
      };
    case "removeSneaker":
      return {
        ...state,
        cart: [...state.cart.filter((el) => el.id !== action.payload.id)],
      };
    case "SelectCategory":
      const hasIt = state.selectedCategories.find(
        (el) => el === action.payload
      );
      return {
        ...state,
        selectedCategories: hasIt
          ? [...state.selectedCategories.filter((el) => el !== action.payload)]
          : [...state.selectedCategories, action.payload],
      };
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
    case "setScreen":
      return {
        ...state,
        currentMobileScreen: action.payload,
        // mobileProductSelect: null,
        mobileSelectedCategory: [],
      };
    case "selectMobileProduct":
      return {
        ...state,
        mobileProductSelect: action.payload,
        productName: action.payload?.product,
      };
    case "toggleOrderForm":
      return {
        ...state,
        orderProduct: action?.payload,
      };
    case "getMobileProducts":
      return {
        ...state,
        mobileProducts: action.payload,
        orginalMobileProducts: action.payload,
      };
    case "saveCopyOfMobileProducts":
      return {
        ...state,
        copyOfProducts: action.payload,
      };
    case "getMobileExploreProducts":
      return {
        ...state,
        mobileExploreProducts: action.payload,
        originalMobileExploreProducts: action.payload,
      };
    case "saveCopyOfExploreProducts":
      return {
        ...state,
        copyOfExploreProducts: action.payload,
      };
    case "updateMobileProducts":
      return {
        ...state,
        mobileProducts: action.payload,
      };
    case "updateMobileExploreProducts":
      return {
        ...state,
        mobileExploreProducts: action.payload,
      };
    case "getMobileCategory":
      return {
        ...state,
        mobileCategories: [...action.payload],
        originalMobileCategories: [...action.payload],
      };
    case "saveCopyOfMobileCategory":
      return {
        ...state,
        copyOfCategories: action.payload,
      };
    case "updateMobileCategories":
      return {
        ...state,
        mobileCategories: [...action.payload],
      };
    case "selectedMobileCategory":
      return {
        ...state,
        mobileSelectedCategory: [
          ...state.mobileProducts.filter((items) =>
            [
              items.type1,
              items.type2,
              items.type3,
              items.type4,
              items.type5,
              items.type6,
            ].includes(action.payload)
          ),
        ],
        originalMobileSelectedCategory: [
          ...state.mobileProducts.filter((items) =>
            [
              items.type1,
              items.type2,
              items.type3,
              items.type4,
              items.type5,
              items.type6,
            ].includes(action.payload)
          ),
        ],
        // categorySelected: !state.categorySelected,
        categoryName: action.payload,
      };
    case "updateSelectedMobileCategory":
      return {
        ...state,
        mobileSelectedCategory: [...action.payload],
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
        mobileShowLogin: !state.mobileShowLogin,
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
    case "closeOrderForm":
      return {
        ...state,
        showOrderForm: !state.showOrderForm,
      };
    case "getNumOfUserOrders":
      return {
        ...state,
        numOfUserOrders: action.payload,
      };
    case "getNumOfCancelledUserOrders":
      return {
        ...state,
        numOfCancelledUserOrders: action.payload,
      };
    case "getNumOfSuccessfulUserOrders":
      return {
        ...state,
        numOfSuccessUserOrders: action.payload,
      };
    case "getUserEarning":
      return {
        ...state,
        totalEarned: action.payload,
      };
    case "setIsSearch":
      return {
        ...state,
        isSearch: action.payload,
      };
    case "onSearch":
      return {
        ...state,
        searchTerm: action.payload,
      };
    default:
      return state;
  }
}

export default shopReducer;

import ExploreMobile from "../../layout/mobile/ExploreMobile";
import HelpMobile from "../../layout/mobile/HelpMobile";
import MobileCategories from "../../layout/mobile/MobileCategories";
import ProductListing from "../../layout/mobile/ProductListing";
import PromoMobile from "../../layout/mobile/PromoMobile";

const initialState = {
  showLogin: false,

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
  totalCashOut: 0,
  promotions: [],
  promoProducts: [],
  originalPromoProducts: [],
  promoName: "",
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
    case "getPromotions":
      return {
        ...state,
        promotions: [...action.payload],
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
            [items.type1, items.type2, items.type3].includes(action.payload)
          ),
        ],
        originalMobileSelectedCategory: [
          ...state.mobileProducts.filter((items) =>
            [items.type1, items.type2, items.type3].includes(action.payload)
          ),
        ],
        // categorySelected: !state.categorySelected,
        categoryName: action.payload,
      };
    case "setPromoProducts":
      return {
        ...state,
        promoProducts: [
          ...state.mobileProducts.filter((items) =>
            [
              items.type4,
              items.type5,
              items.type6,
              items.type7,
              items.type8,
            ].includes(action.payload)
          ),
        ],
        originalPromoProducts: [
          ...state.mobileProducts.filter((items) =>
            [items.type1, items.type2, items.type3].includes(action.payload)
          ),
        ],
        promoName: action.payload,
      };
    case "updateSelectedMobileCategory":
      return {
        ...state,
        mobileSelectedCategory: [...action.payload],
      };
    case "updatePromoProducts":
      return {
        ...state,
        promoProducts: [...action.payload],
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
    case "setTotalCashOut":
      return {
        ...state,
        totalCashOut: action.payload,
      };
    default:
      return state;
  }
}

export default shopReducer;

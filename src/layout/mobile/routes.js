import ExploreMobile from "./ExploreMobile";
import HelpMobile from "./HelpMobile";
import MobileCategories from "./MobileCategories";
import PromoMobile from "./PromoMobile";
import HomeTab from "./tabs/HomeTab";

export const routes = [
    { component: <HomeTab />, title: "Home" },
    { component: <MobileCategories />, title: "Categories" },
    { component: <ExploreMobile />, title: "Explore" },
    { component: <PromoMobile />, title: "Promotions" },
    { component: <HelpMobile />, title: "Help" },
]
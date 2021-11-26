import ExploreMobile from "./ExploreMobile";
import HelpMobile from "./HelpMobile";
import MobileCategories from "./MobileCategories";
import MobilePromo from "./MobilePromo";
import HomeTab from "./tabs/HomeTab";

export const routes = [
  { component: HomeTab, title: "Home", path: "/", exact: true },
  {
    component: MobileCategories,
    title: "Categories",
    path: "/categories",
    exact: true,
  },
  { component: ExploreMobile, title: "Explore", path: "/explore", exact: true },
  {
    component: MobilePromo,
    title: "Promotions",
    path: "/promotions",
    exact: true,
  },
  { component: HelpMobile, title: "Account", path: "/account", exact: true },
];

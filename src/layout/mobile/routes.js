import ExploreMobile from "./ExploreMobile";
import HelpMobile from "./HelpMobile";
import PromoMobile from "./PromoMobile";
import CategoryTab from "./tabs/CategoryTab";
import HomeTab from "./tabs/HomeTab";

export const routes = [
  { component: HomeTab, title: "Home", path: "/", exact: true },
  {
    component: CategoryTab,
    title: "Categories",
    path: "/categories",
    exact: true,
  },
  { component: ExploreMobile, title: "Explore", path: "/explore", exact: true },
  {
    component: PromoMobile,
    title: "Promotions",
    path: "/promotions",
    exact: true,
  },
  { component: HelpMobile, title: "Account", path: "/account", exact: true },
];

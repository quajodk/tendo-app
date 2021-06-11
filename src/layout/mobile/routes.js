import ExploreMobile from "./ExploreMobile";
import HelpMobile from "./HelpMobile";
import PromoMobile from "./PromoMobile";
import CategoryTab from "./tabs/CategoryTab";
import HomeTab from "./tabs/HomeTab";

export const routes = [
  { component: HomeTab, title: "Home", exact: true },
  { component: CategoryTab, title: "Categories", exact: true },
  { component: ExploreMobile, title: "Explore", exact: true },
  { component: PromoMobile, title: "Promotions", exact: true },
  { component: HelpMobile, title: "Account", exact: true },
];

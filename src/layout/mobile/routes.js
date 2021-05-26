import ExploreMobile from "./ExploreMobile";
import HelpMobile from "./HelpMobile";
import PromoMobile from "./PromoMobile";
import CategoryTab from "./tabs/CategoryTab";
import HomeTab from "./tabs/HomeTab";

export const routes = [
  { component: HomeTab, title: "Home", exact: true },
  { component: CategoryTab, title: "Categories" },
  { component: ExploreMobile, title: "Explore" },
  { component: PromoMobile, title: "Promotions" },
  { component: HelpMobile, title: "Account" },
];

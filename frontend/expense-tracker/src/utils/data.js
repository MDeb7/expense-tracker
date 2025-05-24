import {
    LuLayoutDashboard,
    LuWalletMinimal,
    LuLogOut,
    LuHandCoins
} from "react-icons/lu";

export const SIDE_MENU_ITEMS = [
    {
        id: "01",
        label: "Dashboard",
        icon: LuLayoutDashboard,
        path: "/dashboard",
    },
    {
        id: "02",
        label: "Income",
        icon: LuWalletMinimal,
        path: "/income",
    },
    {
        id: "03",
        label: "Expense",
        icon: LuHandCoins,
        path: "/expense",
    },
    {
        id: "06",
        label: "Logout",
        icon: LuLogOut,
        path: "/logout",
    },
];
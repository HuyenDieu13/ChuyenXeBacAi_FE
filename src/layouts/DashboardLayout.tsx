import { useEffect, useState } from "react";
import {
    LayoutDashboard,
    Users,
    UserCircle,
    HandHeart,
    FileBarChart2,
    LogOut,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import { Outlet, useNavigate, useLocation } from "@tanstack/react-router";
import logo from "@/assets/Logo.png";
import avatarDefault from "@/assets/images/Home/avatar.jpg";
import { useLogout } from "@/hooks/auth.hooks";
const menuItems = [
    { key: "dashboard", label: "Tổng quan", icon: <LayoutDashboard size={20} /> },
    { key: "campaigns", label: "Chiến dịch", icon: <HandHeart size={20} /> },
    { key: "volunteers", label: "Tình nguyện viên", icon: <Users size={20} /> },
    { key: "users", label: "Người dùng", icon: <UserCircle size={20} /> },
    { key: "fund", label: "Quỹ hành trình", icon: <HandHeart size={20} /> },
    { key: "reports", label: "Báo cáo thống kê", icon: <FileBarChart2 size={20} /> },
];

function getMenuStateFromPath(pathname: string) {
    const parts = pathname.split("/").filter(Boolean);
    const parentKey = parts[1] || "dashboard";
    return { selectedKey: parentKey };
}

const DashboardLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedKey, setSelectedKey] = useState("dashboard");
    const [collapsed, setCollapsed] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const logout = useLogout();
    useEffect(() => {
        const { selectedKey } = getMenuStateFromPath(location.pathname);
        setSelectedKey(selectedKey);
    }, [location.pathname]);

    const handleMenuClick = (key: string) => {
        setSelectedKey(key);
        navigate({ to: `/admin/${key}` });
    };

    const handleLogout = () => {
        logout();
    };

    return (
        <div className="flex h-screen bg-[#F7F9FB] overflow-hidden">
            {/* ===================== SIDEBAR ===================== */}
            <aside
                className={`relative flex flex-col transition-all duration-300 ${collapsed ? "w-20" : "w-64"
                    } rounded-r-[25px] shadow-2xl bg-gradient-to-b from-[#355C7D] via-[#355C7D] to-[#26415D]`}
            >
                {/* LOGO + BRAND */}
                <div className="flex flex-col items-center justify-center py-3 border-b border-white/20 space-y-1">
                    <img
                        src={logo}
                        alt="Logo"
                        className="w-9 h-9 drop-shadow-md"
                    />
                    {!collapsed && (
                        <div className="text-center leading-tight">
                            <h1 className="text-[15px] font-semibold text-white hover:text-[#FFD166] transition-colors duration-200">
                                CXBA Admin
                            </h1>
                            <p className="text-[11px] text-white/70 italic">
                                Lan tỏa yêu thương
                            </p>
                        </div>
                    )}
                </div>


                {/* MENU ITEMS */}
                <nav className="flex-1 mt-5 space-y-1 px-2">
                    {menuItems.map((item) => {
                        const active = selectedKey === item.key;
                        return (
                            <div
                                key={item.key}
                                onClick={() => handleMenuClick(item.key)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 ${active
                                        ? "bg-[#FFD166]/20 border-l-4 border-[#FFD166] text-[#FFD166] shadow-sm"
                                        : "text-white/80 hover:bg-white/10 hover:text-white"
                                    }`}
                            >
                                <div className="flex items-center justify-center w-6">
                                    {item.icon}
                                </div>
                                {!collapsed && (
                                    <span className="text-sm font-medium">{item.label}</span>
                                )}
                            </div>
                        );
                    })}
                </nav>

                {/* COLLAPSE BUTTON */}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="absolute -right-3 top-1/2 transform -translate-y-1/2 bg-white shadow-md rounded-full w-6 h-6 flex items-center justify-center hover:scale-110 transition"
                >
                    {collapsed ? (
                        <ChevronRight className="text-[#355C7D]" size={16} />
                    ) : (
                        <ChevronLeft className="text-[#355C7D]" size={16} />
                    )}
                </button>

                {/* LOGOUT SECTION */}
                <div className="p-4 border-t border-white/10">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-white/80 hover:text-red-400 hover:bg-white/10 transition"
                    >
                        <LogOut size={18} />
                        {!collapsed && <span>Đăng xuất</span>}
                    </button>
                </div>
            </aside>

            {/* ===================== MAIN CONTENT ===================== */}
            <div className="flex-1 flex flex-col">
                {/* HEADER */}
                <header className="h-[72px] bg-white shadow-sm flex items-center justify-between px-8 sticky top-0 z-10">
                    <h2 className="text-[20px] font-semibold text-[#355C7D] tracking-wide flex items-center">
                        Trang quản trị
                    </h2>

                    <div className="relative flex items-center gap-2">
                        <button
                            onClick={() => setShowUserMenu(!showUserMenu)}
                            className="flex items-center gap-2 cursor-pointer"
                        >
                            <img
                                src={avatarDefault}
                                alt="Admin Avatar"
                                className="w-9 h-9 rounded-full border-2 border-[#355C7D]"
                            />
                            <span className="text-gray-700 font-medium">Admin</span>
                        </button>

                        {showUserMenu && (
                            <div className="absolute right-0 mt-3 bg-white border rounded-xl shadow-lg w-40 py-2 animate-fadeIn">
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 px-4 py-2 w-full text-sm text-red-500 hover:bg-red-50"
                                >
                                    <LogOut size={16} /> Đăng xuất
                                </button>
                            </div>
                        )}
                    </div>

                    {/* subtle bottom border highlight */}
                    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#FFD166]/70"></div>
                </header>

                {/* MAIN OUTLET */}
                <main className="flex-1 overflow-y-auto bg-[#F7F9FB] p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;

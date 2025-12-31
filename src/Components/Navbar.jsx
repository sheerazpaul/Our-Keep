import React, { useState, useEffect } from "react";
import {
    // Menu,
    Search,
    Grid,
    LayoutGrid,
    Settings,
    X,
    LogIn,
    UserPlus,
    LogOut,
    User,
} from "lucide-react";
import { Link } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const Navbar = ({ onSearch, onMenuToggle }) => {
    const [showSearch, setShowSearch] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [gridView, setGridView] = useState(true);
    const [showDropdown, setShowDropdown] = useState(false);
    const [user, setUser] = useState(null);

    const auth = getAuth();

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsub();
    }, []);

    const handleLogout = async () => {
        await signOut(auth);
        setShowDropdown(false);
    };

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchText(value);
        onSearch && onSearch(value);
    };

    return (
        <nav className="w-full h-16 sm:h-20 bg-black border-b border-cyan-400 shadow-sm px-4 sm:px-8 flex items-center justify-between relative z-50">
            <div className="flex items-center gap-4">
                {/* <button onClick={onMenuToggle} className="p-2 rounded-full hover:bg-cyan-900">
                    <Menu size={22} />
                </button> */}

                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-400 flex items-center justify-center">
                        <span className="text-xl font-bold text-black">K</span>
                    </div>
                    <h1 className="text-xl sm:text-2xl italic font-bold hidden sm:block text-cyan-400">
                        Keep Notes
                    </h1>
                </div>
            </div>

            <div className="hidden md:flex items-center gap-3 bg-cyan-900 rounded-lg px-4 py-2 w-[40%]">
                <Search size={20} className="text-cyan-400" />
                <input
                    type="text"
                    value={searchText}
                    onChange={handleSearch}
                    placeholder="Search your notes"
                    className="bg-transparent outline-none w-full text-white placeholder-cyan-300"
                />
            </div>

            <div className="flex items-center gap-2 relative">
                <button
                    onClick={() => setShowSearch(!showSearch)}
                    className="p-2 rounded-full hover:bg-cyan-900 md:hidden"
                >
                    {showSearch ? <X size={20} className="text-cyan-400" /> : <Search size={20} className="text-cyan-400" />}
                </button>

                <button
                    onClick={() => setGridView(!gridView)}
                    className="p-2 rounded-full hover:bg-cyan-900 hidden sm:flex"
                >
                    {gridView ? <Grid size={20} className="text-cyan-400" /> : <LayoutGrid size={20} className="text-cyan-400" />}
                </button>

                <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="p-2 rounded-full hover:bg-cyan-900"
                >
                    <Settings size={20} className="text-cyan-400" />
                </button>

                {showDropdown && (
                    <div className="absolute right-0 top-12 w-52 bg-black border border-cyan-400 rounded-xl shadow-lg">
                        {user ? (
                            <>
                                <div className="px-4 py-3 border-b border-cyan-400 text-sm text-cyan-400 flex items-center gap-1">
                                    <User size={16} /> {user.email}
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="w-full px-4 py-3 text-sm hover:bg-cyan-900 text-cyan-400 flex items-center gap-1"
                                >
                                    <LogOut size={16} /> Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="block px-4 py-3 hover:bg-cyan-900 text-cyan-400 flex items-center gap-1">
                                    <LogIn size={16} /> Login
                                </Link>
                                <Link to="/register" className="block px-4 py-3 hover:bg-cyan-900 text-cyan-400 flex items-center gap-1">
                                    <UserPlus size={16} /> Register
                                </Link>
                            </>
                        )}
                    </div>
                )}
            </div>

            {showSearch && (
                <div className="absolute top-16 left-0 w-full bg-black border-b border-cyan-400 px-4 py-3 md:hidden">
                    <div className="flex items-center gap-3 bg-cyan-900 rounded-lg px-4 py-2">
                        <Search size={20} className="text-cyan-400" />
                        <input
                            type="text"
                            value={searchText}
                            onChange={handleSearch}
                            placeholder="Search your notes"
                            className="bg-transparent outline-none w-full text-white placeholder-cyan-300"
                        />
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;

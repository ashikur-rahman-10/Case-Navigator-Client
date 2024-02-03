import React from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import CustomLoader from "../CustomLoader/CustomLoader";

const NavigationBar = () => {
    const { user, loading, logout } = useAuth();
    if (loading) {
        return <CustomLoader></CustomLoader>;
    }
    const handleLogout = () => {
        logout()
            .then((result) => {
                navigate("/");
            })
            .catch((error) => {});
    };

    let navbarOptions;
    navbarOptions = (
        <>
            {user ? (
                <>
                    <li>
                        <Link to={"/create-case"}>Create Case</Link>
                    </li>

                    <li>
                        <Link to={"/created-case"}>Created Cases</Link>
                    </li>
                </>
            ) : (
                <>
                    <li>
                        <a>Item 2</a>
                    </li>

                    <li>
                        <a>Item 4</a>
                    </li>
                </>
            )}
        </>
    );

    return (
        <div>
            <div className="navbar bg-base-100 w-full">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </label>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content  mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                        >
                            {navbarOptions}
                        </ul>
                    </div>
                    <Link to={"/"} className="btn btn-ghost text-xl">
                        <img
                            className="lg:max-h-[40px] h-7"
                            src={logo}
                            alt=""
                        />
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 flex gap-2">
                        {navbarOptions}
                    </ul>
                </div>
                <div className="navbar-end pr-4">
                    {!user ? (
                        <Link
                            to={"/login"}
                            className="hover:bg-slate-50 hover:text-sky-600 px-2 py-1 rounded-lg"
                        >
                            Login
                        </Link>
                    ) : (
                        <span>
                            <div className="dropdown dropdown-end">
                                <div
                                    tabIndex={0}
                                    role="button"
                                    className="btn btn-ghost btn-circle avatar"
                                >
                                    <div className="w-10 rounded-full border border-green-400">
                                        <img
                                            className="w-10"
                                            src={user?.photoURL}
                                        />
                                    </div>
                                </div>
                                <ul
                                    tabIndex={0}
                                    className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-56"
                                >
                                    <span>
                                        <div className="text-center">
                                            <img
                                                className="w-full"
                                                src={user?.photoURL}
                                                alt=""
                                            />
                                            <p className="text-center text-xl">
                                                {user?.displayName}
                                            </p>
                                            <p>{user?.email}</p>
                                            <p>ID No: {user?.idNumber}</p>
                                        </div>
                                    </span>
                                    <button
                                        onClick={handleLogout}
                                        className=" btn btn-xs mt-2  hover:bg-red-300"
                                    >
                                        Logout
                                    </button>
                                </ul>
                            </div>
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NavigationBar;

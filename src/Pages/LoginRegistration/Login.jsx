import React from "react";
import banner from "../../assets/loginBanner.png";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <div>
            <div className="w-full">
                <img className="mx-auto" src={banner} alt="" />

                <Tabs className="text-center pt-8 max-w-4xl mx-auto px-4">
                    <TabList>
                        <Tab>Police Login</Tab>
                        <Tab>Citizen Corner</Tab>
                    </TabList>

                    <TabPanel>
                        <form className="w-full max-w-sm mx-auto  px-4 pb-4 rounded-md pt-0 shadow-2xl my-8">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    placeholder="email"
                                    className="input input-bordered input-accent"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="password"
                                    className="input input-bordered input-accent"
                                    required
                                />
                            </div>
                            <label className="label">
                                <p className="label-text-alt link link-hover">
                                    Forgot password?
                                </p>
                            </label>
                            <label className="">
                                <Link
                                    to={"/register"}
                                    className="label-text-alt link link-hover text-warning"
                                >
                                    Register
                                </Link>
                            </label>
                            <div className="form-control mt-6">
                                <button className="btn btn-accent text-white">
                                    Login
                                </button>
                            </div>
                        </form>
                    </TabPanel>
                    <TabPanel>
                        <h2>Any content 2</h2>
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    );
};

export default Login;

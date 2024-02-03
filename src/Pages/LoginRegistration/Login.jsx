import React, { useState } from "react";
import banner from "../../assets/loginBanner.png";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";

const Login = () => {
    const [show, setShow] = useState(false);
    const [error, setError] = useState(false);
    const { loginWithPass, passwordReset } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        loginWithPass(data.email, data.password)
            .then(async (result) => {
                setError("");
                Swal.fire({
                    icon: "success",
                    title: "User Login Successfully",
                    showConfirmButton: false,
                    timer: 1500,
                });
                console.log({ result });
                setError("");
            })
            .catch((error) => {
                setError(error.message);
                console.log(error.message);
            });
    };

    const handleForgetPass = () => {
        Swal.fire({
            title: "Submit your email",
            input: "email",
            inputAttributes: {
                autocapitalize: "off",
            },
            showCancelButton: true,
            confirmButtonText: "Submit",
            showLoaderOnConfirm: true,
            preConfirm: (email) => {
                passwordReset(email)
                    .then((result) => {
                        Swal.fire({
                            title: "Please check your Inbox!",
                            text: "We sent you a Password reset email",
                        });
                    })
                    .catch((error) => {
                        Swal.fire({
                            title: "Please check your email!",
                            text: "You provide a wrong email.",
                        });
                    });
            },
            allowOutsideClick: () => !Swal.isLoading(),
        }).then((result) => {
            if (result.isConfirmed) {
            }
        });
    };
    // Scroll to top
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
    });
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
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="w-full max-w-sm mx-auto  px-4 pb-4 rounded-md pt-0 shadow-2xl my-8"
                        >
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    placeholder="email"
                                    {...register("email")}
                                    className="input input-bordered input-accent"
                                    required
                                />
                            </div>
                            <div className="form-control relative">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type={show ? "text" : "password"}
                                    placeholder="password"
                                    {...register("password")}
                                    className="input input-bordered input-accent"
                                    required
                                />
                                <span
                                    onClick={() => {
                                        setShow(!show);
                                    }}
                                    className="absolute bottom-4 right-3 "
                                >
                                    {show ? (
                                        <FaEyeSlash></FaEyeSlash>
                                    ) : (
                                        <FaEye></FaEye>
                                    )}
                                </span>
                            </div>
                            <label className="label">
                                <p
                                    onClick={handleForgetPass}
                                    className="label-text-alt link link-hover"
                                >
                                    Forgot password?
                                </p>
                            </label>
                            <div>
                                <p className="text-xs text-red-600 font-semibold">
                                    {error}
                                </p>
                            </div>
                            <label className="">
                                <Link
                                    to={"/register"}
                                    className="label-text-alt link link-hover text-warning"
                                >
                                    Register
                                </Link>
                            </label>
                            <div className="form-control mt-6">
                                <button
                                    type="submit"
                                    value={"Register"}
                                    className="btn btn-accent text-white"
                                >
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

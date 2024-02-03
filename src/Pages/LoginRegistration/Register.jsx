import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import loader from "../../assets/Rhombus.gif";

const Register = () => {
    const [show, setShow] = useState(false);
    const [error, setError] = useState(false);
    const [wait, setWait] = useState(false);
    const { createUser, updateUser, logout } = useAuth();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const imageHostingUrl = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_IMAGE_HOSTING_KEY
    }`;

    const onSubmit = (data) => {
        const { name, email, password, photo, confirmPass, idNumber } = data;

        if (password === confirmPass) {
            const formData = new FormData();
            setWait(true);
            formData.append("image", data.image[0]);
            fetch(imageHostingUrl, {
                method: "POST",
                body: formData,
            })
                .then((res) => res.json())
                .then((imgResponse) => {
                    if (imgResponse.success) {
                        const imgUrl = imgResponse.data.display_url;
                        const savedUser = {
                            name,
                            email,
                            photoURL: imgUrl,
                            idNumber,
                            role: "police",
                        };

                        createUser(email, password)
                            .then((result) => {
                                const loggedUser = result.user;
                                updateUser(name, imgUrl)
                                    .then((result) => {
                                        fetch(
                                            "https://case-navigator.vercel.app/users",
                                            {
                                                method: "POST",
                                                headers: {
                                                    "Content-Type":
                                                        "application/json",
                                                },
                                                body: JSON.stringify(savedUser),
                                            }
                                        );

                                        Swal.fire({
                                            icon: "success",
                                            title: "User Created Successfully Please Login to continue",
                                            showConfirmButton: false,
                                            timer: 3200,
                                        });

                                        setError("");
                                        setWait(false);

                                        logout()
                                            .then((result) => {
                                                navigate("/login");
                                            })
                                            .catch((error) => {
                                                setError(error.message);
                                                setWait(false);
                                            });
                                    })
                                    .catch((error) => {
                                        console.log(error.message);
                                    });
                                console.log(loggedUser);
                            })
                            .catch((error) => {
                                console.log(error.message);
                                setWait(false);
                                setError(error.message);
                            });
                    }
                });
        } else {
            Swal.fire({
                icon: "error",
                title: "Password is not matching",
                showConfirmButton: false,
                timer: 2000,
            });
            console.log(savedUser);
            return;
        }
        console.log(data);
    };

    if (wait) {
        return (
            <div className="absolute z-30 top-[60px] left-0 w-full bg-white min-h-[91vh] flex flex-col items-center justify-center">
                <h1 className="text-2xl md:text-3xl">
                    Please Wait few seconds.
                </h1>
                <p className="text-xl">Registering your profile.</p>
                <img src={loader} alt="" />
            </div>
        );
    }

    // Scroll to top
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
    });
    return (
        <div>
            <div className="w-full min-h-screen px-4 max max-w-4xl mx-auto flex items-center justify-center">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="w-full max-w-sm lg:max-w-3xl mx-auto  px-4 pb-8 rounded-md pt-0 shadow-2xl my-8"
                >
                    <div className="w-full lg:max-w-3xl lg:flex justify-between gap-4 pt-4">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                type="text"
                                placeholder="name"
                                className="input input-bordered input-accent w-full"
                                required
                                {...register("name")}
                            />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="email"
                                className="input input-bordered input-accent w-full"
                                required
                                {...register("email")}
                            />
                        </div>
                    </div>
                    <div className="w-full  max-w-3xl lg:flex justify-between gap-4">
                        <div className="form-control relative w-full">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type={show ? "text" : "password"}
                                placeholder="password"
                                className="input input-bordered input-accent w-full"
                                required
                                {...register("password")}
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
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">
                                    Confirm Password
                                </span>
                            </label>
                            <input
                                type={show ? "text" : "password"}
                                placeholder="confirm password"
                                className="input input-bordered input-accent w-full"
                                required
                                {...register("confirmPass")}
                            />
                        </div>
                    </div>
                    <div className="w-full max-w-3xl lg:flex justify-between gap-4">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Id number</span>
                            </label>
                            <input
                                type="text"
                                placeholder="id"
                                className="input input-bordered input-accent w-full"
                                required
                                {...register("idNumber")}
                            />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Image</span>
                            </label>
                            <input
                                type="file"
                                className="file-input file-bordered input-accent w-full"
                                required
                                {...register("image")}
                            />
                        </div>
                    </div>

                    <div className="form-control w-full ">
                        <input
                            type="submit"
                            value={"Register"}
                            className="input input-bordered w-full hover:bg-transparent hover:text-info bg-info text-white my-7 input-info cursor-pointer"
                        />
                    </div>
                    <div>
                        <p className="text-xs text-red-600 font-semibold text-center pb-2">
                            {error}
                        </p>
                    </div>
                    <div className="w-full flex justify-center">
                        <Link
                            to={"/login"}
                            className="text-sm hover:underline text-warning font-medium"
                        >
                            Login
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;

import React from "react";
import { Link } from "react-router-dom";
import { Animated } from "react-animated-css";
import runnerImg from "../images/istockphoto.jpeg";

const Home = () => {
    return (
        <>
            <div className="container mt-20">
                <div className="flex">
                    <Animated animationIn="rubberBand">
                        <h1 className="text-white text-7xl underline ">
                            Welcome to Run Fit
                        </h1>
                    </Animated>
                </div>
                <div className="flex mt-12 flex-col md:flex-row justify-between ">
                    <div className="flex md:w-1/2 sm:order-last md:order-first">
                        <Animated animationIn="fadeInLeft">
                            <p class="text-white sm:mt-10 md:mt-16 sm:text-lg md:text-3xl">
                                At Run Fit we want to make it easy to locate
                                where runners meetup to run as a group. Great
                                place to make new friends with the common
                                interest of running and fitness. So please login
                                in if you have an account already.If not, no
                                problem lets get you signed up. Good Luck and
                                get running.
                            </p>
                        </Animated>
                    </div>

                    <div className="flex md:w-1/2 ">
                        <Animated animationIn="fadeInRight">
                            <img
                                className="img-fluid rounded-full shadow object-cover"
                                src={runnerImg}
                                alt=" A person running on the street"
                            />
                        </Animated>
                    </div>
                </div>

                <div className="flex flex-row mt-8 md:w-1/2 justify-center   ">
                    <Animated animationIn="fadeInDown">
                        <button className="mx-3 w-28 border-4 rounded-full hover:bg-gray-400">
                            <Link className="text-white" to="/signup">
                                Sign Up
                            </Link>
                        </button>
                        <button className="mx-3  w-28 border-4 rounded-full">
                            <Link className="text-white" to="/login">
                                LogIn
                            </Link>
                        </button>
                    </Animated>
                </div>
            </div>
        </>
    );
};

export default Home;

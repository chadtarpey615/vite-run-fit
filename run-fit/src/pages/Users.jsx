import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../features/auth/authSlice";
import Spinner from "../components/Spinner";
import Card from "../components/Card";
import image from "..//images/avatar.jpeg";
import PeopleIcon from "@mui/icons-material/People";

const Users = () => {
    const { user, users, isLoading } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const getAllUsers = async () => {
        await dispatch(getUsers());
    };

    const addFriend = async (friend, data) => {
        console.log("friends", data);
        await dispatch(addFriend({ friend, data }));
    };

    useEffect(() => {
        getAllUsers();
    }, []);
    if (isLoading) {
        return <Spinner />;
    }
    return (
        <div>
            <div className="flex justify-center text-white my-5">
                <h1 className="text-5xl font-bold animate-bounce">
                    Run Fit Users
                </h1>
            </div>

            <div className="relative flex h-auto  justify-center overflow-hidden py-6 sm:py-12 ">
                {users ? (
                    users.map((data) => (
                        <div className=" group relative cursor-pointer overflow-hidden bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:mx-auto sm:max-w-sm sm:rounded-lg sm:px-10">
                            <Card>
                                <div>
                                    <img
                                        className="absolute top-5 left-2 z-0 h-20 w-20 rounded-full bg-sky-500 "
                                        src={image}
                                        alt="Avatar"
                                    />
                                    <div className="relative top-2  space-x-4 flex flex-col items-start w-1/3 ml-4">
                                      
                                        <h1 className="space-y-6 pt-5 text-base leading-7 underline text-gray-600 transition-all duration-300 group-hover:text-blue">
                                                {data.username}
                                        </h1>

                                        <p className="space-y-4 pt-5 text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-blue">
                                            Events: {data.events.length}
                                        </p>
                                        <p className="space-y-6 pt-5 text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-blue">
                                            Friends: {data.friends.length}
                                        </p>
                                        <button
                                            className="space-y-6 pt-5 text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-blue"
                                            onClick={() =>
                                                addFriend(user, data)
                                            }
                                        >
                                            {user.username === data.username ? (
                                                <h4>You</h4>
                                            ) : (
                                                <>
                                                <PeopleIcon />
                                               <p>add friend</p> 
                                                </>
                                            )}
                                            
                                        </button>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    ))
                ) : (
                    <h1 className="text-white">No Users</h1>
                )}
            </div>
        </div>
    );
};

export default Users;


{/* <div class="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
  <img src="/img/beams.jpg" alt="" class="absolute top-1/2 left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2" width="1308" />
  <div class="group relative cursor-pointer overflow-hidden bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:mx-auto sm:max-w-sm sm:rounded-lg sm:px-10">
    <span class="absolute top-10 z-0 h-20 w-20 rounded-full bg-sky-500 transition-all duration-300 group-hover:scale-[10]"></span>
    <div class="relative z-10 mx-auto max-w-md">
      <span class="grid h-20 w-20 place-items-center rounded-full bg-sky-500 transition-all duration-300 group-hover:bg-sky-400">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-10 w-10 text-white transition-all">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
        </svg>
      </span>
      <div class="space-y-6 pt-5 text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-white/90">
        <p>Perfect for learning how the framework works, prototyping a new idea, or creating a demo to share online.</p>
      </div>
      <div class="pt-5 text-base font-semibold leading-7">
        <p>
          <a href="https://tailwindcss.com/docs" class="text-sky-500 transition-all duration-300 group-hover:text-white">Read the docs &rarr;</a>
        </p>
      </div>
    </div>
  </div>
</div> */}
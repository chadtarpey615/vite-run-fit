import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, addNewFriend } from "../../features/auth/authSlice";
import Spinner from "../components/Spinner";
import Card from "../components/Card";
import image from "..//images/avatar.jpeg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PeopleIcon from "@mui/icons-material/People";

const Users = () => {
    const { user, users, isLoading } = useSelector((state) => state.user);
    // console.log("user", user)
    const dispatch = useDispatch();

    const getAllUsers = async () => {
        await dispatch(getUsers());
    };

    const addFriend = async (friend, data) => {
       console.log("breakpoint", friend, data)
       await dispatch(addNewFriend({ friend, data }));
       // add toast for success and error
       if (addNewFriend) {
           toast.success("Friend Added!");
       } else {   
            toast.error("Friend Not Added!");
        }
    };

    useEffect(() => {
        getAllUsers();
    }, []);

    if (isLoading) {
        return <Spinner />;
    }
    return (
        <>
         {/* header  */}
        <div className="flex flex-col items-center py-2">
            <h1 className="text-7xl text-white">Users</h1>
         </div>  
            {/* card with user info */}
            <div className="flex flex-wrap items-start min-h-screen justify-center py-5 ">
              {users.map((users) => (
               <Card key={users._id}>
                <div className="flex flex-col items-center justify-center">
                 <img className="w-24 h-24 rounded-full" src={image} />
                 <h1 className="text-xl font-bold">{users.username}</h1>
                 <p className="text-sm text-gray-500">{users.email}</p>
                 <p className="text-sm text-gray-500">Events: {users.events.length}</p>
                 <p className="text-sm text-gray-500">Friends: {users.friends.length}</p>
                 {user._id === users._id ? (
                 <button disabled 
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        You
                 </button>
                  ) : (
                 <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
                   onClick={() => addFriend(users._id, user)}>
                        Add Friend
                 </button>
                    )}
               </div>
               <ToastContainer />
              </Card>

                ))}
           </div>
    
        </>
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




                        // <div className=" group relative cursor-pointer overflow-hidden bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:mx-auto sm:max-w-sm sm:rounded-lg sm:px-10">

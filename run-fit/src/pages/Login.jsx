import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { useSelector, useDispatch } from "react-redux";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { loginUser } from "../../features/auth/authSlice";

const Login = () => {
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    const history = useNavigate();
    const dispatch = useDispatch();
    const { user, isLoading } = useSelector((state) => state.user);

    const { email, password } = loginData;

    const onChange = (e) =>
        setLoginData({ ...loginData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();

        const userInfo = {
            email,
            password,
        };
        dispatch(loginUser(userInfo));

        history("/calendar");
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <div>
            <h1 className="flex justify-center mt-5 pt-5 text-4xl text-white">
                Log In
            </h1>
            <form onSubmit={(e) => onSubmit(e)}>
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Stack>
                        <div className="mb-4 ">
                            {/* <input type="text" placeholder="Type here" class="input input-bordered input-info w-full max-w-xs" /> */}
                            <label className="form-label text-white">
                                Email
                            </label>
                            <TextField
                                fullWidth
                                id="filled-basic"
                                label="Email"
                                variant="filled"
                                name="email"
                                onChange={(e) => onChange(e)}
                            />

                            <div id="emailHelp" className="form-text">
                                We'll never share your email with anyone else.
                            </div>
                        </div>
                        <div className="mb-3 rounded">
                            <label className="form-label text-white">
                                Password
                            </label>
                            <TextField
                                fullWidth
                                id="filled-basic"
                                label="Password"
                                variant="filled"
                                name="password"
                                onChange={(e) => onChange(e)}
                            />
                        </div>

                        <Link className="my-3 text-white" to="/signup">
                            Don't have an account? Sign Up here
                        </Link>
                        <Button
                            variant="contained"
                            size="large"
                            type="submit"
                            className="btn btn-primary"
                        >
                            Submit
                        </Button>
                    </Stack>
                </Grid>
            </form>
        </div>
    );
};

export default Login;

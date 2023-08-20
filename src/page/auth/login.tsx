import { useNavigate } from "react-router-dom";
import appUrl from "../../helper/string";
import { useState } from "react";
import { useAuth } from "../../provider/authProvider";

export default function Login() {

    const { setToken } = useAuth();

    const [userEmail, setUserEmail] = useState("");
    const [password, setPassword] = useState("");

    const nav = useNavigate();

    async function handleSubmit(event: any) {
        event.preventDefault();
        console.log(event);
        const loginData = {
            identity: userEmail,
            password: password,
        };

        try {
            const response = await fetch(appUrl.loginUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(loginData),
            });

            const responseBody: any = await response.json();
            console.log(responseBody);

            if (response.ok) {
                console.log('Sucess')
                setToken("this is a test token");


                nav("/dashboard", { replace: true });


                // API call succeeded, handle successful login// Redirect to the dashboard
            } else {
                // API call failed, handle login failure
                console.log("Login failed");
            }
        } catch (error) {
            // Handle network or other errors
            console.error("An error occurred:", error);
        }
    }

    return (
        <>
            <div
                className="flex min-h-full flex-1 flex-row px-20 py-20 lg:px-8 border rounded-xl border-gray-200 bg-black bg-opacity-70 backdrop-blur-sm"
            >
                <div className="sm:mx-auto sm:w-full sm:max-w-sm m-auto p-5">
                    <h2 className=" text-left text-2xl font-bold leading-9 tracking-tight">
                        Sign in to your account
                    </h2>
                </div>

                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit} method="POST">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 ">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    onChange={(e) => setUserEmail(e.target.value)}
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 text-black "
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 ">
                                    Password
                                </label>
                                <div className="text-sm">
                                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    onChange={(e) => setPassword(e.target.value)}
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-black sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Not a member?{' '}
                        <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            SignUp
                        </a>
                    </p>
                </div>
            </div>

        </>
    )
}


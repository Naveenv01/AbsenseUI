import { useNavigate } from "react-router-dom";
import { useAuth } from "../../provider/authProvider";

const Logout = () => {
    const { setToken } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        setToken();
        navigate("/", { replace: true });
    };



    return <><button onClick={handleLogout}  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"> Logout</button></>;
};

export default Logout;
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../provider/authProvider";

const Logout = () => {
    const { setToken } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        setToken();
        navigate("/", { replace: true });
    };



    return <><button onClick={handleLogout}> Logout</button></>;
};

export default Logout;
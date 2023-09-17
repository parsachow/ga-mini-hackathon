import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { setToken } from "../../utilities/user-service";

export default function LoginSuccess(){
    const params = useParams();
    const navigate = useNavigate();
    useEffect(()=>{
        if(params.token){
            setToken(params.token);
        }
        navigate('/');
    },[]);
}
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type RetranslationProps = {
    to: string
}

const RetranslatePage: React.FC<RetranslationProps> = ({ to }) => {
    const navigate = useNavigate();
    useEffect(() => {
        navigate(to);
    }, [])

    return (
        <></>
    );
}

export default RetranslatePage;
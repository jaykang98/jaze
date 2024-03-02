import React from "react";

interface LoginCardProps {
    userID: string;
}
const LoginCard: React.FC<LoginCardProps> = ({ userID }) => {
    return (
        <div>
            {userID}
        </div>
        );
};

export default LoginCard;
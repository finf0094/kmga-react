import profileIcon from "@assets/profile-icon.svg";
import './Profile.css'
import useAuth from "@hooks/useAuth.ts";
import {Link} from "react-router-dom";
const Profile = () => {
    const {isAuthenticated, user} = useAuth();
    const {email, roles} = user;

    if (!isAuthenticated) {
        return <Link to='/login'>login</Link>
    }

    return (
        <div className="profile">
            <div className="profile__info">
                <span className="profile__mail">{email}</span>
                <span className="profile__role">{roles?.map((role: string) => role)}</span>
            </div>
            <img src={profileIcon} alt="User" className="profile__icon" />
        </div>
    );
};

export default Profile;
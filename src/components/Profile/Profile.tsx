import profileIcon from "@assets/profile-icon.svg";
import './Profile.css'
import useAuth from "@hooks/useAuth.ts";
import { Link } from "react-router-dom";

const Profile: React.FC = () => {
	const { isAuthenticated, user } = useAuth();

	return (
		<div className="profile">
			{isAuthenticated ? (
				<div className="profile__user">
					<div className="profile__info">
						<span className="profile__mail">{user.email}</span>
						<span className="profile__role">{user.roles?.map((role: string) => role.includes('USER') ? 'Пользователь' : role.includes('ADMIN') && 'Админ')}</span>
					</div>
					<img src={profileIcon} alt="User" className="profile__icon" />
				</div>
			) : (
				<Link className="profile__button" to='/login'>Войти</Link>
			)}
		</div>

	);
};

export default Profile;
import profileIcon from "@assets/profile-icon.svg";
import './Profile.css'
import useAuth from "@hooks/useAuth.ts";

const Profile: React.FC = () => {
	const { user } = useAuth();

	return (
		<div className="profile">
			<div className="profile__user">
				<div className="profile__info">
					<span className="profile__mail">{user.email}</span>
					<span className="profile__role">{user.roles?.map((role: string) => role.includes('USER') ? 'User' : role.includes('ADMIN') && 'Admin')}</span>
				</div>
				<img src={profileIcon} alt="User" className="profile__icon" />
			</div>
		</div>

	);
};

export default Profile;
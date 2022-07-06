import { getCurrentData } from '../utils/auth';

const Profile = () => {
  const user = getCurrentData('username');
  return (
    <div>
      <h1>welcome</h1>
      <h2>{user}</h2>
    </div>
  );
};

export default Profile;

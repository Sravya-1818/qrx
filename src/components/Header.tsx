import { Link } from "react-router-dom";

const Header = ({ user }: { user: any }) => {
  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-md">
      <Link to="/" className="text-xl font-bold text-blue-600">
        QRX-One
      </Link>
      <nav>
        {user ? (
          <Link to={`/user/${user.id}`} className="text-blue-600 hover:underline">
            Profile
          </Link>
        ) : (
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;

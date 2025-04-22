import { Link } from 'react-router-dom';
import './Homepage.css';

function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to the Login Portal</h1>
      <p>Please choose your login type:</p>
      <div className="button-group">
        <Link to="/admin">
          <button>Admin Login</button>
        </Link>
        <Link to="/employee">
          <button>Employee Login</button>
        </Link>
      </div>
      
    </div>
  );
}

export default Home;

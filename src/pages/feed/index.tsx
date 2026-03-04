import Avatar from "../../components/Avatar"
import FeedGrid from "../../components/Grids/Index"

interface FeedPageProps {
  onLogout?: () => void;
}

function FeedPage(props: FeedPageProps) {
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    window.dispatchEvent(new Event('authStateChange'));
    if (props.onLogout) {
      props.onLogout();
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <div>
          <Avatar
            realname="Felipe Aguiar" nickname="@Felipao__DIO🚀" />
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 font-medium transition-colors duration-200"
        >
          Logout
        </button>
      </div>
      <div className="mt-10">
        <FeedGrid />
      </div>
    </>
  );
}

export default FeedPage;
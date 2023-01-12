function DashBoardHeader(props) {
  const { logout } = props;
  return (
    <header className="flex justify-between px-4 py-2 bg-white border-b items-center">
      <div className="flex justify-center items-center space-x-2 cursor-pointer">
        <img src="/image/triangle-logo.png" alt="" className="w-6 h-6" />
        <h1 className="text-2xl font-bold">Spaces</h1>
      </div>
      <div>
        <img
          class="w-10 h-10 rounded-full cursor-pointer"
          src="https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector-PNG-File.png"
        />
      </div>
      <button onClick={logout}>Logout</button>
    </header>
  );
}

export default DashBoardHeader;

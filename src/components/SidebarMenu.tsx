// Sidebar.tsx
const SidebarMenu = () => {
  return (
    <div className="w-1/4 h-full bg-gray-200 p-4">
      <h2 className="text-lg font-bold">Menu</h2>
      <ul className="mt-4">
        <li className="mb-2">
          <a href="/admin" className="text-blue-600 hover:underline">
            Admin
          </a>
        </li>
        <li className="mb-2">
          <a href="/instructor" className="text-blue-600 hover:underline">
            Instructor
          </a>
        </li>
        <li className="mb-2">
          <a href="/student" className="text-blue-600 hover:underline">
            Student
          </a>
        </li>
      </ul>
    </div>
  );
};

export default SidebarMenu;

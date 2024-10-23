import { useEffect, useState } from "react";
import { Input, Button, Pagination, Card, Tabs } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useCustomNavigate } from "../../hooks/customNavigate";

interface Student {
  id: number;
  name: string;
  phone: string;
  email: string;
  avatar: string;
  memberSince?: string;
}

const studentsData: Student[] = [
  {
    id: 1,
    name: "Edu",
    phone: "0123456789",
    email: "edu123@gmail.com",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4sUs8eRbiEt6b1Jil5C_nGFkkPrXumAt18akJUOV5O6CTs0yVm7y-bLk-li4KAaeFxD4&usqp=CAU",
  },
  {
    id: 2,
    name: "Master",
    phone: "0987654321",
    email: "master32@gmail.com",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4sUs8eRbiEt6b1Jil5C_nGFkkPrXumAt18akJUOV5O6CTs0yVm7y-bLk-li4KAaeFxD4&usqp=CAU",
  },
];

const subscribersData: Student[] = [
  {
    id: 3,
    name: "Subscriber1",
    phone: "0123456789",
    email: "sub1@gmail.com",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4sUs8eRbiEt6b1Jil5C_nGFkkPrXumAt18akJUOV5O6CTs0yVm7y-bLk-li4KAaeFxD4&usqp=CAU",
  },
  {
    id: 4,
    name: "Subscriber2",
    phone: "0987654321",
    email: "sub2@gmail.com",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4sUs8eRbiEt6b1Jil5C_nGFkkPrXumAt18akJUOV5O6CTs0yVm7y-bLk-li4KAaeFxD4&usqp=CAU",
  },
];

const StudentSubscriptions = () => {
  const [following, setFollowing] = useState<number[]>([]);
  // const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isInstructor, setIsInstructor] = useState<boolean>(false);

  const navigate = useCustomNavigate();

  useEffect(() => {
    const user = localStorage.getItem("token");
    if (user) {
      const parsedUser = JSON.parse(user);
      setIsInstructor(parsedUser.role === "instructor");
    }
  }, []);

  const handleFollow = (id: number) => {
    setFollowing((prev) => {
      if (prev.includes(id)) {
        return prev.filter((studentId) => studentId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const filteredStudents = studentsData.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredSubscribers = subscribersData.filter((subscriber) =>
    subscriber.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const studentList = (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {filteredStudents.map((student) => (
        <div
          key={student.id}
          className="border p-4 rounded-lg text-center shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer"
          onClick={() => navigate(`/profile/${student.id}`, true)}
        >
          <img
            src={student.avatar}
            alt={student.name}
            className="w-20 h-20 rounded-full mx-auto mb-4"
          />
          <h3 className="text-lg font-semibold">{student.name}</h3>
          <p className="text-gray-600">
            <i className="fas fa-phone-alt mr-2"></i>
            {student.phone}
          </p>
          <p className="text-gray-600">
            <i className="fas fa-envelope mr-2"></i>
            {student.email}
          </p>
          <Button
            type={following.includes(student.id) ? "default" : "primary"}
            onClick={(e) => {
              e.stopPropagation();
              handleFollow(student.id);
            }}
            className="mt-4 view-button"
          >
            {following.includes(student.id) ? "Unfollowed" : "Following"}
          </Button>
        </div>
      ))}
    </div>
  );

  const subscriberList = (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {filteredSubscribers.map((subscriber) => (
        <div
          key={subscriber.id}
          className="border p-4 rounded-lg text-center shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer"

        >
          <img
            src={subscriber.avatar}
            alt={subscriber.name}
            className="w-20 h-20 rounded-full mx-auto mb-4"
          />
          <h3 className="text-lg font-semibold">{subscriber.name}</h3>
          <p className="text-gray-600">
            <i className="fas fa-phone-alt mr-2"></i>
            {subscriber.phone}
          </p>
          <p className="text-gray-600">
            <i className="fas fa-envelope mr-2"></i>
            {subscriber.email}
          </p>
        </div>
      ))}
    </div>
  );

  return (
    <Card>
      <h3 className="text-2xl my-5">My Subscriptions</h3>

      {/* Search Bar */}
      <div className="flex items-center mb-6">
        <Input
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          prefix={<SearchOutlined />}
          className="w-80 mr-4"
        />
        <Button type="primary" icon={<SearchOutlined />} className="view-button">
          Search
        </Button>
      </div>

      {/* Tabs for Subscriptions and Subscribers */}
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Subscriptions" key="1">
          {studentList}
        </Tabs.TabPane>

        {isInstructor && (
          <Tabs.TabPane tab="Subscribers" key="2">
            {subscriberList}
          </Tabs.TabPane>
        )}
      </Tabs>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <Pagination defaultCurrent={1} total={filteredStudents.length} pageSize={10} />
        
      </div>
    </Card>
  );
};

export default StudentSubscriptions;

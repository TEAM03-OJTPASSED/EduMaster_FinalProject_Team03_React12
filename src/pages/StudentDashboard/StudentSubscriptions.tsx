import { useState } from 'react';
import { Card, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
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
    name: 'Edu',
    phone: '0123456789',
    email: 'edu123@gmail.com',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4sUs8eRbiEt6b1Jil5C_nGFkkPrXumAt18akJUOV5O6CTs0yVm7y-bLk-li4KAaeFxD4&usqp=CAU',
  },
  {
    id: 2,
    name: 'Master',
    phone: '0987654321',
    email: 'master32@gmail.com',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4sUs8eRbiEt6b1Jil5C_nGFkkPrXumAt18akJUOV5O6CTs0yVm7y-bLk-li4KAaeFxD4&usqp=CAU',
  },
];

const StudentSubscriptions = () => {
  const [following, setFollowing] = useState<number[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [searchTerm] = useState<string>(''); 

  const handleFollow = (id: number) => {
    setFollowing((prev) => {
      if (prev.includes(id)) {
        return prev.filter((studentId) => studentId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleStudentClick = (student: Student) => {
    setSelectedStudent(student);
  };



 
  const filteredStudents = studentsData.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card>
    <div className="subscription-container">
      <h3 className="text-2xl my-5">My Subscription</h3>
      <Input
        placeholder="Search By Subscriber Name"
        prefix={<SearchOutlined />}
        style={{ width: "45%", marginBottom: "20px", borderRadius: "4px" }}
      />
      <div className="students-list">
        {filteredStudents.map((student) => (
          <div key={student.id} className="student-card" onClick={() => handleStudentClick(student)}>
            <img src={student.avatar} alt={student.name} className="student-avatar" />
            <h3>{student.name}</h3>
            <p><i className="fas fa-phone-alt"></i> {student.phone}</p>
            <p><i className="fas fa-envelope"></i> {student.email}</p>
            <button
              className={following.includes(student.id) ? 'unfollow-btn' : 'follow-btn'}
              onClick={(e) => {
                e.stopPropagation();
                handleFollow(student.id);
              }}
            >
              {following.includes(student.id) ? 'Unfollow' : 'Follow'}
            </button>
          </div>
        ))}
      </div>

    </div>
    </Card>
  );
};

export default StudentSubscriptions;

const styles = `
.subscription-container {
  padding: 20px;
  font-family: Arial, sans-serif;
}

.students-list {
  display: flex;
  gap: 20px;
  justify-content: flex-start;
}

.student-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  width: 200px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  cursor: pointer; /* Indicate clickable */
}

.student-avatar {
  display: inline;
  border-radius: 50%;
  width: 80px;
  height: 80px;
}

.follow-btn {
  background-color: #ff782d;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
}

.unfollow-btn {
  background-color: red;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
}
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

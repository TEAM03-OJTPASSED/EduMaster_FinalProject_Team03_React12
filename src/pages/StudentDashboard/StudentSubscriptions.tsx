import { useState } from 'react';

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
  const [searchTerm, setSearchTerm] = useState<string>(''); 

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

  const closeProfile = () => {
    setSelectedStudent(null);
  };

 
  const filteredStudents = studentsData.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="subscription-container">
      <h3 className="text-2xl my-5">My Subscriptions</h3>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by instructor name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button>
          <i className="fas fa-search"></i>
        </button>
      </div>
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

      {selectedStudent && (
        <div className="profile-modal">
          <div className="profile-content">
            <span className="close-btn" onClick={closeProfile}>
              <i className="fas fa-times"></i>
            </span>
            <h2>{selectedStudent.name}</h2>
            <img src={selectedStudent.avatar} alt={selectedStudent.name} className="student-avatar-large" />
            <p><i className="fas fa-phone-alt"></i> {selectedStudent.phone}</p>
            <p><i className="fas fa-envelope"></i> {selectedStudent.email}</p>
            <p>Member Since: {selectedStudent.memberSince || 'N/A'}</p>
          </div>
        </div>
      )}

      <div className="pagination">
        <p>1-2 of 2 items</p>
        <button>❮</button>
        <span>1</span>
        <button>❯</button>
        <select>
          <option>10 / page</option>
        </select>
      </div>
    </div>
  );
};

export default StudentSubscriptions;

const styles = `
.subscription-container {
  padding: 20px;
  font-family: Arial, sans-serif;
}

.search-bar {
  display: flex-start;
  justify-content: center;
  margin-bottom: 20px;
}

.search-bar input {
  padding: 10px;
  width: 300px;
  border: 1px solid #ddd;
  border-radius: 4px 0 0 4px;
}

.search-bar button {
  padding: 10px;
  background-color: #ff782d;
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
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

.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}

.pagination p, .pagination span {
  margin: 0;
}

.pagination button {
  background-color: #ff782d;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.pagination select {
  padding: 5px;
}


.profile-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.profile-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  position: relative;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 20px;
}
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

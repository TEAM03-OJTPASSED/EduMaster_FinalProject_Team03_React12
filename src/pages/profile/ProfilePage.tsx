import React, { useEffect, useState } from "react";
import {
  Card,
  Avatar,
  Tabs,
  Typography,
  Row,
  Col,
  Statistic,
  Progress,
  List,
  Tag,
  Modal,
  Skeleton,
} from "antd";
import { StarOutlined } from "@ant-design/icons";

import {
  BookOutlined,
  UserOutlined,
  ClockCircleOutlined,
  StarFilled,
} from "@ant-design/icons";
import DynamicBreadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { useCustomNavigate } from "../../hooks/customNavigate";
import { User } from "../../models/UserModel";
import { useParams } from "react-router-dom";
import { UserService } from "../../services/user.service";
import { Course, GetCourses } from "../../models/Course.model";
import ClientService from "../../services/client.service";
import dayjs from "dayjs";
import { renderContent } from "../../utils/renderContent";
import { capitalize } from "lodash";
import SubscribeButton from "../../components/SubscribeButton";
// import { handleNotify } from "../../utils/handleNotify";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
// import { authorize } from "../../utils/authorize";

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;

const ProfilePage: React.FC = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState<User>({} as User);
  const [userCourse, setUserCourse] = useState<Course[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalMinutes, setTotalMinutes] = useState(0);
  const [loading, setLoading] = useState(true);
  const [coursesLoading, setCoursesLoading] = useState(true);
  const { currentUser } = useSelector((state: RootState) => state.auth.login);

  const showModal = (image: string) => {
    setModalImage(image);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await UserService.getUser(id as string);
        setUserData(res?.data as User);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    fetchCourseById();
  }, [id]);

  const fetchCourseById = async () => {
    try {
      const searchParam: GetCourses = {
        searchCondition: {
          keyword: "",
          category_id: "",
          user_id: id,
          is_deleted: false,
        },
        pageInfo: {
          pageNum: 1,
          pageSize: 10,
        },
      };
      const res = await ClientService.getCourses(searchParam);
      const courses = res.data?.pageData as Course[];
      setUserCourse(courses);
      const students = courses.reduce(
        (acc, course) => acc + course.enrolled,
        0
      );
      console.log(students);
      const minutes = courses.reduce(
        (acc, course) => acc + course.full_time,
        0
      );
      console.log(minutes);
      setTotalStudents(students);
      setTotalMinutes(minutes);
    } finally {
      setCoursesLoading(false);
    }
  };

  const handleTabChange = (activeKey: string) => {
    if (activeKey === "2" && userCourse.length === 0) {
      fetchCourseById();
    }
  };

  // const handleSubscription = () => {
  //   if (authorize(currentUser.role)) return true

  // }

  const instructorInfo = {
    name: userData.name,
    bank_information: userData.bank_account_name,
    bank_account_no: userData.bank_account_no,
    bank_name: userData.bank_name,
    email: userData.email,
    role: userData.role,
    avatar: userData?.avatar_url,
    coverPhoto: userData?.avatar_url,
    phone: userData.phone_number,
    bio: userData.description,
    coursesCreated: userCourse.length,
    totalStudents,
    teachingHours: totalMinutes,
    courses: userCourse,
    _id: userData._id,
  };

  const navigate = useCustomNavigate();

  const ProfileHeader = () =>
    loading ? (
      <div className="flex items-end mt-32 z-10">
        <Skeleton.Avatar active size={160} className="ml-4 mb-24" />
        <div className="ml-5 flex-1">
          <Skeleton active paragraph={{ rows: 4 }} />
        </div>
      </div>
    ) : (
      <div className="flex items-end mt-32 z-10 relative">
        <Avatar
          src={instructorInfo.avatar}
          size={160}
          className="ml-4 border-4 border-white cursor-pointer mb-6"
          onClick={() => showModal(instructorInfo.avatar as string)}
        />
        <div className="ml-5 ">
          <Title level={2} className="p-0 !mb-0">
            {instructorInfo.name}
          </Title>
          <div>
            <Text type="secondary"> {capitalize(instructorInfo.role)}</Text>
          </div>
        </div>
        <div className="flex flex-col items-center ml-auto h-14">
          <SubscribeButton
            instructorName={instructorInfo.name}
            instructorId={instructorInfo._id}
            userRole={currentUser.role}
          />
        </div>
      </div>
    );

  const AboutTab = () =>
    loading ? (
      <Skeleton active paragraph={{ rows: 4 }} />
    ) : (
      <>
        <Paragraph className="text-base">
          {renderContent(instructorInfo.bio ?? "")}
        </Paragraph>
        <StatsTab />
        <Title level={4}>Contact</Title>
        <Paragraph>Email: {instructorInfo.email}</Paragraph>
        <Paragraph>Phone: {instructorInfo.phone}</Paragraph>
      </>
    );

  const CoursesTab = () =>
    coursesLoading ? (
      <List
        itemLayout="vertical"
        dataSource={[1, 2, 3]} // Dummy data for loading state
        renderItem={() => (
          <List.Item>
            <Skeleton active avatar paragraph={{ rows: 3 }} />
          </List.Item>
        )}
      />
    ) : (
      <List
        itemLayout="vertical"
        dataSource={instructorInfo.courses}
        renderItem={(course: Course) => (
          <List.Item
            key={course._id}
            className="flex justify-between items-center p-5 border-b border-gray-200 pb-6"
          >
            <div className="flex-1">
              <List.Item.Meta
                title={
                  <a onClick={() => navigate(`/course/${course._id}`, true)}>
                    {course.name}
                  </a>
                }
                description={course.description}
              />
              <div className="flex flex-wrap gap-2 mt-2 pb-6">
                <Tag color="orange">
                  Created at: {dayjs(course.created_at).format("DD/MM/YYYY")}
                </Tag>
                <Tag color="green">Level: {course.level}</Tag>
                <Tag className="bg-orange-500 text-white font-jost">
                  {course.category_name}
                </Tag>
                <Tag className="bg-gray-500 text-white font-jost">
                  {course.full_time} minutes
                </Tag>
                <Tag color="blue" className="text-white font-jost">
                  {course.enrolled} enrolled
                </Tag>
                <Tag className="bg-blue-800 text-white font-jost flex items-center">
                  {renderStars(course.average_rating)}
                  <span className="ml-2">
                    {course.average_rating.toFixed(1)} rating
                  </span>
                </Tag>
              </div>
            </div>
          </List.Item>
        )}
      />
    );

  // Function to render stars based on rounded average rating
  const renderStars = (averageRating: number) => {
    const roundedRating = Math.round(averageRating);
    return (
      <>
        {Array.from({ length: 5 }, (_, index) =>
          index < roundedRating ? (
            <StarFilled key={index} className="text-yellow-400" />
          ) : (
            <StarOutlined key={index} className="text-gray-300" />
          )
        )}
      </>
    );
  };

  const StatsTab = () =>
    loading ? (
      <Skeleton active paragraph={{ rows: 4 }} />
    ) : (
      <>
        <Row gutter={16}>
          <Col span={8}>
            <Statistic
              title="Courses Created"
              value={instructorInfo.coursesCreated}
              prefix={<BookOutlined />}
            />
          </Col>
          <Col span={8}>
            <Statistic
              title="Total Students"
              value={instructorInfo.totalStudents}
              prefix={<UserOutlined />}
            />
          </Col>
          <Col span={8}>
            <Statistic
              title="Teaching Minutes"
              value={instructorInfo.teachingHours}
              prefix={<ClockCircleOutlined />}
            />
          </Col>
        </Row>
        <Title level={4} className="mt-6">
          Average Course Rating
        </Title>
        <Progress
          percent={
            instructorInfo.courses.length > 0
              ? (instructorInfo.courses.reduce(
                  (acc, course) => acc + course.average_rating,
                  0
                ) /
                  instructorInfo.courses.length) *
                20
              : 0
          }
          status="active"
          format={(percent) => `${((percent ?? 0) / 20).toFixed(1)} / 5`}
        />
      </>
    );

  return (
    <main className="mt-2 min-h-screen pb-40 z-0">
      <div className="p-4 pb-0">
        <DynamicBreadcrumb />
        <Card className="relative custom-card">
          <div className="w-full absolute h-48 sm:h-60 lg:h-60">
            {loading ? (
              ""
            ) : (
              <img
                alt="Cover"
                src={instructorInfo.avatar}
                className="w-full h-full object-cover"
              />
            )}
          </div>

          <ProfileHeader />

          <Modal
            visible={isModalVisible}
            footer={null}
            onCancel={handleCancel}
            centered
          >
            <img alt="Enlarged" src={modalImage} className="w-full" />
          </Modal>

          <Tabs
            defaultActiveKey="1"
            className="mt-6 custom-tabs font-exo"
            onChange={handleTabChange}
          >
            <TabPane tab="About" key="1">
              <AboutTab />
            </TabPane>

            <TabPane tab="Courses" key="2">
              <CoursesTab />
            </TabPane>
          </Tabs>
        </Card>
      </div>
    </main>
  );
};

export default ProfilePage;

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
} from "antd";
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

  const showModal = (image: string) => {
    setModalImage(image);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await UserService.getUser(id as string);
      setUserData(res?.data as User);
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchCourseById = async () => {
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
      setUserCourse(res.data?.pageData as Course[]);
      setUserCourse(courses);
      // Calculate total students and total minutes
      const students = courses.reduce(
        (acc, course) => acc + course.enrolled,
        0
      );
      const minutes = courses.reduce(
        (acc, course) => acc + course.full_time,
        0
      );
      setTotalStudents(students);
      setTotalMinutes(minutes);
    };

    fetchCourseById();
  }, [id]);
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
  };

  const navigate = useCustomNavigate();

  return (
    <main className="mt-2 min-h-screen">
      <div className="p-4 pb-0">
        <DynamicBreadcrumb />
        <Card className="relative custom-card">
          <div className="w-full absolute h-48 sm:h-60 md:h-72 lg:h-80">
            <img
              alt="Cover"
              src={instructorInfo.avatar}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex items-end mt-32 z-50 md:mt-48 lg:mt-56">
            <Avatar
              src={instructorInfo.avatar}
              size={160}
              className="ml-4 border-4 border-white cursor-pointer mb-24"
              onClick={() => showModal(instructorInfo.avatar as string)}
            />
            <div className="ml-5">
              <Title level={2} className="mb-0">
                {instructorInfo.name}
              </Title>
              <div>
                Role:
                <Text type="secondary"> {instructorInfo.role}</Text>
              </div>

              <div>
                Bank name:
                <Text type="secondary"> {instructorInfo.bank_name}</Text>
              </div>
              <div>
                Bank no:
                <Text type="secondary"> {instructorInfo.bank_account_no}</Text>
              </div>
              <div>
                Bank account name:
                <Text type="secondary"> {instructorInfo.bank_name}</Text>
              </div>
            </div>
          </div>

          <Modal
            visible={isModalVisible}
            footer={null}
            onCancel={handleCancel}
            centered
          >
            <img alt="Enlarged" src={modalImage} className="w-full" />
          </Modal>

          <Tabs defaultActiveKey="1" className="mt-6 custom-tabs font-exo">
            <TabPane tab="About" key="1">
              <Paragraph className="text-base">{instructorInfo.bio}</Paragraph>
              <Title level={4}>Contact</Title>
              <Paragraph>Email: {instructorInfo.email}</Paragraph>
              <Paragraph>Phone: {instructorInfo.phone}</Paragraph>
            </TabPane>

            <TabPane tab="Courses" key="2">
              <List
                itemLayout="vertical"
                dataSource={instructorInfo.courses}
                renderItem={(course: Course) => (
                  <List.Item
                    key={course._id}
                    className="flex justify-between items-center p-5 border-b border-gray-200"
                  >
                    <div className="flex-1">
                      <List.Item.Meta
                        title={
                          <a
                            onClick={() =>
                              navigate(`/course/${course._id}`, true)
                            }
                          >
                            {course.name}
                          </a>
                        }
                        description={course.description}
                      />
                      <div className="flex gap-2 mt-2">
                        <Tag color="orange">
                          Created at:{" "}
                          {dayjs(course.created_at).format("DD/MM/YYYY")}
                        </Tag>
                        <Tag color="green">Level: {course.level}</Tag>
                        <Tag className="bg-orange-500 text-white font-jost">
                          {course.category_name}
                        </Tag>
                        <Tag className="bg-gray-500 text-white font-jost">
                          {course.full_time} minutes
                        </Tag>
                      </div>
                    </div>
                    <div className="text-right min-w-[150px] pr-5 md:pr-6">
                      <Statistic
                        title="Enrolled"
                        value={course.enrolled}
                        prefix={<UserOutlined />}
                        className="font-exo"
                      />
                      <Statistic
                        title="Rating"
                        value={course.average_rating}
                        prefix={<StarFilled />}
                        className="font-exo"
                      />
                    </div>
                  </List.Item>
                )}
              />
            </TabPane>

            <TabPane tab="Stats" key="3">
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
                percent={92}
                status="active"
                format={(percent) => `${percent ?? 0 / 20} / 5`}
              />
            </TabPane>
          </Tabs>
        </Card>
      </div>
    </main>
  );
};

export default ProfilePage;

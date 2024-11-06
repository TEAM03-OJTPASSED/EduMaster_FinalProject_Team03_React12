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

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;



const ProfilePage: React.FC = () => {
  const {id} = useParams()
const [userData, setUserData] = useState<User>({} as User)
const [userCourse, setUserCourse] = useState<Course[]>([])

useEffect(() => {
const fetchData = async () => {
  const res = await UserService.getUser(id as string)
  setUserData(res?.data as User)
}
fetchData()
},[id])

useEffect(() => {  const fetchCourseById = async () => {
  const searchParam:GetCourses = {
    
    searchCondition: {
        keyword: "",
        category_id: "",
        user_id: id,
        is_deleted: false
    },
    pageInfo: {
        pageNum: 1,
        pageSize: 10
    }
}
  const res = await ClientService.getCourses(searchParam)
  setUserCourse(res.data?.pageData as Course[])
}
fetchCourseById()}

,[id])

  const instructorInfo = {
    name: userData.name,
    bank_information: userData.bank_account_name,
    bank_account_no: userData.bank_account_no,
    bank_name: userData.bank_name,
    email: userData.email,
    role: userData.role,
    avatar: userData?.avatar_url,
    coverPhoto: userData?.avatar_url,
    phone:userData.phone_number,
    bio: userData.description,
    coursesCreated: 15,
    totalStudents: 50000,
    teachingHours: 5000,
    courses: userCourse
    // [ 
    //   {
    //     id: "DS101",
    //     title: "Introduction to Data Science",
    //     description:
    //       "A comprehensive introduction to the field of data science, covering statistical analysis, machine learning, and data visualization.",
    //     students: 15000,
    //     rating: 4.8,
    //     category: "Data Science",
    //     subcategory: "Beginner",
    //   },
    // ]
  };

  const navigate = useCustomNavigate();

  return (
    <main className="mt-2 min-h-screen">
      <div className="p-4 pb-0">
        <DynamicBreadcrumb />
        <Card className="relative custom-card">
          <div style={{ height: 200 }} className="w-full absolute">
            <img
              alt="Cover"
              src= {instructorInfo.avatar}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div
            style={{ marginTop: 120, display: "flex", alignItems: "flex-end" }}
            className="z-50"
          >
            <Avatar
              src={instructorInfo.avatar}
              size={160}
              style={{ border: "4px solid #fff" }}
              className="ml-4"
            />
            <div style={{ marginLeft: 20 }}>
              <Title level={2} style={{ marginBottom: 0 }}>
                {instructorInfo.name}
              </Title>
              <div className="gap-3 flex">
              <Text type="secondary">{instructorInfo.role}</Text>
              </div>
              <div className="gap-3 flex">

              <Text type="secondary">{instructorInfo.bank_information}</Text>
              
              <Text type="secondary">{instructorInfo.bank_account_no}</Text>
              
              <Text type="secondary">{instructorInfo.bank_name}</Text>
              </div>
            </div>
          </div>

          <Tabs
            defaultActiveKey="1"
            style={{ marginTop: 24 }}
            className="custom-tabs font-exo"
          >
            <TabPane tab="About" key="1">
              <Paragraph className="text-base ">{instructorInfo.bio}</Paragraph>
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
                    extra={
                      <div>
                        <Statistic
                          title="Course Name"
                          value={course.name}
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
                    }
                  >
                    <List.Item.Meta
                      title={
                        <a
                          onClick={() =>
                            navigate(`/course-detail/${course._id}`, true)
                          }
                        >
                          {course.name}
                        </a>
                      }
                      description={course.description}
                    />
                    <div className="flex justify-between items-center ">
                    <Tag color="orange">{course._id}</Tag>
                    <div className="mt-2">
                      <Tag className="bg-orange-500 font-jost text-white text-base">
                        {course.category_name}
                      </Tag>
                      <Tag className="bg-gray-500 font-jost text-white ml-2 text-base">
                        {course.full_time}
                      </Tag>
                    </div>
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
                    title="Teaching Hours"
                    value={instructorInfo.teachingHours}
                    prefix={<ClockCircleOutlined />}
                  />
                </Col>
              </Row>
              <Title level={4} style={{ marginTop: 24 }}>
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

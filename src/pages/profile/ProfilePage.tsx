import React from "react";
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

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;

interface Course {
  id: string;
  title: string;
  description: string;
  students: number;
  rating: number;
  category: string;
  subcategory: string;
}

const ProfilePage: React.FC = () => {
  const instructorInfo = {
    name: "Prof. Edu Master",
    title: "Senior Data Science Instructor",
    email: "edumaster@university.edu",
    avatar: "/placeholder.svg?height=200&width=200",
    coverPhoto: "/placeholder.svg?height=300&width=1000",
    bio: `Dr. Edu Master is a distinguished professor of Data Science and Machine Learning with over 15 years of experience in both academia and industry. She holds a Ph.D. in Computer Science from Stanford University and has previously worked as a Senior Data Scientist at Google and Facebook.

    Her research focuses on developing novel machine learning algorithms for big data analytics, with a particular emphasis on applications in healthcare and finance. Dr. Master has published over 50 papers in top-tier conferences and journals, and her work has been cited more than 10,000 times.

    As an educator, Dr. Master is passionate about making complex concepts accessible to students of all backgrounds. She has developed and taught numerous courses in data science, machine learning, and artificial intelligence, both online and in traditional classroom settings. Her teaching philosophy emphasizes hands-on learning and real-world applications, ensuring that students not only grasp theoretical concepts but also gain practical skills highly valued in the industry.

    Dr. Master is a recipient of the National Science Foundation CAREER Award and has been recognized as one of the "Top 50 Women in Tech" by Forbes. She regularly speaks at international conferences and has given invited talks at institutions around the world.

    In addition to her academic work, Dr. Master serves as an advisor to several tech startups and is actively involved in initiatives to promote diversity in STEM fields.`,
    coursesCreated: 15,
    totalStudents: 50000,
    teachingHours: 5000,
    courses: [
      {
        id: "DS101",
        title: "Introduction to Data Science",
        description:
          "A comprehensive introduction to the field of data science, covering statistical analysis, machine learning, and data visualization.",
        students: 15000,
        rating: 4.8,
        category: "Data Science",
        subcategory: "Beginner",
      },
      {
        id: "ML201",
        title: "Advanced Machine Learning",
        description:
          "An in-depth exploration of advanced machine learning techniques, including deep learning and reinforcement learning.",
        students: 8000,
        rating: 4.9,
        category: "Machine Learning",
        subcategory: "Advanced",
      },
    ],
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
              src={"https://picsum.photos/500"}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div
            style={{ marginTop: 120, display: "flex", alignItems: "flex-end" }}
            className="z-50"
          >
            <Avatar
              src={"https://picsum.photos/200"}
              size={160}
              style={{ border: "4px solid #fff" }}
              className="ml-4"
            />
            <div style={{ marginLeft: 20 }}>
              <Title level={2} style={{ marginBottom: 0 }}>
                {instructorInfo.name}
              </Title>
              <Text type="secondary">{instructorInfo.title}</Text>
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
            </TabPane>

            <TabPane tab="Courses" key="2">
              <List
                itemLayout="vertical"
                dataSource={instructorInfo.courses}
                renderItem={(course: Course) => (
                  <List.Item
                    key={course.id}
                    extra={
                      <div>
                        <Statistic
                          title="Students"
                          value={course.students}
                          prefix={<UserOutlined />}
                          className="font-exo"
                        />
                        <Statistic
                          title="Rating"
                          value={course.rating}
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
                            navigate(`/course-detail/${course.id}`, true)
                          }
                        >
                          {course.title}
                        </a>
                      }
                      description={course.description}
                    />
                    <div className="flex justify-between items-center ">
                    <Tag color="orange">{course.id}</Tag>
                    <div className="mt-2">
                      <Tag className="bg-orange-500 font-jost text-white text-base">
                        {course.category}
                      </Tag>
                      <Tag className="bg-gray-500 font-jost text-white ml-2 text-base">
                        {course.subcategory}
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

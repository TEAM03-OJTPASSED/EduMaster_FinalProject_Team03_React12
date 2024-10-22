import React from 'react';
import { 
  Card, Avatar, Tabs, Typography, Row, Col, Statistic, Progress, List, Tag
} from 'antd';
import { 
  BookOutlined, UserOutlined, ClockCircleOutlined, StarOutlined
} from '@ant-design/icons';
import DynamicBreadcrumb from '../../components/Breadcrumb/Breadcrumb';

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;

interface Course {
  id: string;
  title: string;
  description: string;
  students: number;
  rating: number;
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
      { id: "DS101", title: "Introduction to Data Science", description: "A comprehensive introduction to the field of data science, covering statistical analysis, machine learning, and data visualization.", students: 15000, rating: 4.8 },
      { id: "ML201", title: "Advanced Machine Learning", description: "An in-depth exploration of advanced machine learning techniques, including deep learning and reinforcement learning.", students: 8000, rating: 4.9 },
      { id: "AI301", title: "Artificial Intelligence: Principles and Applications", description: "A course on the fundamental principles of AI and its real-world applications in various industries.", students: 12000, rating: 4.7 },
      { id: "BD401", title: "Big Data Analytics", description: "Techniques and tools for processing and analyzing large-scale datasets using distributed computing frameworks.", students: 10000, rating: 4.6 },
      { id: "DL501", title: "Deep Learning Specialization", description: "A comprehensive dive into neural networks, convolutional networks, RNNs, and transformers.", students: 5000, rating: 4.9 },
    ]
  };

  return (
    <main className="mt-2">
      <div className="p-4 pb-0">
      <DynamicBreadcrumb/>
      <Card  
        className='relative custom-card'
      
        

        
        
      >
        <div style={{ height: 200, }} className='w-full absolute'>
            <img
              alt="Cover"
              src={"https://picsum.photos/500"}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
        </div>
        <div style={{ marginTop: 120, display: 'flex', alignItems: 'flex-end' }} className='z-50'>
          <Avatar 
            src={"https://picsum.photos/200"} 
            size={160}
            style={{ border: '4px solid #fff' }}
            className='ml-4'
          />
          <div style={{ marginLeft: 20 }}>
            <Title level={2} style={{ marginBottom: 0 }}>{instructorInfo.name}</Title>
            <Text type="secondary">{instructorInfo.title}</Text>
          </div>
        </div>

        <Tabs  defaultActiveKey="1" style={{ marginTop: 24 }}>
          <TabPane tab="About" key="1">
            <Paragraph>{instructorInfo.bio}</Paragraph>
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
                      <Statistic title="Students" value={course.students} prefix={<UserOutlined />} />
                      <Statistic title="Rating" value={course.rating} prefix={<StarOutlined />} />
                    </div>
                  }
                >
                  <List.Item.Meta
                    title={<a href={`/course/${course.id}`}>{course.title}</a>}
                    description={course.description}
                  />
                  <Tag color="blue">{course.id}</Tag>
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
            <Title level={4} style={{ marginTop: 24 }}>Average Course Rating</Title>
            <Progress percent={92} status="active" format={(percent) => `${percent ?? 0 / 20} / 5`} />
          </TabPane>
        </Tabs>
      </Card>
    </div>
    </main>

  );
};

export default ProfilePage;
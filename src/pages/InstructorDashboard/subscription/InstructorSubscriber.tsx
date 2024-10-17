import { List, Card, Avatar } from "antd";

const data = [
  {
    fullname: "John Doe",
    avatar: "https://picsum.photos/id/237/200/300",
  },
  {
    fullname: "Jane Smith",
    avatar: "https://picsum.photos/id/237/200/300",
  },
  {
    fullname: "Daniel Kim",
    avatar: "https://picsum.photos/id/237/200/300",
  },
];

const InstructorSubscriber = () => {
  return (
    <List
      className="pt-5"
      grid={{ gutter: 16, column: 4 }}
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
          <Card>
            <Card.Meta
              avatar={<Avatar src={item.avatar} />}
              title={item.fullname}
            />
          </Card>
        </List.Item>
      )}
    />
  );
};

export default InstructorSubscriber;

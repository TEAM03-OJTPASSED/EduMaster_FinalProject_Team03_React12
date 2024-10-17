import { List, Card, Avatar } from "antd";

const data = [
  {
    fullname: "Maria Lee",
    avatar: "https://picsum.photos/id/237/200/300",
  },
  {
    fullname: "Samuel Kim",
    avatar: "https://picsum.photos/id/237/200/300",
  },
];

const InstructorSubscribed = () => {
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

export default InstructorSubscribed;

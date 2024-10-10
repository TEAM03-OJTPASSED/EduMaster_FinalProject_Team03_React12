import React from 'react'
import { Row, Col, Card, Button } from 'antd'
import { LiaCalendarDaySolid } from 'react-icons/lia'

interface Article {
  id: number
  title: string
  date: string
  excerpt: string
  image: string
}

const articles: Article[] = [
  {
    id: 1,
    title: "Best LearnPress WordPress Theme Collection For 2023",
    date: "Jan 24, 22023",
    excerpt: "Looking for an amazing & well-functional LearnPress WordPress Theme?...",
    image: "https://picsum.photos/400/192"
  },
  {
    id: 2,
    title: "Best LearnPress WordPress Theme Collection For 2023",
    date: "Jan 24, 22023",
    excerpt: "Looking for an amazing & well-functional LearnPress WordPress Theme?...",
    image: "https://picsum.photos/400/192"
  },
  {
    id: 3,
    title: "Best LearnPress WordPress Theme Collection For 2023",
    date: "Jan 24, 22023",
    excerpt: "Looking for an amazing & well-functional LearnPress WordPress Theme?...",
    image: "https://picsum.photos/400/192"
  }
]

const ArticleCard: React.FC<{ article: Article }> = ({ article }) => (
  <Card
    hoverable
    cover={<img alt={article.title} src={article.image} className="h-48 object-cover" />}
    className="h-full flex flex-col rounded-3xl overflow-hidden group"
  >
    <h2 className="text-lg font-semibold mb-2 group-hover:text-[#FFAB2D] transition">{article.title}</h2>
    <div className="flex items-center text-gray-500 text-sm mb-2">
      <LiaCalendarDaySolid className="w-4 h-4 mr-2" />
      {article.date}
    </div>
    <p className="text-gray-600 mb-4 flex-grow">{article.excerpt}</p>
  </Card>
)

export default function LatestArticles() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Latest Articles</h2>
            <p className="text-gray-600">Explore our Free Articles</p>
          </div>
          <Button type="default">All Articles</Button>
        </div>
        <Row gutter={[16, 16]}>
          {articles.map((article) => (
            <Col xs={24} sm={12} md={8} key={article.id}>
              <ArticleCard article={article} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  )
}
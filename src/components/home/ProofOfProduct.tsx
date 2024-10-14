import { Card } from "antd"

export const ProofOfProduct = () => {
    return (
        <div className="py-10 grid gap-6 grid-cols-4 justify-between duration-700 transition-all">
            <Card
              className=" h-40 hover:border-4 hover:border-orange-500  text-center flex flex-col items-center align-center justify-center"
              hoverable
            >
              <h3 className="h3">25K+</h3>
              <p>Active Students</p>
            </Card>
            <Card
              className="h-40 hover:border-4 hover:border-orange-500  text-center flex flex-col items-center align-center justify-center"
              hoverable
            >
              <h3 className="h3">888+</h3>
              <p>Total Courses</p>
            </Card>
            <Card
              className=" h-40 hover:border-4 hover:border-orange-500  text-center flex flex-col items-center align-center justify-center"
              hoverable
            >
              <h3 className="h3">253+</h3>
              <p>Active Instructors</p>
            </Card>
            <Card
              className=" h-40 hover:border-4 hover:border-orange-500  text-center flex flex-col items-center align-center justify-center"
              hoverable
            >
              <h3 className="h3">100%</h3>
              <p>Satisfaction Rate</p>
            </Card>
          </div>

    )
}
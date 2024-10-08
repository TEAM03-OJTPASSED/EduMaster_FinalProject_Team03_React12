import { useCustomNavigate } from "../hooks/customNavigate";
import { Button, Card } from "antd";
import heroImage from "../assets/pexels-armin-rimoldi-5553045.jpg";
import { BiSearch } from "react-icons/bi";
import CategoriesGrid from "../components/home/CategoriesGrid";

import {
  FaPalette,
  FaCode,
  FaComments,
  FaVideo,
  FaCamera,
  FaChartLine,
  FaPenNib,
  FaChartPie,
  FaAtom,
  FaNetworkWired,
} from "react-icons/fa";
import CoursesGrid from "../components/home/CoursesGrid";
import CTABanner from "../components/home/CTABanner";
import LatestArticles from "../components/home/LatestArticles";

interface Category {
  icon: React.ReactNode;
  title: string;
  courses: number;
}

const categories: Category[] = [
  {
    icon: <FaPalette className="text-4xl text-orange-500" />,
    title: "Art & Design",
    courses: 38,
  },
  {
    icon: <FaCode className="text-4xl text-orange-500" />,
    title: "Development",
    courses: 38,
  },
  {
    icon: <FaComments className="text-4xl text-orange-500" />,
    title: "Communication",
    courses: 38,
  },
  {
    icon: <FaVideo className="text-4xl text-orange-500" />,
    title: "Videography",
    courses: 38,
  },
  {
    icon: <FaCamera className="text-4xl text-orange-500" />,
    title: "Photography",
    courses: 38,
  },
  {
    icon: <FaChartLine className="text-4xl text-orange-500" />,
    title: "Marketing",
    courses: 38,
  },
  {
    icon: <FaPenNib className="text-4xl text-orange-500" />,
    title: "Content Writing",
    courses: 38,
  },
  {
    icon: <FaChartPie className="text-4xl text-orange-500" />,
    title: "Finance",
    courses: 38,
  },
  {
    icon: <FaAtom className="text-4xl text-orange-500" />,
    title: "Science",
    courses: 38,
  },
  {
    icon: <FaNetworkWired className="text-4xl text-orange-500" />,
    title: "Network",
    courses: 38,
  },
];

const HomePage = () => {
  const navigate = useCustomNavigate();
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col md:flex-row gap-4">
        <button
          className="px-4 py-2 bg-yellow-500 text-white rounded-md w-full md:w-auto"
          onClick={() => navigate("/dashboard/admin")}
        >
          Admin Dashboard
        </button>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded-md w-full md:w-auto"
          onClick={() => navigate("/dashboard/instructor")}
        >
          Instructor Dashboard
        </button>
        <button
          className="px-4 py-2 bg-purple-500 text-white rounded-md w-full md:w-auto"
          onClick={() => navigate("/dashboard/student")}
        >
          Student Dashboard
        </button>
      </div>
      <main className="w-full text-left overflow-visible ">
        <section className="relative lg:h-[400px] h-[300px] w-[115vw] -ml-[15vw] flex justify-center items-center flex-col space-y-4  bg-black overflow-y-hidden">
          <img
            className=" w-[115vw] absolute -top-36  object-bottom brightness-75"
            src={heroImage}
            alt="Hero"
          />
          <div className="z-50 text-white text-5xl font-bold w-[400px] text-center">
            Build Skills With <span className="underline">Online Courses</span>
          </div>
          <div className="z-50 w-[400px] text-white text-center italic">
            "All the courses you need, all in one place." Get started today to
            unlock your hidden potential!
          </div>
          <Button className="rounded-xl bg-[#FF782D] border-none h-[40px] text-md font-semibold text-white">
            <BiSearch /> Find A Course
          </Button>
        </section>

        <section>
          <div className="py-24">
            <div className="container mx-auto px-4">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Featured Categories
                  </h2>
                  <p className="text-gray-600 mt-2">
                    Explore our Popular Categories
                  </p>
                </div>
                <Button
                  type="default"
                  className="hover:bg-orange-500 hover:text-white transition-colors"
                >
                  All Courses
                </Button>
              </div>
              <CategoriesGrid categories={categories} />
            </div>
          </div>
        </section>

        <section>
          <div className="py-24">
            <div className="container mx-auto px-4">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Featured Courses
                  </h2>
                  <p className="text-gray-600 mt-2">
                    Explore our Popular Courses
                  </p>
                </div>
                <Button
                  type="default"
                  className="hover:bg-orange-500 hover:text-white transition-colors"
                >
                  All Courses
                </Button>
              </div>
              <CoursesGrid />
            </div>
          </div>
        </section>

        <section>
          <div className="py-24 grid gap-6 grid-cols-4 justify-between">
            <Card
              className=" h-40 bg-[#EAEAEA] text-center flex flex-col items-center align-center justify-center"
              hoverable
            >
              <h3 className="h3">25K+</h3>
              <p>Active Students</p>
            </Card>
            <Card
              className="h-40 bg-[#EAEAEA] text-center flex flex-col items-center align-center justify-center"
              hoverable
            >
              <h3 className="h3">888+</h3>
              <p>Total Courses</p>
            </Card>
            <Card
              className=" h-40 bg-[#EAEAEA] text-center flex flex-col items-center align-center justify-center"
              hoverable
            >
              <h3 className="h3">253+</h3>
              <p>Active Instructors</p>
            </Card>
            <Card
              className=" h-40 bg-[#EAEAEA] text-center flex flex-col items-center align-center justify-center"
              hoverable
            >
              <h3 className="h3">100%</h3>
              <p>Satisfaction Rate</p>
            </Card>
          </div>
        </section>

        <section>
          <CTABanner />
        </section>

        <section>
          <LatestArticles />
        </section>
      </main>
    </div>
  );
};

export default HomePage;

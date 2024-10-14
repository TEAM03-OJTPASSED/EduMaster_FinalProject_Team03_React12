
import { useCustomNavigate } from "../hooks/customNavigate";
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Input, Button, Form } from 'antd';

const { TextArea } = Input;

const ContactPage: React.FC = () => {
  const navigate = useCustomNavigate();
  const position: LatLngExpression = [10.857239, 106.790775];

  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Form values: ', values); //Values save the values that entered after click send me button
  };
  return (
    <div>
      <div className="bg-gray-150 pl-3 pr-3">
        <div className="w-full h-14 content-center ">
          <ul className="flex">
            <li className="mr-3">
              <a className='cursor-pointer hover:text-orange-400' onClick={() => { navigate("/") }}>Home
                <i className="fas fa-chevron-right ml-3 text-sm"></i>
              </a>
            </li>
            <li className="text-gray-400">Contact Us</li>
          </ul>
        </div>
        <hr className="border-b border-gray-300" />
      </div>
      <div className="pl-3 pr-3 mt-12 mb-8">
        <h1 className="font-semibold text-4xl mb-9">Contact Us</h1>
        <div className="flex">
          <div className="w-1/3 p-3 pl-0">
            <h1 className="font-semibold text-4xl inline-block mb-2.5">Need a direct line?</h1>
            <p className="text-1.5xl mt-2.5 w-full">
              Cras massa et odio donec faucibus in.
              Vitae pretium massa dolor ullamcorper lectus elit quam.
              Nec eu pellentesque blandit urna.
              A lacus sagittis nec fermentum id sed in.
              Lacus feugiat eget nulla phasellus commodo
            </p>
            <div className="pt-5">
              <div>
                <div className="flex pb-4">
                  <i className="fas fa-phone-alt text-orange-500 text-3xl p-5 bg-gray-100 rounded-md"></i>
                  <div className="ml-8">
                    <h3 className="text-gray-400 mt-5 mb-2">Phone</h3>
                    <p className="font-semibold">(123) 456 7890</p>
                  </div>
                </div>
                <div>
                  <div className="flex pt-4">
                    <i className="fas fa-envelope text-orange-500 text-3xl p-5 bg-gray-100 rounded-md"></i>
                    <div className="ml-8">
                      <h3 className="text-gray-400 mt-5 mb-2">Email</h3>
                      <p className="font-semibold">Demo@Domain.Com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-3/4 p-4">
            <MapContainer center={position} zoom={16} style={{ height: '400px', width: '100%', borderRadius: '2.5%' }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
              />
              <Marker position={position}>
                <Popup>
                  OneHub SaiGon
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </div>
      {/* <div className="p-4">
        <h2 className="font-semibold text-4xl leading-relaxed pb-10">Contact Us</h2>

        <div className="flex">
          <div className="w-1/3 mr-4">
            <span className="block text-gray-600 text-lg mb-2.5">Name *</span>
            <Input placeholder="First & Last name" className="pt-2.5 pb-2.5 pl-5 pr-5 rounded-3xl border-2 text-gray-600 text-lg mb-5" />
          </div>
          <div className="w-1/3 ml-4 mr-4">
            <span className="block text-gray-600 text-lg mb-2.5">Gmail *</span>
            <Input placeholder="Info@example.com" className="pt-2.5 pb-2.5 pl-5 pr-5 rounded-3xl border-2 text-gray-600 text-lg mb-5" />
          </div>
          <div className="w-1/3 ml-4">
            <span className="block text-gray-600 text-lg mb-2.5">Website *</span>
            <Input placeholder="https://www.systeminfo.com" className="pt-2.5 pb-2.5 pl-5 pr-5 rounded-3xl border-2 text-gray-600 text-lg mb-5" />
          </div>
        </div>
        <span className="mb-2.5 text-gray-600 text-lg">Comment</span>
        <div className="mb-5">
          <TextArea rows={5} placeholder="Your comment here" className="text-gray-600 text-lg mt-2.5 border-2 h-45 pt-2.5 pb-2.5 pr-5 pl-5" />
        </div>
        <div >
          <Button className="h-12  bg-orange-500 pt-3 pb-3 pl-9 pr-9 text-white rounded-3xl border-2 text-lg font-semibold hover:bg-orange-400">
            Send me
          </Button>
        </div>
      </div> */}
      <div className="p-4">
        <h2 className="font-semibold text-4xl leading-relaxed pb-10">Contact Us</h2>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          <div className="flex">
            <div className="w-1/3 mr-4">
              <Form.Item
                label="Name"
                name="name"
                rules={[
                  { required: true, message: 'Please enter your name' },
                  { min: 3, message: 'Name must be at least 3 characters long' },
                ]}
              >
                <Input
                  placeholder="First & Last name"
                  className="pt-2.5 pb-2.5 pl-5 pr-5 rounded-3xl border-2 text-gray-600 text-lg mb-5"
                />
              </Form.Item>
            </div>

            <div className="w-1/3 ml-4 mr-4">
              <Form.Item
                label="Gmail"
                name="email"
                rules={[
                  { required: true, message: 'Please enter your email' },
                  { type: 'email', message: 'Please enter a valid email' },
                ]}
              >
                <Input
                  placeholder="Info@example.com"
                  className="pt-2.5 pb-2.5 pl-5 pr-5 rounded-3xl border-2 text-gray-600 text-lg mb-5"
                />
              </Form.Item>
            </div>

            <div className="w-1/3 ml-4">
              <Form.Item
                label="Website"
                name="website"
                rules={[
                  { required: true, message: 'Please enter your website' },
                  { type: 'url', message: 'Please enter a valid URL' },
                ]}
              >
                <Input
                  placeholder="https://www.systeminfo.com"
                  className="pt-2.5 pb-2.5 pl-5 pr-5 rounded-3xl border-2 text-gray-600 text-lg mb-5"
                />
              </Form.Item>
            </div>
          </div>

          <Form.Item
            label="Comment"
            name="comment"
            rules={[
              { required: true, message: 'Please enter your comment' },
              { min: 10, message: 'Comment must be at least 10 characters long' },
            ]}
          >
            <TextArea
              rows={5}
              placeholder="Your comment here"
              className="text-gray-600 text-lg mt-2.5 border-2 h-45 pt-2.5 pb-2.5 pr-5 pl-5"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="h-12 bg-orange-500 pt-3 pb-3 pl-9 pr-9 text-white rounded-3xl border-2 text-lg font-semibold hover:bg-orange-400"
            >
              Send me
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default ContactPage;

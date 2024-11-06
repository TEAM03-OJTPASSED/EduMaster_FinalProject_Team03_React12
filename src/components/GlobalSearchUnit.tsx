import { SearchOutlined } from "@ant-design/icons";
import { Input, Form, Select } from "antd";

const { Option } = Select;

export interface SelectField {
    name: string;
    options: Array<{ value: string; label: string }>;
    placeholder?: string;
    onSelect?: () => void;
    isToggleRemoves?: boolean;
}

interface GlobalSearchUnitProps {
    placeholder: string;
    selectFields?: SelectField[]; // Array of dynamic Select fields
    onSubmit?: (values: Record<string, any>) => void;
}

const GlobalSearchUnit = ({ selectFields, onSubmit, placeholder }: GlobalSearchUnitProps) => {
    const [form] = Form.useForm();

    

    return (
        <Form form={form} className="flex flex-row max-w-full space-x-4 ">
            {/* Main search text field */}
            <Form.Item name="searchtext"  >
                <Input
                    placeholder={placeholder}
                    prefix={<SearchOutlined />}
                    className="rounded-sm w-full max-w-80"
                    onPressEnter={() => console.log(form.getFieldsValue())}
                />
            </Form.Item>

            {/* Dynamic select fields */}
            {selectFields?.map(field => (
                <Form.Item key={field.name} name={field.name}>
                    <Select
                        allowClear
                        placeholder={field.placeholder || `Select ${field.name}`}
                        className="custom-selector w-full max-w-60"
                    >
                        {field.options.map(option => (
                            <Option key={option.value} value={option.value}>
                                {option.label}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
            ))}
        </Form>
    );
};

export default GlobalSearchUnit;

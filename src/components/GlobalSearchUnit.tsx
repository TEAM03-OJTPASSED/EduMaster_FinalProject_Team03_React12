import { SearchOutlined } from "@ant-design/icons";
import { Input, Form, Select, Button } from "antd";
import { useState } from "react";

const { Option } = Select;

export interface SelectField {
  name: string;
  options: Array<{ value: string; label: string; dependence?: string }>;
  placeholder?: string;
  dependenceName?: string; // Name of the dependence Select field
  // onClick?: () => void;
}

interface GlobalSearchUnitProps {
  placeholder: string;
  selectFields?: SelectField[]; // Array of dynamic Select fields
  onSubmit: (values: Record<string, unknown>) => void; // Callback to get values from the input fields
  isDependentSelect?: boolean; // Flag to enable dependent Select field
}

const GlobalSearchUnit = ({
  selectFields,
  onSubmit,
  placeholder,
  isDependentSelect,
}: GlobalSearchUnitProps) => {
  const [form] = Form.useForm();
  const [trackFormFields, setTrackFormFields] =
    useState<Record<string, unknown>>();

  const updateTracker = (isDelete: boolean) => {
    if (isDependentSelect) {
      setTrackFormFields(form.getFieldsValue);
    }

    if (isDelete && isDependentSelect) {
      const keyword = form.getFieldValue("keyword");
      form.resetFields();
      form.setFieldsValue({ keyword: keyword });
    }
  };

  return (
    <Form form={form} className="flex flex-row max-w-full space-x-4 ">
      <Form.Item name="keyword">
        <Input
          allowClear
          placeholder={placeholder}
          prefix={<SearchOutlined />}
          className="rounded-sm w-full max-w-80"
          onPressEnter={() => {
            onSubmit(form.getFieldsValue());
          }}
        />
      </Form.Item>

      <SelectFields
        selectFields={selectFields}
        trackFormFields={trackFormFields}
        trackChange={updateTracker}
      />

      <Button
        shape="round"
        type="primary"
        className="items-center"
        onClick={() => onSubmit(form.getFieldsValue())}
        icon={<SearchOutlined />}
      >
        Search
      </Button>
    </Form>
  );
};

export default GlobalSearchUnit;

const SelectFields = ({
  selectFields,
  trackFormFields,
  trackChange,
}: {
  selectFields?: SelectField[];
  trackFormFields?: Record<string, unknown>;
  trackChange: (isDelete: boolean) => void;
}) => {
  return (
    <>
      {selectFields?.map((field) =>
        field.dependenceName ? (
          <Form.Item key={field.name} name={field.name}>
            <Select
              // onClick={() => field.onClick && field.onClick()}
              disabled={trackFormFields?.[field.dependenceName] === undefined}
              allowClear
              placeholder={field.placeholder ?? `Select ${field.name}`}
              className="custom-selector w-full max-w-60"
            >
              {field.options
                .filter((option) => {
                  if (
                    !option.dependence ||
                    !field.dependenceName ||
                    !trackFormFields
                  ) {
                    return true;
                  }
                  const dependentValue = trackFormFields[field.dependenceName];
                  return (
                    option.dependence === (dependentValue?.toString() ?? "")
                  );
                })
                .map((option) => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
            </Select>
          </Form.Item>
        ) : (
          <Form.Item key={field.name} name={field.name}>
            <Select
              // onClick={() => field.onClick && field.onClick()}
              allowClear
              placeholder={field.placeholder ?? `Select ${field.name}`}
              className="custom-selector w-full max-w-60"
              onChange={() => trackChange(false)}
              onClear={() => trackChange(true)}
            >
              {field.options.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
        )
      )}
    </>
  );
};

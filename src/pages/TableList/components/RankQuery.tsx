/**
 * @author 陆劲涛
 * @description 高考位次一分一段查询
 */
import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Form, Input, InputNumber, Modal, Select } from 'antd';

import { AudioOutlined } from '@ant-design/icons';
import { rankScoreLi, ranksWen } from '../mock/data';

const { Option } = Select;

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1890ff',
    }}
  />
);

export class RankQueryProps {}

const RankQuery: React.FC<RankQueryProps> = (props) => {
  const onFinish = (formData: { rank: number; subject: '理科' | '文科' }) => {
    let score = 0;
    if (formData.subject === '理科') {
      for (const key of rankScoreLi) {
        let row = key[2];
        if (row > formData.rank) {
          score = key[0];
          break;
        }
      }
    } else {
      for (const key of ranksWen) {
        let row = key[2];
        if (row > formData.rank) {
          score = key[0];
          break;
        }
      }
    }
    console.log('Success:', formData);
    console.log('等位分:', score);
    setSameScore(score);
    setIsModalOpen(true);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const [rank, setRank] = useState<number>();
  const [sameScore, setSameScore] = useState<number>(0);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form] = Form.useForm();
  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="">安徽2022高考等位分智能查询系统</h2>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        className=" max-w-xl"
        form={form}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="文/理科"
          name="subject"
          rules={[{ required: true, message: '请选择文理科！' }]}
        >
          <Select>
            <Option value="理科">理科</Option>
            <Option value="文科">文科</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="高考位次"
          name="rank"
          rules={[
            {
              type: 'number',
              min: 1,
              message: '高考位次必须大于0！',
            },
          ]}
        >
          <InputNumber
            className="w-auto"
            placeholder="请输入高考位次"
            value={rank}
            onChange={(e: any) => setRank(e)}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            查询
          </Button>
        </Form.Item>
      </Form>
      <Modal
        title="查询结果"
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
      >
        <p>
          您的位次是:{rank}，等位分是{sameScore}
        </p>
      </Modal>
      <br />
    </div>
  );
};

RankQuery.defaultProps = new RankQueryProps();
export default RankQuery;

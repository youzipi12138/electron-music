import Modal from 'antd/es/modal/Modal';
import Form from 'antd/es/form';
import Input from 'antd/es/input';
import Button from 'antd/es/button';
import Select from 'antd/es/select';
import { useMemo, useState } from 'react';
import User from '@/api/userApi';

interface QrProps {
  isShow: boolean;
  setIsShow: (value: boolean) => void;
}

const QrModal = ({ isShow, setIsShow }: QrProps) => {
  const [isQr, setIsQr] = useState(true);
  const prefixSelector = useMemo(
    () => (
      <Form.Item name='prefix' noStyle initialValue='86'>
        <Select
          className='w-20'
          options={[
            { label: '+86', value: '86' },
            { label: '+852', value: '852' },
            { label: '+853', value: '853' },
            { label: '+886', value: '886' },
            { label: '+1', value: '1' },
          ]}
        />
      </Form.Item>
    ),
    []
  );
  return (
    <Modal
      width={377}
      open={isShow}
      footer={null}
      centered
      onCancel={() => setIsShow(false)}
    >
      {isQr ? (
        <div className=' h-[400px] flex flex-col items-center'>
          <div className='font-semibold text-2xl mb-10 mt-[50px]'>扫码登录</div>
          <div className='w-[180px] h-[180px]'>
            <img
              src='https://i.pravatar.cc/48?img=5'
              alt=''
              className='w-full h-full'
            />
          </div>
          <div className='mt-5'>
            使用<span className='text-blue-500 mx-1'>网易云音乐APP</span>
            扫码登录
          </div>
          <div className='mt-5 cursor-pointer' onClick={() => setIsQr(false)}>
            选择其他方式登录-
          </div>
        </div>
      ) : (
        <div className='h-[400px] px-6 pt-10 flex flex-col'>
          <div className='text-xl font-semibold mb-6'>账号密码登录</div>
          <Form
            layout='vertical'
            onFinish={async (values) => {
              try {
                User.login(values.phone, values.password);
              } catch (e) {
                console.log('登录出错', e);
              }
              // console.log(values.phone);
              // console.log(values.password);
            }}
            className='flex-1'
          >
            <Form.Item
              name='phone'
              rules={[{ required: true, message: '请输入账号' }]}
            >
              <Input addonBefore={prefixSelector} placeholder='请输入手机号' />
            </Form.Item>
            <Form.Item
              name='password'
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input.Password placeholder='请输入密码' />
            </Form.Item>
            <Form.Item>
              <Button type='primary' htmlType='submit' className='w-full'>
                登录
              </Button>
            </Form.Item>
          </Form>
          <div
            className='mt-auto text-sm text-blue-500 cursor-pointer text-center'
            onClick={() => setIsQr(true)}
          >
            返回扫码登录
          </div>
        </div>
      )}
    </Modal>
  );
};

export default QrModal;

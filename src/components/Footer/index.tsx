import { GithubOutlined, WechatOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import React from 'react';

const Footer: React.FC = () => {
  const intl = useIntl();
  const defaultMessage = intl.formatMessage({
    id: 'app.copyright.produced',
    defaultMessage: '学峰教育出品',
  });

  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'weixin',
          title: <WechatOutlined />,
          href: 'https://xuefeng-1gc618ip42799984-1317554492.tcloudbaseapp.com',
          blankTarget: true,
        },
        {
          key: 'weixin-txt',
          title: '添加陆老师微信',
          href: 'https://xuefeng-1gc618ip42799984-1317554492.tcloudbaseapp.com',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;

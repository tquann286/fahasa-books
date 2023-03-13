import { LogoutOutlined } from '@ant-design/icons'
import { Avatar, Dropdown, Menu, Popover } from 'antd'

const NavProfile = ({ signOut }) => {
  const profileMenu = (
    <Popover placement="bottomLeft">
      <Menu
        onClick={() => signOut()}
        items={[{ label: 'Sign Out', icon: <LogoutOutlined className="mr-2" /> }]}
      />
    </Popover>
  )

  return (
    <Dropdown placement="bottomLeft" overlay={profileMenu} trigger={['click']}>
      <Menu
        mode="horizontal"
        className="flex items-center"
        items={[{ icon: <Avatar className="text-primary">Admin</Avatar> }]}
      />
    </Dropdown>
  )
}

export default NavProfile

import { Layout, Menu } from 'antd'
import styled from 'styled-components'
import { themeGet } from '@styled-system/theme-get'

const { Content, Sider, Header } = Layout

export const CustomLayout = styled(Layout)``

export const CustomContent = styled(Content)`
  padding: ${themeGet('spaces.container')}px;
  min-height: calc(100vh - ${themeGet('headerHeight')}px);
  background-color: white;

`

export const CustomMenu = styled(Menu)`
  background-color: ${themeGet('colors.primary')};
  /* border-right: 1px solid ${themeGet('colors.primary')}; */
  height: calc(100% - ${themeGet('headerHeight')}px);
  /* position: relative; */
`

export const CustomMenuItem = styled(Menu.Item)`
  font-size: ${themeGet('sizes.S')};
  font-weight: 700;
  margin-top: 0 !important;
`

export const CustomSider = styled(Sider)`
  /* background-color: ${themeGet('colors.primary')}; */
`

export const CustomHeader = styled(Header)`
  height: ${themeGet('headerHeight')}px;
  background-color: white;
  padding: 0 ${themeGet('spaces.container')}px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 0 10px -5px gray;
  z-index: 1;
`

export const Logo = styled.p`
  height: ${themeGet('headerHeight')}px;
  color: white;
  padding: 0 16px 0 24px;
  display: flex;
  align-items: center;
  font-weight: 700;
  font-size: ${themeGet('sizes.Standard')};
`
export const UserInfo = styled.div`
  cursor: pointer;
  height: 100%;
  display: flex;
  align-items: center;
`
export const Avatar = styled.img``
export const DisplayName = styled.span`
  color: ${themeGet('colors.primary')};
  margin-left: 0.5rem;
  font-weight: 500;
  font-size: ${themeGet('sizes.M')};
`
export const TabName = styled.span`
  color: ${themeGet('colors.primary')};
  font-weight: 500;
  font-size: ${themeGet('sizes.L')};
`

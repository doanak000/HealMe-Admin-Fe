import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";
import { Button } from "antd";

export const WrapperRegister = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  height: 100%;
`;
export const WrapperRegisterForm = styled.div`
  padding: calc(1.5 * ${themeGet("spaces.container")}px);
  box-shadow: 7px 7px 2px 1px #c7e3ff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 5px solid ${themeGet("colors.grayBackground")};
  border-left: 5px solid ${themeGet("colors.grayBackground")};
  border-radius: 15px;

  @media only screen and (min-height: 1300px) {
    min-height: 45vh;
    width: 45vh;
  }
  @media only screen and (max-height: 700px) {
    padding: calc(1 * ${themeGet("spaces.container")}px);
  }
`;
export const TitleRegister = styled.p`
  text-align: center;
  font-weight: 700;
  font-size: 3rem;
  background: -webkit-linear-gradient(#74b9ff, ${themeGet("colors.primary")});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 10px;
`;
export const RegisterLable = styled.span`
  font-size: ${themeGet("sizes.M")};
  padding-right: 30px;
  font-weight: 500;
`;
export const RegisterButton = styled(Button)`
  padding-left: 31px;
  padding-right: 31px;
  background: ${themeGet("colors.primary")};
  border: none;

  &:hover {
    background: ${themeGet("colors.primaryHover")};
    border: none;
  }
`;

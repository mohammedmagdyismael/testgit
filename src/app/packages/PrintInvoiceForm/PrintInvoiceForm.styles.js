import styled, { css } from 'styled-components';
import { Icon } from '@vezeeta/web-components';

export const ModalContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  bottom: 0;
  box-sizing: border-box;
  left: 0;
  opacity: ${props => (props.isModalShowed ? '1' : '0')};
  overflow-x: hidden;
  overflow-y: auto;
  position: fixed;
  right: 0;
  top: ${props => (props.isModalShowed ? '0' : '12px')};
  transition-delay: ${props => (props.isModalShowed ? '0s, 75ms, 75ms' : '0s, 0s, 0s')};
  transition-duration: 125ms, 50ms, 50ms;
  transition-property: top, opacity, z-index;
  transition-timing-function: linear;
  z-index: ${props => (props.isModalShowed ? '1000' : '-1')};
  padding: 0px 16px;
  ${props => props.theme.media.desktop`
    padding: 0px;
  `};
`;

export const InnerPopupContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  border-radius: 4px;
  position: relative;
  width: 600px;
  max-height: 95vh;
  left: ${props => (props.language === 'en' ? 'calc(50% - 300px)' : 'unset')};
  right: ${props => (props.language === 'ar' ? 'calc(50% - 300px)' : 'unset')};
  top: 12px;
  filter: drop-shadow(0px 4px 16px rgba(0, 0, 0, 0.16));
  background-color: #fff;
`;

export const IconContainer = styled.div`
  display: inline-flex;
  padding: 0px 20px;
`;

export const HeaderTitle = styled.p`
  font-size: 18px;
  line-height: 24px;
  font-size: 14px;
  line-height: 15px;
  text-align: left;
  padding: 12px 16px;
  display: inline-flex;
  color: #fff;
`;

export const PopUpHeader = styled.div`
  // margin: 10px 0px 15px;
  background-color: #0070cd;
  border-radius: 4px 4px 0px 0px;
  color: #fff;
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  box-shadow: inset 0px -1px 0px #e3e6ea;
`;

export const CloseLink = styled.div`
  color: #666666;
  font-size: 13px;
  line-height: 19px;
  padding: 10px 0px;
  cursor: pointer;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-bottom: solid 1px #e3e6ea;
  padding: 8px 0px;
  height: calc(95vh - 100px);
`;

export const SaveButton = styled.div`
  align-items: center;
  padding: 10px 19px;
  color: #fff;
  cursor: pointer;
  background-color: #0070cd;
  border-radius: 7px;
  font-size: 13px;
  font-weight: bold;
`;

export const ButtonContainer = styled.div`
  width: 100%;
  padding: 8px 15px;
  display: inline-flex;
  justify-content: space-between;
  border-top: solid 1px #e3e6ea;
`;

export const CloseIcon = styled(Icon)`
  cursor: pointer;
`;

export const InnerContainer = styled.div`
  // padding: 13px;
  overflow: auto;
  max-height: 525px;
  ::-webkit-scrollbar {
    width: 4px;
  }
  ::-webkit-scrollbar-thumb {
    background: #9c9c9c;
    border-radius: 15px;
  }
`;

export const StatusContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  padding: 80px 0px;
`;

export const StatusContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const ErrorImage = styled.img`
  width: 128px;
  margin: 0 auto;
`;

export const ErrorMessageContainer = styled.div`
  margin-top: 11px;
`;

export const ErrorMessage = styled.p`
  font-weight: 600;
  font-size: 13px;
  line-height: 19px;
  text-align: center;
  color: #484848;
`;

export const extendRefreshButton = css`
  margin: 10px auto 0px auto;
`;

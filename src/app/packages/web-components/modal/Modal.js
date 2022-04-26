import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icons from '../../icons';
import styled from 'styled-components';
import { Flex } from 'grid-styled';

import Text from '../text/Text';
import Icon from '../icon/Icon';
import IconsStore from '../icon/IconsStore';
import withDisplayName from '../WithDisplayName';
import { FONT_TYPES } from '../base/Typography';
import './Modal.scss';

const ModalBackground = styled(Flex)`
  background-color: rgba(0, 0, 0, 0.3);
  bottom: 0;
  box-sizing: border-box;
  left: 0;
  opacity: ${props => (props.isModalShowed ? '1' : '0')};
  overflow-x: hidden;
  overflow-y: auto;
  position: fixed;
  right: 0;
  top: ${props => (props.isModalShowed ? '0' : '50px')};
  transition-delay: ${props => (props.isModalShowed ? '0s, 75ms, 75ms' : '0s, 0s, 0s')};
  transition-duration: 125ms, 50ms, 50ms;
  transition-property: top, opacity, z-index;
  transition-timing-function: linear;
  z-index: ${props => (props.isModalShowed ? '100' : '-1')};
  padding: 0px 20px;
  ${props => props.theme.media.desktop`
    padding: 0px;
  `};
`;

const ModalScroll = styled.div`
  box-sizing: border-box;
`;

const ModalContainer = styled(Flex)`
  border-radius: 2px;
  background-color: #fff;
  margin: 32px 0;
  position: relative;
  width: auto;
  ${props => props.theme.media.desktop`
    width: 500px;
  `};
`;

const ModalHeader = styled(Flex)`
  border-bottom: 1px solid #e0e0e0;
  height: 48px;
  padding: ${props => (props.isArabic ? '0 0 0 16px' : '0 16px 0 0')};
`;

const FIRST_TAB = 0;
const ESCAPE = 27;

class Modal extends Component {
  constructor(props) {
    super(props);

    this.modalContainer = React.createRef();

    this.tabs = new Map();
    this.pages = new Map();
    this.iconsStore = new IconsStore(Icons);

    this.state = {
      selectedTabIndex: 0,
      shouldSwitchTabs: this.props.tabs.length > 1,
      isModalShowed: this.props.show,
    };
  }

  componentDidMount() {
    this.changeTab(FIRST_TAB);

    if (this.props.show === true) {
      this.showModal();
    } else if (this.props.show === false) {
      this.hideModal();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.show !== this.state.isModalShowed) {
      if (nextProps.show === true) {
        this.showModal();
      } else if (nextProps.show === false) {
        this.hideModal();
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.tabs !== prevProps.tabs) {
      this.changeTab(FIRST_TAB);
    }
  }

  onKeyDown = e => {
    const key = e.keyCode;
    if (key === ESCAPE) {
      this.hideModal();
    }
  };

  getTabs = () => {
    const tabs = this.props.tabs.map((tab, index) => {
      const tabNode = (
        <div
          className="tab-container"
          key={tab.tabName}
          ref={tabRef => {
            this.tabs.set(index, tabRef);
          }}
          onClick={event => this.changeTab(index, event)}
          tabIndex="0"
          onKeyDown={() => {}}
        >
          <Text tag="h3" type={FONT_TYPES.SUBHEADING} className="tab">
            {tab.tabName}
          </Text>
        </div>
      );
      return tabNode;
    });
    return tabs;
  };

  getModalTitle = tab => (
    <div className="tab-container--static">
      <Text tag="h3" type={FONT_TYPES.SUBHEADING} className="tab">
        {tab.tabName}
      </Text>
    </div>
  );

  getPages = () => {
    const pages = this.props.tabs.map((tab, index) => (
      <div
        key={tab.tabName}
        className="modal-content"
        ref={page => {
          this.pages.set(index, page);
        }}
      >
        {tab.tabPage}
      </div>
    ));
    return pages;
  };

  changeTab = index => {
    const selectedTab = this.tabs.get(this.state.selectedTabIndex);
    const selectedPage = this.pages.get(this.state.selectedTabIndex);
    const newTab = this.tabs.get(index);
    const newPage = this.pages.get(index);

    this.setState(
      {
        selectedTabIndex: index,
      },
      () => {
        if (selectedTab) {
          selectedTab.classList.remove('tab--active');
          selectedPage.classList.remove('modal-content--show');
        }

        if (this.state.shouldSwitchTabs) {
          newTab.classList.add('tab--active');
        }
        newPage.classList.add('modal-content--show');
      },
    );
  };

  showModal = () => {
    this.setState(
      {
        isModalShowed: true,
      },
      () => {
        document.getElementsByTagName('body')[0].style.overflow = 'hidden';

        // Auto focus on the container div
        // if (this.modalContainer) {
        //   this.modalContainer.focus();
        // }

        if (this.props.onShow) {
          this.props.onShow();
        }
      },
    );
  };

  hideModal = () => {
    this.setState(
      {
        isModalShowed: false,
      },
      () => {
        document.getElementsByTagName('body')[0].style.overflow = 'auto';

        if (this.props.onHide) {
          this.props.onHide();
        }
      },
    );
  };

  render() {
    const { tabs, className, isArabic } = this.props;
    const { isModalShowed } = this.state;
    return (
      <ModalBackground
        justifyContent="center"
        width={1}
        isModalShowed={isModalShowed}
        tabIndex="0"
        onKeyDown={this.onKeyDown}
        ref={this.modalContainer}
      >
        <ModalScroll>
          <ModalContainer flexDirection="column" className={className}>
            <ModalHeader
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              isArabic={isArabic}
            >
              <div className="modal-tabs">
                {tabs.length !== 1 ? this.getTabs() : this.getModalTitle(tabs[0])}
              </div>
              <button className="modal-close_btn" onClick={this.hideModal}>
                <Icon className="close-icon" icon={this.iconsStore.getIcon('close')} width={13} />
              </button>
            </ModalHeader>
            <div className="modal-content-container">{this.getPages()}</div>
          </ModalContainer>
        </ModalScroll>
      </ModalBackground>
    );
  }
}

Modal.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      tabName: PropTypes.string,
      tabPage: PropTypes.node,
    }),
  ).isRequired,
  show: PropTypes.bool,
  className: PropTypes.string,
  onHide: PropTypes.func,
  onShow: PropTypes.func,
  isArabic: PropTypes.bool,
};

Modal.defaultProps = {
  show: false,
  className: undefined,
  onHide: () => {},
  onShow: () => {},
  isArabic: false,
};

export default withDisplayName(Modal, 'Modal');

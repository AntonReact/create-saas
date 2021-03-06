import React, { useCallback } from 'react';
import './MainLayout.scss';
import Sidebar from '../../Components/Sidebar';
import { Switch, Route } from 'react-router-dom';
import SampleFormPage from './SampleFormPage';
import ValidationFormPage from './ValidationFormPage';
import DefaultFormPage from './DefaultFormPage';
import SliderPage from './SliderPage';
import DatePickerPage from './DatePickerPage';
import SwitchPage from './SwitchPage';
import NavBar from '../../Components/NavBar';
import Datatable from './DatatablePage';
import FormStepsPage from './FormStepsPage';
import RegularTable from './RegularTablePage';
import SidebarCategoryTable from './SidebarCategoryTablePage';
import Dashboard from './Dashboard';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { stateType } from '../../Components/SettingsButton/types';
import UIScreenPage from './UIScreenPage';
import Badges from './UIScreenPage/UIElementsPages/Badges';
import Dropdowns from './UIScreenPage/UIElementsPages/Dropdowns';
import LineChart from '../../Components/Charts/LineChart';
import PieChart from '../../Components/Charts/PieChart';
import BarChart from '../../Components/Charts/BarChart';
import ScatterChart from '../../Components/Charts/ScatterChart';
import Buttons from './UIScreenPage/UIElementsPages/Buttons';
import Paginations from './UIScreenPage/UIElementsPages/Paginations';
import Images from './UIScreenPage/UIElementsPages/Images';
import Lists from './UIScreenPage/UIElementsPages/Lists';
import ProgressBars from './UIScreenPage/UIElementsPages/ProgressBars';
import Alerts from './UIScreenPage/UIElementsPages/Alerts';
import { Alert } from '../../Components/Alert';
import { NotificationContext, NotificationContextType } from '../../Components/NotificationContext';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import Notifications from './UIScreenPage/UIElementsPages/Notifications';
import Tabs from './UIScreenPage/UIElementsPages/Tabs';
import Typography from './UIScreenPage/UIElementsPages/Typography';
import BreadcrumbsPage from './UIScreenPage/UIElementsPages/Breadcrumbs';
import { useQuery, gql } from '@apollo/client';
import { ProtectedRoute } from '@frontegg/react-auth';
import { SSO } from '@frontegg/react-auth';

const REQUESTS = gql`
  query {
    requests {
      id
      tenantId
      url
      userAgent
      statusCode
      createdAt
    }
  }
`;

const MainDashboard = () => {
  const { loading, error, data } = useQuery(REQUESTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return <Dashboard requests={data.requests} />;
};

const MainLayout: React.FC = () => {
  const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  };

  const [fixedSidebar, setFixSidebar] = React.useState<boolean>(true);
  const handleFixSidebar = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFixSidebar(!fixedSidebar);
  };

  const [fixedNavbar, setFixNavbar] = React.useState<boolean>(false);
  const handlesFixNavbar = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFixNavbar(!fixedNavbar);
  };

  const [collapsed, collapse] = React.useState<boolean>(false);
  const handleCollapse = (event: React.ChangeEvent<HTMLInputElement>) => {
    collapse(!collapsed);
  };

  const [windowDimensions, setWindowDimensions] = React.useState(getWindowDimensions());

  const [hovered, hoverExpand] = React.useState<boolean>(false);

  const handleFixeHover = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (collapsed) {
      if (fixedSidebar) {
        hoverExpand(!hovered);
      }
    }
    if (!fixedSidebar) {
      hoverExpand(false);
    }
  };
  const context = React.useContext<NotificationContextType>(NotificationContext);
  const [scrolled, setScrolled] = React.useState<boolean>(false);

  const handleScroll = useCallback(() => {
    if (window.pageYOffset === 0) {
      setScrolled(false);
    }
    if (window.pageYOffset > 0 && !scrolled) {
      setScrolled(true);
    }
  }, [scrolled]);

  const handleResize = useCallback(() => {
    setWindowDimensions(getWindowDimensions());
  }, []);

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [handleScroll, handleResize]);

  React.useEffect(() => {
    if (windowDimensions.width < 768) {
      collapse(true);
    } else {
      collapse(false);
    }
  }, [windowDimensions]);

  const switches = [
    {
      label: 'Fix sidebar',
      state: [fixedSidebar, setFixSidebar] as stateType<boolean>,
    },
    {
      label: 'Fix navbar',
      state: [fixedNavbar, setFixNavbar] as stateType<boolean>,
    },
  ];

  const [palletType, setPalletType] = React.useState<'light' | 'dark' | 'navbar' | 'sidebar'>('light');
  const palette = palletType === 'navbar' || palletType === 'sidebar' ? 'light' : palletType;
  const darkTheme = createMuiTheme({
    palette: {
      type: palette,
      primary: {
        main: '#2196f3',
      },
    },
  });

  React.useEffect(() => {
    document.getElementById('root')?.classList.add(`theme-light`);
  }, []);

  const handleThemeChange = (value: 'light' | 'dark' | 'navbar' | 'sidebar') => {
    setPalletType(value);
    document.getElementById('root')!.className = '';
    document.getElementById('root')?.classList.add(`theme-${value}`);
  };

  const handleChangeNavbar = (value: string, param: string, theme: string) => {
    document.getElementById('root')?.classList.add(`theme-${theme}`);
    const app: HTMLElement | null = document.querySelector('.app');
    app?.style.setProperty(param, value);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <div className='position-fixed fixed-bottom'>
        {context &&
          Object.entries(context.notifications).map(([key, value]) => {
            if (value.position === 'fixed-bottom') {
              return (
                <Alert
                  notificationKey={key}
                  {...value}
                  className={` position-realtive ${value.className}`}
                  style={{ zIndex: 1000 }}>
                  {value.text}
                </Alert>
              );
            }
            return null;
          })}
      </div>
      <div className='position-fixed fixed-top'>
        {context &&
          Object.entries(context.notifications).map(([key, value]) => {
            if (value.position === 'fixed-top') {
              return (
                <Alert
                  notificationKey={key}
                  {...value}
                  className={` position-realtive ${value.className}`}
                  style={{ zIndex: 1000 }}>
                  {value.text}
                </Alert>
              );
            }
            return null;
          })}
      </div>
      <NotificationContainer />
      <div
        className={`mainLayout ${scrolled ? 'scrolled' : 'onTop'} ${fixedSidebar ? 'fixedSidebar' : ''} ${
          fixedNavbar ? 'fixedNavbar' : ''
        }`}>
        <NavBar
          handleChangeNavbar={handleChangeNavbar}
          settings={switches}
          handleThemeChange={handleThemeChange}
          palletType={palletType}
          className={`${collapsed ? (hovered && fixedSidebar ? 'expanded' : 'collapsed') : 'expanded'}
                    ${fixedNavbar ? 'position-fixed' : 'position-absolute'}`}
        />
        <Sidebar
          className={`${
            collapsed
              ? getWindowDimensions().width > 767 && hovered && fixedSidebar
                ? 'expanded'
                : 'collapsed'
              : 'expanded'
          }`}
          onMouseLeave={handleFixeHover}
          onMouseEnter={handleFixeHover}
        />
        <div className='main'>
          {context &&
            Object.entries(context.notifications).map(([key, value]) => {
              if (value.position === 'top') {
                return (
                  <Alert notificationKey={key} {...value} style={{ zIndex: 1000 }}>
                    {value.text}
                  </Alert>
                );
              }
              return null;
            })}
          <div className='p-4 content'>
            <Switch>
              <ProtectedRoute path='/sso' component={SSO.Page} />
              <Route path='/tables/datatable' component={Datatable} />
              <Route path='/dashboard' component={MainDashboard} />
              <Route path='/forms/sample-forms' component={SampleFormPage} />
              <Route path='/forms/default-forms' component={DefaultFormPage} />
              <Route path='/forms/sliders' component={SliderPage} />
              <Route path='/tables/datatable' component={Datatable} />
              <Route path='/tables/regular' component={RegularTable} />
              <Route path='/forms/datepicker' component={DatePickerPage} />
              <Route path='/forms/switches' component={SwitchPage} />
              <Route path='/forms/formsteps' component={FormStepsPage} />
              <Route path='/forms/validation' component={ValidationFormPage} />
              <Route path='/tables/sidebar-category' component={SidebarCategoryTable} />
              <Route
                path='/ui-elements'
                render={(props) => (
                  <UIScreenPage>
                    <Switch>
                      <Route path='/ui-elements/alerts' component={Alerts} />
                      <Route path='/ui-elements/badges' component={Badges} />
                      <Route path='/ui-elements/buttons' component={Buttons} />
                      <Route path='/ui-elements/dropdowns' component={Dropdowns} />
                      <Route path='/ui-elements/pagination' component={Paginations} />
                      <Route path='/ui-elements/images' component={Images} />
                      <Route path='/ui-elements/lists' component={Lists} />
                      <Route path='/ui-elements/progress-bar' component={ProgressBars} />
                      <Route path='/ui-elements/notifications' component={Notifications} />
                      <Route path='/ui-elements/tabs' component={Tabs} />
                      <Route path='/ui-elements/typography' component={Typography} />
                      <Route path='/ui-elements/breadcrumbs' component={BreadcrumbsPage} />
                    </Switch>
                  </UIScreenPage>
                )}
              />
              <Route
                path='/charts'
                render={(props) => (
                  <UIScreenPage>
                    <Switch>
                      <Route path='/charts/line-charts' component={LineChart} />
                      <Route path='/charts/scatter-charts' component={ScatterChart} />
                      <Route path='/charts/pie-charts' component={PieChart} />
                      <Route path='/charts/bar-charts' component={BarChart} />
                    </Switch>
                  </UIScreenPage>
                )}
              />
            </Switch>
          </div>
        </div>
        <input type='checkbox' id='collapsing' className='d-none' onChange={handleCollapse} checked={collapsed} />
        <input type='checkbox' id='fixsidebar' className='d-none' onChange={handleFixSidebar} checked={fixedSidebar} />
        <input type='checkbox' id='fixnavbar' className='d-none' onChange={handlesFixNavbar} checked={fixedNavbar} />
      </div>
    </ThemeProvider>
  );
};

export default MainLayout;

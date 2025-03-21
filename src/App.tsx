import React, { Fragment, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Reducer } from 'redux';

import CustomRoutes from './Routes';
import './App.scss';

import { getRegistry } from '@redhat-cloud-services/frontend-components-utilities/Registry';
import NotificationsPortal from '@redhat-cloud-services/frontend-components-notifications/NotificationPortal';
import { notificationsReducer } from '@redhat-cloud-services/frontend-components-notifications/redux';
import { useChrome } from '@redhat-cloud-services/frontend-components/useChrome';

const App = () => {
  const navigate = useNavigate();
  const { on, updateDocumentTitle } = useChrome();

  useEffect(() => {
    updateDocumentTitle('Upgrades | Red Hat Insights');
    const registry = getRegistry();
    registry.register({ notifications: notificationsReducer as Reducer });

    const unregister = on('APP_NAVIGATION', (event) => navigate(`/${event.navId}`));
    return () => {
      unregister?.();
    };
  }, []);

  return (
    <Fragment>
      <NotificationsPortal />
      <CustomRoutes />
    </Fragment>
  );
};

export default App;

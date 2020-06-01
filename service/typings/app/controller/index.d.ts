// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAdminMain = require('../../../app/controller/admin/main');
import ExportWebHome = require('../../../app/controller/web/home');

declare module 'egg' {
  interface IController {
    admin: {
      main: ExportAdminMain;
    }
    web: {
      home: ExportWebHome;
    }
  }
}

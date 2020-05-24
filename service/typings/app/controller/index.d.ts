// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportWebHome = require('../../../app/controller/web/home');

declare module 'egg' {
  interface IController {
    web: {
      home: ExportWebHome;
    }
  }
}

export const PATH = Object.freeze({
  USER: "/admin-user",
  EVENT: "/admin-event",
  VIDEO: "/admin-video",
  LOGIN: "/login",
  REGISTER: "/register",
  HOME: "/home",
  PROFILE: "/home/profile",
  DOCTOR: "/home/doctor/:id",
  PRESCRIPTION: "/home/prescription",
  PHARMACY: "/pharmacy",
  PHARMACY_DETAIL: "/pharmacy/:id",
  ORDER_PRES: "/order-pres",
});

export const SIDEBAR = Object.freeze({
  USER: PATH.USER,
  EVENT: PATH.EVENT,
  VIDEO: PATH.VIDEO,
  PHARMACY: PATH.PHARMACY,
  LOGOUT: "logout",
  PROFILE: PATH.PROFILE,
  DOCTOR: PATH.DOCTOR,
  PRESCRIPTION: PATH.PRESCRIPTION,
  PHARMACY_DETAIL: PATH.PHARMACY_DETAIL,
  TAB_ORDER: PATH.ORDER_PRES,
});

export const ROLE = Object.freeze({
  ADMIN: "admin",
  AGENCY: "agency",
  CLIENT: "client",
});

export const ROUTES = Object.freeze({
  PRIVATE: [
    { path: PATH.USER, component: "UsersPage" },
    // { path: PATH.PHARMACY_DETAIL, component: "PharmacyDetailPage" },
    // { path: PATH.PHARMACY, component: "PharmacyPage" },
  ],
  PHARMACY: [
    { path: PATH.PHARMACY_DETAIL, component: "PharmacyDetailPage" },
    { path: PATH.PHARMACY, component: "PharmacyPage" },
    { path: PATH.ORDER_PRES, component: "OrderPresPage" },
  ],
  PUBLIC: [
    { path: PATH.LOGIN, component: "LoginPage" },
    { path: PATH.REGISTER, component: "RegisterPage" },
  ],

});

export const NOTIFICATION_TYPE = Object.freeze({
  SUCCESS: "success",
  ERROR: "error",
  WARNING: "warning",
  INFO: "info",
});

export const COLUMN_TYPE = Object.freeze({
  TEXT: "text",
  DATE: "date",
  DATE_STRING: "dateString",
  NUMBER: "number",
  LINK: "link",
});

export const CREATE_UPDATE_DELETE_STATUS = Object.freeze({
  UPCOMING: "upcoming",
  SUCCESS: "success",
  ERROR: "error",
});

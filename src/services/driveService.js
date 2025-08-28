import apiClient from "./api";

const driveService = {
  // ######## student
  getFolderContents: (id, query) => {
    return apiClient.get(`/folder/${id}`, query);
  },
  createFolder: (body) => {
    return apiClient.post(`/folder`, body);
  },
  addStudent: (body, isFormData) => {
    return apiClient.post("/admin/student", body, isFormData);
  },

  renameFolder: (id, body) => {
    return apiClient.patch(`/folder/${id}`, body);
  },
  deleteStudent: (id) => {
    return apiClient.delete(`/admin/student/${id}`);
  },

  // ########## course
  getAllCourses: (query) => {
    return apiClient.get("/admin/course", query);
  },
  getActiveCourses: () => {
    return apiClient.get("/admin/course/active");
  },
  getCourseById: (id) => {
    return apiClient.get(`/admin/course/${id}`);
  },
  addCourse: (body) => {
    return apiClient.post("/admin/course", body);
  },

  updateCourse: (id, body) => {
    return apiClient.patch(`/admin/course/${id}`, body);
  },
  deleteCourse: (id) => {
    return apiClient.delete(`/admin/course/${id}`);
  },

  // ########## enrollment
  getEnrollmentById: (id, query) => {
    return apiClient.get(`/admin/enrollment/${id}`, query);
  },
  getAllEnrollments: (query) => {
    return apiClient.get("/admin/enrollment", query);
  },
  addEnrollment: (body, isFormData) => {
    return apiClient.post("/admin/enrollment", body, isFormData);
  },
  updateEnrollment: (id, body) => {
    return apiClient.patch(`/admin/enrollment/${id}`, body);
  },
  deleteEnrollment: (id) => {
    return apiClient.delete(`/admin/enrollment/${id}`);
  },

  // ########## payment
  getPaymentById: (id, query) => {
    return apiClient.get(`/admin/payment/${id}`, query);
  },
  getAllPayments: (query) => {
    return apiClient.get("/admin/payment", query);
  },
  updatePayment: (id, body) => {
    return apiClient.patch(`/admin/payment/${id}`, body);
  },
  getPaymentSummary: (query) => {
    return apiClient.get("/admin/payment/summary", query);
  },

  // ########## other payment
  getOtherPaymentById: (id, query) => {
    return apiClient.get(`/admin/payment/other/${id}`, query);
  },
  getAllOtherPayments: (query) => {
    return apiClient.get("/admin/payment/other", query);
  },
  updateOtherPayment: (id, body) => {
    return apiClient.patch(`/admin/payment/other/${id}`, body);
  },
  addOtherPayment: (body) => {
    return apiClient.post("/admin/payment/other", body);
  },

  // ########## attendance
  addAttendance: (body) => {
    return apiClient.post("/admin/attendance", body);
  },
  getAllAttendances: (query) => {
    return apiClient.get("/admin/attendance", query);
  },
  updateAttendance: (id, body) => {
    return apiClient.patch(`/admin/attendance/${id}`, body);
  },
  getManualAttendances: (query) => {
    return apiClient.get("/admin/attendance/manual", query);
  },

  // ########## mark
  addMark: (body) => {
    return apiClient.post("/admin/mark", body);
  },
  getAllMarks: (query) => {
    return apiClient.get("/admin/mark", query);
  },
  updateMark: (id, body) => {
    return apiClient.patch(`/admin/mark/${id}`, body);
  },
  getMarkById: (id, query) => {
    return apiClient.get(`/admin/mark/${id}`, query);
  },

  // ########## enquiry
  addEnquiry: (body) => {
    return apiClient.post("/admin/enquiry", body);
  },
  updateEnquiry: (id, body) => {
    return apiClient.patch(`/admin/enquiry/${id}`, body);
  },
  getEnquiryById: (id, query) => {
    return apiClient.get(`/admin/enquiry/${id}`, query);
  },
  getAllEnquiries: (query) => {
    return apiClient.get("/admin/enquiry", query);
  },

  // ########## other
  getDashBoardSummary: () => {
    return apiClient.get("/admin/dashboard");
  },

  // ########## staff
  addStaff: (body) => {
    return apiClient.post("/admin/staff", body);
  },
  updateStaff: (id, body) => {
    return apiClient.patch(`/admin/staff/${id}`, body);
  },
  getStaffById: (id, query) => {
    return apiClient.get(`/admin/staff/${id}`, query);
  },
  getAllStaffs: (query) => {
    return apiClient.get("/admin/staff", query);
  },
  deleteStaff: (id) => {
    return apiClient.delete(`/admin/staff/${id}`);
  },
};

export default driveService;

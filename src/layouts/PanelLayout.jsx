import { Outlet, useNavigate } from "react-router";
import LeftSideNav from "../components/admin/LeftSideNav";
import TopNav from "../components/admin/TopNav";
import { useState } from "react";
import { FaRegCalendarAlt, FaTasks, FaUserFriends } from "react-icons/fa";
import { MdAddTask, MdEditCalendar } from "react-icons/md";
import {
  FaBox,
  FaCalendarDays,
  FaCalendarPlus,
  FaClipboardList,
  FaFileInvoiceDollar,
  FaHouse,
  FaIdCardClip,
  FaIndianRupeeSign,
  FaList,
  FaListOl,
  FaMarker,
  FaMoneyBill1,
  FaMoneyCheckDollar,
  FaNetworkWired,
  FaPlus,
  FaQuestion,
  FaShapes,
  FaTableList,
  FaUpload,
  FaUserGraduate,
  FaUserPlus,
  FaUsers,
  FaUserTie,
} from "react-icons/fa6";
import useApi from "../hooks/useApi";
import authService from "../services/authService";
import { toast } from "react-toastify";

const getSideNavLinks = (role) => {
  const adminSideNavLinks = [
    {
      id: "1",
      isOpenable: false,
      iconElem: <FaHouse className="mt-0.5" />,
      text: "Dashboard",
      redirect: "/admin/dashboard",
    },
    {
      id: "2",
      isOpenable: true,
      iconElem: <FaUserTie className="mt-0.5" />,
      text: "Student",
      nestedLinks: [
        {
          id: "1",
          iconElem: <FaUserPlus className="mt-0.5" />,
          text: "Add Student",
          redirect: "/admin/student/new",
        },
        {
          id: "2",
          iconElem: <FaUsers className="mt-0.5" />,
          text: "All Students",
          redirect: "/admin/student",
        },
        {
          id: "3",
          iconElem: <FaIdCardClip className="mt-0.5" />,
          text: "Certificate",
          redirect: "/admin/student/certificate",
        },
      ],
    },
    {
      id: "3",
      isOpenable: true,
      iconElem: <FaShapes className="mt-0.5" />,
      text: "Courses",
      nestedLinks: [
        {
          id: "1",
          iconElem: <FaPlus className="mt-0.5" />,
          text: "Add Course",
          redirect: "/admin/course/new",
        },
        {
          id: "2",
          iconElem: <FaList className="mt-0.5" />,
          text: "All Courses",
          redirect: "/admin/course",
        },
      ],
    },
    {
      id: "4",
      isOpenable: true,
      iconElem: <FaIndianRupeeSign className="mt-1" />,
      text: "Payment",
      nestedLinks: [
        {
          id: "1",
          iconElem: <FaFileInvoiceDollar className="mt-0.5" />,
          text: "New Payment",
          redirect: "/admin/payment/new",
        },
        {
          id: "2",
          iconElem: <FaMoneyCheckDollar className="mt-0.5" />,
          text: "All Payments",
          redirect: "/admin/payment",
        },
        {
          id: "4",
          iconElem: <FaMoneyBill1 className="mt-0.5" />,
          text: "Other Payments",
          redirect: "/admin/payment/other",
        },
      ],
    },
  ];

  const staffSideNavLinks = [
    // {
    //   id: "1",
    //   isOpenable: false,
    //   iconElem: <FaHouse className="mt-0.5" />,
    //   text: "Dashboard",
    //   redirect: "/staff/dashboard",
    // },
    {
      id: "2",
      isOpenable: true,
      iconElem: <FaTasks className="mt-0.5" />,
      text: "Task",
      nestedLinks: [
        {
          id: "1",
          iconElem: <MdAddTask className="mt-0.5" />,
          text: "Add Task",
          redirect: "/staff/task/new",
        },
        {
          id: "2",
          iconElem: <FaListOl className="mt-0.5" />,
          text: "All Tasks",
          redirect: "/staff/task",
        },
      ],
    },
    {
      id: "3",
      isOpenable: true,
      iconElem: <FaUserGraduate className="mt-0.5" />,
      text: "Student",
      nestedLinks: [
        {
          id: "1",
          iconElem: <FaUsers className="mt-0.5" />,
          text: "All Students",
          redirect: "/staff/student",
        },
      ],
    },
  ];

  if (role === "admin") {
    return adminSideNavLinks;
  }
  if (role === "staff") {
    return staffSideNavLinks;
  }
  return [];
};
const PanelLayout = ({ role = "student" }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { loading: logoutLoading, execute: logout } = useApi(
    authService.logout,
  );

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout(role);
      toast.success("Logout Successful");
      navigate(`/${role}/login`);
    } catch (apiError) {
      toast.error(apiError?.message || "Failed to Logout . Please try again.");
    }
  };

  return (
    <section
      className="min-h-screen overflow-hidden lg:grid lg:grid-cols-[260px,_1fr] lg:grid-rows-[72px,_1fr]"
      onClick={() => isMenuOpen && setIsMenuOpen(false)}
    >
      <LeftSideNav
        menu={[isMenuOpen, setIsMenuOpen]}
        navLinks={getSideNavLinks(role)}
        handleLogout={handleLogout}
        logoutLoading={logoutLoading}
      />
      <TopNav
        menu={[isMenuOpen, setIsMenuOpen]}
        role={role}
        handleLogout={handleLogout}
        logoutLoading={logoutLoading}
      />
      <div className="text-color col-start-2 min-w-0">
        <Outlet />
      </div>
    </section>
  );
};
export default PanelLayout;

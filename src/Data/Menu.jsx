import { AiFillHome } from "react-icons/ai";
import { FaUserFriends } from "react-icons/fa";
import { IoIosAddCircle, IoIosSettings } from "react-icons/io";
import { IoNotifications } from "react-icons/io5";
import { RiDiscussFill } from "react-icons/ri";

export const NavMobile = [
  {
    href: "/",
    label: "",
    icon: <AiFillHome className="text-2xl" />,
  },
  {
    href: "/message",
    label: "",
    icon: <RiDiscussFill className="text-2xl" />,
    nb: 3, // Example message count
  },
  {
    href: "/add",
    label: "",
    icon: <IoIosAddCircle className="text-2xl" />,
  },
  {
    href: "/expats",
    label: "",
    icon: <FaUserFriends className="text-2xl" />,
  },
  {
    href: "/notifications",
    label: "",
    icon: <IoNotifications className="text-2xl" />,
    nb: 5, // Example message count
  },
];

export const NavWeb = [
  {
    href: "/",
    label: "Home",
    icon: <AiFillHome className="text-2xl mr-2" />,
  },
  {
    href: "/message",
    label: "Message",
    icon: <RiDiscussFill className="text-2xl mr-2" />,
    nb: 3, // Example message count
  },
  {
    href: "/messages",
    label: "Notifications",
    icon: <IoNotifications className="text-2xl mr-2" />,
    nb: 5, // Example notification count
  },
  {
    href: "/expats",
    label: "Expats",
    icon: <FaUserFriends className="text-2xl mr-2" />,
  },
  {
    href: "/setting",
    label: "Settings",
    icon: <IoIosSettings className="text-2xl mr-2" />,
  },
];

import { AiOutlineHome } from "react-icons/ai";
import { FaUserFriends } from "react-icons/fa";
import { GoCommentDiscussion } from "react-icons/go";
import { IoIosSettings } from "react-icons/io";
import { IoNotifications } from "react-icons/io5";
import { RiAddBoxLine } from "react-icons/ri";

export const NavMobile = [
  {
    href: "/",
    label: "",
    icon: <AiOutlineHome className="text-2xl mb-[4px]" />,
  },
  {
    href: "/message",
    label: "",
    icon: <GoCommentDiscussion className="text-2xl mb-[4px]" />,
    nb: 3, // Example message count
  },
  {
    href: "/add",
    label: "",
    icon: <RiAddBoxLine className="text-2xl mb-[4px]" />,
  },
  {
    href: "/expats",
    label: "",
    icon: <FaUserFriends className="text-2xl mb-[4px]" />,
  },
  {
    href: "/notifications",
    label: "",
    icon: <IoNotifications className="text-2xl mb-[4px]" />,
    nb: 5, // Example message count
  },
];

export const NavWeb = [
  {
    href: "/",
    label: "Home",
    icon: <AiOutlineHome className="text-2xl mr-2" />,
  },
  {
    href: "/message",
    label: "Message",
    icon: <GoCommentDiscussion className="text-2xl mr-2" />,
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

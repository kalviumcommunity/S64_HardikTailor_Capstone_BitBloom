import {
  FiChevronDown,
} from "react-icons/fi";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useState } from "react";
import { IconType } from "react-icons";

interface OptionProps {
  text: string;
  Icon: IconType;
  onClick?: () => void;
}

interface StaggeredDropDownProps {
  options: OptionProps[];
  buttonText?: string;
  buttonClassName?: string;
  dropdownClassName?: string;
  optionClassName?: string;
}

const StaggeredDropDown: React.FC<StaggeredDropDownProps> = ({ 
  options, 
  buttonText = "Post actions",
  buttonClassName = "flex items-center gap-2 px-3 py-2 rounded-md text-indigo-50 bg-indigo-500 hover:bg-indigo-500 transition-colors",
  dropdownClassName = "flex flex-col gap-2 p-2 rounded-lg bg-white shadow-xl absolute top-[120%] left-[50%] w-48 overflow-hidden",
  optionClassName = "flex items-center gap-2 w-full p-2 text-xs font-medium whitespace-nowrap rounded-md hover:bg-indigo-100 text-slate-700 hover:text-indigo-500 transition-colors cursor-pointer"
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <motion.div animate={open ? "open" : "closed"} className="relative">
        <button
          onClick={() => setOpen((pv) => !pv)}
          className={buttonClassName}
        >
          <span className="font-medium text-sm">{buttonText}</span>
          <motion.span variants={iconVariants}>
            <FiChevronDown />
          </motion.span>
        </button>

        <motion.ul
          initial={wrapperVariants.closed}
          variants={wrapperVariants}
          style={{ originY: "top", translateX: "-50%" }}
          className={dropdownClassName}
        >
          {options.map((option, index) => (
            <Option
              key={index}
              setOpen={setOpen}
              Icon={option.Icon}
              text={option.text}
              onClick={option.onClick}
              className={optionClassName}
            />
          ))}
        </motion.ul>
      </motion.div>
    </div>
  );
};

const Option: React.FC<OptionProps & { 
  setOpen: Dispatch<SetStateAction<boolean>>,
  className?: string 
}> = ({ 
  text, 
  Icon, 
  onClick, 
  setOpen,
  className
}) => {
  return (
    <motion.li
      variants={itemVariants}
      onClick={() => {
        if (onClick) onClick();
        setOpen(false);
      }}
      className={className}
    >
      <motion.span variants={actionIconVariants}>
        <Icon />
      </motion.span>
      <span>{text}</span>
    </motion.li>
  );
};

export default StaggeredDropDown;

const wrapperVariants = {
  open: {
    scaleY: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  closed: {
    scaleY: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.1,
    },
  },
};

const iconVariants = {
  open: { rotate: 180 },
  closed: { rotate: 0 },
};

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      when: "beforeChildren",
    },
  },
  closed: {
    opacity: 0,
    y: -15,
    transition: {
      when: "afterChildren",
    },
  },
};

const actionIconVariants = {
  open: { scale: 1, y: 0 },
  closed: { scale: 0, y: -7 },
};
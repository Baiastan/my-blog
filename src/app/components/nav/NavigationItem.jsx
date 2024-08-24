"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavigationItem = ({ text, to, className, active, external, inactive }) => {
  const pathname = usePathname();
  const isActive = pathname === to;

  return !external ? (
    <Link href={to}>
      <li className={`${className} ${isActive ? active : inactive}`}>{text}</li>
    </Link>
  ) : (
    <a href={to} target="_blank" rel="noopener noreferrer">
      <li className={`${className} ${isActive ? active : inactive}`}>{text}</li>
    </a>
  );
};

export default NavigationItem;

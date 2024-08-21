"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavigationItem = ({ text, to, className, active, inactive }) => {
  const pathname = usePathname();
  const isActive = pathname === to;

  return (
    <Link href={to}>
      <li className={`${className} ${isActive ? active : inactive}`}>{text}</li>
    </Link>
  );
};

export default NavigationItem;

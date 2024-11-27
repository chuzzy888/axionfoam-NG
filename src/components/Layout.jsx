import React from "react";

const Layout = ({ children }) => {
  return (
    <main className="flex-grow container mx-auto  px-4 py-8">{children}</main>
  );
};

export default Layout;

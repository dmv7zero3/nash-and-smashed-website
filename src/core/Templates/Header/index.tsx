import React from "react";
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";

const Header: React.FC = () => {
  return (
    <div className="bg-lightning-yellow">
      {/* Desktop Header - hidden on mobile, visible on lg screens and up */}
      <DesktopHeader />

      {/* Mobile Header - visible on mobile, hidden on lg screens and up */}
      <MobileHeader />
    </div>
  );
};

export default Header;

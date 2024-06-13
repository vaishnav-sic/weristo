import React from "react";
import Link from "next/link";

import SocialIcons from "../../other/SocialIcons";

export default function FooterInfomation() {
  return (
    <div className="footer-info">
      <Link href={process.env.PUBLIC_URL + "/"}>
        <a className="footer-info__logo">
          <img
            src={process.env.PUBLIC_URL + "/assets/images/logo.jpeg"}
            alt="Ogami Logo"style={{maxWidth: '150px'}}
          />
        </a>
      </Link>
      <ul>
        <li>Address: 07, Bluewhale colony, MJ road, Pune </li>
        <li>Phone: +91 1122334455 </li>
        <li>Email: abcxyz123@gmail.com</li>
      </ul>
      <SocialIcons type="primary" shape="circle" className="-btn-light" />
    </div>
  );
}

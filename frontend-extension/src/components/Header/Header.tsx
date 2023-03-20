import React from "react";
import styles from "./Header.module.scss";
import { FiLogOut, FiInfo, FiArrowLeft } from "react-icons/fi";
import ChainSwitcher from "../ChainSwitcher/ChainSwitcher";

interface HeaderProps {
  showTools: boolean;
  setLogin: (state: boolean) => void;
  activeWallet: (state: boolean) => void;
  setLanding: (action: string) => void;
}

const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
  return (
    <div className={styles["main__container"]}>
      {props.showTools ? (
        <>
          <img src="logos/novusys-leaf.png" className={styles["logo"]} alt="" />
          <div className={styles["switcher__container"]}>
            <ChainSwitcher />
          </div>

          <button onClick={() => props.activeWallet(false)} className={styles["right__button"]}>
            <FiLogOut />
          </button>
        </>
      ) : (
        <>
          <button onClick={() => props.setLanding("abort")} className={styles["left__button"]}>
            <FiArrowLeft />
          </button>
          <img src="logos/novusys-logo.png" className={styles["landing__logo"]} alt="" />

          <button className={styles["right__button"]}>
            <FiInfo />
          </button>
        </>
      )}
    </div>
  );
};

export default Header;

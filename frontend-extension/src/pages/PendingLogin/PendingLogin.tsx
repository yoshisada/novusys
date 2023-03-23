import React from "react";
import styles from "./PendingLogin.module.scss";
import Header from "../../components/Header/Header";

interface PendingLoginProps {
  handleLogin: () => void;
  resetWallet: () => void;
  setLanding: (action: string) => void;
}

const PendingLogin: React.FC<PendingLoginProps> = (props: PendingLoginProps) => {
  return (
    <>
      <Header showTools={false} setLanding={props.setLanding} />
      <div className={styles["main__container"]}>Complete login through Auth0 Portal</div>
    </>
  );
};

export default PendingLogin;

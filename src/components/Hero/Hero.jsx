import React from "react";

import styles from "./Hero.module.css";
import { getImageUrl } from "../../utils";
import animationData from '../../data/dev.json';
import Lottie from "react-lottie";

export const Hero = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }
  return (
    <section className={styles.container} >
      <div className={styles.content}>
        <h1 className={styles.title}>Hi, I'm Sagar</h1>
        <p className={styles.description}>
          I'm a Intern in ReactJS and
          NodeJS. Reach out if you'd like to learn more!
        </p>
        <a href="mailto:workwithsagardev@email.com" className={styles.contactBtn}>
          Contact Me
        </a>
      </div>
      {/* <img
        src={getImageUrl("hero/heroImage.png")}
        alt="Main image of me"
        className={styles.heroImg}
      /> */}
      <Lottie options={defaultOptions} height={500} width={550} />
      <div className={styles.topBlur} />
      <div className={styles.bottomBlur} />
    </section >
  );
};

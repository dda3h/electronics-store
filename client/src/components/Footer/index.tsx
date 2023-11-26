import React from 'react';

import TelegramSVG from '../../icons/social/Telegram';
import GitHubSVG from '../../icons/social/GitHub';
import LinkedInSVG from '../../icons/social/LinkedIn';

import styles from './styles.module.scss';

const socialNetworks = [
  { label: 'Telegram', link: 'https://t.me/nentennens', icon: <TelegramSVG className={styles.socialNetworks__icon}/> },
  { label: 'GitHub', link: 'https://github.com/nentennens', icon: <GitHubSVG className={styles.socialNetworks__icon} /> },
  { label: 'LinkedIn', link: '', icon: <LinkedInSVG className={styles.socialNetworks__icon}/> },
];

export default function Footer(): React.ReactElement {
  return (
    <footer className={styles.wrapper}>
      <h1 className={styles.header}>Contact me</h1>

      <div className={styles.socialNetworks}>
        {socialNetworks.map((network, index) => (
          <a href={network.link} target="_blank" key={index}>
            {network.icon}
          </a>
        ))}
      </div>

      <h1 className={styles.text}>
        1912-2036 &copy; nentennens <br /> All rights unguarded.
      </h1>
    </footer>
  );
}

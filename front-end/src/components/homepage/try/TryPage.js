import React from 'react';
import './TryPage.css';
import Sphere from './Sphere';

const AboveNavigationBar = () => (
  <div className='above-navigation-bar'>
    <p className='title'>Caching Feelings</p>
    <div className='button-group'>
      <button className='community-button'>Community</button>
      <button className='signout-button'>Sign Out</button>
    </div>
  </div>
);

const NavigationBar = () => (
  <div className="navigation-bar">
    <button className='try-button'>Try</button>
    <button className='catch-button'>Catch</button>
    <button className='finally-button'>Finally</button>
    <button className='user-config-button'>User.config</button>
  </div>
);

const TryContent = () => (
  <div className='try-page'>
    <Sphere/>
  </div>
);

// export const Trypage = {
//   AboveNavigationBar,
//   NavigationBar,
//   TryContent
// };

export { AboveNavigationBar, NavigationBar, TryContent };
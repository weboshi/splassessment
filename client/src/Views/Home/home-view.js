import React from 'react';
import './home-view.scss';
import Map from '../../Components/Map/map'
import { Jobs } from '../../Components/Jobs/jobs';
import { WelcomeMessage } from '../../Components/WelcomeMessage/welcomemessage'



export default props =>

<div className='home'>
  <div className='home-body'>
    <WelcomeMessage/>
  </div>
</div>

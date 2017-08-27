/* eslint-disable */

import React from 'react';
import './styles/SideNav.scss';

const SideNav = ({ handleLink }) => {
  return (
    <aside className="aside">
      <h2 className='nav-label'>About</h2>
      <button onClick={handleLink} id="introduction" className="nav-tab">Introduction</button>
      <button onClick={handleLink} id="dataDetails" className="nav-tab">Data Details</button>
      <h2 className='nav-label'>Endpoints</h2>
      <h2 className='nav-sub-label'>Industry:</h2>
      <button onClick={handleLink} id="getIndustry" className="nav-tab">GET: industry</button>
      <button onClick={handleLink} id="postIndustry" className="nav-tab">POST: industry</button>
      <button onClick={handleLink} id="putIndustry" className="nav-tab">PUT: industry/:id</button>
      <button onClick={handleLink} id="deleteIndustry" className="nav-tab">DELETE: industry:id</button>
      <h2 className='nav-sub-label'>Region:</h2>
      <button onClick={handleLink} id="getRegion" className="nav-tab">GET: region</button>
      <button onClick={handleLink} id="postRegion" className="nav-tab">POST: region</button>
      <button onClick={handleLink} id="putRegion" className="nav-tab">PUT: region/:id</button>
      <button onClick={handleLink} id="deleteRegion" className="nav-tab">DELETE: region:id</button>
      <h2 className='nav-sub-label'>Betas:</h2>
      <button onClick={handleLink} id="getBetas" className="nav-tab">GET: betas</button>
      <button onClick={handleLink} id="postBetas" className="nav-tab">POST: betas</button>
      <button onClick={handleLink} id="getBetasId" className="nav-tab">POST: betas</button>
      <button onClick={handleLink} id="patchBetas" className="nav-tab">PATCH: betas/:id</button>
      <button onClick={handleLink} id="deleteBetas" className="nav-tab">DELETE: betas:id</button>
      <button onClick={handleLink} id="getBetasIndustry" className="nav-tab">GET: betas/industry/:industry_id</button>
      <button onClick={handleLink} id="getBetasRegion" className="nav-tab">GET: betas/region/:region_id</button>
      <button onClick={handleLink} id="getBetasIndustryRegion" className="nav-tab">GET: betas/industry/:industry_id/region/:region_id</button>
      <h2 className='nav-sub-label'>Auth:</h2>
      <button onClick={handleLink} id="auth" className="nav-tab">POST: auth/request_token</button>
    </aside>
  );
}

export default SideNav;

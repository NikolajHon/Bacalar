import React from 'react';
import { useParams } from 'react-router-dom';
import AppBar from '../../components/AppBar';
import DiscussionDetail from '../../components/forum/DiscussionDetail';

const DiscussionPage = () => {
  const { id } = useParams(); 
  return (
    <div>
      <div className='app-bar'><AppBar/></div>
      <div>

      <DiscussionDetail discussionId={id} />
      </div>
    </div>
  );
};

export default DiscussionPage;

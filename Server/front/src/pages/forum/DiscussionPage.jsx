import React from 'react';
import { useParams } from 'react-router-dom';
import AppBar from '../../components/AppBar';
import DiscussionDetail from '../../components/forum/DiscussionDetail';
import '../../styles/DiscussionPage.css'
const DiscussionPage = () => {
  const { id } = useParams();
  return (
    <div className='discussion-main'>
      <AppBar />
      <div className='discussion-container'> 
        <DiscussionDetail discussionId={id} />
      </div>
    </div>
  );
};

export default DiscussionPage;

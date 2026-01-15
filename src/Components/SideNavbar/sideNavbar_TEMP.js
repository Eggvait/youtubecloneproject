import React from 'react'
import './sideNavbar.css'
import HomeIcon from '@mui/icons-material/Home';
import VideocamIcon from '@mui/icons-material/Videocam';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import HistoryIcon from '@mui/icons-material/History';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ContentCutIcon from '@mui/icons-material/ContentCut';

const SideNavbar = ({sideNavbar}) => {
  return (
    <div className={sideNavbar ? "home-sideNavbar" : "homeSideNavbarHide"}>
      <div className="home_sideNavberTop">
        <div className={'home_sideNavbarTopOption'}>
          <HomeIcon />
          <div className="home_sideNavbarTopOptionTitle">Home</div>
        </div>

        <div className={'home_sideNavbarTopOption'}>
          <VideocamIcon />
          <div className="home_sideNavbarTopOptionTitle">Shorts</div>
        </div>

        <div className={'home_sideNavbarTopOption'}>
          <SubscriptionsIcon />
          <div className="home_sideNavbarTopOptionTitle">Subscriptions</div>
        </div>
      </div>

      <div className="home_sideNavbarMiddle">
        <div className={'home_sideNavbarTopOption'}>
          <div className="home_sideNavbarTopOptionTitle">You</div>
          <ChevronRightIcon />
        </div>

        <div className={'home_sideNavbarTopOption'}>
          <RecentActorsIcon />
          <div className="home_sideNavbarTopOptionTitle">Your Channel</div>
        </div>

        <div className={'home_sideNavbarTopOption'}>
          <HistoryIcon />
          <div className="home_sideNavbarTopOptionTitle">History</div>
        </div>

        <div className={'home_sideNavbarTopOption'}>
          <PlaylistAddIcon />
          <div className="home_sideNavbarTopOptionTitle">Playlists</div>
        </div>

        <div className={'home_sideNavbarTopOption'}>
          <SmartDisplayIcon />
          <div className="home_sideNavbarTopOptionTitle">Your Videos</div>
        </div>

        <div className={'home_sideNavbarTopOption'}>
          <WatchLaterIcon />
          <div className="home_sideNavbarTopOptionTitle">Watch Later</div>
        </div>

        <div className={'home_sideNavbarTopOption'}>
          <ThumbUpAltOutlinedIcon />
          <div className="home_sideNavbarTopOptionTitle">Liked Videos</div>
        </div>

        <div className={'home_sideNavbarTopOption'}>
          <ContentCutIcon />
          <div className="home_sideNavbarTopOptionTitle">Your Clips</div>
        </div>
      </div>

      <div className="home_sideNavbarMiddle">
        <div className={'home_sideNavbarTopOption'}>
          <div className="home_sideNavbarTopOptionTitleHeader">Subscription</div>
        </div>

        <div className={'home_sideNavbarTopOption'}>
          <img className='home_sideNavbar_ImgLogo' src = 'https://upload.wikimedia.org/wikipedia/commons/2/28/Aaj_tak_logo.png'/>
          <div className="home_sideNavbarTopOptionTitle">Aaj Tak</div>
        </div>

        <div className={'home_sideNavbarTopOption'}>
          <img className='home_sideNavbar_ImgLogo' src = 'https://i.pinimg.com/736x/8b/12/52/8b125232501ef2f169a7085149b14a3b.jpg'/>
          <div className="home_sideNavbarTopOptionTitle">NDTV</div>
        </div>

        <div className={'home_sideNavbarTopOption'}>
          <img className='home_sideNavbar_ImgLogo' src = 'https://yt3.googleusercontent.com/J1leGk1XpHFz2r1WrwBCjJWtZ9Y4-qHPHm4Vkl81bm8vZhTkCdj9GHPUibuWFnDIX5HB8LTj=s900-c-k-c0x00ffffff-no-rj'/>
          <div className="home_sideNavbarTopOptionTitle">Almost Friday TV</div>
        </div>
      </div>
    </div>
  )
}

export default SideNavbar

import React from 'react'
import './homePage.css'

const HomePage = ({ sideNavbar }) => {

  const options = [
    'All', 'Music', 'Sports', 'Gaming', 'News', 'Movies',
    'Fashion', 'Learning', 'Live',
    'Music', 'Sports', 'Gaming', 'News', 'Movies',
    'Fashion', 'Learning', 'Live',
    'Music', 'Sports', 'Gaming', 'News', 'Movies',
    'Fashion', 'Learning', 'Live'
  ]

  return (
    /*
      FINAL RULE:
      - HomePage NEVER adjusts for sidebar width
      - It simply fills the space given by the parent flex layout
    */
    <div className="homePage">

      {/* ================= OPTIONS BAR ================= */}
      <div
        className={`homePage_options ${sideNavbar ? 'withSidebar' : 'noSidebar'
          }`}
      >
        {/* Only this inner row scrolls */}
        <div className="optionsScroller">
          {options.map((item, index) => (
            <div key={index} className="homepage_option">
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="home_mainPage">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="youtube_Video">
            <div className="youtube_thumbnailBox">
              <img
                src="https://i.ytimg.com/vi/bIsp1K8eJG0/maxresdefault.jpg"
                className="youtube_thumbnailPic"
              />
            </div>
            <div className="youtube_videoInfo">
              <img
                className="youtube_channelIcon"
                src="https://i.pinimg.com/564x/4a/5a/47/4a5a474b6f42f265d7f003575ef34b75.jpg"
                alt="channel"
              />

              <div className="youtube_textInfo">
                <div className="youtube_videoTitle">
                  Does He Know Something We Don’t?
                </div>
                <div className="youtube_channelName">Channel Name</div>
                <div className="youtube_videoMeta">1.2M views • 3 days ago</div>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default HomePage

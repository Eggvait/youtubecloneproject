import React, { useState } from 'react'
import './video.css'
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined'
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined'

const Video = () => {
  const [showMore, setShowMore] = useState(false)
  const [commentFocus, setCommentFocus] = useState(false)

  return (
    <div className="videoPage">

      <div className="videoLayout">

        {/* LEFT */}
        <div className="videoMain">

          {/* VIDEO */}
          <div className="videoPlayer">
            <video controls autoPlay className="videoPlayer_video">
              <source
                src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                type="video/mp4"
              />
            </video>
          </div>

          {/* TITLE */}
          <h1 className="videoTitle">Big Buck Bunny</h1>

          {/* ACTION BAR */}
          <div className="videoActions">
            <div className="videoActions_left">
              <img
                src="https://i.pinimg.com/564x/4a/5a/47/4a5a474b6f42f265d7f003575ef34b75.jpg"
                alt=""
                className="videoChannelImg"
              />
              <div className="videoChannelInfo">
                <div className="videoChannelName">User1</div>
                <div className="videoChannelSubs">1.2M subscribers</div>
              </div>
              <button className="subscribeBtn">Subscribe</button>
            </div>

            {/* LIKE / DISLIKE — UNCHANGED */}
            <div className="youtube_video_likeBlock">
              <div className="youtube_video_likeIcon">
                <ThumbUpAltOutlinedIcon sx={{ color: 'white', fontSize: 20 }} />
                <div className="youtubevideoNoOfLikes">123K</div>
              </div>
              <div className="youtubeVideoDivider"></div>
              <div className="youtube_video_likeIcon">
                <ThumbDownAltOutlinedIcon sx={{ color: 'white', fontSize: 20 }} />
              </div>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="videoDescription">
            <div className="videoDescription_stats">
              1.2M views • Jan 1, 2025
            </div>
            <p className={showMore ? 'expanded' : 'clamped'}>
              Big Buck Bunny tells the story of a giant rabbit with a heart bigger
              than himself. When the forest bullies gang up on him, he decides to
              teach them a lesson. This is one of Blender’s most famous open
              movies and still holds up visually.
            </p>
            <span
              className="readMore"
              onClick={() => setShowMore(!showMore)}
            >
              {showMore ? 'Show less' : 'Read more'}
            </span>
          </div>

          {/* COMMENTS */}
          <div className="videoComments">
            <h3>1,248 Comments</h3>

            <div className="commentInput">
              <img src="https://i.pravatar.cc/40" alt="" />
              <div className="commentBox">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  onFocus={() => setCommentFocus(true)}
                />
                {commentFocus && (
                  <div className="commentActions">
                    <button
                      className="cancelBtn"
                      onClick={() => setCommentFocus(false)}
                    >
                      Cancel
                    </button>
                    <button className="commentBtn">Comment</button>
                  </div>
                )}
              </div>
            </div>

            <div className="comment">
              <img src="https://i.pravatar.cc/41" alt="" />
              <div>
                <div className="commentName">RandomUser</div>
                <div className="commentText">
                  This animation still holds up so well!
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="videoSuggestions">
          <h4>Up next</h4>

          {[1, 2, 3, 4].map(i => (
            <div key={i} className="suggestionCard">
              <img
                src="https://i.ytimg.com/vi/bIsp1K8eJG0/maxresdefault.jpg"
                alt=""
              />
              <div className="suggestionInfo">
                <div className="suggestionTitle">
                  Does He Know Something We Don’t?
                </div>
                <div className="suggestionMeta">
                  Channel Name • 1.2M views
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default Video

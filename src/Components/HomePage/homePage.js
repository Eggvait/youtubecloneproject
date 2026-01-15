import React from 'react'
import './homePage.css'

const HomePage = () => {

  const options = ['All', 'Music', 'Sports', 'Gaming', 'News', 'Movies', 'Fashion', 'Learning', 'Live', 'Music', 'Sports', 'Gaming', 'News', 'Movies', 'Fashion', 'Learning', 'Live', 'Music', 'Sports', 'Gaming', 'News', 'Movies', 'Fashion', 'Learning', 'Live']
  return (
    <div className="homePage">
      <div className="homePage_options">
        {
          options.map((item,index)=>{
            return(
              <div key={index} className="homepage_option">
                {item}  
              </div>
            );
          })
        }
        
      </div>
    </div>
  )
}

export default HomePage

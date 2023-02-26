import React from 'react'
import HomeMainFilter from './HomeMainFilter'
import HomeMainQuestion from './HomeMainQuestion'
import HomeMainTopicList from './HomeMainTopicList'
import HomeMainPagenation from "./HomeMainPagenation";

export default function HomeMain() {
  return (
    <section className="forums">
        <h2>Forums</h2>
        <HomeMainFilter/>
        <HomeMainQuestion/>
        <div className="topics">
          <HomeMainTopicList/>
        </div>
        
        <div className="pagenation">
          <HomeMainPagenation/>
        </div>
      </section>
  )
}

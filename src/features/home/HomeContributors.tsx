import React from 'react'

export default function HomeContributors() {
  return (
  <div className="cont">
  <h2>Top Contributors</h2>
  <p className="contributors-para">
    People who started the most discussions on Arila
  </p>
  <ul className="contributors-people">
    <li className="contributors-people-person">
      <img src="assets/images/person-5.jpg" />
      <p>Stella Jhonson</p>
      <i className="fa-thin fa-comment-dots"></i>
      <span>137</span>
    </li>
    <li className="contributors-people-person">
      <img src="assets/images/person-3.jpg" />
      <p>Adrian Mohani</p>
      <i className="fa-thin fa-comment-dots"></i>
      <span>43</span>
    </li>
    <li className="contributors-people-person">
      <img src="assets/images/person-2.jpg" />
      <p>Alex Dolgove</p>
      <i className="fa-thin fa-comment-dots"></i>
      <span>52</span>
    </li>
    <li className="contributors-people-person">
      <img src="assets/images/person-4.jpg" />
      <p>Monika Blochi</p>
      <i className="fa-thin fa-comment-dots"></i>
      <span>248</span>
    </li>
    <li className="contributors-people-person">
      <img src="assets/images/person-1.jpg" />
      <p>Federik Bekham</p>
      <i className="fa-thin fa-comment-dots"></i>
      <span>26</span>
    </li>
  </ul>
</div>
  )
}

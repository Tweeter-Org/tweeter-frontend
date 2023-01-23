import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { TweetListWithTag } from '../../react-redux/actions/Tweets'
import Loader from '../Assets/Loader'
import Tweet from '../Home Page/TweetComp'

const Tweetsearch = (props) => {
    const dispatch = useDispatch()
const navigate = useNavigate();
    const { loading, tagTweets, getTag } = useSelector((ta) => ta.TagTweetFeedReducer)

    function showTagTweet(tag) {
        dispatch(TweetListWithTag(tag))
        console.log("tag tweets")
        if (getTag) {
          navigate("/tagtweet")
        }
    }
    console.log(tagTweets)
    return <>
        <div className="searchcomp POPUPBG" id="searchtweetBg">
            <p className="searchName" id="searchtweettag" onClick={() => { showTagTweet(props.hashtag) }}>#{props.hashtag}</p>
            <p className='trendTweetCount' id="tagTweetCount" >{props.tweetCount}</p>
        </div>
    </>
}

export default Tweetsearch
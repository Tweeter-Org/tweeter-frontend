import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Assets/Loader'
import Tweet from '../Home Page/TweetComp'
import Sidebar from './SideBar'
import greenprofile from "../Assets/greenprofile.svg"
import { TagtweetNav } from '../../react-redux/actions/SearchApi'

const TagTweets = () => {
    const { loading, tagTweets, getTag } = useSelector((ta) => ta.TagTweetFeedReducer)
const dispatch = useDispatch()
    const [tweetarr, setTweetArr] = useState([])
    const [title, setTitle] = useState("tag")
    useEffect(()=>{
        dispatch(TagtweetNav(greenprofile, "Search"))
        if (getTag) {
          
            setTitle(tagTweets.tag)
            console.log(title)
            setTweetArr(tagTweets.tweets)
        }
    },[getTag, tagTweets])

    console.log(tagTweets)
    return <>
    <Sidebar />
        <div className="tweetFlexBox POPUPBG" >
            {tweetarr.length > 0 ? (tweetarr.map((tweet, index) => {
                return <Tweet text={tweet.text} image={tweet.image} video={tweet.video} retweet={tweet.retweet} username={tweet.user.user_name} displaypic={tweet.user.displaypic} tweetId={tweet._id} number={index} bookmarkb="false" />;
            })) :<div className="alterBM" id="alterTagTweet">
    <p className="alterBMText1" id="alterTagP" >No Tweet contains #{title}</p></div> }
        </div>
        {(loading === true) ? <Loader loading={loading} /> : null}
    </>
}

export default TagTweets
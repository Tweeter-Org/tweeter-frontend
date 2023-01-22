import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Assets/Loader'
import Tweet from '../Home Page/TweetComp'
import Sidebar from './SideBar'
import navTweet from "../Assets/navTweet.svg"
import { TagtweetNav } from '../../react-redux/actions/SearchApi'

const TagTweets = () => {
    const { loading, tagTweets, getTag } = useSelector((ta) => ta.TagTweetFeedReducer)
const dispatch = useDispatch()
    const [tweetarr, setTweetArr] = useState([])
    const [title, setTitle] = useState("tag")
    useEffect(()=>{
        dispatch(TagtweetNav(navTweet, `${tagTweets.tag}`))
        if (getTag) {
          
            setTitle(tagTweets.tag)
            console.log(title)
            setTweetArr(tagTweets.tweets)
        }
    },[getTag, tagTweets])

    console.log(tagTweets)

    useEffect(()=>{
        if(loading===true){
            document.body.style.opacity = 0.5;
        }
        else{
            document.body.style.opacity = 1;
        }
    },[loading])
    
    return <>
    <Sidebar />
        <div className="tweetFlexBox POPUPBG" id="HashTweetBox">
            {tweetarr.length > 0 ? (tweetarr.map((tweet, index) => {
                return <Tweet text={tweet.text} likeCount={parseInt(tweet.likes)} image={tweet.image} video={tweet.video} name={tweet.user.name}
                retweet={tweet.retweet} username={tweet.user.user_name} displaypic={tweet.user.displaypic}
                 tweetId={tweet._id} number={index} bookmarkb="false" />;
            })) :<div className="alterBM" id="alterTagTweet">
    <p className="alterBMText1" id="alterTagP" >No Tweet contains #{title}</p></div> }
        </div>
        {(loading === true) ? <Loader loading={loading} /> : null}
    </>
}

export default TagTweets
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import SearchUser, { SearchTweetWithTag } from "../../react-redux/actions/SearchApi";
import SearchComp from "./SearchComp";
import Tweetsearch from "./Tweetsearch";
import searchIcon from "../Assets/search.svg"
import Sidebar from "./SideBar";
import { TweetListWithTag } from "../../react-redux/actions/Tweets";
import { useNavigate } from "react-router";
import avatar from "../Assets/avatar.svg"

function PhoneSearch() {

    const [search, setSearch] = useState("");
    const dispatch = useDispatch();
    const { list, tomap, loading, tweetList, tohash } = useSelector((S) => S.SearchReducer)
    const [searchListArray, setSearchListArray] = useState([]);
    const [searchTweetList, setSearchTweetList] = useState([]);

    function handleSearch(e) {

        setSearch(e.target.value)
        if (e.target.value.startsWith('#')) {
            dispatch(SearchTweetWithTag(e.target.value.slice(1)))

        }
        dispatch(SearchUser(e.target.value));
        if (e.target.value != "") {
            // document.getElementById("HOME2").style.display = "none"
            document.getElementById("SIDESEARCH").style.display = "flex"
        }

        else {
            // document.getElementById("HOME2").style.display = "flex"
            document.getElementById("SIDESEARCH").style.display = "none"
        }

    }
    useEffect(() => {
        if (tomap) {
            if (list.result.length > 0) {
                setSearchListArray(list.result)
            }
            else {
                setSearchListArray([])
            }
        }
    }, [tomap, list])
    useEffect(() => {
        if (tohash) {
            if (tweetList.length > 0) {
                setSearchTweetList(tweetList)
            }
            else {
                setSearchTweetList([])
            }
        }

    }, [tohash, tweetList])

    const navigate = useNavigate()
    const { tagTweets, getTag } = useSelector((ta) => ta.TagTweetFeedReducer)
    function showTagTweet(tag) {
        dispatch(TweetListWithTag(tag))
        if (getTag) {
            navigate("/tagtweet")
        }
    }

    function toProfile (name){
        // dispatch(ProfileApi(name))
        
            navigate(`/profile/${name}`)
    }

    return <>
        <Sidebar />
        <div id="PHONESEARCH">
            <div className="searchBar" id="phoneSearch1"><img src={searchIcon} className="searchIcon" />
                <input className="searchbar POPUPBG" id="phoneSearch2" type="text" value={search} onChange={handleSearch} placeholder="Search" />
            </div>
            <div className="searchFlexBox POPUPBG" id="SIDESEARCH">
                {tohash ? (
                    searchTweetList.length > 0 ? (searchTweetList.map((se) => {
                        return <>
                            <div className="searchcomp POPUPBG" id="phoneSearch3">
                                <p className="searchName" id="searchtweettag" onClick={() => { showTagTweet(se.hashtag) }}>#{se.hashtag}</p>
                            </div>
                        </>

                    })) : (<p className="searchAlter noPhoneSearch">No search found</p>)
                ) : null}
                {
                    tomap ? ((searchListArray.length > 0) ? (searchListArray.map((searchh) => {
                        return <div className="searchcomp POPUPBG " id="phoneSearch4">

                            {(searchh.displaypic === null) ? (<img src={avatar} id="picincircle" />) :
                                (<img src={searchh.displaypic} id="picincircle" />)

                            }
                            <div className="searchNames">
                                <p className="searchName">{searchh.name}</p>
                                <p className="searchUsername" onClick={() => { toProfile(searchh.user_name) }}>@{searchh.user_name}</p>
                            </div>

                        </div>
                    })) : <p className="searchAlter noPhoneSearch">No search found</p>) : null
                }
            </div>
        </div>

    </>
}

export default PhoneSearch
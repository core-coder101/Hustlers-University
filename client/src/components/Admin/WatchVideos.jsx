import React, { useEffect, useState } from "react";
import "../../assets/css/WatchVideo.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchVideoRange,
  getVideoInfoByID,
  setError,
  setPopup,
} from "../../redux/slices/Admin/WatchVideos";
import CustomPopup from "../common/CustomPopup";
import Comment from "./Comment";
import PlaylistItem from "./PlaylistItem";
import axios from "axios";
import LoadingOverlay from "../common/LoadingOverlay";
// import testVideo from "../../videosfortesting/poseqimdwkcji0oapevq.mov"

export const formatDateMessage = (uploadDate) => {
  console.log(uploadDate);
  const createdAt = new Date(uploadDate);
  const now = new Date();

  const diffTime = Math.abs(now - createdAt);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    if (diffHours < 1) {
      const diffMinutes = Math.floor(diffTime / (1000 * 60));
      return `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""} ago`;
    } else {
      return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    }
  } else if (diffDays === 1) {
    return "Yesterday";
  } else if (diffDays < 7) {
    return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  } else if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  } else if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return `${months} month${months > 1 ? "s" : ""} ago`;
  } else {
    const years = Math.floor(diffDays / 365);
    return `${years} year${years > 1 ? "s" : ""} ago`;
  }
};

export default function WatchVideoes() {
  const { CSRFToken } = useSelector((state) => state.auth);

  const { ID } = useParams();

  const { loading, error, popup, videoInfo, file } = useSelector(
    (state) => state.watchVideos
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showMore, setShowMore] = useState(false);

  const [PlaylistData, SetPlaylistData] = useState([]);

  const [comment, setcomment] = useState("");

  const videoRef = React.useRef(null);

  const GetplaylistData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_HOST}api/GetplaylistData?PlaylistID=${
          videoInfo.VideoPlaylistID
        }`,
        {
          headers: {
            "X-CSRF-TOKEN": CSRFToken,
            "Content-Type": "application/json",
            "API-TOKEN": import.meta.env.VITE_SECRET_KEY,
          },
        }
      );
      SetPlaylistData(response.data.data);
    } catch (error) {}
  };

  const SubmitComment = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_HOST}api/StoreComment`,
        {
          VideoID: ID,
          Comment: comment,
        },
        {
          headers: {
            "X-CSRF-TOKEN": CSRFToken,
            "Content-Type": "application/json",
            "API-TOKEN": import.meta.env.VITE_SECRET_KEY,
          },
        }
      );
    } catch (error) {}
  };

  useEffect(() => {
    if (ID) {
      dispatch(fetchVideoRange({ ID, startByte: 0, endByte: 83886080 })); // 83,886,080 bits == 10MB
      dispatch(getVideoInfoByID(ID));
    }
  }, [ID]);
  useEffect(() => {
    if (videoInfo) {
      if (videoInfo.VideoPlaylistID != null) {
        GetplaylistData();
      }
    }
  }, [videoInfo]);

  // using the redux loading state directly does not work properly
  const [localLoading, setLocalLoading] = useState(false);
  useEffect(() => {
    setLocalLoading(loading);
  }, [loading]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent the default form submission behavior
      SubmitComment();
      setcomment("");
    }
  };

  let index = null;
  if (PlaylistData?.videos) {
    PlaylistData.videos.filter((video, i) => {
      if (videoInfo.id == video.id) {
        index = i;
        return true;
      } else {
        return false;
      }
    });
  }
  const handleEnded = () => {
    if (Number.isInteger(index) && PlaylistData.videos.length > index + 1) {
      navigate("/watchvideo/" + PlaylistData.videos[index + 1].id.toString());
    }
  }

  let dateMsg = "";
  if (videoInfo?.created_at) {
    const createdAt = new Date(videoInfo.created_at);
    dateMsg = formatDateMessage(createdAt);
  } else {
    dateMsg = "NAN";
  }

  return (
    <>
      <LoadingOverlay loading={localLoading} />
      <div className="row m-0 p-0">
        <div className="col-lg-8 videoSideDiv">
          <div className="videodiv">
            <video
              ref={videoRef}
              autoPlay
              src={file}
              className="video"
              controls
              onEnded={handleEnded}
            >
              <source type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          {videoInfo?.VideoPlaylistID && PlaylistData && PlaylistData && PlaylistData.videos && (
            <div
              className="Playlist d-block d-md-block d-lg-none"
              style={{ marginTop: "10px" }}
            >
              <div className="playlistItems">
                <div className="fixedTopDiv">
                  <div className="info">
                    <h6>{videoInfo?.VideoPlaylistID && PlaylistData && PlaylistData.PlaylistTitle}</h6>
                    <p>
                      {videoInfo?.VideoPlaylistID && PlaylistData && PlaylistData.PlaylistCategory} - {index + 1} /{" "}
                      {videoInfo?.VideoPlaylistID && PlaylistData && PlaylistData?.videos?.length}
                    </p>
                  </div>
                </div>
                <div
                  className="overflowDiv"
                  style={{ width: "100%", overflowY: "auto", zIndex: "0" }}
                >
                  {videoInfo?.VideoPlaylistID && PlaylistData && PlaylistData.videos.map((video, index) => {
                    let highlight = "";
                    if (ID == video.id) {
                      highlight = "highlight";
                    }

                    return (
                      <PlaylistItem
                        index={index + 1}
                        key={video.id}
                        Title={video.VideoTitle}
                        VideoLength={video.VideoLength}
                        image={video.images.data}
                        UName="Ahmad"
                        onClickFunction={() => {
                          navigate("/watchvideo/" + video.id.toString());
                        }}
                        highlight={highlight}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          )}
          <div className="video-Details">
            <h4 className="Video-Title roboto-black-italic">
              {videoInfo ? videoInfo.VideoTitle : ""}
            </h4>

            <div className="description">
              <div>
                <p
                  style={{
                    fontWeight: "bold",
                    margin: "0",
                    marginBottom: "5px",
                  }}
                >
                  {dateMsg}
                </p>
              </div>
              {showMore
                ? videoInfo
                  ? videoInfo.VideoDescription
                  : ""
                : videoInfo
                ? videoInfo.VideoDescription.substring(0, 100)
                : ""}
              {/* <br /> */}
              {videoInfo?.VideoDescription.length > 100 && (
                <button
                  className="morebutton"
                  onClick={() => {
                    setShowMore((prev) => !prev);
                  }}
                >
                  {showMore ? " . . .show less" : " . . .show more"}
                </button>
              )}
            </div>
            <hr />
            <div>
              <h5 className="comments_num">13 Comments</h5>
              <input
                name="comment"
                onKeyDown={handleKeyDown}
                id="comment"
                value={comment}
                onChange={(e) => {
                  setcomment(e.target.value);
                }}
                className="commentinput mb-3"
                placeholder="Add a comment"
              />
              {videoInfo?.comments.map((comment) => {
                return <Comment Comment={comment} />;
              })}
            </div>
          </div>
        </div>
        {videoInfo?.VideoPlaylistID && PlaylistData && PlaylistData.videos && (
          <div className="Playlist col-lg-4 d-lg-block d-none">
            <div className="playlistItems">
              <div className="fixedTopDiv">
                <div className="info">
                  <h6>{PlaylistData.PlaylistTitle}</h6>
                  <p>
                    {PlaylistData.PlaylistCategory} - {index + 1} /{" "}
                    {PlaylistData?.videos?.length}
                  </p>
                </div>
              </div>
              <div
                className="overflowDiv"
                style={{ width: "100%", overflowY: "auto", zIndex: "0" }}
              >
                {PlaylistData.videos.map((video, index) => {
                  let highlight = "";
                  if (ID == video.id) {
                    highlight = "highlight";
                  }

                  return (
                    <PlaylistItem
                      index={index + 1}
                      key={video.id}
                      Title={video.VideoTitle}
                      VideoLength={video.VideoLength}
                      image={video.images.data}
                      UName="Ahmad"
                      onClickFunction={() => {
                        navigate("/watchvideo/" + video.id.toString());
                      }}
                      highlight={highlight}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      <CustomPopup
        Visible={popup}
        OnClose={() => {
          dispatch(setPopup(false));
          setTimeout(() => {
            dispatch(setError(""));
          }, 400);
        }}
        errorMessage={error}
      />
    </>
  );
}

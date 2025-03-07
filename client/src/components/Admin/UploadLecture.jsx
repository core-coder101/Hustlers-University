import React, { useEffect, useRef, useState } from "react";
import Popup from "react-animated-popup";
import "../../assets/css/class.css";
import "../../assets/css/UploadLecture.css";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdUpload } from "react-icons/md";
import {
  createPlaylist,
  getPlaylist,
  setError,
  setPopup,
  uploadLecture,
} from "../../redux/slices/Admin/UploadLecture";
import { Tooltip } from "@mui/material";
import { GetClasses } from "../../redux/slices/Admin/UploadLecture";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { ProgressBar } from "react-bootstrap";
import LoadingOverlay from "../common/LoadingOverlay";
import CustomPopup from "../common/CustomPopup";

export default function UploadLecture() {
  const navigate = useNavigate();
  const { popup, classesData, loading, error, playlistData, progress } =
    useSelector((state) => state.uploadLecture);
  const dispatch = useDispatch();

  const topRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(()=>{
    console.log("progress: ", progress);
  }, [progress])

  // moving it to the top cuz I need it in a state declaration. . .
  const names = [
    "Maths",
    "General Science",
    "Physics",
    "Chemistry",
    "Biology",
    "Computer Science",
    "Pakistan Studies",
    "Urdu",
    "English",
    "Islamiat",
  ];

  const maxTitleLength = 100; // same as youtube
  const maxDescriptionLength = 1000; // youtube does 5000 💀

  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [imgClass, setImgClass] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [PlaylistPopup, setPlaylistPopup] = useState(false);
  const [Playlist, setPlaylist] = useState(false);
  const [clickable, setClickable] = useState("clickable");
  const [filteredPlaylist, setFilteredPlaylist] = useState([]);

  const [filterQuery, setFilterQuery] = useState({
    ClassRank: "",
    subject: names[0],
  });

  const [formData, setFormData] = useState({
    VideoTitle: "",
    VideoDescription: "",
    VideoPlaylistID: null,
    video: null,
    thumbnail: null,
    VideoLength: "",
  });

  const [playlistID, setPlaylistID] = useState(null);

  const [playlistFormData, setPlaylistFormData] = useState({
    PlaylistTitle: "",
    PlaylistDescription: "",
    PlaylistRank: "",
    playlistCategory: "",
  });

  // using the redux loading state directly does not work properly
  const [localLoading, setLocalLoading] = useState(false);
  useEffect(() => {
    setLocalLoading(loading);
  }, [loading]);

  const scrollToElement = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handlePlaylistData = (e) => {
    const { name, value } = e.target;
    if(name === "PlaylistTitle"){
      if (value.length <= maxTitleLength) {
        setPlaylistFormData((prev) => {
          return {
            ...prev,
            [name]: value,
          };
        });
      } else {
        const shortened = value.substring(0, maxTitleLength);
        setPlaylistFormData((prev) => {
          return {
            ...prev,
            [name]: shortened,
          };
        });
    }
   } else if(name === "PlaylistDescription"){
      if (value.length <= maxDescriptionLength) {
        setPlaylistFormData((prev) => {
          return {
            ...prev,
            [name]: value,
          };
        });
      } else {
        const shortened = value.substring(0, maxDescriptionLength);
        setPlaylistFormData((prev) => {
          return {
            ...prev,
            [name]: shortened,
          };
        });
    }
  } else {
    setPlaylistFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("video/")) {
      setFormData((prev) => {
        return {
          ...prev,
          video: file,
        };
      });
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      dispatch(setError("Please upload a valid video file."));
      dispatch(setPopup(true));
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    if (name == "ClassRank") {
      setFilterQuery((prev) => {
        return {
          ...prev,
          [name]: parseInt(value),
        };
      });
    } else {
      setFilterQuery((prev) => {
        return {
          ...prev,
          [name]: value,
        };
      });
    }
  };

  const extractThumbnail = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const dataURL = canvas.toDataURL("image/jpeg");

    setFormData((prev) => {
      return {
        ...prev,
        thumbnail: dataURL,
      };
    });
  };

  useEffect(() => {
    if (previewUrl) {
      setClickable("");
      const videoElement = document.getElementById("previewVideo");
      const previewUrl = URL.createObjectURL(formData.video);

      videoElement.src = previewUrl;

      videoElement.onloadedmetadata = () => {
        const VideoLength = parseInt(videoElement.duration);
        setFormData((prev) => {
          return {
            ...prev,
            VideoLength: VideoLength,
          };
        });
      };
    } else {
      setClickable("clickable");
    }
  }, [previewUrl]);

  const handlePlaylistSubmit = (e) => {
    e.preventDefault();
    dispatch(createPlaylist(playlistFormData))
      .unwrap(() => {
        dispatch(getPlaylist());
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (Playlist) {
      setPlaylistID(formData.VideoPlaylistID);
    } else {
      setPlaylistID(null);
    }
  }, [Playlist]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataToSend = {
      ...formData,
      VideoPlaylistID: playlistID,
    };

    if (!dataToSend.video) {
      setTooltipOpen(true);
      setImgClass("uploadDivHover");
      scrollToElement(topRef);
      setTimeout(() => {
        setTooltipOpen(false);
        setImgClass("");
      }, 1000);
    } else if (!(dataToSend.VideoTitle.length <= maxTitleLength)) {
      dispatch(setError("Video title too long"));
      dispatch(setPopup(true));
    } else if (!(dataToSend.VideoDescription.length <= maxDescriptionLength)) {
      dispatch(setError("Video description too long"));
      dispatch(setPopup(true));
    } else {
      dispatch(uploadLecture(dataToSend));
    }
  };

  const handleClick = () => {
    document.getElementById("videoLectureInput").click();
  };

  useEffect(() => {
    dispatch(GetClasses());
    dispatch(getPlaylist());
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "VideoPlaylistID") {
      console.log("SETTING VideoPlaylistID");
      setFormData((prev) => {
        return {
          ...prev,
          [name]: parseInt(value),
        };
      });
    } else if (name === "VideoTitle") {
      if (value.length <= maxTitleLength) {
        setFormData((prev) => {
          return {
            ...prev,
            [name]: value,
          };
        });
      } else {
        const shortened = value.substring(0, maxTitleLength);
        setFormData((prev) => {
          return {
            ...prev,
            [name]: shortened,
          };
        });
      }
    } else if (name === "VideoDescription") {
      if (value.length <= maxDescriptionLength) {
        setFormData((prev) => {
          return {
            ...prev,
            [name]: value,
          };
        });
      } else {
        const shortened = value.substring(0, maxDescriptionLength);
        setFormData((prev) => {
          return {
            ...prev,
            [name]: shortened,
          };
        });
      }
    }
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  useEffect(() => {
    if (classesData && classesData.length > 0) {
      if (Playlist) {
        console.log("Setting VideoPlaylistID to: ", classesData[0].id);
        setFormData((prev) => {
          return {
            ...prev,
            VideoPlaylistID: classesData[0].id,
          };
        });
      }
      setPlaylistFormData((prev) => {
        return {
          ...prev,
          PlaylistRank: parseInt(classesData[0].ClassRank),
        };
      });
      setFilterQuery((prev) => {
        return {
          ...prev,
          ClassRank: parseInt(classesData[0].ClassRank),
        };
      });
    }
  }, [classesData]);

  useEffect(() => {
    if (playlistData && playlistData.length > 0) {
      const tempFiltered = playlistData.filter((playlist) => {
        return (
          playlist.PlaylistCategory == filterQuery.subject &&
          playlist.PlaylistRank == filterQuery.ClassRank
        );
      });
      if (tempFiltered.length > 0) {
        setFormData((prev) => {
          return {
            ...prev,
            VideoPlaylistID: parseInt(tempFiltered[0].id),
          };
        });
        if (Playlist) {
          setPlaylistID(parseInt(tempFiltered[0].id));
        }
        setFilteredPlaylist(tempFiltered);
      } else {
        if (Playlist) {
          setPlaylistID(null);
        }
        setFormData((prev) => {
          return {
            ...prev,
            VideoPlaylistID: "",
          };
        });
        setFilteredPlaylist([]);
      }
    }
  }, [filterQuery, playlistData]);

  return (
    <>
    <LoadingOverlay loading={localLoading && !progress} />
    <div className="uploadLectureMain">
      <div className="mb-4" style={{ width: "100%" }}>
        <div className="headingNavbar d-flex justify-content-center">
          <div className="d-flex">
            <FaRegArrowAltCircleLeft
              className="arrow"
              onClick={() => {
                navigate("/");
              }}
            />
            <h4 ref={topRef}>Dashboard \ Upload Lecture</h4>
          </div>
          <div className="ms-auto me-4"></div>
        </div>
      </div>
      <div className="uploadLecture ms-auto me-auto">
        <form onSubmit={handleSubmit}>
          <Tooltip
            title={clickable ? "Upload a video" : ""}
            arrow
            open={tooltipOpen}
          >
            <div
              className={"videoPreview " + clickable + " " + imgClass}
              style={clickable ? { aspectRatio: "16/9" } : {}}
              onClick={clickable ? handleClick : null}
              onMouseEnter={() => {
                setTooltipOpen(true);
              }}
              onMouseLeave={() => {
                setTooltipOpen(false);
              }}
            >
              {previewUrl ? (
                <>
                  <video
                    width="100%"
                    controls
                    ref={videoRef}
                    id="previewVideo"
                    onLoadedMetadata={() => {
                      videoRef.current.currentTime = 5;
                    }}
                    onSeeked={extractThumbnail}
                  >
                    <source src={previewUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <canvas ref={canvasRef} className="d-none" />
                </>
              ) : (
                <MdUpload className="uploadIcon " />
              )}
            </div>
          </Tooltip>
          <input
            id="videoLectureInput"
            className="d-none"
            name="video"
            type="file"
            accept="video/*"
            onChange={(e) => {
              handleFileChange(e);
            }}
          />
          {formData.thumbnail && (
            <div
              className="mb-3 d-flex w-100"
              style={{
                justifyContent: "space-between",
                alignContent: "center",
              }}
            >
              <label className="form-label d-flex align-items-center">
                Thumbnail:
              </label>
              <Tooltip title="Seek video to change" arrow>
                <img
                  style={{ width: "250px", height: "auto" }}
                  src={formData.thumbnail}
                />
              </Tooltip>
            </div>
          )}
          <div className="mb-3">
            <label for="exampleFormControlInput1" className="form-label">
              Title
            </label>
            <input
              type="text"
              name="VideoTitle"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Enter Title of your video"
              value={formData.VideoTitle}
              onChange={handleChange}
              required
              spellCheck={false}
            />
            {formData.VideoTitle && (
              <p
                style={{
                  fontSize: "10px",
                  textAlign: "right",
                  margin: "0",
                  marginTop: "5px",
                }}
              >
                {100 - formData.VideoTitle.length}/{maxTitleLength} Characters
                Remaining
              </p>
            )}
          </div>
          <div className="mb-3">
            <label for="exampleFormControlTextarea1" className="form-label">
              Description
            </label>
            <textarea
              name="VideoDescription"
              className="form-control"
              placeholder="Enter Description for your video"
              id="exampleFormControlTextarea1"
              rows="3"
              value={formData.VideoDescription}
              onChange={handleChange}
              spellCheck={false}
            ></textarea>
            {formData.VideoDescription && (
              <p
                style={{
                  fontSize: "10px",
                  textAlign: "right",
                  margin: "0",
                  marginTop: "5px",
                }}
              >
                {1000 - formData.VideoDescription.length}/{maxDescriptionLength}{" "}
                Characters Remaining
              </p>
            )}
          </div>

          {Playlist ? (
            <>
              <hr></hr>
              <button
                id="mybutton"
                className="btn ms-0 "
                style={{ outline: "none" }}
                onClick={() => {
                  setPlaylist(false);
                }}
                type="button"
              >
                <p className="ml-1" style={{ color: "blueviolet" }}>
                  Hide Playlist Section .. ..
                </p>
              </button>
              <br></br>
              <div className="d-flex mb-3">
                <div className="flex-grow-1 me-1">
                  <label for="PlayList ">Class Rank</label>
                  <select
                    className="lectureClassRank AddPlayList"
                    name="ClassRank"
                    required
                    value={filterQuery.ClassRank}
                    onChange={handleFilterChange}
                  >
                    {classesData &&
                      Array.from(
                        new Set(classesData.map((Class) => Class.ClassRank))
                      ).map((rank) => (
                        <option key={rank} value={rank}>
                          {rank}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="flex-grow-1 ms-1">
                  <label for="PlayList ">Subject</label>
                  <select
                    className="lectureClassRank AddPlayList"
                    name="subject"
                    value={filterQuery.subject}
                    onChange={handleFilterChange}
                    required
                  >
                    {names.map((subject, index) => {
                      return (
                        <option key={index} value={subject}>
                          {subject}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <label for="PlayList ">PlayList</label>
              <div className="d-flex m-0 p-0 g-5 mb-4">
                <div className="flex-grow-1">
                  <select
                    className="lectureClassRank AddPlayList"
                    name="VideoPlaylistID"
                    onChange={handleChange}
                    value={formData.VideoPlaylistID}
                  >
                    {filteredPlaylist?.map((playlist, index) => (
                      <option key={index} value={playlist.id}>
                        {playlist.PlaylistTitle}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mt-1 ms-3 p-0">
                  <button
                    type="button"
                    className="btn btn-info"
                    onClick={() => {
                      setPlaylistPopup(true);
                    }}
                  >
                    Add new Playlist
                  </button>
                </div>
              </div>
            </>
          ) : (
            <button
              id="mybutton"
              className="btn ms-0"
              style={{ outline: "none" }}
              onClick={() => {
                setPlaylist(true);
              }}
              type="button"
            >
              <p className="ml-1" style={{ color: "blueviolet" }}>
                Add Video to Playlist
              </p>
            </button>
          )}
          

          <CustomPopup 
            Visible={popup}
            OnClose={() => {
              dispatch(setPopup(false));
              setTimeout(() => {
                dispatch(setError(null));
              }, 400);
            }}
            errorMessage={error}
          />
          <div className='popup'>
            {progress ? <Popup
              visible={localLoading}
              onClose={() => {}}
              style={{
                backgroundColor: "rgba(17, 16, 29, 0.95)",
                boxShadow: "rgba(0, 0, 0, 0.2) 5px 5px 5px 5px",
                padding: "40px 20px",
              }}
            >
              <div
                className="d-column-flex justify-content-center align-items-center"
                style={{ width: "max-content", height: "100%", padding: "0" }}
              >
                <h5
                  dangerouslySetInnerHTML={{ __html: error }}
                  style={{ color: "white", margin: "0" }}
                ></h5>

                  <ProgressBar
                    style={{ height: "20px", marginTop: "15px" }}
                    now={progress}
                    label={`${progress}%`}
                  />
              </div>
            </Popup> : null}
          </div>
          <div>
          <div className="popup">
            <Popup
              animationDuration={400}
              visible={PlaylistPopup}
              onClose={() => {
                setPlaylistPopup(false);
                setTimeout(() => {
                  dispatch(setError(null));
                }, 400);
              }}
              style={{
                backgroundColor: "rgba(207, 204, 204)",
                boxShadow: "rgba(0, 0, 0, 0.56) 0px 22px 70px 4px",
                padding: "30px 20px",
                position: "fixed"
              }}
            >
              <div
                className=""
                style={{ Width: "100%", height: "100%", padding: "0" }}
              >
                <h3
                  style={{
                    color: "Black",
                    margin: "0",
                    padding: "0px 40px 0px 40px",
                  }}
                >
                  Add a new playlist
                </h3>
                <div>
                  <div className="mb-3 mt-4">
                    <label for="exampleFormControlInput1" className="form-label">
                      Title{" "}
                    </label>
                    <input
                      type="text"
                      name="PlaylistTitle"
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="Enter Title of your video"
                      value={playlistFormData.PlaylistTitle}
                      onChange={handlePlaylistData}
                      required
                    />
                    {playlistFormData.PlaylistTitle && (
                      <p
                        style={{
                          fontSize: "10px",
                          textAlign: "right",
                          margin: "0",
                          marginTop: "5px",
                        }}
                      >
                        {100 - playlistFormData.PlaylistTitle.length}/{maxTitleLength} Characters
                        Remaining
                      </p>
                    )}
                  </div>
                  <div className="mb-3">
                    <label
                      for="exampleFormControlTextarea1"
                      className="form-label"
                    >
                      Description
                    </label>
                    <textarea
                      name="PlaylistDescription"
                      className="form-control"
                      placeholder="Enter Description for your video"
                      id="exampleFormControlTextarea1"
                      rows="3"
                      value={playlistFormData.PlaylistDescription}
                      onChange={handlePlaylistData}
                    ></textarea>
                    {playlistFormData.PlaylistDescription && (
                      <p
                        style={{
                          fontSize: "10px",
                          textAlign: "right",
                          margin: "0",
                          marginTop: "5px",
                        }}
                      >
                        {1000 - playlistFormData.PlaylistDescription.length}/{maxDescriptionLength} Characters
                        Remaining
                      </p>
                    )}
                  </div>
                  <label for="lectureClassRank">PlayList Class Rank</label>
                  <div className="d-flex ">
                    <select
                      className="lectureClassRank flex-grow-1 AddPlayList mb-3"
                      name="PlaylistRank"
                      required
                      value={playlistFormData.PlaylistRank}
                      onChange={handlePlaylistData}
                    >
                      {classesData &&
                        Array.from(
                          new Set(classesData.map((Class) => Class.ClassRank))
                        ).map((rank) => (
                          <option key={rank} value={parseInt(rank)}>
                            {rank}
                          </option>
                        ))}
                    </select>
                  </div>
                  <InputLabel
                    className="mb-1 mt-2"
                    style={{ color: "Black" }}
                    id="demo-multiple-chip-label"
                  >
                    Subjects
                  </InputLabel>
                  <Tooltip
                    title="Select the student's subjects"
                    arrow
                    placement="bottom"
                    size="lg"
                    variant="solid"
                  >
                    <div className="d-flex">
                      <Select
                        style={{ color: "Black", backgroundColor: "white" }}
                        className="flex-grow-1 AddPlayList"
                        labelId="demo-multiple-chip-label"
                        id="demo-multiple-chip"
                        value={playlistFormData.playlistCategory}
                        onChange={handlePlaylistData}
                        input={
                          <OutlinedInput id="select-multiple-chip" label="Chip" />
                        }
                        MenuProps={MenuProps}
                        required
                        name="playlistCategory"
                      >
                        {names.map((name) => (
                          <MenuItem key={name} value={name}>
                            {name}
                          </MenuItem>
                        ))}
                      </Select>
                    </div>
                  </Tooltip>
                </div>
                <div>
                  <button
                    onClick={handlePlaylistSubmit}
                    className="btn btn-info mt-3"
                    style={{ width: "100%" }}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </Popup>
          </div>
            <button className="btn btn-primary w-100 mt-2" type="submit">
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}

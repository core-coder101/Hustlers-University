import React, { useEffect, useState } from "react";
import "../../assets/css/class.css";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetClassDataById, GetTeachers, UpdateClass, createClass, setError, setPopup } from "../../redux/slices/Admin/CreateClass";
import LoadingOverlay from "../common/LoadingOverlay";
import CustomPopup from "../common/CustomPopup";

export default function CreateClass() {
  const { ID } = useParams();
  const { loading, error, popup, classData, teachersData } = useSelector((state) => state.createClass);

  const [formData, setFormData] = useState({
    ClassName: "",
    ClassRank: "",
    ClassFloor: "",
    ClassTeacherID: "",
    ClassID: "",
  });

  const [localPopup, setLocalPopup] = useState(false)

  useEffect(()=>{
    setLocalPopup(popup)
  }, [popup])

  const [filteredTeachers, setFilteredTeachers] = useState([])

  useEffect(() => {
    const filtered = teachersData.filter(teacher => {
      if(teacher.classes && teacher.classes.length > 0){
        // teacher already has a class assigned to him
        return false
      } else {
        return true
      }
    })
    if(!filtered.length > 0){
      dispatch(setError("Please add a new teacher"))
      dispatch(setPopup(true))
    } else {
      setFilteredTeachers(filtered)
      setFormData(prev => {
        return {
          ...prev,
          ClassTeacherID: filtered[0].id
        }
      })
    }

  }, [teachersData])

  const navigate = useNavigate();
  const dispatch = useDispatch()

  useEffect(()=>{
    if(ID && classData.data){
      setFormData({
          ClassName: classData.data.ClassName,
          ClassRank: classData.data.ClassRank,
          ClassFloor: classData.data.ClassFloor,
          ClassTeacherID: classData.data.ClassTeacherID,
          ClassID: classData.data.id,
        })
    }
  }, [classData])

  useEffect(() => {
    if (ID) {
      dispatch(GetClassDataById(ID))
      .unwrap().catch((error)=>{
        console.log(error);
        navigate("/createclass")
      })
    }
  }, [ID]);

  const query = ['classes', 'users']

  useEffect(() => {
    dispatch(GetTeachers(query))
  }, [])

  // using the redux loading state directly does not work properly
  const [localLoading, setLocalloading] = useState(false)
  useEffect(()=>{
    setLocalloading(loading)
  }, [loading])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.ClassID == ""){
      dispatch(createClass(formData)).unwrap().then( () => {
        const filtered = filteredTeachers.filter((teacher) => {
          return teacher.id != formData.ClassTeacherID
        })
        setFilteredTeachers(filtered)
        setFormData({
            ClassName: "",
            ClassRank: "",
            ClassFloor: "",
            ClassTeacherID: filtered[0],
            ClassID: "",
        })
        return
      }).catch(()=>{
        return
      })
    } else {
      dispatch(UpdateClass(formData)).unwrap().then(()=>{
        setTimeout(() => {
            dispatch(setPopup(false))
          }, 1000);
          setTimeout(() => {
            navigate(-1);
          }, 1500);
          setFormData({
            ClassName: "",
            ClassRank: "",
            ClassFloor: "",
            ClassTeacherID: filteredTeachers[0].id,
            ClassID: "",
          });
      }).catch(()=>{
        return
      })
    }
  };

  return (
    <>
    <LoadingOverlay loading={localLoading} />
    <div className="createClass">
      <div className="mt-2 mb-4">
        <div className="headingNavbar d-flex justify-content-center">
          <div className="d-flex">
            <FaRegArrowAltCircleLeft
              className="arrow"
              onClick={() => {
                navigate("/");
              }}
            />
            <h4>Dashboard \ Create a New Class</h4>
          </div>
          <div className="ms-auto me-4"></div>
        </div>
      </div>
      <div className="FormBorder ms-auto me-auto">
        <form onSubmit={handleSubmit}>
          <div className="d-flex flex-column">
            <label className="label">Name of the Class</label>
            <input
              className="Forminput"
              placeholder="Enter name of Class"
              name="ClassName"
              value={formData.ClassName}
              onChange={handleChange}
              defaultValue={classData ? classData.data?.ClassName : ""}
              required
            ></input>
          </div>
          <div className="d-flex flex-column mt-3">
            <label className="label">Rank of the Class</label>
            <input
              className="Forminput"
              type="number"
              placeholder="Enter Rank of Class"
              name="ClassRank"
              value={formData.ClassRank}
              onChange={handleChange}
              defaultValue={classData ? classData.data?.ClassRank : ""}
              required
            ></input>
          </div>
          <div className="d-flex flex-column mt-3">
            <label className="label">Name of the Floor</label>
            <input
              className="Forminput"
              placeholder="Enter name of Floor"
              name="ClassFloor"
              value={formData.ClassFloor}
              onChange={handleChange}
              defaultValue={classData ? classData.data?.ClassFloor : ""}
              required
            ></input>
          </div>
          <div className="d-flex flex-column mt-3">
            <label className="label">Name of the Teacher</label>
            <select
              id="cars"
              className="Forminput mb-3"
              name="ClassTeacherID"
              value={formData.ClassTeacherID}
              onChange={handleChange}
              required
            >
              {classData && classData.data?.id && classData.data.teachers ? (
                <option value={classData.data.teachers.id}>
                  {classData.data.teachers.users.name}
                </option>
              ) : (
                ""
              )}
              {filteredTeachers &&
                Object.values(filteredTeachers).length > 0 &&
                Object.values(filteredTeachers).map((teacher, index) => {
                  return (
                    <option value={teacher.id}>{teacher.users.name}</option>
                  );
                })}
            </select>
          </div>
          <CustomPopup
            Visible={localPopup}
            OnClose={() => {
              dispatch(setPopup(false))
              setTimeout(() => {
                dispatch(setError(null))
              }, 400);
            }}
            errorMessage={error}
          />
          <div>
            <button className="btn btn-primary w-100" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}
import React, { useState, useEffect, useRef } from 'react';
import "../../assets/css/Teacher.css";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import defaultImg from "../../assets/img/default.png";
import { Tooltip } from "@mui/material";
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { useParams } from 'react-router-dom';
import smoothscroll from 'smoothscroll-polyfill';
import { useDispatch, useSelector } from 'react-redux';
import { GetClasses, setError, setPopup } from '../../redux/slices/Admin/UploadLecture';
import { setError as setStudentError, setPopup as setStudentPopup } from '../../redux/slices/Admin/CreateStudent';
import CustomPopup from '../common/CustomPopup';
import { GetStudentData, UpdateStudent, Createstudent } from '../../redux/slices/Admin/CreateStudent';
import { handleError } from '../../redux/errorHandler';
import LoadingOverlay from '../common/LoadingOverlay';


export default function CreateStudent() {

    const { ID } = useParams();
    const { classesData , loading , popup , error } = useSelector((state)=> state.uploadLecture)
    const { loading: studentLoading , popup: studentPopup , error: studentError , StudentData } = useSelector((state)=> state.createStudent);
    const dispatch = useDispatch();
    smoothscroll.polyfill();
    
    const { user } = useSelector((state) => state.auth)
    
    const navigate = useNavigate()

    // using the redux loading state directly does not work properly
    // don't know if I should just put them both in the same useEffect. . . 
    const [localLoading, setLocalLoading] = useState(false)
    useEffect(()=>{
      setLocalLoading(loading)
    }, [loading])
    const [studentLocalLoading, setStudentLocalLoading] = useState(false)
    useEffect(()=>{
      console.log("studentLocalLoading: ", studentLocalLoading);
      setStudentLocalLoading(studentLoading)
    }, [studentLoading])
    
    if (user.token) {
        axios.defaults.headers.common['Authorization'] =
        `Bearer ${user.token}`;
        }
        
        const [open, setOpen] = useState(false)
        const [imgClass, setImgClass] = useState("")
        const [formData, setFormData] = useState({
        image: null,
        name: "",
        userName: "",
        email: "",
        subjects: [],
        StudentDOB: "",
        StudentGender: "Male",
        StudentCNIC: "",
        StudentClassID:"",
        StudentPhoneNumber:"",
        StudentHomeAddress: "",
        StudentReligion: "Islam",
        StudentMonthlyFee: "",
        FatherName:"",
        MotherName:"",
        GuardiansCNIC:"",
        GuardiansPhoneNumber:"",
        GuardiansPhoneNumber2:"",
        HomeAddress:"",
        GuardiansEmail:""
    });

  const topRef = useRef(null);

  function handleImgClick() {
    document.getElementById("studentImageInput").click();
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        const dataURL = reader.result;
        setFormData((prev) => {
          return { ...prev, image: dataURL };
        });
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    dispatch(GetClasses())
  }, [dispatch]);

  useEffect(() => {
    if (classesData.length > 0) {
      setFormData((prev) => ({
        ...prev,
        StudentClassID: JSON.stringify(classesData[0].id),
      }));
    }
  }, [classesData]);

  useEffect(() => {
    if (ID) {
      dispatch(GetStudentData(ID))
      .unwrap(()=>{
      }).
      catch((error)=>{
        setError(handleError(error))
        navigate("/addstudent");
      })
    }
  }, []);
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.image) {
      setOpen(true);
      setImgClass("imgHover");
      scrollToElement(topRef);
      setTimeout(() => {
        setOpen(false);
        setImgClass("");
      }, 1000);
      return;
    }
    if (StudentData && StudentData.length > 0 && StudentData[0].users) {
      dispatch(UpdateStudent(formData)).unwrap().then((result)=>{
        console.log("RAN");
        setFormData({
          name: "",
          userName: "",
          image: "",
          email: "",
          subjects: [],
          StudentDOB: "",
          StudentGender: "Male",
          StudentCNIC: "",
          StudentClassID: JSON.stringify(classesData[0].id),
          StudentPhoneNumber: "",
          StudentHomeAddress: "",
          StudentReligion: "Islam",
          StudentMonthlyFee: "",
          FatherName: "",
          MotherName: "",
          GuardiansCNIC: "",
          GuardiansPhoneNumber: "",
          GuardiansPhoneNumber2: "",
          HomeAddress: "",
          GuardiansEmail: "",
        }
          );
        navigate("/addstudent");
      })
    } else {
      dispatch(Createstudent(formData)).unwrap().then(()=>{
        setFormData({
          name: "",
          userName: "",
          email: "",
          subjects: [],
          StudentDOB: "",
          StudentGender: "Male",
          StudentCNIC: "",
          StudentClassID: JSON.stringify(classesData[0].id),
          StudentPhoneNumber: "",
          StudentHomeAddress: "",
          StudentReligion: "Islam",
          StudentMonthlyFee: "",
          FatherName: "",
          MotherName: "",
          GuardiansCNIC: "",
          GuardiansPhoneNumber: "",
          GuardiansPhoneNumber2: "",
          HomeAddress: "",
          GuardiansEmail: "",
        });
      }).catch((error)=>{
        if (error.response?.data?.message?.includes("users_email_unique")) {
          scrollToElement(topRef);
        }
      })
    }
  };

  useEffect(() => {
    if(!ID){
      if (classesData && classesData.length > 0) {
        setFormData((prev) => {
          return {
            ...prev,
            StudentClassID: JSON.stringify(classesData[0].id),
          };
        });
      }
    }
  }, [classesData]);

  useEffect(() => {
    if (StudentData && StudentData.length > 0 && StudentData[0].users) {
      let subjects = [];

      // Assuming StudentData[0].users.subjects[0] is an array
      for (let subject of StudentData[0].users.subjects) {
        subjects.push(subject.SubjectName);
      }
      setFormData((prev) => {
        return {
          ...prev,
          ID: ID,
          image: `data:image/png;base64,${StudentData[0].users.images[0].data}` || "",
          name: StudentData[0].users.name || "",
          userName: StudentData[0].users.userName || "",
          email: StudentData[0].users.email || "",
          subjects: subjects,
          StudentDOB: StudentData[0].StudentDOB || "",
          StudentGender: StudentData[0].StudentGender || "Male",
          StudentClassID: JSON.stringify(StudentData[0].StudentClassID) || "",
          StudentCNIC: StudentData[0].StudentCNIC || "",
          StudentPhoneNumber: StudentData[0].StudentPhoneNumber || "",
          StudentHomeAddress: StudentData[0].StudentHomeAddress || "",
          StudentReligion: StudentData[0].StudentReligion || "Islam",
          StudentMonthlyFee: StudentData[0].StudentMonthlyFee || "",
          FatherName: StudentData[0].parents.FatherName || "",
          MotherName: StudentData[0].parents.MotherName || "",
          GuardiansCNIC: StudentData[0].parents.GuardiansCNIC || "",
          GuardiansPhoneNumber: StudentData[0].parents.GuardiansPhoneNumber || "",
          GuardiansPhoneNumber2: StudentData[0].parents.GuardiansPhoneNumber2 || "",
          HomeAddress: StudentData[0].parents.HomeAddress || "",
          GuardiansEmail: StudentData[0].parents.GuardiansEmail || "",
        };
      });
    }
  }, [StudentData]);

  function handleInvalid(e) {
    if (formData.image) {
      return;
    }
    e.preventDefault();
    setOpen(true);
    setImgClass("imgHover");
    scrollToElement(topRef);
    setTimeout(() => {
      setOpen(false);
      setImgClass("");
    }, 1000);
  }
  function scrollToElement(ref){
    if(ref.current){
        ref.current.scrollIntoView({behavior: 'smooth'})
    }
}

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

  const handleSelectChange = (event) => {
    const {
      target: { value },
    } = event;
    setFormData((prev) => {
      return {
        ...prev,
        // On autofill we get a stringified value.
        subjects: typeof value === "string" ? value.split(",") : value,
      };
    });
  };

  return (
    <>
    <LoadingOverlay loading={localLoading || studentLocalLoading} />
    <div className="createClass">
      <div className="mt-2 mb-4">
        <div className="headingNavbar d-flex justify-content-center">
          <div className="d-flex">
            <FaRegArrowAltCircleLeft
              onClick={() => {
                navigate("/");
              }}
              className="arrow"
            />
            <h4 ref={topRef}>Dashboard \ Admit a new Student</h4>
          </div>
          <div className="ms-auto me-4"></div>
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        onInvalid={(e) => {
          handleInvalid(e);
        }}
      >
        <div className="row m-0 p-0">
          <div className="FormBorder ms-auto me-auto">
            <center>
              <h2 className="protest-revolution-regular mb-3">Students Data</h2>
            </center>
            <Tooltip
              title="Add Student's Image"
              arrow
              placement="bottom"
              size="lg"
              variant="solid"
              open={open}
            >
              <div
                className={"profile-container ms-auto me-auto mb-3 " + imgClass}
                onMouseEnter={() => {
                  setOpen(true);
                }}
                onMouseLeave={() => {
                  setOpen(false);
                }}
              >
                <img
                  src={
                    formData.image
                      ? formData.image
                      : StudentData &&
                        StudentData.length > 0 &&
                        StudentData[0].users &&
                        StudentData[0].users.images &&
                        StudentData[0].users.images.length > 0 &&
                        StudentData[0].users.images[0].data
                      ? `data:image/png;base64,${StudentData[0].users.images[0].data}`
                      : formData.image
                      ? formData.image
                      : defaultImg
                  }
                  alt="Profile Icon"
                  className="profile-icon"
                  onClick={handleImgClick}
                />
              </div>
            </Tooltip>
            <input
              id="studentImageInput"
              className="imageInput d-none"
              name="image"
              type="file"
              onChange={handleFileChange}
            />
            <div className="d-flex flex-column mt-4">
              <input
                className="Forminput"
                placeholder="Enter name of Student"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="d-flex flex-column mt-3">
              <input
                className="Forminput"
                placeholder="Enter UserName of Student"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="d-flex flex-column mt-3">
              <input
                className="Forminput"
                type="email"
                value={formData.email}
                placeholder="Enter Email of Student"
                name="email"
                onChange={handleChange}
                required
              />
            </div>
            <InputLabel className="mb-1 mt-2" id="demo-multiple-chip-label">
              Subjects
            </InputLabel>
            <Tooltip
              title="Select the student's subjects"
              arrow
              placement="bottom"
              size="lg"
              variant="solid"
            >
              <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={formData.subjects}
                onChange={handleSelectChange}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
                required
              >
                {names.map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </Tooltip>
            <div className="d-flex flex-column mt-3">
              <input
                className="Forminput"
                type="date"
                placeholder="Enter DOB of Student"
                name="StudentDOB"
                value={formData.StudentDOB}
                onChange={handleChange}
                required
              />
            </div>
            <div className="d-flex flex-column mt-3">
              <label className="label">Gender of Student</label>
              <select
                id="Genders"
                className="Forminput"
                value={formData.StudentGender}
                name="StudentGender"
                onChange={handleChange}
                required
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Not Sure">Not Sure</option>
                <option value="Still Not Sure">Still Not Sure</option>
                <option value="Good Question!">Good Question!</option>
              </select>
            </div>
            <div className="d-flex flex-column mt-3">
              <input
                className="Forminput"
                type="text"
                placeholder="Enter CNIC of Student"
                name="StudentCNIC"
                value={formData.StudentCNIC}
                onChange={handleChange}
                required
              />
            </div>
            <div className="d-flex flex-column mt-3">
              <label className="label">Class of Student</label>
              <select
                id="StudentClass"
                className="Forminput"
                name="StudentClassID"
                onChange={handleChange}
                value={formData.StudentClassID}
                required
              >
                {classesData &&
                  classesData.map((Class) => {
                    return (
                      <option value={Class.id}>
                        {Class.ClassRank} {Class.ClassName}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="d-flex flex-column mt-3">
              <input
                className="Forminput"
                type="text"
                placeholder="Enter Phone Number of Student"
                name="StudentPhoneNumber"
                value={formData.StudentPhoneNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div className="d-flex flex-column mt-3">
              <input
                className="Forminput"
                type="text"
                placeholder="Enter Home Address of Student"
                name="StudentHomeAddress"
                value={formData.StudentHomeAddress}
                onChange={handleChange}
                required
              />
            </div>
            <div className="d-flex flex-column mt-3">
              <label className="label">Religion of Student</label>
              <select
                id="religions"
                className="Forminput"
                name="StudentReligion"
                value={formData.StudentReligion}
                onChange={handleChange}
                required
              >
                <option value="Islam">Islam</option>
                <option value="Christianity">Christianity</option>
                <option value="Atheist">Atheist</option>
                <option value="Hinduism">Hinduism</option>
                <option value="Buddhism">Buddhism</option>
              </select>
            </div>
            <div className="d-flex flex-column mt-3">
              <input
                className="Forminput"
                type="number"
                placeholder="Enter Monthly fee of Student"
                name="StudentMonthlyFee"
                value={formData.StudentMonthlyFee}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="parentsForm FormBorder ms-auto me-auto">
            <center>
              <h2 className="protest-revolution-regular">Parents Data</h2>
            </center>

            <div className="d-flex flex-column">
              <div className="d-flex flex-column mt-3">
                <input
                  className="Forminput"
                  type="text"
                  placeholder="Enter name of Father"
                  name="FatherName"
                  onChange={handleChange}
                  value={formData.FatherName}
                  required
                />
              </div>
              <div className="d-flex flex-column mt-3">
                <input
                  className="Forminput"
                  type="text"
                  placeholder="Enter name of Mother"
                  name="MotherName"
                  onChange={handleChange}
                  value={formData.MotherName}
                  required
                />
              </div>
              <div className="d-flex flex-column mt-3">
                <input
                  className="Forminput"
                  type="text"
                  placeholder="Enter CNIC of Guardians"
                  name="GuardiansCNIC"
                  value={formData.GuardiansCNIC}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="d-flex flex-column mt-3">
                <input
                  className="Forminput"
                  type="text"
                  placeholder="Enter phone number of Guardians"
                  name="GuardiansPhoneNumber"
                  value={formData.GuardiansPhoneNumber}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="d-flex flex-column mt-3">
                <input
                  className="Forminput"
                  type="text"
                  placeholder="Enter Extra Phone Number Just in case"
                  name="GuardiansPhoneNumber2"
                  value={formData.GuardiansPhoneNumber2}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="d-flex flex-column mt-3">
                <input
                  className="Forminput"
                  type="text"
                  placeholder="Enter Home Address of Guardians"
                  name="HomeAddress"
                  value={formData.HomeAddress}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="d-flex flex-column mt-3 mb-3">
                <input
                  className="Forminput"
                  type="email"
                  placeholder="Enter Email of Guardians"
                  name="GuardiansEmail"
                  onChange={handleChange}
                  value={formData.GuardiansEmail}
                  required
                />
              </div>
              <CustomPopup 
              Visible={popup}
              OnClose={() => {
                dispatch(setPopup(false));
                  setTimeout(() => {
                    dispatch(setError(""))
                  }, 400);
                }}
              errorMessage = {error}
              />
              <CustomPopup 
              Visible={studentPopup}
              OnClose={() => {
                dispatch(setStudentPopup(false));
                  setTimeout(() => {
                    dispatch(setStudentError(""))
                  }, 400);
                }}
              errorMessage = {studentError}
              />
              <div className="d-flex flex-column ">
                <button className="btn btn-primary" type="submit">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </>
  );
}

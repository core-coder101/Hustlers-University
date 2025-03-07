export const handleResponse = (data) => {

    console.log("Response received: ", data)

    if(!data.message){
        return "No error message from server";
    }

    const shortener = (message) => {
      return message.length > 40 ? message.substring(0, 40) : message
    }

    if(data.message.ClassName){
      return data.message.ClassName[0]
    }

    if (typeof data.message === 'string') {
        if (data.message.includes("[2002]")) {
          console.error("DATABASE DOWN");
          return "Database down at the moment";
        }

        if (data.message.includes("users_email_unique")) {
          return "Email must be unique";
        }
        if (data.message.includes("Undefined variable $teacher")) {
          return "Teacher not Found";
        }
        
        if(data.message.includes("need fully-qualified address")){
            return "Please Enter a valid Email address"
        }

          return shortener(data.message)

      } else if (data.message.email) {
        return data.message.email[0];
    } else if(data.message.endTime){
        return (data.message.endTime[0])
    } else if(data.message.startTime){
      return (data.message.startTime[0])
    }

    return "An unknown error occurred";
};
    
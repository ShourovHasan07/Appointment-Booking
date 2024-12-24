import { createContext } from "react";


export const AppContext = createContext()
 const AppContextProvider = (props)=>{

    const calculateAge = (dob) =>{
        const today = new Date()
        const birtDate = new Date(dob)

        let age = today.getFullYear()-birtDate.getFullYear()
        return age 

        
    }

    const slotDateFormate = (slotData) => {
        console.log("slotData received:", slotData);
      
        if (!slotData || typeof slotData !== "string") {
          console.error("Invalid slotData:", slotData);
          return "Invalid Date";
        }
      
        const dateArray = slotData.split("_");
      
        if (dateArray.length !== 3 || isNaN(Number(dateArray[1])) || Number(dateArray[1]) < 1 || Number(dateArray[1]) > 12) {
          console.error("Malformed slotData:", slotData);
          return "Invalid Date";
        }
      
        return `${dateArray[0]} ${months[Number(dateArray[1])]} ${dateArray[2]}`;
      };
      
    

     const value ={

     calculateAge,slotDateFormate

     }

     return(

        <AppContext.Provider value={value}>
            {
                props.children
            }
        </AppContext.Provider>

     )
 }

 export default AppContextProvider
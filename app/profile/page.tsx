import { useState,useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

import Profile from "@components/Profile"

const Profiles:React.FC  = () => {

    const handleEdit = () => {

    }
    const handleDelete = () => {
        
    }


  return (
    <Profile
        // name="My"
        // desc="Welcome to your personalized profile page"
        // data={[]}
        // handleEdit={}
        // handleDelete={}
    />
  )
}

export default Profiles
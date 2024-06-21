"use client";

import axios from "axios";
import { useEffect, useState } from "react";

import { RiAdminFill } from "react-icons/ri";

export default function AdminProfileFile() {
  const [user, setUser] = useState([]);
  useEffect(() => {
    const fetchingData = async () => {
      const data = await axios.get("http://localhost:3001/all_users/admin");
      setUser(data.data);
    };
    fetchingData();
  }, []);
  return (
    <div className="">
      <RiAdminFill />
    </div>
  );
}

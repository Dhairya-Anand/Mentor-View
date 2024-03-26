import React from "react";
import { Route, Routes } from "react-router-dom";
import MyStudents from "./myStudents/myStudents";
import Tempelate from "./home/Tempelate";
import AllStudents from "./allStudents/allStudents";
import AddStudents from "./addStudents/addStudents";
import View from "./view/view";

export default function HomeRoute() {
  return (
    <Tempelate>
      <Routes>
        <Route path="/my-students" element={<MyStudents />} />
        <Route path="/all-students" element={<AllStudents />} />
        <Route path="/view" element={<View />} />
        <Route path="/add-student" element={<AddStudents />} />
      </Routes>
    </Tempelate>
  );
}

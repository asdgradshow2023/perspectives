import students from "../assets/drivers/gradshow2023_people.json";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { TestThree } from "../components";
export function AllStudentsPage() {
  return (
    <div className="People">
      <div className="flex flex-col items-center">
        <TestThree
          pagetype="People"
          loadingText="Loading Students..."
          additionalLoading={true}
        />
      </div>
    </div>
  );
}

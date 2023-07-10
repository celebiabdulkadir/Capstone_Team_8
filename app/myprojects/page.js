"use client"
import React, { useEffect, useState } from "react";
import { query, collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { getAuth } from "@firebase/auth";
import PageLayout from "@/components/pageLayout";

function MyProject() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [userId, setUserId] = useState(null);
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  const toggleAccordion1 = () => {
    setIsOpen1(!isOpen1);
    }
  
  const toggleAccordion2 = () => {
    setIsOpen2(!isOpen2);
  };
  const auth = getAuth();

  useEffect(() => {
    const fetchProjects = async () => {
      const q = query(collection(db, "app"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let dataArr = [];
        querySnapshot.forEach((doc) => {
          const projectData = { ...doc.data(), id: doc.id };
          const totalDonations = projectData.donations.reduce(
            (total, donation) => total + parseInt(donation.donation),
            0
          );
          dataArr.push({ ...projectData, totalDonations });
        });
        dataArr.sort((a, b) => b.totalDonations - a.totalDonations);

        setData(dataArr);
      });
      return () => unsubscribe();
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    setUserId(auth.currentUser.uid);
  }, [auth.currentUser]);

  useEffect(() => {
    if (userId) {
      const filteredProjects = data.filter((item) => item.userId === userId);
      setFilteredData(filteredProjects);
    }
  }, [data, userId]);


console.log(filteredData)
  return (
    <PageLayout>
      <section className="flex flex-col justify-center h-full md:px-12 px-6 py-24 w-full">
        <div className="grid grid-cols-12 gap-8 justify-center items-center w-full">
          <div className="w-full h-full lg:col-span-4 flex flex-col col-span-12">
            <div><h1>{filteredData[0]?.title} </h1></div>
            <div><img src={filteredData[0]?.img} /></div>
            <div><p>{filteredData[0]?.desc} </p></div>
            <div className="flex flex-col self-center justify-self-center">
                    <div className="grid grid-cols-12">
                      <span className="col-span-11">Raised</span>{" "}
                      <span className="col-span-1">Goal:</span>
                    </div>
                    <div className="h-2 w-full bg-gray-200 rounded">
                      <div
                        style={{
                          width: `${
                            (filteredData[0]?.totalDonations / filteredData[0]?.goal) * 100
                          }%`,
                        }}
                        className="h-2 bg-[#d4ee26] rounded"
                      ></div>
                    </div>
                    <div className="grid grid-cols-12">
                      <span className="col-span-11">${filteredData[0]?.totalDonations}</span>{" "}
                      <span className="col-span-1">${filteredData[0]?.goal}</span>
                    </div>
                   
                  </div>
          </div>
          <div className="flex flex-col content-around lg:col-span-8 col-span-12 gap-2 sm:gap-4 md:gap-10">
            <div className="border border-gray-300 rounded-lg mb-4">
              <button
                onClick={toggleAccordion1}
                className="flex justify-between items-center bg-gray-200 px-4 py-2 w-full"
              >
                <span className="font-medium">Transaction History</span>
                <svg
                  className={`w-4 h-4 transition-transform transform ${
                    isOpen1 ? "rotate-180" : ""
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.707 7.293a1 1 0 010 1.414L3.414 12l3.293 3.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 111.414 1.414zm6 0a1 1 0 010 1.414L9.414 12l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {isOpen1 && (
                <div className="bg-white px-4 py-2">
                  <p></p>
                  <p>{filteredData.map((item)=> {return (<span>{filteredData[0].donations[0].user.uid}</span>)})} </p>
                </div>
              )}
            </div>
            <div className="border border-gray-300 rounded-lg mb-4">
              <button
                onClick={toggleAccordion2}
                className="flex justify-between items-center bg-gray-200 px-4 py-2 w-full"
              >
                <span className="font-medium">Accordion Item 2</span>
                <svg
                  className={`w-4 h-4 transition-transform transform ${
                    isOpen2 ? "rotate-180" : ""
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.707 7.293a1 1 0 010 1.414L3.414 12l3.293 3.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 111.414 1.414zm6 0a1 1 0 010 1.414L9.414 12l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {isOpen2 && (
                <div className="bg-white px-4 py-2">
                  <p>Content for Accordion Item 2</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}

export default MyProject;

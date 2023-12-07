import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import NavBar from "../../components/common/navBar";
import LeftBtn from "../../components/common/leftBtn";

const InfoDetail = () => {
  const location = useLocation();
  const art = location.state?.art; // Accessing the art object from state
  const [wikiSummary, setWikiSummary] = useState('Loading summary...');

  useEffect(() => {
    const fetchWikiSummary = async () => {
      if (art?.title) {
       
        try {
          const response = await axios.get(`https://en.wikipedia.org/w/api.php`, {
            params: {
              action: "query",
              format: "json",
              // titles: searchQuery,
              titles: encodeURIComponent(art.title),
              prop: "extracts",
              exintro: true,
              explaintext: true,
              origin: "*"
            }
          });

          const pages = response.data.query.pages;
          const page = pages[Object.keys(pages)[0]];
          if (page.extract) {
            setWikiSummary(page.extract);
          } else {
            setWikiSummary('Summary not available.');
          }
        } catch (error) {
          console.error("Error fetching Wikipedia summary:", error);
          setWikiSummary('Error fetching summary');
        }
      }
    };
    console.log(encodeURIComponent(art.title));
    fetchWikiSummary();
  }, [art?.title]);


  return (
    <>
      <div className="flex flex-col">
        <NavBar>
          <LeftBtn />
        </NavBar>
        <div className="max-h-[80vh] max-w-full mx-auto flex">
          <img className="object-contain" src={art?.url} alt={art?.name} />
        </div>
        <div className="w-[80%] mb-[10%] mx-auto max-w-[30rem]">
          <div className="mt-2">
            <h2>{art?.title}</h2>
          </div>
          <div className="mt-4">
            <p>{art?.Year}</p>
            <p>{art?.artist}</p>
            <p>{wikiSummary}</p>
          </div>
          {/* Optionally include other art details here */}
        </div>
      </div>
    </>
  );
};

export default InfoDetail;

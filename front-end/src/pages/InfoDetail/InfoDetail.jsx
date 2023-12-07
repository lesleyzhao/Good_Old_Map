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
        const titleQuery = art.artist.replace(/ /g, '_');
        try {
          let response = await axios.get(`https://en.wikipedia.org/w/api.php`, 
          {
            params: {
              action: "query",
              format: "json",
              titles: art.title,
              // titles: encodeURIComponent(art.title),
              prop: "extracts",
              exintro: true,
              explaintext: true,
              origin: "*"
            }
          });
  
          let pages = response.data.query.pages;
          let page = pages[Object.keys(pages)[0]];
          if (page.extract) {
            setWikiSummary(page.extract);
          } else {
            await fetchSummaryByArtist();
          }
        } catch (error) {
          console.error("Error fetching Wikipedia summary:", error);
          setWikiSummary('Error fetching summary');
        }
      }
    };
  
    const fetchSummaryByArtist = async () => {
      if (art?.artist) {
        const artistQuery = art.artist.replace(/ /g, '_');
        try {
          const response = await axios.get(`https://en.wikipedia.org/w/api.php`, 
          {
            params: {
              action: "query",
              format: "json",
              titles:  artistQuery,
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
            setWikiSummary('Cannot Find Page in Wiki');
          }
        } catch (error) {
          console.error("Error fetching Wikipedia summary by artist:", error);
          setWikiSummary('Error fetching summary by artist');
        }
      } else {
        setWikiSummary('Artist information not available.');
      }
    };
  
    console.log(encodeURIComponent(art.title));
    fetchWikiSummary();
  }, [art?.title, art?.artist]);
  

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
            <p>Year Created: {art?.Year}</p>
            <p>Location: {art?.location}</p>
            <p>Artist: {art?.artist}</p><br></br>
            <p>{wikiSummary}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoDetail;

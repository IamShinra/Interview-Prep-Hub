import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from './Loader';
import { toast } from 'react-toastify';

const YouTubePlaylist = ({ playlistId, onBackClick }) => {
  const [videos, setVideos] = useState([]);
  const [pageToken, setPageToken] = useState(null);
  const apiKey = 'AIzaSyBlFr40aLeC5oOnIlp33gled-M9Id73IZc'; // Replace with your API key
  const maxResults = 5;
  const [loding, setLoading] = useState(true);

  const fetchVideos = (token) => {
    setLoading(true);
    let url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=${maxResults}&playlistId=${playlistId}&key=${apiKey}`;
    if (pageToken) {
      url += `&pageToken=${pageToken}`;
    }

    axios
      .get(url)
      .then((response) => {
        const videoList = response.data.items.map((item) => item.snippet);
        if (pageToken == null) setVideos(videoList);
        else setVideos((prevVideos) => [...prevVideos, ...videoList]);
        if (response.data.nextPageToken) {
          setPageToken(response.data.nextPageToken);
        } else {
          setPageToken(null);
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        toast.error('Something went wrong');
        console.error('Error fetching playlist data:', error);
      });
  };

  useEffect(() => {
    fetchVideos(pageToken);
  }, []);

  if(loding) return <h1><Loader /></h1>;

  return (
    <>
      {/* Back Button */}
      <button
        className="w-28 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4 sticky top-5 z-10"
        onClick={() => {
          console.log("Back button clicked");
          onBackClick(); // Call the provided onBackClick function
        }}
      >
        Back
      </button>
      <div className="w-full h-full overflow-y-scroll flex flex-wrap">
        {videos.map((video, i) => (
          <div key={video.resourceId.videoId} className="mb-4 p-4 border w-1/3 flex flex-1">
            <iframe
              className="mt-2"
              width="250"
              height="150"
              src={`https://www.youtube.com/embed/${video.resourceId.videoId}`}
              title={video.title}
              allowFullScreen
            ></iframe>
            <h2 className="text-lg font-semibold ml-2">
              <span className='font-extrabold'>{i + 1}.</span> {video.title}
            </h2>
          </div>
        ))}
      </div>
      {pageToken && (
        <button
          className="bg-blue-500 hover.bg-blue-700 text-white font-bold py-2 px-4 rounded m-4"
          onClick={() => fetchVideos(pageToken)}
        >
          Load More
        </button>
      )}
    </>
  );
};

export default YouTubePlaylist;

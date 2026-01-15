import { useState } from "react";
import Navigation from "../../../component/Navigation";
import YouTubePlaylist from "../../../component/YoutubePlaylist";

const DbmsLearning = () => {
    const [playlist, setPlaylist] = useState([
        {
            channelName: "KnowledgeGATE by Sanchit Sir",
            thumbnail: "/thumbnails/cn.jpg",
            playlistId: 'PLmXKhU9FNesSjFbXSZGF8JF_4LVwwofCd',
        },
        {
            channelName: "Gate Smashers",
            thumbnail: "/thumbnails/cn2.jpg",
            playlistId: 'PLxCzCOWd7aiGFBD2-2joCpWOLUrDLvVV_', // Replace with the actual playlist ID
        },
        {
            channelName: "Neso Academy",
            thumbnail: "/thumbnails/cn3.jpg",
            playlistId: 'PLBlnK6fEyqRgMCUAG0XRw78UA8qnv6jEx', // Replace with the actual playlist ID
        },
        // {
        //     channelName: "Apna College",
        //     thumbnail: "/thumbnails/apnacollege.jpg",
        //     playlistId: 'YOUR_PLAYLIST_ID_4', // Replace with the actual playlist ID
        // },
    ]);

    const [selectedPlaylist, setSelectedPlaylist] = useState(null);

    const handleChannelClick = (playlistId) => {
        setSelectedPlaylist(<YouTubePlaylist playlistId={playlistId} onBackClick={handleBackClick} />);
    }

    const handleBackClick = () => {
        console.log("back clicked");
        setSelectedPlaylist(null);
    }

    return (
        <>
            {selectedPlaylist == null ? <div className="w-full h-screen flex">
                <div className="">
                    <Navigation />
                </div>

                {/* mainBody */}
                <div className='w-full ml-5 mr-10 my-10 overflow-y-scroll no-scrollbar'>
                    <div>
                        <h1 className="text-xl font-bold">Here are some famous playlist</h1>
                        <div className="w-full">
                            {playlist.map((item) => (
                                <div
                                    className="w-full h-40 flex my-5 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => handleChannelClick(item.playlistId)}
                                    key={item.playlistId}
                                >
                                    <div className="w-1/4">
                                        <img
                                            src={item.thumbnail}
                                            alt="this is thumbnail"
                                            className="w-full h-full rounded-3xl"
                                        />
                                    </div>
                                    <div className="w-3/4">
                                        <h1 className="font-semibold ml-3 mt-3 uppercase text-lg font-serif">
                                            {item.channelName}
                                        </h1>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
                : <div>{selectedPlaylist}</div>
            }
        </>
    );
};

export default DbmsLearning;
import { useState } from "react";
import Navigation from "../../../component/Navigation";
import YouTubePlaylist from "../../../component/YoutubePlaylist";

const DeepLearning = () => {
    const [playlist, setPlaylist] = useState([
        {
            channelName: "campusX",
            thumbnail: "/thumbnails/campusxdeep.jpg",
            playlistId: 'PLKnIA16_RmvYuZauWaPlRTC54KxSNLtNn',
        },
        {
            channelName: "codebasics",
            thumbnail: "/thumbnails/codebasics.jpg",
            playlistId: 'PLeo1K3hjS3uu7CxAacxVndI4bE_o3BDtO', // Replace with the actual playlist ID
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

export default DeepLearning;
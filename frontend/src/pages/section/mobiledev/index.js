import { useState } from "react";
import Navigation from "../../../component/Navigation";
import YouTubePlaylist from "../../../component/YoutubePlaylist";

const MobileDevLearning = () => {
    const [playlist, setPlaylist] = useState([
        {
            channelName: "procademy",
            thumbnail: "/thumbnails/procademy.jpg",
            playlistId: 'PL1BztTYDF-QNlGo5-g65Xj1mINHYk_FM9',
        },
        {
            channelName: "Hitesh Choudhary",
            thumbnail: "/thumbnails/hiteshchoudharyreact.jpg",
            playlistId: 'PLRAV69dS1uWSjBBJ-egNNOd4mdblt1P4c', // Replace with the actual playlist ID
        },
        {
            channelName: "Code With Harry",
            thumbnail: "/thumbnails/codewithharryreact.jpg",
            playlistId: 'PLu0W_9lII9agx66oZnT6IyhcMIbUMNMdt', // Replace with the actual playlist ID
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

export default MobileDevLearning;
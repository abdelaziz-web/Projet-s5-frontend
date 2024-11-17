import React, { useState, useEffect } from 'react';
import Hls from 'hls.js'; // Import Hls from hls.js
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

const StreamingPage = () => {
    const [selectedChannel, setSelectedChannel] = useState(
        'https://fe.tring.al/delta/105/out/u/1200_1.m3u8'
    );

    useEffect(() => {
        const videoElement = document.getElementById('video') as HTMLVideoElement;

        let hls: Hls | null = null;

        if (Hls.isSupported()) {
            hls = new Hls();
            hls.loadSource(selectedChannel);
            hls.attachMedia(videoElement);

            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                videoElement.play();
            });
        } else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
            videoElement.src = selectedChannel;
            videoElement.addEventListener('loadedmetadata', () => {
                videoElement.play();
            });
        }

        return () => {
            if (hls) {
                hls.destroy();
            }
        };
    }, [selectedChannel]);

    const channels = [

        { name: 'Sharjah', url: 'https://svs.itworkscdn.net/smc4sportslive/smc4.smil/playlist.m3u8' },
        { name: 'M net sport', url: 'http://ares.mnet.mk/hls/mnet-sport.m3u8' },
        { name: 'Sport italia', url: 'https://sportitaliaamd.akamaized.net/live/Sportitalia/hls/F59D8EB0332E783633CDDE8E265844975635D24F/index.m3u8' },
        { name: 'das erte', url: 'https://mcdn.daserste.de/daserste/de/master.m3u8' },
        { name: 'smr tv', url: 'https://d2hrvno5bw6tg2.cloudfront.net/smrtv-ch02/_definst_/smil:ch-02.smil/chunklist_b1692000_slita.m3u8' },
        { name: 'Dubai Sport 3', url: 'https://dmitwlvvll.cdn.mangomolo.com/dubaisportshd5/smil:dubaisportshd5.smil/index.m3u8'},
        { name: 'Italy', url: 'https://sportitaliaamd.akamaized.net/live/Sportitalia/hls/6197F24C2DDD359567D902082C9347C25BC98852/index.m3u8' },
        { name: 'Rete 8 sport', url: 'https://64b16f23efbee.streamlock.net/rete8sport/rete8sport/playlist.m3u8' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
            <Navbar /> {/* Added Navbar */}

            <section className="max-w-6xl mx-auto px-6 py-16 flex flex-col items-center">
                <h2 className="text-3xl font-bold mb-6 text-white">Live Streaming</h2>
                <select
                    className="bg-gray-800 text-green-400 p-3 rounded-md mb-6"
                    value={selectedChannel}
                    onChange={(e) => setSelectedChannel(e.target.value)}
                >
                    {channels.map((channel, index) => (
                        <option key={index} value={channel.url}>
                            {channel.name}
                        </option>
                    ))}
                </select>

                <div className="relative w-full max-w-3xl">
                    <video
                        id="video"
                        controls
                        autoPlay
                        className="w-full border-4 border-green-400 rounded-md"
                    />
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default StreamingPage;
const pargraph = [
    `CareBuddy is an AI-powered voice calling agent designed to support mental health and emotional well-being especially for the elderly, lonely, or emotionally vulnerable. 
    It initiates regular check-in calls, listens empathetically, detects emotional cues using sentiment analysis, and alerts caregivers if anything seems off.`,
];

const why = [
    { points : "To ensure no one feels unheard or alone." },
    { points : "To empower families and caregivers with early emotional insights." },
    { points : "To combine AI technology with human-centered compassion." },
];

const AboutUs = () => {
    return (
        <section className="max-w-6xl mx-auto">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex justify-center">
                    <h1 className="font-poppins font-medium text-3xl mt-2 mb-6">About Us</h1>
                </div>
                <div className="">
                    <div className="bg-white border border-black/10 rounded-2xl shadow-md p-6 sm:p-10 max-w-4xl mx-auto mb-12">
                        <p className="text-base sm:text-lg text-black/70 text-justify leading-relaxed">
                            {pargraph[0]}
                        </p>
                    </div>
                    <div className="flex flex-col lg:flex-row justify-center items-center gap-10 mb-10 mx-4">
                        <div className="w-full lg:w-1/2 flex justify-center mb-6 lg:mb-0">
                            <img src="./wavingLogo.png" className="max-h-[50%] object-contain" />
                        </div>
                        <div className="w-full lg:w-1/2 flex flex-col justify-center">
                            <h1 className="text-center font-medium text-3xl mb-6">
                                Why We Built Care<span className="text-secondary">Buddy</span>
                            </h1>
                            <div className="border border-black/25 bg-white rounded-xl shadow-xl p-6">
                                <ul className="list-disc text-black/70 text-lg pl-6 space-y-1">
                                    {why.map((item, index) => (
                                        <li key={index}>{item.points}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
"use client"

import Navbar from "./navbar";




const DefaultPage = () => {


    const steps = [
        {
            step: "1",
            title: "Create Posts",
            description: "Create posts with details and images to raise issues."
        },
        {
            step: "2",
            title: "Admin Review",
            description: "Admins review and resolve issues promptly."
        },
        {
            step: "3",
            title: "Track Progress",
            description: "Track updates in real time with progress indicators."
        },
        {
            step: "4",
            title: "View Resolved Issues",
            description: "View resolved issues and celebrate community successes."
        }
    ];


    return (
        <div className="overflow-hidden">

            <Navbar />

            <div className="bg-gray-50 text-gray-800">


                <section className="bg-green-600 text-white py-20 text-center">
                    <h1 className="text-5xl font-bold">Connecting Communities for a Stronger, Kinder Tomorrow</h1>
                    <p className="text-xl mt-4">CareBridge links individuals, communities, and authorities to resolve civic concerns collaboratively.</p>
                    <div className="mt-6">
                        <button className="bg-white text-green-900 px-6 py-3 rounded-lg font-bold mr-4">Get Started</button>
                        <button className="bg-green-700 px-6 py-3 rounded-lg font-bold">Learn More</button>
                    </div>
                </section>


                <section className="py-20 px-10 text-center">
                    <h2 className="text-4xl font-bold">What is CareBridge?</h2>
                    <p className="text-lg mt-4 max-w-3xl mx-auto">
                        A crowdsourced platform that connects individuals, local communities, and authorities to address civic concerns through collaboration, transparency, and accountability.
                    </p>
                </section>


                <section className="py-20 px-10 bg-gray-100">
                    <h2 className="text-4xl font-bold text-center">Why Choose CareBridge?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
                        {[
                            {
                                title: "Post and Report Generation System",
                                description: "Raise issues, tag authorities, and track resolutions in real time.",
                            },
                            {
                                title: "Community-Based System",
                                description: "Collaborate locally for civic improvements.",
                            },
                            {
                                title: "AI Content Filtration and Recommendation",
                                description: "Ensures a safe, relevant experience.",
                            },
                            {
                                title: "One-to-One Chatbot",
                                description: "Seamless communication between users and communities.",
                            },
                        ].map((feature, index) => (
                            <div key={index} className="p-6 bg-white shadow rounded-lg">
                                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                                <p>{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                
                <section className="py-20 px-10">
                    <h2 className="text-4xl font-bold text-center">How CareBridge Works</h2>
                    <div className="mt-10 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                        {steps.map((item, index) => (
                            <div key={index} className="p-6 bg-gray-100 shadow rounded-lg text-center">
                                <div className="text-5xl font-bold text-blue-500 mb-4">{item.step}</div>
                                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                <p>{item.description}</p>
                            </div>
                        ))}
                    </div>
                </section>


                <section className="py-20 bg-green-600 text-white text-center">
                    <h2 className="text-4xl font-bold">Join CareBridge Today</h2>
                    <p className="text-lg mt-4">Be a part of a connected, collaborative community making a difference.</p>
                    <button className="bg-white text-green-900 px-6 py-3 rounded-lg font-bold mt-6">Sign Up Now</button>
                </section>


                <footer className="py-7 bg-gray-800 text-white text-center">
                    <p>&copy; {new Date().getFullYear()} CareBridge. All Rights Reserved.</p>
                </footer>
            </div>




        </div>
    )



}

export default DefaultPage;
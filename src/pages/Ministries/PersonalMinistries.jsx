import React from 'react';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';

export const PersonalMinistries = () => {
  // List of families for Bible study meetings
  const families = [
    "Sentinels Family",
    "Fountain of Life Family",
    "Doves Family",
    "House of Bread Family",
    "Heralds Family",
    "Pillars of Truth Family",
    "Royals Family",
    "House of Bread Family",
    "Peniel Family",
    "Pearls Family ",
    "Goshen Family ",
    "Town Estate Family" // New family added here
  ];

  return (
    <>
      <Header />

      <div className="min-h-screen text-gray-800 bg-gray-100">
        <header className="p-6 text-white bg-blue-900 shadow-md">
          <h1 className="text-4xl font-bold text-center">Personal Ministries</h1>
          <p className="mt-2 text-lg text-center">
            Empowering Every Member to Share the Gospel
          </p>
        </header>

        <main className="p-6 mx-auto space-y-10 max-w-5xl">
          {/* What is Personal Ministries */}
          <section>
            <h2 className="text-2xl font-semibold">What is Personal Ministries?</h2>
            <p className="mt-2">
              Personal Ministries is the heartbeat of the Seventh-day Adventist Church's mission. It empowers every member to
              participate in sharing the gospel, echoing the call of Christ to make disciples of all nations (Matthew 28:19).
              This article explores the purpose, methods, and relevance of Personal Ministries in today's world.
            </p>
          </section>

          {/* Biblical Foundation */}
          <section>
            <h2 className="text-2xl font-semibold">Biblical Foundation</h2>
            <p className="mt-2">
              Personal ministry is a facet of the church whose origin can be traced to the Old Testament times of the patriarchs,
              prophets, judges and kings. In the New Testament it is seen in Christ's example to the early church in Acts all the way to
              the beginning of Seventh-day Adventist® history in the 1860s. Today it has broadened to also incorporate online evangelism.
            </p>
            <p className="mt-2">
              Did you know, it's personal ministries that herald the spreading of the Gospel in the days of the Apostles? It was
              greatly accompanied by the outworking of the Holy Spirit. History will repeat itself in the closing work of the Great
              commission with the outpouring of the Latter rain on the Remnant church of God.
            </p>
          </section>

          {/* Purpose and Vision */}
          <section>
            <h2 className="text-2xl font-semibold">Purpose and Vision</h2>
            <p className="mt-2">
              Personal Ministries endeavors to inspire, motivate, equip, train, and mobilize all members for dynamic Christian service with
              the conviction that "The church of Christ is organized for service" (Ministry of Healing, p. 148) and "Every son and daughter
              of God is called to be a missionary; we are called to the service of God and our fellow men" (The Ministry of Healing,
              p. 395).
            </p>
            <blockquote className="pl-4 my-4 italic border-l-4 border-blue-500">
              Our purpose: "To enlist every member in active soul-winning service for God." — SDA Church Manual
            </blockquote>
            <blockquote className="pl-4 my-4 italic border-l-4 border-blue-500">
              "Christ's method alone will give true success in reaching the people. The Savior mingled
              with people as one who desired their good. He showed sympathy for them, ministered to their
              needs, and won their confidence. Then He invited them, 'Follow Me.'" — The Ministry of Healing, p.73
            </blockquote>
            <p className="mt-2">
              "We need to come close to the people by personal effort. If we would give less time to sermonizing and more time to
              personal ministry, greater results would be seen. The poor are to be relieved, the sick cared for, the sorrowing and the
              bereaved comforted, the ignorant instructed, the inexperienced counseled. We are to weep with those who weep and to rejoice
              with those who rejoice. Accompanied by the power of persuasion, the power of prayer, the power of the love of God, this work
              will not, cannot, be without fruit." — The Ministry of Healing, p.73
            </p>
          </section>

          {/* Family Bible Study Meetings */}
          <section>
            <h2 className="text-2xl font-semibold">Family Bible Study Meetings</h2>
            <p className="mt-2">
              We regularly hold family meetings for Bible study and fellowship at the following families:
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
              {families.map((family, index) => (
                <div 
                  key={index} 
                  className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex items-center">
                    <div className="flex-shrink-0 mr-3 text-blue-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-800">{family}</h3>
                  </div>
                </div>
              ))}
            </div>
            
            <p className="mt-6 text-gray-600 italic">
              "For where two or three gather in my name, there am I with them." — Matthew 18:20
            </p>
          </section>

          {/* Conclusion */}
          <section>
            <h2 className="text-2xl font-semibold">Conclusion</h2>
            <blockquote className="pl-4 italic border-l-4 border-green-600">
              "Every true disciple is born into the kingdom of God as a missionary." — The Desire of Ages, p. 195
            </blockquote>
          </section>
        </main>
      </div>

      <Footer />
    </>
  );
};

export default PersonalMinistries;
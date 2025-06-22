
const PersonalMinistriesPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <header className="bg-blue-900 text-white p-6 shadow-md">
        <h1 className="text-4xl font-bold text-center">Personal Ministries</h1>
        <p className="text-center text-lg mt-2">
          Empowering Every Member to Share the Gospel
        </p>
      </header>

      <main className="max-w-5xl mx-auto p-6 space-y-10">
                <section>
          <h2 className="text-2xl font-semibold">What is Personal Ministries?</h2>
          <p className="mt-2">
            Personal Ministries is the heartbeat of the Seventh-day Adventist Church’s mission. It empowers every member to
            participate in sharing the gospel, echoing the call of Christ to make disciples of all nations (Matthew 28:19).
            This article explores the purpose, methods, and relevance of Personal Ministries in today’s world.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">Biblical Foundation</h2>
          <p className="mt-2">
            Personal ministry is a facet of the church whose origin can be traced to the Old Testament times of the patriarchs,
            prophets, judges and kings. In the New Testament it is seen in Christ's example to the early church in Acts all the way to
            the beginning of Seventh-day Adventist® history in the 1860s. Today it has broadened to also incorporate online evangelism.
          </p>
          <p className="mt-2">
            Did you know, it’s personal ministries that herald the spreading of the Gospel in the days of the Apostles? It was
            greatly accompanied by the outworking of the Holy Spirit. History will repeat itself in the closing work of the Great
            commission with the outpouring of the Latter rain on the Remnant church of God.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">Purpose and Vision</h2>
          <p className="mt-2">
            Personal Ministries endeavors to inspire, motivate, equip, train, and mobilize all members for dynamic Christian service with
            the conviction that “The church of Christ is organized for service” (Ministry of Healing, p. 148) and “Every son and daughter
            of God is called to be a missionary; we are called to the service of God and our fellow men” (The Ministry of Healing,
            p. 395).
          </p>
          <blockquote className="border-l-4 border-blue-500 pl-4 italic my-4">
            Our purpose: “To enlist every member in active soul-winning service for God.” — SDA Church Manual
          </blockquote>
          <blockquote className="border-l-4 border-blue-500 pl-4 italic my-4">
            "Christ’s method alone will give true success in reaching the people. The Savior mingled
            with people as one who desired their good. He showed sympathy for them, ministered to their
            needs, and won their confidence. Then He invited them, “Follow Me.”" — The Ministry of Healing, p.73
          </blockquote>
          <p className="mt-2">
            “We need to come close to the people by personal effort. If we would give less time to sermonizing and more time to
            personal ministry, greater results would be seen. The poor are to be relieved, the sick cared for, the sorrowing and the
            bereaved comforted, the ignorant instructed, the inexperienced counseled. We are to weep with those who weep and to rejoice
            with those who rejoice. Accompanied by the power of persuasion, the power of prayer, the power of the love of God, this work
            will not, cannot, be without fruit.” — The Ministry of Healing, p.73
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">Conclusion</h2>
          <blockquote className="border-l-4 border-green-600 pl-4 italic">
            “Every true disciple is born into the kingdom of God as a missionary.” — The Desire of Ages, p. 195
          </blockquote>
        </section>
      </main>

      <footer className="bg-blue-900 text-white p-4 text-center mt-10">
        <p>&copy; {new Date().getFullYear()} Seventh-day Adventist Church - Personal Ministries</p>
      </footer>
    </div>
  );
};

export default PersonalMinistriesPage;

import React from 'react';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';

const Evangelism = () => {
  return (
    <>
      <Header />

      <main className="bg-white text-gray-800 dark:text-gray-200 font-sans px-6 py-10">
        <section className="max-w-5xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-md px-6 py-10">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 dark:text-white mb-6">
            Evangelism Department Message
          </h2>

          <div className="flex justify-center mb-6">
            <img
              src="/images/evangelism-team.png"
              alt="Evangelism Team"
              className="w-72 rounded-xl shadow-md"
            />
          </div>

          <div className="text-lg text-gray-700 dark:text-gray-300 space-y-6">
            <p>
              The Evangelism Department stands as a cornerstone of DeKUSDA Church, rooted deeply in both scripture and mission.
              Its origins are inspired by one of the most defining moments in the ministry of Jesus Christ — His walk along the shores of the Sea of Galilee.
              It was there that He paused to engage in a life-changing conversation with His disciples, commissioning them with a calling that would evolve into what we now know as The Great Commission.
            </p>

            <p>
              His words on that fateful day have continued to echo in our hearts, inspiring us to rise above our trials and giving us hope in times when we might otherwise sink into despair and hopelessness.
            </p>

            <h3 className="text-xl font-semibold text-black dark:text-white">
              What We Do as a Department
            </h3>
            <p>
              Scripture likens the Church to a body, with each part serving a unique function.
              Within this spiritual framework, the Evangelism Department embraces its sacred role with unwavering dedication.
            </p>
            <p>
              Our primary mission, as entrusted to us by Christ, is to
              <span className="italic text-blue-700 dark:text-blue-400"> “Go therefore and make disciples of all nations, baptizing them in the name of the Father, and of the Son, and of the Holy Spirit.”</span> (Matthew 28:19)
            </p>

            <p>
              To fulfill this calling, we engage in multiple initiatives. Chief among them are weekly Bible study sessions designed not only to impart biblical knowledge but to cultivate a deep, personal relationship with Jesus Christ.
              Our goal is not merely to inform minds, but to transform hearts.
            </p>

            <p>
              By God’s grace, this mission has borne much fruit as we have witnessed many members grow in faith,
              some even reaching the point of being baptized into the family of God.
            </p>

            <h3 className="text-xl font-semibold text-black dark:text-white">
              Our Outreach Efforts
            </h3>
            <p>
              As a department, we also organize annual mission trips with the goal of reaching individuals beyond the walls of our university.
              These missions have taken us to different parts of the country, and the impact has been monumental.
            </p>

            <p>
              We have seen many people surrender their lives to Christ after hearing the powerful message of the gospel.
              This work has played a crucial role in preparing a people for the soon return of Christ.
            </p>

            <blockquote className="italic text-green-700 dark:text-green-400 border-l-4 pl-4 border-green-500">
              “If we in our own strength confide, our striving would be losing.” – Martin Luther
            </blockquote>

            <p>
              We echo this truth as a department: the success of our evangelistic campaigns is not the result of our own strength, intellect, or financial resources — it is entirely due to the faithfulness of our God.
            </p>

            <p>
              And as He has promised to be with us to the end of the age, we move forward with confidence,
              knowing we have nothing to fear for the future.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Evangelism;

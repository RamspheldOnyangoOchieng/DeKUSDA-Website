import React from 'react';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';

const Evangelism = () => {
  return (
    <>
      <Header />

      {/* Full-width header background */}
      <section className="w-full bg-blue-900 text-white py-10">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-2">Evangelism Department</h2>
          <p className="text-lg italic text-blue-100">
            "Go therefore and make disciples of all nations..." — Matthew 28:19
          </p>
        </div>
      </section>

      {/* Main body */}
      <main className="bg-gray-100 text-gray-800 font-sans px-6 py-12">
        <section className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg px-8 py-10">
          <h3 className="text-2xl md:text-3xl font-bold text-blue-800 mb-6 text-center">
            Evangelism Department Message
          </h3>

          <div className="space-y-6 text-lg leading-relaxed">
            <p>
              The Evangelism Department stands as a cornerstone of DeKUSDA Church, rooted deeply in both scripture and mission.
              Its origins are inspired by one of the most defining moments in the ministry of Jesus Christ — His walk along the shores of the Sea of Galilee.
              It was there that He paused to engage in a life-changing conversation with His disciples, commissioning them with a calling that would evolve into what we now know as The Great Commission.
            </p>

            <p>
              His words on that fateful day have continued to echo in our hearts, inspiring us to rise above our trials and giving us hope in times when we might otherwise sink into despair and hopelessness.
            </p>

            <h4 className="text-xl font-semibold text-blue-700">What We Do as a Department</h4>
            <p>
              Scripture likens the Church to a body, with each part serving a unique function.
              Within this spiritual framework, the Evangelism Department embraces its sacred role with unwavering dedication.
            </p>
            <p>
              Our primary mission, as entrusted to us by Christ, is to
              <span className="italic text-blue-700"> “Go therefore and make disciples of all nations, baptizing them in the name of the Father, and of the Son, and of the Holy Spirit.”</span> (Matthew 28:19)
            </p>
            <p>
              To fulfill this calling, we engage in multiple initiatives. Chief among them are weekly Bible study sessions designed not only to impart biblical knowledge but to cultivate a deep, personal relationship with Jesus Christ.
              Our goal is not merely to inform minds, but to transform hearts.
            </p>
            <p>
              By God’s grace, this mission has borne much fruit as we have witnessed many members grow in faith,
              some even reaching the point of being baptized into the family of God.
            </p>

            <h4 className="text-xl font-semibold text-blue-700">Our Outreach Efforts</h4>
            <p>
              As a department, we also organize annual mission trips with the goal of reaching individuals beyond the walls of our university.
              These missions have taken us to different parts of the country, and the impact has been monumental.
            </p>
            <p>
              We have seen many people surrender their lives to Christ after hearing the powerful message of the gospel.
              This work has played a crucial role in preparing a people for the soon return of Christ.
            </p>

            <blockquote className="italic text-green-700 border-l-4 pl-4 border-green-500 bg-green-50 py-2 px-4 rounded-md">
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

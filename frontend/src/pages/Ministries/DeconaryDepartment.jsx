import React from 'react';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';

export const DeconaryDepartment = () => {
  // List of deacons and deaconesses roles and responsibilities
  const responsibilities = [
    "Assisting in communion services and baptisms",
    "Maintaining church order during worship",
    "Visiting and caring for church members",
    "Supporting pastoral care and ministry",
    "Preparing and serving Holy Communion",
    "Helping with church maintenance and upkeep",
    "Assisting in financial stewardship",
    "Supporting evangelistic activities"
  ];

  const qualifications = [
    "Must be a baptized member in good standing",
    "Demonstrate spiritual maturity and leadership",
    "Show commitment to church attendance and participation",
    "Exhibit a servant's heart and willingness to serve",
    "Maintain high moral and ethical standards",
    "Be approved by church board and congregation",
    "Complete deacon/deaconess training program",
    "Show faithfulness in tithe and offerings"
  ];

  return (
    <>
      <Header />

      <div className="min-h-screen text-gray-800 bg-gray-100">
        <header className="p-6 text-white bg-blue-900 shadow-md">
          <h1 className="text-4xl font-bold text-center">Deconary Department</h1>
          <p className="mt-2 text-lg text-center">
            Serving God Through Service to His People
          </p>
        </header>

        <main className="p-6 mx-auto space-y-10 max-w-5xl">
          {/* What is the Deconary Department */}
          <section>
            <h2 className="text-2xl font-semibold">What is the Deconary Department?</h2>
            <p className="mt-2">
              The Deconary Department consists of ordained deacons and deaconesses who serve as spiritual leaders 
              and assistants in the local church. They work closely with the pastor and church board to ensure 
              smooth church operations and provide spiritual care to members. The word "deacon" comes from the 
              Greek word "diakonos," meaning "servant" or "minister."
            </p>
          </section>

          {/* Biblical Foundation */}
          <section>
            <h2 className="text-2xl font-semibold">Biblical Foundation</h2>
            <p className="mt-2">
              The office of deacon was established in the early Christian church as recorded in Acts 6:1-7, 
              when seven men were chosen to serve tables and care for the practical needs of the church. 
              The apostle Paul further outlines the qualifications for deacons in 1 Timothy 3:8-13, 
              emphasizing their role as servants who must be "worthy of respect, sincere, not indulging 
              in much wine, and not pursuing dishonest gain."
            </p>
            <blockquote className="p-4 mt-4 italic border-l-4 border-blue-500 bg-gray-50">
              "In the same way, deacons are to be worthy of respect, sincere, not indulging in much wine, 
              and not pursuing dishonest gain. They must keep hold of the deep truths of the faith with 
              a clear conscience." - 1 Timothy 3:8-9 (NIV)
            </blockquote>
          </section>

          {/* Roles and Responsibilities */}
          <section>
            <h2 className="text-2xl font-semibold">Roles and Responsibilities</h2>
            <p className="mt-2">
              Deacons and deaconesses serve in various capacities to support the spiritual and practical 
              needs of the church. Their responsibilities include:
            </p>
            <ul className="grid gap-3 mt-4 md:grid-cols-2">
              {responsibilities.map((responsibility, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="flex-shrink-0 w-2 h-2 mt-2 bg-blue-500 rounded-full"></span>
                  <span>{responsibility}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Qualifications */}
          <section>
            <h2 className="text-2xl font-semibold">Qualifications for Service</h2>
            <p className="mt-2">
              Those called to serve as deacons or deaconesses must meet certain spiritual and practical 
              qualifications as outlined in Scripture and church policy:
            </p>
            <ul className="grid gap-3 mt-4 md:grid-cols-2">
              {qualifications.map((qualification, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="flex-shrink-0 w-2 h-2 mt-2 bg-green-500 rounded-full"></span>
                  <span>{qualification}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Training and Development */}
          <section>
            <h2 className="text-2xl font-semibold">Training and Development</h2>
            <p className="mt-2">
              Our Deconary Department provides ongoing training and development opportunities for current 
              and prospective deacons and deaconesses. This includes:
            </p>
            <div className="grid gap-6 mt-4 md:grid-cols-2">
              <div className="p-4 bg-white rounded-lg shadow">
                <h3 className="font-semibold text-blue-900">Initial Training</h3>
                <p className="mt-2 text-sm">
                  Comprehensive orientation covering biblical foundations, church policies, 
                  and practical ministry skills.
                </p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow">
                <h3 className="font-semibold text-blue-900">Ongoing Education</h3>
                <p className="mt-2 text-sm">
                  Regular workshops and seminars on pastoral care, counseling, 
                  and leadership development.
                </p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow">
                <h3 className="font-semibold text-blue-900">Mentorship Program</h3>
                <p className="mt-2 text-sm">
                  Pairing new deacons/deaconesses with experienced servants 
                  for guidance and support.
                </p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow">
                <h3 className="font-semibold text-blue-900">Spiritual Retreats</h3>
                <p className="mt-2 text-sm">
                  Annual retreats focused on spiritual growth, team building, 
                  and ministry effectiveness.
                </p>
              </div>
            </div>
          </section>

          {/* Meet Our Team */}
          <section>
            <h2 className="text-2xl font-semibold">Meet Our Deconary Team</h2>
            <p className="mt-2">
              Our dedicated team of deacons and deaconesses serves with passion and commitment 
              to support our church family at Dedan Kimathi University SDA Church.
            </p>
            <div className="p-6 mt-4 text-center bg-white rounded-lg shadow">
              <h3 className="text-lg font-semibold text-blue-900">Currently Serving</h3>
              <p className="mt-2 text-gray-600">
                We have a dedicated team of ordained deacons and deaconesses serving our 
                university church community. For specific information about our current 
                leadership team, please contact the church office.
              </p>
            </div>
          </section>

          {/* How to Get Involved */}
          <section>
            <h2 className="text-2xl font-semibold">How to Get Involved</h2>
            <p className="mt-2">
              If you feel called to serve in the Deconary Department, we encourage you to:
            </p>
            <div className="grid gap-4 mt-4 md:grid-cols-3">
              <div className="p-4 text-center bg-white rounded-lg shadow">
                <div className="w-12 h-12 mx-auto mb-2 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-xl text-blue-600">1</span>
                </div>
                <h3 className="font-semibold">Pray</h3>
                <p className="mt-2 text-sm">
                  Seek God's guidance through prayer and Bible study
                </p>
              </div>
              <div className="p-4 text-center bg-white rounded-lg shadow">
                <div className="w-12 h-12 mx-auto mb-2 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-xl text-blue-600">2</span>
                </div>
                <h3 className="font-semibold">Connect</h3>
                <p className="mt-2 text-sm">
                  Speak with our pastor or current deacon/deaconess
                </p>
              </div>
              <div className="p-4 text-center bg-white rounded-lg shadow">
                <div className="w-12 h-12 mx-auto mb-2 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-xl text-blue-600">3</span>
                </div>
                <h3 className="font-semibold">Serve</h3>
                <p className="mt-2 text-sm">
                  Begin serving in various church ministries and activities
                </p>
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section className="p-6 text-center text-white bg-blue-900 rounded-lg">
            <h2 className="text-2xl font-semibold">Contact the Deconary Department</h2>
            <p className="mt-2">
              For more information about serving in the Deconary Department or to request assistance 
              from our deacons and deaconesses, please contact us.
            </p>
            <div className="flex flex-col gap-4 mt-6 sm:flex-row sm:justify-center">
              <button className="px-6 py-2 bg-white text-blue-900 rounded hover:bg-gray-100 transition">
                Contact Church Office
              </button>
              <button className="px-6 py-2 border border-white text-white rounded hover:bg-white hover:text-blue-900 transition">
                Schedule Meeting
              </button>
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </>
  );
};

export default DeconaryDepartment;

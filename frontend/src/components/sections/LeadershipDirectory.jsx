import React, { useState } from 'react';
import { 
  FaPhone, FaEnvelope, FaLinkedin, FaFacebook, 
  FaGraduationCap, FaCalendarAlt, FaQuoteLeft,
  FaChevronDown, FaChevronUp
} from 'react-icons/fa';

const LeadershipDirectory = () => {
  const [expandedBio, setExpandedBio] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const leadership = [
    {
      name: "Pastor Frank Ampofo",
      title: "Senior Pastor",
      image: "/src/assets/pastor-frank.png",
      category: "pastoral",
      phone: "+254 700 123 456",
      email: "pastor.frank@dekusda.org",
      linkedin: "frank-ampofo",
      facebook: "pastor.frank.ampofo",
      education: "Master of Divinity, University of Eastern Africa",
      yearsOfService: "15 years in ministry",
      specialties: ["Biblical Preaching", "Pastoral Care", "Church Administration", "Evangelism"],
      quote: "My passion is to see every member of our university church family grow in their relationship with Christ and discover their unique purpose in God's kingdom.",
      bio: "Pastor Frank Ampofo has been faithfully serving the DeKUSDA church family for over 8 years. With a heart for evangelism and discipleship, he has led numerous outreach programs and has seen tremendous growth in our congregation. Before joining DeKUSDA, Pastor Frank served in various pastoral roles across Kenya and has a deep passion for youth ministry and university student outreach.",
      achievements: ["Led 12 evangelistic campaigns", "Established 3 new church plants", "Authored 'Walking in Faith' devotional series"],
      languages: ["English", "Kiswahili", "French"]
    },
    {
      name: "Elder Patricia Wilson",
      title: "Church Elder & Sabbath School Superintendent",
      image: "/src/assets/elder.jpg",
      category: "elders",
      phone: "+254 700 987 654",
      email: "patricia.wilson@dekusda.org",
      education: "Bachelor of Education, Kenyatta University",
      yearsOfService: "22 years in church leadership",
      specialties: ["Bible Study", "Christian Education", "Women's Ministry", "Prayer Ministry"],
      quote: "God's word is our foundation. Through dedicated study and prayer, we can face any challenge with faith and hope.",
      bio: "Elder Patricia Wilson has been a cornerstone of our church for over two decades. Her dedication to Christian education and deep knowledge of Scripture has blessed countless members through her Sabbath School leadership. She coordinates our church's educational programs and has been instrumental in our spiritual growth initiatives.",
      achievements: ["Developed church-wide Bible study curriculum", "Led 15 years of Sabbath School growth", "Coordinated multiple women's retreats"],
      languages: ["English", "Twi"]
    },
    {
      name: "James Mitchell",
      title: "Church Elder & Prayer Ministry Leader",
      image: "/src/assets/elder.jpg",
      category: "elders",
      phone: "+254 700 567 890",
      email: "james.mitchell@dekusda.org",
      education: "Business Administration, University of Nairobi",
      yearsOfService: "18 years in church leadership",
      specialties: ["Prayer Ministry", "Church Finance", "Facility Management", "Community Outreach"],
      quote: "Prayer is the breath of the soul. Through constant communion with God, we find strength for every challenge.",
      bio: "Elder James Mitchell brings both spiritual wisdom and practical business acumen to our church leadership. He has overseen several major facility improvements and established our prayer ministry program that has become a beacon of hope for our community.",
      achievements: ["Established 24/7 prayer chain", "Led facility expansion project", "Coordinated disaster relief efforts"],
      languages: ["English", "Twi"]
    },
    {
      name: "Sarah Osei",
      title: "Youth Ministry Director",
      image: "/src/assets/elder.jpg",
      category: "ministry",
      phone: "+233 24 345 6789",
      email: "sarah.osei@dekusda.org",
      education: "Psychology & Counseling, University of Cape Coast",
      yearsOfService: "8 years in youth ministry",
      specialties: ["Youth Development", "Counseling", "Event Planning", "Mentorship Programs"],
      quote: "Every young person has incredible potential. Our job is to help them discover their gifts and use them for God's glory.",
      bio: "Sarah Osei has transformed our youth ministry into one of the most vibrant programs in our region. Her background in psychology combined with her passion for young people has created a safe space where youth can grow spiritually and personally.",
      achievements: ["Grew youth membership by 300%", "Organized 5 successful youth camps", "Established peer counseling program"],
      languages: ["English", "Twi", "Ewe"]
    },
    {
      name: "Emmanuel Asante",
      title: "Music Ministry Director",
      image: "/src/assets/elder.jpg",
      category: "ministry",
      phone: "+233 24 456 7890",
      email: "emmanuel.asante@dekusda.org",
      education: "Music Education, University of Education, Winneba",
      yearsOfService: "12 years in music ministry",
      specialties: ["Choir Direction", "Music Education", "Worship Leading", "Musical Arrangement"],
      quote: "Music is the language of the soul. Through song and praise, we connect with God in a profound and beautiful way.",
      bio: "Emmanuel Asante has elevated our worship experience through his exceptional musical leadership. Under his direction, our church now has three thriving choirs and a contemporary worship team that leads our congregation in heartfelt praise.",
      achievements: ["Directed 3 award-winning choirs", "Composed 12 original hymns", "Trained 50+ church musicians"],
      languages: ["English", "Twi"]
    },
    {
      name: "Rebecca Mensah",
      title: "Children's Ministry Coordinator",
      image: "/src/assets/elder.jpg",
      category: "ministry",
      phone: "+233 24 234 5678",
      email: "rebecca.mensah@dekusda.org",
      education: "Early Childhood Education, Presbyterian College",
      yearsOfService: "10 years in children's ministry",
      specialties: ["Child Development", "Biblical Storytelling", "Creative Arts", "Parent Education"],
      quote: "Children are a gift from God. Nurturing their faith from an early age builds a foundation that will last a lifetime.",
      bio: "Rebecca Mensah has created an engaging and educational environment for our youngest members. Her creative approach to Bible teaching and child development expertise ensures our children not only have fun but also develop a genuine love for Jesus.",
      achievements: ["Developed award-winning children's curriculum", "Organized 8 successful VBS programs", "Trained 25+ children's teachers"],
      languages: ["English", "Twi"]
    },
    {
      name: "David Amoah",
      title: "Deacon & Community Outreach Leader",
      image: "/src/assets/elder.jpg",
      category: "deacons",
      phone: "+233 24 678 9012",
      email: "david.amoah@dekusda.org",
      education: "Social Work, University of Ghana",
      yearsOfService: "14 years of service",
      specialties: ["Community Service", "Social Programs", "Disaster Relief", "Homeless Ministry"],
      quote: "Faith without works is dead. We show Christ's love by serving those in need in our community.",
      bio: "Deacon David Amoah has spearheaded numerous community outreach initiatives that have made a significant impact in our local area. His background in social work and heart for service has established our church as a pillar of support in the community.",
      achievements: ["Fed 1000+ families during COVID-19", "Established scholarship fund", "Coordinated 20+ community service projects"],
      languages: ["English", "Twi", "Ga"]
    },
    {
      name: "Grace Owusu",
      title: "Deaconess & Women's Ministry Leader",
      image: "/src/assets/elder.jpg",
      category: "deacons",
      phone: "+233 24 789 0123",
      email: "grace.owusu@dekusda.org",
      education: "Nursing, Kwame Nkrumah University",
      yearsOfService: "16 years of service",
      specialties: ["Health Ministry", "Women's Programs", "Pastoral Care", "Medical Missions"],
      quote: "Women have a unique role in building strong families and communities. Together, we can make a lasting difference.",
      bio: "Deaconess Grace Owusu combines her nursing expertise with her passion for ministry to lead our health and women's programs. Her compassionate care and medical knowledge have been invaluable in our community health initiatives.",
      achievements: ["Organized 25+ health screenings", "Led 8 women's retreats", "Trained health ministry volunteers"],
      languages: ["English", "Twi"]
    }
  ];

  const categories = [
    { key: 'all', label: 'All Leadership', count: leadership.length },
    { key: 'pastoral', label: 'Pastoral Staff', count: leadership.filter(l => l.category === 'pastoral').length },
    { key: 'elders', label: 'Church Elders', count: leadership.filter(l => l.category === 'elders').length },
    { key: 'ministry', label: 'Ministry Directors', count: leadership.filter(l => l.category === 'ministry').length },
    { key: 'deacons', label: 'Deacons & Deaconesses', count: leadership.filter(l => l.category === 'deacons').length }
  ];

  const filteredLeadership = activeCategory === 'all' 
    ? leadership 
    : leadership.filter(leader => leader.category === activeCategory);

  const toggleBio = (index) => {
    setExpandedBio(expandedBio === index ? null : index);
  };

  return (
    <div className="w-full bg-gradient-to-b from-gray-50 to-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Church Leadership & Staff
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Meet the dedicated leaders who guide our church family with wisdom, love, and commitment 
            to serving God and our community.
          </p>
          <div className="mt-6 h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => setActiveCategory(category.key)}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                activeCategory === category.key
                  ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                  : 'bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600 shadow-md'
              }`}
            >
              {category.label} ({category.count})
            </button>
          ))}
        </div>

        {/* Leadership Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {filteredLeadership.map((leader, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
              {/* Leader Header */}
              <div className="p-8 border-b border-gray-100">
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <img
                      src={leader.image}
                      alt={leader.name}
                      className="w-24 h-24 rounded-full object-cover border-4 border-blue-100"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">{leader.name}</h3>
                    <p className="text-blue-600 font-medium mb-3">{leader.title}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {leader.specialties.slice(0, 3).map((specialty, idx) => (
                        <span key={idx} className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
                          {specialty}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center space-x-4 text-gray-600 text-sm">
                      <div className="flex items-center space-x-1">
                        <FaGraduationCap className="text-blue-500" />
                        <span>{leader.yearsOfService}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FaCalendarAlt className="text-blue-500" />
                        <span>{leader.languages.join(', ')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Leader Quote */}
              <div className="px-8 py-6 bg-blue-50">
                <div className="flex items-start space-x-3">
                  <FaQuoteLeft className="text-blue-400 text-lg flex-shrink-0 mt-1" />
                  <p className="text-gray-700 italic leading-relaxed">{leader.quote}</p>
                </div>
              </div>

              {/* Leader Details */}
              <div className="p-8">
                {/* Contact Information */}
                <div className="flex flex-wrap gap-4 mb-6">
                  <a 
                    href={`tel:${leader.phone}`}
                    className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <FaPhone className="text-blue-500" />
                    <span className="text-sm">{leader.phone}</span>
                  </a>
                  <a 
                    href={`mailto:${leader.email}`}
                    className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <FaEnvelope className="text-blue-500" />
                    <span className="text-sm">{leader.email}</span>
                  </a>
                  {leader.linkedin && (
                    <a 
                      href={`https://linkedin.com/in/${leader.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      <FaLinkedin className="text-blue-500" />
                      <span className="text-sm">LinkedIn</span>
                    </a>
                  )}
                  {leader.facebook && (
                    <a 
                      href={`https://facebook.com/${leader.facebook}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      <FaFacebook className="text-blue-500" />
                      <span className="text-sm">Facebook</span>
                    </a>
                  )}
                </div>

                {/* Education & Experience */}
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Education</h4>
                    <p className="text-gray-600 text-sm">{leader.education}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Experience</h4>
                    <p className="text-gray-600 text-sm">{leader.yearsOfService}</p>
                  </div>
                </div>

                {/* Specialties */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-3">Areas of Ministry</h4>
                  <div className="flex flex-wrap gap-2">
                    {leader.specialties.map((specialty, idx) => (
                      <span key={idx} className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Expandable Bio */}
                <div>
                  <button
                    onClick={() => toggleBio(index)}
                    className="flex items-center justify-between w-full text-left font-semibold text-gray-800 mb-3 hover:text-blue-600 transition-colors"
                  >
                    <span>Biography & Achievements</span>
                    {expandedBio === index ? <FaChevronUp /> : <FaChevronDown />}
                  </button>
                  
                  {expandedBio === index && (
                    <div className="space-y-4 text-gray-600 text-sm">
                      <p className="leading-relaxed">{leader.bio}</p>
                      
                      <div>
                        <h5 className="font-semibold text-gray-800 mb-2">Key Achievements</h5>
                        <ul className="list-disc list-inside space-y-1">
                          {leader.achievements.map((achievement, idx) => (
                            <li key={idx}>{achievement}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Leadership CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Connect with Our Leadership</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Our church leaders are here to serve, guide, and support you on your spiritual journey. 
            Don't hesitate to reach out for prayer, counseling, or spiritual guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Request Prayer
            </button>
            <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Schedule Meeting
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadershipDirectory;

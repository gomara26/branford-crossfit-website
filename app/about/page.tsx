"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function About() {
  const coaches = [
    {
      name: "CRAIG KENNEY",
      role: "Owner & Head Coach",
      bio: [
        "Since I can remember hearing stories of Deke's gym from my Dad and Godfather it has always been a dream of mine to open my own gym.",
        "While I began competing in CrossFit I was also working a \"steady career path job\" for the state, which I thought was the right move. Climb the ranks, get a pension. Soon, I was presented with an opportunity by a great friend and mentor Jim Lapia. I decided to follow my passion.",
        "I couldn't be more proud of our members, staff, and product at Branford CrossFit. The community we have, the comradeship within our gym is unmatched and is a joy to be around."
      ],
      certifications: [
        "CrossFit Level 2",
        "Kettlebell Trainer",
        "NASM Certified Personal Trainer"
      ],
      achievements: [
        "CrossFit Games 14',18',19',22',24'",
        "Northeastern University Football Captain 08',09'"
      ],
      image: "/images/craig.jpg"
    },
    {
      name: "AJ ALESSI",
      role: "Owner & Head Coach",
      bio: [
        "AJ grew up playing sports at Branford High School and continued to play four years of lacrosse at Quinnipiac University. It was there where he discovered his passion for strength and conditioning and working hard. Upon graduation he began a career as a teacher while coaching lacrosse and CrossFit.",
        "After coaching at Branford CrossFit for four years he took over as full-time owner in 2016. He continues to be the head lacrosse coach at Notre Dame of West Haven and is the Director of CT Blazers Lacrosse Club. At NDWH, his teams have qualified for the state semi-finals five times and he's been recognized multiple times for his coaching excellence.",
        "BCF has become a second family to me. I look forward to coming into the gym every day and helping people of all abilities reach their fitness goals. Working out beside our community in class is motivating and pushes me to work harder than I ever have before."
      ],
      certifications: [
        "CrossFit Level 1",
        "USA Weightlifting Certification"
      ],
      achievements: [
        "CHSCA Coach of the Year",
        "New Haven Register Coach of the Year (4x)",
        "Tom Marcucci Coach of the Year",
        "NDWH State Semi-Finals (5x)",
        "Director of CT Blazers Lacrosse Club"
      ],
      image: "/images/aj.jpg"
    },
    {
      name: "HAJROLDA \"HAJ\" BELL",
      role: "Coach",
      bio: [
        "I started CrossFit in January of 2013 & never looked back! It didn't take long for me to further my passion in the sport of fitness & obtain my L1 certification where I began coaching shortly after.",
        "I have always strived to do my very best both as an athlete & coach & give 100% in whatever it is I do. From competing in local & regional competitions to training through pregnancy & postpartum, expanding my knowledge and experience in the sport in any way that I can is my main goal!",
        "My passion for this sport remains eminent & I am always looking for ways to improve as an athlete and coach not only for myself but for our members & the community.",
        "Most importantly, fitness and health hold significant value in our home as well. I met my husband at CrossFit back in 2013. While much has changed since then, the one thing that has remained constant is our commitment to living a fit and healthy lifestyle both in and outside the gym. We are SO excited to raise our daughter, Charlotte, on that same path!"
      ],
      certifications: [
        "CrossFit Level 1"
      ],
      achievements: [
        "Local & Regional Competition Experience",
        "Pre/Post-natal Training Specialist"
      ],
      image: "/images/haj.jpg"
    },
    {
      name: "DIANE STONE",
      role: "Coach",
      bio: [
        "I started CrossFit in September 2012. In July of 2013 I received my CFL-1 certificate and started coaching. Over the past 6 years I have enjoyed coaching and CrossFit competitions. In 2017 I finished the Open in 17th place and the AGOQ in 23rd worldwide. I have qualified 4 times to compete at the Granite Games, finishing the 2018 event in 1st place.",
        "I was born raised in Atlanta, GA. After graduating high school I moved to Aspen, CO where I met my husband, Charlie. We have 2 children, Hannah and Berkley. I love to ski, surf and spend time with the kids."
      ],
      certifications: [
        "CrossFit Level 2",
        "CrossFit Weightlifting",
        "CrossFit Gymnastics",
        "AFAA Personal Trainer",
        "Level III Professional Ski Instructor of America",
        "Reebok Indoor Cycling Instructor",
        "CPR Certified"
      ],
      achievements: [
        "2017 CrossFit Open - 17th Place",
        "2017 AGOQ - 23rd Worldwide",
        "Granite Games Champion 2018",
        "Granite Games Qualifier (4x)",
        "2 Marathons",
        "2 Tough Mudders",
        "Town of Aspen Race Series - Mountain & Road Biking",
        "US Swimming Athlete"
      ],
      image: "/images/diane.jpg"
    },
    {
      name: "HAYLEE MOLLOY",
      role: "Coach",
      bio: [
        "Haylee, originally from New York, has made Connecticut her new home. She played lacrosse for four years at Arcadia University where she was first introduced to strength training. She began CrossFit at this time and hasn't stopped since.",
        "Her love for fitness and training is what drove her to a career switch in 2018. She went on to receive her masters degree in Physical Education from Hofstra University. In summer 2022, she will also have a masters in Health Education.",
        "Haylee is a Physical Education teacher, soccer coach, lacrosse coach, and CrossFit coach. She has also spent summers Lifeguarding at Fire Island Seashore. She also likes to garden, paddle board, and hang out with family + her dog, Blake.",
        "\"I'm so lucky to be able to teach/coach people in something that I am so passionate about. I love helping others reach their goals and seeing the sense of pride they experience afterwards. The best part about fitness is that there is always room to grow, always something to work for, and always something to be excited about— thank you for letting me be a part of that!\""
      ],
      certifications: [
        "Masters in Physical Education",
        "Masters in Health Education"
      ],
      achievements: [
        "Physical Education Teacher",
        "Multi-Sport Coach",
        "Fire Island Seashore Lifeguard"
      ],
      image: "/images/haylee.jpg"
    },
    {
      name: "CHRISTOPHER TABER",
      role: "Weightlifting Coach",
      bio: [
        "Christopher is an assistant professor at Sacred Heart University in the exercise science program. He is the head coach of the Sacred Heart weightlifting team as well as a coach and athlete with east coast gold weightlifting.",
        "He has been coaching athletes for the past 8 years and has developed athletes from a multitude of sports. Prior to teaching at Sacred Heart University he was an assistant weightlifting coach and sport scientist at the Olympic training site at East Tennessee State University.",
        "His research is focused around optimal training methods, strength and power development and athlete monitoring and testing. Christopher lives in Branford with his wife Lucy and his dog marble."
      ],
      certifications: [
        "PhD in Exercise Science",
        "CSCS (Certified Strength & Conditioning Specialist)",
        "USAW Level 2",
        "PES (Performance Enhancement Specialist)",
        "EP-C (Exercise Physiologist Certified)"
      ],
      achievements: [
        "Assistant Professor at Sacred Heart University",
        "Head Coach of Sacred Heart Weightlifting Team",
        "Former Olympic Training Site Coach at ETSU",
        "East Coast Gold Weightlifting Coach"
      ],
      image: "/images/taber.jpg"
    }
  ];

  const { scrollYProgress } = useScroll();
  const titleScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.9]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 20
    },
    show: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <main className="min-h-screen bg-black text-white pt-20 pb-safe">
      {/* Coaches Section */}
      <section id="coaches" className="py-16 sm:py-20 bg-black">
        <motion.div 
          className="container mx-auto px-4"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <motion.h1 
            className="text-5xl sm:text-6xl md:text-7xl font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-[#FF8C00]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            MEET OUR COACHES
          </motion.h1>
          <div className="grid grid-cols-1 gap-16">
            {coaches.map((coach, index) => (
              <motion.div
                key={coach.name}
                variants={cardVariants}
                whileHover="hover"
                className="relative bg-[#1a1a1a] rounded-2xl overflow-hidden border border-[#FF8C00]/20 hover:border-[#FF8C00]/40 transition-all duration-300"
              >
                {/* Accent line */}
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#FF8C00] to-transparent" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
                  <motion.div 
                    className="relative aspect-square w-full group"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Image
                      src={coach.image}
                      alt={coach.name}
                      fill
                      className="object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-lg" />
                  </motion.div>
                  <div className="space-y-6">
                    <div>
                      <motion.h2 
                        className="text-4xl font-bold mb-2"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                      >
                        {coach.name}
                      </motion.h2>
                      <motion.h3 
                        className="text-xl text-[#FF8C00] mb-6"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                      >
                        {coach.role}
                      </motion.h3>
                      {coach.bio.map((paragraph, i) => (
                        <motion.p 
                          key={i} 
                          className="text-gray-300 mb-4"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: 0.2 + (i * 0.1) }}
                        >
                          {paragraph}
                        </motion.p>
                      ))}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <motion.div 
                        className="bg-black/50 border border-[#FF8C00]/20 p-6 rounded-lg hover:border-[#FF8C00]/40 transition-colors"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <h4 className="text-lg font-bold mb-4 text-[#FF8C00]">CERTIFICATIONS</h4>
                        <ul className="space-y-2">
                          {coach.certifications.map((cert, i) => (
                            <motion.li 
                              key={i} 
                              className="text-gray-300"
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.3, delay: i * 0.1 }}
                            >
                              • {cert}
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                      <motion.div 
                        className="bg-black/50 border border-[#FF8C00]/20 p-6 rounded-lg hover:border-[#FF8C00]/40 transition-colors"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <h4 className="text-lg font-bold mb-4 text-[#FF8C00]">ACHIEVEMENTS</h4>
                        <ul className="space-y-2">
                          {coach.achievements.map((achievement, i) => (
                            <motion.li 
                              key={i} 
                              className="text-gray-300"
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.3, delay: i * 0.1 }}
                            >
                              • {achievement}
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </main>
  );
} 
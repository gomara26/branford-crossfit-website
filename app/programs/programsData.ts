import { Program } from "./types";

export const programs: Program[] = [
  {
    title: "CrossFit",
    description: "CrossFit is a strength and conditioning program that delivers amazing results through constantly varied, functional movements, executed at high intensity. CrossFit prepares you for life. We train to be generally physically prepared, and we seek to garner a level of fitness readies you for the known and unknown. Simply put, CrossFit will help create the best possible version of you.",
    idealFor: [
      "Anyone looking to improve their fitness",
      "All fitness levels - no experience needed",
      "Those wanting a supportive community"
    ],
    faq: [
      {
        question: "Do I have to be Fit to Start?",
        answer: "NO! The CrossFit program is beautiful because it is scalable to an appropriate level for anyone – literally, anyone. At BCF our coaches take tremendous pride in administering a program that is safe, fun, and effective for everyone… no matter their current level of fitness. So, no – come as you are, but be prepared to leave each day a better version of yourself."
      }
    ],
    schedule: "Multiple class times available daily from 5:30am to 7:30pm",
    slug: "crossfit",
    image: "/images/programs/crossfit.jpg"
  },
  {
    title: "Strength and Speed",
    description: "A specialized program focused on developing maximal strength and explosive power. This program incorporates Olympic weightlifting, powerlifting, and plyometric training.",
    idealFor: ["Intermediate to advanced athletes", "Those looking to increase strength", "Athletes wanting to improve power output"],
    schedule: "Monday, Wednesday, Friday at 4:30pm and 6:00pm",
    slug: "strength-and-speed",
    image: "/images/programs/strength-speed.jpg"
  },
  {
    title: "High School",
    description: "Tailored program designed specifically for high school athletes looking to improve their athletic performance and prevent injuries.",
    idealFor: ["High school athletes", "Sports teams", "College-bound athletes"],
    schedule: "After school sessions available",
    slug: "high-school",
    image: "/images/programs/high-school.jpg"
  },
  {
    title: "Personal Training",
    description: "Private training is a great way to develop a personal relationship with a coach to achieve your goals together. This is great option for those with busy schedules, enjoy a more individualized plan and environment, or want to perfect a certain skill or be introduced to a different training approach (Weightlifting, Running, Sports Specific…)",
    idealFor: [
      "Those wanting individualized attention",
      "Busy professionals with flexible schedules",
      "Skill-specific development",
      "In-home training available"
    ],
    faq: [
      {
        question: "How do I get started?",
        answer: "Contact us to meet a coach, see the facility, or talk about our programs. If you're already a member, talk to a coach about your goals to get started!"
      }
    ],
    schedule: "Flexible scheduling available - in facility or in-home training",
    slug: "personal-training",
    image: "/images/programs/personal-training.jpg"
  },
  {
    title: "Youth",
    description: "Age-appropriate fitness program that makes exercise fun while building fundamental movement skills and confidence.",
    idealFor: ["Children ages 5-12", "Young athletes", "Active kids"],
    schedule: "Weekday afternoons and Saturday mornings",
    slug: "youth",
    image: "/images/programs/youth.jpg"
  },
  {
    title: "Nation Plan",
    description: "Customized programming that you can follow at your own pace, with remote coaching support and progress tracking.",
    idealFor: ["Remote athletes", "Self-paced training", "Flexible schedules"],
    schedule: "24/7 access to programming",
    slug: "nation-plan",
    image: "/images/programs/nation-plan.jpg"
  },
  {
    title: "Open Gym",
    description: "Access to our facility and equipment during designated times to work on your own programming or practice skills.",
    idealFor: ["Self-motivated athletes", "Skill practice", "Additional training time"],
    schedule: "Various times throughout the day",
    slug: "open-gym",
    image: "/images/programs/open-gym.jpg"
  },
  {
    title: "Nation Barbell Club",
    description: "Focused Olympic weightlifting program for those looking to master the snatch and clean & jerk.",
    idealFor: ["Olympic lifting enthusiasts", "Competition preparation", "Technique development"],
    schedule: "Evening sessions available",
    slug: "barbell-club",
    image: "/images/programs/barbell-club.jpg"
  },
  {
    title: "BC Sport/Middle School",
    description: "Athletic development program designed specifically for middle school athletes, focusing on fundamentals and proper movement patterns.",
    idealFor: ["Middle school athletes", "Youth sports teams", "Athletic development"],
    schedule: "After school sessions available",
    slug: "bc-sport",
    image: "/images/programs/bc-sport.jpg"
  },
  {
    title: "Nation Running Club",
    description: "Structured running program for all levels, from beginners to experienced runners, with focus on technique and endurance.",
    idealFor: ["Runners of all levels", "Endurance athletes", "Cross-training athletes"],
    schedule: "Morning and evening sessions available",
    slug: "running-club",
    image: "/images/programs/running-club.jpg"
  }
]; 
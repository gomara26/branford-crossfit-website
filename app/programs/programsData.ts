import { Program } from "./types";

export const programs: Program[] = [
  {
    title: "CrossFit",
    description: "Our flagship program combines functional movements performed at high intensity. Each day brings a different workout that includes a mix of cardiovascular conditioning, weightlifting, and gymnastics.",
    idealFor: ["General fitness enthusiasts", "Those looking for variety", "Anyone wanting community support"],
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
    description: "One-on-one coaching tailored to your specific goals, whether it's weight loss, strength gains, or sport-specific training.",
    idealFor: ["Those wanting individual attention", "Specific goal-oriented training", "Rehabilitation needs"],
    schedule: "Flexible scheduling available",
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
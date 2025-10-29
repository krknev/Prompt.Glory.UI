"use client";
import React from 'react';
import { useState, useEffect } from 'react';
import ContestCard from '@/components/cards/ContestCard';
import { Trophy, Calendar, Users } from 'lucide-react';

interface ContestsPageProps {
  onNavigate: (page: string, details?: any) => void;
}

export default function ContestsPage({ onNavigate }: ContestsPageProps) {
  // Initialize contest times state
  const [contestTimeLefts, setContestTimeLefts] = useState<{ [key: number]: { days: number, hours: number, minutes: number, seconds: number } }>({});

  const activeContests = [
    {
      id: 1,
      title: "Cyberpunk Cityscapes",
      description: "Create stunning cyberpunk cityscapes with neon lights, towering skyscrapers, and futuristic vehicles. Show us your vision of the digital future!",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCuMdBkUAgmlGWj0_S6NmA-szfbPpar65bm3_es7NTurJWrcv6od1mySiZEF7FhnMOzlh2hZwA_NYTmgzZTWjFq_ujbE_vYLvXm_6BmrboXyw31lYeA_ooqZZWu1zZjXIDGkK0NaW9xvw-RgYHp2b_5D-TXLVyvl58uioFxkPHyWvrcg7RX33Bq93ifxeHk8Nr3I2b1thy36HWGm6ZzJLFRaG9oDYZA4dLqVjA0cckS0S8cNDopYGfH3wtyls3PDeJxotdEz5eOdB4",
      prizePool: "10,000 $GLORY",
      timeLeft: { days: 2, hours: 14, minutes: 35, seconds: 21 },
      participants: 1247,
      status: 'active' as const
    },
    {
      id: 2,
      title: "Fantasy Worlds",
      description: "Design magical fantasy realms filled with mythical creatures, enchanted forests, and mystical landscapes. Let your imagination run wild!",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD5rm2G9vXO3-NRa7yczppc-rF0xgZLzR0Ayxs_lz2ZNH1h5en6fVnm07WIEduALJ38V12KJlHWYearhAWdkx2pnatlI_TIcvZg8b7SPxv5VCCy27XuU_ocJucwZczo5O4lHtKo4khWp0f4lrgjJWXbqLUQCjFjIJ9LYqMz0AgQ01GeuqB-iCOwn9vPi9lG_QhLAAYqI2ReppdjyPneC3kyC2F9_ZrXW1IwMIOjEXI5JHg8N1afnk_NJxR5nFM5FHQSqHlXYdBj13A",
      prizePool: "7,500 $GLORY",
      timeLeft: { days: 5, hours: 8, minutes: 42, seconds: 15 },
      participants: 892,
      status: 'active' as const
    },
    {
      id: 3,
      title: "Abstract Dreams",
      description: "Explore the boundaries of abstract art with AI. Create mind-bending compositions that challenge perception and reality.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAgXTzG5WxSgKfmziqK6MdiPcDz1nxqASTDRLgr98YGIQJo_gF16lfvuASvBs67wiLG6l0ojCc8M421Yu_we62fO8mZhBvuVQjUUs2Zj38UJIMgbAONgWicVlVbfxQgy581IpyHFjB2zGvy2Q12QyGV33gE8K6j6P3WJT-KTvK_98viA90EzjRcLlqL2kr16U4RcPbsL5BIehag9Posz76T1_yoVvlbTTVePiR7hhPB5Q0Y0MpBOhv5WXnvYW7JcIYwWnplOI_TrLI",
      prizePool: "5,000 $GLORY",
      timeLeft: { days: 12, hours: 3, minutes: 18, seconds: 7 },
      participants: 634,
      status: 'active' as const
    },
    {
      id: 4,
      title: "Character Portraits",
      description: "Design compelling character portraits that tell a story. From heroes to villains, bring personalities to life through AI art.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD0ZzVZhl5_vVmM6xnfYrE2JyLyWklNlbN5vJJ6IX4I0u9ePsJ7-dltcv9eXPOVX1TBGSRMVfp3hfFVSzZ3MhsFz4WreA4f7cGih5edwRrs85gK_BNfEF1YrURZNE4ltz9XgKaHHiUU8oAaVVzsYU-dSvWj0pCowbPhYLCNfJSrghkNwfaH6VxPodbE3Dc-4BWrP2xTfQAtpt8-io4bn1YXLzxK74GsLri8pCVCmehWw7QYn1KEh1jleW3t3kq-gfA7voqAcDY5VOc",
      prizePool: "3,000 $GLORY",
      timeLeft: { days: 18, hours: 15, minutes: 29, seconds: 44 },
      participants: 456,
      status: 'active' as const
    },
    {
      id: 5,
      title: "Sci-Fi Vehicles",
      description: "Design futuristic vehicles for space exploration, urban transport, or intergalactic warfare. The future of transportation awaits!",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDPrs070e6Z-qpBuV15ndqNYidQUGFH7nPhxW8iINPKgVGI_Qxf-gZaNUYzplIskO8ofLdv5NGmRgYoopZD9LBy4lIqKkDrWhfnSbJRO9yA4zyvvHtQr4pD5paQCxc6GUI8GnjxGhM1RCss8VdLLliih89CjIzeAprIEEsaIKn6EaKm5wWNi8sPSz2_6coiLgzniOZHnHXV4bvg72sZ1QGMezuEthn_I2KyRyjsXibDtbsCc4hmvIkSb8YFTZH88CxE2IYuLf4mHX4",
      prizePool: "4,500 $GLORY",
      timeLeft: { days: 7, hours: 22, minutes: 11, seconds: 33 },
      participants: 723,
      status: 'active' as const
    },
    {
      id: 6,
      title: "Nature & Wildlife",
      description: "Capture the beauty of nature and wildlife through AI art. From serene landscapes to majestic animals in their natural habitat.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB6LAuZTz0K8X-y8tdsB8ojZaqlGDbX8lHRUBcl8NmSod_JIye0JuHRzlcshUBbbfEc1soVi55t03ea6BabgDELQ4qwY9vJr8yd5UJ9hnXqZ-FsZrWIx1PNObo4WTWNosjSqk-fzS51CfKUS8HWUzdS6vvb3syozJAyopcQ5ZBU_b2nEw8Z6fJUIuGjTXoGofz3aTbwwe4XeoIqHdLzqIwpHbd9pqGjK8zFjqlnDWllxCFp6sbjDo1B-dFecPEvUDtaWEAtowYNLfY",
      prizePool: "6,000 $GLORY",
      timeLeft: { days: 25, hours: 6, minutes: 47, seconds: 12 },
      participants: 1089,
      status: 'upcoming' as const
    }
  ];

  // Initialize contest times on component mount
  useEffect(() => {
    const initialTimes: { [key: number]: { days: number, hours: number, minutes: number, seconds: number } } = {};
    activeContests.forEach(contest => {
      initialTimes[contest.id] = { ...contest.timeLeft };
    });
    setContestTimeLefts(initialTimes);
  }, []);

  // Shared timer effect for all contests
  useEffect(() => {
    const timer = setInterval(() => {
      setContestTimeLefts(prev => {
        const updated = { ...prev };

        Object.keys(updated).forEach(contestIdStr => {
          const contestId = parseInt(contestIdStr);
          let { days, hours, minutes, seconds } = updated[contestId];

          if (seconds > 0) {
            seconds--;
          } else if (minutes > 0) {
            minutes--;
            seconds = 59;
          } else if (hours > 0) {
            hours--;
            minutes = 59;
            seconds = 59;
          } else if (days > 0) {
            days--;
            hours = 23;
            minutes = 59;
            seconds = 59;
          }

          updated[contestId] = { days, hours, minutes, seconds };
        });

        return updated;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleViewContest = (contest: any) => {
    onNavigate('singleContest', contest);
  };

  return (
    <div className="flex-1 px-4 py-8 sm:px-6 lg:px-8 xl:px-20">
      <div className="mx-auto max-w-screen-xl">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
            AI Art Contests
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4">
            Participate in exciting AI art contests and showcase your creativity to win amazing prizes.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-background-light dark:bg-gray-900/40 rounded-xl p-6 text-center border border-gray-200 dark:border-gray-800">
            <Trophy className="text-primary mx-auto mb-3" size={32} />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">36,500</h3>
            <p className="text-gray-600 dark:text-gray-400">$GLORY in Prizes</p>
          </div>
          <div className="bg-background-light dark:bg-gray-900/40 rounded-xl p-6 text-center border border-gray-200 dark:border-gray-800">
            <Calendar className="text-primary mx-auto mb-3" size={32} />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">5</h3>
            <p className="text-gray-600 dark:text-gray-400">Active Contests</p>
          </div>
          <div className="bg-background-light dark:bg-gray-900/40 rounded-xl p-6 text-center border border-gray-200 dark:border-gray-800">
            <Users className="text-primary mx-auto mb-3" size={32} />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">5,041</h3>
            <p className="text-gray-600 dark:text-gray-400">Total Participants</p>
          </div>
        </div>

        {/* Active Contests */}
        <div className="mb-8">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6 px-4 sm:px-0">
            Active Contests
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {activeContests.filter(contest => contest.status === 'active').map((contest) => (
              <ContestCard
                key={contest.id}
                contest={{
                  ...contest, userRole: "both",
                  timeLeft: contestTimeLefts[contest.id] || contest.timeLeft
                }}
                onViewContest={handleViewContest}
              />
            ))}
          </div>
        </div>

        {/* Upcoming Contests */}
        <div className="mb-8">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6 px-4 sm:px-0">
            Upcoming Contests
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {activeContests.filter(contest => contest.status === 'upcoming').map((contest) => (
              <ContestCard
                key={contest.id}
                contest={{
                  ...contest, userRole: "both",
                  timeLeft: contestTimeLefts[contest.id] || contest.timeLeft
                }}
                onViewContest={handleViewContest}
              />
            ))}
          </div>
        </div>

        {/* Load More */}
        <div className="text-center">
          <button className="px-8 py-3 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition-colors font-bold">
            Load More Contests
          </button>
        </div>
      </div>
    </div>
  );
}
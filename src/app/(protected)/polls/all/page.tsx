"use client"
import React, { useState } from 'react';
import { Vote, TrendingUp, Users, Calendar, Trophy, Plus, Eye, MessageSquare } from 'lucide-react';

interface PollOption {
  id: number;
  title: string;
  description: string;
  votes: number;
  image: string;
  submittedBy: string;
  submittedAt: string;
}

interface Poll {
  id: number;
  title: string;
  description: string;
  endDate: string;
  totalVotes: number;
  status: 'active' | 'ended' | 'upcoming';
  options: PollOption[];
}

export default function PollPage() {
  const [selectedPoll, setSelectedPoll] = useState<number>(1);
  const [votedOptions, setVotedOptions] = useState<Set<number>>(new Set());
  const [showCreatePoll, setShowCreatePoll] = useState(false);

  const polls: Poll[] = [
    {
      id: 1,
      title: "Next Contest Theme",
      description: "Vote for the theme of our next major contest! The winning theme will become our February contest with a $15,000 prize pool.",
      endDate: "2025-02-01",
      totalVotes: 2847,
      status: 'active',
      options: [
        {
          id: 1,
          title: "Underwater Cities",
          description: "Futuristic underwater civilizations with bioluminescent architecture and marine life integration",
          votes: 892,
          image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD5rm2G9vXO3-NRa7yczppc-rF0xgZLzR0Ayxs_lz2ZNH1h5en6fVnm07WIEduALJ38V12KJlHWYearhAWdkx2pnatlI_TIcvZg8b7SPxv5VCCy27XuU_ocJucwZczo5O4lHtKo4khWp0f4lrgjJWXbqLUQCjFjIJ9LYqMz0AgQ01GeuqB-iCOwn9vPi9lG_QhLAAYqI2ReppdjyPneC3kyC2F9_ZrXW1IwMIOjEXI5JHg8N1afnk_NJxR5nFM5FHQSqHlXYdBj13A",
          submittedBy: "@ocean_dreamer",
          submittedAt: "2025-01-20"
        },
        {
          id: 2,
          title: "Steampunk Metropolis",
          description: "Victorian-era inspired cities with steam-powered technology and brass mechanical elements",
          votes: 756,
          image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBAQMq3ssOCKzmGk5YdqOcPv6yNjesmzOxuni6mVtVEbUlpfO14NMkPm19x9dc7NTkk6OfO3w9hHdK97qlWr02qdTb03T0-JQokbSdxsMw11T5q8Y9Z-KV4QfiJbZZAnd_mEDxsAb-unF5XIwHtrlvzqPn9au4T2PZFDc5hx1ErZbbcdJgz5ubJUsVVLq6-uo7-hz9kT6F-9fnAy7Vbg842U3vVGWRUCzxbB3EiWtEAkxQFB_EoEEeZDomFF5bQX4TWAPKDzc6svnI",
          submittedBy: "@steam_artist",
          submittedAt: "2025-01-19"
        },
        {
          id: 3,
          title: "Post-Apocalyptic Nature",
          description: "Nature reclaiming abandoned cities with overgrown buildings and wildlife returning to urban spaces",
          votes: 634,
          image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB6LAuZTz0K8X-y8tdsB8ojZaqlGDbX8lHRUBcl8NmSod_JIye0JuHRzlcshUBbbfEc1soVi55t03ea6BabgDELQ4qwY9vJr8yd5UJ9hnXqZ-FsZrWIx1PNObo4WTWNosjSqk-fzS51CfKUS8HWUzdS6vvb3syozJAyopcQ5ZBU_b2nEw8Z6fJUIuGjTXoGofz3aTbwwe4XeoIqHdLzqIwpHbd9pqGjK8zFjqlnDWllxCFp6sbjDo1B-dFecPEvUDtaWEAtowYNLfY",
          submittedBy: "@nature_punk",
          submittedAt: "2025-01-18"
        },
        {
          id: 4,
          title: "Space Colonies",
          description: "Massive space stations and orbital cities with advanced technology and zero-gravity architecture",
          votes: 565,
          image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDPrs070e6Z-qpBuV15ndqNYidQUGFH7nPhxW8iINPKgVGI_Qxf-gZaNUYzplIskO8ofLdv5NGmRgYoopZD9LBy4lIqKkDrWhfnSbJRO9yA4zyvvHtQr4pD5paQCxc6GUI8GnjxGhM1RCss8VdLLliih89CjIzeAprIEEsaIKn6EaKm5wWNi8sPSz2_6coiLgzniOZHnHXV4bvg72sZ1QGMezuEthn_I2KyRyjsXibDtbsCc4hmvIkSb8YFTZH88CxE2IYuLf4mHX4",
          submittedBy: "@space_architect",
          submittedAt: "2025-01-17"
        }
      ]
    },
    {
      id: 2,
      title: "Art Style Preference",
      description: "Help us understand what art styles you'd like to see more of in future contests and marketplace features.",
      endDate: "2025-01-30",
      totalVotes: 1456,
      status: 'active',
      options: [
        {
          id: 5,
          title: "Photorealistic",
          description: "Ultra-realistic AI art that looks like photographs",
          votes: 423,
          image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD0ZzVZhl5_vVmM6xnfYrE2JyLyWklNlbN5vJJ6IX4I0u9ePsJ7-dltcv9eXPOVX1TBGSRMVfp3hfFVSzZ3MhsFz4WreA4f7cGih5edwRrs85gK_BNfEF1YrURZNE4ltz9XgKaHHiUU8oAaVVzsYU-dSvWj0pCowbPhYLCNfJSrghkNwfaH6VxPodbE3Dc-4BWrP2xTfQAtpt8-io4bn1YXLzxK74GsLri8pCVCmehWw7QYn1KEh1jleW3t3kq-gfA7voqAcDY5VOc",
          submittedBy: "@realism_pro",
          submittedAt: "2025-01-22"
        },
        {
          id: 6,
          title: "Anime/Manga Style",
          description: "Japanese animation inspired artwork with vibrant colors and expressive characters",
          votes: 387,
          image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAgXTzG5WxSgKfmziqK6MdiPcDz1nxqASTDRLgr98YGIQJo_gF16lfvuASvBs67wiLG6l0ojCc8M421Yu_we62fO8mZhBvuVQjUUs2Zj38UJIMgbAONgWicVlVbfxQgy581IpyHFjB2zGvy2Q12QyGV33gE8K6j6P3WJT-KTvK_98viA90EzjRcLlqL2kr16U4RcPbsL5BIehag9Posz76T1_yoVvlbTTVePiR7hhPB5Q0Y0MpBOhv5WXnvYW7JcIYwWnplOI_TrLI",
          submittedBy: "@anime_artist",
          submittedAt: "2025-01-21"
        },
        {
          id: 7,
          title: "Minimalist/Clean",
          description: "Simple, clean designs with focus on composition and negative space",
          votes: 356,
          image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBAQMq3ssOCKzmGk5YdqOcPv6yNjesmzOxuni6mVtVEbUlpfO14NMkPm19x9dc7NTkk6OfO3w9hHdK97qlWr02qdTb03T0-JQokbSdxsMw11T5q8Y9Z-KV4QfiJbZZAnd_mEDxsAb-unF5XIwHtrlvzqPn9au4T2PZFDc5hx1ErZbbcdJgz5ubJUsVVLq6-uo7-hz9kT6F-9fnAy7Vbg842U3vVGWRUCzxbB3EiWtEAkxQFB_EoEEeZDomFF5bQX4TWAPKDzc6svnI",
          submittedBy: "@minimal_mind",
          submittedAt: "2025-01-20"
        },
        {
          id: 8,
          title: "Dark Fantasy",
          description: "Gothic and dark fantasy themes with mysterious and dramatic elements",
          votes: 290,
          image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD5rm2G9vXO3-NRa7yczppc-rF0xgZLzR0Ayxs_lz2ZNH1h5en6fVnm07WIEduALJ38V12KJlHWYearhAWdkx2pnatlI_TIcvZg8b7SPxv5VCCy27XuU_ocJucwZczo5O4lHtKo4khWp0f4lrgjJWXbqLUQCjFjIJ9LYqMz0AgQ01GeuqB-iCOwn9vPi9lG_QhLAAYqI2ReppdjyPneC3kyC2F9_ZrXW1IwMIOjEXI5JHg8N1afnk_NJxR5nFM5FHQSqHlXYdBj13A",
          submittedBy: "@dark_fantasy",
          submittedAt: "2025-01-19"
        }
      ]
    }
  ];

  const currentPoll = polls.find(poll => poll.id === selectedPoll) || polls[0];

  const handleVote = (optionId: number) => {
    if (votedOptions.has(optionId)) {
      setVotedOptions(prev => {
        const newSet = new Set(prev);
        newSet.delete(optionId);
        return newSet;
      });
    } else {
      setVotedOptions(prev => new Set([...prev, optionId]));
    }
  };

  const getVotePercentage = (votes: number) => {
    return currentPoll.totalVotes > 0 ? (votes / currentPoll.totalVotes * 100).toFixed(1) : '0';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-50 text-green-700 border-green-300/60';
      case 'ended': return 'bg-gray-50 text-gray-700 border-gray-300/60';
      case 'upcoming': return 'bg-blue-50 text-blue-700 border-blue-300/60';
      default: return 'bg-gray-50 text-gray-700 border-gray-300/60';
    }
  };

  return (
    <div className="flex-1 px-4 sm:px-6 lg:px-8 xl:px-20 py-8 sm:py-12">
      <div className="mx-auto max-w-7xl">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
            Community Polls
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4">
            Help shape the future of PromptGlory by voting on contest themes, features, and community decisions.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-background-light dark:bg-gray-900/40 rounded-xl p-6 text-center border border-gray-200 dark:border-gray-800">
            <Vote className="text-primary mx-auto mb-3" size={32} />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">4,303</h3>
            <p className="text-gray-600 dark:text-gray-400">Total Votes Cast</p>
          </div>
          <div className="bg-background-light dark:bg-gray-900/40 rounded-xl p-6 text-center border border-gray-200 dark:border-gray-800">
            <Users className="text-primary mx-auto mb-3" size={32} />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">1,847</h3>
            <p className="text-gray-600 dark:text-gray-400">Participants</p>
          </div>
          <div className="bg-background-light dark:bg-gray-900/40 rounded-xl p-6 text-center border border-gray-200 dark:border-gray-800">
            <Trophy className="text-primary mx-auto mb-3" size={32} />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">2</h3>
            <p className="text-gray-600 dark:text-gray-400">Active Polls</p>
          </div>
        </div>

        {/* Poll Selector */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white px-4 sm:px-0">Active Polls</h3>
            <button 
              onClick={() => setShowCreatePoll(true)}
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 hover:glow transition-all duration-300 font-bold text-sm sm:text-base mx-4 sm:mx-0"
            >
              <Plus size={16} />
              Suggest Poll
            </button>
          </div>
          
          <div className="flex flex-wrap gap-2 sm:gap-3 px-4 sm:px-0">
            {polls.map((poll) => (
              <button
                key={poll.id}
                onClick={() => setSelectedPoll(poll.id)}
                className={`px-3 sm:px-4 py-2 rounded-lg border transition-all duration-300 text-sm sm:text-base ${
                  selectedPoll === poll.id
                    ? 'bg-primary text-white border-primary shadow-lg shadow-primary/30'
                    : 'bg-background-light dark:bg-gray-900/40 text-gray-900 dark:text-white border-gray-200 dark:border-gray-800 hover:border-primary/50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="font-medium">{poll.title}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full border ${getStatusColor(poll.status)}`}>
                    {poll.status}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Current Poll */}
        <div className="bg-background-light dark:bg-gray-900/40 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden mx-4 sm:mx-0">
          {/* Poll Header */}
          <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-800">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {currentPoll.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                  {currentPoll.description}
                </p>
              </div>
              <div className="text-right">
                <div className="text-xl sm:text-2xl font-bold text-primary">{currentPoll.totalVotes}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Total Votes</div>
                <div className="text-xs text-gray-500 mt-1">
                  Ends: {currentPoll.endDate}
                </div>
              </div>
            </div>
          </div>

          {/* Poll Options */}
          <div className="p-4 sm:p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {currentPoll.options.map((option) => {
                const isVoted = votedOptions.has(option.id);
                const percentage = getVotePercentage(option.votes);
                
                return (
                  <div
                    key={option.id}
                    className={`relative rounded-xl border transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-primary/20 ${
                      isVoted 
                        ? 'border-primary bg-primary/5 shadow-lg shadow-primary/20' 
                        : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/60 hover:border-primary/50'
                    }`}
                    onClick={() => handleVote(option.id)}
                  >
                    {/* Background Image */}
                    <div className="relative h-40 sm:h-48 overflow-hidden rounded-t-xl">
                      <img
                        src={option.image}
                        alt={option.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      
                      {/* Vote Percentage */}
                      <div className="absolute top-3 right-3">
                        <div className="px-3 py-1 rounded-full bg-black/70 text-white text-sm font-bold backdrop-blur-sm">
                          {percentage}%
                        </div>
                      </div>

                      {/* Voted Indicator */}
                      {isVoted && (
                        <div className="absolute top-3 left-3">
                          <div className="p-2 rounded-full bg-primary text-white">
                            <Vote size={16} />
                          </div>
                        </div>
                      )}

                      {/* Title Overlay */}
                      <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 right-2 sm:right-3">
                        <h4 className="text-base sm:text-lg font-bold text-white mb-1">
                          {option.title}
                        </h4>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-3 sm:p-4">
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-4">
                        {option.description}
                      </p>

                      {/* Vote Progress Bar */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {option.votes} votes
                          </span>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {percentage}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-primary to-purple-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Submission Info */}
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Suggested by {option.submittedBy}</span>
                        <span>{option.submittedAt}</span>
                      </div>

                      {/* Vote Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleVote(option.id);
                        }}
                        className={`w-full mt-4 py-2 sm:py-3 rounded-lg font-bold transition-all duration-300 text-sm sm:text-base ${
                          isVoted
                            ? 'bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/30'
                            : 'bg-primary/20 text-primary hover:bg-primary/30 border border-primary/30'
                        }`}
                      >
                        {isVoted ? '✓ Voted' : 'Vote for this theme'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Poll Footer */}
          <div className="p-4 sm:p-6 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/60">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <Calendar size={16} />
                  <span>Ends: {currentPoll.endDate}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users size={16} />
                  <span>{currentPoll.totalVotes} total votes</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 text-blue-500 rounded-lg hover:bg-blue-500/30 transition-colors font-bold">
                  <MessageSquare size={16} />
                  <span className="hidden sm:inline">Discuss</span>
                </button>
                <button className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition-colors font-bold">
                  <Eye size={16} />
                  <span className="hidden sm:inline">Results</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Poll Results */}
        <div className="mt-12">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6 px-4 sm:px-0">
            Recent Poll Results
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-4 sm:px-0">
            {/* Mock recent polls */}
            <div className="bg-background-light dark:bg-gray-900/40 rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-green-600/10 text-green-600">
                  <Trophy size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base">December Contest Theme</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Ended Dec 31, 2024</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 dark:text-gray-300">🏆 Winner: Cyberpunk Cities</span>
                  <span className="text-sm font-bold text-primary">42%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Fantasy Realms</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">31%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Abstract Art</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">27%</span>
                </div>
              </div>
            </div>

            <div className="bg-background-light dark:bg-gray-900/40 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-blue-600/10 text-blue-600">
                  <Users size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">Platform Features</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Ended Jan 15, 2025</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 dark:text-gray-300">🏆 Winner: AI Collaboration Tools</span>
                  <span className="text-sm font-bold text-primary">38%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">NFT Integration</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">35%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Mobile App</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">27%</span>
                </div>
              </div>
            </div>

            <div className="bg-background-light dark:bg-gray-900/40 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-purple-600/10 text-purple-600">
                  <TrendingUp size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">Prize Distribution</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Ended Jan 10, 2025</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 dark:text-gray-300">🏆 Winner: 50/30/20 Split</span>
                  <span className="text-sm font-bold text-primary">45%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Equal Distribution</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">33%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Winner Takes All</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">22%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How Polls Work */}
        <div className="bg-gradient-to-br from-primary/10 to-purple-600/10 rounded-xl p-8 border border-primary/20">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              How Community Polls Work
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Your voice matters in shaping the PromptGlory community
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="p-3 rounded-full bg-primary/10 text-primary w-fit mx-auto mb-3">
                <Vote size={24} />
              </div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">Vote on Ideas</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Cast your vote on contest themes, features, and community decisions
              </p>
            </div>
            
            <div className="text-center">
              <div className="p-3 rounded-full bg-primary/10 text-primary w-fit mx-auto mb-3">
                <Plus size={24} />
              </div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">Suggest Topics</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Submit your own poll ideas for the community to vote on
              </p>
            </div>
            
            <div className="text-center">
              <div className="p-3 rounded-full bg-primary/10 text-primary w-fit mx-auto mb-3">
                <Trophy size={24} />
              </div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">See Results</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Winning options become reality - contests, features, and more!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Star, Trophy, Zap, Home, ArrowLeft, CheckCircle, XCircle, Play } from 'lucide-react';

// Data materi IPA untuk siswa SD
interface Topic {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  bgColor: string;
  image: string;
  lessons: Lesson[];
}

interface Lesson {
  id: string;
  title: string;
  content: string;
  keyPoints: string[];
  funFact: string;
}

interface Quiz {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const topics: Topic[] = [
  {
    id: 'animals',
    title: 'Dunia Hewan',
    description: 'Kenali berbagai hewan lucu dan keunikan mereka!',
    icon: BookOpen,
    color: 'text-pink-600',
    bgColor: 'bg-pink-50 dark:bg-pink-950',
    image: '/images/animals.jpg',
    lessons: [
      {
        id: 'mammals',
        title: 'Hewan Menyusui',
        content: 'Hewan menyusui adalah hewan yang memberi makan bayinya dengan air susu induknya. Contohnya: kucing, anjing, kelinci, dan manusia!',
        keyPoints: [
          'Memberi makan anak dengan susu induk',
          'Biasanya punya bulu atau rambut',
          'Bayi lahir dari dalam perut induk (buatan)',
          'Induk merawat anak dengan penuh kasih sayang'
        ],
        funFact: 'Paus adalah hewan menyusui terbesar di dunia! Panjangnya bisa sampai 30 meter.'
      },
      {
        id: 'birds',
        title: 'Burung-burung',
        content: 'Burung adalah hewan yang punya bulu, sayap, dan bisa terbang. Tapi tidak semua burung bisa terbang, lho!',
        keyPoints: [
          'Tubuh ditutupi bulu yang indah',
          'Memiliki sayap dan paruh',
          'Bertelur dan mengasuh anak di sarang',
          'Bernapas dengan paru-paru'
        ],
        funFact: 'Penguin adalah burung yang tidak bisa terbang, tapi sangat pandai berenang!'
      },
      {
        id: 'fish',
        title: 'Ikan Air',
        content: 'Ikan hidup di air dan bernapas menggunakan insang. Mereka berenang dengan sirip dan bersifat poikiloterm (darahnya dingin).',
        keyPoints: [
          'Bernapas menggunakan insang',
          'Tubuh ditutupi sisik yang halus',
          'Bergerak dengan sirip',
          'Hidup di air tawar atau air laut'
        ],
        funFact: 'Ikan paus bukan ikan, tapi mamalia! Mereka bernapas dengan paru-paru dan harus ke permukaan untuk napas.'
      }
    ]
  },
  {
    id: 'plants',
    title: 'Dunia Tumbuhan',
    description: 'Jelajahi tumbuhan indah dan cara mereka tumbuh!',
    icon: BookOpen,
    color: 'text-green-600',
    bgColor: 'bg-green-50 dark:bg-green-950',
    image: '/images/plants.jpg',
    lessons: [
      {
        id: 'photosynthesis',
        title: 'Fotosintesis',
        content: 'Fotosintesis adalah cara tumbuhan membuat makanan sendiri menggunakan cahaya matahari, air, dan udara.',
        keyPoints: [
          'Menggunakan energi dari matahari',
          'Mengambil air dari tanah',
          'Mengambil karbon dioksida dari udara',
          'Menghasilkan makanan dan oksigen'
        ],
        funFact: 'Tanpa tumbuhan, kita tidak bisa bernapas! Tumbuhan menghasilkan oksigen yang kita butuhkan.'
      },
      {
        id: 'flowers',
        title: 'Bunga-bunga Indah',
        content: 'Bunga adalah bagian dari tumbuhan yang cantik. Mereka punya warna-warni yang mempesona dan aroma yang harum!',
        keyPoints: [
          'Memiliki kelopak yang berwarna-warni',
          'Atraktif bagi serangga untuk penyerbukan',
          'Aroma harum untuk menarik perhatian',
          'Berkembang menjadi buah setelah penyerbukan'
        ],
        funFact: 'Rafflesia Arnoldi adalah bunga terbesar di dunia! Diameternya bisa mencapai 1 meter.'
      },
      {
        id: 'trees',
        title: 'Pohon-pohon Rindang',
        content: 'Pohon adalah tumbuhan besar yang punya batang kayu kuat, cabang, dan daun. Memberikan manfaat besar bagi kita!',
        keyPoints: [
          'Batang kokoh dari kayu',
          'Daun-daun hijau rindang',
          'Memberikan keteduhan dan udara segar',
          'Habitat bagi berbagai hewan'
        ],
        funFact: 'Pohon tertinggi di dunia adalah Pohon Raksasa Redwood, tingginya lebih dari 100 meter!'
      }
    ]
  },
  {
    id: 'space',
    title: 'Alam Semesta',
    description: 'Temukan rahasia planet, bintang, dan angkasa!',
    icon: Star,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50 dark:bg-purple-950',
    image: '/images/space.jpg',
    lessons: [
      {
        id: 'solar-system',
        title: 'Tata Surya',
        content: 'Tata Surya adalah keluarga besar kita di angkasa, dengan Matahari sebagai bapaknya dan planet-planet sebagai anak-anaknya!',
        keyPoints: [
          'Matahari adalah bintang di tengah',
          '8 planet mengelilingi Matahari',
          'Planet kita adalah Bumi, satu-satunya dengan kehidupan',
          'Ada asteroid, komet, dan satelit alami'
        ],
        funFact: 'Satu hari di Venus lebih lama dari satu tahun di Venus! Venus berputar sangat lambat.'
      },
      {
        id: 'planets',
        title: 'Planet-planet',
        content: 'Ada 8 planet di Tata Surya kita, masing-masing dengan keunikan yang menakjubkan!',
        keyPoints: [
          'Merkurius: Planet terkecil dan terpanas',
          'Bumi: Rumah kita dengan kehidupan',
          'Jupiter: Planet terbesar dengan Bintik Merah',
          'Saturnus: Punya cincin yang indah'
        ],
        funFact: 'Saturnus punya cincin yang terbuat dari jutaan potongan es dan batuan!'
      },
      {
        id: 'stars',
        title: 'Bintang Berkelip',
        content: 'Bintang adalah bola gas raksasa yang menghasilkan cahaya sendiri. Matahari kita adalah bintang terdekat!',
        keyPoints: [
          'Menghasilkan cahaya sendiri',
          'Terdiri dari gas panas',
          'Bintang berbeda-beda ukurannya',
          'Konstelasi membentuk gambar di langit'
        ],
        funFact: 'Cahaya dari bintang yang kita lihat di langit malam mungkin sudah berumur ratusan tahun!'
      }
    ]
  }
];

// Kuis untuk setiap topik
const quizzes: Record<string, Quiz[]> = {
  animals: [
    {
      question: 'Hewan menyusui memberi makan anaknya dengan apa?',
      options: ['Air susu induk', 'Daun-daunan', 'Serangga', 'Air hujan'],
      correctIndex: 0,
      explanation: 'Betul! Hewan menyusui memberi makan anaknya dengan air susu dari induknya.'
    },
    {
      question: 'Burung apa yang tidak bisa terbang tapi pandai berenang?',
      options: ['Elang', 'Penguin', 'Merpati', 'Ayam'],
      correctIndex: 1,
      explanation: 'Pintar! Penguin adalah burung yang tidak bisa terbang tapi sangat pandai berenang di air dingin.'
    },
    {
      question: 'Apa yang digunakan ikan untuk bernapas?',
      options: ['Paru-paru', 'Mulut', 'Insang', 'Hidung'],
      correctIndex: 2,
      explanation: 'Tepat sekali! Ikan bernapas menggunakan insang yang ada di samping kepala.'
    }
  ],
  plants: [
    {
      question: 'Apa yang dihasilkan tumbuhan melalui fotosintesis?',
      options: ['Makanan dan oksigen', 'Air dan karbon dioksida', 'Matahari dan tanah', 'Angin dan hujan'],
      correctIndex: 0,
      explanation: 'Hebat! Tumbuhan membuat makanan dan oksigen melalui fotosintesis dengan bantuan cahaya matahari.'
    },
    {
      question: 'Apa fungsi bunga yang berwarna-warni?',
      options: ['Untuk membuat tumbuhan tinggi', 'Untuk menarik serangga', 'Untuk membuat air', 'Untuk melindungi akar'],
      correctIndex: 1,
      explanation: 'Benar! Bunga yang cantik menarik serangga untuk membantu penyerbukan.'
    },
    {
      question: 'Mengapa pohon penting bagi kita?',
      options: ['Hanya untuk cantik', 'Memberi keteduhan dan oksigen', 'Untuk dijadikan mainan', 'Tidak penting'],
      correctIndex: 1,
      explanation: 'Kamu pintar! Pohon memberi kita keteduhan, udara segar, dan oksigen yang diperlukan untuk hidup.'
    }
  ],
  space: [
    {
      question: 'Berapa banyak planet di Tata Surya kita?',
      options: ['5 planet', '6 planet', '8 planet', '10 planet'],
      correctIndex: 2,
      explanation: 'Tepat! Ada 8 planet di Tata Surya: Merkurius, Venus, Bumi, Mars, Jupiter, Saturnus, Uranus, dan Neptunus.'
    },
    {
      question: 'Apa di tengah Tata Surya?',
      options: ['Bumi', 'Matahari', 'Bulan', 'Bintang'],
      correctIndex: 1,
      explanation: 'Betul! Matahari adalah bintang di tengah Tata Surya dan semua planet mengelilinginya.'
    },
    {
      question: 'Planet mana yang punya cincin yang indah?',
      options: ['Bumi', 'Mars', 'Saturnus', 'Merkurius'],
      correctIndex: 2,
      explanation: 'Hebat! Saturnus punya cincin yang sangat indah terbuat dari es dan batuan.'
    }
  ]
};

type ViewState = 'home' | 'lessons' | 'lesson-detail' | 'quiz';

export default function Home() {
  const [view, setView] = useState<ViewState>('home');
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  // Kembali ke home
  const handleBack = () => {
    setView('home');
    setSelectedTopic(null);
    setSelectedLesson(null);
    setCurrentQuizIndex(0);
    setScore(0);
    setQuizCompleted(false);
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  // Pilih topik
  const handleSelectTopic = (topic: Topic) => {
    setSelectedTopic(topic);
    setView('lessons');
  };

  // Pilih pelajaran
  const handleSelectLesson = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setView('lesson-detail');
  };

  // Mulai kuis
  const handleStartQuiz = () => {
    setCurrentQuizIndex(0);
    setScore(0);
    setQuizCompleted(false);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setView('quiz');
  };

  // Jawab kuis
  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);

    const currentQuizzes = quizzes[selectedTopic?.id || ''];
    const currentQuiz = currentQuizzes[currentQuizIndex];

    if (answerIndex === currentQuiz.correctIndex) {
      setScore(score + 10);
    }
  };

  // Lanjut ke soal berikutnya
  const handleNextQuestion = () => {
    const currentQuizzes = quizzes[selectedTopic?.id || ''];
    if (currentQuizIndex < currentQuizzes.length - 1) {
      setCurrentQuizIndex(currentQuizIndex + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizCompleted(true);
    }
  };

  // Render halaman home
  const renderHome = () => (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-yellow-50 to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <header className="relative overflow-hidden bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 dark:from-purple-900 dark:via-blue-900 dark:to-indigo-900 text-white py-16 md:py-24">
        <div className="absolute inset-0 bg-black/10" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white/20 rounded-full backdrop-blur-sm animate-bounce">
              <Zap className="w-5 h-5" />
              <span className="text-sm md:text-base font-semibold">Belajar IPA Jadi Seru!</span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight drop-shadow-lg">
              Dunia Sains untuk
              <br />
              <span className="text-yellow-300">Anak-anak Cerdas</span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl mb-8 max-w-2xl mx-auto font-medium drop-shadow-md">
              Belajar Ilmu Pengetahuan Alam dengan cara yang menyenangkan! Jelajahi hewan, tumbuhan, dan alam semesta.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-white text-pink-600 hover:bg-yellow-300 hover:text-pink-700 text-lg px-8 py-6 rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-105">
                <Play className="w-5 h-5 mr-2" />
                Mulai Belajar
              </Button>
            </div>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-400/30 rounded-full animate-pulse" />
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-pink-400/30 rounded-full animate-pulse" />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-green-400/30 rounded-full animate-pulse" />
      </header>

      {/* Topics Section */}
      <main className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="text-center mb-12">
          <Badge className="mb-4 text-sm md:text-base px-4 py-2 bg-gradient-to-r from-pink-400 to-purple-400 text-white">
            🎨 Pilih Topik Kesukaanmu!
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-800 dark:text-white">
            Topik Pembelajaran IPA
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Pilih topik yang kamu sukai dan mulai petualangan belajarmu sekarang!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
          {topics.map((topic) => (
            <Card
              key={topic.id}
              className="group cursor-pointer border-2 hover:border-pink-400 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white dark:bg-gray-800"
              onClick={() => handleSelectTopic(topic)}
            >
              <div className="relative overflow-hidden">
                <div className={`aspect-video w-full ${topic.bgColor} flex items-center justify-center`}>
                  <topic.icon className={`w-24 h-24 md:w-32 md:h-32 ${topic.color} group-hover:scale-110 transition-transform duration-300`} />
                </div>
                <Badge className="absolute top-4 right-4 bg-white text-gray-800 dark:text-gray-900 text-sm">
                  {topic.lessons.length} Pelajaran
                </Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white group-hover:text-pink-600 transition-colors">
                  {topic.title}
                </CardTitle>
                <CardDescription className="text-base md:text-lg text-gray-600 dark:text-gray-300">
                  {topic.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white font-semibold py-6 text-base md:text-lg rounded-xl transition-all group-hover:scale-105">
                  Mulai Belajar
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Fun Facts Section */}
        <div className="mt-16 bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 rounded-3xl p-8 md:p-12 text-white shadow-2xl">
          <div className="text-center">
            <Trophy className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-6 animate-bounce" />
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
              🎉 Tips Belajar yang Menyenangkan
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 text-left">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6">
                <Star className="w-10 h-10 mb-3 text-yellow-300" />
                <h4 className="text-xl font-bold mb-2">Belajar di Waktu Favorit</h4>
                <p className="text-base md:text-lg opacity-90">Pilih waktu ketika kamu paling semangat dan tidak mengantuk!</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6">
                <Zap className="w-10 h-10 mb-3 text-yellow-300" />
                <h4 className="text-xl font-bold mb-2">Praktek yang Seru</h4>
                <p className="text-base md:text-lg opacity-90">Coba lakukan eksperimen sederhana di rumah dengan bantuan orang tua!</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6">
                <BookOpen className="w-10 h-10 mb-3 text-yellow-300" />
                <h4 className="text-xl font-bold mb-2">Tanya Banyak Hal</h4>
                <p className="text-base md:text-lg opacity-90">Jangan takut bertanya! Semakin banyak pertanyaan, semakin banyak pengetahuan!</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 dark:from-purple-900 dark:via-blue-900 dark:to-indigo-900 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-base md:text-lg font-medium">
            🌟 Dibuat dengan ❤️ untuk siswa SD yang cerdas dan penasaran! 🌟
          </p>
        </div>
      </footer>
    </div>
  );

  // Render halaman lessons
  const renderLessons = () => (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-yellow-50 to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <header className={`bg-gradient-to-r from-pink-400 to-purple-400 dark:from-purple-900 dark:to-blue-900 text-white py-8 md:py-12`}>
        <div className="container mx-auto px-4 md:px-6">
          <Button
            onClick={handleBack}
            variant="outline"
            className="mb-6 bg-white/20 border-white text-white hover:bg-white/30 hover:text-white transition-all"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali
          </Button>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{selectedTopic?.title}</h1>
          <p className="text-lg md:text-xl opacity-90">{selectedTopic?.description}</p>
        </div>
      </header>

      <main className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="mb-8 flex flex-wrap gap-4 justify-center">
          <Button
            onClick={() => setView('quiz')}
            size="lg"
            className="bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-white text-lg px-8 py-6 rounded-full shadow-xl transition-all hover:scale-105"
          >
            <Trophy className="w-5 h-5 mr-2" />
            Mulai Kuis
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {selectedTopic?.lessons.map((lesson, index) => (
            <Card
              key={lesson.id}
              className="cursor-pointer border-2 hover:border-pink-400 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white dark:bg-gray-800"
              onClick={() => handleSelectLesson(lesson)}
            >
              <CardHeader>
                <Badge className="mb-3 w-fit bg-gradient-to-r from-pink-400 to-purple-400 text-white text-sm">
                  Pelajaran {index + 1}
                </Badge>
                <CardTitle className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white hover:text-pink-600 transition-colors">
                  {lesson.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 line-clamp-3">
                  {lesson.content}
                </p>
                <Button className="w-full mt-4 bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white font-semibold">
                  Baca Materi
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );

  // Render halaman lesson detail
  const renderLessonDetail = () => (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-yellow-50 to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <header className={`bg-gradient-to-r from-pink-400 to-purple-400 dark:from-purple-900 dark:to-blue-900 text-white py-8 md:py-12`}>
        <div className="container mx-auto px-4 md:px-6">
          <Button
            onClick={() => setView('lessons')}
            variant="outline"
            className="mb-6 bg-white/20 border-white text-white hover:bg-white/30 hover:text-white transition-all"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali
          </Button>
          <Badge className="mb-4 bg-white text-gray-800 dark:text-gray-900 text-sm md:text-base">
            {selectedTopic?.title}
          </Badge>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">{selectedLesson?.title}</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 md:px-6 py-8 md:py-12 max-w-4xl">
        <Card className="bg-white dark:bg-gray-800 shadow-2xl">
          <CardContent className="p-6 md:p-8">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                {selectedLesson?.content}
              </p>

              <div className="bg-gradient-to-r from-pink-50 to-purple-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6 mb-8">
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                  <Star className="w-6 h-6 text-yellow-500" />
                  Poin Penting
                </h3>
                <ul className="space-y-3">
                  {selectedLesson?.keyPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-3 text-base md:text-lg text-gray-700 dark:text-gray-300">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-2xl p-6 border-2 border-yellow-300 dark:border-yellow-700">
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                  <Zap className="w-6 h-6 text-orange-500" />
                  Fakta Seru
                </h3>
                <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 italic">
                  "{selectedLesson?.funFact}"
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );

  // Render halaman kuis
  const renderQuiz = () => {
    const currentQuizzes = quizzes[selectedTopic?.id || ''];
    const currentQuiz = currentQuizzes[currentQuizIndex];
    const progress = ((currentQuizIndex + 1) / currentQuizzes.length) * 100;

    if (quizCompleted) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-yellow-50 to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4 md:p-8">
          <Card className="bg-white dark:bg-gray-800 shadow-2xl max-w-2xl w-full">
            <CardContent className="p-8 md:p-12 text-center">
              <div className="mb-8">
                <Trophy className="w-24 h-24 mx-auto text-yellow-500 mb-6 animate-bounce" />
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
                  Kuis Selesai! 🎉
                </h2>
                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-2">
                  Nilai kamu:
                </p>
                <div className="text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent mb-6">
                  {score}
                </div>
                <div className="bg-gradient-to-r from-green-400 to-blue-400 text-white rounded-2xl p-6 mb-8">
                  <p className="text-lg md:text-xl font-semibold">
                    {score === currentQuizzes.length * 10
                      ? '🌟 Sempurna! Kamu hebat sekali!'
                      : score >= currentQuizzes.length * 10 * 0.7
                      ? '👍 Bagus sekali! Terus belajar!'
                      : '💪 Jangan menyerah! Coba lagi!'}
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={handleStartQuiz}
                  size="lg"
                  className="bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white text-lg px-8 py-6 rounded-full"
                >
                  Coba Lagi
                </Button>
                <Button
                  onClick={() => setView('lessons')}
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6 rounded-full border-2 border-pink-400 text-pink-600 hover:bg-pink-50"
                >
                  Kembali ke Materi
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-yellow-50 to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <Button
            onClick={() => setView('lessons')}
            variant="outline"
            className="mb-6 border-2 border-pink-400 text-pink-600 hover:bg-pink-50 transition-all"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali
          </Button>

          <Card className="bg-white dark:bg-gray-800 shadow-2xl">
            <CardHeader className="p-6 md:p-8">
              <div className="flex items-center justify-between mb-4">
                <Badge className="bg-gradient-to-r from-pink-400 to-purple-400 text-white text-sm md:text-base">
                  Soal {currentQuizIndex + 1} dari {currentQuizzes.length}
                </Badge>
                <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-sm md:text-base">
                  Skor: {score}
                </Badge>
              </div>
              <Progress value={progress} className="h-3 mb-6" />
            </CardHeader>

            <CardContent className="p-6 md:p-8">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white mb-8">
                {currentQuiz.question}
              </h2>

              <div className="space-y-4">
                {currentQuiz.options.map((option, index) => (
                  <Button
                    key={index}
                    onClick={() => !showExplanation && handleAnswer(index)}
                    disabled={showExplanation}
                    variant="outline"
                    className={`w-full text-left text-base md:text-lg py-4 md:py-6 px-6 h-auto justify-start transition-all ${
                      showExplanation
                        ? index === currentQuiz.correctIndex
                          ? 'bg-green-100 border-green-500 text-green-800 dark:bg-green-900 dark:border-green-400 dark:text-green-100'
                          : selectedAnswer === index
                          ? 'bg-red-100 border-red-500 text-red-800 dark:bg-red-900 dark:border-red-400 dark:text-red-100'
                          : 'opacity-50'
                        : 'hover:border-pink-400 hover:bg-pink-50 dark:hover:bg-pink-900/20'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                        showExplanation && index === currentQuiz.correctIndex
                          ? 'bg-green-500 text-white'
                          : showExplanation && selectedAnswer === index && index !== currentQuiz.correctIndex
                          ? 'bg-red-500 text-white'
                          : 'bg-gray-200 dark:bg-gray-700'
                      }`}>
                        {showExplanation && index === currentQuiz.correctIndex ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : showExplanation && selectedAnswer === index && index !== currentQuiz.correctIndex ? (
                          <XCircle className="w-5 h-5" />
                        ) : (
                          String.fromCharCode(65 + index)
                        )}
                      </div>
                      <span>{option}</span>
                    </div>
                  </Button>
                ))}
              </div>

              {showExplanation && (
                <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6 border-2 border-blue-300 dark:border-blue-700">
                  <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 font-medium">
                    {currentQuiz.explanation}
                  </p>
                  <Button
                    onClick={handleNextQuestion}
                    className="mt-4 w-full bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 text-white text-lg py-6 rounded-xl"
                  >
                    {currentQuizIndex < currentQuizzes.length - 1 ? 'Soal Selanjutnya' : 'Lihat Hasil'}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  // Render berdasarkan view state
  const renderContent = () => {
    switch (view) {
      case 'home':
        return renderHome();
      case 'lessons':
        return renderLessons();
      case 'lesson-detail':
        return renderLessonDetail();
      case 'quiz':
        return renderQuiz();
      default:
        return renderHome();
    }
  };

  return <>{renderContent()}</>;
}

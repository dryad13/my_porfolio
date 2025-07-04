import React, { useEffect, useState, useRef } from 'react';
import { ChevronDown, Mail, Github, Linkedin, ExternalLink, ChevronLeft, ChevronRight, X, Instagram } from 'lucide-react';
import Star from './components/StarField';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StarOnly from './pages/StarOnly';
import { useSwipeable } from 'react-swipeable';

// Main App Component
function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    document.fonts.load('1em "ethnocentric"').then(() => {
      setFontLoaded(true);
    });
  }, []);

  if (!fontLoaded) {
    // Optionally show a loading spinner or blank screen
    return <div style={{ background: "black", height: "100vh" }} />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainApp />} />
        <Route path="/stars" element={<StarOnly />} />
      </Routes>
    </Router>
  );
}

function MainApp() {
  // State for tracking active navigation section
  const [activeSection, setActiveSection] = useState('hero');
  // State for the current slide in the projects carousel
  const [currentSlide, setCurrentSlide] = useState(0);
  // State to manage the currently open project modal
  const [modalProject, setModalProject] = useState<any>(null);
  // Add state for AWS modal
  const [awsModalOpen, setAwsModalOpen] = useState(false);
  // Add state for Meta Business Suite modal
  const [mbsModalOpen, setMbsModalOpen] = useState(false);
  // Add state for mobile about section
  const [showMobileAbout, setShowMobileAbout] = useState(false);
  // About Me mobile animation: 0 = none, 1 = para1, 2 = para2, 3 = all
  const [revealedPara, setRevealedPara] = useState(0);
  const revealTimeouts = useRef<number[]>([]);
  const mobileAboutRef = useRef<HTMLDivElement>(null);
  const lastInView = useRef(false);
  // Toolkit quadrant animation state
  const [toolkitInView, setToolkitInView] = useState(false);
  const toolkitRef = useRef<HTMLDivElement>(null);
  // State for Star Wars intro animation
  const [showIntro, setShowIntro] = useState(true);
  const [currentLine, setCurrentLine] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  const introTexts = [
    "Hi!",
    "I'm Ally Abdullah",
    "Welcome to my portfolio."
  ];

  // Effect for handling scroll-based animations and active navigation highlighting
  useEffect(() => {
    // Function to determine which section is currently in view
    const handleScroll = () => {
      const sections = ['hero', 'about', 'projects', 'skills', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    // Intersection Observer for fade-in animations on scroll
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -20% 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach((el) => observer.observe(el));

    // Add scroll event listener and call handler initially
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // Cleanup function to remove event listeners
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const aboutSection = document.getElementById('about');
      if (!aboutSection) return;
      const rect = aboutSection.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      // Reveal container when the section is at least halfway into the viewport
      const inView = rect.top < windowHeight / 2 && rect.bottom > windowHeight / 4;
      setShowMobileAbout(inView);
      if (inView && !lastInView.current) {
        // Section just came into view
        revealTimeouts.current.forEach(clearTimeout);
        revealTimeouts.current = [];
        setRevealedPara(0);
        revealTimeouts.current.push(window.setTimeout(() => setRevealedPara(1), 0));
        revealTimeouts.current.push(window.setTimeout(() => setRevealedPara(2), 200));
        revealTimeouts.current.push(window.setTimeout(() => setRevealedPara(3), 400));
      } else if (!inView && lastInView.current) {
        // Section just went out of view
        revealTimeouts.current.forEach(clearTimeout);
        revealTimeouts.current = [];
        setRevealedPara(0);
      }
      lastInView.current = inView;
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      revealTimeouts.current.forEach(clearTimeout);
    };
  }, []);

  // Function to smoothly scroll to a section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Data for the skills section
  const skills = {
    'E-commerce & Strategy': [
      
      { name: 'Shopify (Expert)', rating: 10 },
      { name: 'Digital Strategy', rating: 9 },
      { name: 'E-commerce Management', rating: 9 },
      { name: 'Go-to-Market Planning', rating: 8 },
      { name: 'Operations & Fulfillment', rating: 8 },
      
    ],
    'AI & Data Science': [
      { name: 'Generative AI (Learning)', rating: 7 },
      { name: 'Prompt Engineering (Learning)', rating: 7 },
      { name: 'Context Engineering (Learning)', rating: 6 },
      { name: 'Financial Modeling', rating: 5 },
      { name: 'Data Analysis (Python, Pandas)(Learning)', rating:4 },
      { name: 'Deep Learning (PyTorch/TensorFlow)(Learning)', rating: 4 },
      
      
    ],
    'Digital Marketing': [
      { name: 'Meta Ads', rating: 9 },
      { name: 'Meta Business Suite', rating: 8 },
      { name: 'Social Media Marketing', rating: 8 },
      { name: 'Google Ads', rating: 6 },
      { name: 'Google Analytics', rating: 6 },
      { name: 'Google Search Console', rating: 6 },
      { name: 'Google Tag Manager', rating: 6 },
      { name: 'SEO', rating: 6 },
    ],
    'Development': [
      { name: 'AWS (Certified)', rating: 8 },{ name: 'Python', rating: 8 },{ name: 'Java', rating: 7 },{ name: 'JavaScript', rating: 7 },{ name: 'Git/GitHub', rating: 7 },
      { name: 'CSS3', rating: 6 },
      { name: 'HTML5', rating: 6 },
    ]
  };

  // UPDATED projects data with detailed descriptions and live links
  const projects = [
    {
      title: 'Daak and Co.',
      description: 'Led the e-commerce strategy that scaled this fashion brand to over 4M+ PKR in revenue.',
      images: {
        landscape: '/images/dcfin.jpg',
        portrait: '/images/dcfin.jpg',
      },
      hasLiveLink: true,
      liveLink: 'https://daakandco.com',
      detailedDescription: 'As the technical and strategic lead for Daak and Co., I orchestrated a complete digital transformation, building their Shopify presence from the ground up. My role involved implementing advanced analytics for data-driven marketing, optimizing conversion funnels for a high-end fashion audience, and executing a robust SEO strategy. I successfully managed the technical execution of five major collection launches, ensuring 100% uptime during peak traffic, and coordinated with suppliers for a seamless inventory and fulfillment pipeline. This project showcases my ability to merge technical development with high-level business strategy to achieve significant, measurable revenue growth.'
    },
    {
      title: 'Relaxa Store',
      description: 'Executed a freelance build for a direct-to-consumer brand in the wellness tech space, focusing on massage guns.',
      images: {
        landscape: '/images/Frame1.jpg',
        portrait: '/images/Frame1.jpg',
      },
      hasLiveLink: true,
      liveLink: 'https://relaxastore.com',  
      demoVideo: 'https://youtu.be/nVitBYl2ssA',
      detailedDescription: 'As a freelance developer, I was tasked with creating a complete e-commerce solution for Relaxa Store, a brand specializing in high-performance massage guns. The primary challenge was to build a site that not only looked modern and tech-focused but also conveyed trust and authority in the health and wellness space. My role involved a full Shopify build, focusing on a clean UI that effectively showcased the product\'s technical specifications, benefits, and usage through high-quality imagery and embedded video tutorials. I implemented a streamlined, single-product-focused funnel to maximize conversion rates for this niche gadget.'
    },
    {
      title: 'Primade',
      description: 'Led the go-to-market strategy, managing paid social campaigns and co-directing a DVC.',
      images: {
        landscape: '/images/prifin.jpg',
        portrait: '/images/prifin.jpg',
      },
      hasLiveLink: true,
      liveLink: 'https://drinkprimade.com',
      demoVideo: 'https://youtu.be/wyHYw2gC9s8',
      detailedDescription: 'After building their Shopify store, I was contracted to orchestrate a comprehensive go-to-market strategy for Primade. This involved competitive analysis, market research, and multi-channel campaign execution. I managed a significant budget across Meta platforms (Facebook/Instagram), achieving a 3.2x ROAS while establishing initial brand awareness in the competitive F&B market. My role also included co-directing their launch DVC, showcasing my ability in creative strategy and production oversight.'
    },
    {
      title: 'Popcorn Media (Freelance)',
      description: 'Provided custom development and maintenance for high-profile fashion clients of a digital agency.',
      images: {
        landscape: '/images/sxi.jpg',
        portrait: '/images/sxi.jpg',
      },
      hasLiveLink: true,
      links: [
        { label: 'Shaad Fabrics', url: 'https://shaadfabrics.com' },
        { label: 'Ivar Clothing', url: 'https://ivarclothing.com' }
      ],
      
      detailedDescription: 'As a specialist contractor for Popcorn Media, I provided technical expertise for their premium fashion clients, Ivar Clothing and Shaad Fabrics. My responsibilities included developing custom Shopify Liquid templates for unique page layouts, implementing complex product filtering systems with Shopify Metafields, and maintaining site performance under heavy traffic loads during sales events. This role highlights my ability to collaborate effectively with agencies and deliver for established brands.'
    },
    {
      title: 'Insurgo',
      description: 'Co-founded a venture to provide end-to-end e-commerce solutions for a diverse client portfolio.',
      images: {
        landscape: '/images/Group4.jpg',
        portrait: '/images/Group4.jpg',
      },
      hasLiveLink: false,
      detailedDescription: 'As Co-founder and Head of E-commerce, I built Insurgo from a concept into a full-service agency. I was responsible for business development, client acquisition, and creating the operational framework. We developed scalable systems for managing multiple concurrent projects across diverse industries, from initial brand strategy and Shopify development to post-launch marketing and fulfillment operations. This venture demonstrates my leadership, entrepreneurial drive, and ability to deliver comprehensive e-commerce solutions.'
    },
    {
      title: 'BabuBazaarpk',
      description: 'Built a vibrant, product-focused UI for a new consumer goods brand of custom tumblers.',
      images: {
        landscape: '/images/bb.jpg',
        portrait: '/images/bb.jpg',
      },
      hasLiveLink: true,
      liveLink: 'https://babubazaarpk.com',
      demoVideo: 'https://youtu.be/7u9aMOdh_-w',
      detailedDescription: 'I created a youth-focused e-commerce platform for Sipsters, emphasizing product customization and social sharing features. A key part of this project was implementing an advanced product configurator allowing users to visualize their custom designs. By integrating social proof elements and optimizing the mobile checkout process, we achieved a 25% increase in conversion rates post-launch.'
    },
    {
      title: 'Ensensity',
      description: 'Developed a premium Shopify store for a wellness and perfume brand with a focus on clean UX.',
      images: {
        landscape: '/images/ens.jpg',
        portrait: '/images/ens.jpg',
      },
      hasLiveLink: false,
      demoVideo: 'https://youtu.be/z_lFBH2yRHY',
      detailedDescription: 'For Ensensity, I designed and developed a premium e-commerce experience focused on sensory storytelling and brand immersion. The project involved deep theme customization, implementing custom product visualization features, and optimizing for mobile-first performance. The intuitive navigation system I architected led to a 40% increase in user engagement and session duration, highlighting my skills in UX/UI design for niche markets.'
    },
    
    {
      title: 'Variety Centre',
      description: 'Digitized an established, multi-outlet toy store by creating their first-ever e-commerce sales channel.',
      images: {
        landscape: '/images/varietycentre.jpg',
        portrait: '/images/varietycentre.jpg',
      },
      hasLiveLink: false,
      detailedDescription: 'This project focused on the digital transformation of a traditional brick-and-mortar retailer. I managed the complex process of cataloging hundreds of SKUs, architecting a user-friendly site structure for a wide range of product categories, and implementing an inventory management system to synchronize stock between physical and digital storefronts. This demonstrates my ability to bring legacy businesses into the modern e-commerce landscape.'
    },
    {
      title: 'Visual Transformer for LIGO Data',
      description: 'My Final Year Project developing a ViT model to classify gravitational wave data.',
      images: {
        landscape: 'https://images.pexels.com/photos/2156/sky-earth-space-working.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        portrait: 'https://images.pexels.com/photos/2156/sky-earth-space-working.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
      hasLiveLink: false,
      detailedDescription: 'This ongoing research project involves developing a cutting-edge Visual Transformer (ViT) architecture to analyze gravitational wave data from the LIGO observatory. The work includes preprocessing complex time-series data into spectrograms, implementing self-attention mechanisms for pattern recognition, and benchmarking against traditional CNN approaches. This project demonstrates my deep interest and capability in applying state-of-the-art AI to solve complex scientific computing problems.'
    },
    {
      title: 'Financial Simulation Project',
      description: 'Implemented a Monte Carlo simulation to model PSX stock outcomes with parallel programming.',
      images: {
        landscape: 'https://images.pexels.com/photos/186461/pexels-photo-186461.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        portrait: 'https://images.pexels.com/photos/186461/pexels-photo-186461.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
      hasLiveLink: false,
      links: [
        { label: 'Ticker Correlation Matrix', url: 'https://docs.google.com/spreadsheets/d/1F9dhyy1frSgQCNXaZ6Q82iplTDskzFG3AfVHNFJj6Sg/edit?usp=sharing' },
        { label: 'Sequential Monte Carlo (Colab)', url: 'https://colab.research.google.com/drive/1jJtB2mng7OTfNSmfimcRTEsezYN_VGo_?usp=sharing' },
        { label: 'Parallel Monte Carlo (Colab)', url: 'https://colab.research.google.com/drive/1aB-IHsYLcBXzotIhX_tnwGQGOUO4zAPL?usp=sharing' }
      ],
      detailedDescription: 'I built a sophisticated Monte Carlo simulation engine in Python for modeling Pakistan Stock Exchange (PSX) outcomes. A key achievement was implementing parallel processing algorithms which resulted in a 10x performance improvement over sequential implementations. This project showcases my skills in computational finance (FinTech), statistical modeling, and high-performance computing.'
    },
    {
      title: 'IoT Network Design Project',
      description: 'Designed an IoT security and automated fire suppression system in Cisco Packet Tracer.',
      images: {
        landscape: 'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        portrait: 'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
      hasLiveLink: false,
      detailedDescription: 'For my networking course, I architected a comprehensive IoT security system integrating fire detection, automated suppression, and real-time monitoring. I designed the network topology for optimal redundancy and low latency, implemented security protocols for device authentication, and created automated response workflows. This project highlights my skills in system architecture and IoT network design.'
    },
    {
      title: 'Smart AI Irrigation Bot',
      description: 'Led hardware development and sensor integration for an Arduino-based smart irrigation bot.',
      images: {
        landscape: '/images/RTIS.jpg',
        portrait: '/images/RTIS.jpg',
      },
      hasLiveLink: false,
      detailedDescription: 'This project involved building an intelligent irrigation system using an Arduino microcontroller. I was responsible for the complete hardware lifecycle: selecting soil moisture and weather sensors, designing the circuitry, and integrating all components. I also contributed to the control logic that used sensor data to create predictive watering schedules. This project demonstrates my hands-on skills in embedded systems and hardware-software integration.'
    }
  ];

  // Carousel navigation functions
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Modal functions
  const openModal = (project: any) => {
    setModalProject(project);
  };

  const closeModal = () => {
    setModalProject(null);
  };

  // Add swipe handlers
  const swipeHandlers = useSwipeable({
    onSwipedLeft: nextSlide,
    onSwipedRight: prevSlide,
    trackMouse: true,
  });

  // Auto-slide carousel every 2.5 seconds unless modal is open
  useEffect(() => {
    if (modalProject) return; // Pause auto-slide when modal is open
    const interval = setInterval(() => {
      nextSlide();
    }, 2500);
    return () => clearInterval(interval);
  }, [currentSlide, modalProject]);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setToolkitInView(true);
        else setToolkitInView(false);
      },
      { threshold: 0.2 }
    );
    if (toolkitRef.current) observer.observe(toolkitRef.current);
    return () => observer.disconnect();
  }, []);

  // Star Wars style intro animation
  useEffect(() => {
    if (!showIntro) return;
    
    // Star Wars theme sound effect
    const playStarWarsSound = () => {
      try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // Star Wars style sound - lower frequency sweep
        oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.3);
        
        gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
      } catch (error) {
        // Ignore audio errors
      }
    };
    
    // Play sound for each line
    playStarWarsSound();
    
    // Complete the intro after all animations finish
    const totalDuration = introTexts.length * 600 + 2000; // 600ms delay per line + 2s animation
    const timer = setTimeout(() => {
      setShowIntro(false);
      // Scroll to top when intro completes
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, totalDuration);
    
    return () => clearTimeout(timer);
  }, [showIntro]);

  // Ensure page starts at top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <>
      {/* Starfield background always visible */}
      <Star />
      {/* Star Wars Style Intro Animation */}
      {showIntro && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center overflow-hidden">
          <div className="star-wars-container relative w-full h-full flex items-center justify-center">
            {/* Star Wars angled text effect */}
            <div className="star-wars-text text-center transform perspective-1000">
              {introTexts.map((text, lineIndex) => (
                <div 
                  key={lineIndex}
                  className="star-wars-line font-ethnocentric text-4xl md:text-6xl lg:text-8xl mb-8 animate-star-wars"
                  style={{
                    fontFamily: 'ethnocentric, monospace',
                    color: '#06b6d4',
                    textShadow: '0 0 20px #06b6d4, 0 0 40px #06b6d4',
                    animationDelay: `${lineIndex * 600}ms`,
                    transformStyle: 'preserve-3d'
                  }}
                >
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* Main UI fades in after intro */}
      <div className={`transition-opacity duration-700 ${showIntro ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <div className="gradient-bg min-h-screen text-white">
          {/* Navigation */}
          <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
            <div className="glass-nav px-6 py-3">
              <div className="flex space-x-8">
                {[
                  { id: 'hero', label: 'Home' },
                  { id: 'about', label: 'About' },
                  { id: 'projects', label: 'Projects' },
                  { id: 'skills', label: 'Skills' },
                  { id: 'contact', label: 'Contact' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`text-sm font-medium transition-colors duration-300 hover:text-cyan-400 ${
                      activeSection === item.id ? 'text-cyan-400' : 'text-white/80'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </nav>
          

          {/* Hero Section */}
          <section id="hero" className="min-h-screen flex flex-col items-center justify-center px-4">
            <div className="text-center max-w-4xl mx-auto flex flex-col items-center justify-center">
              <h1 className="hero-text gradient-heading w-full max-w-full break-words text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-6 fade-in font-ethnocentric text-center px-2">
                Ally Abdullah
              </h1>
              <h2 className="text-xl md:text-2xl font-semibold mb-8 text-white/90 fade-in stagger-1">
                E-commerce Lead scaling brands to 4M+ PKR | Shopify Development | Digital Strategy & Marketing
              </h2>
              <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-12 text-white/80 fade-in stagger-2">
                I build robust digital experiences that bridge the gap between complex technology and real-world business growth. Currently pivoting my focus towards the future of Generative AI.
              </p>
              <button 
                onClick={() => scrollToSection('projects')}
                className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 accent-glow fade-in stagger-3"
              >
                View My Work
              </button>
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="py-20 px-4">
            <div className="max-w-4xl mx-auto">
              <div className="glass-panel p-8 md:p-12 relative fade-in text-center">
                <h2 className="gradient-heading text-4xl md:text-5xl font-bold mb-8 text-center font-ethnocentric">About Me</h2>
                <div className="relative flex flex-col justify-center items-center mt-6 mb-0">
                  <img
                    src="/images/me&sun.jpg"
                    alt="Looking at the sunset on the beach"
                    className="rounded-xl shadow-lg w-full max-w-full object-contain min-h-[200px]"
                  />
                  {/* Overlay for desktop/tablet only */}
                  <div className="absolute inset-0 flex flex-col justify-center items-center px-2 md:px-8 hidden md:flex" style={{ transform: 'translateY(-20%)' }}>
                    <div className="text-black font-bold text-base md:text-lg text-center w-full max-h-[80%] overflow-y-auto">
                    <p>
                        As a Computer Science student, I quickly came to a pivotal realization: my true passion wasn't confined to the elegance of writing code, but was ignited by the challenge of using technology as a powerful tool to build, operate, and grow entire businesses. The theoretical power of algorithms felt most profound when I could see them translate into tangible, real-world outcomes—customer engagement, sales growth, and the establishment of a vibrant brand identity. It was this desire to bridge the gap between abstract logic and concrete market impact that has defined my professional and academic journey.
                    </p>
                      <p className="mt-4">
                        This practical, business-focused experience created a hunger for deeper theoretical knowledge, which I pursued aggressively in my studies at the University of Karachi. My academic projects were a deliberate effort to acquire the firepower needed to solve more complex problems, from implementing a Monte Carlo financial simulation to designing an IoT security system.
                    </p>
                      <p className="mt-4">
                        My formal entry into the world of large-scale AI has been my Final Year Project: developing a Visual Transformer (ViT) model to classify gravitational wave data. This work has been the catalyst for my next professional evolution. My focus is now to pivot and apply this unique blend of skills—from hands-on business scaling to advanced AI/ML research—towards the field of Generative AI.
                      </p>
                    </div>
                  </div>
                  {/* Stacked text for mobile only */}
                  <div ref={mobileAboutRef} className={`block md:hidden text-white md:text-black font-normal text-xs leading-tight text-center mt-4 w-full transition-opacity duration-700 ${showMobileAbout ? 'opacity-100' : 'opacity-0 pointer-events-none select-none'}`}>
                    <p className={`about-para-1 ${revealedPara >= 1 ? 'slide-in-right slide-delay-0' : 'opacity-0'}`}>
                      As a Computer Science student, I quickly came to a pivotal realization: my true passion wasn't confined to the elegance of writing code, but was ignited by the challenge of using technology as a powerful tool to build, operate, and grow entire businesses. The theoretical power of algorithms felt most profound when I could see them translate into tangible, real-world outcomes—customer engagement, sales growth, and the establishment of a vibrant brand identity. It was this desire to bridge the gap between abstract logic and concrete market impact that has defined my professional and academic journey.
                    </p>
                    <p className={`about-para-2 mt-4 ${revealedPara >= 2 ? 'slide-in-left slide-delay-1' : 'opacity-0'}`}>
                      This practical, business-focused experience created a hunger for deeper theoretical knowledge, which I pursued aggressively in my studies at the University of Karachi. My academic projects were a deliberate effort to acquire the firepower needed to solve more complex problems, from implementing a Monte Carlo financial simulation to designing an IoT security system.
                    </p>
                    <p className={`about-para-3 mt-4 ${revealedPara >= 3 ? 'slide-up slide-delay-2' : 'opacity-0'}`}>
                        My formal entry into the world of large-scale AI has been my Final Year Project: developing a Visual Transformer (ViT) model to classify gravitational wave data. This work has been the catalyst for my next professional evolution. My focus is now to pivot and apply this unique blend of skills—from hands-on business scaling to advanced AI/ML research—towards the field of Generative AI.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Projects Carousel Section */}
          <section id="projects" className="py-20 overflow-hidden">
            <div className="w-full mx-auto">
              <h2 className="gradient-heading text-4xl md:text-5xl font-bold text-center mb-16 fade-in font-ethnocentric">
                Selected Works & Case Studies
              </h2>
              
              <div className="relative fade-in h-[700px] md:h-[650px] flex items-center justify-center" {...swipeHandlers}>
                {/* Invisible touch/click boxes for prev/next (outermost 25% each) */}
                <div className="absolute inset-0 flex z-20 pointer-events-none">
                  <button
                    aria-label="Previous Slide Touch Area"
                    onClick={prevSlide}
                    tabIndex={-1}
                    className="w-1/4 h-full bg-transparent outline-none border-none pointer-events-auto"
                    style={{ WebkitTapHighlightColor: 'transparent' }}
                  />
                  <div className="w-1/4 h-full" />
                  <div className="w-1/4 h-full" />
                  <button
                    aria-label="Next Slide Touch Area"
                    onClick={nextSlide}
                    tabIndex={-1}
                    className="w-1/4 h-full bg-transparent outline-none border-none pointer-events-auto"
                    style={{ WebkitTapHighlightColor: 'transparent' }}
                  />
                </div>
                {/* Carousel Track */}
                <div className="relative w-full h-full" style={{ perspective: '2000px' }}>
                  {projects.map((project, index) => {
                    const offset = currentSlide - index;
                    const isCurrent = index === currentSlide;
                    
                    let transformStyle = `translateX(${offset * 100}%) scale(0.7) rotateY(${offset > 0 ? '' : '-'}45deg)`;
                    let opacityStyle = 'opacity-0';
                    let zIndexStyle = 'z-0';

                    if (isCurrent) {
                      transformStyle = 'translateX(0) scale(1) rotateY(0deg)';
                      opacityStyle = 'opacity-100';
                      zIndexStyle = 'z-20';
                    } else if (index === (currentSlide - 1 + projects.length) % projects.length) {
                      transformStyle = 'translateX(-55%) scale(0.8) rotateY(45deg)';
                      opacityStyle = 'opacity-50';
                      zIndexStyle = 'z-10';
                    } else if (index === (currentSlide + 1) % projects.length) {
                      transformStyle = 'translateX(55%) scale(0.8) rotateY(-45deg)';
                      opacityStyle = 'opacity-50';
                      zIndexStyle = 'z-10';
                    }

                    return (
                      <div 
                        key={project.title} 
                        className={`absolute w-full h-full transition-all duration-500 ease-in-out ${opacityStyle} ${zIndexStyle}`}
                        style={{ transform: transformStyle, transformStyle: 'preserve-3d' }}
                      >
                        <div className={`w-full md:w-3/4 lg:w-1/2 h-full mx-auto`}>
                          <div className={`glass-panel p-4 md:p-6 flex flex-col group h-full ${isMobile && isCurrent ? 'glass-panel-bright' : ''} ${isMobile && !isCurrent ? 'glass-panel-dim' : ''}`}>
                              <div className="w-full h-auto rounded-2xl overflow-hidden aspect-[3/4] md:aspect-[16/9] mb-4 max-h-[350px] md:max-h-none mx-auto">
                                  <picture>
                                    <source media="(max-width: 767px)" srcSet={project.images.portrait} />
                                    <img
                                      src={project.images.landscape}
                                      alt={project.title}
                                      className="w-full h-full object-contain transition-transform duration-500 ease-in-out group-hover:scale-105"
                                    />
                                  </picture>
                              </div>
                              <div className="flex flex-col px-2 text-center md:flex-grow">
                                  <h3 className="text-xl md:text-2xl font-bold text-cyan-400 mb-2 text-center font-ethnocentric">{project.title}</h3>
                                  <p className="text-white/80 text-sm md:text-base leading-relaxed mb-4 text-center">
                                  {project.description}
                                  </p>
                              </div>
                              <div className="mt-4 md:mt-auto pt-2 md:pt-4 px-2">
                                  <div className={`flex flex-col md:grid md:gap-4 ${project.hasLiveLink ? 'md:grid-cols-2' : 'md:grid-cols-1 md:place-items-center'} gap-3`}>
                                    {project.links ? (
                                      <div className="col-span-2 w-full">
                                        <button 
                                          onClick={() => openModal(project)}
                                          className="w-full text-sm md:text-base border border-white/30 hover:border-cyan-400 text-white hover:text-cyan-400 font-medium px-4 py-3 rounded-xl transition-colors flex items-center justify-center gap-2 mt-2"
                                        >
                                          <ChevronDown className="w-4 h-4 md:w-5 md:h-5" />
                                          View More
                                        </button>
                                      </div>
                                    ) : (
                                      <>
                                      <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className={`${!project.hasLiveLink && 'hidden'}`}>
                                        <button className="w-full text-sm md:text-base bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-4 py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
                                        <ExternalLink className="w-4 h-4 md:w-5 md:h-5" />
                                        Live Site
                                        </button>
                                      </a>
                                      <button 
                                          onClick={() => openModal(project)}
                                          className="w-full text-sm md:text-base border border-white/30 hover:border-cyan-400 text-white hover:text-cyan-400 font-medium px-4 py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
                                      >
                                          <ChevronDown className="w-4 h-4 md:w-5 md:h-5" />
                                          View More
                                      </button>
                                      </>
                                    )}
                                  </div>
                              </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {/* Navigation Arrows */}
                <button
                  onClick={prevSlide}
                  className="absolute left-0 md:left-12 lg:left-24 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full glass-nav hover:bg-white/20 transition-all duration-300 group"
                  style={{ pointerEvents: 'auto' }}
                >
                  <ChevronLeft className="w-8 h-8 text-white group-hover:text-cyan-400" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-0 md:right-12 lg:right-24 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full glass-nav hover:bg-white/20 transition-all duration-300 group"
                  style={{ pointerEvents: 'auto' }}
                >
                  <ChevronRight className="w-8 h-8 text-white group-hover:text-cyan-400" />
                </button>

                <div className="absolute bottom-[-60px] w-full flex justify-center mt-8 space-x-2">
                  {projects.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                        index === currentSlide 
                          ? 'bg-cyan-400 w-8' 
                          : 'bg-white/30 hover:bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Skills Section */}
          <section id="skills" className="py-20 mt-16 px-4">
            <div className="max-w-5xl mx-auto">
              <div ref={toolkitRef} className="glass-panel p-8 md:p-12 fade-in text-center">
                <h2 className="gradient-heading text-4xl md:text-5xl font-bold text-center mb-12 font-ethnocentric">My Toolkit</h2>
                {/* 2x2 grid for desktop/tablet, 1 column for mobile */}
                <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-8 text-center">
                  {/* Upper Left: E-commerce & Strategy */}
                  <div className={`text-center ${toolkitInView ? 'slide-down' : 'opacity-0'} md:row-start-1 md:col-start-1`}>
                    <h3 className="text-xl font-semibold mb-4 text-cyan-400 text-center font-ethnocentric">E-commerce & Strategy</h3>
                    <div className="space-y-3 text-center">
                      {skills['E-commerce & Strategy'].map((skill) => (
                        <div key={skill.name} className="skill-tag text-center">
                          <div className="flex items-center w-full">
                            <span className="flex-1 text-left">{skill.name}</span>
                            <span className="ml-2 text-xs text-cyan-400 font-bold">{skill.rating || 7}/10</span>
                          </div>
                          <div className="w-full h-2 bg-white/10 rounded-full mt-2">
                            <div
                              className="h-2 rounded-full bg-cyan-400 transition-all"
                              style={{ width: `${((skill.rating || 7) / 10) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Upper Right: AI & Data Science */}
                  <div className={`text-center ${toolkitInView ? 'slide-left' : 'opacity-0'} md:row-start-1 md:col-start-2`}>
                    <h3 className="text-xl font-semibold mb-4 text-cyan-400 text-center font-ethnocentric">AI & Data Science</h3>
                    <div className="space-y-3 text-center">
                      {skills['AI & Data Science'].map((skill) => (
                        <div key={skill.name} className="skill-tag text-center">
                          <div className="flex items-center w-full">
                            <span className="flex-1 text-left">{skill.name}</span>
                            <span className="ml-2 text-xs text-cyan-400 font-bold">{skill.rating || 7}/10</span>
                          </div>
                          <div className="w-full h-2 bg-white/10 rounded-full mt-2">
                            <div
                              className="h-2 rounded-full bg-cyan-400 transition-all"
                              style={{ width: `${((skill.rating || 7) / 10) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Lower Right: Digital Marketing */}
                  <div className={`text-center ${toolkitInView ? 'slide-up' : 'opacity-0'} md:row-start-2 md:col-start-2`}>
                    <h3 className="text-xl font-semibold mb-4 text-cyan-400 text-center font-ethnocentric">Digital Marketing</h3>
                    <div className="space-y-3 text-center">
                      {skills['Digital Marketing'].map((skill) => (
                        skill.name === 'Meta Business Suite'
                          ? <div
                              key={skill.name}
                              className="skill-tag text-center cursor-pointer hover:bg-cyan-500/20 hover:text-cyan-400 transition-colors"
                              onClick={() => setMbsModalOpen(true)}
                            >
                              <div className="flex items-center w-full">
                                <span className="flex-1 text-left">{skill.name}</span>
                                <span className="ml-2 text-xs text-cyan-400 font-bold">{skill.rating}/10</span>
                              </div>
                              <div className="w-full h-2 bg-white/10 rounded-full mt-2">
                                <div
                                  className="h-2 rounded-full bg-cyan-400 transition-all"
                                  style={{ width: `${(skill.rating / 10) * 100}%` }}
                                ></div>
                              </div>
                            </div>
                          : <div key={skill.name} className="skill-tag text-center">
                              <div className="flex items-center w-full">
                                <span className="flex-1 text-left">{skill.name}</span>
                                <span className="ml-2 text-xs text-cyan-400 font-bold">{skill.rating || 7}/10</span>
                              </div>
                              <div className="w-full h-2 bg-white/10 rounded-full mt-2">
                                <div
                                  className="h-2 rounded-full bg-cyan-400 transition-all"
                                  style={{ width: `${((skill.rating || 7) / 10) * 100}%` }}
                                ></div>
                              </div>
                            </div>
                      ))}
                    </div>
                  </div>
                  {/* Lower Left: Development */}
                  <div className={`text-center ${toolkitInView ? 'slide-right' : 'opacity-0'} md:row-start-2 md:col-start-1`}>
                    <h3 className="text-xl font-semibold mb-4 text-cyan-400 text-center font-ethnocentric">Development</h3>
                    <div className="space-y-3 text-center">
                      {skills['Development'].map((skill) => (
                        skill.name === 'AWS (Certified)'
                          ? <div
                              key={skill.name}
                              className="skill-tag text-center cursor-pointer hover:bg-cyan-500/20 hover:text-cyan-400 transition-colors"
                              onClick={() => setAwsModalOpen(true)}
                            >
                              <div className="flex items-center w-full">
                                <span className="flex-1 text-left">{skill.name}</span>
                                <span className="ml-2 text-xs text-cyan-400 font-bold">{skill.rating}/10</span>
                              </div>
                              <div className="w-full h-2 bg-white/10 rounded-full mt-2">
                                <div
                                  className="h-2 rounded-full bg-cyan-400 transition-all"
                                  style={{ width: `${(skill.rating / 10) * 100}%` }}
                                ></div>
                              </div>
                            </div>
                          : <div key={skill.name} className="skill-tag text-center">
                              <div className="flex items-center w-full">
                                <span className="flex-1 text-left">{skill.name}</span>
                                <span className="ml-2 text-xs text-cyan-400 font-bold">{skill.rating || 7}/10</span>
                              </div>
                              <div className="w-full h-2 bg-white/10 rounded-full mt-2">
                                <div
                                  className="h-2 rounded-full bg-cyan-400 transition-all"
                                  style={{ width: `${((skill.rating || 7) / 10) * 100}%` }}
                                ></div>
                              </div>
                            </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="py-20 px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="glass-panel p-8 md:p-12 fade-in">
                <h2 className="gradient-heading text-4xl md:text-5xl font-bold mb-8 font-ethnocentric text-center">Let's Connect</h2>
                <p className="text-lg md:text-xl mb-12 text-white/80 max-w-2xl mx-auto leading-relaxed">
                  I'm always open to discussing new projects, creative ideas, or opportunities in the AI space. Feel free to reach out.
                </p>
                <div className="grid grid-cols-2 md:flex md:flex-row justify-center items-center gap-4 md:gap-y-0 md:gap-x-8 text-center w-full">
                  <a
                    href="mailto:allyabdullah.zafar@gmail.com"
                    className="p-4 glass-panel glass-panel-btn hover:bg-cyan-500/20 transition-all duration-300 rounded-full group flex items-center justify-center"
                  >
                    <Mail className="w-6 h-6 text-white group-hover:text-cyan-400 transition-colors" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/ally-abdullah-zafar-7a847627a"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 glass-panel glass-panel-btn hover:bg-cyan-500/20 transition-all duration-300 rounded-full group flex items-center justify-center"
                  >
                    <Linkedin className="w-6 h-6 text-white group-hover:text-cyan-400 transition-colors" />
                  </a>
                  <a
                    href="https://github.com/dryad13"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 glass-panel glass-panel-btn hover:bg-cyan-500/20 transition-all duration-300 rounded-full group flex items-center justify-center"
                  >
                    <Github className="w-6 h-6 text-white group-hover:text-cyan-400 transition-colors" />
                  </a>
                  <a
                    href="https://www.instagram.com/not.an.ally/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 glass-panel glass-panel-btn hover:bg-cyan-500/20 transition-all duration-300 rounded-full group flex items-center justify-center"
                  >
                    <Instagram className="w-6 h-6 text-white group-hover:text-cyan-400 transition-colors" />
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="py-8 text-center text-white/60 border-t border-white/10 mt-16">
            <p>&copy; 2025 Ally Abdullah. Crafted with passion for innovation.</p>
          </footer>

          {/* Modal */}
          {modalProject && (
            <div 
                className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 transition-opacity duration-300 modal-backdrop"
                onClick={closeModal}
            >
              <div 
                className="glass-panel p-6 md:p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto relative transition-transform duration-300 scale-95"
                onClick={(e) => e.stopPropagation()}
                style={{ transform: modalProject ? 'scale(1)' : 'scale(0.95)' }}
              >
                {/* Mobile: close icon in its own row above content, centered with bg */}
                <div className="block md:hidden w-full mb-2 flex justify-center">
                  <button
                    onClick={closeModal}
                    className="mx-auto bg-black/40 p-2 rounded-full transition-colors z-20"
                    aria-label="Close Modal"
                  >
                    <X className="w-6 h-6 text-white" />
                  </button>
                </div>
                {/* Desktop: close icon top-right as before, with flex header */}
                <div className="mb-6 flex items-center justify-center relative">
                  <h3 className="text-2xl md:text-3xl font-bold text-cyan-400 mb-4 text-center w-full font-ethnocentric px-8 md:px-0">{modalProject.title}</h3>
                  <button
                    onClick={closeModal}
                    className="hidden md:block absolute right-2 top-1 p-2 hover:bg-white/10 rounded-full transition-colors z-10"
                    aria-label="Close Modal"
                  >
                    <X className="w-6 h-6 text-white" />
                  </button>
                </div>

                <div className="mb-6 aspect-[16/9] rounded-2xl overflow-hidden">
                  <picture>
                    <source media="(max-width: 767px)" srcSet={modalProject.images.portrait} />
                    <img
                      src={modalProject.images.landscape}
                      alt={modalProject.title}
                      className="w-full h-full object-contain "
                    />
                  </picture>
                </div>

                <div className="prose prose-lg prose-invert max-w-none text-center">
                  <h4 className="gradient-heading text-xl font-semibold text-cyan-400 mb-4 text-center">Project Overview</h4>
                  <p className="text-white/90 leading-relaxed mb-6 text-center">
                    {modalProject.detailedDescription}
                  </p>
                </div>

                {(modalProject.title === 'Relaxa Store' || modalProject.title === 'Ensensity' || modalProject.title === 'Primade' || modalProject.title === 'BabuBazaarpk') && modalProject.demoVideo && (
                  <div className="my-6 flex justify-center">
                    <div className="w-full max-w-xl aspect-video rounded-xl overflow-hidden border border-white/20 shadow-lg">
                      <iframe
                        width="100%"
                        height="100%"
                        src={modalProject.demoVideo.replace('youtu.be/', 'www.youtube.com/embed/').replace('watch?v=', 'embed/')}
                        title="Demo Video"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="w-full h-full"
                      ></iframe>
                    </div>
                  </div>
                )}

                {modalProject.links && (
                  <div className="mt-8 flex flex-col md:flex-row flex-wrap gap-4 justify-center items-center">
                    {modalProject.links.map((link: any, idx: number) => (
                      <a
                        key={idx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <button className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 flex items-center gap-2 mx-auto">
                          <ExternalLink className="w-5 h-5" />
                          {link.label}
                        </button>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* AWS Modal */}
          {awsModalOpen && (
            <div
              className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 modal-backdrop"
              onClick={() => setAwsModalOpen(false)}
            >
              <div
                className="glass-panel p-4 md:p-8 max-w-2xl w-full relative flex flex-col items-center"
                onClick={e => e.stopPropagation()}
              >
                {/* Mobile: close icon in its own row above image, centered with bg */}
                <div className="block md:hidden w-full mb-2 flex justify-center">
                  <button
                    onClick={() => setAwsModalOpen(false)}
                    className="mx-auto bg-black/40 p-2 rounded-full transition-colors z-20"
                    aria-label="Close AWS Certificate"
                  >
                    <X className="w-6 h-6 text-white" />
                  </button>
                </div>
                {/* Desktop: close icon top-right as before */}
                <button
                  onClick={() => setAwsModalOpen(false)}
                  className="hidden md:block absolute right-2 top-1 p-2 hover:bg-white/10 rounded-full transition-colors z-10"
                  aria-label="Close AWS Certificate"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
                <img
                  src="/images/AWS.jpg"
                  alt="AWS Certified"
                  className="rounded-xl max-w-full max-h-[80vh] object-contain border border-white/10 shadow-lg"
                />
              </div>
            </div>
          )}

          {/* Meta Business Suite Modal */}
          {mbsModalOpen && (
            <div
              className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 modal-backdrop"
              onClick={() => setMbsModalOpen(false)}
            >
              <div
                className="glass-panel p-4 md:p-8 max-w-2xl w-full relative flex flex-col items-center"
                onClick={e => e.stopPropagation()}
              >
                <button
                  onClick={() => setMbsModalOpen(false)}
                  className="absolute right-2 top-1 md:static md:ml-4 p-2 hover:bg-white/10 rounded-full transition-colors z-10"
                  aria-label="Close Meta Business Suite"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
                <img
                  src="/images/adacc.jpg"
                  alt="Meta Business Suite Ad Account"
                  className="rounded-xl max-w-full max-h-[90vh] object-contain border border-white/10 shadow-lg"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;

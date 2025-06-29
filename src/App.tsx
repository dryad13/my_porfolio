import React, { useEffect, useState } from 'react';
import { ChevronDown, Mail, Github, Linkedin, ExternalLink, Code, Zap, TrendingUp, Brain, ChevronLeft, ChevronRight, X, Monitor, Palette, ShoppingBag, Rocket, BarChart3, Shield, Cpu } from 'lucide-react';

// Main App Component
function App() {
  // State for tracking active navigation section
  const [activeSection, setActiveSection] = useState('hero');
  // State for the current slide in the projects carousel
  const [currentSlide, setCurrentSlide] = useState(0);
  // State to manage the currently open project modal
  const [modalProject, setModalProject] = useState<any>(null);

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
      'Shopify (Expert)',
      'E-commerce Management',
      'Digital Strategy',
      'Go-to-Market Planning',
      'Operations & Fulfillment'
    ],
    'AI & Data Science': [
      'Generative AI (Learning)',
      'Deep Learning (PyTorch/TensorFlow)',
      'Data Analysis (Python, Pandas)',
      'Financial Modeling'
    ],
    'Development': [
      'Java',
      'Python',
      'HTML5',
      'CSS3',
      'JavaScript',
      'AWS (Certified)',
      'Git/GitHub'
    ]
  };

  // Data for the projects carousel
  const projects = [
        {
            id: 1,
            title: 'Daak and Co.',
            description: 'As the E-commerce Lead, I built the Shopify store from scratch and led the strategy that scaled the brand to over 4M+ PKR in revenue through 5 major collection launches.',
            image: 'https://images.pexels.com/photos/3769747/pexels-photo-3769747.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            hasLiveLink: true,
            detailedDescription: 'Led the complete digital transformation of Daak and Co., building their Shopify presence from the ground up. Implemented advanced analytics tracking, optimized conversion funnels, and executed data-driven marketing strategies that resulted in consistent month-over-month growth. Managed cross-functional teams and coordinated with suppliers to ensure seamless fulfillment across 5 major product launches.'
        },
        {
            id: 2,
            title: 'Insurgo',
            description: 'Co-founded a venture to provide end-to-end e-commerce solutions. As Head of E-commerce, I managed the entire client lifecycle from development to marketing and fulfillment.',
            image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            hasLiveLink: false,
            detailedDescription: 'Co-founded and scaled Insurgo from concept to a full-service e-commerce agency. Built strategic partnerships with suppliers, developed standardized processes for client onboarding, and created scalable systems for managing multiple concurrent projects. Successfully delivered solutions across diverse industries including wellness, fashion, and consumer goods.'
        },
        {
            id: 3,
            title: 'Variety Centre',
            description: 'Developed the first-ever e-commerce presence for an established, multi-outlet toy store brand in Karachi, creating a new digital sales channel for their business.',
            image: 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            hasLiveLink: false,
            detailedDescription: 'Digitally transformed a traditional brick-and-mortar toy retailer by creating their first e-commerce platform. Managed the complex process of cataloging hundreds of products, implementing inventory synchronization between physical and digital stores, and training staff on order management systems.'
        },
        {
            id: 4,
            title: 'Ensensity',
            description: 'Led the end-to-end development of a new Shopify store for a wellness/perfume brand, focusing on a clean UX and mobile-responsive design.',
            image: 'https://images.pexels.com/photos/1961795/pexels-photo-1961795.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            hasLiveLink: true,
            detailedDescription: 'Designed and developed a premium e-commerce experience for Ensensity, focusing on sensory storytelling and brand immersion. Implemented custom product visualization features, optimized mobile performance, and created an intuitive navigation system that increased user engagement by 40%.'
        },
        {
            id: 5,
            title: 'Primade',
            description: 'Following the store build by Insurgo, I was contracted to lead the brand\'s go-to-market strategy, managing paid social campaigns and co-directing a DVC.',
            image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            hasLiveLink: true,
            detailedDescription: 'Orchestrated a comprehensive go-to-market strategy for Primade, including market research, competitive analysis, and multi-channel campaign execution. Managed a significant budget across Facebook and Instagram ads, achieving a 3.2x ROAS while building brand awareness in the competitive F&B market.'
        },
        {
            id: 6,
            title: 'Sipsters (BabuBazaar)',
            description: 'Developed a custom Shopify store for a new consumer goods brand, focusing on a vibrant, product-focused UI to launch their unique line of tumblers.',
            image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            hasLiveLink: false,
            detailedDescription: 'Created a vibrant, youth-focused e-commerce platform for Sipsters, emphasizing product customization and social sharing features. Implemented advanced product configurators, integrated social proof elements, and optimized the checkout process for mobile users, resulting in a 25% increase in conversion rates.'
        },
        {
            id: 7,
            title: 'Popcorn Media (Freelance)',
            description: 'Engaged by a digital agency as a specialist to provide custom development and ongoing technical maintenance for their high-profile fashion clients.',
            image: 'https://images.pexels.com/photos/325876/pexels-photo-325876.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            hasLiveLink: false,
            detailedDescription: 'Provided specialized technical expertise to Popcorn Media for their premium fashion clients including Ivar Clothing and Shaad Fabrics. Developed custom Liquid templates, implemented complex product filtering systems, and maintained high-performance stores under heavy traffic loads during sale periods.'
        },
        {
            id: 8,
            title: 'Visual Transformer for LIGO Data',
            description: 'My FYP involves developing a deep learning (ViT) model to classify gravitational wave data from black hole collisions, applying AI to complex scientific problems.',
            image: 'https://images.pexels.com/photos/2156/sky-earth-space-working.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            hasLiveLink: false,
            detailedDescription: 'Developing a cutting-edge Visual Transformer architecture to analyze gravitational wave data from the LIGO observatory. The project involves preprocessing complex time-series data, implementing attention mechanisms for pattern recognition, and achieving classification accuracy improvements over traditional CNN approaches.'
        },
        {
            id: 9,
            title: 'Financial Simulation Project',
            description: 'Implemented a Monte Carlo simulation to model PSX stock outcomes, demonstrating the efficiency of parallel programming algorithms in complex financial analysis.',
            image: 'https://images.pexels.com/photos/186461/pexels-photo-186461.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            hasLiveLink: false,
            detailedDescription: 'Built a sophisticated Monte Carlo simulation engine for modeling Pakistan Stock Exchange outcomes. Implemented parallel processing algorithms using multiprocessing libraries, achieving 10x performance improvements over sequential implementations while maintaining statistical accuracy across millions of iterations.'
        },
        {
            id: 10,
            title: 'IoT Network Design Project',
            description: 'Designed a comprehensive IoT security and automated fire suppression system in Cisco Packet Tracer, focusing on network reliability and real-time response.',
            image: 'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            hasLiveLink: false,
            detailedDescription: 'Architected a comprehensive IoT security system integrating fire detection, automated suppression, and real-time monitoring capabilities. Designed network topology for optimal redundancy, implemented security protocols for device authentication, and created automated response workflows for emergency scenarios.'
        },
        {
            id: 11,
            title: 'AI Smart Irrigation Bot',
            description: 'Led the hardware development and sensor integration for an Arduino-based smart irrigation bot, applying control logic to a physical, hands-on system.',
            image: 'https://images.pexels.com/photos/159298/gears-cogs-machine-machinery-159298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            hasLiveLink: false,
            detailedDescription: 'Developed an intelligent irrigation system using Arduino microcontrollers, integrating soil moisture sensors, weather API data, and automated watering mechanisms. Implemented machine learning algorithms for predictive watering schedules and created a mobile app interface for remote monitoring and control.'
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

  return (
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
      <section id="hero" className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="hero-text text-6xl md:text-8xl font-bold mb-6 fade-in">
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
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown className="w-6 h-6 text-white/60" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="glass-panel p-8 md:p-12 relative fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">About Me</h2>
            <div className="prose prose-lg prose-invert max-w-none text-white/90 space-y-4 text-lg leading-relaxed">
                <p>
                    As a Computer Science student, I quickly came to a pivotal realization: my true passion wasn't confined to the elegance of writing code, but was ignited by the challenge of using technology as a powerful tool to build, operate, and grow entire businesses. The theoretical power of algorithms felt most profound when I could see them translate into tangible, real-world outcomes—customer engagement, sales growth, and the establishment of a vibrant brand identity. It was this desire to bridge the gap between abstract logic and concrete market impact that has defined my professional and academic journey.
                </p>
                <p>
                    This practical, business-focused experience created a hunger for deeper theoretical knowledge, which I pursued aggressively in my studies at the University of Karachi. My academic projects were a deliberate effort to acquire the firepower needed to solve more complex problems, from implementing a Monte Carlo financial simulation to designing an IoT security system.
                </p>
                <p>
                    My formal entry into the world of large-scale AI has been my Final Year Project: developing a Visual Transformer (ViT) model to classify gravitational wave data. This work has been the catalyst for my next professional evolution. My focus is now to pivot and apply this unique blend of skills—from hands-on business scaling to advanced AI/ML research—towards the field of Generative AI.
                </p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Carousel Section */}
      <section id="projects" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 fade-in">
            Selected Works & Case Studies
          </h2>
          
          <div className="relative fade-in">
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full glass-nav hover:bg-white/20 transition-all duration-300 group hidden md:block"
            >
              <ChevronLeft className="w-8 h-8 text-white group-hover:text-cyan-400" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full glass-nav hover:bg-white/20 transition-all duration-300 group hidden md:block"
            >
              <ChevronRight className="w-8 h-8 text-white group-hover:text-cyan-400" />
            </button>

            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {projects.map((project) => (
                  <div key={project.id} className="w-full flex-shrink-0 px-2 md:px-4">
                    {/* NEW CLEAN LAYOUT FOR EACH SLIDE */}
                    <div className="glass-panel p-4 md:p-6 flex flex-col group h-full">
                        {/* --- 1. Image Panel (Landscape on Desktop, Portrait on Mobile) --- */}
                        <div className="w-full h-auto rounded-2xl overflow-hidden aspect-[3/4] md:aspect-[16/9] mb-4">
                            <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                            />
                        </div>

                        {/* --- 2. Description Panel --- */}
                        <div className="flex-grow flex flex-col px-2">
                            <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{project.title}</h3>
                            <p className="text-white/80 text-sm md:text-base leading-relaxed mb-4">
                            {project.description}
                            </p>
                        </div>

                        {/* --- 3. Links Panel (Dynamic Columns) --- */}
                        <div className="mt-auto pt-4 px-2">
                            <div className={`grid gap-4 ${project.hasLiveLink ? 'grid-cols-2' : 'grid-cols-1 place-items-center'}`}>
                            {/* Live Site Button (conditional) */}
                            {project.hasLiveLink && (
                                <button className="w-full text-sm md:text-base bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-4 py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
                                <ExternalLink className="w-4 h-4 md:w-5 md:h-5" />
                                Live Site
                                </button>
                            )}
                            {/* View More Button */}
                            <button 
                                onClick={() => openModal(project)}
                                className="w-full text-sm md:text-base border border-white/30 hover:border-cyan-400 text-white hover:text-cyan-400 font-medium px-4 py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
                            >
                                <ChevronDown className="w-4 h-4 md:w-5 md:h-5" />
                                View More
                            </button>
                            </div>
                        </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center mt-8 space-x-2">
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
      <section id="skills" className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="glass-panel p-8 md:p-12 fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">My Toolkit</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {Object.entries(skills).map(([category, skillList]) => (
                <div key={category}>
                  <h3 className="text-xl font-semibold mb-4 text-cyan-400">{category}</h3>
                  <div className="space-y-3">
                    {skillList.map((skill) => (
                      <div key={skill} className="skill-tag">
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-panel p-8 md:p-12 fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">Let's Connect</h2>
            <p className="text-lg md:text-xl mb-12 text-white/80 max-w-2xl mx-auto leading-relaxed">
              I'm always open to discussing new projects, creative ideas, or opportunities in the AI space. Feel free to reach out.
            </p>
            <div className="flex justify-center space-x-8">
              <a
                href="mailto:your-email@example.com"
                className="p-4 glass-panel hover:bg-cyan-500/20 transition-all duration-300 rounded-full group"
              >
                <Mail className="w-6 h-6 text-white group-hover:text-cyan-400 transition-colors" />
              </a>
              <a
                href="#"
                className="p-4 glass-panel hover:bg-cyan-500/20 transition-all duration-300 rounded-full group"
              >
                <Linkedin className="w-6 h-6 text-white group-hover:text-cyan-400 transition-colors" />
              </a>
              <a
                href="#"
                className="p-4 glass-panel hover:bg-cyan-500/20 transition-all duration-300 rounded-full group"
              >
                <Github className="w-6 h-6 text-white group-hover:text-cyan-400 transition-colors" />
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
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors z-10"
            >
              <X className="w-6 h-6 text-white" />
            </button>
            
            <div className="mb-6">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 pr-10">{modalProject.title}</h3>
            </div>

            <div className="mb-6 aspect-[16/9] rounded-2xl overflow-hidden">
              <img
                src={modalProject.image}
                alt={modalProject.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="prose prose-lg prose-invert max-w-none">
              <h4 className="text-xl font-semibold text-cyan-400 mb-4">Project Overview</h4>
              <p className="text-white/90 leading-relaxed mb-6">
                {modalProject.detailedDescription}
              </p>
            </div>

            {modalProject.hasLiveLink && (
              <div className="mt-8">
                <button className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 flex items-center gap-2 mx-auto">
                  <ExternalLink className="w-5 h-5" />
                  Visit Live Site
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

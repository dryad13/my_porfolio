import React, { useEffect, useState } from 'react';
import { ChevronDown, Mail, Github, Linkedin, ExternalLink, ChevronLeft, ChevronRight, X } from 'lucide-react';

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

  // UPDATED projects data with detailed descriptions and live links
  const projects = [
    {
        id: 1,
        title: 'Daak and Co.',
        description: 'Led the e-commerce strategy that scaled this fashion brand to over 4M+ PKR in revenue.',
        image: 'https://images.pexels.com/photos/3769747/pexels-photo-3769747.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        hasLiveLink: true,
        liveLink: 'https://daakandco.com',
        detailedDescription: 'As the technical and strategic lead for Daak and Co., I orchestrated a complete digital transformation, building their Shopify presence from the ground up. My role involved implementing advanced analytics for data-driven marketing, optimizing conversion funnels for a high-end fashion audience, and executing a robust SEO strategy. I successfully managed the technical execution of five major collection launches, ensuring 100% uptime during peak traffic, and coordinated with suppliers for a seamless inventory and fulfillment pipeline. This project showcases my ability to merge technical development with high-level business strategy to achieve significant, measurable revenue growth.'
    },
    {
        id: 2,
        title: 'Insurgo',
        description: 'Co-founded a venture to provide end-to-end e-commerce solutions for a diverse client portfolio.',
        image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        hasLiveLink: false,
        detailedDescription: 'As Co-founder and Head of E-commerce, I built Insurgo from a concept into a full-service agency. I was responsible for business development, client acquisition, and creating the operational framework. We developed scalable systems for managing multiple concurrent projects across diverse industries, from initial brand strategy and Shopify development to post-launch marketing and fulfillment operations. This venture demonstrates my leadership, entrepreneurial drive, and ability to deliver comprehensive e-commerce solutions.'
    },
    {
        id: 3,
        title: 'Variety Centre',
        description: 'Digitized an established, multi-outlet toy store by creating their first-ever online sales channel.',
        image: 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        hasLiveLink: false,
        detailedDescription: 'This project focused on the digital transformation of a traditional brick-and-mortar retailer. I managed the complex process of cataloging hundreds of SKUs, architecting a user-friendly site structure for a wide range of product categories, and implementing an inventory management system to synchronize stock between physical and digital storefronts. This demonstrates my ability to bring legacy businesses into the modern e-commerce landscape.'
    },
    {
        id: 4,
        title: 'Ensensity',
        description: 'Developed a premium Shopify store for a wellness and perfume brand with a focus on clean UX.',
        image: 'https://images.pexels.com/photos/1961795/pexels-photo-1961795.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        hasLiveLink: true,
        liveLink: 'https://ensensity.com',
        detailedDescription: 'For Ensensity, I designed and developed a premium e-commerce experience focused on sensory storytelling and brand immersion. The project involved deep theme customization, implementing custom product visualization features, and optimizing for mobile-first performance. The intuitive navigation system I architected led to a 40% increase in user engagement and session duration, highlighting my skills in UX/UI design for niche markets.'
    },
    {
        id: 5,
        title: 'Primade',
        description: 'Led the go-to-market strategy, managing paid social campaigns and co-directing a DVC.',
        image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        hasLiveLink: true,
        liveLink: 'https://drinkprimade.com',
        detailedDescription: 'After building their Shopify store, I was contracted to orchestrate a comprehensive go-to-market strategy for Primade. This involved competitive analysis, market research, and multi-channel campaign execution. I managed a significant budget across Meta platforms (Facebook/Instagram), achieving a 3.2x ROAS while establishing initial brand awareness in the competitive F&B market. My role also included co-directing their launch DVC, showcasing my ability in creative strategy and production oversight.'
    },
    {
        id: 6,
        title: 'Sipsters (BabuBazaar)',
        description: 'Built a vibrant, product-focused UI for a new consumer goods brand of custom tumblers.',
        image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        hasLiveLink: false,
        detailedDescription: 'I created a youth-focused e-commerce platform for Sipsters, emphasizing product customization and social sharing features. A key part of this project was implementing an advanced product configurator allowing users to visualize their custom designs. By integrating social proof elements and optimizing the mobile checkout process, we achieved a 25% increase in conversion rates post-launch.'
    },
    {
        id: 7,
        title: 'Popcorn Media (Freelance)',
        description: 'Provided custom development and maintenance for high-profile fashion clients of a digital agency.',
        image: 'https://images.pexels.com/photos/325876/pexels-photo-325876.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        hasLiveLink: false,
        detailedDescription: 'As a specialist contractor for Popcorn Media, I provided technical expertise for their premium fashion clients, Ivar Clothing and Shaad Fabrics. My responsibilities included developing custom Shopify Liquid templates for unique page layouts, implementing complex product filtering systems with Shopify Metafields, and maintaining site performance under heavy traffic loads during sales events. This role highlights my ability to collaborate effectively with agencies and deliver for established brands.'
    },
    {
        id: 8,
        title: 'Visual Transformer for LIGO Data',
        description: 'My Final Year Project developing a ViT model to classify gravitational wave data.',
        image: 'https://images.pexels.com/photos/2156/sky-earth-space-working.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        hasLiveLink: false,
        detailedDescription: 'This ongoing research project involves developing a cutting-edge Visual Transformer (ViT) architecture to analyze gravitational wave data from the LIGO observatory. The work includes preprocessing complex time-series data into spectrograms, implementing self-attention mechanisms for pattern recognition, and benchmarking against traditional CNN approaches. This project demonstrates my deep interest and capability in applying state-of-the-art AI to solve complex scientific computing problems.'
    },
    {
        id: 9,
        title: 'Financial Simulation Project',
        description: 'Implemented a Monte Carlo simulation to model PSX stock outcomes with parallel programming.',
        image: 'https://images.pexels.com/photos/186461/pexels-photo-186461.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        hasLiveLink: false,
        detailedDescription: 'I built a sophisticated Monte Carlo simulation engine in Python for modeling Pakistan Stock Exchange (PSX) outcomes. A key achievement was implementing parallel processing algorithms which resulted in a 10x performance improvement over sequential implementations. This project showcases my skills in computational finance (FinTech), statistical modeling, and high-performance computing.'
    },
    {
        id: 10,
        title: 'IoT Network Design Project',
        description: 'Designed an IoT security and automated fire suppression system in Cisco Packet Tracer.',
        image: 'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        hasLiveLink: false,
        detailedDescription: 'For my networking course, I architected a comprehensive IoT security system integrating fire detection, automated suppression, and real-time monitoring. I designed the network topology for optimal redundancy and low latency, implemented security protocols for device authentication, and created automated response workflows. This project highlights my skills in system architecture and IoT network design.'
    },
    {
        id: 11,
        title: 'AI Smart Irrigation Bot',
        description: 'Led hardware development and sensor integration for an Arduino-based smart irrigation bot.',
        image: 'https://images.pexels.com/photos/159298/gears-cogs-machine-machinery-159298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
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
      <section id="projects" className="py-20">
        <div className="w-full mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 fade-in">
            Selected Works & Case Studies
          </h2>
          
          <div className="relative fade-in h-[700px] md:h-[650px] flex items-center justify-center">
            {/* Carousel Track */}
            <div className="relative w-full h-full">
              {projects.map((project, index) => {
                const offset = currentSlide - index;
                const isCurrent = index === currentSlide;
                
                let transformStyle = `translateX(${offset * 100}%) scale(0.7) rotateY(${offset > 0 ? '' : '-'}45deg)`;
                let opacityStyle = 'opacity-40';
                let zIndexStyle = 'z-0';

                if (isCurrent) {
                  transformStyle = 'translateX(0) scale(1) rotateY(0deg)';
                  opacityStyle = 'opacity-100';
                  zIndexStyle = 'z-20';
                } else if (index === (currentSlide - 1 + projects.length) % projects.length) {
                  transformStyle = 'translateX(-50%) scale(0.8) rotateY(45deg)';
                  opacityStyle = 'opacity-50';
                  zIndexStyle = 'z-10';
                } else if (index === (currentSlide + 1) % projects.length) {
                  transformStyle = 'translateX(50%) scale(0.8) rotateY(-45deg)';
                  opacityStyle = 'opacity-50';
                  zIndexStyle = 'z-10';
                }

                return (
                  <div 
                    key={project.id} 
                    className={`absolute w-full h-full transition-all duration-500 ease-in-out px-2 md:px-20 ${opacityStyle} ${zIndexStyle}`}
                    style={{ transform: transformStyle, perspective: '1000px' }}
                  >
                    <div className="glass-panel p-4 md:p-6 flex flex-col group h-full">
                        <div className="w-full h-auto rounded-2xl overflow-hidden aspect-[3/4] md:aspect-[16/9] mb-4">
                            <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                            />
                        </div>
                        <div className="flex-grow flex flex-col px-2">
                            <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{project.title}</h3>
                            <p className="text-white/80 text-sm md:text-base leading-relaxed mb-4">
                            {project.description}
                            </p>
                        </div>
                        <div className="mt-auto pt-4 px-2">
                            <div className={`grid gap-4 ${project.hasLiveLink ? 'grid-cols-2' : 'grid-cols-1 place-items-center'}`}>
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
              className="absolute left-0 md:left-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full glass-nav hover:bg-white/20 transition-all duration-300 group"
            >
              <ChevronLeft className="w-8 h-8 text-white group-hover:text-cyan-400" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 md:right-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full glass-nav hover:bg-white/20 transition-all duration-300 group"
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
                <a href={modalProject.liveLink} target="_blank" rel="noopener noreferrer">
                  <button className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 flex items-center gap-2 mx-auto">
                    <ExternalLink className="w-5 h-5" />
                    Visit Live Site
                  </button>
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

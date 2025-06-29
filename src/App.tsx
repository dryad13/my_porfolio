import React, { useEffect, useState } from 'react';
import { ChevronDown, Mail, Github, Linkedin, ExternalLink, Code, Zap, TrendingUp, Brain, ChevronLeft, ChevronRight, X, Monitor, Palette, ShoppingBag, Rocket, BarChart3, Shield, Cpu } from 'lucide-react';

function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [modalProject, setModalProject] = useState<any>(null);

  useEffect(() => {
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

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

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

  const projects = [
    {
      id: 1,
      title: 'Daak and Co.',
      description: 'As the E-commerce Lead, I built the Shopify store from scratch and led the strategy that scaled the brand to over 4M+ PKR in revenue through 5 major collection launches.',
      skills: ['E-commerce Strategy', 'Shopify Development', 'Data Analysis', 'Project Management'],
      image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
      hasLiveLink: true,
      icon: TrendingUp,
      accent: 'from-green-400 to-emerald-600',
      detailedDescription: 'Led the complete digital transformation of Daak and Co., building their Shopify presence from the ground up. Implemented advanced analytics tracking, optimized conversion funnels, and executed data-driven marketing strategies that resulted in consistent month-over-month growth. Managed cross-functional teams and coordinated with suppliers to ensure seamless fulfillment across 5 major product launches.'
    },
    {
      id: 2,
      title: 'Insurgo',
      description: 'Co-founded a venture to provide end-to-end e-commerce solutions. As Head of E-commerce, I managed the entire client lifecycle from development to marketing and fulfillment.',
      skills: ['Entrepreneurship', 'Business Development', 'Client Management', 'E-commerce Operations'],
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
      hasLiveLink: false,
      icon: Rocket,
      accent: 'from-purple-400 to-pink-600',
      detailedDescription: 'Co-founded and scaled Insurgo from concept to a full-service e-commerce agency. Built strategic partnerships with suppliers, developed standardized processes for client onboarding, and created scalable systems for managing multiple concurrent projects. Successfully delivered solutions across diverse industries including wellness, fashion, and consumer goods.'
    },
    {
      id: 3,
      title: 'Variety Centre',
      description: 'Developed the first-ever e-commerce presence for an established, multi-outlet toy store brand in Karachi, creating a new digital sales channel for their business.',
      skills: ['Shopify', 'Web Design', 'Product Catalog Management', 'Client Collaboration'],
      image: 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=800',
      hasLiveLink: false,
      icon: ShoppingBag,
      accent: 'from-yellow-400 to-orange-600',
      detailedDescription: 'Digitally transformed a traditional brick-and-mortar toy retailer by creating their first e-commerce platform. Managed the complex process of cataloging hundreds of products, implementing inventory synchronization between physical and digital stores, and training staff on order management systems.'
    },
    {
      id: 4,
      title: 'Ensensity',
      description: 'Led the end-to-end development of a new Shopify store for a wellness/perfume brand, focusing on a clean UX and mobile-responsive design.',
      skills: ['Theme Customization', 'User Experience (UX)', 'UI Design', 'Shopify'],
      image: 'https://images.pexels.com/photos/1961795/pexels-photo-1961795.jpeg?auto=compress&cs=tinysrgb&w=800',
      hasLiveLink: true,
      icon: Palette,
      accent: 'from-pink-400 to-rose-600',
      detailedDescription: 'Designed and developed a premium e-commerce experience for Ensensity, focusing on sensory storytelling and brand immersion. Implemented custom product visualization features, optimized mobile performance, and created an intuitive navigation system that increased user engagement by 40%.'
    },
    {
      id: 5,
      title: 'Primade',
      description: 'Following the store build by Insurgo, I was contracted to lead the brand\'s go-to-market strategy, managing paid social campaigns and co-directing a DVC.',
      skills: ['Digital Marketing', 'Facebook Ads', 'Creative Direction', 'Campaign Management'],
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
      hasLiveLink: true,
      icon: Zap,
      accent: 'from-blue-400 to-indigo-600',
      detailedDescription: 'Orchestrated a comprehensive go-to-market strategy for Primade, including market research, competitive analysis, and multi-channel campaign execution. Managed a budget of 500K+ PKR across Facebook and Instagram ads, achieving a 3.2x ROAS while building brand awareness in the competitive F&B market.'
    },
    {
      id: 6,
      title: 'Sipsters (BabuBazaar)',
      description: 'Developed a custom Shopify store for a new consumer goods brand, focusing on a vibrant, product-focused UI to launch their unique line of tumblers.',
      skills: ['Brand Identity', 'Shopify Development', 'Product-Focused Design', 'E-commerce'],
      image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800',
      hasLiveLink: false,
      icon: Monitor,
      accent: 'from-cyan-400 to-blue-600',
      detailedDescription: 'Created a vibrant, youth-focused e-commerce platform for Sipsters, emphasizing product customization and social sharing features. Implemented advanced product configurators, integrated social proof elements, and optimized the checkout process for mobile users, resulting in a 25% increase in conversion rates.'
    },
    {
      id: 7,
      title: 'Popcorn Media (Freelance)',
      description: 'Engaged by a digital agency as a specialist to provide custom development and ongoing technical maintenance for their high-profile fashion clients.',
      skills: ['Agency Collaboration', 'Custom Development', 'Troubleshooting', 'Liquid'],
      image: 'https://images.pexels.com/photos/325876/pexels-photo-325876.jpeg?auto=compress&cs=tinysrgb&w=800',
      hasLiveLink: false,
      icon: Code,
      accent: 'from-violet-400 to-purple-600',
      detailedDescription: 'Provided specialized technical expertise to Popcorn Media for their premium fashion clients including Ivar Clothing and Shaad Fabrics. Developed custom Liquid templates, implemented complex product filtering systems, and maintained high-performance stores under heavy traffic loads during sale periods.'
    },
    {
      id: 8,
      title: 'Visual Transformer for LIGO Data',
      description: 'My FYP involves developing a deep learning (ViT) model to classify gravitational wave data from black hole collisions, applying AI to complex scientific problems.',
      skills: ['Deep Learning', 'AI/ML', 'Python', 'TensorFlow/PyTorch', 'Data Science'],
      image: 'https://images.pexels.com/photos/2156/sky-earth-space-working.jpg?auto=compress&cs=tinysrgb&w=800',
      hasLiveLink: false,
      icon: Brain,
      accent: 'from-indigo-400 to-blue-600',
      detailedDescription: 'Developing a cutting-edge Visual Transformer architecture to analyze gravitational wave data from the LIGO observatory. The project involves preprocessing complex time-series data, implementing attention mechanisms for pattern recognition, and achieving classification accuracy improvements over traditional CNN approaches.'
    },
    {
      id: 9,
      title: 'Financial Simulation Project',
      description: 'Implemented a Monte Carlo simulation to model PSX stock outcomes, demonstrating the efficiency of parallel programming algorithms in complex financial analysis.',
      skills: ['Parallel Programming', 'Financial Modeling', 'Python', 'NumPy', 'Data Simulation'],
      image: 'https://images.pexels.com/photos/186461/pexels-photo-186461.jpeg?auto=compress&cs=tinysrgb&w=800',
      hasLiveLink: false,
      icon: BarChart3,
      accent: 'from-green-400 to-teal-600',
      detailedDescription: 'Built a sophisticated Monte Carlo simulation engine for modeling Pakistan Stock Exchange outcomes. Implemented parallel processing algorithms using multiprocessing libraries, achieving 10x performance improvements over sequential implementations while maintaining statistical accuracy across millions of iterations.'
    },
    {
      id: 10,
      title: 'IoT Network Design Project',
      description: 'Designed a comprehensive IoT security and automated fire suppression system in Cisco Packet Tracer, focusing on network reliability and real-time response.',
      skills: ['IoT', 'Network Design', 'Cisco Packet Tracer', 'System Architecture'],
      image: 'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=800',
      hasLiveLink: false,
      icon: Shield,
      accent: 'from-red-400 to-orange-600',
      detailedDescription: 'Architected a comprehensive IoT security system integrating fire detection, automated suppression, and real-time monitoring capabilities. Designed network topology for optimal redundancy, implemented security protocols for device authentication, and created automated response workflows for emergency scenarios.'
    },
    {
      id: 11,
      title: 'AI Smart Irrigation Bot',
      description: 'Led the hardware development and sensor integration for an Arduino-based smart irrigation bot, applying control logic to a physical, hands-on system.',
      skills: ['Embedded Systems', 'Arduino', 'Hardware Integration', 'IoT'],
      image: 'https://images.pexels.com/photos/159298/gears-cogs-machine-machinery-159298.jpeg?auto=compress&cs=tinysrgb&w=800',
      hasLiveLink: false,
      icon: Cpu,
      accent: 'from-emerald-400 to-green-600',
      detailedDescription: 'Developed an intelligent irrigation system using Arduino microcontrollers, integrating soil moisture sensors, weather API data, and automated watering mechanisms. Implemented machine learning algorithms for predictive watering schedules and created a mobile app interface for remote monitoring and control.'
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

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
            E-commerce Lead who scaled a brand to 4M+ PKR in revenue | Shopify Development & Digital Strategy
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
            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-lg leading-relaxed mb-6 text-white/90">
                As a Computer Science student, I quickly came to a pivotal realization: the most impactful technology isn't just about elegant algorithms or cutting-edge frameworks—it's about solving real problems and driving tangible business outcomes.
              </p>
              <p className="text-lg leading-relaxed mb-6 text-white/90">
                This insight led me to dive deep into the e-commerce ecosystem, where I discovered my passion for turning digital ideas into profitable ventures. Through my role at Daak and Co., I learned to navigate the complex intersection of technology, marketing, and operations, successfully scaling the brand to over 4M+ PKR in revenue.
              </p>
              <p className="text-lg leading-relaxed mb-6 text-white/90">
                But the entrepreneurial spirit within me wanted to go further. I co-founded Insurgo, a venture dedicated to providing end-to-end e-commerce solutions. This experience taught me invaluable lessons about building systems from the ground up, managing diverse teams, and adapting strategies across various market niches—from wellness and fashion to consumer goods.
              </p>
              <p className="text-lg leading-relaxed text-white/90">
                Now, as I approach the final phase of my academic journey, I'm channeling my technical skills and business acumen toward what I believe is the next frontier: Generative AI. My final year project on developing Visual Transformers for gravitational wave data classification represents this pivot—applying deep learning to solve complex, real-world problems. I'm actively seeking opportunities to contribute to a team that is building the next generation of intelligent technology.
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
          
          {/* Carousel Container */}
          <div className="relative fade-in">
            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 glass-panel p-3 rounded-full hover:bg-white/10 transition-all duration-300 group"
            >
              <ChevronLeft className="w-6 h-6 text-white group-hover:text-cyan-400" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 glass-panel p-3 rounded-full hover:bg-white/10 transition-all duration-300 group"
            >
              <ChevronRight className="w-6 h-6 text-white group-hover:text-cyan-400" />
            </button>

            {/* Carousel Track */}
            <div className="overflow-hidden rounded-3xl">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {projects.map((project, index) => {
                  const IconComponent = project.icon;
                  return (
                    <div key={project.id} className="w-full flex-shrink-0 px-4">
                      {/* Bento Box Layout */}
                      <div className="glass-panel p-6 h-[600px] flex flex-col">
                       <div className="glass-panel p-6 md:p-8 flex flex-col h-[700px] md:h-[650px]">
  {/* --- 1. Image Panel (Landscape on Desktop, Portrait on Mobile) --- */}
  <div className="w-full h-auto rounded-2xl overflow-hidden aspect-[3/4] md:aspect-[16/9] mb-4">
    <img
      src={project.image}
      alt={project.title}
      className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
    />
  </div>

  {/* --- 2. Description Panel --- */}
  <div className="flex-grow flex flex-col">
    <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
    <p className="text-white/80 text-base leading-relaxed mb-4">
      {project.description}
    </p>
  </div>

  {/* --- 3. Links Panel (Dynamic Columns) --- */}
  <div className="mt-auto pt-4 border-t border-white/10">
    <div className={`grid gap-4 ${project.hasLiveLink ? 'grid-cols-2' : 'grid-cols-1 place-items-center'}`}>
      {/* Live Site Button (conditional) */}
      {project.hasLiveLink && (
        <button className="w-full text-base bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-4 py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
          <ExternalLink className="w-5 h-5" />
          Live Site
        </button>
      )}
      {/* View More Button */}
      <button 
        onClick={() => openModal(project)}
        className="w-full text-base border border-white/30 hover:border-cyan-400 text-white hover:text-cyan-400 font-medium px-4 py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
      >
        <ChevronDown className="w-5 h-5" />
        View More
      </button>
    </div>
  </div>
</div>
              
                          </div>
                        </div>
         

            {/* Pagination Dots */}
            <div className="flex justify-center mt-8 space-x-2">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
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
                href="mailto:ahmed@example.com"
                className="p-4 glass-panel hover:bg-cyan-500/20 transition-all duration-300 rounded-full group"
              >
                <Mail className="w-6 h-6 text-white group-hover:text-cyan-400 transition-colors" />
              </a>
              <a
                href="https://linkedin.com/in/ahmed-hassan"
                className="p-4 glass-panel hover:bg-cyan-500/20 transition-all duration-300 rounded-full group"
              >
                <Linkedin className="w-6 h-6 text-white group-hover:text-cyan-400 transition-colors" />
              </a>
              <a
                href="https://github.com/ahmed-hassan"
                className="p-4 glass-panel hover:bg-cyan-500/20 transition-all duration-300 rounded-full group"
              >
                <Github className="w-6 h-6 text-white group-hover:text-cyan-400 transition-colors" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-white/60 border-t border-white/10">
        <p>&copy; 2025 Ally Abdullah. Crafted with passion for innovation.</p>
      </footer>

      {/* Modal */}
      {modalProject && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-panel p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>
            
            <div className="mb-6">
              <h3 className="text-3xl font-bold text-white mb-2">{modalProject.title}</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {modalProject.skills.map((skill: string) => (
                  <span key={skill} className="skill-tag text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <img
                src={modalProject.image}
                alt={modalProject.title}
                className="w-full h-64 object-cover rounded-2xl"
              />
            </div>

            <div className="prose prose-lg prose-invert max-w-none">
              <h4 className="text-xl font-semibold text-cyan-400 mb-4">Project Overview</h4>
              <p className="text-white/90 leading-relaxed mb-6">
                {modalProject.detailedDescription}
              </p>
              
              <h4 className="text-xl font-semibold text-cyan-400 mb-4">Key Achievements</h4>
              <p className="text-white/80 leading-relaxed">
                Detailed case study including the challenge, my process, and the outcome. This project demonstrates my ability to deliver high-impact solutions that drive measurable business results through strategic thinking and technical execution.
              </p>
            </div>

            {modalProject.hasLiveLink && (
              <div className="mt-8 flex justify-center">
                <button className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-6 py-3 rounded-full transition-all duration-300 hover:scale-105">
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
import { Logo } from "@once-ui-system/core";

const person = {
  firstName: "Chanuka",
  lastName: "Senevirathne",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "AI-Driven Data Engineer | Cloud Architect | ML Solutions Developer | Full Stack Developer",
  avatar: "/images/skills/me.jpeg",
  email: "ChanukaSenevirathne@gmail.com",
  location: "Asia/Colombo",
  languages: ["English", "Sinhala"],
  bio: "Passionate technologist with expertise in AI, data engineering, and cloud architecture. Specializing in building scalable solutions and implementing cutting-edge machine learning models. Experienced in full-stack development with a focus on creating efficient, data-driven applications.",
};

const newsletter = {
  display: true,
  title: <>Subscribe to {person.firstName}&apos;s Newsletter</>,
  description: (
    <>
      Gain exclusive insights into cutting-edge AI, robust data engineering practices, and scalable cloud solutions.
    </>
  ),
};

const social = [
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/chanukas-byte",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/chanukasenevirathne/",
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
  },
];

const home = {
  path: "/",
  label: "Home",
  title: "AI-Driven Data Engineer | Cloud Architect | ML Solutions Developer",
  description: "Empowering Data with AI & Cloud Innovation. As an AI-driven Data Engineer and Cloud Architect, I specialize in architecting and deploying scalable data solutions across cloud platforms.",
  headline: "Empowering Data with AI & Cloud Innovation",
  subline: "As an AI-driven Data Engineer and Cloud Architect, I specialize in architecting and deploying scalable data solutions across cloud platforms. With expertise in Python, R, and C++, I develop robust machine learning models and data pipelines. My experience spans from full-stack development to implementing advanced AI solutions, focusing on creating efficient, data-driven applications that drive business value.",
  featured: {
    display: true,
    title: "Recent project: AI-powered Data Pipeline",
    href: "/work/projects/data-pipeline-automation",
  },
  projects: [
    {
      type: "Project",
      title: "AI-Driven Predictive Analytics Platform",
      description: "Engineered a comprehensive AI platform, integrating advanced machine learning models with scalable data engineering systems for real-time predictive analytics and actionable insights.",
      path: "/work/projects/data-pipeline-automation"
    },
    {
      type: "Project",
      title: "Enterprise Data Engineering & ML Integration",
      description: "Designed and implemented an integrated platform combining sophisticated data engineering with advanced machine learning capabilities, enabling autonomous data processing and operational intelligence.",
      path: "/work/projects/robotics-ml-platform"
    },
  ],
};

const about = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Exploring the journey of ${person.name}, an AI-driven Data Engineer based in Colombo, Sri Lanka. Discover my expertise in data architecture, cloud solutions, and machine learning.`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: true,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        <b>As an AI-driven Data Engineer,</b> I am passionate about architecting and implementing intelligent data solutions. My expertise lies in integrating cutting-edge AI technologies with robust data engineering practices, creating scalable, efficient, and impactful systems. <br />
        <span style={{ color: '#3182ce' }}>#DataEngineering</span> <span style={{ color: '#805ad5' }}>#AI</span> <span style={{ color: '#38a169' }}>#Cloud</span>
      </>
    ),
  },
  work: {
    display: true,
    title: "Professional Experience",
    experiences: [
      // Removed company experience as requested
    ],
  },
  studies: {
    display: true,
    title: "Academic Journey",
    institutions: [
      {
        name: "Rahula College, Matara",
        date: "2010 - 2018",
        icon: "graduationCap",
        description: <>
          Achieved exceptional results in Ordinary Level (O/L) with <b>8 A's and 1 B</b>, and strong performance in Advanced Level (A/L) Engineering Technology Stream (B, C, C) with a Z-score of 1.13.
        </>,
      },
      {
        name: "SLIIT",
        date: "2019 - Present",
        icon: "graduationCap",
        description: <>
          Currently pursuing a <b>BSc (Hons) in Information Technology</b>, specializing in Data Science, with a strong focus on advanced data analytics and machine learning methodologies.
          Currently hanging with 3.32 CGPA
        </>
      },
    ],
    floating: true,
  },
  technical: {
    display: true,
    title: "Core Technical Competencies",
    floating: true,
    skills: [
      {
        title: "HTML/CSS",
        description: "Expert in crafting responsive and semantic web interfaces.",
        images: [{ src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", alt: "HTML5" }, { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", alt: "CSS3" }],
      },
      {
        title: "Bootstrap",
        description: "Proficient in building responsive, mobile-first projects on the web.",
        images: [{ src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg", alt: "Bootstrap" }],
      },
      {
        title: "Sass",
        description: "Skilled in using Sass for more powerful and maintainable CSS.",
        images: [{ src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg", alt: "Sass" }],
      },
      {
        title: "NumPy",
        description: "Experienced in leveraging NumPy for scientific computing.",
        images: [{ src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg", alt: "NumPy" }],
      },
      {
        title: "Pandas",
        description: "Adept at data manipulation and analysis with Pandas.",
        images: [{ src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original-wordmark.svg", alt: "Pandas" }],
      },
      {
        title: "Python",
        description: "Advanced proficiency in Python for data science and ML.",
        images: [{ src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", alt: "Python" }],
      },
      {
        title: "R",
        description: "Expert in statistical computing and data analysis using R.",
        images: [{ src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/r/r-original.svg", alt: "R" }],
      },
      {
        title: "React",
        description: "Familiar with building user interfaces with the React library.",
        images: [{ src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", alt: "React" }],
      },
      {
        title: "MongoDB",
        description: "Proficient in using MongoDB as a NoSQL database solution.",
        images: [{ src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", alt: "MongoDB" }],
      },
      {
        title: "Express",
        description: "Building backend applications and APIs with Express.js.",
        images: [{ src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", alt: "Express" }],
      },
      {
        title: "C++",
        description: "Strong foundation in C++ for high-performance applications.",
        images: [{ src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg", alt: "C++" }],
      },
      {
        title: "Java",
        description: "Proficient in Java for developing robust enterprise applications.",
        images: [{ src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", alt: "Java" }],
      },
      {
        title: "TypeScript",
        description: "Writing scalable and robust code using TypeScript.",
        images: [{ src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", alt: "TypeScript" }],
      },
      {
        title: "Next.js",
        description: "Building server-rendered React applications with Next.js.",
        images: [{ src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", alt: "Next.js" }],
      },
      {
        title: "SQL",
        description: "Strong expertise in database design and management.",
        images: [{ src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", alt: "SQL" }],
      },
      {
        title: "PHP",
        description: "Experience in server-side scripting with PHP.",
        images: [{ src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg", alt: "PHP" }],
      },
    ],
  },
  tools: {
    display: true,
    title: "Tools and Technologies",
    floating: true,
    skills: [
        {
            title: "AWS",
            description: "Skilled in Amazon Web Services for cloud solutions.",
            images: [{ src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg", alt: "AWS" }],
        },
        {
            title: "Azure",
            description: "Experienced with Microsoft Azure for cloud services.",
            images: [{ src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg", alt: "Azure" }],
        },
        {
            title: "Docker",
            description: "Skilled in containerization with Docker.",
            images: [{ src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", alt: "Docker" }],
        },
        {
            title: "Kubernetes",
            description: "Managing containerized applications with Kubernetes.",
            images: [{ src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg", alt: "Kubernetes" }],
        },
        {
            title: "Selenium",
            description: "Competent in web automation with Selenium.",
            images: [{ src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/selenium/selenium-original.svg", alt: "Selenium" }],
        },
        {
            title: "PyTorch",
            description: "Experience in deep learning with PyTorch.",
            images: [{ src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg", alt: "PyTorch" }],
        },
        {
            title: "Apache Kafka",
            description: "Working with streaming data using Apache Kafka.",
            images: [{ src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachekafka/apachekafka-original.svg", alt: "Apache Kafka" }],
        },
        {
            title: "Apache Hadoop",
            description: "Knowledge of big data processing with Hadoop.",
            images: [{ src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/hadoop/hadoop-original.svg", alt: "Apache Hadoop" }],
        },
        {
            title: "Power BI",
            description: "Expert in BI with Power BI.",
            images: [{ src: "https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg", alt: "Power BI" }],
        },
        {
            title: "Tableau",
            description: "Proficient in data visualization with Tableau.",
            images: [{ src: "https://api.iconify.design/logos/tableau-icon.svg", alt: "Tableau" }],
        },
        {
            title: "Google Colab",
            description: "Using Google Colab for ML projects.",
            images: [{ src: "https://upload.wikimedia.org/wikipedia/commons/d/d0/Google_Colaboratory_SVG_Logo.svg", alt: "Google Colab" }],
        },
    ]
  },
  timeline: [],
};

const work = {
  path: "/work",
  label: "Work",
  title: `Work – ${person.name}`,
  description: "A showcase of my projects and contributions.",
  github: {
    display: true,
    username: "chanukas-byte",
    showPinned: true,
  },
  projects: [
    {
      title: "Automate Design Handovers with a Figma-to-Code Pipeline",
      description: "A streamlined process for converting Figma designs into production-ready code, improving efficiency and collaboration between designers and developers.",
      path: "/work/projects/automate-design-handovers-with-a-figma-to-code-pipeline",
      cover: "/images/projects/project-01/cover-01.jpg",
    },
    {
      title: "Building Once UI: A Customizable Design System",
      description: "A comprehensive design system that ensures brand consistency and accelerates development with reusable and customizable UI components.",
      path: "/work/projects/building-once-ui-a-customizable-design-system",
      cover: "/images/projects/project-01/cover-02.jpg",
    },
    {
      title: "Data Pipeline Automation",
      description: "An automated data pipeline for ingesting, processing, and analyzing large volumes of data, enabling real-time insights and data-driven decision-making.",
      path: "/work/projects/data-pipeline-automation",
      cover: "/images/projects/project-01/cover-03.jpg",
    },
    {
      title: "Power BI Dashboard",
      description: "An interactive and insightful Power BI dashboard for visualizing key business metrics and performance indicators.",
      path: "/work/projects/power-bi-dashboard",
      cover: "/images/projects/project-01/cover-04.jpg",
    },
    {
      title: "Robotics ML Platform",
      description: "A machine learning platform for robotics applications, enabling autonomous navigation, object recognition, and intelligent control.",
      path: "/work/projects/robotics-ml-platform",
      cover: "/images/projects/project-01/cover-01.jpg",
    },
    {
      title: "Simple Portfolio Builder",
      description: "A user-friendly tool for creating and customizing personal portfolios with ease, showcasing skills and projects effectively.",
      path: "/work/projects/simple-portfolio-builder",
      cover: "/images/projects/project-01/cover-02.jpg",
    },
  ],
};

const blog = {
  path: "/blog",
  label: "Blog",
  title: `Blog – ${person.name}`,
  description: "A collection of my thoughts and writings.",
};

const services = {
  path: "/services",
  label: "Services",
  title: `Services – ${person.name}`,
  description: "A collection of my services.",
};

about.timeline = [
  {
    type: 'education',
    title: 'Rahula College, Matara',
    date: '2008 - 2022',
    icon: 'school',
    color: 'linear-gradient(135deg, #3182ce, #38a169)',
    details: <>
      <b>Ordinary Level (O/L):</b> 8A's, 1B<br />
      <b>Advanced Level (A/L):</b> Engineering Technology Stream (B, C, C) — Z-score: 1.13
    </>,
  },
  {
    type: 'extracurricular',
    title: 'Sri Lanka Cadet Corps',
    date: '2016 - 2017',
    icon: 'shieldCheck',
    color: 'linear-gradient(135deg, #4299e1, #ecc94b)',
    details: <>Former Member of Sri Lanka Cadet Corps</>,
  },
  {
    type: 'extracurricular',
    title: 'Sri Lanka Scout Team',
    date: '2015 - 2017',
    icon: 'users',
    color: 'linear-gradient(135deg, #48bb78, #f56565)',
    details: <>Sri Lanka Scout Team Member</>,
  },
  {
    type: 'education',
    title: 'SLIIT',
    date: '2023 - Present',
    icon: 'graduationCap',
    color: 'linear-gradient(135deg, #805ad5, #3182ce)',
    details: <>
      Currently Undergraduate — <b>BSc (Hons) in Information Technology</b>, Specializing in Data Science<br />
      Currently GPA 3.32
    </>,
  },
  {
    type: 'extracurricular',
    title: 'Leo Club of SLIIT',
    date: '2023 - Present',
    icon: 'heart',
    color: 'linear-gradient(135deg, #f6ad55, #805ad5)',
    details: <>Volunteer, Member of Leo Club of SLIIT</>,
  },
  {
    type: 'skills',
    title: 'Technical Skills',
    date: '',
    icon: 'sparkles',
    color: 'linear-gradient(135deg, #38a169, #f6e05e)',
    details: <>
      <ul style={{display:'flex',flexWrap:'wrap',gap:'16px',listStyle:'none',padding:0,margin:0}}>
        {about.technical.skills.map((skill, i) => (
          <li key={i} style={{display:'flex',alignItems:'center',gap:'8px',background:'rgba(255,255,255,0.04)',borderRadius:'8px',padding:'8px 12px'}}>
            <span style={{fontSize:'1.2em'}}><img src={skill.images?.[0]?.src || ''} alt={skill.title} style={{width:24,height:24,objectFit:'contain'}} /></span>
            <span>{skill.title}</span>
          </li>
        ))}
      </ul>
    </>,
  },
];

const routes = {
  "/": true,
  "/about": true,
  "/work": true,
  "/services": true,
  "/blog": true,
  "/gallery": false,
  "/contact": false,
};

const display = {
  location: true,
  time: true,
  themeSwitcher: true,
};

export { person, social, newsletter, home, about, work, blog, services, routes, display };


export const faqData = [
  {
    category: "General Project Questions",
    questions: [
      {
        question: "What is the main idea behind BrainMessenger? What makes it special?",
        answer: "BrainMessenger is not just another messenger. Our main idea is to create a Digital ASSET (Principle 10) that simplifies complex interaction (Margulan Seisembayev's principle) and serves as a reliable tool for effective communication. We are focused on quality (Principle 3), security (Principle 5), and reliability (Principle 3), not just a set of features. We are building a SYSTEM (Principle 9) that reflects our principles and is constantly improving."
      },
      {
        question: "What key principles underpin the development of BrainMessenger?",
        answer: "The project is based on a set of 15 key principles (see My Key Principles), inspired by Margulan Seisembayev and IT industry best practices. The most important ones influencing code and processes are: Continuous Learning (Principle 1), Value Creation (Principle 2), Quality > Quantity (Principle 3), System and Optimization (Kaizen, Principle 9), Long-Term Thinking (Principle 8), Pragmatism and Realism (Principle 12), Persistence (Principle 13), Bias for Action (Principle 15). We strive for these principles to permeate all aspects of the project."
      },
      {
        question: "Who is behind the project? Is it an open community or a team?",
        answer: "Currently, the project is at an early stage and is actively being developed by one person (you), who is the driving force and bears responsibility (Principle 6) for its construction. In the future, it is planned to attract contributors and possibly form a team. The project is open for contributions (see CONTRIBUTING.md)."
      }
    ]
  },
  {
    category: "Technical Questions",
    questions: [
      {
        question: "Why was this particular technology stack chosen (TypeScript, NestJS, React/RN, PostgreSQL/Neon, GraphQL, Kafka, Redis, Cloudflare R2, etc.)?",
        answer: "The choice of stack is based on pragmatism (Principle 12), long-term thinking (Principle 8), and the pursuit of quality (Principle 3) and scalability (NFR-14, NFR-15).\n*   TypeScript: Increases code reliability and maintainability through strong typing.\n*   NestJS: Provides a powerful, modular architecture for the Backend, simplifying the construction of scalable applications.\n*   React/React Native/Next.js: Allow building UI for different platforms from a single codebase (cross-platform) and provide good performance.\n*   PostgreSQL (Neon): A reliable, proven relational database with extensive scaling and optimization capabilities. Neon as a managed service reduces operational overhead (Pragmatism).\n*   Prisma: Chosen as a reliable ORM, providing type safety and built-in protection against SQL injection (Quality, Security).\n*   GraphQL: Allows clients to request only the data they actually need with a single query, optimizing network interaction (especially for mobile clients) and reducing data redundancy compared to REST. GraphQL also simplifies fetching related data (solving N+1 problems with DataLoader).\n*   Kafka: Chosen for reliable asynchronous task processing, which is critical for scalability and fault tolerance.\n*   Redis: High-performance In-memory store for caching, Rate Limiting, and real-time state management.\n*   Cloudflare R2: Object storage with very favorable terms (no egress fees), ideal for storing user files (Pragmatism, ASSET).\n\nThis stack allows laying a solid technical foundation (Principle 8) for future development."
      },
      {
        question: "Why is a monolithic architecture used at the start, rather than microservices immediately?",
        answer: "Using a monolithic architecture at the start (MVP) is a pragmatic and realistic decision (Principle 12). It allows for rapid development and iteration of basic functionality, minimizing complexity at an early stage when the team is small. Launching the MVP is more important than building an overly complex architecture. Once the MVP will be completed and the project starts to grow, a phased transition to microservices is planned (see Microservice Migration Plan)."
      },
      {
        question: "What approaches are used to ensure security?",
        answer: "Security is a fundamental aspect (Principle 5) and a priority (see Security Guide).\n*   Data encryption in transit (TLS 1.2+) and at rest (AES for sensitive data, encryption in R2).\n*   Strong password hashing (bcrypt/argon2).\n*   Using Prisma to prevent SQL injection.\n*   Validation of all input data on the Backend.\n*   Two-factor authentication (2FA) via email.\n*   Rate Limiting to protect against brute-force and DDoS attacks.\n*   Regular vulnerability scanning.\n*   Storing secrets in secure locations (Kubernetes Secrets)."
      },
      {
        question: "How is real-time functionality implemented (message exchange)?",
        answer: "Real-time functionality (message exchange) is implemented using WebSockets. The Backend (NestJS Gateway) manages WebSocket connections, and clients subscribe to chat events. Message delivery occurs via WebSocket. For scaling WebSockets in a microservice architecture, Redis Pub/Sub or Kafka will be used."
      },
      {
        question: "Why is GraphQL used instead of REST API?",
        answer: "GraphQL allows clients to request only the data they actually need with a single query. This optimizes network interaction (especially for mobile clients) and reduces data redundancy compared to REST. GraphQL also simplifies fetching related data (solving N+1 problems with DataLoader)."
      },
      {
        question: "How are large volumes of data and files managed?",
        answer: "*   Structured data (messages, users, chats): Stored in PostgreSQL (Neon). Indexes and query optimization (Prisma) are used for fast retrieval. As it grows, table partitioning and database replication are planned.\n*   Unstructured data (files, images): Stored in Cloudflare R2. Asynchronous processing (Kafka) is used for image optimization before uploading. R2 is chosen for scalability and favorable traffic rates."
      }
    ]
  },
  {
    category: "Development Processes",
    questions: [
      {
        question: "What is the approach to project and task management?",
        answer: "The project is managed using a planning system (see My Planning System 2025-2026) in Notion. Global goals are decomposed into stages (Roadmap), weekly planning, and a task tracker are used. An important element is the Kaizen Hour (Principle 9) for daily reflection, analyzing bottlenecks, and finding ways to improve."
      },
      {
        question: "How is code quality ensured?",
        answer: "Code quality is ensured through systematic approaches (Principle 3, 9):\n*   Using TypeScript with strict typing.\n*   Adhering to coding standards (ESLint, Prettier).\n*   Code review of all changes.\n*   Automated testing at different levels (Unit, Integration, E2E).\n*   Continuous Integration (CI) for automatic code and test checks on every commit/PR."
      },
      {
        question: "What testing strategy is used?",
        answer: "A multi-level testing strategy is used (see Testing Guide), combining manual and automated testing: Unit, Integration, API, E2E, Load, Security, Regression. Tests are integrated into CI/CD. The focus is on verifying key requirements (FRs, NFRs)."
      },
      {
        question: "How are errors handled?",
        answer: "Errors are handled centrally and uniformly on the Backend (NestJS Exception Filters) and converted to a standard API response format with codes (extensions.code). On the Frontend, errors are processed based on these codes, displaying a clear message to the user and suggesting an action. All errors are thoroughly logged (Winston → ELK) and sent to Sentry for tracking and analysis (see Error Specification, Monitoring Guide)."
      },
      {
        question: "How is the project deployed?",
        answer: "Deployment is automated through a CI/CD pipeline (GitHub Actions). Docker is used for containerization and Kubernetes for orchestration in the cloud. Infrastructure is described as code (Terraform). The process includes automatic build, testing, image publishing, and Rolling Updates in Kubernetes for zero-downtime deployment (see Deployment Guide)."
      },
      {
        question: "How is the system monitored in production?",
        answer: "The monitoring system is the eyes and ears of the project (Principle 9, 5). The following are used:\n*   Prometheus for collecting performance and resource metrics.\n*   Grafana for visualizing metrics and dashboards.\n*   Sentry for tracking application errors (Frontend and Backend).\n*   ELK Stack (or Kibana with Winston) for centralized logging and analysis.\n*   Alertmanager for configuring automatic alerts about problems.\nThese tools allow for proactive problem identification and optimization (see Monitoring Guide)."
      }
    ]
  },
  {
    category: "Status, Roadmap, and Future",
    questions: [
      {
        question: "What is the current status of the project?",
        answer: "The project is in the active development phase of the Minimum Viable Product (MVP). The main technological foundation has been laid, key UI elements and basic security have been implemented. The core messaging, file handling, and group/channel creation are in progress. (See BrainMessenger Project Requirements (MVP) Guide)."
      },
      {
        question: "What are the next steps after completing the MVP?",
        answer: "After completing the MVP, the next steps include adding advanced functions (audio/video calls, Premium, extended security, full set of animations and localization), further performance optimization, and preparing for scaling. A detailed plan is presented in the BrainMessenger Roadmap (see Roadmap)."
      },
      {
        question: "Is a transition to a microservice architecture planned?",
        answer: "Yes, the transition to microservices is part of the long-term development strategy (Principle 8). It is planned in stages, starting from Q1 2026, using the Strangler Pattern approach. This will allow components to be scaled independently, increasing fault tolerance and flexibility (see Microservice Migration Plan)."
      }
    ]
  },
  {
    category: "Challenges, Opportunities, and Limitations",
    questions: [
      {
        question: "What are the main technical challenges (pitfalls) in the project?",
        answer: "*   Implementing reliable real-time functionality (WebSockets): Managing thousands of simultaneous connections, reliable message delivery, managing online/offline status.\n*   Scaling the database with large data volumes: Managing the growth of the messages table (partitioning), optimizing complex queries.\n*   Handling and delivering files: Efficient uploading, image optimization, secure downloading from Cloudflare R2.\n*   Transitioning to microservices: Increased operational complexity, configuring inter-service communication (Kafka, GraphQL Federation), data migration.\n*   Maintaining high quality and performance: Continuous optimization at all levels (Backend, Frontend, Infrastructure) as load and functionality grow."
      },
      {
        question: "What opportunities and advantages does the project's architecture and stack provide?",
        answer: "*   High scalability: The chosen technologies (NestJS, Kubernetes, Kafka, Redis, Neon, R2) allow the application to be scaled horizontally to support a large number of users.\n*   Reliability and fault tolerance: Using reliable services, asynchronous processing (Kafka), monitoring, and, in the future, microservices increases the system's resilience to failures.\n*   High performance: GraphQL, caching, query optimization, asynchronous processing contribute to the application's fast operation.\n*   Cross-platform compatibility: React Native and Next.js allow creating applications for all major platforms from a single codebase (for UI).\n*   Code quality and maintainability: TypeScript, NestJS, Prisma, coding standards, testing simplify development and reduce the number of defects.\n*   Cost-effectiveness (at the start): Using free/affordable tiers (Neon, R2) and proven open-source solutions.\n*   Rich ecosystem: Using popular technologies with a large community and many ready-made libraries."
      },
      {
        question: "What are the project's limitations at the current stage (MVP)?",
        answer: "*   Limited set of features compared to the vision (no calls, Premium, enhanced security).\n*   Limited multilingualism and accessibility options (expansion planned).\n*   The architecture is currently monolithic, which imposes limitations on independent scaling of individual parts.\n*   There may be performance limitations under load significantly exceeding the target for MVP (~1000 simultaneous users) before implementing deep optimizations and microservices."
      }
    ]
  },
  {
    category: "Learn More and Contribute",
    questions: [
      {
        question: "Where can I get more detailed information about the project?",
        answer: "All detailed documentation is available in the repository. We strive to make it as complete and up-to-date as possible:\n\n*   [Requirements Documentation](link): What we are building.\n*   [Development Guide](link): How we write code.\n*   [Technical Documentation](link): Architecture and stack.\n*   [API Specification](link): Component interaction.\n*   [Integrations Documentation](link): External services.\n*   [Security Guide](link): Protecting the ASSET.\n*   [Performance Guide](link): How to make the system fast.\n*   [Monitoring and Logging Guide](link): State visibility.\n*   [UI Documentation](link): Visual design.\n*   [Sound Documentation](link): Audio system.\n*   [Support and Maintenance Guide](link): Life after release.\n*   [Error Specification](link): Handling failures.\n*   [Testing Guide](link): Quality assurance.\n*   [Microservice Migration Plan](link): Evolution strategy.\n*   [MVP Requirements Guide](link): MVP details.\n\n(Ensure all [link] point to the corresponding files in your repository)"
      },
      {
        question: "How can I join the project development or contribute?",
        answer: "We welcome contributions to building this digital ASSET (Principle 10)! You can contribute in various ways: code, design/UX suggestions, documentation improvements, testing assistance. Please refer to the [Contribution Guide](CONTRIBUTING.md) (if available). Your participation is part of the Power of Assistance (Margulan's principle) that makes the project stronger."
      },
      {
        question: "Where can I ask additional questions?",
        answer: "If you have questions not covered by this documentation, please use the Issues section in the GitHub repository."
      }
    ]
  }
];

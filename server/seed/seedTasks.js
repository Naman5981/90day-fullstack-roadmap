const Task = require('../models/Task');

const seedTasks = async () => {
    try {
        // Check if tasks already exist
        const existingTasks = await Task.countDocuments();
        
        if (existingTasks > 0) {
            console.log(`✅ Database already has ${existingTasks} tasks. Skipping seed.`);
            return;
        }

        console.log('🌱 Database is empty. Seeding initial tasks...');
        
        let order = 0;

        // Helper to add task
        const addTask = async (text, parentId = null, isExpanded = false) => {
            const task = await Task.create({
                text,
                completed: false,
                parentId: parentId,
                isExpanded,
                order: order++
            });
            return task._id;
        };

        // MONTH 1
        const week1Id = await addTask('WEEK 1 — Node.js Deep Dive + MongoDB', null, true);
        await addTask('Node.js Internals', week1Id);
        await addTask('Event loop phases', week1Id);
        await addTask('Call stack, callback queue', week1Id);
        await addTask('Microtask vs macrotask', week1Id);
        await addTask('Concurrency model', week1Id);
        await addTask('Express Production Patterns', week1Id);
        await addTask('Folder structure (controllers/services/utils)', week1Id);
        await addTask('Central error handler', week1Id);
        await addTask('Response wrapper', week1Id);
        await addTask('Helmet + CORS', week1Id);
        await addTask('Rate limiting', week1Id);
        await addTask('Authentication (Production)', week1Id);
        await addTask('Access + Refresh token rotation', week1Id);
        await addTask('Secure cookies (httpOnly)', week1Id);
        await addTask('Token blacklist', week1Id);
        await addTask('Redis sessions', week1Id);
        await addTask('Performance', week1Id);
        await addTask('Redis caching', week1Id);
        await addTask('Pagination', week1Id);
        await addTask('Avoid N+1 queries', week1Id);
        await addTask('Scalable Architecture (Week outcome)', week1Id);
        await addTask('Layered structure', week1Id);
        await addTask('Stateless API', week1Id);
        await addTask('Horizontal scaling', week1Id);
        await addTask('Database indexing', week1Id);
        await addTask('Central logging', week1Id);

        const week2Id = await addTask('WEEK 2 — React + Next.js', null, false);
        await addTask('React Core', week2Id);
        await addTask('Hooks', week2Id);
        await addTask('Component lifecycle', week2Id);
        await addTask('Rendering model', week2Id);
        await addTask('Next.js Fundamentals', week2Id);
        await addTask('App Router', week2Id);
        await addTask('Server vs Client components', week2Id);
        await addTask('Routing', week2Id);
        await addTask('Metadata', week2Id);
        await addTask('Data + Performance', week2Id);
        await addTask('React Query', week2Id);
        await addTask('Suspense', week2Id);
        await addTask('useCallback/useMemo', week2Id);
        await addTask('UI', week2Id);
        await addTask('Dashboard layout', week2Id);
        await addTask('shadcn/ui components', week2Id);
        await addTask('Week Project: Admin dashboard with charts', week2Id);

        const week3Id = await addTask('WEEK 3 — AWS Cloud Foundations', null, false);
        await addTask('IAM: Users, roles, policies', week3Id);
        await addTask('EC2: SSH, security groups', week3Id);
        await addTask('S3: Buckets, static hosting', week3Id);
        await addTask('Lambda: Node.js functions', week3Id);
        await addTask('Lambda: API Gateway', week3Id);
        await addTask('DynamoDB: Partition/Sort keys', week3Id);
        await addTask('CloudWatch: Logs, metrics', week3Id);
        await addTask('Week Project: Node API on Lambda + S3 storage', week3Id);

        const week4Id = await addTask('WEEK 4 — Microservice Thinking + Integration', null, false);
        await addTask('Microservices Basics', week4Id);
        await addTask('API gateway', week4Id);
        await addTask('Inter-service communication', week4Id);
        await addTask('Queues (SQS)', week4Id);
        await addTask('Scalable system patterns', week4Id);
        await addTask('Event-driven design', week4Id);
        await addTask('Horizontal scaling', week4Id);
        await addTask('Mini Microservices: User service', week4Id);
        await addTask('Mini Microservices: Product service', week4Id);
        await addTask('Mini Microservices: Auth service', week4Id);
        await addTask('Week Project: Real-Time Dashboard (Node + Redis)', week4Id);

        // MONTH 2
        const week5Id = await addTask('WEEK 5 — Python Fundamentals', null, false);
        await addTask('Syntax essentials', week5Id);
        await addTask('Functions, args/kwargs', week5Id);
        await addTask('OOP basics', week5Id);
        await addTask('File handling', week5Id);
        await addTask('Exceptions', week5Id);
        await addTask('Virtual environments', week5Id);
        await addTask('Pip/uv', week5Id);
        await addTask('Async Python', week5Id);
        await addTask('Mini Project: File organizer', week5Id);
        await addTask('Mini Project: CLI tool', week5Id);
        await addTask('Mini Project: Simple REST API in FastAPI', week5Id);

        const week6Id = await addTask('WEEK 6 — FastAPI Backend', null, false);
        await addTask('Routing', week6Id);
        await addTask('pydantic schemas', week6Id);
        await addTask('Dependency injection', week6Id);
        await addTask('Async endpoints', week6Id);
        await addTask('Background tasks', week6Id);
        await addTask('JWT auth', week6Id);
        await addTask('File uploads', week6Id);
        await addTask('Mini Project: Auth service in FastAPI', week6Id);

        const week7Id = await addTask('WEEK 7 — AI Development (LangChain + Vector DBs)', null, false);
        await addTask('RAG fundamentals', week7Id);
        await addTask('Embeddings', week7Id);
        await addTask('Tokenization', week7Id);
        await addTask('Document loaders', week7Id);
        await addTask('Splitters', week7Id);
        await addTask('Vector DB (Chroma)', week7Id);
        await addTask('Chains', week7Id);
        await addTask('LangGraph basics', week7Id);
        await addTask('Project: AI PDF Q&A Chatbot (Python + LangChain + Chroma + FastAPI)', week7Id);

        // MONTH 3
        const week8Id = await addTask('WEEK 8 — Docker', null, false);
        await addTask('Dockerfile', week8Id);
        await addTask('Multi-stage builds', week8Id);
        await addTask('Docker Compose', week8Id);
        await addTask('Container networking', week8Id);
        await addTask('Volumes', week8Id);
        await addTask('Env management', week8Id);
        await addTask('Project: Containerize Node + Python services', week8Id);

        const week9Id = await addTask('WEEK 9 — Kubernetes Basics', null, false);
        await addTask('Pods', week9Id);
        await addTask('Deployments', week9Id);
        await addTask('Services', week9Id);
        await addTask('Ingress', week9Id);
        await addTask('ConfigMaps & Secrets', week9Id);
        await addTask('Autoscaling (HPA)', week9Id);
        await addTask('Project: Deploy microservices on Minikube', week9Id);

        const week10Id = await addTask('WEEK 10 — CI/CD + Terraform', null, false);
        await addTask('GitHub Actions pipelines', week10Id);
        await addTask('Docker build/deploy pipeline', week10Id);
        await addTask('K8s deploy automation', week10Id);
        await addTask('Terraform: Providers', week10Id);
        await addTask('Terraform: Variables', week10Id);
        await addTask('Terraform: EC2', week10Id);
        await addTask('Terraform: IAM', week10Id);
        await addTask('Terraform: S3', week10Id);
        await addTask('Project: IaC setup + automated deployment', week10Id);

        const week11Id = await addTask('WEEK 11-12 — Final Capstone Projects', null, false);
        await addTask('Final Project A: AI Knowledge Assistant - PDF ingestion', week11Id);
        await addTask('Final Project A: AI Knowledge Assistant - Embeddings', week11Id);
        await addTask('Final Project A: AI Knowledge Assistant - Vector DB', week11Id);
        await addTask('Final Project A: AI Knowledge Assistant - Chat interface', week11Id);
        await addTask('Final Project A: AI Knowledge Assistant - FastAPI backend', week11Id);
        await addTask('Final Project A: AI Knowledge Assistant - Deploy on AWS', week11Id);
        await addTask('Final Project B: Full-Stack Microservices - Node backend', week11Id);
        await addTask('Final Project B: Full-Stack Microservices - React frontend', week11Id);
        await addTask('Final Project B: Full-Stack Microservices - Redis caching', week11Id);
        await addTask('Final Project B: Full-Stack Microservices - MongoDB', week11Id);
        await addTask('Final Project B: Full-Stack Microservices - Notifications', week11Id);
        await addTask('Final Project B: Full-Stack Microservices - Docker + Kubernetes', week11Id);
        await addTask('Final Project B: Full-Stack Microservices - Full CI/CD', week11Id);

        const totalTasks = await Task.countDocuments();
        console.log(`✅ Seeded ${totalTasks} tasks successfully`);
    } catch (err) {
        console.error('❌ Seeding Error:', err);
        throw err; // Re-throw so caller can handle it
    }
};

module.exports = seedTasks;

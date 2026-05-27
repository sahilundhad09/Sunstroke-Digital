import { Cpu, Code2, Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAnalytics } from '../hooks/useAnalytics';
import SEO from '../components/common/SEO';

export default function About() {
  const { logClick } = useAnalytics();

  const skills = [
    { category: 'Frontend Stack', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Shadcn UI', 'Redux Toolkit'] },
    { category: 'Backend & DB', items: ['Node.js', 'Supabase', 'PostgreSQL', 'Express', 'GraphQL', 'Stripe Billing'] },
    { category: 'DevOps & Services', items: ['Vercel', 'Docker', 'AWS S3', 'Resend', 'GitHub Actions', 'Linux'] },
  ];



  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mx-auto max-w-5xl px-4 sm:px-6 py-16 text-left space-y-20"
    >
      <SEO 
        title="About Me - Creator Profile | Sunstroke Digital" 
        description="Software developer & digital product creator. Learn about my technical background, stack, and philosophy."
      />
      {/* 1. Bio & Photo section */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-8 space-y-6">
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            Hey, I'm Sahil.
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed">
            I am a software developer, digital product creator, and developer educator. I design and build production-ready templates, SaaS boilerplates, and content hubs that help engineers skip configuration hell and ship their ideas.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            I started Sunstroke Digital to solve my own frustration: spending the first week of every new project setting up databases, user authentication, styling architectures, and payment webhooks. My goal is to save you those 40+ hours so you can write actual business features.
          </p>

          {/* CTA & Socials */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link to="/products" onClick={() => logClick('about-cta-products')}>
              <Button className="bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-xl px-6 py-3 flex items-center">
                <span>Explore Products I've Built</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>

            {/* Social Links */}
            <div className="flex items-center space-x-3.5 ml-2">
              <a
                href="https://in.pinterest.com/sahilundhad09/"
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-violet-400 transition-colors"
                title="Pinterest"
                onClick={() => logClick('about-social-pinterest')}
              >
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12.289 2C6.617 2 2 6.617 2 12.289c0 4.305 2.651 8.01 6.446 9.585-.09-.8-.172-2.038.037-2.919l1.682-7.116s-.43-.86-.43-2.133c0-2 .115-3.5 1.5-3.5 1.417 0 2.102 1.064 2.102 2.338 0 1.425-.907 3.556-1.378 5.534-.391 1.65.823 3 2.45 3 2.94 0 5.2-3.1 5.2-7.575 0-3.96-2.846-6.728-6.907-6.728-4.707 0-7.47 3.53-7.47 7.18 0 1.42.548 2.943 1.232 3.77a.4.4 0 0 1 .093.385l-.462 1.884c-.075.308-.248.375-.57.225-2.115-.983-3.435-4.08-3.435-6.567 0-5.348 3.885-10.26 11.2-10.26 5.88 0 10.455 4.19 10.455 9.8 0 5.842-3.682 10.545-8.79 10.545-1.717 0-3.33-.892-3.88-1.937l-1.058 4.032c-.383 1.467-1.425 3.31-2.122 4.453C9.524 23.83 10.742 24 12 24c5.671 0 10.289-4.617 10.289-10.289C22.289 6.617 17.671 2 12.289 2z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/sunstroke09/"
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-pink-500 transition-colors"
                title="Instagram"
                onClick={() => logClick('about-social-instagram')}
              >
                <svg className="h-5 w-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a
                href="https://www.reddit.com/user/Adventurous-Law4162/"
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-orange-500 transition-colors"
                title="Reddit"
                onClick={() => logClick('about-social-reddit')}
              >
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 3.314 1.343 6.314 3.515 8.485.07.07.166.108.263.108h16.444c.097 0 .193-.038.263-.108C22.657 18.314 24 15.314 24 12c0-6.627-5.373-12-12-12zm6.07 15.228c-.18.18-.465.18-.645 0-1.344-1.344-3.535-1.344-4.88 0-.09.09-.207.135-.325.135s-.236-.045-.325-.135c-.18-.18-.18-.465 0-.645 1.7-1.7 4.485-1.7 6.185 0 .18.18.18.465 0 .645zm-1.808-3.328c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1zm-8.524 0c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1z" />
                </svg>
              </a>
              <a
                href="https://github.com/sahilundhad09"
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-white transition-colors"
                title="GitHub"
                onClick={() => logClick('about-social-github')}
              >
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="md:col-span-4 flex justify-center">
          <div className="relative">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 opacity-70 blur-md animate-pulse duration-[4000ms]" />
            <img
              src="/sahil_pic.jpg"
              alt="Sahil Undhad"
              className="relative h-44 w-44 rounded-full object-cover border border-border/80"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* 2. Tech Stack / Skills */}
      <section className="border-t border-[#2a2a2a] pt-16 space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Stack & Toolbox</h2>
          <p className="text-xs text-muted-foreground mt-1">My core technologies for shipping performant web applications.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skills.map((skill, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -4 }}
              className="p-6 rounded-2xl border border-[#2a2a2a] bg-[#111111] hover:border-violet-500 transition-all duration-300"
            >
              <h3 className="text-sm font-bold text-violet-400 mb-4 flex items-center">
                <Code2 className="h-4 w-4 mr-2" />
                <span>{skill.category}</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {skill.items.map((item) => (
                  <Badge key={item} variant="secondary" className="text-2xs bg-muted text-muted-foreground border-none">
                    {item}
                  </Badge>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>



      {/* Philosophy Callout */}
      <section className="border-t border-[#2a2a2a] pt-16 text-center max-w-2xl mx-auto space-y-4">
        <Cpu className="h-10 w-10 text-violet-400 mx-auto" />
        <h3 className="text-xl font-bold text-foreground">Development Philosophy</h3>
        <p className="text-xs text-muted-foreground leading-relaxed">
          I believe code should be easy to delete, simple to debug, and heavily documented. I prefer standard vanilla solutions over complex custom abstractions. If a tool saves 2 hours but takes 10 hours to debug, it is not worth importing.
        </p>
        <p className="text-2xs text-muted-foreground pt-4 flex items-center justify-center space-x-1">
          <span>Made with</span>
          <Heart className="h-3 w-3 text-red-500 fill-current" />
          <span>Ahmedabad, Gujarat,India</span>
        </p>
      </section>
    </motion.div>
  );
}

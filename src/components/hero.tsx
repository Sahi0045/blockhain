import { motion } from "framer-motion";
import { Modal, ModalBody, ModalContent, ModalTrigger } from "./ui/animated-modal.tsx";
import CreateMemeForm from "./create-meme-form.tsx";
import { Link } from "wouter";
import { 
  Trophy, 
  Coins, 
  Users, 
  Rocket, 
  Gift, 
  Sparkles, 
  TrendingUp, 
  Share2, 
} from "lucide-react"; // Add Lucide icons
import { StickyScroll } from "./ui/sticky-scroll-reveal";

export default function Hero() {
  const scrollContent = [
    {
      title: "Create & Earn",
      description: "Turn your creativity into crypto. Create viral memes and earn through community donations.",
      icon: Rocket,
      benefits: [
        "Gasless meme creation",
        "Built-in meme editor",
        "Instant publishing",
        "Earn XP for creation"
      ],
      content: (
        <div className="relative w-full h-full">
          <img
            src="https://clideo.com/files/content/twitter-meme-maker-1.png"
            className="object-cover w-full h-full rounded-xl"
            alt="Meme creation"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>
      ),
    },
    {
      title: "Community Power",
      description: "Join a vibrant community where great memes get rewarded. Your creativity can turn into valuable tokens.",
      icon: Users,
      benefits: [
        "Community voting",
        "Crypto donations",
        "30% to early supporters",
        "Creator ownership"
      ],
      content: (
        <div className="relative w-full h-full">
          <img
            src="/meme.jpeg"
            className="object-cover w-full h-full rounded-xl"
            alt="Community"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>
      ),
    },
    {
      title: "Social Impact",
      description: "Every meme makes a difference. Be part of a movement that combines creativity with social good.",
      icon: Trophy,
      benefits: [
        "10% to UBI initiatives",
        "Sustainable meme economy",
        "Community governance",
        "Positive-sum game"
      ],
      content: (
        <div className="relative w-full h-full">
          <img
            src="/impact.jpg"
            className="object-cover w-full h-full rounded-xl"
            alt="Impact"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>
      ),
    },
  ];

  return (
    <main className="flex flex-col min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Hero Section */}
      <section className="w-full py-8 md:py-24 lg:py-32 overflow-hidden relative px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10"
        >
          <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto">
            <div className="space-y-3 md:space-y-4">
              <h1 className="text-2xl md:text-3xl lg:text-5xl xl:text-6xl/none font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-pink-500">
                The First Gamified Meme Economy
              </h1>
              <p className="text-sm md:text-base lg:text-xl text-muted-foreground max-w-2xl mx-auto">
                Create, earn, and dominate! Join the revolution where meme creation meets gaming. Level up your creativity and earn real rewards.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-6 md:mt-8 w-full sm:w-auto">
              <Modal>
                <ModalTrigger className="w-full sm:w-auto">
                  <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold hover:opacity-90 transition-all">
                    🎨 Create Meme (+100 XP)
                  </button>
                </ModalTrigger>
                <ModalBody>
                  <ModalContent className="bg-black dark:bg-white dark:text-black text-white">
                    <CreateMemeForm />
                  </ModalContent>
                </ModalBody>
              </Modal>
              <Link to="/anon">
                <button className="px-8 py-4 rounded-xl border-2 border-neutral-300 dark:border-neutral-700 font-bold hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all">
                  🎮 Start Playing
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* How It Works - Detailed Section */}
      <section className="w-full py-12 md:py-24 bg-gradient-to-r from-orange-500/5 to-pink-500/5">
        <div className="px-4 md:px-6 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-12">How CommeME Works</h2>
          <div className="grid gap-8">
            {[
              {
                icon: Rocket,
                title: "Create & Upload",
                description: "Start by creating your meme using our built-in editor or upload your masterpiece. It's completely gasless to post!",
                details: [
                  "Use our meme template editor",
                  "Upload custom meme images",
                  "Add creative text and effects",
                  "Zero gas fees for posting"
                ]
              },
              {
                icon: Users,
                title: "Community Engagement",
                description: "Share your meme with our vibrant community. Users can explore and donate to memes they love.",
                details: [
                  "Get visibility in the explore page",
                  "Receive crypto donations",
                  "Build your meme creator reputation",
                  "Engage with other creators"
                ]
              },
              {
                icon: Gift,
                title: "Token Transformation",
                description: "When your meme reaches the donation threshold, it automatically converts into a crypto token.",
                details: [
                  "Meme becomes a tradeable token",
                  "30% goes to early supporters",
                  "You retain majority ownership",
                  "10% supports UBI initiatives"
                ]
              },
              {
                icon: Coins,
                title: "Earn & Trade",
                description: "Manage your meme token and participate in the meme economy.",
                details: [
                  "Trade your meme tokens",
                  "Earn from price appreciation",
                  "Collect royalties from trades",
                  "Join the meme marketplace"
                ]
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="flex flex-col md:flex-row gap-6 items-start bg-background/80 rounded-xl p-6 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex-shrink-0">
                  <div className="p-3 bg-orange-500/10 rounded-full">
                    <step.icon className="h-8 w-8 text-orange-500" />
                  </div>
                </div>
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                      <span className="text-orange-500">0{index + 1}.</span> 
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {step.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-orange-500" />
                        <span className="text-sm text-muted-foreground">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose CommeME Section */}
      <section className="w-full py-12 md:py-24 bg-muted/50">
        <div className="px-4 md:px-6 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-12">Why Choose CommeME?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Trophy,
                title: "Gamified Creation",
                description: "Turn meme-making into an exciting game. Earn XP, level up, and unlock special features."
              },
              {
                icon: Coins,
                title: "Real Rewards",
                description: "Get rewarded for your creativity. Top memes earn tokens and special privileges."
              },
              {
                icon: Users,
                title: "Vibrant Community",
                description: "Join thousands of meme creators and collectors in a thriving ecosystem."
              },
              {
                icon: TrendingUp,
                title: "Token Economics",
                description: "Fair distribution with 30% to supporters and 10% to social impact."
              },
              {
                icon: Share2,
                title: "Easy Sharing",
                description: "Share your memes across platforms and grow your audience."
              },
              {
                icon: Gift,
                title: "Social Impact",
                description: "Contribute to UBI initiatives through meme creation and trading."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-start p-6 bg-background/80 rounded-xl hover:shadow-xl transition-all duration-300"
              >
                <div className="p-3 bg-orange-500/10 rounded-full mb-4">
                  <feature.icon className="h-6 w-6 text-orange-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Memes Section */}
      <section className="w-full py-12 md:py-24">
        {/* Add a showcase of top memes */}
      </section>

      {/* CTA Section */}
      <section className="w-full py-16 md:py-24 bg-gradient-to-r from-orange-500 to-pink-500">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="px-4 md:px-6 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white mb-8">
            Ready to Become a Meme Lord?
          </h2>
          <Modal>
            <ModalTrigger>
              <button className="px-8 py-4 rounded-xl bg-white text-orange-500 font-bold hover:opacity-90 transition-all">
                Start Creating Now
              </button>
            </ModalTrigger>
            <ModalBody>
              <ModalContent>
                <CreateMemeForm />
              </ModalContent>
            </ModalBody>
          </Modal>
        </motion.div>
      </section>

      <section className="py-20 bg-black">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
            The CommeME Experience
          </h2>
          <StickyScroll content={scrollContent} />
        </div>
      </section>
    </main>
  );
}

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Marie Dupont",
    role: "Fondatrice, StartupX",
    avatar: "",
    content: "Viral a révolutionné notre façon de créer des landing pages. En 10 minutes, j'avais un site professionnel prêt à être lancé.",
    rating: 5,
  },
  {
    name: "Thomas Martin",
    role: "Designer Freelance",
    avatar: "",
    content: "L'IA comprend exactement ce que je veux. Je gagne un temps fou sur mes projets clients. Incontournable !",
    rating: 5,
  },
  {
    name: "Sophie Bernard",
    role: "Marketing Manager",
    avatar: "",
    content: "Nos équipes utilisent Viral pour créer des pages de campagne en quelques heures au lieu de jours. ROI incroyable.",
    rating: 5,
  },
  {
    name: "Lucas Petit",
    role: "Développeur Full-stack",
    avatar: "",
    content: "Même en tant que dev, j'utilise Viral pour le prototypage rapide. Le code généré est propre et bien structuré.",
    rating: 5,
  },
  {
    name: "Emma Leroy",
    role: "Entrepreneur",
    avatar: "",
    content: "J'ai lancé 3 projets en un mois grâce à Viral. Sans connaissances techniques, c'est impressionnant.",
    rating: 5,
  },
  {
    name: "Nicolas Moreau",
    role: "Agence Web",
    avatar: "",
    content: "On a intégré Viral dans notre workflow. Nos clients sont ravis et on livre plus vite. Win-win !",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-24 px-4 border-t border-border/50 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Ils adorent Viral
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Rejoignez des milliers de créateurs qui construisent des sites incroyables.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-6 rounded-2xl hover-glow"
            >
              <Quote className="h-8 w-8 text-primary/30 mb-4" />
              
              <p className="text-foreground mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    {testimonial.avatar && <AvatarImage src={testimonial.avatar} />}
                    <AvatarFallback className="bg-primary/20 text-primary text-sm">
                      {testimonial.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>

                <div className="flex gap-0.5">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

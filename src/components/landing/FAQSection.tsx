import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Comment fonctionne la génération par IA ?",
    answer: "Notre IA analyse votre description en langage naturel et génère automatiquement le code HTML, CSS et la structure du site. Vous pouvez ensuite personnaliser chaque élément avec l'éditeur visuel.",
  },
  {
    question: "Puis-je exporter le code de mon site ?",
    answer: "Oui ! Vous pouvez exporter votre site en HTML/CSS propre, le pousser directement vers GitHub, ou télécharger un fichier ZIP. Le code est entièrement le vôtre.",
  },
  {
    question: "Combien de sites puis-je créer ?",
    answer: "Avec le plan gratuit, vous pouvez créer jusqu'à 3 projets. Les plans Pro et Business offrent des projets illimités.",
  },
  {
    question: "Comment fonctionnent les crédits ?",
    answer: "Chaque génération par IA consomme des crédits. Le plan gratuit inclut 50 crédits/mois, Pro inclut 500, et Business 2000. Les crédits se renouvellent chaque mois.",
  },
  {
    question: "Puis-je utiliser mon propre domaine ?",
    answer: "Oui, à partir du plan Pro. Vous pouvez connecter votre domaine personnalisé et publier votre site directement dessus.",
  },
  {
    question: "Y a-t-il une période d'essai ?",
    answer: "Oui ! Le plan gratuit est disponible sans limite de temps. Vous pouvez également essayer Pro pendant 14 jours sans engagement.",
  },
  {
    question: "Puis-je collaborer avec mon équipe ?",
    answer: "Le plan Business inclut des fonctionnalités de collaboration : plusieurs utilisateurs, rôles et permissions, projets partagés.",
  },
  {
    question: "Le support est-il disponible ?",
    answer: "Tous les utilisateurs ont accès au support par email. Les plans Pro et Business bénéficient d'un support prioritaire, et Business inclut un support dédié 24/7.",
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-24 px-4 bg-secondary/20">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Questions fréquentes
          </h2>
          <p className="text-muted-foreground">
            Tout ce que vous devez savoir pour commencer.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="glass-card rounded-xl px-6 border-none"
              >
                <AccordionTrigger className="text-left hover:no-underline py-4">
                  <span className="font-medium">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;

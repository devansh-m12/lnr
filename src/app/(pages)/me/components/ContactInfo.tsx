'use client';
import { motion } from 'framer-motion';

export default function ContactInfo({ aboutData }: { aboutData: any }) {
  const contactItems = [
    { icon: '📧', value: aboutData.email },
    { icon: '📱', value: aboutData.phone },
    { icon: '📍', value: aboutData.education[0].location },
  ];

  return (
    <div className="space-y-2">
      {contactItems.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 + index * 0.1 }}
          className="flex items-center space-x-3 text-sm text-white/60"
        >
          <span>{item.icon}</span>
          <span>{item.value}</span>
        </motion.div>
      ))}
    </div>
  );
}

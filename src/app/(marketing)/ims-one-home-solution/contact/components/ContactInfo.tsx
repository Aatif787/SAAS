import { motion } from 'framer-motion';

export default function ContactInfo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.8 }}
      className="p-6 bg-white rounded-2xl border border-[#0A1E3D]/10"
    >
      <h3 className="text-xl font-semibold text-[#0A1E3D] mb-6">Contact Information</h3>
      
      <div className="space-y-6">
        {/* Address */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="flex items-start space-x-4"
        >
          <div className="w-10 h-10 bg-[#0A1E3D]/10 rounded-full flex items-center justify-center shrink-0">
            <span className="text-[#0A1E3D] text-lg">📍</span>
          </div>
          <div>
            <h4 className="font-semibold text-[#0A1E3D] mb-1">Address</h4>
            <p className="text-ims-charcoal/70">
              IMS Tower, Gomti Nagar, Lucknow<br/>
              Uttar Pradesh 226010, India
            </p>
          </div>
        </motion.div>
        
        {/* Email */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex items-start space-x-4"
        >
          <div className="w-10 h-10 bg-[#0A1E3D]/10 rounded-full flex items-center justify-center shrink-0">
            <span className="text-[#0A1E3D] text-lg">📧</span>
          </div>
          <div>
            <h4 className="font-semibold text-[#0A1E3D] mb-1">Email</h4>
            <p className="text-ims-charcoal/70">
              <a href="mailto:info@imsonehome.com" className="text-[#0A1E3D] hover:text-ims-gold transition-colors">
                info@imsonehome.com
              </a><br/>
              <a href="mailto:support@imsonehome.com" className="text-[#0A1E3D] hover:text-ims-gold transition-colors ml-4">
                support@imsonehome.com
              </a>
            </p>
          </div>
        </motion.div>
        
        {/* Phone */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex items-start space-x-4"
        >
          <div className="w-10 h-10 bg-[#0A1E3D]/10 rounded-full flex items-center justify-center shrink-0">
            <span className="text-[#0A1E3D] text-lg">📞</span>
          </div>
          <div>
            <h4 className="font-semibold text-[#0A1E3D] mb-1">Phone</h4>
            <p className="text-ims-charcoal/70">
              <a href="tel:+919699858212" className="text-[#0A1E3D] hover:text-ims-gold transition-colors">
                +91 9699858212
              </a><br/>
              <a href="tel:+919699858213" className="text-[#0A1E3D] hover:text-ims-gold transition-colors ml-4">
                +91 9699858213
              </a>
            </p>
          </div>
        </motion.div>
        
        {/* WhatsApp */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex items-start space-x-4"
        >
          <div className="w-10 h-10 bg-[#0A1E3D]/10 rounded-full flex items-center justify-center shrink-0">
            <span className="text-[#0A1E3D] text-lg">💬</span>
          </div>
          <div>
            <h4 className="font-semibold text-[#0A1E3D] mb-1">WhatsApp</h4>
            <p className="text-ims-charcoal/70">
              <a href="https://wa.me/919699858212" className="text-[#0A1E3D] hover:text-ims-gold transition-colors">
                +91 9699858212
              </a>
            </p>
          </div>
        </motion.div>
        
        {/* Business Hours */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex items-start space-x-4"
        >
          <div className="w-10 h-10 bg-[#0A1E3D]/10 rounded-full flex items-center justify-center shrink-0">
            <span className="text-[#0A1E3D] text-lg">🕒</span>
          </div>
          <div>
            <h4 className="font-semibold text-[#0A1E3D] mb-1">Business Hours</h4>
            <p className="text-ims-charcoal/70">
              Monday - Saturday: 9:00 AM - 7:00 PM<br/>
              Sunday: 10:00 AM - 5:00 PM
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
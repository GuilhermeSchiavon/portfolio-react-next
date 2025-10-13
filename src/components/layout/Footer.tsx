'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useAppDispatch } from '@/store'
import { sendMessage } from '@/store/slices/chatSlice'
import { setAlert } from '@/store/slices/helpersSlice'

export function Footer() {
  const { t } = useTranslation('global')
  const dispatch = useAppDispatch()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.email || !formData.message) {
      dispatch(setAlert({
        message: 'Please fill in all fields',
        type: 'error'
      }))
      return
    }

    setIsSubmitting(true)
    
    try {
      await dispatch(sendMessage(formData)).unwrap()
      dispatch(setAlert({
        message: 'Message sent successfully! I\'ll get back to you soon.',
        type: 'success'
      }))
      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      dispatch(setAlert({
        message: 'Failed to send message. Please try again.',
        type: 'error'
      }))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <footer id="contact" className="bg-neutral-900 dark:bg-neutral-950 text-white">
      {/* Contact Section */}
      <div className="py-20 lg:py-32">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
                  Let's Work Together
                </h2>
                
                <p className="text-xl text-neutral-300 mb-8 leading-relaxed">
                  {t('footer.description')}
                </p>

                {/* Contact Methods */}
                <div className="space-y-6">
                  <motion.a
                    href="mailto:contact@guilhermeschiavon.com"
                    className="flex items-center space-x-4 text-neutral-300 hover:text-primary-400 transition-colors duration-300"
                    whileHover={{ x: 10 }}
                  >
                    <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold">Email</div>
                      <div className="text-sm">contact@guilhermeschiavon.com</div>
                    </div>
                  </motion.a>

                  <motion.a
                    href="https://linkedin.com/in/guilhermeschiavon"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-4 text-neutral-300 hover:text-primary-400 transition-colors duration-300"
                    whileHover={{ x: 10 }}
                  >
                    <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold">LinkedIn</div>
                      <div className="text-sm">Connect with me</div>
                    </div>
                  </motion.a>

                  <motion.a
                    href="https://github.com/guilhermeschiavon"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-4 text-neutral-300 hover:text-primary-400 transition-colors duration-300"
                    whileHover={{ x: 10 }}
                  >
                    <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold">GitHub</div>
                      <div className="text-sm">View my code</div>
                    </div>
                  </motion.a>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-neutral-800 dark:bg-neutral-900 rounded-xl p-8"
              >
                <h3 className="text-2xl font-bold mb-6">{t('footer.chat.name')}</h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder={t('footer.chat.placeholder.0')}
                      className="w-full px-4 py-3 bg-neutral-700 dark:bg-neutral-800 border border-neutral-600 dark:border-neutral-700 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                      required
                    />
                  </div>
                  
                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder={t('footer.chat.placeholder.1')}
                      className="w-full px-4 py-3 bg-neutral-700 dark:bg-neutral-800 border border-neutral-600 dark:border-neutral-700 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                      required
                    />
                  </div>
                  
                  <div>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder={t('footer.chat.placeholder.2')}
                      rows={5}
                      className="w-full px-4 py-3 bg-neutral-700 dark:bg-neutral-800 border border-neutral-600 dark:border-neutral-700 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 resize-none"
                      required
                    />
                  </div>
                  
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Sending...</span>
                      </div>
                    ) : (
                      t('footer.chat.send')
                    )}
                  </motion.button>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-neutral-800 dark:border-neutral-700 py-8">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-neutral-400 text-sm">
              © {new Date().getFullYear()} Guilherme Schiavon. All rights reserved.
            </div>
            
            <div className="flex space-x-6 text-sm">
              <button className="text-neutral-400 hover:text-white transition-colors duration-300">
                {t('footer.terms')}
              </button>
              <button className="text-neutral-400 hover:text-white transition-colors duration-300">
                {t('footer.privacy')}
              </button>
              <button className="text-neutral-400 hover:text-white transition-colors duration-300">
                {t('footer.cookies')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
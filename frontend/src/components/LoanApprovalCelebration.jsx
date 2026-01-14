import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle, Download, Home, PartyPopper, Sparkles, 
  IndianRupee, Calendar, FileText, Shield, Star,
  ArrowRight, Phone, Mail, Clock, TrendingUp, DollarSign, Eye, 
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

const LoanApprovalCelebration = ({ 
  loanDetails, 
  customerName, 
  sessionId, 
  onDownloadLetter, 
  onBackToDashboard 
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [letterDownloading, setLetterDownloading] = useState(false);

  useEffect(() => {
    // Trigger confetti celebration
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#004c8c', '#ffd700', '#00a86b', '#ff6b6b']
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#004c8c', '#ffd700', '#00a86b', '#ff6b6b']
      });
    }, 250);

    // Show details after animation
    setTimeout(() => setShowDetails(true), 1500);

    return () => clearInterval(interval);
  }, []);

  const handleDownload = async () => {
    setLetterDownloading(true);
    try {
      await onDownloadLetter();
    } finally {
      setLetterDownloading(false);
    }
  };

  // Extract loan info from details or use defaults
  const loanAmount = loanDetails?.loan_amount || loanDetails?.approved_amount || 500000;
  const interestRate = loanDetails?.interest_rate || 12.5;
  const tenure = loanDetails?.tenure || 60;
  const emi = loanDetails?.emi || Math.round((loanAmount * (interestRate/1200) * Math.pow(1 + interestRate/1200, tenure)) / (Math.pow(1 + interestRate/1200, tenure) - 1));
  const loanId = loanDetails?.loan_account_number || loanDetails?.loan_id || `QL-LN-${sessionId?.slice(0, 6).toUpperCase() || '000000'}`;
  
  // Extract approval details
  const creditScore = loanDetails?.credit_score || 'N/A';
  const scoreBand = loanDetails?.score_band || 'Good';
  const preApprovedLimit = loanDetails?.pre_approved_limit || 0;
  const totalInterest = loanDetails?.total_interest || 0;
  const totalRepayment = loanDetails?.total_repayment || 0;
  const processingFee = loanDetails?.processing_fee || 0;
  const firstEMIDate = loanDetails?.first_emi_date || 'N/A';
  const loanPurpose = loanDetails?.purpose || 'Personal';

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-[#004c8c] via-[#0066b3] to-[#003d73] overflow-y-auto">
      {/* Background decorative elements - Fixed position */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-400/10 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-green-400/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
        
        {/* Floating sparkles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight
            }}
            transition={{ 
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          >
            <Sparkles className="w-4 h-4 text-yellow-400/50" />
          </motion.div>
        ))}
      </div>

      {/* Scrollable Content Container */}
      <div className="min-h-full flex items-center justify-center py-8 px-4">
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 0.8 }}
          className="relative max-w-2xl w-full"
        >
          {/* Main Card */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Success Header */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-8 py-10 text-center relative overflow-hidden">
            {/* Animated circles */}
            <motion.div 
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full border-2 border-white/20"
                  style={{
                    width: 100 + i * 80,
                    height: 100 + i * 80,
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                  }}
                  initial={{ scale: 0, opacity: 0.5 }}
                  animate={{ scale: 1.5, opacity: 0 }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.4
                  }}
                />
              ))}
            </motion.div>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.3 }}
              className="relative z-10"
            >
              <div className="w-24 h-24 bg-white rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <CheckCircle className="w-14 h-14 text-green-500" />
                </motion.div>
              </div>
              
              <motion.h1 
                className="text-3xl font-bold text-white mb-2"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                🎉 LOAN APPROVED! 🎉
              </motion.h1>
              
              <motion.p 
                className="text-green-100 text-lg"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                Congratulations, {customerName || 'Valued Customer'}!
              </motion.p>
            </motion.div>
          </div>

          {/* Loan Details */}
          <AnimatePresence>
            {showDetails && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="p-8"
              >
                {/* Loan Amount Highlight */}
                <div className="text-center mb-8">
                  <p className="text-gray-500 text-sm mb-1">Sanctioned Loan Amount</p>
                  <motion.div 
                    className="text-5xl font-bold text-[#004c8c] flex items-center justify-center gap-2"
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                  >
                    <IndianRupee className="w-10 h-10" />
                    {loanAmount.toLocaleString('en-IN')}
                  </motion.div>
                  <p className="text-gray-400 text-sm mt-1">Loan ID: {loanId}</p>
                </div>

                {/* Loan Stats Grid */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <motion.div 
                    className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-4 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Calendar className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-blue-700">{tenure}</p>
                    <p className="text-xs text-blue-600">Months Tenure</p>
                  </motion.div>

                  <motion.div 
                    className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-4 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <IndianRupee className="w-6 h-6 text-green-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-green-700">₹{emi.toLocaleString('en-IN')}</p>
                    <p className="text-xs text-green-600">Monthly EMI</p>
                  </motion.div>

                  <motion.div 
                    className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-4 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Star className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-purple-700">{interestRate}%</p>
                    <p className="text-xs text-purple-600">Interest Rate p.a.</p>
                  </motion.div>
                </div>

                {/* Credit & Approval Details Section */}
                <motion.div 
                  className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 mb-6 border border-blue-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55 }}
                >
                  <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2 text-lg">
                    <Eye className="w-5 h-5 text-[#004c8c]" />
                    Why Your Loan Was Approved
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-5 h-5 text-blue-600" />
                        <span className="text-sm text-gray-600">Credit Score</span>
                      </div>
                      <p className="text-2xl font-bold text-gray-800">{creditScore}</p>
                      <p className="text-xs text-gray-500 mt-1">Status: {scoreBand}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="w-5 h-5 text-green-600" />
                        <span className="text-sm text-gray-600">Pre-Approved Limit</span>
                      </div>
                      <p className="text-2xl font-bold text-gray-800">₹{preApprovedLimit.toLocaleString('en-IN')}</p>
                      <p className="text-xs text-gray-500 mt-1">Your eligible amount</p>
                    </div>
                    <div className="bg-white rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="w-5 h-5 text-purple-600" />
                        <span className="text-sm text-gray-600">Loan Purpose</span>
                      </div>
                      <p className="text-lg font-bold text-gray-800 capitalize">{loanPurpose.replace('_', ' ')}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Shield className="w-5 h-5 text-indigo-600" />
                        <span className="text-sm text-gray-600">Approval Status</span>
                      </div>
                      <p className="text-lg font-bold text-green-600 flex items-center gap-1">
                        ✓ Approved
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Detailed Loan Breakdown */}
                <motion.div 
                  className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-6 mb-6 border border-gray-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2 text-lg">
                    <DollarSign className="w-5 h-5 text-[#004c8c]" />
                    Comprehensive Loan Details
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg hover:bg-gray-50 transition">
                      <span className="text-gray-600 font-medium">Principal Amount</span>
                      <span className="text-gray-800 font-bold">₹{loanAmount.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg hover:bg-gray-50 transition">
                      <span className="text-gray-600 font-medium">Interest Rate (p.a.)</span>
                      <span className="text-gray-800 font-bold">{interestRate}% (Reducing Balance)</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg hover:bg-gray-50 transition">
                      <span className="text-gray-600 font-medium">Loan Tenure</span>
                      <span className="text-gray-800 font-bold">{tenure} Months</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg hover:bg-gray-50 transition">
                      <span className="text-gray-600 font-medium">Monthly EMI</span>
                      <span className="text-gray-800 font-bold">₹{emi.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
                      <span className="text-gray-600 font-medium">Total Interest</span>
                      <span className="text-green-700 font-bold">₹{totalInterest.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <span className="text-gray-600 font-medium">Total Repayment Amount</span>
                      <span className="text-blue-700 font-bold">₹{totalRepayment.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg hover:bg-gray-50 transition">
                      <span className="text-gray-600 font-medium">Processing Fee (2%)</span>
                      <span className="text-gray-800 font-bold">₹{processingFee.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg hover:bg-gray-50 transition">
                      <span className="text-gray-600 font-medium">First EMI Date</span>
                      <span className="text-gray-800 font-bold">{firstEMIDate}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg hover:bg-gray-50 transition">
                      <span className="text-gray-600 font-medium">Loan Account Number</span>
                      <span className="text-gray-800 font-bold">{loanId}</span>
                    </div>
                  </div>
                </motion.div>

                {/* Next Steps */}
                <motion.div 
                  className="bg-gray-50 rounded-2xl p-6 mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-[#004c8c]" />
                    Next Steps for Disbursement
                  </h3>
                  <div className="space-y-3">
                    {[
                      { step: 1, text: 'Download & Sign Sanction Letter', icon: FileText },
                      { step: 2, text: 'Set up Auto-Debit for EMI Payments', icon: IndianRupee },
                      { step: 3, text: 'Funds disbursed in 24-48 hours', icon: CheckCircle }
                    ].map((item, i) => (
                      <motion.div 
                        key={i}
                        className="flex items-center gap-3"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.8 + i * 0.1 }}
                      >
                        <div className="w-8 h-8 rounded-full bg-[#004c8c] text-white flex items-center justify-center text-sm font-bold">
                          {item.step}
                        </div>
                        <item.icon className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-700">{item.text}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <motion.button
                    onClick={handleDownload}
                    disabled={letterDownloading}
                    className="w-full py-4 bg-gradient-to-r from-[#004c8c] to-[#0066b3] text-white rounded-xl font-semibold flex items-center justify-center gap-3 hover:shadow-lg transition-all disabled:opacity-70"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                  >
                    <Download className="w-5 h-5" />
                    {letterDownloading ? 'Generating...' : 'Download Sanction Letter'}
                  </motion.button>

                  <motion.button
                    onClick={onBackToDashboard}
                    className="w-full py-4 bg-gray-100 text-gray-700 rounded-xl font-semibold flex items-center justify-center gap-3 hover:bg-gray-200 transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0 }}
                  >
                    <Home className="w-5 h-5" />
                    Back to Dashboard
                  </motion.button>
                </div>

                {/* Support Footer */}
                <motion.div 
                  className="mt-6 pt-6 border-t text-center text-sm text-gray-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.1 }}
                >
                  <p className="mb-2">Need help? Our support team is here for you</p>
                  <div className="flex items-center justify-center gap-6">
                    <span className="flex items-center gap-1">
                      <Phone className="w-4 h-4" /> 1800-123-4567
                    </span>
                    <span className="flex items-center gap-1">
                      <Mail className="w-4 h-4" /> support@quickloan.in
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoanApprovalCelebration;

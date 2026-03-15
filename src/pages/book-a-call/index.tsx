import { useState } from 'react';

interface BookACallFormState {
  name: string;
  email: string;
  date: string;
  time: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  date?: string;
  time?: string;
}

function BookACallPage() {
  const [formData, setFormData] = useState<BookACallFormState>({
    name: '',
    email: '',
    date: '',
    time: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.date.trim()) {
      newErrors.date = 'Date is required';
    }

    if (!formData.time.trim()) {
      newErrors.time = 'Time is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call delay
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Here would be the API call to submit the form
      console.log('Form submitted:', formData);
      
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        date: '',
        time: '',
        message: ''
      });

      // Reset success message after 3 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='bookacall__container flex items-center justify-center min-h-screen bg-gray-50 p-4'>
      <div className='bookacall__form-wrapper w-full max-w-md'>
        <div className='bookacall__header mb-8'>
          <h1 className='text-3xl font-medium text-gray-900 mb-2'>
            Book a Call
          </h1>
          <p className='text-gray-500'>
            Schedule a consultation with our team
          </p>
        </div>

        {submitSuccess && (
          <div className='bookacall__success-message mb-6 p-4 bg-green-50 border border-green-200 rounded-lg'>
            <p className='text-green-800'>
              Thank you! Your call has been scheduled. We'll contact you soon.
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className='bookacall__form space-y-5'>
          {/* Name Field */}
          <div className='bookacall__form-group'>
            <label htmlFor='name' className='bookacall__label block text-sm font-medium text-gray-700 mb-1'>
              Full Name
            </label>
            <input
              type='text'
              id='name'
              name='name'
              value={formData.name}
              onChange={handleChange}
              placeholder='Enter your full name'
              className={`bookacall__input w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.name && (
              <p className='bookacall__error-message text-sm text-red-600 mt-1'>
                {errors.name}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div className='bookacall__form-group'>
            <label htmlFor='email' className='bookacall__label block text-sm font-medium text-gray-700 mb-1'>
              Email Address
            </label>
            <input
              type='email'
              id='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              placeholder='Enter your email address'
              className={`bookacall__input w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.email && (
              <p className='bookacall__error-message text-sm text-red-600 mt-1'>
                {errors.email}
              </p>
            )}
          </div>

          {/* Date Field */}
          <div className='bookacall__form-group'>
            <label htmlFor='date' className='bookacall__label block text-sm font-medium text-gray-700 mb-1'>
              Preferred Date
            </label>
            <input
              type='date'
              id='date'
              name='date'
              value={formData.date}
              onChange={handleChange}
              className={`bookacall__input w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                errors.date ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.date && (
              <p className='bookacall__error-message text-sm text-red-600 mt-1'>
                {errors.date}
              </p>
            )}
          </div>

          {/* Time Field */}
          <div className='bookacall__form-group'>
            <label htmlFor='time' className='bookacall__label block text-sm font-medium text-gray-700 mb-1'>
              Preferred Time
            </label>
            <input
              type='time'
              id='time'
              name='time'
              value={formData.time}
              onChange={handleChange}
              className={`bookacall__input w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                errors.time ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.time && (
              <p className='bookacall__error-message text-sm text-red-600 mt-1'>
                {errors.time}
              </p>
            )}
          </div>

          {/* Message Field */}
          <div className='bookacall__form-group'>
            <label htmlFor='message' className='bookacall__label block text-sm font-medium text-gray-700 mb-1'>
              Message (Optional)
            </label>
            <textarea
              id='message'
              name='message'
              value={formData.message}
              onChange={handleChange}
              placeholder='Tell us about your meeting topic or any specific requirements'
              rows={4}
              className='bookacall__textarea w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none'
            />
          </div>

          {/* Submit Button */}
          <button
            type='submit'
            disabled={isSubmitting}
            className='bookacall__submit-button w-full mt-6 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition disabled:bg-gray-400 disabled:cursor-not-allowed'
          >
            {isSubmitting ? 'Scheduling...' : 'Schedule Call'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default BookACallPage;

const faqs = [
  {
    id: 1,
    question: "What is AI Diary Assistant?",
    answer:
      "AI Diary Assistant is an online platform that uses artificial intelligence to help non-native English speakers write diaries in English. It provides language assistance, personalized feedback, and writing inspiration to make diary writing easier and more educational.",
  },
  {
    id: 2,
    question: "How does the AI help me write my diary?",
    answer:
      "The AI analyzes your writing and offers suggestions to improve grammar, vocabulary, and sentence structure. It can also translate thoughts from your native language into English, helping you express yourself more accurately and naturally.",
  },
  {
    id: 3,
    question: "Is my diary private and secure on your platform?",
    answer:
      "Yes, your privacy and security are our top priorities. Your diary entries are encrypted and stored securely, ensuring that they remain private and accessible only to you.",
  },
  {
    id: 4,
    question:
      "Can I track my progress in learning English through the platform?",
    answer:
      "Absolutely! Our platform includes progress tracking features that allow you to monitor your language development over time. You can see improvements in your vocabulary, grammar, and overall writing skills, helping you stay motivated and focused on your learning goals.",
  },
  {
    id: 5,
    question:
      "Do I need any prior knowledge of English to use AI Diary Assistant?",
    answer:
      "No, you don’t need any prior knowledge of English to start using AI Diary Assistant. Our tool is designed to assist users at all levels, from beginners to advanced learners, making it easy for anyone to start writing their diary in English.",
  },
];

export function FaqSection() {
  return (
    <div className="bg-white" id="faq">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            FAQ
          </h2>
          <p className="mt-6 text-base leading-7 text-gray-600">
            Have a different question and can’t find the answer you’re looking
            for? Reach out to our support team by{" "}
            <a
              href="#"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              sending us an email
            </a>{" "}
            and we’ll get back to you as soon as we can.
          </p>
        </div>
        <div className="mt-20">
          <dl className="space-y-16 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-16 sm:space-y-0 lg:gap-x-10">
            {faqs.map((faq) => (
              <div key={faq.id}>
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  {faq.question}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  {faq.answer}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}

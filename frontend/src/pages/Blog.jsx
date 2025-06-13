import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const blogPosts = [
    {
      id: 1,
      category: 'book-reviews',
      title: 'The Art of Reading: A Journey Through Modern Literature',
      author: 'Emily Parker',
      date: 'March 15, 2024',
      content: `Reading is not just about consuming words; it's about experiencing worlds, understanding perspectives, and growing as individuals. In this comprehensive guide, we'll explore how modern literature continues to shape our understanding of the world and ourselves.

Modern authors are pushing boundaries and challenging conventional storytelling methods. From experimental narratives to genre-bending works, contemporary literature offers readers unprecedented diversity in both style and substance.

Key takeaways from modern literary trends:
• Increased focus on diverse voices and perspectives
• Integration of multimedia elements in storytelling
• Exploration of complex social issues through fiction
• Rise of hybrid genres that defy traditional categorization`,
      image: 'https://picsum.photos/800/400?random=1'
    },
    {
      id: 2,
      category: 'author-spotlight',
      title: 'Behind the Pages: Interview with Sarah Mitchell',
      author: 'James Wilson',
      date: 'March 10, 2024',
      content: `Bestselling author Sarah Mitchell opens up about her writing process, inspiration, and the challenges of creating compelling characters in the digital age. With over a decade of experience in crafting psychological thrillers, Mitchell's insights offer valuable lessons for both readers and aspiring writers.

On character development:
"Characters should feel like real people you might meet on the street. Their flaws, desires, and contradictions make them human and relatable. I spend months getting to know my characters before I even start writing the first chapter."

On the writing process:
"Writing is rewriting. The first draft is just about getting the story out. The magic happens in revision, where you refine, polish, and sometimes completely reimagine scenes to serve the story better."`,
      image: 'https://picsum.photos/800/400?random=2'
    },
    {
      id: 3,
      category: 'reading-tips',
      title: 'Maximizing Your Reading Experience: Tips for Better Comprehension',
      author: 'Dr. Michael Brown',
      date: 'March 5, 2024',
      content: `Whether you're a casual reader or a dedicated bibliophile, improving your reading comprehension can enhance your enjoyment of literature. Here are proven strategies to get more from your reading sessions:

1. Active Reading Techniques:
   • Take notes while reading
   • Highlight key passages
   • Summarize chapters in your own words
   • Discuss books with others

2. Creating the Perfect Reading Environment:
   • Find your ideal reading time
   • Minimize distractions
   • Choose appropriate lighting
   • Consider background music or silence

3. Building a Reading Routine:
   • Set realistic reading goals
   • Track your progress
   • Join a book club
   • Maintain a reading journal`,
      image: 'https://picsum.photos/800/400?random=3'
    },
    {
      id: 4,
      category: 'industry-trends',
      title: 'The Future of Publishing: Digital Innovation and Traditional Books',
      author: 'Alex Thompson',
      date: 'March 1, 2024',
      content: `The publishing industry is experiencing a revolutionary transformation as digital technology continues to evolve. From e-books to audiobooks, the way we consume literature is changing, yet physical books maintain their timeless appeal.

Current Trends in Publishing:
• Rise of hybrid publishing models
• Increased audiobook production
• Interactive digital reading experiences
• Print-on-demand technology

The Role of Social Media:
BookTok, Bookstagram, and other social media platforms are reshaping how readers discover and engage with books. Publishers and authors are adapting their marketing strategies to reach audiences in these new digital spaces.`,
      image: 'https://picsum.photos/800/400?random=4'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Posts' },
    { id: 'book-reviews', name: 'Book Reviews' },
    { id: 'author-spotlight', name: 'Author Spotlight' },
    { id: 'reading-tips', name: 'Reading Tips' },
    { id: 'industry-trends', name: 'Industry Trends' }
  ];

  const filteredPosts = selectedCategory === 'all'
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <div className="py-16 px-4 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-8">Our Blog</h1>
        
        {/* Category Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${selectedCategory === category.id
                ? 'bg-primary-red text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'}`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {filteredPosts.map(post => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-8">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>By {post.author}</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 hover:text-primary-red transition-colors">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-6 line-clamp-4">
                  {post.content}
                </p>
                <button className="text-primary-red font-semibold hover:text-red-700 transition-colors">
                  Read More →
                </button>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-16 bg-white p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-gray-600 mb-6">Stay updated with our latest blog posts, book recommendations, and literary events.</p>
          <div className="flex max-w-md mx-auto gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-red"
            />
            <button className="bg-primary-red text-white px-6 py-2 rounded-md hover:bg-red-600 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
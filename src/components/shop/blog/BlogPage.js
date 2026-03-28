import React, { useState } from "react";
import Layout from "../layout";

const posts = [
  { id: 1, category: "Fashion Tips", title: "How to Style Cotton Fabric for Every Season", excerpt: "Cotton is one of the most versatile fabrics. Learn how to style it for summer freshness and winter layering with our expert guide.", author: "Priya Sharma", date: "March 15, 2025", readTime: "5 min read", emoji: "👗", color: "from-yellow-50 to-orange-50", border: "border-yellow-200", tag: "bg-yellow-100 text-yellow-800" },
  { id: 2, category: "Fabric Guide", title: "Silk vs Cotton: Which Fabric is Right for You?", excerpt: "Choosing between silk and cotton can be tricky. We break down pros, cons, care instructions, and best use cases for each fabric type.", author: "Rahul Mehta", date: "March 10, 2025", readTime: "7 min read", emoji: "🧵", color: "from-blue-50 to-indigo-50", border: "border-blue-200", tag: "bg-blue-100 text-blue-800" },
  { id: 3, category: "Trends", title: "Top 10 Fabric Trends Dominating 2025", excerpt: "From sustainable linen to bold prints, discover the fabric trends shaping the fashion world this year and how to incorporate them.", author: "Ananya Patel", date: "March 5, 2025", readTime: "6 min read", emoji: "✨", color: "from-purple-50 to-pink-50", border: "border-purple-200", tag: "bg-purple-100 text-purple-800" },
  { id: 4, category: "Care Guide", title: "The Ultimate Guide to Washing and Caring for Fabrics", excerpt: "Proper fabric care extends the life of your clothing. Learn the dos and don'ts for washing silk, cotton, linen, and synthetic blends.", author: "Vikram Singh", date: "Feb 28, 2025", readTime: "8 min read", emoji: "🧺", color: "from-green-50 to-teal-50", border: "border-green-200", tag: "bg-green-100 text-green-800" },
  { id: 5, category: "Sustainability", title: "Why Sustainable Fabric Choices Matter for Our Planet", excerpt: "The fashion industry is one of the biggest polluters. Discover how choosing sustainable fabrics can make a real difference.", author: "Meera Joshi", date: "Feb 20, 2025", readTime: "6 min read", emoji: "🌿", color: "from-emerald-50 to-green-50", border: "border-emerald-200", tag: "bg-emerald-100 text-emerald-800" },
  { id: 6, category: "DIY", title: "5 Easy DIY Projects with Leftover Fabric", excerpt: "Don't throw away fabric scraps! From tote bags to cushion covers, here are 5 creative projects you can make at home.", author: "Kavya Reddy", date: "Feb 15, 2025", readTime: "4 min read", emoji: "✂️", color: "from-rose-50 to-pink-50", border: "border-rose-200", tag: "bg-rose-100 text-rose-800" },
];

const categories = ["All", "Fashion Tips", "Fabric Guide", "Trends", "Care Guide", "Sustainability", "DIY"];

const BlogPage = () => {
  const [active, setActive] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = posts.filter(p => {
    const matchCat = active === "All" || p.category === active;
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 pt-20">
        {/* Hero */}
        <div className="bg-gray-900 text-white py-16 px-4 text-center">
          <p className="text-yellow-400 text-sm font-semibold tracking-widest uppercase mb-3">Our Blog</p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Fabric Stories &amp; Style Tips</h1>
          <p className="text-gray-400 max-w-xl mx-auto text-base">Expert advice on fabrics, fashion trends, care guides and sustainable living.</p>
          <div className="mt-8 max-w-md mx-auto relative">
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search articles..."
              className="w-full bg-white text-gray-800 rounded-full px-6 py-3 pr-12 text-sm focus:outline-none shadow-lg" />
            <svg className="w-5 h-5 text-gray-400 absolute right-4 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="bg-white border-b shadow-sm">
          <div className="max-w-6xl mx-auto px-4 flex space-x-1 overflow-x-auto py-3">
            {categories.map(cat => (
              <button key={cat} onClick={() => setActive(cat)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all ${active === cat ? "bg-gray-900 text-white shadow" : "text-gray-500 hover:bg-gray-100"}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Posts Grid */}
        <div className="max-w-6xl mx-auto px-4 py-12">
          {filtered.length === 0 ? (
            <div className="text-center py-24 text-gray-400">
              <div className="text-5xl mb-4">📭</div>
              <p className="text-xl font-medium">No articles found</p>
              <p className="text-sm mt-2">Try a different search or category</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(post => (
                <div key={post.id} className={`bg-gradient-to-br ${post.color} border ${post.border} rounded-2xl p-6 flex flex-col justify-between hover:shadow-lg transition-shadow cursor-pointer group`}>
                  <div>
                    <div className="text-4xl mb-4">{post.emoji}</div>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${post.tag}`}>{post.category}</span>
                    <h2 className="text-lg font-bold text-gray-800 mt-3 mb-2 group-hover:text-gray-600 transition-colors leading-snug">{post.title}</h2>
                    <p className="text-sm text-gray-600 leading-relaxed">{post.excerpt}</p>
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold text-gray-700">{post.author}</p>
                      <p className="text-xs text-gray-400">{post.date}</p>
                    </div>
                    <span className="text-xs text-gray-400 bg-white px-3 py-1 rounded-full border">{post.readTime}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Newsletter */}
        <div className="bg-gray-900 text-white py-16 px-4 text-center">
          <h2 className="text-2xl font-bold mb-2">Stay in the Loop</h2>
          <p className="text-gray-400 text-sm mb-6">Get the latest fabric tips and style guides delivered to your inbox.</p>
          <div className="flex max-w-md mx-auto space-x-2">
            <input type="email" placeholder="Enter your email"
              className="flex-1 bg-gray-800 text-white rounded-lg px-4 py-3 text-sm focus:outline-none border border-gray-700 focus:border-yellow-400" />
            <button className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-semibold px-6 py-3 rounded-lg text-sm transition-colors">Subscribe</button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BlogPage;

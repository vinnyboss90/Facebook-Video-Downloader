import React, { useState } from 'react';
import { Download, Facebook, Info } from 'lucide-react';

function App() {
  const [videoUrl, setVideoUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [downloadHistory, setDownloadHistory] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simulate download process
      await new Promise(resolve => setTimeout(resolve, 2000));
      setDownloadHistory(prev => [videoUrl, ...prev.slice(0, 4)]);
      alert('Video download started! (This is a simulation)');
      setVideoUrl('');
    } catch (err) {
      setError('Failed to download video. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full">
        <div className="flex items-center justify-center mb-6">
          <Facebook className="text-blue-600 mr-2" size={32} />
          <h1 className="text-3xl font-bold text-gray-800">FB Video Downloader</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="videoUrl" className="block text-sm font-medium text-gray-700 mb-1">
              Facebook Video URL
            </label>
            <input
              type="url"
              id="videoUrl"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="https://www.facebook.com/watch?v=..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
          >
            {isLoading ? (
              <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
            ) : (
              <>
                <Download className="mr-2" size={20} />
                Download Video
              </>
            )}
          </button>
        </form>
        {error && <p className="mt-4 text-red-600 text-center">{error}</p>}
        
        {downloadHistory.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Recent Downloads</h2>
            <ul className="space-y-2">
              {downloadHistory.map((url, index) => (
                <li key={index} className="text-sm text-gray-600 truncate">{url}</li>
              ))}
            </ul>
          </div>
        )}
        
        <div className="mt-8 bg-blue-50 rounded-lg p-4 flex items-start">
          <Info className="text-blue-600 mr-2 flex-shrink-0" size={20} />
          <p className="text-sm text-blue-800">
            This is a demo application. Actual video downloading would require server-side implementation for legal and technical reasons.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
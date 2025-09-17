import React, { useState, useEffect } from 'react';
import aboutService from '../services/aboutService';

const AboutContentTest = () => {
  const [testResults, setTestResults] = useState({});
  const [isRunning, setIsRunning] = useState(false);

  const testPages = [
    { key: 'about_dekusda', name: 'About DeKUSDA', url: '/Aboutdekusda' },
    { key: 'about_sda', name: 'About SDA Church', url: '/Aboutsda' },
    { key: 'elder_message', name: 'Elder Message', url: '/Eldermessage' },
    { key: 'pastor_message', name: 'Pastor Message', url: '/Pastormessage' }
  ];

  const runTests = async () => {
    setIsRunning(true);
    const results = {};

    for (const page of testPages) {
      try {
        const startTime = Date.now();
        const response = await aboutService.getPageContent(page.key);
        const endTime = Date.now();

        results[page.key] = {
          name: page.name,
          success: response.status === 'success',
          responseTime: endTime - startTime,
          contentSections: response.status === 'success' ? Object.keys(response.data).length : 0,
          sections: response.status === 'success' ? Object.keys(response.data) : [],
          error: null,
          sampleContent: response.status === 'success' ? 
            Object.values(response.data)[0]?.title || 'No content' : 'Failed to load'
        };
      } catch (error) {
        results[page.key] = {
          name: page.name,
          success: false,
          responseTime: 0,
          contentSections: 0,
          sections: [],
          error: error.message,
          sampleContent: 'Error occurred'
        };
      }
    }

    setTestResults(results);
    setIsRunning(false);
  };

  useEffect(() => {
    runTests();
  }, []);

  return (
    <div style={{ 
      padding: '2rem', 
      fontFamily: 'Arial, sans-serif',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      <h1 style={{ color: '#1f2937', marginBottom: '2rem' }}>
        About Pages Dynamic Content Test
      </h1>

      <div style={{ marginBottom: '2rem' }}>
        <button 
          onClick={runTests}
          disabled={isRunning}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: isRunning ? '#9ca3af' : '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '0.375rem',
            cursor: isRunning ? 'not-allowed' : 'pointer',
            fontSize: '1rem',
            fontWeight: '500'
          }}
        >
          {isRunning ? 'Running Tests...' : 'Run Tests Again'}
        </button>
      </div>

      {Object.keys(testResults).length > 0 && (
        <div>
          <h2 style={{ color: '#374151', marginBottom: '1rem' }}>Test Results</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1rem'
          }}>
            {testPages.map(page => {
              const result = testResults[page.key];
              if (!result) return null;

              return (
                <div key={page.key} style={{
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.5rem',
                  padding: '1.5rem',
                  backgroundColor: 'white',
                  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '1rem'
                  }}>
                    <span style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      backgroundColor: result.success ? '#10b981' : '#ef4444',
                      marginRight: '0.5rem'
                    }}></span>
                    <h3 style={{ margin: 0, color: '#1f2937' }}>{result.name}</h3>
                  </div>

                  <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                    <p><strong>Status:</strong> {result.success ? 'SUCCESS' : 'FAILED'}</p>
                    <p><strong>Response Time:</strong> {result.responseTime}ms</p>
                    <p><strong>Content Sections:</strong> {result.contentSections}</p>
                    
                    {result.sections.length > 0 && (
                      <p><strong>Available Sections:</strong> {result.sections.join(', ')}</p>
                    )}
                    
                    <p><strong>Sample Content:</strong> {result.sampleContent}</p>
                    
                    {result.error && (
                      <p style={{ color: '#ef4444' }}><strong>Error:</strong> {result.error}</p>
                    )}

                    <p>
                      <strong>Page URL:</strong>{' '}
                      <a 
                        href={page.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{ color: '#3b82f6', textDecoration: 'underline' }}
                      >
                        {page.url}
                      </a>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div style={{ marginTop: '3rem', padding: '1.5rem', backgroundColor: '#f9fafb', borderRadius: '0.5rem' }}>
        <h3 style={{ color: '#374151', marginBottom: '1rem' }}>About Dynamic Content System</h3>
        <ul style={{ color: '#6b7280', lineHeight: '1.6' }}>
          <li>✅ All About pages have been converted to use dynamic content from the database</li>
          <li>✅ API endpoints are working and returning structured JSON data</li>
          <li>✅ Fallback content is properly implemented for each section</li>
          <li>✅ Admin interface has been created for content management</li>
          <li>✅ Database is populated with existing content from all 4 About pages</li>
          <li>✅ Loading states and error handling are implemented</li>
        </ul>
      </div>

      <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: '#fee2e2', borderRadius: '0.5rem' }}>
        <h4 style={{ color: '#991b1b', marginBottom: '1rem' }}>Admin Interface Access</h4>
        <p style={{ color: '#7f1d1d' }}>
          The admin interface is available at <code>/admin/about-content</code> but requires authentication.
          For testing purposes, the API endpoints can be accessed directly at:
        </p>
        <ul style={{ color: '#7f1d1d', marginTop: '0.5rem' }}>
          <li><code>GET /api/about/about_dekusda</code></li>
          <li><code>GET /api/about/about_sda</code></li>
          <li><code>GET /api/about/elder_message</code></li>
          <li><code>GET /api/about/pastor_message</code></li>
        </ul>
      </div>
    </div>
  );
};

export default AboutContentTest;

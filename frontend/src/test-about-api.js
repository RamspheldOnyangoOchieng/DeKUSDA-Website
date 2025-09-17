// Simple test script to verify About API connectivity from frontend
import aboutService from './services/aboutService.js';

async function testAboutAPIs() {
  const pageTypes = ['about_dekusda', 'about_sda', 'elder_message', 'pastor_message'];
  
  console.log('Testing About page APIs...\n');
  
  for (const pageType of pageTypes) {
    try {
      console.log(`Testing ${pageType}:`);
      const response = await aboutService.getPageContent(pageType);
      
      if (response.status === 'success') {
        const contentKeys = Object.keys(response.data);
        console.log(`✅ SUCCESS - Found ${contentKeys.length} content sections:`);
        console.log(`   Sections: ${contentKeys.join(', ')}`);
        
        // Show a sample section
        const firstSection = response.data[contentKeys[0]];
        console.log(`   Sample: "${firstSection.title}" - ${firstSection.content.substring(0, 50)}...`);
      } else {
        console.log(`❌ FAILED - Status: ${response.status}`);
      }
    } catch (error) {
      console.log(`❌ ERROR - ${error.message}`);
    }
    console.log('');
  }
}

// Run the test
testAboutAPIs();

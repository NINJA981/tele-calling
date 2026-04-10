const http = require('http');

async function fetchAPI(path, options = {}) {
  const url = `http://localhost:3000${path}`;
  console.log(`\n--- Testing ${options.method || 'GET'} ${path} ---`);
  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {})
      }
    });
    
    // The fetch might fail completely or return a status code
    const text = await res.text();
    let body;
    try {
      body = JSON.parse(text);
    } catch {
      body = text;
    }
    
    console.log(`Status: ${res.status}`);
    if (res.status >= 400) {
      console.error(`Error Payload:`, body);
      return false; // failed
    }
    return true; // success
  } catch (err) {
    console.error(`Fetch error for ${path}:`, err);
    return false;
  }
}

async function runTests() {
  let allPass = true;
  
  // 1. Agent GET
  allPass &= await fetchAPI('/api/agent');
  
  // 2. Agent POST
  allPass &= await fetchAPI('/api/agent', {
    method: 'POST',
    body: JSON.stringify({
      system_prompt: 'Test prompt',
      response_eagerness: 0.5,
      interruption_sensitivity: 0.7,
      denoising_enabled: true,
      voice_provider: 'test-voice'
    })
  });
  
  // 3. Contacts POST (single)
  allPass &= await fetchAPI('/api/contacts', {
    method: 'POST',
    body: JSON.stringify({
      name: 'Test Contact Manual',
      phone: '+10000000001',
      email: ''
    })
  });
  
  // 4. Contacts POST (bulk)
  allPass &= await fetchAPI('/api/contacts', {
    method: 'POST',
    body: JSON.stringify([
      { name: 'Bulk1', phone: '+10000000002' },
      { name: 'Bulk2', phone: '+10000000003' }
    ])
  });

  // 5. Contacts GET
  allPass &= await fetchAPI('/api/contacts');
  
  // For Campaign test, we need a contact ID. We'll fetch it from the previous GET
  const contactsRes = await fetch('http://localhost:3000/api/contacts').then(r => r.json());
  if (contactsRes && contactsRes.length > 0) {
      const cId = contactsRes[0].id;
      // 6. Campaign POST
      allPass &= await fetchAPI('/api/campaigns', {
        method: 'POST',
        body: JSON.stringify({
          name: 'Debug Campaign',
          contact_ids: [cId]
        })
      });
  }

  // 7. Campaigns GET
  allPass &= await fetchAPI('/api/campaigns');
  
  // 8. Bland /calls Proxy GET
  allPass &= await fetchAPI('/api/bland/calls');

  console.log("\n--- TEST SUMMARY ---");
  if (allPass) {
    console.log("ALL LOCAL API TESTS PASSED.");
  } else {
    console.error("SOME LOCAL API TESTS FAILED.");
  }
}

runTests();
